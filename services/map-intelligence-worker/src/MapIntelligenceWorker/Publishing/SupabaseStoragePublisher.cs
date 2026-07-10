using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace MapIntelligenceWorker.Publishing
{
    public class UploadResult
    {
        public bool uploadAttempted { get; set; }
        public int objectCount { get; set; }
        public int uploadedObjectCount { get; set; }
        public int failedObjectCount { get; set; }
        public int skippedObjectCount { get; set; }
        public string bucket { get; set; }
        public string objectPrefix { get; set; }
        public long totalBytes { get; set; }
        public List<string> firstUploadedObjects { get; set; } = new List<string>();
        public List<string> publicUrlSamples { get; set; } = new List<string>();
        public List<string> errors { get; set; } = new List<string>();
        public List<string> warnings { get; set; } = new List<string>();
        public string uploadedAt { get; set; }
        public string selectedKeyFormat { get; set; }
        public bool authorizationBearerUsed { get; set; }
        public bool apikeyHeaderUsed { get; set; }
        public bool secretValuesLogged { get; set; }
    }

    public class SupabaseStoragePublisher : IStoragePublisher
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        
        public async Task PublishAsync(PublishPlan plan, bool confirmRealUpload)
        {
            Console.WriteLine($"[SupabaseStoragePublisher] Initializing upload for {plan.totalObjects} objects.");

            string supabaseUrl = Environment.GetEnvironmentVariable("SUPABASE_URL");
            string secretKey = Environment.GetEnvironmentVariable("SUPABASE_SECRET_KEY");
            string serviceRoleKey = Environment.GetEnvironmentVariable("SUPABASE_SERVICE_ROLE_KEY");

            string activeKey = !string.IsNullOrEmpty(secretKey) ? secretKey : serviceRoleKey;
            
            bool urlPresent = !string.IsNullOrEmpty(supabaseUrl);
            bool secretKeyPresent = !string.IsNullOrEmpty(secretKey);
            bool serviceRoleKeyPresent = !string.IsNullOrEmpty(serviceRoleKey);
            bool keyPresent = !string.IsNullOrEmpty(activeKey);

            string keyFormat = "Unknown";
            if (keyPresent) {
                if (activeKey.StartsWith("eyJ")) keyFormat = "LegacyJwtServiceRole";
                else if (activeKey.StartsWith("sb_secret_")) keyFormat = "SupabaseSecretKey";
            }

            Console.WriteLine($"[SupabaseStoragePublisher] Environment Check - SUPABASE_URL present: {urlPresent}, SUPABASE_SECRET_KEY present: {secretKeyPresent}, SUPABASE_SERVICE_ROLE_KEY present: {serviceRoleKeyPresent}, Format: {keyFormat}");

            if (!confirmRealUpload)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("[SupabaseStoragePublisher] FATAL: --publish-mode supabase requires --confirm-real-upload to be set.");
                Console.ResetColor();
                Environment.Exit(1);
            }

            if (!urlPresent || !keyPresent)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("[SupabaseStoragePublisher] ERROR: Missing required Supabase environment variables. Cannot proceed with upload.");
                Console.ResetColor();
                Environment.Exit(1);
            }
            
            if (keyFormat == "Unknown")
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("[SupabaseStoragePublisher] ERROR: Unsupported Supabase server key format. Expected legacy JWT service_role or sb_secret key.");
                Console.ResetColor();
                Environment.Exit(1);
            }

            Console.WriteLine($"[SupabaseStoragePublisher] Ready for REAL UPLOAD. Using format: {keyFormat}");

            // Mock Implementation to prepare the HTTP request
            int uploadedCount = 0;
            int failedCount = 0;
            
            var result = new UploadResult {
                uploadAttempted = true,
                objectCount = plan.totalObjects,
                bucket = "map-intelligence",
                objectPrefix = plan.prefix,
                totalBytes = plan.totalBytes,
                uploadedAt = DateTime.UtcNow.ToString("o"),
                selectedKeyFormat = keyFormat,
                authorizationBearerUsed = keyFormat == "LegacyJwtServiceRole",
                apikeyHeaderUsed = true,
                secretValuesLogged = false
            };

            foreach (var obj in plan.objects)
            {
                try
                {
                    // Construct URL: {supabaseUrl}/storage/v1/object/{bucket}/{objectPath}
                    // E.g. https://xyz.supabase.co/storage/v1/object/map-intelligence/cacheKey/manifest.json
                    string uploadUrl = $"{supabaseUrl.TrimEnd('/')}/storage/v1/object/{obj.bucket}/{obj.objectPath}";

                    using var request = new HttpRequestMessage(HttpMethod.Post, uploadUrl);
                    
                    if (keyFormat == "LegacyJwtServiceRole")
                    {
                        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", activeKey);
                        request.Headers.Add("apikey", activeKey);
                    }
                    else if (keyFormat == "SupabaseSecretKey")
                    {
                        request.Headers.Add("apikey", activeKey);
                    }
                    
                    // Upsert header specific to Supabase Storage
                    request.Headers.Add("x-upsert", "true");

                    // Read local file
                    string absolutePath = Path.Combine(Directory.GetCurrentDirectory(), obj.localFile);
                    var fileContent = new ByteArrayContent(File.ReadAllBytes(absolutePath));
                    fileContent.Headers.ContentType = new MediaTypeHeaderValue(obj.contentType);
                    
                    // Supabase Cache-Control is currently set via metadata in multi-part or as header
                    // For standard REST endpoint, Cache-Control header works.
                    request.Headers.TryAddWithoutValidation("Cache-Control", obj.cacheControl);
                    
                    request.Content = fileContent;

                    // Execute request
                    var response = await _httpClient.SendAsync(request);
                    if (!response.IsSuccessStatusCode) { 
                        string errContent = await response.Content.ReadAsStringAsync();
                        string errorMsg = $"[SupabaseStoragePublisher] HTTP {response.StatusCode} for {obj.objectPath}: {errContent}";
                        Console.WriteLine(errorMsg);
                        result.errors.Add(errorMsg);
                        failedCount++;
                    } else {
                        uploadedCount++;
                        if (result.firstUploadedObjects.Count < 5) {
                            result.firstUploadedObjects.Add(obj.objectPath);
                        }
                        if (result.publicUrlSamples.Count < 5) {
                            result.publicUrlSamples.Add(obj.publicUrlTemplate.Replace("{supabaseUrl}", "SUPABASE_URL"));
                        }
                    }
                }
                catch (Exception ex)
                {
                    string errorMsg = $"[SupabaseStoragePublisher] Error preparing upload for {obj.objectPath}: {ex.Message}";
                    Console.WriteLine(errorMsg);
                    result.errors.Add(errorMsg);
                    failedCount++;
                }
            }

            result.uploadedObjectCount = uploadedCount;
            result.failedObjectCount = failedCount;

            string outPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "output", "publisher-upload-result.json");
            File.WriteAllText(outPath, JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true }));

            Console.WriteLine($"[SupabaseStoragePublisher] Completed real upload. Uploaded: {uploadedCount}, Failed: {failedCount}. Wrote result to {outPath}");
        }
    }
}
