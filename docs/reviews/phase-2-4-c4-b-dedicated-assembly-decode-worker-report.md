# Phase 2.4-C4-B Dedicated-Assembly Decode Worker Report

## A. Executive Verdict
- **Verdict:** **BLOCKED (Native Unity ECall Dependency)**
- **Success-Level:** **Level B** — Assemblies discovered, Decode path identified, but execution blocked by Unity Runtime Native Bindings.

## B. Input
- **Map path:** `D:\RustMasterToolMapGen\output\proceduralmap.4750.1321.286.map`
- **Seed:** 1321
- **WorldSize:** 4750
- **SaveVersion:** 286
- **SHA256:** `C7AB7FF1D6C599D5B5D20F1D1D33EFED7C6932DE5E05946DF38DAB4E5DC3CFD0`
- **Server Root:** `D:\RustMasterToolMapGen\server`

## C. Assembly Discovery
- **Gefundene Assemblies:** 
  In `RustDedicated_Data/Managed/` wurden unter anderem `Rust.Data.dll`, `Rust.World.dll`, `Assembly-CSharp.dll`, `LZ4.dll`, `LZ4pn.dll`, `Facepunch.System.dll` erfolgreich identifiziert.
- **Identifizierte Typen:**
  Über Reflection wurde der Typ `WorldSerialization` in `Rust.World.dll` gefunden. Er besitzt einen parameterlosen Konstruktor und eine `Load(string)` sowie `Load(byte[])` Methode.
- **Lizenz-Hinweis:**
  Die Assemblies wurden ausschließlich lokal über `AssemblyResolve` referenziert und inspiziert. Keine Redistribution, keine Commits proprietärer DLLs.

## D. Decode Attempt
- **Versuch:** 
  Der C# Worker instanziierte `WorldSerialization` via Reflection (`Activator.CreateInstance`) und rief die Methode `Load` mit dem Map-Pfad auf.
- **Ergebnis:** **FEHLGESCHLAGEN**.
- **Exception:** `System.Security.SecurityException: ECall methods must be packaged into a system module.`
- **Grund (Blocker):** 
  Die `Load`-Methode (oder eine ihrer tiefen Abhängigkeiten, wie Facepunchs LZ4-Block-Decompression) ruft native Unity Engine-Methoden auf (sogenannte `[MethodImpl(MethodImplOptions.InternalCall)]` ECalls). Solche Methoden benötigen den vollständigen C++ Kern der Unity Engine zur Laufzeit. Unser isolierter .NET 5 Konsolen-Worker kann diese C++ Pointer nicht auflösen und scheitert sofort mit einer `SecurityException`.

## E. Extracted Layer Metadata
- *Keine neuen Daten.* Der Ladevorgang brach ab, bevor Byte-Arrays extrahiert werden konnten. (Die Layergrößen aus C4-A gelten weiterhin als bestes Wissen).

## F. Resource Heatmap Konsequenz
- **Direct Ore Extraction:** Weiterhin auf "Not found / Blocked" klassifiziert. Es bleibt beim Derived Model.
- **Heatmap Blockade:** Da wir die Map nicht mit den originalen DLLs entpacken können (weil uns der Unity Runtime-Context fehlt), kommen wir nicht an die unkomprimierten Pixel der Layer ran.
- **Fazit:** Wir können den "faulen" Weg (Reflection der Game-DLLs in einer reinen Konsole) nicht gehen. 

## G. Performance-/Service-Ausblick
- Da der Standalone-Worker die Assemblies nicht nutzen kann, ohne die Unity Engine zu starten, scheidet ein leichtgewichtiger C# Service, der einfach `Rust.World.dll` importiert, aus.
- Wir müssen entweder:
  1. Den Parser komplett in C#/Rust re-implementieren, der die Protobuf-Varints und LZ4-Chunks *nativ* ohne Unity entpackt (Reverse Engineering).
  2. Oder ein kleines Unity-Projekt (Unity Headless Server) bauen, welches die Map lädt und als JSON/Binary über IPC an das Tool sendet.
  3. Oder ein Oxide/Harmony-Plugin schreiben, welches im *echten* Server mitläuft und die Map dumpt, sobald sie generiert wurde.

## H. Nächster kleinster Real-Implementation-Step
**Empfehlung: C4-C — Reimplement Legacy LZ4/WorldData Decoder without server assemblies**
Wir müssen einen echten C# Parser schreiben, der das genaue Facepunch/LZ4 Chunk-Format reverse-engineered (z. B. durch Analyse offener Rust-Map-Parser-Bibliotheken wie `RustMap`), um die Map-Layers nativ und ohne Unity Engine Dependencies zu extrahieren.
Alternativ: **Phase C5-A — Oxide Dumper Plugin** (Rust Plugin, das im Hintergrund läuft und die Map beim Booten als Heatmap-Rohdaten auf die Platte dumpt).
