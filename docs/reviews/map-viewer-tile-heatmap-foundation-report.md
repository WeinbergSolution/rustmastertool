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
**Image Fallback with UI Placeholders**
Since a map dependency is not currently installed, implementing a manual tile renderer with dynamic fetch, indexing, caching, dragging, and opacity from scratch is extremely complex and error-prone. The chosen approach is to:
- Maintain the current functional image-based fallback (using `imageUrl` / `imageIconUrl` with local zoom transforms).
- Build the exact UI panel architecture for Resource/Wildlife layers.
- Display these advanced layers as placeholders disabled by default, marked with a warning note that they require a map extension.

## Dependency Decision
**Do Not Install Yet.**
To achieve true tiled mapping, the project requires a map library. We recommend evaluating:
1. **Leaflet:** Simple, battle-tested, highly compatible with standard `/{z}/{x}/{y}` formats.
2. **MapLibre GL JS:** Better performance, vector tile support if needed, but slightly heavier.

The frontend has been prepared to accept these dependencies in the future without breaking current functionality.

## Data Truth Labels
Stone, Sulfur, and Metal have been rigidly grouped under "Planned / Unconfirmed". Their tooltips clearly communicate: *"Separate ore types are not exposed by the confirmed RustMaps heatmap data yet."* This maintains honest copy and sets the correct expectation.

## Mobile/Desktop Implications
The UI structure supports both seamlessly. On mobile, the new Resource Layers panel is part of the scrollable sidebar below the `55svh` map area constraint, meaning users can naturally swipe to see what's planned without losing sight of the map.

## Next Phase for Own Parser/Model Resource Separation
To achieve individual Stone, Sulfur, and Metal overlays in the future:
1. We cannot rely purely on RustMaps tile endpoints for separated ores.
2. The next phase will require a custom backend parser that calculates density based on raw coordinate data or the `buildingBlockAreaUrl` / monument distribution.
3. Once that logic is deployed, the UI can drop the "Unconfirmed" labels and activate them as independent MapLayers natively rendered by the future map library.
