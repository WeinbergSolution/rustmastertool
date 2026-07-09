using System;
using System.IO;
using System.Text.Json;
using System.Collections.Generic;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace ProductResourceHeatmapVisuals
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
            string inputPath = @"..\..\..\..\resource-heatmap-calibration\output\density-matrix-v0.2.json";
            string outDir = @"output";

            if (!File.Exists(inputPath)) {
                inputPath = @"C:\Users\pasca\Documents\Developer Academy\DEV-Projekte\rustMasterTool\experiments\resource-heatmap-calibration\output\density-matrix-v0.2.json";
            }

            Console.WriteLine($"[C5-D] Loading input matrix from: {inputPath}");
            var jsonStr = File.ReadAllText(inputPath);
            var matrix = JsonSerializer.Deserialize<DensityMatrix>(jsonStr);

            Directory.CreateDirectory(outDir);
            
            int res = matrix.resolution; // 256
            int scale = 2; // Output 512x512
            int outRes = res * scale;

            // Blur radius
            float blurRadius = 3.5f;

            // Color Maps
            // 1. Overview Style (Night Lights / Thermal: Dark Blue -> Purple -> Orange -> Yellow -> White)
            Rgba32 GetOverviewColor(float intensity) {
                if (intensity <= 0.05f) return new Rgba32(10, 15, 30, 255); // Background
                if (intensity < 0.3f) {
                    float t = (intensity - 0.05f) / 0.25f;
                    return new Rgba32((byte)(10 + 60*t), (byte)(15 + 10*t), (byte)(30 + 120*t), 255); // To Purple
                } else if (intensity < 0.6f) {
                    float t = (intensity - 0.3f) / 0.3f;
                    return new Rgba32((byte)(70 + 185*t), (byte)(25 + 100*t), (byte)(150 - 150*t), 255); // To Orange
                } else if (intensity < 0.85f) {
                    float t = (intensity - 0.6f) / 0.25f;
                    return new Rgba32(255, (byte)(125 + 130*t), 0, 255); // To Yellow
                } else {
                    float t = Math.Clamp((intensity - 0.85f) / 0.15f, 0, 1);
                    return new Rgba32(255, 255, (byte)(255*t), 255); // To White
                }
            }

            // 2. Overlay Style (Transparent -> Light Blue -> Yellow -> Red)
            Rgba32 GetOverlayColor(float intensity) {
                if (intensity <= 0.02f) return new Rgba32(0, 0, 0, 0); // Transparent
                byte alpha = (byte)Math.Clamp(intensity * 300, 0, 200); // Max 200 alpha so map is visible under it

                if (intensity < 0.4f) {
                    float t = (intensity - 0.02f) / 0.38f;
                    return new Rgba32((byte)(0), (byte)(100*t), (byte)(150 + 105*t), alpha); // Blue
                } else if (intensity < 0.7f) {
                    float t = (intensity - 0.4f) / 0.3f;
                    return new Rgba32((byte)(255*t), (byte)(100 + 100*t), (byte)(255 - 255*t), alpha); // Yellowish
                } else {
                    float t = Math.Clamp((intensity - 0.7f) / 0.3f, 0, 1);
                    return new Rgba32(255, (byte)(200 - 200*t), 0, alpha); // Red
                }
            }

            void GenerateVisual(string name, Func<DensityPoint, double> selector)
            {
                // 1. Generate grayscale mask
                using var maskImg = new Image<Rgba32>(outRes, outRes);
                
                // Fill black
                for (int y = 0; y < outRes; y++) {
                    for (int x = 0; x < outRes; x++) {
                        maskImg[x, y] = new Rgba32(0, 0, 0, 255);
                    }
                }

                // Draw points
                foreach (var pt in matrix.data) {
                    double val = selector(pt);
                    if (val > 0) {
                        byte i = (byte)Math.Clamp(val * 255, 0, 255);
                        var c = new Rgba32(i, i, i, 255);
                        for (int dy = 0; dy < scale; dy++) {
                            for (int dx = 0; dx < scale; dx++) {
                                maskImg[pt.x * scale + dx, pt.y * scale + dy] = c;
                            }
                        }
                    }
                }

                // Blur mask
                maskImg.Mutate(ctx => ctx.GaussianBlur(blurRadius));

                // 2. Render Overview Style
                using var overviewImg = new Image<Rgba32>(outRes, outRes);
                for (int y = 0; y < outRes; y++) {
                    for (int x = 0; x < outRes; x++) {
                        float intensity = maskImg[x, y].R / 255f;
                        overviewImg[x, y] = GetOverviewColor(intensity);
                    }
                }
                overviewImg.SaveAsPng(Path.Combine(outDir, $"overview-{name}.png"));

                // 3. Render Overlay Style
                using var overlayImg = new Image<Rgba32>(outRes, outRes);
                for (int y = 0; y < outRes; y++) {
                    for (int x = 0; x < outRes; x++) {
                        float intensity = maskImg[x, y].R / 255f;
                        overlayImg[x, y] = GetOverlayColor(intensity);
                    }
                }
                overlayImg.SaveAsPng(Path.Combine(outDir, $"overlay-{name}.png"));

                Console.WriteLine($"[C5-D] Generated visual pair for {name}");
            }

            GenerateVisual("generic-node-density", p => p.generic);
            GenerateVisual("stone-potential", p => p.stone);
            GenerateVisual("sulfur-potential", p => p.sulfur);
            GenerateVisual("metal-ore-potential", p => p.metal);

            var summary = new {
                input_model = Path.GetFileName(inputPath),
                model_version = matrix.model_version,
                note = "predicted/estimated, not exact spawn points",
                image_sizes = $"{outRes}x{outRes}",
                render_style = "Gaussian Blur Mask with Thermal/Alpha remap",
                settings = new {
                    blur_radius = blurRadius,
                    interpolation = "Bilinear/Gaussian",
                    alpha_clamped = true
                },
                generated_previews = new[] {
                    "overview-generic-node-density.png",
                    "overlay-generic-node-density.png",
                    "overview-stone-potential.png",
                    "overlay-stone-potential.png",
                    "overview-sulfur-potential.png",
                    "overlay-sulfur-potential.png",
                    "overview-metal-ore-potential.png",
                    "overlay-metal-ore-potential.png"
                }
            };

            string summaryPath = Path.Combine(outDir, "visual-summary.json");
            File.WriteAllText(summaryPath, JsonSerializer.Serialize(summary, new JsonSerializerOptions { WriteIndented = true }));
            Console.WriteLine($"[C5-D] Wrote summary to {summaryPath}");
        }
    }
}
