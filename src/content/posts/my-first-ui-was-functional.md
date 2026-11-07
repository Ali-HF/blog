---
title: "My first UI was 'functional.' That's the nicest word for it"
description: "Why AI coding tools can generate mechanical features in seconds, but taste, hierarchy, and design restraint remain entirely on the developer."
pubDate: 2026-10-28
type: "rant"
tags: ["ui-ux", "design", "ai", "frontend", "antigravity"]
draft: false
---

Whenever a software engineer calls an interface "functional," what they actually mean is: *all the buttons execute their backend handlers, but looking at the screen makes your eyes hurt.*

I fell into this exact trap while building the 3D Data Structures and Algorithms visualizer for my university course project.

<!-- ALI: add your take here on why developer-built UIs always default to cluttered gray control panels -->

## The Initial Clutter Catastrophe

Because I used Antigravity to quickly assemble the initial prototype, I kept prompting for features:
- *"Add camera orbit sliders!"*
- *"Add a playback speed scrubber!"*
- *"Add an insert/delete node form!"*
- *"Add a call-stack memory frame viewer!"*
- *"Add tree balance factor badges!"*

And Antigravity obliged without pushback. In under an hour, I had an interface that did everything I asked for. The only problem was that every square inch of the screen was covered in buttons, select dropdowns, hex readouts, and sliders. You couldn't even see the 3D memory scene.

To "fix" it, I added three mode toggles: Kids, Standard, and Pro. That reduced the clutter on the surface, but the underlying styling was still terrible. It was blocky, dull, and had that unmistakable gray-on-gray look of a utility script thrown together by a backend developer who hates CSS.

<!-- ALI: add your take here on the difference between code that works and an interface someone actually wants to touch -->

## Enter Google Stitch: The Taste Reset

AI tools are incredible at writing functions, generating boilerplate, and hooking up event listeners. But they have no inherent aesthetic judgment unless you constrain them with precise visual guidelines. If you ask an AI model to "make a UI," it will generate generic Bootstrap-era rectangles or purple-gradient AI cliches.

I took a step back and used Google Stitch to design a complete visual overhaul before touching another line of component code.

Stitch forced me to answer real design questions:
- What is the visual hierarchy? The 3D viewport is primary; controls should be floating, low-contrast HUD panels that stay out of the way.
- What typography communicates technical precision without feeling sterile? Sharp monospace accents for indices and addresses, paired with clean, readable sans-serif labels.
- How do we indicate system state? Minimalist status dots and subtle border glows instead of massive colored alert boxes.

Once I had that blueprint from Stitch, bringing it back to Antigravity was trivial. I wasn't asking the AI to "invent a design"—I was asking it to implement a specific, well-defined design system.

<!-- ALI: add your take here on why learning basic UI design is mandatory for any student who wants their projects to stand out -->

AI makes generating the first functional draft unbelievably fast. But the taste, the restraint, and the decision of what to strip away is still 100% on you.
