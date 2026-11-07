---
title: "Notebloom: building my own stationery store"
description: "How I built a full-stack stationery commerce platform with Next.js 16, Supabase, and Tailwind v4, tracked inventory with Gemini and Google Sheets, and fixed security flaws."
pubDate: 2026-09-14
type: "build"
tags: ["nextjs", "supabase", "ecommerce", "tailwind", "security"]
draft: false
status: "shipped"
stack: ["Next.js 16", "Supabase", "NextAuth v5", "Tailwind v4", "Vercel", "Brevo", "Vercel Blob", "Google Sheets"]
liveUrl: "https://notebloom.pk"
---

I wanted to run my own stationery store, not just drop things into a pre-baked template. That is how Notebloom started. I chose to build the entire store from scratch instead of relying on closed e-commerce builders, giving me complete control over the UI, the checkout flow, and how inventory updates across different channels.

<!-- ALI: add your take here on why you decided to start a stationery brand in Karachi alongside university -->

## The Frontend Iteration Grind

The frontend is built on Next.js 16 and Tailwind CSS v4. Because stationery products are visual and tactile, the browsing experience needed to feel crisp. I spent dozens of hours tweaking micro-interactions:
- Animated filter bars that do not jitter on quick clicks.
- A smooth hamburger drawer designed specifically for single-handed mobile navigation.
- A fully responsive cart and checkout flow with zero wasted screen space.
- Product card hover overlays showing back-of-notebook details and paper specifications.

<!-- ALI: add your take here on what was most annoying about getting Tailwind v4 animations to behave nicely -->

## Backend Architecture & Asset Storage

For storage and authentication, I paired Supabase with NextAuth v5. User authentication handles returning customer accounts, while images live in Vercel Blob storage.

Instead of ugly UUIDs exposed to customers during checkout, I implemented human-readable order codes so people can track orders easily without copying a 36-character hexadecimal string. For transactional notifications—like order confirmations and status changes—I integrated Brevo's email API.

```typescript
// Sample generation of human-readable order identifiers
export function generateOrderCode(): string {
  const prefix = "NB";
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${timestamp}-${randomPart}`;
}
```

## Inventory Tracking with Google Sheets and Gemini

E-commerce is not purely digital when you also sell in person. In addition to online sales, I set up a physical stall at Habitt. 

To bridge physical stall sales with the online store, I designed a multi-sheet inventory and sales tracker using Gemini to generate formulas and schema synchronization:
- `Products`: Base catalog, cost, and stock quantities.
- `Habitt_Sales`: Physical stall sales logs, timestamps, and payment types.
- `Website_Sales`: Mirrored orders synced from the web store.
- `Dashboard`: Consolidated KPI scorecards comparing stall throughput versus online conversions.

<!-- ALI: add your take here on how running a physical stall at Habitt compared to selling strictly online -->

## The Security Review Wake-Up Call

Once the site was functional, I ran a thorough security review across the application endpoints. The audit caught three critical issues:
1. **Order Confirmation Exposure**: Order confirmation screens relied on sequential parameters instead of cryptographically signed verification tokens, which would let visitors inspect arbitrary order receipts.
2. **Guest Access Cookies**: Session tokens for guest cart persistence lacked strict flags, leaving them vulnerable to session fixation.
3. **Cart Quantity Validation**: The checkout endpoint trusted quantity values supplied by client-side payloads, meaning negative quantities or numbers exceeding current stock could bypass the frontend bounds.

I patched all three before expanding physical sales: locked down the order confirmation route behind signed hashes, enforced strict HTTP-only cookies, and placed authoritative server-side inventory verification before order creation.

<!-- ALI: add your take here on the feeling of discovering security holes in code you thought was solid -->
