
import { MapContainer, useMap, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import './RustMapsTileViewer.css';

interface RustMapsTileViewerProps {
  tileBaseUrl?: string;
  fallbackImageUrl?: string | null;
  activeHeatmaps: Array<{ name: string; url: string }>;
  heatmapOpacity: number;
  undergroundOverlayUrl?: string | null;
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

    const origGetTileUrl = layer.getTileUrl.bind(layer);
    layer.getTileUrl = function(coords: any) {
      if (coords.x < 0 || coords.y < 0) return TRANSPARENT_TILE;
      const maxIndex = Math.pow(2, coords.z) - 1;
      if (coords.x > maxIndex || coords.y > maxIndex) return TRANSPARENT_TILE;
      return origGetTileUrl(coords);
    };

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
    map.fitBounds(bounds);
  }, [map, bounds]);
  return null;
}

const TILE_EXTENT = 256;

import { useState } from 'react';

export function RustMapsTileViewer({
  tileBaseUrl,
  fallbackImageUrl,
  activeHeatmaps,
  heatmapOpacity,
  undergroundOverlayUrl
}: RustMapsTileViewerProps) {
  const crs = L.CRS.Simple;
  const [baseTilesFailed, setBaseTilesFailed] = useState(false);
  // L.CRS.Simple maps (lat, lng) to (pixel y, pixel x), and y is mapped to -lat.
  // To get tile coordinates (x=0 to max, y=0 to max), we need pixel y to go from 0 to +256.
  // This means lat must go from -256 to 0.
  const bounds = L.latLngBounds(L.latLng(-TILE_EXTENT, 0), L.latLng(0, TILE_EXTENT));
  const center: L.LatLngTuple = [-TILE_EXTENT / 2, TILE_EXTENT / 2];

  return (
    <MapContainer 
      crs={crs}
      center={center} 
      zoom={0} 
      minZoom={-3}
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
          maxNativeZoom={5}
          zIndex={3 + i}
        />
      ))}
    </MapContainer>
  );
}
