---
name: graph-ui
agent: Weaver
version: 1.1.0
description: Heuristics and UI standards for rendering the Marvel graph using iTOL and OneZoom paradigms.
---

# Graph UI Heuristics (Weaver Agent)

## 1. The OneZoom Fractal Paradigm (D3 + WebGL/Deck.gl)
The Marvel Metaverse requires a high-performance deep zoom architecture.
- **Deep Zoom Implementation:** Use D3.js to compute spatial quad-tree positions and relationships, offloading the physical rendering to **Deck.gl/WebGL**. Avoid relying solely on SVG for macro views.
- **Fractal Zoom Levels:** At `z=0` (macro), display multiverses (MCU, Earth-616). At `z=5` (meso), reveal factions/teams (Avengers, X-Men). At `z=10` (micro), reveal individual `CharacterCards`.

## 2. The iTOL Circular Taxonomic Paradigm
- The macro-view structure integrates a Circular Cladogram/Dendrogram.
- **Dataset Annotations:** Mimic iTOL's logic mapping metadata to visual rings. Rings outside the inner circle represent semantic affiliations or attribute metrics.
- Line thickness indicates `RelationEdge` weights. Line colors map strictly to alliances (heroic gold/blue) vs animosities (crimson/red).

## 3. Interaction & "The Character Card"
- **No Page Overrides:** Maintain the SPA state using a global store (e.g. Zustand) to control the viewport and selection.
- **Marvel Glassmorphism:** Clicking a node slides open a glassmorphic side-panel containing the `CharacterCard`. Use Marvel-adapted styling (Crimson Red, Heroic Gold, Dark hues) adapting the original `zeyna-canvas` UI rules.
- **Data Representation:**
  - Ratio Circles / Radial charts scaling the Power Grid `metrics` (1-7 scale).
  - Connective lists for `movies`, `series`, `magazines`.
  - Nested Node Mapping: Highlight immediate `RelationEdge` neighbors (1-degree separation) in a localized sub-graph view.
  - Data Provenance validation: Flag prominently whether the node is a "Canonical Entity" vs. an organically scraped "Unknown Unknown".

## 4. Sorting & Ordering UI
- Provide a persistent top-aligned Ribbon Navigation to re-sort the tree.
- `Sort by Chronological:` The tree root is 1939 (Sub-Mariner/Human Torch), branching outward.
- `Sort by Power Grid:` Hierarchical tiers clustering Cosmic Tier entities at the center and Street-Level subjects at the edges.

[AUTH: Weaver | skill | 1.1.0 | 2026-04-09]
