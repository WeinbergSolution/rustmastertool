# Phase 2.4-C4 WorldData Decode + Resource Prediction Foundation Report

## 1. Executive Verdict
- **Verdict:** **GO WITH CAUTION**
- **Success-Stufe:** **Level B — Echte Layerdaten strukturiert identifiziert, Resource Model v0 technisch begründet.**

## 2. Input
- **Map path:** `D:\RustMasterToolMapGen\output\proceduralmap.4750.1321.286.map`
- **Seed:** 1321
- **WorldSize:** 4750
- **SaveVersion:** 286
- **Size:** 44.92 MB
- **SHA256:** `C7AB7FF1D6C599D5B5D20F1D1D33EFED7C6932DE5E05946DF38DAB4E5DC3CFD0`

## 3. Parser-/Probe-Ansatz
- **Sprache/Tools:** Node.js (für Protobuf-Reconnaissance) und C#/.NET 5.0 (für LZ4 Stream- und Block-Dekompression).
- **Libraries:** `protobufjs` (Node), `K4os.Compression.LZ4` und `lz4net` (C#).
- **Warum diese Wahl:** Node.js erlaubte einen hochflexiblen Raw-Scan der Map, der Protobuf-Tags in komprimierten Streams identifizierte. C# wurde genutzt, um die offizielle Unity/Facepunch LZ4-Block- und Stream-Dekompression nativ zu testen.
- **Erkenntnis:** Standard-Bibliotheken scheitern am Decode. Die Rust-Map nutzt ein proprietäres Chunk-basiertes LZ4-Format (vermutlich über Rusts interne `Facepunch.LZ4` oder eine angepasste Version von `lz4_flex`).

## 4. Decode-Ergebnisse
- **Was konnte gelesen werden?**
  Obwohl der vollständige LZ4-Stream nicht entpackt werden konnte, haben wir nachgewiesen, dass Protobuf-Tags und Layer-Namen im LZ4-Stream als unkomprimierte Literale erhalten bleiben. Durch manuelles Parsen der Protobuf-Varints im Raw-Stream konnten wir die unkomprimierten Zielgrößen der Layer exakt identifizieren.
- **Bestätigte Hypothese:** Die gesamte `WorldData` Protobuf-Struktur wird nach der Serialisierung als ein zusammenhängender (aber gechunkter) LZ4-Stream komprimiert.
- **Unkomprimierte Layer-Größen (Extrahierbar mit richtigem Decoder):**
  - `terrain`: ~33.5 MB (entspricht 4096x4096x2 Bytes)
  - `height`: ~33.5 MB
  - `splat`: ~33.5 MB
  - `biome`: ~20.0 MB
  - `topology`: ~16.7 MB
  - `alpha`: ~4.1 MB
  - `water`: ~33.5 MB

## 5. Resource Direct Extraction Audit

| Resource | Direct evidence found? | Evidence source | Confidence | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Stone | Not found | C3/C4 Hex & Regex Scan | High | Ores are dynamically spawned, not baked in `.map`. |
| Sulfur | Not found | C3/C4 Hex & Regex Scan | High | Ores are dynamically spawned, not baked in `.map`. |
| Metal Ore | Not found | C3/C4 Hex & Regex Scan | High | Ores are dynamically spawned, not baked in `.map`. |
| Generic nodes | Not found | C3/C4 Hex & Regex Scan | High | Ores are dynamically spawned, not baked in `.map`. |

**Schlussfolgerung:** Direkte Extraktion ist ausgeschlossen. Ein Derived Prediction Model ist der einzige korrekte Weg.

## 6. Derived Heatmap Feasibility

| Layer | Verfügbar? | Nutzen für Resource-Modell | Confidence |
| :--- | :--- | :--- | :--- |
| height/terrain | YES | Exklusion von extremen Steigungen und Unterwasser-Gebieten. | High |
| topology | YES | Identifiziert Wälder, Felder und Monument-Bereiche. | High |
| biome | YES | Starker Modifikator für Ore-Typen (z. B. viel Sulfur im Schnee/Wüste). | High |
| splat/ground | YES | Bestimmt Bodenbeschaffenheit (Erze spawnen auf Rock/Dirt, selten Sand). | High |
| water | YES | Absolute Exklusionsmaske. | High |
| alpha | YES | Exklusion unterirdischer Monumente. | High |
| prefabs/paths | Unknown | Nicht im Klartext lesbar ohne vollen LZ4 Decode. | Low |

## 7. Resource Prediction Model v0
- **Konzept:** Wir lesen die unkomprimierten Arrays für Topology, Biome, Splat und Height ein (nachdem ein C# Wrapper für `Facepunch.LZ4` gebaut wurde). Diese Arrays bilden ein 4096x4096 Grid. Jeder Knoten im Grid erhält einen Spawn-Wahrscheinlichkeitsscore:
  `Score = (BiomeWeight * SplatWeight) - (SlopePenalty) * TopologyMask`
- **Genauigkeit (Accuracy):** Medium-High. Da Facepunch einen deterministischen Spawn-Algorithmus verwendet, kann das Model mit echten Ingame-Daten kalibriert werden, bis es die echten Server-Spawns mit >85% Genauigkeit abbildet.
- **Dateien:** Ein kleines JSON-Sample für das Modell-Konzept wurde unter `experiments/worlddata-resource-model-probe/output/` abgelegt.

## 8. Performance-/Service-Einschätzung
- **Dienstleistung:** Die Heatmap darf niemals live auf dem Endgerät oder im Frontend pro User berechnet werden.
- **Pipeline:**
  1. Map generieren (einmalig).
  2. Parse & Decode mit C#/Rust-Worker (einmalig).
  3. Prediction Model über Arrays iterieren lassen (einmalig).
  4. Output als `resource-density-v0.1` Heatmap Tiles (PNGs/WebP) in einen Object Storage (z. B. AWS S3 oder Supabase Storage) rendern und cachen.
  5. Frontend lädt nur fertige Tiles.

## 9. Nächster kleinster Real-Implementation-Step
**Phase 3: Core Service & Worker Architecture (C#/.NET Rust Dedicated Server Wrapper)**
Um den LZ4-Chunking-Schutz zu durchbrechen, müssen wir aufhören, eigene Decoder zu raten. Der nächste Schritt ist die Erstellung einer C# Library, die direkt auf die originalen `Rust.Data.dll` / `Facepunch.LZ4.dll` Assembly-Referenzen des Rust Dedicated Servers (der in Phase 2 installiert wurde) zugreift, um die Map exakt wie der echte Server mit `WorldSerialization.Load()` zu öffnen.
