---
type: policies
version: 1.0.0
last_updated: 2026-04-09
---

# 📜 Zeyn Operational Policies

## §1 — Canonical Priority
1. **Earth-616 Comics** (Primary source of truth).
2. **Earth-199999 MCU** (Secondary source of truth).
3. **Other Universes / Fan Lore**.

Conflicts in attributes (e.g., strength differing in MCU vs Comics) are resolved by maintaining an array of timeline/universe-specific attributes, but the baseline graph calculates proximity based on the highest canonically available attribute.

## §2 — The "Unknown Unknowns" Policy
Traditional scraping looks for specific endpoints. The Seeker agent must deploy exploratory spiders.
- If a character page links to a 'team' or 'event' that is not in the predefined target list, the Seeker must dynamically ingest it.
- Log newly discovered ontological categories (e.g., "Cosmic Entities", "Abstracts") in an `unknown_unknowns_log.json` to be mapped back onto the Tree of Life.

## §3 — UI / UX Identity (Weaver)
- **Aesthetic:** Dark mode native, deeply saturated but elegant gradients (referencing the AOS Eros aesthetic).
- **Graph Style:** Must emulate the taxonomic richness of [iTOL](https://itol.embl.de/) (circular dendrograms, colored rings for categories) while allowing the infinite zoom of [OneZoom](https://www.onezoom.org/).
- **Micro-Interaction:** Hovering a node does NOT open a new page. It expands a glassmorphic Card over the viewport showing character stats, relations, and the intelligence/strength spider-chart (ratio analysis).

[AUTH: Zeyn | policies | 1.0.0 | 2026-04-09]
