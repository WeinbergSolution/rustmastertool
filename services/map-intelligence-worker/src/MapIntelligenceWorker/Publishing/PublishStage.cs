using System;
using System.IO;
using System.Text.Json;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace MapIntelligenceWorker.Publishing
{
    public class PublishObject {
        public string cacheKey { get; set; }
        public string bucket { get; set; }
        public string storagePrefix { get; set; }
        public string localFile { get; set; }
        public string targetObjectPath { get; set; }
        public string contentType { get; set; }
        public string cacheControl { get; set; }
        public long fileSize { get; set; }
        public string sha256 { get; set; }
        public string publicUrlTemplate { get; set; }
        public string category { get; set; }
        public string resource { get; set; }
        public string zxy { get; set; }
    }

    public class PublishPlan {
        public string bucket { get; set; }
        public string prefix { get; set; }
        public int totalObjects { get; set; }
        public long totalBytes { get; set; }
        public List<PublishObject> objects { get; set; } = new List<PublishObject>();
    }

    public static class PublishStage {

        private static string ComputeSha256(string filePath) {
            using var sha256 = SHA256.Create();
            using var stream = File.OpenRead(filePath);
            byte[] hash = sha256.ComputeHash(stream);
            return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
        }

        public static PublishPlan RunDryRun(string outDir, string cacheKey, string modelVersion) {
            Console.WriteLine("[PublishStage] Running Dry-Run Publisher");

            string bucket = "map-intelligence";
            string storagePrefix = $"map-intelligence/{cacheKey}";
            var plan = new PublishPlan {
                bucket = bucket,
                prefix = storagePrefix
            };

            void AddFile(string localPath, string relativeTarget, string contentType, string cacheControl, string category, string resource = null, string zxy = null) {
                if (!File.Exists(localPath)) return;
                
                var fileInfo = new FileInfo(localPath);
                string targetObjectPath = $"{storagePrefix}/{relativeTarget}";
                string urlTemplate = $"{{storageBaseUrl}}/storage/v1/object/public/{bucket}/{targetObjectPath}";

                var pubObj = new PublishObject {
                    cacheKey = cacheKey,
                    bucket = bucket,
                    storagePrefix = storagePrefix,
                    localFile = localPath.Replace("\\", "/"),
                    targetObjectPath = targetObjectPath,
                    contentType = contentType,
                    cacheControl = cacheControl,
                    fileSize = fileInfo.Length,
                    sha256 = ComputeSha256(localPath),
                    publicUrlTemplate = urlTemplate,
                    category = category,
                    resource = resource,
                    zxy = zxy
                };

                plan.objects.Add(pubObj);
                plan.totalObjects++;
                plan.totalBytes += pubObj.fileSize;
            }

            // Manifests
            AddFile(Path.Combine(outDir, "manifest.json"), "manifest.json", "application/json", "public, max-age=3600", "manifest");
            AddFile(Path.Combine(outDir, "tile-manifest.json"), "tile-manifest.json", "application/json", "public, max-age=3600", "manifest");

            // Previews
            var previews = new[] { "generic-node-density", "stone-potential", "sulfur-potential", "metal-ore-potential" };
            foreach (var r in previews) {
                AddFile(Path.Combine(outDir, $"overview-{r}.png"), $"previews/overview/{r}.png", "image/png", "public, max-age=31536000, immutable", "preview", r);
                AddFile(Path.Combine(outDir, $"overlay-{r}.png"), $"previews/overlay/{r}.png", "image/png", "public, max-age=31536000, immutable", "preview", r);
            }

            // Tiles
            string tilesBaseDir = Path.Combine(outDir, "tiles", modelVersion, "overlay");
            if (Directory.Exists(tilesBaseDir)) {
                foreach (var r in previews) {
                    string rDir = Path.Combine(tilesBaseDir, r);
                    if (!Directory.Exists(rDir)) continue;

                    foreach (var file in Directory.GetFiles(rDir, "*.png", SearchOption.AllDirectories)) {
                        string relativeToRDir = Path.GetRelativePath(rDir, file).Replace("\\", "/");
                        string zxyStr = relativeToRDir.Replace(".png", "");
                        
                        AddFile(
                            localPath: file,
                            relativeTarget: $"tiles/{modelVersion}/overlay/{r}/{relativeToRDir}",
                            contentType: "image/png",
                            cacheControl: "public, max-age=31536000, immutable",
                            category: "tile",
                            resource: r,
                            zxy: zxyStr
                        );
                    }
                }
            }

            string planPath = Path.Combine(outDir, "publish-plan.json");
            File.WriteAllText(planPath, JsonSerializer.Serialize(plan, new JsonSerializerOptions { WriteIndented = true }));
            Console.WriteLine($"[PublishStage] Wrote publish plan to {planPath} with {plan.totalObjects} objects.");

            return plan;
        }
    }

    // --- Job Contracts ---
    public class MapIntelligenceJobRequest {
        public string jobId { get; set; }
        public string sourceMapPath { get; set; }
        public int seed { get; set; }
        public int worldSize { get; set; }
        public int saveVersion { get; set; }
        public string mapSha256 { get; set; }
        public List<string> requestedOutputs { get; set; }
        public string modelVersion { get; set; }
        public string renderVersion { get; set; }
        public string tileVersion { get; set; }
    }

    public class MapIntelligenceJobResult {
        public string jobId { get; set; }
        public string status { get; set; } // queued, running, completed, failed, expired
        public string cacheKey { get; set; }
        public string manifestObjectPath { get; set; }
        public string tileManifestObjectPath { get; set; }
        public int generatedObjectCount { get; set; }
        public List<string> warnings { get; set; }
        public string claimPolicy { get; set; }
    }
}
