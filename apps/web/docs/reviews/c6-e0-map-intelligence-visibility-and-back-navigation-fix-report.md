# C6-E0 Review Report: Map Intelligence Visibility & Back Navigation Fix

**Executive Verdict:** GO (Fixes applied successfully, pending local user verification)

### Branch & Commit Info
- **Branch:** `experiment/landing-pricing-auth-foundation`
- **Finaler Commit Hash:** `9a1ad07`
- **Vorheriger Commit `a41eebf` (C6-E) vorhanden:** Ja, liegt erfolgreich in der Historie.
- **Vercel Deployment URL:** (Kein Auto-Deployment in diesem Experiment-Worktree, Pascal führt lokales Deployment/Preview aus).

### 1. Map Intelligence Visibility Fix
**Problem:**
Die in C6-E entwickelten Resource Layer (Heatmaps) waren im regulären Server-Flow nicht sichtbar. Pascal klickte im `ServerExplorer` oder auf der Serverkarte auf das Map-Icon und sah nur die Tabs "Clean Image" und "Icon Image", jedoch keine Heatmap-/Tile-Ansicht.

**Ursache:**
Die Komponente `ServerMapViewer.tsx` rendered die Map-Intelligence-Ressourcen-Layers derzeit *ausschließlich* im "Tile Mode" (`viewerMode === 'tile'`). Dieser Modus war jedoch hard-coded an die Bedingung `hasTileBase` gebunden. Wenn die API (RustMaps) für den angewählten Server keine validen Base-Tiles (`providerData.tileBaseUrl`) lieferte, sperrte die Logik den "Tile Mode" komplett. Dadurch blieben die "Tile Mode"-Buttons und das Sidebar-Menü für die Resource Layer verborgen.

**Lösung (Option A - Hybrid Ansatz):**
1. **Fallback Logic:** Der "Tile Mode" wird nun nicht mehr strikt geblockt, wenn keine API-Tile-Base vorhanden ist. Stattdessen ist `canUseTileMode` jetzt auf `true` gesetzt, sobald mindestens *ein* Map Intelligence Layer (wie das Smoke-Test Tile) zur Verfügung steht.
2. **ImageOverlay Base:** Wenn `RustMapsTileViewer` geladen wird, aber keine `tileBaseUrl` übergeben wurde, wird das *statische Bild* (`providerImage`) als `ImageOverlay` anstelle eines Leaflet TileLayers gerendert.
3. Die Supabase Heatmap Tiles werden anschließend wie gewohnt über dieses Basisbild via Leaflet gelegt.
4. Dadurch kann Pascal den Map-Flow regulär ausführen (Klick auf Map-Icon) und findet dort die Tile-/Ressourcen-Ansicht.

### 2. Back Navigation Fix
**Problem:**
Ein Klick auf "Zurück" schloss nicht nur das Server Detail oder den Map Viewer, sondern beförderte den User aus der gesamten `/app`-Routenebene zurück zur Landing-Page (`/`).

**Ursache:**
Die Schichten (Overlay-Panels wie Filter, Detailkarte oder Map Viewer) nutzten den Hook `useInAppBack.ts`, um eine eigene History-Ebene in den Browser zu pushen. Allerdings war dieser Mechanismus im Code hart auf `enabled: isMobile` (Mobile-Only) limitiert. Da Pascal vermutlich am Desktop testete, pushte der Hook keine App-internen States. Ein Druck auf den "Zurück"-Pfeil löste dann die reguläre Browser-History aus, welche ihn unweigerlich aus der App-Umgebung zurück auf die Landingpage warf.

**Lösung:**
Die Limitierung auf `isMobile` wurde im `ServerExplorer.tsx` und `Watchlist.tsx` für Map Viewer, Filter und Server Detail komplett entfernt (`enabled: true`). 
- Der Hook `useInAppBack` blockt nun standardmäßig auch auf dem Desktop den harten Routenwechsel ab, wenn eines dieser Overlays aktiv ist, und schließt dieses sicher ab. 
- Die App-internen Buttons ("X"-Button) wurden nicht überschrieben und verbrauchen ihre States sauber. Beide Systeme arbeiten nun Hand in Hand.

### Wie Pascal testen soll:
1. Starte die lokale Testumgebung.
2. Gehe in den `/app` Bereich in den `Server Explorer`.
3. Klicke bei einem kompatiblen Server auf das grüne Map-Icon.
4. Beobachte im geöffneten Map-Fenster, dass (neben Clean und Icon) auch die Resource Layers / der Tile Mode aufrufbar sind, selbst wenn die API keine Leaflet Base-Tiles zur Verfügung stellt.
5. Löse testweise den Hardware/Browser-Back Button aus, während das Map-Fenster offen ist. Du solltest **nicht** auf der Landingpage landen, sondern zurück zur Explorer-Listenansicht bzw. Detailkarte gelangen.
