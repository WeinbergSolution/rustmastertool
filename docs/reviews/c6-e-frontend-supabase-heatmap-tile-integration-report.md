# C6-E — Frontend Supabase Heatmap Tile Integration Report

## Executive Verdict
**GO**

Die Integration der Supabase Map Intelligence Tiles in den bestehenden `ServerMapViewer` ist erfolgreich abgeschlossen.

## Zusammenfassung
- **Branch**: `experiment/landing-pricing-auth-foundation`
- **Finaler Commit Hash**: `ae9e3f6`
- **Verwendeter Supabase Bucket**: `map-intelligence`
- **Verwendeter Object Prefix (Hardcoded Smoke-Test)**: `map-intel:286:1321:4750:c7ab7ff1d6c599d5b5d20f1d1d33efed7c6932de5e05946df38dab4e5dc3cfd0:resource-density-v0.2:v1.0`

## Technische Details

### Sichtbare Layer (Map Intelligence)
Die folgenden Layer werden nun aus Supabase geladen und im "Resource Layers" Menü bereitgestellt, gekennzeichnet mit ehrlichen Labels:
- **Generic Nodes (Potential)**: Estimated areas, not exact spawn positions.
- **Stone Ore Potential (Estimated)**: Estimated heatmap based on topology and biome data. Not exact spawn positions.
- **Sulfur Ore Potential (Estimated)**: Estimated heatmap based on topology and biome data. Not exact spawn positions.
- **Metal Ore Potential (Estimated)**: Estimated heatmap based on topology and biome data. Not exact spawn positions.

### Manifest Load & Tile Structure
- Ein Utility (`mapIntelligenceStorage.ts`) wurde implementiert, welches `manifest.json` und `tile-manifest.json` asynchron von der generierten Public Supabase URL lädt.
- Die geladenen Layer-Keys aus `tile-manifest.json` (bzw. Fallbacks) werden an den bestehenden `RustMapsTileViewer` durchgereicht.

### Fehlerbehandlung
- **Fehlendes Manifest/Fehler beim Laden**: Wenn `manifest.json` oder `tile-manifest.json` nicht verfügbar sind, wird in der Sidebar eine "Map intelligence unavailable" Fehlermeldung ausgegeben ("Standard provider data will be used if available"). Die Server-Map bleibt unberührt voll nutzbar.
- **404 Tiles**: Die Layer können weiterhin getogglet werden. Fehlende Tiles werden vom `SafeTileLayer` gracefully ignoriert bzw. transparent gezeichnet.

## Was bewusst NICHT gebaut wurde
- **Keine DB-Verknüpfung (Server → CacheKey)**: Das hardcodierte Object Prefix dient aktuell als einziger Hook für die Heatmap Tiles, bis das Backend die Metadaten per DB weitergibt.
- **Keine automatische Map-Generation pro Server**: Wir hooken uns manuell über das Smoke-Test-Prefix ein.
- **Keine Uploads & Bucket Policy-Änderungen**: Alles funktioniert rein via public Reads.
- **Keine Secrets**: Es wird nur der existierende `VITE_SUPABASE_URL` via Vite's `import.meta.env` und public Access genutzt.
- **Kein Production Deploy**: Die Änderungen verbleiben isoliert im `experiment/landing-pricing-auth-foundation` Branch.

## Prüfschritte
1. Vercel Preview für Commit `ae9e3f6` öffnen (oder lokal).
2. `/app` (ggf. Test Bypass 1337) betreten und in der Server Liste einen Server auswählen.
3. Im Server Detail Panel auf den Map Viewer ("View Map") klicken.
4. Oben rechts (falls generierte Map) auf "Tile Mode" schalten.
5. In der Sidebar links im Bereich "Resource Layers" die Layer `Generic Nodes`, `Stone Ore`, `Sulfur Ore` oder `Metal Ore` aktivieren.
6. Prüfen, ob die Layer auf der Leaflet Karte visualisiert werden, während die Labels in der UI auf Schätzungen (Potential / Estimated) hinweisen.
