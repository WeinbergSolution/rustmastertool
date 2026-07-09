using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text.Json;

namespace MapIntelligenceWorker.Publishing
{
    public class ValidationResult
    {
        public string publishMode { get; set; }
        public bool realUploadAttempted { get; set; }
        public int objectCount { get; set; }
        public int validObjectCount { get; set; }
        public int invalidObjectCount { get; set; }
        public string bucket { get; set; }
        public string storagePrefix { get; set; }
        public long totalBytes { get; set; }
        public string checkedAt { get; set; }
        public Dictionary<string, bool> envPresence { get; set; } = new Dictionary<string, bool>();
        public List<string> warnings { get; set; } = new List<string>();
        public List<string> errors { get; set; } = new List<string>();
        public bool readyForRealUpload { get; set; }
    }

    public static class PublishPlanValidator
    {
        private static string ComputeSha256(string filePath) {
            using var sha256 = SHA256.Create();
            using var stream = File.OpenRead(filePath);
            byte[] hash = sha256.ComputeHash(stream);
            return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
        }

        public static ValidationResult Validate(PublishPlan plan, string publishMode, bool confirmRealUpload, string outDir)
        {
            var result = new ValidationResult {
                publishMode = publishMode,
                realUploadAttempted = confirmRealUpload,
                bucket = plan.bucket,
                storagePrefix = plan.prefix,
                totalBytes = plan.totalBytes,
                objectCount = plan.totalObjects,
                checkedAt = DateTime.UtcNow.ToString("o")
            };

            result.envPresence["supabaseUrlPresent"] = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("SUPABASE_URL"));
            result.envPresence["serviceRoleKeyPresent"] = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("SUPABASE_SERVICE_ROLE_KEY"));
            result.envPresence["bucketPresent"] = Environment.GetEnvironmentVariable("MAP_INTELLIGENCE_BUCKET") == "map-intelligence";

            foreach (var obj in plan.objects)
            {
                bool isValid = true;

                // Check Bucket
                if (obj.bucket != "map-intelligence")
                {
                    result.errors.Add($"[{obj.objectPath}] Invalid bucket: {obj.bucket}");
                    isValid = false;
                }

                // Check Paths
                if (obj.objectPath.StartsWith("map-intelligence/"))
                {
                    result.errors.Add($"[{obj.objectPath}] objectPath cannot start with bucket name.");
                    isValid = false;
                }
                
                if (!obj.objectPath.StartsWith(plan.prefix))
                {
                    result.errors.Add($"[{obj.objectPath}] objectPath must start with cacheKey.");
                    isValid = false;
                }

                if (obj.objectPath.Contains("..") || obj.objectPath.StartsWith("/"))
                {
                    result.errors.Add($"[{obj.objectPath}] objectPath contains invalid path segments.");
                    isValid = false;
                }

                // Check Local File
                string absoluteLocalFile = Path.Combine(Directory.GetCurrentDirectory(), obj.localFile);
                if (!File.Exists(absoluteLocalFile))
                {
                    result.errors.Add($"[{obj.objectPath}] localFile does not exist: {obj.localFile}");
                    isValid = false;
                }
                else
                {
                    var fi = new FileInfo(absoluteLocalFile);
                    if (fi.Length <= 0)
                    {
                        result.errors.Add($"[{obj.objectPath}] File size is 0.");
                        isValid = false;
                    }
                    if (fi.Length != obj.fileSize)
                    {
                        result.errors.Add($"[{obj.objectPath}] File size mismatch.");
                        isValid = false;
                    }

                    string hash = ComputeSha256(absoluteLocalFile);
                    if (hash != obj.sha256)
                    {
                        result.errors.Add($"[{obj.objectPath}] SHA256 mismatch.");
                        isValid = false;
                    }
                }

                // Check Content Type
                if (obj.localFile.EndsWith(".json") && obj.contentType != "application/json")
                {
                    result.errors.Add($"[{obj.objectPath}] Invalid Content-Type for JSON: {obj.contentType}");
                    isValid = false;
                }
                if (obj.localFile.EndsWith(".png") && obj.contentType != "image/png")
                {
                    result.errors.Add($"[{obj.objectPath}] Invalid Content-Type for PNG: {obj.contentType}");
                    isValid = false;
                }

                // Check Cache Control
                if (obj.category == "tile" || obj.category == "preview")
                {
                    if (obj.cacheControl != "public, max-age=31536000, immutable")
                    {
                        result.errors.Add($"[{obj.objectPath}] Invalid Cache-Control for immutable asset: {obj.cacheControl}");
                        isValid = false;
                    }
                }

                if (isValid)
                {
                    result.validObjectCount++;
                }
                else
                {
                    result.invalidObjectCount++;
                }
            }

            result.readyForRealUpload = result.invalidObjectCount == 0 && result.objectCount > 0;

            string outPath = Path.Combine(outDir, "publisher-validation.json");
            File.WriteAllText(outPath, JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true }));
            Console.WriteLine($"[PublishPlanValidator] Validation completed. Valid: {result.validObjectCount}, Invalid: {result.invalidObjectCount}. Validation result written to {outPath}");

            return result;
        }
    }
}
