---
title: "3D Memory & Algorithm Studio: my DSA course project"
description: "Designing a 3D data structures and algorithms studio with a Blender-style camera viewport, animated operations, and C++ code upload for NED CS-214."
pubDate: 2026-10-25
type: "build"
tags: ["dsa", "algorithms", "cpp", "threejs", "ned-university"]
draft: false
status: "in-progress"
stack: ["TypeScript", "Three.js", "C++", "Antigravity", "Google Stitch"]
---

For our third-semester Data Structures and Algorithms (CS-214) Complex Computing Project (CCP) at NED, I decided against building another static 2D array bar visualizer. I wanted a 3D spatial visualizer where data structures live inside an interactive memory grid.

The goal: let students watch pointers link nodes in real time, inspect memory frames in 3D space, and step through tree rotations and graph traversals.

<!-- ALI: add your take here on why textbook DSA diagrams fail to make pointers intuitive -->

## The Core Features

1. **Free-moving 3D Viewport**: Built like a lightweight Blender camera with orbit, pan, and continuous zoom controls.
2. **Animated Operations with Playback**: Insert, delete, search, and traverse operations animated frame-by-frame with a step-through play/pause timeline.
3. **User Code Upload with C++ Priority**: Students can paste or upload actual C++ code, which the visualizer parses to animate operations directly rather than relying on predefined hardcoded datasets.

I built the initial implementation using Antigravity to rapidly scaffold the scene graphs, camera matrices, and state queues.

## The First UI Disaster & Redesign

The initial build worked mechanically, but the interface was an ergonomic disaster. Controls were everywhere: camera sliders, memory registers, speed dials, node inputs, and tree traversal selectors competed for screen space.

To clean it up, I broke the user experience into three distinct profiles:
- **Kids Mode**: Big primary buttons, simplified controls, colorful visual feedback.
- **Standard Mode**: Clean default layout with standard insert/delete forms and playback controls.
- **Pro Mode**: Low-level memory addresses, hex offsets, raw pointer values, and internal call-stack inspectors.

Even with the mode toggles, the visual design felt blocky, cheap, and dull. It looked like an outdated engineering tool from 2005.

<!-- ALI: add your take here on seeing your functional prototype look visually depressing -->

## Visual Overhaul with Google Stitch

To fix the visual aesthetics before writing more rendering logic, I used Google Stitch to design a complete UI overhaul. It gave me clean typography pairings, high-contrast monospace indicators, subtle depth cues for floating inspection panels, and sleek camera navigation gizmos.

With the new design blueprint ready, I returned to Antigravity to reconstruct the interface components and align the 3D canvas with the new UI styling.

The visualizer is currently in active development as the course project deadline approaches.
