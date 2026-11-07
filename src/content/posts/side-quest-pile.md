---
title: "The side quest pile: five smaller builds"
description: "A roundup of side projects: QuickLedger, The Paperworm, a C++ Crossy Road clone, ReportLab mock exam generators, and the NED AIR Lab portal."
pubDate: 2026-11-05
type: "build"
tags: ["side-projects", "cpp", "sfml", "python", "react", "nextjs"]
draft: false
status: "shipped"
stack: ["C++", "SFML 3", "Python", "ReportLab", "Next.js", "React", "Vite", "Supabase"]
---

Not every project is a 4-month enterprise system or a hackathon finalist. As a computer science student, you build small experiments constantly: sometimes to automate a routine annoyance, sometimes for a quick lab requirement, and sometimes just to see how a specific graphics library renders pixels.

Here is what sits in my recent side-quest pile.

<!-- ALI: add your take here on why working on small side quests keeps dev fatigue away -->

## 1. QuickLedger: Desktop bookkeeping for Karachi shops

Small retail shops in Karachi still rely on paper registers or messy WhatsApp text trails to keep track of daily customer credit. I built QuickLedger as a lightweight, distraction-free desktop ledger app tailored specifically for local cashiers. It focuses entirely on instant entry, quick balances, and offline-first data retention without requiring any cloud subscription.

## 2. The Paperworm: Stationery store iteration #2

After building Notebloom, I built The Paperworm as a second e-commerce build to test how cleanly the new frontend primitives held up on a fresh code structure.
- **Stack**: Next.js App Router, Supabase, Auth.js v5, and Tailwind v4.
- **Messaging**: Integrated Twilio alongside Resend for SMS transactional dispatch and dispatch receipts.

## 3. C++ Crossy Road Clone in SFML 3

To practice modern C++ concepts outside classroom console apps, I built a desktop clone of Crossy Road using SFML 3.
- Implementing the game loop, bounding box collision checks, continuous scrolling lanes, and lane obstacle spawns.
- Dealing with SFML 3 build pipelines on Windows (which earned its own rant post).

```cpp
// Basic structure of lane obstacle bounding check
bool checkCollision(const sf::FloatRect& playerBounds, const sf::FloatRect& vehicleBounds) {
    return playerBounds.findIntersection(vehicleBounds).has_value();
}
```

## 4. ReportLab Mock Exam Paper Generator for CT-260 OOP

Preparing for Object-Oriented Programming (CT-260) exams at NED required practicing under authentic exam conditions. Instead of just answering questions on random loose sheets, I wrote a Python script utilizing ReportLab to generate six authentic NED-style mock examination papers.

The generator builds PDF papers matching the exact department headers, section time allocations, question mark distributions, and code comprehension formatting used in official university finals.

## 5. AIR Lab Website: Frontend for NED's AI Research Lab

NED's new Artificial Intelligence Research (AIR) Lab needed an online home to display research papers, member profiles, and ongoing projects.
- Built a rapid interactive frontend prototype using React + Vite.
- Included an instant theme toggle so the lab head could preview dark and light modes before approving the final look.
- Planned for a full MERN backend expansion to allow lab admins to upload publications and announcements directly.

<!-- ALI: add your take here on which of these five side quests you enjoyed building the most -->
