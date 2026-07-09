# Phase 2.4-C6-B2 — Storage Contract Hardening & URL Path Fix

## A. Executive Verdict
**GO**

## B. Success-Level
- **Level A**: Storage Contract geprüft.
- **Level B**: Doppelte `map-intelligence` URL/Path-Problematik erfolgreich behoben.
- **Level C**: `publish-plan.json` und Manifeste sind in sich und untereinander vollständig konsistent.
- **Level D**: Contract ist nun makellos und zu 100% bereit für einen echten Supabase Storage Publisher.

## C. Branch-/Worktree-Sicherheit
Die Sicherheitsrichtlinien wurden strikt eingehalten:
- **Kein Push, kein Deploy, kein Main-Merge.**
- Keine Änderungen an `apps/web`.
- Keine Änderungen an Supabase/DB/Env/Secrets.
- Instanz 2 und deren Worktree (`experiment/landing-pricing-auth-foundation`) wurden nicht berührt.
- Es wurden keine echten Uploads durchgeführt.

## D. Korrigierter Storage Contract
Der Vertrag ist nun sauber entflochten:
- **Bucket**: `map-intelligence`
- **Object Prefix**: `{cacheKey}/`
- **Object Path (Beispiele)**:
  - `{cacheKey}/manifest.json`
  - `{cacheKey}/previews/overview/sulfur-potential.png`
  - `{cacheKey}/tiles/resource-density-v0.2/overlay/stone-potential/2/1/1.png`
- **Supabase Public URL (Beispiel)**:
  - `{supabaseUrl}/storage/v1/object/public/map-intelligence/{cacheKey}/tiles/resource-density-v0.2/overlay/stone-potential/2/1/1.png`
- **Leaflet URL Template**:
  - `{storagePublicBaseUrl}/{cacheKey}/tiles/resource-density-v0.2/overlay/{resource}/{z}/{x}/{y}.png`

## E. Vorher / Nachher Vergleich
**Vorher falsch**:
`map-intelligence/map-intelligence/{cacheKey}/...` (Map-Intelligence als Bucket UND im Object Path).

**Nachher richtig**:
`map-intelligence/{cacheKey}/...` (Das erste `map-intelligence` ist der Supabase Bucket, der Rest der reine Object Path).

## F. Publish Plan Status
Der Dry-Run Publisher hat die neuen Pfade korrekt in `publish-plan.json` eingebaut.
- **Anzahl Objekte**: 94
- **Gesamtgröße der zu veröffentlichenden Assets**: 6.36 MB
- **Größe von `publish-plan.json`**: ca. 116 KB (Das ist winzig und unproblematisch fürs Repository).
- **Beispiel-Objekt aus dem Plan**:
```json
{
  "cacheKey": "map-intel:286:1321:...",
  "bucket": "map-intelligence",
  "objectPath": "map-intel:286:1321:.../tiles/resource-density-v0.2/overlay/stone-potential/1/0/1.png",
  "publicUrlTemplate": "{supabaseUrl}/storage/v1/object/public/map-intelligence/map-intel:286:1321:.../tiles/resource-density-v0.2/overlay/stone-potential/1/0/1.png",
  "leafletUrlTemplate": "{storagePublicBaseUrl}/map-intel:286:1321:.../tiles/resource-density-v0.2/overlay/stone-potential/1/0/1.png",
  "localFile": "../../output/tiles/resource-density-v0.2/overlay/stone-potential/1/0/1.png",
  "contentType": "image/png",
  "cacheControl": "public, max-age=31536000, immutable",
  "fileSize": 65997,
  "category": "tile",
  "resource": "stone-potential",
  "zxy": "1/0/1"
}
```
*Hinweis*: Für die Immutable-Assets (identifiziert über `{cacheKey}`) wird korrekt `public, max-age=31536000, immutable` verwendet. Mutable Aliase (z.B. ein `latest` Pointer) wurden in diesem Contract bewusst noch nicht modelliert.

## G. Nächster Schritt
**Empfehlung: C6-D (Supabase Storage Publisher Implementation)**
Da der Storage-Vertrag und die URL-Pfade nun eindeutig, robust und sauber sind, kann der Map Intelligence Worker mit einem Supabase C# Client ausgestattet werden, um den Dry-Run Publish-Plan in einen echten Upload zu übersetzen.

**ACHTUNG**: Dies erfordert ein explizites *GO* für echte Supabase/Storage Arbeit!
