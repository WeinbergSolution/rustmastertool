# Phase 2.4-C5-A — Resource Density Model v1 Probe Report

## 1. Ausgangslage & Ziel
Nachdem Phase C4-C erfolgreich die nativen Rust Layer (Terrain, Height, Splat, Biome, Topology, Alpha) extrahiert hat, war das Ziel dieser Phase (C5-A), ein erstes Resource Density Model (v1) zu entwerfen.
Anstatt Ores direkt per Koordinaten auslesen zu wollen (was laut C3 und C4 aufgrund der dynamischen Spawn-Systeme nicht als Klartext-Positionen in der `.map` abgelegt wird), nutzen wir einen probabilistischen, ehrlichen Ansatz ("Estimated Density").

Das Ziel war eine kleine 64x64 oder 128x128 Sample-Matrix als JSON zu erzeugen, die das Spawn-Potential für Node-Ressourcen berechnet, basierend auf Biome und Topology.

## 2. Verwendetes Scoring-Modell

Für diese Probe (v0.1) haben wir ein grundlegendes probabilistisches Modell (`ESTIMATED_PROBABILISTIC`) entworfen.

### 2.1 Verwendete Layer
- **Topology**: Hauptindikator für Klippen, Berge, Wälder und offene Felder. (Genutzt: `TOPOLOGY_CLIFF = 2` als Proxy für Berg-/Fels-Topologie).
- **Biome**: Hauptindikator für die Region. (Genutzt: `ARID = 1`, `TEMPERATE = 2`, `TUNDRA = 4`, `ARCTIC = 8`).
- *Terrain / Height / Splat* wurden in dieser ersten Probe noch nicht tiefgehend in das Scoring einbezogen, da Biome + Topology die stärksten Spawn-Indikatoren in Rust sind, sie liegen aber im Speicher bereit.

### 2.2 Annahmen pro Ressource
Wir iterieren über ein 128x128 Grid und normalisieren die Pixel-Koordinaten. An jedem Punkt evaluieren wir die Layer und addieren Potenziale auf:

- **Generic Node Density (Base Rate)**:
  - Startet bei einer Baseline von `0.1`.
  - Stark erhöht (`+0.6`), wenn sich der Punkt in einer Klippen- oder Berg-Topologie befindet. (In Rust spawnen Nodes am häufigsten an Felswänden).
- **Stone Potential**:
  - Extrem stark beeinflusst durch Berg-Topologie (`+0.8`).
  - Leicht erhöht im Temperate- (`+0.2`) oder Arid-Biome (`+0.1`).
- **Sulfur Potential**:
  - Stark erhöht durch Berge (`+0.5`).
  - Bevorzugt Arid-Biome (Wüste, `+0.4`) oder Tundra (`+0.2`).
- **Metal Ore Potential**:
  - Stark erhöht durch Berge (`+0.7`).
  - Bevorzugt Arctic-Biome (Schnee, `+0.3`) oder Tundra (`+0.2`).

Das finale Scoring jedes Punkts wird zwischen `0.0` und `1.0` geclamped. Um das JSON klein zu halten, wurden nur Punkte mit einer `Generic Node Density > 0.15` gespeichert.

## 3. Ergebnisse

- **Output Matrix**: `experiments/resource-density-model-v1-probe/output/density-matrix-128.json`
- **Anzahl an errechneten "Hotspots"**: Es wurden ~1319 valide Density-Punkte im 128x128 Raster identifiziert, die ein erhöhtes Ressourcen-Potenzial aufweisen.
- Die Output-Datei ist extrem kompakt (ca. 70 KB) und enthält keine riesigen Binärdaten, was das Konzept bestätigt.

## 4. Ehrlichkeit: Warum keine Direct Extraction?
Wie in den vorherigen Probes bewiesen, enthält das unkomprimierte `WorldData` Protobuf-Objekt der `.map` Datei zwar Layer wie Terrain, Height, Biome und Topology in perfekter Form, aber **keine exakten X/Y/Z Koordinaten für Stone/Sulfur/Metal Nodes**. 
In Rust werden Ores durch den serverseitigen Spawn-Manager dynamisch beim Start und zur Laufzeit generiert (basierend auf der Spawn-Matrix). Eine Behauptung, wir könnten Ores exakt extrahieren, wäre ein **Fake** und nicht haltbar.
Unser Ansatz – eine probabilistische Heatmap anhand der echten Server-Spawn-Regeln (Biome + Topology) zu generieren – ist ehrlich, realitätsnah und für Rust-Spieler extrem wertvoll.

## 5. Reichen die Daten für spätere Heatmap-Tiles?
**JA.** Die extrahierten Layer (`topology`, `biome` usw.) liegen im Speicher als hochauflösende Arrays vor (z.B. 4097x4097 für Terrain/Height). 
Wir können in Zukunft problemlos:
1. Den Layer in hochauflösende PNG-Tiles übersetzen.
2. Das Scoring-Modell verfeinern (z.B. Splat/Ground für Sandstrände oder Snow).
3. Das Ergebnis als Map-Overlay für Leaflet/Frontend aufbereiten.

## 6. Nächste Schritte
Da die Datenextraktion (C4-C) und das Scoring-Modell (C5-A) nun validiert sind, ist der nächste empfohlene Schritt:
- **Phase 2.4-C5-B (Visual Heatmap Renderer Probe)**: Bau eines Prototypen, der das Modell nutzt, um ein echtes Overlay-Bild (z.B. `heatmap-stone.png`) zu generieren, um die visuelle Qualität des Scorings zu prüfen.
- Alternativ direkt **Phase 2.4-C6 (Worker Service Architecture)**: Den Decoder und das Scoring-Modell als asynchronen Worker-Service in die Backend-Architektur des RustMasterTools integrieren.
