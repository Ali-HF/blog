---
title: "NED Carpool App (concept)"
description: "Designing a peer-to-peer campus ride sharing concept for NED students with route proximity matching, petrol-adjusted fares, and flexible scheduling."
pubDate: 2026-11-03
type: "build"
tags: ["flutter", "mobile", "ned-university", "concept", "transport"]
draft: false
status: "in-progress"
stack: ["Flutter", "Dart", "MongoDB", "Express", "Node.js"]
---

Getting to NED University during morning rush hour in Karachi is a test of patience and budget. Commercial ride-hailing apps are expensive, public buses are packed to the brim, and yet hundreds of students drive alone across the same routes with three empty passenger seats in their cars every single morning.

This concept explores a student-exclusive carpooling network designed specifically for the NED commute.

<!-- ALI: add your take here on what the daily morning commute to NED is actually like -->

## The Product Design & Mechanics

I selected Flutter for the client frontend to ensure a single cross-platform codebase that works reliably across Android and iOS devices, with a backend planned on MongoDB and the MERN stack.

The core mechanics focus on convenience and safety within university gates:
- **1.5 km Proximity Radius**: Matches riders with drivers whose routes pass within 1.5 km of their pickup location, eliminating long detours for drivers.
- **Petrol-Indexed Recommended Fares**: Calculates fair per-kilometer split rates calibrated to fluctuating local petrol prices, preventing price gouging while ensuring drivers fairly recover fuel costs.
- **InDrive-Style Rider Bidding**: Riders can offer adjusted fares, and drivers can accept or counter based on seat availability and trunk space.
- **Two Distinct Driver Models**:
  1. *Fixed-route drivers*: Daily commuters with fixed weekday class timetables who commute with a consistent crew of regular riders.
  2. *Occasional drivers*: Students posting ad-hoc departures when leaving campus early or heading back late, sorted cleanly by soonest departure time.
- **Live Campus Trajectory**: Real-time progress updates tracking the vehicle's approach toward NED main campus.

<!-- ALI: add your take here on whether Karachi students will readily adopt peer carpooling or hesitate over trust -->

## Current Status

This is currently in the **concept and architecture stage** (`in-progress`). The UX screens and route-matching calculations have been drafted, while the backend API contracts and driver verification rules are being mapped out.
