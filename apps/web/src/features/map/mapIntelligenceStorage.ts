export const MAP_INTEL_BUCKET = 'map-intelligence';

export interface MapIntelManifest {
  pipelineVersion: string;
  generatedAt: string;
  saveVersion?: number;
  seed?: number;
  worldSize?: number;
}

export interface MapIntelTileManifest {
  pipelineVersion?: string;
  generatedAt: string;
  layers?: string[];
  resources?: string[];
  minZoom?: number;
  maxZoom?: number;
}

export async function loadMapIntelligenceManifests(supabaseUrl: string, objectPrefix: string) {
  // Temporary hardcoded smoke test prefix as requested:
  // map-intel:286:1321:4750:c7ab7ff1d6c599d5b5d20f1d1d33efed7c6932de5e05946df38dab4e5dc3cfd0:resource-density-v0.2:v1.0
  const prefix = objectPrefix; 
  const baseUrl = `${supabaseUrl}/storage/v1/object/public/${MAP_INTEL_BUCKET}/${prefix}`;

  try {
    const [manifestRes, tileManifestRes] = await Promise.all([
      fetch(`${baseUrl}/manifest.json`),
      fetch(`${baseUrl}/tile-manifest.json`)
    ]);

    if (!manifestRes.ok || !tileManifestRes.ok) {
      return null;
    }

    const manifest: MapIntelManifest = await manifestRes.json();
    const tileManifest: MapIntelTileManifest = await tileManifestRes.json();

    // Extract identity from prefix if not explicitly present in manifest
    // prefix format: map-intel:{saveVersion}:{seed}:{worldSize}:{hash}:...
    const parts = prefix.split(':');
    const extractedSaveVersion = manifest.saveVersion ?? (parts.length > 3 ? parseInt(parts[1], 10) : null);
    const extractedSeed = manifest.seed ?? (parts.length > 3 ? parseInt(parts[2], 10) : null);
    const extractedWorldSize = manifest.worldSize ?? (parts.length > 3 ? parseInt(parts[3], 10) : null);

    return {
      baseUrl,
      manifest,
      tileManifest,
      identity: {
        saveVersion: extractedSaveVersion,
        seed: extractedSeed,
        worldSize: extractedWorldSize
      }
    };
  } catch (error) {
    console.error("Failed to load Map Intelligence manifests", error);
    return null;
  }
}

export function buildMapIntelligenceTileUrl(baseUrl: string, resource: string) {
  // Pattern: {baseUrl}/tiles/resource-density-v0.2/overlay/{resource}/{z}/{x}/{y}.png
  // The prefix already contains resource-density-v0.2:v1.0, wait, the prompt says:
  // /storage/v1/object/public/map-intelligence/{objectPrefix}/tiles/resource-density-v0.2/overlay/{resource}/{z}/{x}/{y}.png
  return `${baseUrl}/tiles/resource-density-v0.2/overlay/${resource}/{z}/{x}/{y}.png`;
}
