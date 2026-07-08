# Server Map Parser Foundation - Data Audit

## 1. Verfügbare Daten (Vorhanden)
Basierend auf der aktuellen Implementierung (`server_map_identity` Tabelle und `mapIdentityEnrichment.ts`) haben wir Zugriff auf folgende echte Daten pro Server:
- `battlemetrics_server_id` und `internal_uuid`
- `map_type` (z.B. procedural, barren, custom)
- `world_size` und `seed`
- `rustmaps_thumbnail_url` und `rustmaps_map_url` (für das Map Image)
- `is_custom_map`
- `monument_names` (als reine String-Liste)
- `monument_counts` und `biome_percentages`

## 2. Fehlende Daten
Aktuell haben wir **keinen** Zugriff auf:
- `monument_coordinates` (Positionen der Monumente)
- `topology` (Straßen, Flüsse)
- `raw_map_json` (das gesamte RustMaps oder Rust JSON der generierten Karte)

## 3. Echte Marker plotten?
**NEIN.** Da wir keine Koordinaten für die Monumente aus der Datenbank laden, ist es mathematisch und faktisch unmöglich, Marker zu plotten, ohne sie zu raten. Erraten von Markern ist strengstens untersagt ("Keine Fake-Koordinaten. Keine geratenen Marker.").

## 4. Echte Heatmaps bauen?
**NEIN.** Heatmaps require spatial event data (z.B. Player Death Data) or derived monument/route scoring (Zonen-Berechnung basierend auf Topologie und Monument-Distanz). Current data does NOT support this. Fake Heatmaps sind untersagt.

## 5. Spätere DB/API-Erweiterung
Um Marker und Heatmaps zu ermöglichen, müsste das Backend bei der Map-Erfassung das gesamte Map-JSON (oder explizit die Monument-Koordinaten und Topologie) von RustMaps / Rust speichern und an das Frontend übergeben. 
- Erweiterung `server_map_identity` (z.B. `monument_coordinates` jsonb, `topology_data` jsonb).

## 6. Mögliche Umsetzung ohne Migration
Wir können eine funktionale Map Viewer Foundation bauen:
- Laden und Anzeigen der echten `rustmaps_map_url` (bzw. Thumbnail) im UI.
- Darstellung der Metadaten: Map Type, Size, Seed (intern), Custom-Status.
- Auflistung der Monumente in einem Panel (aus `monument_names`), jedoch **ohne** diese auf der Karte zu markieren.
- Definition einer skalierbaren Layer-Architektur (`mapLayerTypes`), in der die `heatmap` und `build_spots` Layer sauber als "Coming later" deklariert sind.
- Im UI eine Note anzeigen: "Coordinates unavailable in current data. Monument markers will be enabled after coordinate enrichment."

## 7. Verbotene Umsetzungen (Fake)
- Marker für "Launch Site" einfach in die Mitte setzen, weil wir den Namen haben.
- Eine standardisierte Grid-Heatmap einblenden, um den Button "Heatmap" optisch zu demonstrieren.
- Ein Platzhalter-Bild laden, falls der Server keine Map-URL hat (stattdessen muss ein echter "Empty State" gezeigt werden).
