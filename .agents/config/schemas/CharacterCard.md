---
type: schema
name: CharacterCard
version: 1.0.0
last_updated: 2026-04-09
---

# Schema: CharacterCard

The exact structure the Seeker agent must output when indexing a Marvel Character. 

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "MarvelCharacter",
  "type": "object",
  "required": ["uuid", "canonicalName", "universe", "metrics", "sources"],
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Unique identifier (e.g., hash of canonicalName + universe)"
    },
    "canonicalName": {
      "type": "string",
      "description": "The primary accepted name (e.g., 'Tony Stark / Iron Man')"
    },
    "aliases": {
      "type": "array",
      "items": { "type": "string" }
    },
    "universe": {
      "type": "string",
      "enum": ["Earth-616", "Earth-199999", "Unknown", "Other"]
    },
    "metrics": {
      "type": "object",
      "required": ["strength", "intelligence", "speed", "durability", "energyProjection", "fightingSkills"],
      "properties": {
        "strength": { "type": "integer", "minimum": 1, "maximum": 7 },
        "intelligence": { "type": "integer", "minimum": 1, "maximum": 7 },
        "speed": { "type": "integer", "minimum": 1, "maximum": 7 },
        "durability": { "type": "integer", "minimum": 1, "maximum": 7 },
        "energyProjection": { "type": "integer", "minimum": 1, "maximum": 7 },
        "fightingSkills": { "type": "integer", "minimum": 1, "maximum": 7 }
      }
    },
    "appearances": {
      "type": "object",
      "properties": {
        "movies": { "type": "array", "items": { "type": "string" } },
        "series": { "type": "array", "items": { "type": "string" } },
        "magazines": { "type": "array", "items": { "type": "string" } }
      }
    },
    "chronologicalFirstAppearance": {
      "type": "string",
      "format": "date",
      "description": "YYYY-MM-DD of first publication/screen debut"
    },
    "sources": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "url": { "type": "string", "format": "uri" },
          "provenance": { "type": "string", "description": "e.g., Marvel Wiki, Official API, Reddit" }
        }
      }
    }
  }
}
```

[AUTH: Zeyn | schema | 1.0.0 | 2026-04-09]
