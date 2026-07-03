import { NormalizedMapSnapshot, RustMapsMonument } from './types';

export function normalizeMapData(rawData: any): NormalizedMapSnapshot {
  const monuments: RustMapsMonument[] = (rawData.monuments || []).map((m: any) => ({
    name: m.name,
    type: m.category || m.type,
    x: m.x,
    y: m.y || m.z,
    gridRef: m.grid
  }));

  return {
    source: 'rustmaps',
    mapId: rawData.mapId || 'unknown',
    seed: rawData.seed || 0,
    size: rawData.size || 0,
    mapImageUrl: rawData.imageUrls?.icon || rawData.imageUrls?.full,
    thumbnailUrl: rawData.imageUrls?.thumbnail,
    rustmapsUrl: rawData.url,
    generationStatus: rawData.status,
    monuments,
    rawKeys: Object.keys(rawData)
  };
}
