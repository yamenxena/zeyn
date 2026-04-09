---
type: schema
name: RelationEdge
version: 1.0.0
last_updated: 2026-04-09
---

# Schema: RelationEdge

Defines the connections among characters in the graph. Extracted by the Seeker, rendered by the Weaver.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CharacterRelation",
  "type": "object",
  "required": ["sourceUuid", "targetUuid", "relationType", "weight"],
  "properties": {
    "sourceUuid": {
      "type": "string"
    },
    "targetUuid": {
      "type": "string"
    },
    "relationType": {
      "type": "string",
      "enum": ["allies", "enemies", "family", "team_member", "creator_creation", "romantic", "unknown"]
    },
    "context": {
      "type": "string",
      "description": "Short description of relation (e.g., 'Fought in Civil War')"
    },
    "weight": {
      "type": "number",
      "minimum": 0,
      "maximum": 1,
      "description": "Strength of the connection based on number of shared appearances or explicit lore"
    }
  }
}
```

[AUTH: Zeyn | schema | 1.0.0 | 2026-04-09]
