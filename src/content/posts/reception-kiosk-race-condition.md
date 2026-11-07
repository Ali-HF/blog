---
title: "The reception kiosk: killing a double-booking race condition"
description: "How I built a full office management kiosk with Next.js 14, Prisma, and PostgreSQL, and eliminated concurrent double-bookings with row-level locking."
pubDate: 2026-10-02
type: "build"
tags: ["nextjs", "postgresql", "prisma", "concurrency", "security"]
draft: false
status: "shipped"
stack: ["Next.js 14", "TypeScript", "Tailwind 3.4", "PostgreSQL", "Supabase", "Prisma 6.19", "NextAuth.js 4", "Resend", "Google Calendar API"]
---

I built an office management suite as a solo project designed to run as a self-hosted browser kiosk on hardware inside an office lobby. The goal was to replace paper logbooks and disconnected booking apps with a single touch interface.

It handles four primary workflows:
1. Visitor check-in using generated QR codes and 6-digit invite pins.
2. Per-room booking tablets synced bi-directionally with the Google Calendar API.
3. Employee presence and badge check-ins.
4. Package delivery logging with instant notification emails sent via Resend.

<!-- ALI: add your take here on why physical kiosks in office lobbies are usually so clunky -->

## The Stack and Security at Rest

The project runs on Next.js 14 App Router, TypeScript, Tailwind CSS 3.4, and PostgreSQL hosted on Supabase using Prisma 6.19. Authentication uses NextAuth.js 4 with Google OAuth so staff can manage access rights.

Because room tablets sync directly to staff calendars, OAuth refresh tokens are stored in the database. Leaving third-party calendar credentials in plaintext in a database is unacceptable, so I added AES-256-GCM symmetric encryption for all tokens at rest. Every external route enforces HTTPS with strict HSTS policies and hardening headers.

## The Bug: Double-Booking Under Concurrent Requests

The nastiest bug appeared during stress testing of room reservations. Two users trying to book the exact same conference room slot at the same second could both pass the initial validation query before either record was committed.

In a standard Prisma query, checking if a slot is free before creating a reservation leaves a classic time-of-check to time-of-use (TOCTOU) gap:

```typescript
// The flawed pattern: check then insert
const conflict = await prisma.booking.findFirst({
  where: { roomId, startTime: { lt: end }, endTime: { gt: start } }
});
if (!conflict) {
  // If two requests land here at the exact same moment, both insert!
  await prisma.booking.create({ data: { roomId, start, end } });
}
```

Both requests saw zero conflicting rows in the table and both proceeded to execute `prisma.booking.create()`. Result: two teams showing up to the same glass meeting room with valid confirmations.

## The Fix: PostgreSQL Row-Level Locking

To guarantee that reservations are strictly serialized, I switched to an explicit PostgreSQL transaction that acquires a row-level lock on the room resource using `SELECT ... FOR UPDATE` before evaluating overlapping time slots.

```typescript
import { PrismaClient } from '@prisma/client';

export async function bookRoomWithLock(
  prisma: PrismaClient,
  roomId: string,
  start: Date,
  end: Date,
  userId: string
) {
  return await prisma.$transaction(async (tx) => {
    // 1. Acquire an exclusive row-level lock on the room row
    await tx.$executeRaw`
      SELECT id FROM "Room" 
      WHERE id = ${roomId} 
      FOR UPDATE
    `;

    // 2. Safe check: no concurrent transaction can modify bookings for this room now
    const overlapping = await tx.booking.findFirst({
      where: {
        roomId,
        startTime: { lt: end },
        endTime: { gt: start },
      },
    });

    if (overlapping) {
      throw new Error("CONFLICT: Room is already booked for this time window.");
    }

    // 3. Insert guaranteed unique reservation
    return await tx.booking.create({
      data: { roomId, startTime: start, endTime: end, userId },
    });
  });
}
```

To verify the fix, I wrote a test script that fired 50 parallel asynchronous reservation requests for the identical 30-minute block. One request succeeded; 49 requests received immediate conflict rejections.

<!-- ALI: add your take here on why relying purely on ORM convenience without understanding SQL locks will eventually burn you -->

The project is currently configured for internal office kiosk deployment and is not exposed as a public web app.
