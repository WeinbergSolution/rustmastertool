export const MAP_INTEL_BUCKET = 'map-intelligence';

export interface MapIntelManifest {
  pipelineVersion: string;
  generatedAt: string;
}

export interface MapIntelTileManifest {
  pipelineVersion: string;
  generatedAt: string;
  layers: string[];
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

    return {
      baseUrl,
      manifest,
      tileManifest
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
