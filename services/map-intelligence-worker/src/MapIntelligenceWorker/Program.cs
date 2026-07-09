using System;
using System.IO;
using MapIntelligenceWorker.Decode;
using MapIntelligenceWorker.Density;
using MapIntelligenceWorker.Render;
using MapIntelligenceWorker.Tiles;
using MapIntelligenceWorker.Publishing;
using MapIntelligenceWorker.Manifest;

namespace MapIntelligenceWorker
{
    class Program
    {
        static void Main(string[] args)
        {
            string mapPath = "";
            int seed = 0;
            int worldSize = 0;
            int saveVersion = 0;
            string outDir = "output";
            string publishMode = "dry-run";
            bool confirmRealUpload = false;

            for (int i = 0; i < args.Length; i++)
            {
                if (args[i] == "--map-path" && i + 1 < args.Length) mapPath = args[i + 1];
                if (args[i] == "--seed" && i + 1 < args.Length) int.TryParse(args[i + 1], out seed);
                if (args[i] == "--world-size" && i + 1 < args.Length) int.TryParse(args[i + 1], out worldSize);
                if (args[i] == "--save-version" && i + 1 < args.Length) int.TryParse(args[i + 1], out saveVersion);
                if (args[i] == "--out" && i + 1 < args.Length) outDir = args[i + 1];
                if (args[i] == "--publish-mode" && i + 1 < args.Length) publishMode = args[i + 1];
                if (args[i] == "--confirm-real-upload") confirmRealUpload = true;
            }

            if (string.IsNullOrEmpty(mapPath) || !File.Exists(mapPath)) {
                Console.WriteLine("Usage: dotnet run -- --map-path <path> --seed <seed> --world-size <size> --save-version <version> --out <dir>");
                return;
            }

            Directory.CreateDirectory(outDir);
            Console.WriteLine($"[Worker] Starting Map Intelligence Pipeline for Seed {seed}, Size {worldSize}");

            // 1. Decode Stage
            var decodeResult = DecodeStage.Run(mapPath);

            if (decodeResult.TopologyData == null) {
                Console.WriteLine("[Error] Failed to decode topology. Aborting.");
                return;
            }

            // 2. Density Stage
            var densityMatrix = DensityStage.Run(decodeResult.TopologyData);

            // 3. Render Stage
            var renderResult = RenderStage.Run(densityMatrix, outDir);

            // 4. Tile Pyramid Stage
            string cacheKey = $"map-intel:{saveVersion}:{seed}:{worldSize}:{decodeResult.MapSha256}:{densityMatrix.model_version}:{renderResult.RenderVersion}";
            var tileResult = TileStage.Run(outDir, densityMatrix.model_version, renderResult.RenderVersion, cacheKey);

            // 5. Publish Stage (Generate Plan)
            int totalObjects = 0;
            var plan = PublishStage.RunDryRun(outDir, cacheKey, densityMatrix.model_version);
            totalObjects = plan.totalObjects;

            // 6. Validation Stage
            if (publishMode == "validate" || publishMode == "supabase") {
                var validationResult = PublishPlanValidator.Validate(plan, publishMode, confirmRealUpload, outDir);
                if (!validationResult.readyForRealUpload && publishMode == "supabase") {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("[Worker] FATAL: Validation failed. Cannot proceed with Supabase upload.");
                    Console.ResetColor();
                    Environment.Exit(1);
                }
            }

            // 7. Publish Execution
            if (publishMode == "supabase") {
                var publisher = new SupabaseStoragePublisher();
                publisher.PublishAsync(plan, confirmRealUpload).Wait();
            } else {
                var publisher = new NoopStoragePublisher();
                publisher.PublishAsync(plan, confirmRealUpload).Wait();
            }

            // 8. Manifest Stage
            ManifestStage.Run(
                seed: seed,
                worldSize: worldSize,
                saveVersion: saveVersion,
                mapSha256: decodeResult.MapSha256,
                modelVersion: densityMatrix.model_version,
                renderVersion: renderResult.RenderVersion,
                generatedFiles: renderResult.GeneratedFiles,
                outDir: outDir,
                tileManifestPath: tileResult.TileManifestPath,
                tilePathTemplate: tileResult.TilePathTemplate,
                tileMinZoom: tileResult.MinZoom,
                tileMaxZoom: tileResult.MaxZoom,
                generatedTileCount: tileResult.GeneratedTileCount,
                totalObjects: totalObjects
            );

            Console.WriteLine("[Worker] Pipeline completed successfully.");
        }
    }
}
