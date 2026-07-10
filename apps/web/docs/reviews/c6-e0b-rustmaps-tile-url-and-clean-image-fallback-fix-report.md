# C6-E0B Review Report: RustMaps Tile URL & Clean Image Fallback Fix

**Executive Verdict:** GO (Fixes applied successfully, pending local user verification)

### Branch & Commit Info
- **Branch:** `experiment/landing-pricing-auth-foundation`
- **Finaler Commit Hash:** `7e8eada`
- **Push erfolgreich:** (Wird nach diesem Bericht gepushed)
- **Vercel Preview Status:** (Kein Vercel Auto-Deployment für diesen Experiment-Worktree, Pascal führt lokales Deployment/Preview aus).

### 1. Tile URL Bug fixen
**Problem:**
Die RustMaps Tile URLs wurden doppelt mit `/{z}/{x}/{y}.webp` versehen, was zu 404 Fehlern (z.B. `tiles-webp/1/1/1.webp/1/1/1.webp`) und einer schwarzen Karte in Leaflet führte.
**Welche Datei hat die kaputte URL erzeugt?**
`apps/web/src/features/map/RustMapsTileViewer.tsx`
**Vorherige falsche URL-Struktur:**
`${tileBaseUrl.replace(/\/$/, '')}/{z}/{x}/{y}.webp` (wobei `tileBaseUrl` oftmals schon `{z}` beinhaltete)
**Neue korrekte URL-Struktur:**
Es wurde eine Helper-Funktion `formatTileUrl(url)` eingeführt. Diese prüft, ob die URL bereits `{z}` enthält. Wenn ja, wird die URL 1:1 verwendet. Nur wenn es sich um einen simplen Base-Prefix handelt, wird `/{z}/{x}/{y}.webp` einmalig angehängt.
**Beispiel korrekte Tile URL:**
`content.rustmaps.com/maps/.../tiles-webp/{z}/{x}/{y}.webp`

### 2. Clean Image Fallback erzwingen
**Problem:**
Wenn die RustMaps API für `tileBaseUrl` zwar eine URL liefert, diese aber in einen 404 Fehler läuft (oder die Kacheln serverseitig fehlen), versuchte Leaflet trotzdem, Kacheln zu laden, und die Map blieb schwarz.
**Lösung:**
Der `SafeTileLayer` überwacht nun das Leaflet `tileerror`-Event. Wenn ein Tile-Error auftritt (z.B. 404), meldet der Layer dies an den `RustMapsTileViewer` zurück (`setBaseTilesFailed(true)`). 
**Ob Clean Image Fallback aktiv ist:**
Ja. Wenn `baseTilesFailed` ausgelöst wird (oder gar keine `tileBaseUrl` existiert), schaltet Leaflet sofort auf das `ImageOverlay` (Clean Image Fallback) um. Die schwarzen Lücken verschwinden.
**Ob Resource Layers weiterhin über dem Clean Image liegen:**
Ja. Die Resource Layers (Generic Nodes, Stone Ore Potential etc.) werden völlig unabhängig vom Base Layer gerendert (`zIndex: 3 + i`) und legen sich passgenau über das Clean Image.
**Ob Browser Back Fix aus C6-E0 erhalten bleibt:**
Ja, an den Routen oder `useInAppBack` wurde in diesem Fix nichts geändert, der Fix aus C6-E0 bleibt voll intakt.

### Checks
- **npm run typecheck:** Erfolgreich absolviert, keine Fehler.
- **npm run build:** Erfolgreich absolviert.
- **git status:** Clean tree (nach Commit).

### Bestätigung der Arbeitsregeln:
- **kein Main Merge:** Bestätigt.
- **kein Production Deploy:** Bestätigt.
- **keine Supabase/DB/Env/Secret Änderungen:** Bestätigt.
- **keine Map-Pipeline-Dateien verändert:** Bestätigt.
- **keine Secrets:** Bestätigt.
