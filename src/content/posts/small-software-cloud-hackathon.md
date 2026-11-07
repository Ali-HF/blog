---
title: "Small Software Cloud (YE Digital Hackathon 2026)"
description: "Turning prompt descriptions into isolated, single-file HTML apps served in sandboxed iframes with shared storage and identity."
pubDate: 2026-10-30
type: "build"
tags: ["hackathon", "claude-api", "supabase", "nextjs", "web-security"]
draft: false
status: "in-progress"
stack: ["Next.js", "Supabase", "Claude API", "Tailwind CSS", "TypeScript"]
---

For the YE Digital Hackathon 2026, I took inspiration directly from Pete Koomen's YC essay, *"A Cloud for Small Software"*. The core thesis is simple: software has become bloated, while many everyday team needs are tiny, bespoke utility apps—a quick calculator, a custom habit tracker, a one-time voting booth—that do not justify month-long enterprise procurement.

What if you could describe an internal tool in plain English, have Claude generate a self-contained, single-file HTML/CSS/JS application, and instantly publish it with its own persistent backend?

<!-- ALI: add your take here on why small, single-purpose software feels so refreshing compared to giant SaaS tools -->

## System Architecture

The host platform is built on Next.js, Supabase, and the Claude API:
1. **Prompt to Application**: A user submits a prompt describing their required tool.
2. **Generation Pipeline**: Claude generates a clean, single-file HTML document containing the structure, styling, and logic.
3. **Database & Storage**: The generated application code is saved into Supabase tables alongside ownership records.
4. **Sandboxed Origin Serving**: To keep client security intact, generated apps are rendered inside sandboxed iframes served across isolated origins with restricted script permissions so an app cannot compromise the parent session.

## The Injected SDK

Single-file HTML apps are usually ephemeral toys that lose their state when you refresh the browser. To make them truly useful, I wrote a lightweight injected JavaScript SDK that the host injects into the sandboxed frame before execution:
- **Shared Storage**: A simple key-value store (`window.smallCloud.set()` and `get()`) that transparently persists state back to Supabase.
- **Identity & Collaboration**: Gives the app access to the authenticated user's name and email without exposing authentication tokens.
- **Access Control**: Users can invite teammates by email with explicit "viewer" or "editor" roles.

```html
<!-- Inside the generated single-file app: persistent state made trivial -->
<script>
  async function submitVote(optionId) {
    await window.smallCloud.set(`vote_${optionId}`, (currentVal || 0) + 1);
    updateUI();
  }
</script>
```

## Demos Built During the Hackathon

To prove the platform handles varied utility logic, I tested generation and storage across three concrete test apps:
1. **Expense Splitter**: A group ledger that tracks who paid for lunch and calculates minimum transfer settlements.
2. **Live Decision Poll**: A rapid voting widget for team standups.
3. **Team Habit Roster**: A weekly checkbox matrix for tracking team habits.

<!-- ALI: add your take here on how reliable the Claude API was at spitting out functional single-file apps on the first try -->

The platform is currently `in-progress` as hackathon evaluations continue.
