---
name: data-mining
agent: Seeker
version: 1.2.0
description: Heuristics for offline deep extraction of the Marvel Metaverse, cross-referencing, and generating canonical JSON states.
---

# Data Mining Heuristics (Seeker Agent)

## 1. The Offline Generation Protocol
The Zeyn web application does NOT contain a runtime agent. The application is strictly a highly-optimized WebGL UI. 
**Heuristic:**
- We (the AOS Agents: Antigravity/Claude/Gemini) perform the data extraction offline and inject it directly into the repository as static JSON structures.
- Do NOT instruct the UI to run agents.

## 2. Distributed File Architecture ("No God-Function")
Data must be meticulously structured for high-performance reading and avoiding Git bloat:
- All character schema generations MUST be localized to their own files (e.g. `src/data/characters/iron_man.json`).
- Individual nodes are then aggregated natively by Next.js imports.

## 3. Resolving the `metrics` Power Scale
- Enforce the official Marvel Power Grid (levels 1-7: Intelligence, Strength, Speed, Durability, Energy Projection, Fighting Skills).
- Ensure generated schemas strictly match the `CharacterCard` type so the UI ratio circles don't break.

## 4. Synthesizing Image Consistency
- Coordinate universally-themed images for `imageFallback`. The repository relies heavily on locally sourced/generated uniform imagery matching a cohesive Marvel design palette (e.g., glassmorphism, crimson/gold hues, deep cosmos).

[AUTH: Seeker | skill | 1.2.0 | 2026-04-10]
