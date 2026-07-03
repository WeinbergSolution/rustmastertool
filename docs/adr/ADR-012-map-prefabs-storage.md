# ADR 012: Map Prefabs Storage

**Status:** Accepted

## Entscheidung
`map_prefabs` wird nicht als relationale Tabelle gespeichert. Rohdaten bleiben im ParsedMap-Artefakt (R2). Relational sind nur `monuments` und kuratierte Analyse-Layer.
