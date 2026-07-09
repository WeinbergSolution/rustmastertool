using System;
using System.IO;
using System.Text.Json;
using System.Collections.Generic;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace ResourceDensityVisualRenderer
{
    class DensityPoint {
        public int x { get; set; }
        public int y { get; set; }
        public double generic { get; set; }
        public double stone { get; set; }
        public double sulfur { get; set; }
        public double metal { get; set; }
    }

    class DensityMatrix {
        public string model_version { get; set; }
        public int resolution { get; set; }
        public List<DensityPoint> data { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            string inputPath = @"..\..\..\..\resource-heatmap-calibration\output\density-matrix-v0.2.json"; // fallback
            string outDir = @"..\..\..\..\resource-heatmap-calibration\output";

            for (int i = 0; i < args.Length; i++)
            {
                if (args[i] == "--input" && i + 1 < args.Length) inputPath = args[i + 1];
                if (args[i] == "--out" && i + 1 < args.Length) outDir = args[i + 1];
            }

            if (!File.Exists(inputPath)) {
                inputPath = @"C:\Users\pasca\Documents\Developer Academy\DEV-Projekte\rustMasterTool\experiments\resource-heatmap-calibration\output\density-matrix-v0.2.json";
            }

            Console.WriteLine($"[C5-B] Loading input matrix from: {inputPath}");
            var jsonStr = File.ReadAllText(inputPath);
            var matrix = JsonSerializer.Deserialize<DensityMatrix>(jsonStr);

            Directory.CreateDirectory(outDir);
            
            int res = matrix.resolution;
            int scale = 2; // Output 512x512
            int outRes = res * scale;

            // Simple Color Gradient (Blue -> Orange -> Red -> White)
            Rgba32 GetHeatColor(double value) {
                if (value <= 0) return new Rgba32(0, 0, 50, 255); // Dark Blue background
                
                if (value < 0.3) {
                    double t = value / 0.3;
                    return new Rgba32((byte)(0), (byte)(100*t), (byte)(100 + 100*t), 255);
                } else if (value < 0.5) {
                    double t = (value - 0.3) / 0.2;
                    return new Rgba32((byte)(255*t), (byte)(100 + 65*t), (byte)(200 - 200*t), 255);
                } else if (value < 0.8) {
                    double t = (value - 0.5) / 0.3;
                    return new Rgba32((byte)(255), (byte)(165 - 165*t), (byte)(0), 255);
                } else {
                    double t = Math.Clamp((value - 0.8) / 0.2, 0.0, 1.0);
                    return new Rgba32((byte)(255), (byte)(255*t), (byte)(255*t), 255);
                }
            }

            void GeneratePreview(string name, string title, Func<DensityPoint, double> selector)
            {
                using var img = new Image<Rgba32>(outRes, outRes);
                
                // Fill background
                for (int y = 0; y < outRes; y++) {
                    for (int x = 0; x < outRes; x++) {
                        img[x, y] = new Rgba32(10, 15, 30, 255); // Dark terrain-neutral background
                    }
                }

                double minVal = 1.0;
                double maxVal = 0.0;

                foreach (var pt in matrix.data) {
                    double val = selector(pt);
                    if (val > maxVal) maxVal = val;
                    if (val < minVal) minVal = val;

                    if (val > 0) {
                        Rgba32 color = GetHeatColor(val);
                        // Draw block scaled
                        for (int dy = 0; dy < scale; dy++) {
                            for (int dx = 0; dx < scale; dx++) {
                                img[pt.x * scale + dx, pt.y * scale + dy] = color;
                            }
                        }
                    }
                }

                string filePath = Path.Combine(outDir, $"{name}-preview.png");
                img.SaveAsPng(filePath);
                Console.WriteLine($"[C5-B] Saved {name} (Min: {Math.Round(minVal, 2)}, Max: {Math.Round(maxVal, 2)})");
            }

            GeneratePreview("generic-node-density", "Generic Node Density", p => p.generic);
            GeneratePreview("stone-potential", "Stone Potential", p => p.stone);
            GeneratePreview("sulfur-potential", "Sulfur Potential", p => p.sulfur);
            GeneratePreview("metal-ore-potential", "Metal Ore Potential", p => p.metal);

            var summary = new {
                input_file = Path.GetFileName(inputPath),
                model_version = matrix.model_version,
                note = "estimated/predicted, not exact spawn points",
                image_sizes = $"{outRes}x{outRes}",
                generated_previews = new[] {
                    "generic-node-density-preview.png",
                    "stone-potential-preview.png",
                    "sulfur-potential-preview.png",
                    "metal-ore-potential-preview.png"
                }
            };

            string summaryPath = Path.Combine(outDir, "render-summary.json");
            File.WriteAllText(summaryPath, JsonSerializer.Serialize(summary, new JsonSerializerOptions { WriteIndented = true }));
            Console.WriteLine($"[C5-B] Wrote summary to {summaryPath}");
        }
    }
}
