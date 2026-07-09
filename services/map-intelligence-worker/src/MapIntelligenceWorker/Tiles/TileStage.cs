using System;
using System.IO;
using System.Collections.Generic;
using System.Text.Json;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace MapIntelligenceWorker.Tiles
{
    public class TileResult {
        public string TileVersion { get; set; } = "v1.0";
        public int TileSize { get; set; } = 256;
        public int MinZoom { get; set; } = 0;
        public int MaxZoom { get; set; } = 2;
        public int GeneratedTileCount { get; set; } = 0;
        public string TileManifestPath { get; set; }
        public string TilePathTemplate { get; set; }
    }

    public static class TileStage {
        public static TileResult Run(string inputDir, string modelVersion, string renderVersion, string cacheKey) {
            Console.WriteLine("[TileStage] Generating Leaflet Tile Pyramid (z0-z2)");

            var result = new TileResult();
            string tilesOutDir = Path.Combine(inputDir, "tiles");
            
            // Only using overlay images
            var resources = new string[] {
                "generic-node-density",
                "stone-potential",
                "sulfur-potential",
                "metal-ore-potential"
            };

            string style = "overlay";

            foreach (var resource in resources) {
                string srcPath = Path.Combine(inputDir, $"{style}-{resource}.png");
                if (!File.Exists(srcPath)) continue;

                using var baseImage = Image.Load<Rgba32>(srcPath);

                for (int z = result.MinZoom; z <= result.MaxZoom; z++) {
                    int numTiles = (int)Math.Pow(2, z);
                    int targetSize = numTiles * result.TileSize;

                    // Resize base image to fit the zoom level grid
                    using var zoomedImage = baseImage.Clone(ctx => ctx.Resize(new ResizeOptions {
                        Size = new Size(targetSize, targetSize),
                        Sampler = KnownResamplers.Bicubic
                    }));

                    for (int x = 0; x < numTiles; x++) {
                        for (int y = 0; y < numTiles; y++) {
                            string tileDir = Path.Combine(tilesOutDir, modelVersion, style, resource, z.ToString(), x.ToString());
                            Directory.CreateDirectory(tileDir);
                            string tilePath = Path.Combine(tileDir, $"{y}.png");

                            using var tile = zoomedImage.Clone(ctx => ctx.Crop(new Rectangle(x * result.TileSize, y * result.TileSize, result.TileSize, result.TileSize)));
                            
                            // Optional optimization: Check if tile is completely transparent/empty before saving.
                            // However, we save all tiles for this probe to ensure grid completeness.
                            tile.SaveAsPng(tilePath);
                            result.GeneratedTileCount++;
                        }
                    }
                }
            }

            result.TilePathTemplate = "tiles/{modelVersion}/{style}/{resource}/{z}/{x}/{y}.png";

            // Generate tile-manifest.json
            var manifest = new {
                modelVersion = modelVersion,
                renderVersion = renderVersion,
                tileVersion = result.TileVersion,
                tileSize = result.TileSize,
                minZoom = result.MinZoom,
                maxZoom = result.MaxZoom,
                resources = resources,
                styles = new[] { style },
                tilePathTemplate = result.TilePathTemplate,
                generatedTileCount = result.GeneratedTileCount,
                generatedAt = DateTime.UtcNow.ToString("o"),
                cacheKey = cacheKey,
                claimPolicy = "estimated density, not exact spawn positions"
            };

            result.TileManifestPath = Path.Combine(inputDir, "tile-manifest.json");
            File.WriteAllText(result.TileManifestPath, JsonSerializer.Serialize(manifest, new JsonSerializerOptions { WriteIndented = true }));
            Console.WriteLine($"[TileStage] Wrote {result.GeneratedTileCount} tiles and manifest to {result.TileManifestPath}");

            return result;
        }
    }
}
