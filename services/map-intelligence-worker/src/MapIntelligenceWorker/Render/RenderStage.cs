using System;
using System.IO;
using System.Collections.Generic;
using MapIntelligenceWorker.Contracts;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace MapIntelligenceWorker.Render
{
    public class RenderResult {
        public List<string> GeneratedFiles { get; set; } = new List<string>();
        public string RenderVersion { get; set; } = "v1.0";
    }

    public static class RenderStage {
        public static RenderResult Run(DensityMatrix matrix, string outDir) {
            Console.WriteLine($"[RenderStage] Rendering Visuals to {outDir}");
            var result = new RenderResult();
            
            int res = matrix.resolution;
            int scale = 2; // Output 512x512
            int outRes = res * scale;
            float blurRadius = 3.5f;

            Rgba32 GetOverviewColor(float intensity) {
                if (intensity <= 0.05f) return new Rgba32(10, 15, 30, 255);
                if (intensity < 0.3f) {
                    float t = (intensity - 0.05f) / 0.25f;
                    return new Rgba32((byte)(10 + 60*t), (byte)(15 + 10*t), (byte)(30 + 120*t), 255);
                } else if (intensity < 0.6f) {
                    float t = (intensity - 0.3f) / 0.3f;
                    return new Rgba32((byte)(70 + 185*t), (byte)(25 + 100*t), (byte)(150 - 150*t), 255);
                } else if (intensity < 0.85f) {
                    float t = (intensity - 0.6f) / 0.25f;
                    return new Rgba32(255, (byte)(125 + 130*t), 0, 255);
                } else {
                    float t = Math.Clamp((intensity - 0.85f) / 0.15f, 0, 1);
                    return new Rgba32(255, 255, (byte)(255*t), 255);
                }
            }

            Rgba32 GetOverlayColor(float intensity) {
                if (intensity <= 0.02f) return new Rgba32(0, 0, 0, 0);
                byte alpha = (byte)Math.Clamp(intensity * 300, 0, 200);
                if (intensity < 0.4f) {
                    float t = (intensity - 0.02f) / 0.38f;
                    return new Rgba32((byte)(0), (byte)(100*t), (byte)(150 + 105*t), alpha);
                } else if (intensity < 0.7f) {
                    float t = (intensity - 0.4f) / 0.3f;
                    return new Rgba32((byte)(255*t), (byte)(100 + 100*t), (byte)(255 - 255*t), alpha);
                } else {
                    float t = Math.Clamp((intensity - 0.7f) / 0.3f, 0, 1);
                    return new Rgba32(255, (byte)(200 - 200*t), 0, alpha);
                }
            }

            void GenerateVisual(string name, Func<DensityPoint, double> selector)
            {
                using var maskImg = new Image<Rgba32>(outRes, outRes);
                for (int y = 0; y < outRes; y++) {
                    for (int x = 0; x < outRes; x++) {
                        maskImg[x, y] = new Rgba32(0, 0, 0, 255);
                    }
                }

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

                maskImg.Mutate(ctx => ctx.GaussianBlur(blurRadius));

                using var overviewImg = new Image<Rgba32>(outRes, outRes);
                for (int y = 0; y < outRes; y++) {
                    for (int x = 0; x < outRes; x++) {
                        overviewImg[x, y] = GetOverviewColor(maskImg[x, y].R / 255f);
                    }
                }
                string overviewFile = $"overview-{name}.png";
                overviewImg.SaveAsPng(Path.Combine(outDir, overviewFile));
                result.GeneratedFiles.Add(overviewFile);

                using var overlayImg = new Image<Rgba32>(outRes, outRes);
                for (int y = 0; y < outRes; y++) {
                    for (int x = 0; x < outRes; x++) {
                        overlayImg[x, y] = GetOverlayColor(maskImg[x, y].R / 255f);
                    }
                }
                string overlayFile = $"overlay-{name}.png";
                overlayImg.SaveAsPng(Path.Combine(outDir, overlayFile));
                result.GeneratedFiles.Add(overlayFile);
            }

            GenerateVisual("generic-node-density", p => p.generic);
            GenerateVisual("stone-potential", p => p.stone);
            GenerateVisual("sulfur-potential", p => p.sulfur);
            GenerateVisual("metal-ore-potential", p => p.metal);

            return result;
        }
    }
}
