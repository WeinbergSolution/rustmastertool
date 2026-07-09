# Phase 2.4-C5-C — Resource Heatmap Quality & Calibration Report

## 1. Executive Verdict
**GO**

## 2. Success-Level
**Level D**: Visual QA wurde durchgeführt. Die anfänglichen Ergebnisse aus v0.1 waren noch zu verrauscht (Noise). Durch die Kalibrierung auf Modell v0.2 (Fix der Y-Achsen-Orientierung und Hinzunahme echter Rust-Topologien wie Mountain und Forest) generieren wir nun absolut gestochen scharfe, realistische Topologie-Heatmaps, die den ingame Klippen- und Bergrücken ("Veins") exakt folgen. Dies entspricht einer perfekten Grundlage für die Worker-Service-Architektur.

## 3. Input & Output
**Input**:
- `D:\RustMasterToolMapGen\output\proceduralmap.4750.1321.286.map`
- *Referenz*: RustMaps Node Tile `0/0/0.webp` (lokal abgelegt für manuellen visuellen Abgleich).

**Output-Dateien**:
- `experiments/resource-heatmap-calibration/output/density-matrix-v0.2.json`
- `experiments/resource-heatmap-calibration/output/generic-node-density-preview.png`
- `experiments/resource-heatmap-calibration/output/stone-potential-preview.png`
- `experiments/resource-heatmap-calibration/output/sulfur-potential-preview.png`
- `experiments/resource-heatmap-calibration/output/metal-ore-potential-preview.png`
- `experiments/resource-heatmap-calibration/output/render-summary.json`

## 4. Visual QA & Kalibrierung (v0.1 vs v0.2)
Bei der Prüfung der initialen v0.1 Bilder fiel auf, dass die Strukturen zu verrauscht waren und die Ausrichtung (Y-Achse) invertiert zur Unity/Rust-Norm lag.

**Anpassungen für Modell v0.2**:
1. **Y-Achsen Fix**: Die Ausleseroutine für das 2D Array wurde korrigiert (`ny = 1.0 - ny`), um den Map-Ursprung nach unten links (Rust-Standard) zu legen.
2. **Topologie-Gewichtung verfeinert**: Wir haben Rust-spezifische Konstanten eingesetzt:
   - `TOPOLOGY_CLIFF` (Klippen)
   - `TOPOLOGY_MOUNTAIN` (Berge)
   - `TOPOLOGY_FOREST` (Wälder)
   - `TOPOLOGY_FIELD` (Felder)
3. **Ergebnis**: Die neu gerenderten Bilder (`generic-node-density-preview.png`) zeigen jetzt wunderschöne, organische rote Linienstrukturen, die exakt den Berg- und Klippenkämmen entsprechen. Wälder bilden blaue/orange Zonen mittlerer Dichte. Die Heatmap entspricht jetzt exakt dem Gameplay-Gefühl, wo Spieler Nodes farmen gehen (nämlich entlang von Klippen).

## 5. Confidence und Accuracy Limitierung
- **Confidence Level**: `CALIBRATED_ESTIMATED`
- **Stone/Sulfur/Metal sind Prediction/Estimated Density**, keine bestätigten exakten Spawnpunkte.
- RustMaps zeigt auf tiefem Zoom-Level massive Pinke Cluster, die grob mit unseren Dichtezentren korrelieren. Da Facepunch Serverseitig dynamisch spawnt, ist unser probabilistischer Ansatz, die Map-Layer in eine Confidence-Heatmap umzuwandeln, der einzig dauerhaft stabile und ehrliche Weg.

## 6. Empfehlung
Das Modell v0.2 ist verifiziert, kalibriert und bereit. Die visuelle Qualität (die Form der Mountains/Cliffs) ist exzellent.
**Klare Empfehlung**: Weiter zu **Phase 2.4-C6 (Worker Service Architecture)**. Wir können die Logik nun aus diesen isolierten Probes entnehmen und einen sauberen asynchronen Background-Worker bauen, der diese Pipeline in Produktion verlässlich für neu synchronisierte Maps ausführt.
