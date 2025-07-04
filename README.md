# INESDI2025-resources-p2

Resources for the second exercise

```
├── assets
│   ├── classes
│   └── spells
└── data
```

# API Documentation

This project provides a minimal Node.js API (using Fastify) to serve D&D spell/class data and assets.

## Endpoints

### GET `/v1/classes`
Returns a list of available class ids.

**Response:**
```json
["bard", "cleric", "druid", "sorcerer", "warlock", "wizard"]
```

---

### GET `/v1/classes/{name}/spells`
Returns the list of spell ids for the given class name.

**Response:**
```json
["acid-splash", "blade-ward", ...]
```

---

### GET `/v1/spells/{id}`
Returns the full info for a single spell by id (from `spells.json`).

**Response:**
```json
{
  "id": "acid-splash",
  "name": "Acid Splash",
  ...
}
```

---

### GET `/v1/assets/classes/{asset-name}`
Returns the PNG image for the given class asset (no `.png` extension needed).

**Response:**
`image/png` file

---

### GET `/v1/assets/spells/{spell-id}`
Returns the PNG image for the given spell asset (no `.png` extension needed).

**Response:**
`image/png` file

---
