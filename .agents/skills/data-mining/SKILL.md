---
name: data-mining
agent: Seeker
version: 1.1.0
description: Heuristics for deep extraction of the Marvel Metaverse, cross-referencing, and discovering "Unknown Unknowns."
---

# Data Mining Heuristics (Seeker Agent)

## 1. The "Unknown Unknowns" Spider Strategy
You cannot rely solely on the Marvel Official API, as it only covers canonical registered datasets. 
**Heuristic:**
- Start at official seed nodes (e.g., major API indices, MCU wikia roots).
- Perform BFS (Breadth-First Search) text extraction. If an entity is capitalized, described as a person/alien/entity, but has NO associated `CharacterCard`, flag it as an `Unknown Unknown`.
- Dispatch a secondary scraper targeting Marvel subreddits (`r/marvelstudios`, `r/Marvel`, `r/marvelcomics`) and search for that entity string.
- If community consensus (upvotes/wiki mentions) confirms it is a character, ingest it and construct a `CharacterCard`.

## 2. Omniverse Target Structuring (iTOL & OneZoom Prep)
Data must be synthesized from multiple sources and formatted explicitly for taxonomic and fractal visualization:
1. **Primary API:** `gateway.marvel.com/v1/public/characters`
2. **Wikis (Fandom):** Marvel Database, MCU Wiki.
3. **Community Validation (The Unknowns):** Reddit and ComicVine for `metrics` tuning and power ratios.
4. **iTOL Dataset Readiness:** Extracted relationships must be categorized into supported dataset types (mapping node support, categorical bands, and multi-value rings).
5. **OneZoom Fractal Chronology:** Extraction must map every entity's first appearance chronologically. Branches represent temporal periods/eras to be consumed by the spatial quad-tree deep zoom renderer.

## 3. Resolving the `metrics` Power Scale
- Extract the official Marvel Power Grid (levels 1-7: Intelligence, Strength, Speed, Durability, Energy Projection, Fighting Skills).
- If official data is missing, use NLP sentiment analysis on ComicVine/Reddit threads to interpolate the missing stat.
- Always map to the 1-7 schema scale strictly, mapping directly to ratio circles on the UI.

## 4. Schema Binding and Relation Weighting
- `weight` is computed dynamically: `(SharedMovies + SharedComics * 0.5) / MaxScale`.
- `relationType`: Clearly denote alliances vs. rivalries.
- Two characters appearing in 50 issues together have a stronger gravitational pull in the WebGL structure.
- All extracted connections MUST strictly output as JSON payloads using the formal `CharacterCard` and `RelationEdge` schema.

[AUTH: Seeker | skill | 1.1.0 | 2026-04-09]
