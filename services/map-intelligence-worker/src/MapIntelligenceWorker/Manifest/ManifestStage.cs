using System;
using System.IO;
using System.Text.Json;
using System.Collections.Generic;

namespace MapIntelligenceWorker.Manifest
{
    public static class ManifestStage {
        public static void Run(
            int seed, 
            int worldSize, 
            int saveVersion, 
            string mapSha256, 
            string modelVersion,
            string renderVersion,
            List<string> generatedFiles,
            string outDir,
            string tileManifestPath,
            string tilePathTemplate,
            int tileMinZoom,
            int tileMaxZoom,
            int generatedTileCount,
            int totalObjects = 0) 
        {
            Console.WriteLine($"[ManifestStage] Generating Manifest");
            
            string cacheKey = $"map-intel:{saveVersion}:{seed}:{worldSize}:{mapSha256}:{modelVersion}:{renderVersion}";
            string storagePrefix = $"map-intelligence/{cacheKey}";

            var manifest = new {
                seed = seed,
                worldSize = worldSize,
                saveVersion = saveVersion,
                sourceMapSha256 = mapSha256,
                modelVersion = modelVersion,
                renderVersion = renderVersion,
                generatedAt = DateTime.UtcNow.ToString("o"),
                cacheKey = cacheKey,
                generatedFiles = generatedFiles,
                tileManifestPath = Path.GetFileName(tileManifestPath),
                tilePathTemplate = tilePathTemplate,
                tileResources = new[] {
                    "generic-node-density",
                    "stone-potential",
                    "sulfur-potential",
                    "metal-ore-potential"
                },
                minZoom = tileMinZoom,
                maxZoom = tileMaxZoom,
                generatedTileCount = generatedTileCount,
                layerSummary = new {
                    topology = "Decoded successfully",
                    biome = "Skipped (Topology used for Density v0.2)"
                },
                storageContractVersion = "v1.0",
                storagePrefix = storagePrefix,
                publishPlanPath = "publish-plan.json",
                publicUrlTemplates = new {
                    leaflet = "{storageBaseUrl}/" + storagePrefix + "/tiles/{modelVersion}/overlay/{resource}/{z}/{x}/{y}.png",
                    manifest = "{storageBaseUrl}/storage/v1/object/public/map-intelligence/" + storagePrefix + "/manifest.json"
                },
                objectCounts = new {
                    total = totalObjects,
                    tiles = generatedTileCount,
                    previews = 8,
                    manifests = 2
                },
                resourceOutputs = new[] {
                    "generic-node-density",
                    "stone-potential",
                    "sulfur-potential",
                    "metal-ore-potential"
                },
                warnings = new string[0],
                claimPolicy = "estimated density, not exact spawn positions"
            };

            string manifestPath = Path.Combine(outDir, "manifest.json");
            File.WriteAllText(manifestPath, JsonSerializer.Serialize(manifest, new JsonSerializerOptions { WriteIndented = true }));
            Console.WriteLine($"[ManifestStage] Wrote manifest to {manifestPath}");
        }
    }
}
