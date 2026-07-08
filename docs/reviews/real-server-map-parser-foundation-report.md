# Real Server Map Parser Foundation - Report

## 1. Branch
`feature/real-server-map-parser-foundation`

## 2. Commit Hash
(Wird nach dem Push bereitgestellt)

## 3. Geänderte Dateien
- `apps/web/src/features/map/mapLayerTypes.ts` (Neu)
- `apps/web/src/features/map/serverMapModel.ts` (Neu)
- `apps/web/src/features/map/ServerMapViewer.css` (Neu)
- `apps/web/src/features/map/ServerMapViewer.tsx` (Neu)
- `apps/web/src/components/mobile/ServerCardMobile.tsx` (Modifiziert)
- `apps/web/src/features/dashboard/ServerCard.tsx` (Modifiziert)
- `apps/web/src/features/dashboard/ServersExplorer.tsx` (Modifiziert)
- `docs/reviews/real-server-map-parser-foundation-audit.md` (Neu)

## 4. Welche echten Map-Daten werden genutzt?
- `mapImageUrl` (rustmaps_map_url)
- `mapThumbnailUrl` (rustmaps_thumbnail_url) als Fallback
- `mapType`, `worldSize`, `seed`
- `isCustomMap`
- `monumentNames` (Liste an Monumenten zur Kategorisierung und Anzeige)

## 5. Welche Daten fehlen noch?
- `monument_coordinates` (Positionen der Monumente)
- `topology` (Flüsse, Straßen, Gelände)
- `raw_map_json` oder andere exakte Grid-Daten für Heatmaps / Base-Spots.

## 6. Öffnet das grüne ServerCard-Icon den Map Viewer?
Ja, das Icon `MapIcon` ist grün (`var(--status-success)`) über dem Map-Thumbnail, sowohl auf Desktop (`ServerCard.tsx`) als auch auf Mobile (`ServerCardMobile.tsx`). Es verwendet `stopPropagation` und verhindert so das versehentliche Öffnen der Server Detail-Ansicht.

## 7. Was zeigt der Map Viewer?
- Das Header-Feld mit Server-Name, Map-Size, Map-Typ und dem Map-Source-Badge (z.B. "Map thumbnail preview").
- Das Map-Image (entweder High-Res oder als Fallback das Thumbnail).
- Ein Empty State Icon und Text, falls keine Image-Daten vorhanden sind.
- Im Sidebar/Bottom Panel: Layer-Controls, Monument-Liste sowie (falls verfügbar) ein dedizierter Hinweis unter den Layern, dass Koordinaten fehlen.

## 8. Gibt es echte Koordinaten ja/nein?
**Nein.** Der Parse-Modus `coordinateMode` steht strikt auf `'none'`.

## 9. Werden Marker angezeigt ja/nein und warum?
**Nein.** Es werden ausnahmslos keine Marker gerendert, da keine echten Koordinaten in der API/DB-Basis existieren und Fake/Erraten von Koordinaten untersagt ist.

## 10. Welche Layer sind aktiv?
- `map_image` (Das echte Map/Bild der Welt)
- `monument_list` (Eine Aufzählung der identifizierten Monumente im Panel)

## 11. Welche Layer sind future/disabled?
- `monument_markers` (Braucht echte Koordinaten)
- `heatmap_population_future` (Coming Later)
- `heatmap_death_curve_future` (Coming Later)
- `build_spots_future` (Coming Later)
- `routes_future` (Coming Later)

## 12. Mobile geprüft?
Ja, auf Mobile wird CSS `flex-direction: column` und `width: 100%` im Vollbild genutzt. Ein `useInAppBack` blockt den Mobile Back Button sauber ab und schließt stattdessen das Viewer-Modal.

## 13. typecheck/build/lint Ergebnis
Alle Fehlerfrei (`0 errors, 9 warnings`). 

## 14. Vercel Preview Status
*(Wird nach dem Push abgefragt und bereitgestellt, da noch nicht committet)*

## 15. Bestätigung:
- [x] Kein `main` push ohne explizites GO
- [x] Keine DB Migration
- [x] Kein Supabase Deploy
- [x] Keine Auth/Login/env Änderungen
- [x] Keine Fake-Koordinaten verwendet (strikt blockiert über TS-Logik)
- [x] Keine Fake-Heatmap
- [x] Keine untracked Dateien committed (wird per `git add` der konkreten Files gesichert)
