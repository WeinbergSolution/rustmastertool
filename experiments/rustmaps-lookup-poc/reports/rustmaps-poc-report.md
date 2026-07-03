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
Monument-Normalisierung ist nur mit Fixture-Daten validiert. Der `y=0` Bug wurde repariert, nullish coalescing (`??`) ist implementiert.

## Optionaler Live-Modus
Der Client unterstützt `RUSTMAPS_API_KEY` via `.env.local` für Live-Abfragen. Live-Endpoint, API-Shape und Terms sind jedoch nicht bestätigt.

## Normalisierte Felder
`source`, `mapId`, `seed`, `size`, `mapImageUrl`, `thumbnailUrl`, `rustmapsUrl`, `generationStatus`, `monuments`, `rawKeys`.

## Map-Bild-URL Umgang
Bilder werden nicht heruntergeladen oder gecacht. Es werden ausschließlich die URLs (`mapImageUrl`, `thumbnailUrl`) referenziert. Keine Bildspeicherung, kein Rehosting.

## Monument-Daten
Monumente werden mit `name`, `type`, `x`, `y` (oder `z`) und `gridRef` normalisiert. 

## Attribution Notes
RustMaps verlangt sichtbare Verlinkung. Rehosting ist ohne explizite vertragliche Klärung verboten.

## Offene API-Fragen
API-Endpunkte/Terms bleiben Prüfpunkt. Wie verhält sich die API bei asynchroner Generierung von neuen Maps?

## Offene Terms-Fragen
Ist Bild-Caching/Re-Hosting auf eigenen Servern unter bestimmten Bedingungen erlaubt?

## Risiken
Abhängigkeit von den Caching-/Rehosting-Regeln der RustMaps Terms. 

## Empfehlung
RustMaps liefert gute Metadaten, bleibt aber ein reines Experiment. Nicht produktionsreif.

## Grenzen / Nicht erlaubt
- keine Bildspeicherung
- kein Rehosting
- keine kommerzielle Nutzung ohne Terms-Klärung
- Attribution bleibt Prüfpunkt
