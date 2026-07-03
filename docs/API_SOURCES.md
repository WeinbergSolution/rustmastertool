# API Sources & Integration

## BattleMetrics
- **PoC Status:** Normalisiert (`name`, `status`, `players`, `queue`, `rustWorldSeed`, `rustLastWipe` etc.).
- **Unsichere Felder:** `rawDetailsKeys` variieren stark je nach Server-Version. Defensive Prüfung nötig.
- **Offene Terms-Frage:** Kommerzielle Nutzung und Re-Publikation (SEO).

## RustMaps
- **PoC Status:** Normalisiert (`seed`, `size`, `monuments`, `imageUrls`).
- **Unsichere Felder:** Koordinatenformate (`y` vs `z`) und Kategorien (`category` vs `type`).
- **Offene Terms-Frage:** Caching/Rehosting von generierten Bildern.

## Rust+ Companion (Facepunch)
- (Noch nicht im PoC)

## Lokale .map Datei
- (Noch nicht im PoC)
