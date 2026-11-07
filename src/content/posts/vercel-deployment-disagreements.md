---
title: "Deployment worked on my machine, so naturally Vercel disagreed"
description: "Why 'works on localhost' means nothing once serverless cold starts, missing build environment variables, and connection pool limits show up on Vercel."
pubDate: 2026-10-22
type: "rant"
tags: ["vercel", "deployment", "nextjs", "supabase", "devops"]
draft: false
---

The universal developer meme is *"it works on my machine."* But modern serverless cloud deployment has taken that punchline to an entirely new level.

I was finishing up deployment for The Paperworm, my second Next.js stationery store. On my local machine, the app ran smoothly: zero build warnings, `npm run dev` snappy, Supabase queries returning in 20 milliseconds, and Auth.js signing sessions without a hitch.

I ran `git push origin main`. Five minutes later, Vercel flashed a red build failure icon.

<!-- ALI: add your take here on that sinking feeling when GitHub Actions passes but Vercel's production deployment turns red -->

## The Hidden Trapdoors of Serverless Deployment

When you run Next.js locally, you are running a single long-lived Node.js process with a direct TCP socket open to your Supabase PostgreSQL instance.

When you deploy to Vercel's edge or serverless runtime, that entire mental model evaporates:

1. **The Missing Environment Variable Dance**: In development, `.env.local` contains everything you need. On Vercel, you have to manually copy keys into three separate environments (Production, Preview, Development). Miss a single secondary key—like a webhook secret or a secondary callback URL—and the serverless function crashes with a cryptic runtime 500 error instead of a helpful build-time notification.
2. **Database Connection Pool Exhaustion**: On localhost, you use one connection. In serverless production, each route can spawn an isolated lambda. If several requests hit simultaneously without a connection pooler like Supabase's transaction pooler (port 6543) or Prisma Accelerate, your database rejects incoming handshakes with `FATAL: remaining connection slots are reserved for non-replication superuser connections`.
3. **Build Time vs Runtime Static Evaluation**: Next.js App Router aggressively attempts to pre-render routes at build time. If any page component imports a Supabase query that expects request-time cookies or environment variables that aren't populated during the build worker's static generation phase, the entire build blows up.

<!-- ALI: add your take here on why debugging serverless build logs feels 10x harder than checking terminal output locally -->

## What I Learned the Hard Way

The fix required three concrete changes:
- Switching database connection strings from direct PostgreSQL port 5432 to the Supabase transaction-mode pooler URL on port 6543 with `?pgbouncer=true`.
- Explicitly wrapping dynamic pages with `export const dynamic = 'force-dynamic'` to prevent Next.js from attempting build-time static fetches against authenticated endpoints.
- Verifying environment variable presence with strict Zod runtime schema assertions at application boot so missing keys fail early with readable error messages.

<!-- ALI: add your take here with your blunt advice to other students deploying Next.js for the first time -->

"It works on my machine" used to be an excuse. In modern serverless web development, it's just the prelude to fighting connection strings in production logs.
