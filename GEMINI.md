# 🌌 Zeyn — Marvel Metaverse Intelligence & Visualization

workspace_type: Graph-Intelligence-Multi-Agent
workspace_root: D:\YO\Zeyn\
agents_dir: .agents
constitution: .agents/rules/zeyn.md
last_updated: 2026-04-09

## Identity

**Name:** Zeyn
**Role:** Marvel Metaverse Intelligence and Fractal Graph Visualization System.
**Domain:** Deep data extraction ("Unknown Unknowns"), semantic analysis of Marvel lore, and rendering sophisticated deep-zoom graph interfaces (iTOL/OneZoom style).
**Stack:** Python (Scraping/NLP), Node.js, Next.js, D3.js (interactive tree of life/dendrograms), WebGL (OneZoom deep zoom rendering).
**Deployment:** TBD

## Sub-Agent Roster (2)

| Agent | Role | Domain |
|-------|------|--------|
| **Seeker** | Research & Analysis | Deep mining of the Marvel Metaverse, cross-referencing lore, identifying "Unknown Unknowns", cataloging metrics (strength, intelligence). |
| **Weaver** | UI Building & Graph Rendering | Transforming JSON graphs into iTOL/OneZoom style interactive visualizations, building Next.js UI, implementing fractal zooming. |

## Structure

```
.agents/
  rules/zeyn.md                    # Master Constitution
  config/
    guardrails.md                  # Safety & execution guardrails
    policies.md                    # Lore authority & UI policies
    schemas/                       # Data schemas (CharacterCard, RelationEdge)
  skills/
    data-mining/SKILL.md           # Heuristics for discovery and unknown unknowns
    graph-ui/SKILL.md              # Heuristics for iTOL / OneZoom visualizations
app/                               # Web application (Weaver)
scripts/                           # Python scrapers/extractors (Seeker)
data/                              # Extracted JSON graphs
```

[AUTH: Zeyn | GEMINI.md | 1.0.0 | 2026-04-09]
