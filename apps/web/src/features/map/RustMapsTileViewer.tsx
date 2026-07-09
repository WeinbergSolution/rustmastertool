
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './RustMapsTileViewer.css';

interface RustMapsTileViewerProps {
  tileBaseUrl: string;
  activeHeatmaps: Array<{ name: string; url: string }>;
  heatmapOpacity: number;
  undergroundOverlayUrl?: string | null;
}

export function RustMapsTileViewer({
  tileBaseUrl,
  activeHeatmaps,
  heatmapOpacity,
  undergroundOverlayUrl
}: RustMapsTileViewerProps) {
  // Use L.CRS.Simple for custom image tile coordinates.
  // This maps coordinates directly to pixels instead of geographic lat/lng.
  const crs = L.CRS.Simple;
  const minZoom = 1;
  const maxZoom = 8;
  
  // Center roughly at 0,0. In CRS.Simple, [y, x] is used.
  // RustMaps tile logic typically builds outward.
  const center: L.LatLngTuple = [0, 0];

  return (
    <MapContainer 
      crs={crs}
      center={center} 
      zoom={2} 
      minZoom={minZoom}
      maxZoom={maxZoom}
      className="rm-tile-viewer"
      attributionControl={false}
      zoomControl={false} // Disable default zoom control if we want a custom one, or leave it. Let's disable and use our own or let Leaflet handle it natively.
    >
      {/* Base Map Layer */}
      <TileLayer
        url={`${tileBaseUrl.replace(/\/$/, '')}/{z}/{x}/{y}.webp`}
        maxNativeZoom={6}
        maxZoom={8}
        noWrap={true}
        errorTileUrl="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" // Transparent fallback
      />
      
      {/* Underground Overlay (if active) */}
      {undergroundOverlayUrl && (
         <TileLayer
          url={`${undergroundOverlayUrl.replace(/\/$/, '')}/{z}/{x}/{y}.webp`}
          maxNativeZoom={6}
          maxZoom={8}
          noWrap={true}
          errorTileUrl="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        />
      )}

      {/* Heatmap Overlays */}
      {activeHeatmaps.map(hm => (
        <TileLayer
          key={hm.name}
          url={`${hm.url.replace(/\/$/, '')}/{z}/{x}/{y}.webp`}
          maxNativeZoom={6}
          maxZoom={8}
          noWrap={true}
          opacity={heatmapOpacity}
          errorTileUrl="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        />
      ))}
    </MapContainer>
  );
}
