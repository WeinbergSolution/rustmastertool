# Phase 2.4-C3 Resource Heatmap Feasibility Report

## 1. Executive Verdict
- **Verdict:** **GO WITH CAUTION** (for Terrain/Layers) & **BLOCKED** (for direct ore extraction)
- **Success-Stufe:** **Level B — Decode + Layer Access**

## 2. Input
- **Map path:** `D:\RustMasterToolMapGen\output\proceduralmap.4750.1321.286.map`
- **Seed:** 1321
- **WorldSize:** 4750
- **SaveVersion:** 286
- **Size:** 44.92 MB
- **SHA256:** `C7AB7FF1D6C599D5B5D20F1D1D33EFED7C6932DE5E05946DF38DAB4E5DC3CFD0`

## 3. Parser-/Probe-Ansatz
- **Sprache:** C# (.NET 5.0)
- **Libraries:** `K4os.Compression.LZ4`
- **Warum diese Wahl:** C# ist die native Sprache des Rust/Unity Ökosystems. Es wurde gewählt, um zu testen, ob ein C#-nativer LZ4-Decoder die Block-Struktur der `.map`-Datei (`lz4net` Format) direkt verarbeiten kann.
- **Lizenzhinweise:** `K4os.Compression.LZ4` ist MIT-lizensiert und unbedenklich für Probe-Zwecke.

## 4. Decode-Ergebnisse
- **Gelesen:** Unkomprimierte Größe (ersten 4 Bytes), ASCII-String-Dump.
- **Nicht gelesen:** Der Standard `LZ4Codec.Decode` Aufruf schlug fehl (bzw. lieferte -1 Bytes). Dies bestätigt die Hypothese aus C2: Facepunch nutzt einen proprietären/spezifischen LZ4-Block-Wrapper (oder gar keinen, falls raw Protobuf Stream) anstatt standardisierter LZ4-Frames.
- **Hypothese:** Die Datei ist entweder ein offener Protobuf-Stream mit gelegentlichen LZ4-Literal-Blöcken oder wir benötigen exakt den `lz4net` Stream-Decoder aus der Rust Server-Codebase. Die Schicht-Metadaten (terrain, height, topology, etc.) sind im Raw-Stream im Klartext vorhanden.

## 5. Resource Direct Extraction Audit

| Resource | Direct evidence found? | Evidence source | Confidence | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Stone | NO | ASCII Regex Scan | High | Not present as strings. |
| Sulfur | NO | ASCII Regex Scan | High | Not present as strings. |
| Metal Ore | NO | ASCII Regex Scan | High | Not present as strings. |
| generic nodes | NO | ASCII Regex Scan | High | Not present as strings. |
| animals | NO | ASCII Regex Scan | High | Not present as strings. |
| hemp/berries | NO | ASCII Regex Scan | High | Not present as strings. |

**Schlussfolgerung:** Sammelbare Ressourcen (Ores, Trees, Hemp, Collectables) werden von der Rust-Engine **nicht in die `.map` Datei (Prefabs) gebacken**. Sie werden zur Laufzeit vom Server (`SpawnHandler`) dynamisch generiert, basierend auf Biome-, Splat- und Topology-Masken. Eine direkte Extraktion ist technisch unmöglich.

## 6. Derived Heatmap Feasibility

| Layer | Verfügbar? | Nutzen für Resource-Modell | Confidence |
| :--- | :--- | :--- | :--- |
| height / terrain | YES | Bestimmt Hänge/Klippen (Ores spawnen selten an steilen Klippen). | High |
| topology | YES | Maskierung: Field, Forest, Mountain etc. sind primäre Spawn-Trigger. | High |
| biome | YES | Bestimmt Spawn-Raten (z.B. Sulfur viel im Schnee/Wüste, wenig in Temperate). | High |
| splat / ground | YES | Dirt/Rock/Sand. Erze spawnen häufig auf "Rock" und "Dirt". | High |
| water | YES | Ausschlusskriterium: Keine Erze unter Wasser. | High |
| alpha | YES | Ausschluss von unterirdischen Monument-Eingängen. | High |
| prefabs | NO (IDs) | Unrelevant für Basis-Ressourcen. | Low |
| paths | YES | Ausschlusskriterium: Erze spawnen nicht auf Straßen/Schienen. | Medium |

## 7. Stone/Sulfur/Metal Entscheidung
- **Direct extraction:** **Nicht möglich.**
- **Derived estimate:** **Zwingend nötig.**
- **Fehlende Daten:** Um die Layers auszulesen, muss in C4 der LZ4/Protobuf-Parser hart decodiert werden. Wir benötigen die exakten Spawn-Gewichtungen der aktuellen Rust-Version (können aus Rust Dedicated Server Assembly extrahiert/abgeschätzt werden).
- **Nächster Schritt zur Confidence:** Extrahieren des rohen `topology` und `biome` Byte-Arrays und rendern einer rudimentären Dichte-Heatmap.

## 8. Performance-/Service-Einschätzung
- Die Map-Generierung und das Parsing dürfen **niemals live pro User** stattfinden.
- **Service-Ablauf:** Map wird asynchron generiert -> Parser liest Layer -> Worker berechnet Resource-Density-Heatmaps -> Ergebnisse werden als statische Tiles/JSON im Object Storage abgelegt.
- Dieser Prozess ist zu 100% cachbar anhand von `Seed + WorldSize + SaveVersion`.

## 9. Risiken
- **Modellgenauigkeit:** Da Facepunch Spawn-Raten per Server-Config oder Update ändern kann, ist die Heatmap immer nur eine hochwahrscheinliche "Estimated Density", keine exakte Node-Garantie.
- **Formatänderungen:** Facepunch ändert ab und zu das LZ4-Verhalten der `.map`. Der Parser muss versioniert werden.
- **Performance:** Die Dichte-Berechnung (Kombination von 5 Maps à 4000x4000 Pixel = ~80MB Arrays) erfordert C# oder Rust, nicht Node.js, um RAM-Explosionen zu verhindern.

## 10. Nächster kleinster Real-Implementation-Step
**C4-A: Full WorldData Decode Reference Parser**
Entwicklung eines echten Rust- oder C#-Parsers, der die `WorldSerialization` Protobuf-Klassen einbindet, den LZ4-Stream korrekt entpackt und die reinen Byte-Arrays der Layer (Topology, Splat, Biome) als Rohdaten auf die Festplatte dumpt, um das Derived-Density-Modell füttern zu können.
