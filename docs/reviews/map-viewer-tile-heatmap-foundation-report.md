# Tile Map Foundation & Confirmed Heatmap Layers Report

## Confirmed pageData Fields
The model and provider client have been normalized to safely handle the following properties confirmed from RustMaps `pageData`:
- `tileBaseUrl`: Primary base layer tiles.
- `undergroundOverlayUrl`: Tiles showing tunnels/caves.
- `buildingBlockAreaUrl`: No-build zone definitions.
- `heatMaps`: Array containing name/url combinations for dynamic tile overlays.

## Confirmed heatMaps List
Based on the JSON data, the following heatmap layers are explicitly confirmed:
- Bears
- Boars
- Horses
- Hemp
- Nodes
- PlayerSpawns
- Berries

## Failed Stone/Sulfur/Metal Direct Paths
Direct tile URL tests for specific ore nodes (`stone/tiles/...`, `sulfur/tiles/...`, `metal/tiles/...`) all returned 404 Not Found.
**Conclusion:** Separate ore density heatmaps are currently not directly exposed by RustMaps standard tile outputs. We must only rely on the combined `Nodes` layer.

## tileBaseUrl Significance
The `tileBaseUrl` enables deep, native zooming similar to Google Maps, rather than relying on standard `<img>` transforms which degrade quickly. When integrated with a map engine, this forms the true foundation for interactive map viewing in the future.

## Rendering Approach Chosen
**Leaflet Tile & Heatmap Integration**
We implemented interactive tile rendering utilizing Leaflet, integrated seamlessly inside `ServerMapViewer`.
- When `tileBaseUrl` is provided, the viewer operates in **Tile Mode** using `L.CRS.Simple`.
- Multiple confirmed heatmap layers stack transparently, controlled natively via opacity sliders.
- A robust image fallback mode remains preserved, dynamically toggling when tiles are unavailable.
- Mobile gestures are natively isolated (using `touch-action: none` over the map) to prevent unwanted back navigation/swipe.

## Dependency Decision
**Leaflet & React-Leaflet Installed.**
As mandated for true tiled map rendering, Leaflet was selected over MapLibre for its lightweight simplicity, battle-tested standard `/{z}/{x}/{y}` raster compatibility, and lack of arbitrary Vector/Mapbox GL overhead. 
We installed exactly:
- `leaflet`
- `react-leaflet`
- `@types/leaflet`
No other map engines were introduced.

## CRS & Bounds Assumptions
Because RustMaps tiles do not represent real-world lat/long coordinates, we implemented `L.CRS.Simple`.
- Simple CRS maps 1 map unit to 1 pixel.
- We utilize unbounded standard rendering out to max zoom 8 with `noWrap: true`.
- Real-world map projections (EPSG3857) and coordinate claims are avoided.

## Data Truth Labels
Stone, Sulfur, and Metal have been rigidly grouped under "Planned / Unconfirmed". Their tooltips clearly communicate: *"Separate ore types are not exposed by the confirmed RustMaps heatmap data yet."* This maintains honest copy and sets the correct expectation.

## Mobile/Desktop Implications
The UI structure supports both seamlessly. On mobile, the new Resource Layers panel is part of the scrollable sidebar below the `55svh` map area constraint, meaning users can naturally swipe to see what's planned without losing sight of the map.

## Next Phase for Own Parser/Model Resource Separation
To achieve individual Stone, Sulfur, and Metal overlays in the future:
1. We cannot rely purely on RustMaps tile endpoints for separated ores.
2. The next phase will require a custom backend parser that calculates density based on raw coordinate data or the `buildingBlockAreaUrl` / monument distribution.
3. Once that logic is deployed, the UI can drop the "Unconfirmed" labels and activate them as independent MapLayers natively rendered by the future map library.

## B3-D Mobile Layout + Tile Availability UX
**Mobile Scroll Fix:**
- Fixed a UX issue where the map remained sticky on mobile viewports, hiding the Resource Layers behind it.
- The viewer layout was refactored so the container acts as a standard scrolling page on mobile, allowing the map area to scroll out of view while accessing the Resource Layers panel at the bottom.

**Tile Mode Availability Logic:**
- Enhanced the fallback logic so the UI doesn't incorrectly ask users to switch to Tile Mode on maps where tile layers were never generated.
- When `tileBaseUrl` or `heatMaps` are missing, the UI gracefully collapses the Resource Layers panel to prevent massive lists of unavailable layers.
- For Custom Maps without tile integration, an honest message is displayed ("Custom map image loaded. Interactive resource heatmaps are only available when RustMaps provides tile data.").

**Impact:**
- No backend, API, Supabase, or env changes were required.
- The existing tile/heatmap rendering functionality remains fully intact.
