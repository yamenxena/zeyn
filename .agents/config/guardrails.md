---
type: guardrails
version: 1.0.0
last_updated: 2026-04-09
---

# 🛡️ Zeyn Global Guardrails

Absolute boundaries for the Zeyn ecosystem. Violation → **HALT**.

## §1 — Network & Scraping Safety (for Seeker)
- **HALT** if scraping requests exceed 5 requests/second to any single domain.
- **MANDATORY:** Always cache scraped payloads locally in `.cache/` before parsing.
- **FORBIDDEN:** Circumventing rigid CAPTCHAs via illegal means; use official APIs or public unstructured data where permitted.

## §2 — Lore Integrity
- **HALT** if a character or relation is ingested without a `sourceUri` or `citation`.
- Marvel Universe (Earth-616) is the canonical prime node. MCU (Earth-199999) and others are parallel branches. Never merge distinct variants into the exact same node (e.g., maintain separate UUIDs for MCU Iron Man vs 616 Iron Man).

## §3 — Schema Validation Gate
- **HALT** if Seeker outputs a JSON file that does not pass the `.agents/config/schemas/CharacterCard.md` schema. 
- Missing `powerRatio` → `[ERR: SCHEMA_INCOMPLETE]`

## §4 — Fractal Rendering Limits (for Weaver)
- **HALT / WARNING** if WebGL buffer exceeds memory allowances (too many nodes rendered at once without LOD).
- **MANDATORY:** Implement Level of Detail (LOD) dropping just like OneZoom to ensure 60fps graph exploration. 

## §5 — Write Discipline
| Directory | Write Auth | Description |
|-----------|------------|-------------|
| `.agents/rules/` | Human only | Constitution |
| `.agents/config/`| Human only | Schemas & Rules |
| `data/`          | Seeker     | Extracted JSON states |
| `app/`           | Weaver     | Frontend codebase |
| `scripts/`       | Seeker     | Scraping logic |

[AUTH: Zeyn | guardrails | 1.0.0 | 2026-04-09]
