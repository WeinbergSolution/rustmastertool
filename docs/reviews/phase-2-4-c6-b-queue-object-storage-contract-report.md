# Phase 2.4-C6-B — Queue/Object Storage Contract & Dry-Run Publisher

## 1. Executive Verdict
**GO**

## 2. Success-Level
**Level D**: Der Storage-Contract ist vollständig ausdefiniert und über einen in C# integrierten `PublishStage` Dry-Run validiert. Alle Output-Artefakte (Manifeste, Previews, Tiles) werden korrekt in einen strukturierten Cloud Storage Upload-Plan überführt. Die Architektur ist bereit für eine echte Supabase Storage- oder S3-Integration.

## 3. Branch- & Worktree-Sicherheit
Es wurde strikt lokal im isolierten Worker-Verzeichnis auf Branch `experiment/map-intelligence-storage-contract` gearbeitet.
- Kein Push, kein Deploy.
- Keine Anpassungen im `apps/web` (Frontend).
- Keine Supabase-DB- oder Storage-Bucket-Erstellung.
- Landing/Pricing/Auth-Worktree der parallelen Instanz wurde nicht berührt.

## 4. Storage Contract
- **Bucket**: `map-intelligence` (Empfehlung: Public Read oder Signed CDN-URL)
- **Prefix**: `map-intelligence/{cacheKey}` (z.B. `map-intelligence/map-intel:286:1321:4750:...`)
- **Cache-Control**:
  - `manifest.json` / `tile-manifest.json`: `public, max-age=3600` (kurzes Caching, falls Updates nötig)
  - `previews/*.png` / `tiles/*.png`: `public, max-age=31536000, immutable` (Cache für 1 Jahr, da Versionierung durch `cacheKey` + `modelVersion` im Pfad unveränderlich ist)
- **Content Types**: `application/json` für Manifeste, `image/png` für Bilder.

## 5. Publish Plan (Dry-Run Ergebnisse)
Der Befehl `dotnet run --publish-dry-run true` erzeugte den `publish-plan.json`:
- **Anzahl Objekte**: 94 Objekte (2 Manifeste, 8 Previews, 84 Tiles)
- **Gesamtgröße**: ca. 6.36 MB (hochoptimiert durch PNG Transparenz)
- **Kategorien**: `manifest`, `preview`, `tile`

Beispielhaftes Ziel-Objekt (Tile):
`map-intelligence/map-intel:286:1321:...:resource-density-v0.2:v1.0/tiles/resource-density-v0.2/overlay/sulfur-potential/2/1/2.png`

## 6. Queue Job Contract
Für den späteren asynchronen Worker-Einsatz wurde in `PublishStage.cs` folgender C# Contract dokumentiert:
- **MapIntelligenceJobRequest**: Enthält u.a. `jobId`, `sourceMapPath`, Map-Parameter (Seed, Size), und requested Outputs (Manifest, Previews, Tiles).
- **MapIntelligenceJobResult**: Liefert zurück `jobId`, `status` (`queued`, `running`, `completed`, `failed`, `expired`), `cacheKey` und Pfade zu den finalen Manifest-Objekten.

## 7. Leaflet & Public URL Templates
Die öffentlichen Supabase Storage URLs folgen diesem Template:
`{storageBaseUrl}/storage/v1/object/public/map-intelligence/map-intelligence/{cacheKey}/tiles/resource-density-v0.2/overlay/{resource}/{z}/{x}/{y}.png`

Damit kann Leaflet später problemlos das Layer aufbauen:
```javascript
// Beispiel für sulfur-potential
L.tileLayer(`${storageBaseUrl}/storage/v1/object/public/map-intelligence/map-intelligence/${cacheKey}/tiles/resource-density-v0.2/overlay/sulfur-potential/{z}/{x}/{y}.png`)
```

## 8. Was bewusst NICHT gebaut wurde
- Keine echten Uploads.
- Keine Supabase SDK / S3 Client Integration.
- Keine Datenbank-Updates oder echte Message-Queue.
- Keine API und kein Frontend.

## 9. Nächster Schritt
Da der Upload-Vertrag und die Pfadstruktur nun eindeutig sind, bestehen zwei klare Folgepfade:
- **C6-D (Supabase Storage Publisher Implementation)**: Echten Supabase C# Client einbauen, um den Publish-Plan tatsächlich ins Internet hochzuladen.
- **C7-A (Frontend Tile Overlay Integration)**: Im Frontend den Leaflet-Viewer anpassen und die Tiles als Dummy/Local-Files einbinden, sobald der Frontend-Branch dafür frei/mergbar ist.
