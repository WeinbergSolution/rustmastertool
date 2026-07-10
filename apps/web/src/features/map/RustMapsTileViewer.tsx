
import { MapContainer, useMap, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useRef, useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './RustMapsTileViewer.css';

interface RustMapsTileViewerProps {
  tileBaseUrl?: string;
  fallbackImageUrl?: string | null;
  activeHeatmaps: Array<{ name: string; url: string; maxNativeZoom?: number }>;
  heatmapOpacity: number;
  undergroundOverlayUrl?: string | null;
  serverWorldSize?: number;
}

function formatTileUrl(url: string) {
  if (!url) return '';
  if (url.includes('{z}')) return url;
  return `${url.replace(/\/$/, '')}/{z}/{x}/{y}.webp`;
}

const TRANSPARENT_TILE = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

function SafeTileLayer({ url, opacity = 1, bounds, maxNativeZoom = 5, zIndex, onError }: { url: string; opacity?: number; bounds: L.LatLngBounds; maxNativeZoom?: number; zIndex?: number; onError?: () => void }) {
  const map = useMap();
  const layerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    const layer = L.tileLayer(url, {
      tileSize: 256,
      maxNativeZoom,
      maxZoom: 6,
      noWrap: true,
      bounds,
      keepBuffer: 0,
      opacity,
      errorTileUrl: TRANSPARENT_TILE,
      zIndex
    });
    
    if (onError) {
      layer.on('tileerror', () => {
        onError();
      });
    }

    layer.addTo(map);
    layerRef.current = layer;

    return () => {
      layer.off('tileerror');
      layer.removeFrom(map);
    };
  }, [map, url, bounds, maxNativeZoom, zIndex, onError]);

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.setOpacity(opacity);
    }
  }, [opacity]);

  return null;
}

function MapBoundsFitter({ bounds }: { bounds: L.LatLngBounds }) {
  const map = useMap();
  useEffect(() => {
    map.setMaxBounds(bounds);
    map.options.maxBoundsViscosity = 1.0;
    
    // Fit bounds robustly against container resizes
    const fit = () => {
      map.invalidateSize();
      map.fitBounds(bounds);
    };
    
    fit();
    setTimeout(fit, 100);
    setTimeout(fit, 500);
    
    const container = map.getContainer();
    const observer = new ResizeObserver(() => fit());
    observer.observe(container);
    
    return () => {
      observer.disconnect();
    };
  }, [map, bounds]);
  return null;
}



export function RustMapsTileViewer({
  tileBaseUrl,
  fallbackImageUrl,
  activeHeatmaps,
  heatmapOpacity,
  undergroundOverlayUrl,
  serverWorldSize = 4000
}: RustMapsTileViewerProps) {
  const scale = 256 / serverWorldSize;
  const crs = useMemo(() => {
    return L.extend({}, L.CRS.Simple, {
      transformation: new L.Transformation(scale, 0, -scale, 0)
    });
  }, [scale]);

  const [baseTilesFailed, setBaseTilesFailed] = useState(false);
  
  // Leaflet CRS.Simple maps bounds to raw units.
  // With our custom CRS scaling, the 4000x4000 unit world maps to exactly 256x256 pixels at zoom 0.
  // This perfectly aligns with standard Slippy Map tile pyramids where zoom=0 is exactly 1 tile!
  const bounds = L.latLngBounds(L.latLng(-serverWorldSize, 0), L.latLng(0, serverWorldSize));
  const center: L.LatLngTuple = [-serverWorldSize / 2, serverWorldSize / 2];

  return (
    <MapContainer 
      crs={crs}
      center={center} 
      zoom={0} 
      minZoom={-5}
      maxZoom={6}
      zoomSnap={0}
      zoomDelta={0.5}
      wheelPxPerZoomLevel={60}
      className="rm-tile-viewer"
      attributionControl={false}
      zoomControl={true}
    >
      <MapBoundsFitter bounds={bounds} />

      {/* Base Map Layer */}
      {tileBaseUrl && !baseTilesFailed ? (
        <SafeTileLayer
          url={formatTileUrl(tileBaseUrl)}
          bounds={bounds}
          maxNativeZoom={5}
          zIndex={1}
          onError={() => setBaseTilesFailed(true)}
        />
      ) : fallbackImageUrl ? (
        <ImageOverlay
          url={fallbackImageUrl}
          bounds={bounds}
          zIndex={1}
        />
      ) : null}
      
      {/* Underground Overlay (if active) */}
      {undergroundOverlayUrl && (
         <SafeTileLayer
          url={formatTileUrl(undergroundOverlayUrl)}
          bounds={bounds}
          maxNativeZoom={5}
          zIndex={2}
        />
      )}

      {/* Heatmap Overlays */}
      {activeHeatmaps.map((hm, i) => (
        <SafeTileLayer
          key={hm.name}
          url={formatTileUrl(hm.url)}
          bounds={bounds}
          opacity={heatmapOpacity}
          maxNativeZoom={hm.maxNativeZoom ?? 5}
          zIndex={3 + i}
        />
      ))}
    </MapContainer>
  );
}
