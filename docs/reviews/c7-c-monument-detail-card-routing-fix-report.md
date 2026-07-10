# C7-C — Monument Detail Card Routing Fix Report

**Executive Verdict**: GO

## Status & Tracking
- **Branch**: `experiment/landing-pricing-auth-foundation`
- **Commit Hash**: `bd126c1`
- **Push erfolgreich**: Ja
- **Vercel Preview**: Wird aktuell über GitHub Status aktualisiert. URL analog zur Vercel Basis-URL (bzw. abgreifbar im PR/Branch).

## Architektur & Routing-Logik
- **Welche alte Komponente wurde ergänzt**: Die Monument-Chips in `ServerDetailPanel.tsx` öffnen standardmäßig nicht mehr `MonumentInfoModal`.
- **Welche neue Map-Intel-Komponente wird genutzt**: `MapIntelDetailModal.tsx` aus dem `learn/map-intel` Feature-Ordner.
- **Wie canonicalId gemappt wird**:
  - Ich habe den neuen Helper `apps/web/src/features/learn/map-intel/mapIntelLookup.ts` (`findMapIntelEntryByCanonicalId`) implementiert.
  - Dieser Helper durchsucht die lokal vorhandenen Datenbanken `MAP_MONUMENTS` (Base) und `DEEP_MONUMENT_DATA` (Deep).
  - Ein minimales Alias-Mapping wurde vorbereitet (z.B. `military_base` zu `abandoned_military_base`), um edge cases aufzufangen.
- **Fallback-Verhalten**:
  - Wenn ein Monument nicht in der neuen Map-Intel-Datenbank gefunden wird (weder Base noch Deep Content vorhanden), greift das Skript automatisch auf die alte `MonumentInfoModal` Komponente zurück. Die App stürzt also bei unbekannten Monumenten nicht ab.

## Getestete Beispiele (Konzeptionell)
- **Launch Site**: Ist in Base und Deep Data vorhanden. Öffnet die neue `MapIntelDetailModal` mit dem neuen Layout und ggf. Videos.
- **Airfield**: Vorhanden, öffnet die neue Modal.
- **Military Tunnels**: Vorhanden, öffnet die neue Modal.
- **Ferry Terminal**: Eher neu/selten, falls in Deep/Base vorhanden öffnet das neue, sonst sicherer Fallback zum alten `MonumentInfoModal`.

## Was bewusst NICHT gebaut wurde
- Keine Datenbank-Anbindung via Supabase (alle Map-Intel-Daten sind lokal statisch gebündelt).
- Die alte `MonumentInfoModal`-Komponente wurde *nicht* gelöscht, da sie als sicheres Fallback dient, bis 100% aller existierenden Monumente in der neuen Struktur erfasst sind.
- Kein globaler Rewrite des `ServerDetailPanel.tsx`.

## Checks
- `npm run typecheck`: Bestanden (nach initialer Fix-Anpassung des `title`-Keys in `name`).
- `npm run build`: Bestanden ohne Errors.
- Arbeitsregeln: Keine Main-Merges, keine Production Deploys, keine DB-Änderungen, keine Eingriffe in die Heatmap-Pipelines vorgenommen.
