# RustMaps Lookup PoC Report

## Ziel
Validierung der Map-Seed-Lookups, Normalisierung der Bild-URLs und Monument-Koordinaten sowie Dokumentation der Attribution.

## Scope
Isolierter TS-Client für RustMaps-Metadaten via Seed und Size, lokaler Lauf im Fixture-Modus.

## Implementierte Dateien
- `src/rustmaps-client.ts`
- `src/map-lookup-normalizer.ts`
- `src/attribution-notes.ts`
- `src/index.ts`
- `src/types.ts`
- Fixtures und Konfigurationen

## Ausführung
```bash
npm install
npm run typecheck
npm start
```

## Fixture-Modus Ergebnis
Erfolgreiche Normalisierung der Fixture. Monumente und URLs werden korrekt extrahiert.

## Optionaler Live-Modus
Der Client unterstützt `RUSTMAPS_API_KEY` via `.env.local` für Live-Abfragen, lief im PoC aber standardmäßig über Fixtures.

## Normalisierte Felder
`source`, `mapId`, `seed`, `size`, `mapImageUrl`, `thumbnailUrl`, `rustmapsUrl`, `generationStatus`, `monuments`, `rawKeys`.

## Map-Bild-URL Umgang
Bilder werden nicht heruntergeladen oder gecacht. Es werden ausschließlich die URLs (`mapImageUrl`, `thumbnailUrl`) aus der API für spätere Referenzierung normalisiert.

## Monument-Daten
Monumente werden mit `name`, `type`, `x`, `y` (oder `z`) und `gridRef` normalisiert, um Inkonsistenzen in den Koordinaten abzufangen.

## Attribution Notes
RustMaps verlangt zwingend sichtbare Verlinkung. Rehosting ist ohne explizite vertragliche Klärung verboten.

## Offene API-Fragen
Sind die Monument-Kategorien stabil? Wie verhält sich die API bei asynchroner Generierung von neuen Maps?

## Offene Terms-Fragen
Ist Bild-Caching/Re-Hosting auf eigenen Servern unter bestimmten Bedingungen (Attribution) erlaubt?

## Risiken
Abhängigkeit von den Caching-/Rehosting-Regeln der RustMaps Terms. Koordinaten-Differenzen bei Game-Updates.

## Empfehlung
RustMaps liefert die perfekten Metadaten für die Map-Intelligence-Säule und sollte genutzt werden.

## Grenzen / Nicht erlaubt
- keine Bildspeicherung
- kein Rehosting
- keine kommerzielle Nutzung ohne Terms-Klärung
- Attribution bleibt Prüfpunkt
