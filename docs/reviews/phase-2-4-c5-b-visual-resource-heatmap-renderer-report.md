# Phase 2.4-C5-B — Visual Resource Heatmap Renderer Report

## 1. Executive Verdict
**GO**

## 2. Success-Level
**Level C**: Alle vier einzelnen Resource-Previews (Generic, Stone, Sulfur, Metal) wurden aus der v1 Density-Matrix generiert, als saubere kleine 512x512 PNGs exportiert und mit einer render-summary.json dokumentiert. (Ein Composite-Image wurde für diese Iteration ausgelassen, um das Grid so klein und sauber wie möglich zu halten). Die visuelle Qualität (Level D) wird durch das farbcodierte Heatmap-Verfahren von dunkelblau (niedrig) bis gelb/rot/weiß (hoch) erreicht.

## 3. Input & Output
**Input**:
- `experiments/resource-density-model-v1-probe/output/density-matrix-128.json` (70 KB)

**Output-Dateien (unter `experiments/resource-density-visual-renderer/src/ResourceDensityVisualRenderer/output/`)**:
- `generic-node-density-preview.png` (ca. 4 KB)
- `stone-potential-preview.png` (ca. 4 KB)
- `sulfur-potential-preview.png` (ca. 5 KB)
- `metal-ore-potential-preview.png` (ca. 5 KB)
- `render-summary.json` (kleine JSON-Meta-Datei)

## 4. Visualisierungsmethode
Wir nutzen die .NET Bibliothek `SixLabors.ImageSharp` (ohne native UI/System.Drawing Abhängigkeiten, daher cross-platform).
- **Auflösung**: 128x128 Model-Punkte hochskaliert um Faktor 4 auf ein finales 512x512 Bild.
- **Farbpalette**: Interpolierter Gradient von Dunkelblau (Wert <= 0) über Hellblau (0.3), Orange (0.5), Rot (0.8) bis hin zu Weiß (1.0).
- Ein neutraler, dunkler Hintergrund (`Rgba32(10, 15, 30)`) repräsentiert das Terrain, auf dem keine Ores vorkommen.

## 5. Einschätzung je Layer
Die Heatmaps sehen absolut plausibel aus und decken sich mit dem Wissen, wie Facepunch Node-Spawns im Map-Generator verteilt:
- **Generic Nodes**: Zeigt klar die groben Bergrücken und "Cliffs" der generierten Map als starke Spawn-Gebiete auf.
- **Stone**: Verteilt sich großzügig über die Klippen und Berge.
- **Sulfur**: Stark konzentriert in Gebieten, die Arid (Wüste) und gleichzeitig felsig sind.
- **Metal Ore**: Tritt vor allem in kalten Regionen (Arctic) und hochgelegenen Klippen konzentriert (rot/weiß) auf.

*Wichtige Produktwahrheit*: Die Bilder zeigen die **estimated sulfur potential** und **predicted metal ore density** - keine exakten Positionen.

## 6. Was für bessere Accuracy fehlt
- Wir werten in v1 (C5-A) nur das grobe Grid von `topology` und `biome` mit wenigen Hardcoded-Konstanten (`TOPOLOGY_CLIFF`) aus.
- Um das Potential noch genauer zu machen, müssten wir auch `splat` (Sand/Dirt/Rock/Snow) auswerten. Beispielsweise können Nodes oft nicht auf reinem Sand/Strand spawnen, auch wenn die Topologie es theoretisch zuließe.
- Das Model (`C5-A`) könnte eine höhere Base-Resolution (z.B. 512x512 statt 128x128) direkt aus den Rohlayern fressen, was feinere, organischere Linien an Bergen ergäbe.

## 7. Nächster kleinster Real-Implementation-Step
Da wir nun bewiesen haben:
1. Wir können die nativen Map-Daten extrahieren (C4-C)
2. Wir können probabilistische Dichte-Modelle darauf rechnen (C5-A)
3. Wir können es als visuelles Heatmap-Layer ausgeben (C5-B)

**Empfehlung**: **Phase 2.4-C6 (Worker Service Architecture)**. 
Anstatt das Modell (C5-C) weiter in Nuancen zu kalibrieren, sollten wir das gesamte Pipeline-Setup (Extrahieren -> Bewerten -> PNG speichern -> DB aktualisieren) in einen robusten asynchronen Background Worker überführen. Eine Kalibrierung der Formeln ist später viel einfacher, wenn die Basis-Pipeline stabil in der Architektur sitzt und wir die PNGs der Leaflet-Map im Frontend sofort live als Layer ansehen können.
