# RustMaps Lookup PoC Report

## Ziel
Validierung der Map-Seed-Lookups, Normalisierung der Map-Bilder-URLs und Monument-Koordinaten sowie Dokumentation der Attribution-Pflichten.

## Implementierung
- `rustmaps-client`: Nutzt Fixture-Modus (Standard) oder echten API-Key für Lookup über Seed+Size.
- `map-lookup-normalizer`: Extrahiert Bild-URLs und formatiert die Monument-Liste einheitlich.
- `attribution-notes`: Loggt harte Limits bzgl. Caching und Attribution.

## Ausführung
```bash
pnpm install
pnpm start
```

## Ergebnisse
- **Fixture:** Die Normalisierung funktioniert. Monumente und Bild-URLs werden extrahiert.
- **Speicherung:** Es wurde konsequent darauf verzichtet, Bilder herunterzuladen. Es werden nur die URLs aus der API referenziert.

## Empfehlung
RustMaps liefert die perfekten Metadaten für die Map-Intelligence-Säule.

**Klare Grenzen:**
- **Kein Bild-Caching oder Rehosting ohne ausdrückliche vertragliche Klärung!**
- Die Attribution muss in jedem Frontend sauber implementiert werden.
