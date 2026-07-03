export interface RustMapsMonument {
  name: string;
  type?: string;
  x: number;
  y: number; // or z
  gridRef?: string;
}

export interface NormalizedMapSnapshot {
  source: 'rustmaps';
  mapId: string;
  seed: number;
  size: number;
  mapImageUrl?: string;
  thumbnailUrl?: string;
  rustmapsUrl?: string;
  generationStatus?: string;
  monuments: RustMapsMonument[];
  rawKeys: string[];
}
