# MapCore Real Map & Heatmap Audit

## 1. Verfügbare Map URLs
Wir speichern in `server_map_identity` erfolgreich verschiedene Layer an Map-Bildern, sofern BattleMetrics diese ausliefert:
- **Thumbnail:** `rustmaps_thumbnail_url`
- **High-Res:** `rustmaps_map_url`

Es liegen also nicht nur kleine Thumbnails vor, sondern (sofern der Server RustMaps nutzt) auch die detaillierten High-Res Image-Dateien, auf denen man zoomen und zeichnen könnte. Zusätzlich speichern wir bei Custom Maps die Download-URL der Map (`custom_map_url`).

## 2. Vorhandene RustMaps-Daten
Aus dem aktuellen BattleMetrics-Payload extrahiert unser `server-pulse-ingest` folgende RustMaps-Daten in die Tabelle `server_map_identity`:
- URL, MapURL, ThumbnailURL
- Monument Count
- `monument_names` (Liste der Monumente)
- `monument_counts` (Wie oft welches Monument vorkommt)
- `biome_percentages` (Verteilung von Wüste, Schnee, Wald)

## 3. Monumente: Nur Namen oder auch Koordinaten?
Aktuell erhalten wir über den reinen BattleMetrics Ingest **nur Namen und Anzahlen**. Echte In-Game X/Y/Z Koordinaten liefert dieser Payload nicht mit. Um echte Koordinaten für Monumente zu erhalten, benötigen wir einen tieferen Zugriff (entweder über die offizielle RustMaps API oder durch eigenes Parsen der `.map` Dateien).

## 4. Können Seed + Size eine echte Map rekonstruieren?
**Theoretisch ja, praktisch für uns aktuell nein.**
Die prozedurale Generierung (welches Monument wo steht, wie das Terrain geformt ist) passiert im Code der Unity-Engine / des Rust-Servers. Mit purem Typescript/Javascript lässt sich aus `Seed` und `Size` nicht einfach so das Bild oder die Monument-Verteilung berechnen, ohne den Rust-Algorithmus nachzubauen. Plattformen wie RustMaps nutzen dafür Headless Rust-Server, die die Map intern berechnen und exportieren. Für uns bedeutet das: Wir sind bei Procedural Maps zwingend auf die fertigen Bild-URLs (wie `rustmaps_map_url`) angewiesen.

## 5. Map-Typen: Procedural vs Custom vs Static
Die Unterscheidung wird in `server-pulse-ingest` bereits verlässlich anhand des vom Server gemeldeten Level-Namens getroffen:
- `Procedural Map` -> Typ `procedural`
- `Barren` -> Typ `barren`
- Jede Abweichung -> Typ `custom` (dies betrifft sowohl Custom Maps aus dem Map-Editor als auch Static Maps wie Hapis Island oder Savas). Bei Custom Maps liefert der Server häufig eine `custom_map_url` aus (die tatsächliche `.map` Datei).

## 6. Erster echter Parser-/Heatmap-PoC
Da wir die `rustmaps_map_url` haben, wäre der logische erste Schritt:
1. Das High-Res Bild der Map als Base-Layer in eine interaktive Engine (z.B. `<canvas>`, Leaflet oder Pixi.js) laden.
2. Interaktives Overlay bauen, in dem User (ohne exakte In-Game Koordinaten zu kennen) Heatmap-Punkte "aufmalen" können, die wir relativ in X/Y Prozentwerten abspeichern.
3. *Next Level PoC:* Einen Parser bauen, der echte `.map` Dateien von Custom Maps herunterlädt, per LZ4 entpackt und Prefab-Koordinaten ausliest.

## 7. Architektur: Web vs Desktop/Tauri
Ein echter `.map` Parser gehört architektonisch zwingend in **Tauri (Rust)**.
- **Speicher & Performance:** Rust ist ideal, um Binary-Daten (LZ4-komprimierte `.map` Dateien von 20-30MB) performant zu parsen und in ein sauberes JSON-Format umzuwandeln.
- **CORS-Problematik:** Wenn wir im Web-Frontend versuchen, eine `custom_map_url` (z.B. von Dropbox oder einem privaten Webhost) herunterzuladen, blocken uns sofortige CORS-Errors. Tauri als Desktop-App umgeht diese Browser-Einschränkungen komplett.
- **Fazit:** Die Web-App rendert nur noch das Map-Bild (von `rustmaps_map_url`) und die Heatmap-Daten. Der Client (Tauri) kümmert sich um das tiefe Herunterladen und Auslesen echter `.map` Dateien, falls wir eigene Topographie-/Monument-Daten brauchen.
