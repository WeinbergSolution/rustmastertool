using System;
using System.IO;
using System.Security.Cryptography;
using System.Text.Json;
using System.Collections.Generic;
using K4os.Compression.LZ4.Legacy;
using ProtoBuf;
using System.Linq;

namespace ResourceDensityModelProbe
{
    [ProtoContract]
    public class WorldData {
        [ProtoMember(1)] public uint size { get; set; }
        [ProtoMember(2)] public List<MapData> maps { get; set; } = new List<MapData>();
        [ProtoMember(3)] public List<PrefabData> prefabs { get; set; } = new List<PrefabData>();
        [ProtoMember(4)] public List<PathData> paths { get; set; } = new List<PathData>();
    }

    [ProtoContract]
    public class MapData {
        [ProtoMember(1)] public string name { get; set; }
        [ProtoMember(2)] public byte[] data { get; set; }
    }

    [ProtoContract]
    public class PrefabData {
        [ProtoMember(1)] public string category { get; set; }
    }

    [ProtoContract]
    public class PathData {
        [ProtoMember(1)] public string name { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            string mapPath = @"D:\RustMasterToolMapGen\output\proceduralmap.4750.1321.286.map";
            string outPath = @"D:\RustMasterToolMapGen\experiments\resource-density-model-v1-probe\output\density-matrix-128.json";

            for (int i = 0; i < args.Length; i++)
            {
                if (args[i] == "--map-path" && i + 1 < args.Length) mapPath = args[i + 1];
                if (args[i] == "--out" && i + 1 < args.Length) outPath = args[i + 1];
            }

            Console.WriteLine($"[C5-A] Loading Map: {mapPath}");
            using var fileStream = File.OpenRead(mapPath);
            fileStream.Seek(12, SeekOrigin.Begin);
            
            using var ms = new MemoryStream();
            try {
                while (fileStream.Position < fileStream.Length) {
                    using var lz4Stream = LZ4Legacy.Decode(fileStream, leaveOpen: true);
                    lz4Stream.CopyTo(ms);
                }
            } catch {} // ignore potential stream end issues
            
            byte[] uncompressedData = ms.ToArray();
            Console.WriteLine($"[C5-A] Decompressed: {uncompressedData.Length} bytes");

            var maps = new Dictionary<string, byte[]>();

            using var pbStream = new MemoryStream(uncompressedData);
            using var reader = ProtoReader.State.Create(pbStream, null);
            
            try {
                while (reader.ReadFieldHeader() > 0) {
                    if (reader.FieldNumber == 1) {
                        uint size = reader.ReadUInt32();
                        Console.WriteLine($"[C5-A] World Size: {size}");
                    } else if (reader.FieldNumber == 2) {
                        var mapToken = reader.StartSubItem();
                        string mapName = null;
                        byte[] mapData = null;
                        while (reader.ReadFieldHeader() > 0) {
                            if (reader.FieldNumber == 1) mapName = reader.ReadString();
                            else if (reader.FieldNumber == 2) mapData = reader.AppendBytes(null);
                            else reader.SkipField();
                        }
                        reader.EndSubItem(mapToken);
                        if (mapName != null && mapData != null) maps[mapName] = mapData;
                    } else {
                        reader.SkipField();
                    }
                }
            } catch {}

            Console.WriteLine($"[C5-A] Loaded layers: {string.Join(", ", maps.Keys)}");

            // Build Matrix (128x128)
            int matrixSize = 128;
            var densityMatrix = new List<object>();

            // Layer details derived from sizes in C4-C
            int GetValueAtNormalized(byte[] data, int bpp, double nx, double ny) {
                if (data == null || data.Length == 0) return 0;
                int pixels = data.Length / bpp;
                int res = (int)Math.Sqrt(pixels);
                int x = (int)Math.Clamp(nx * res, 0, res - 1);
                int y = (int)Math.Clamp(ny * res, 0, res - 1);
                int idx = (y * res + x) * bpp;
                
                if (idx < 0 || idx + bpp > data.Length) return 0;

                if (bpp == 1) return data[idx];
                if (bpp == 2) return BitConverter.ToInt16(data, idx);
                if (bpp == 4) return BitConverter.ToInt32(data, idx);
                return 0;
            }

            // Constants
            int BIOME_ARID = 1;
            int BIOME_TEMPERATE = 2;
            int BIOME_TUNDRA = 4;
            int BIOME_ARCTIC = 8;

            int TOPOLOGY_CLIFF = 2; 

            for (int y = 0; y < matrixSize; y++)
            {
                for (int x = 0; x < matrixSize; x++)
                {
                    double nx = (double)x / matrixSize;
                    double ny = (double)y / matrixSize;

                    // Read topologies (assume 4 bytes per pixel)
                    int topologyRaw = maps.ContainsKey("topology") ? GetValueAtNormalized(maps["topology"], 4, nx, ny) : 0;
                    
                    // Read biomes (assume 4 bytes per pixel for safety, could be 1)
                    int biomeRaw = maps.ContainsKey("biome") ? GetValueAtNormalized(maps["biome"], 4, nx, ny) : 0;
                    if (maps.ContainsKey("biome") && maps["biome"].Length == 4194304) {
                        biomeRaw = GetValueAtNormalized(maps["biome"], 1, nx, ny); // 1 byte per pixel if it's 2048x2048
                    }
                    
                    // Calculate potentials based on simplistic v1 rules
                    double stonePotential = 0.0;
                    double sulfurPotential = 0.0;
                    double metalPotential = 0.0;
                    double genericDensity = 0.1; // Base generic spawn rate

                    // If it's a cliff/mountain topology, drastically increase ore potential
                    bool isCliff = (topologyRaw & TOPOLOGY_CLIFF) != 0;
                    if (isCliff) {
                        genericDensity += 0.6;
                        stonePotential += 0.8;
                        sulfurPotential += 0.5;
                        metalPotential += 0.7;
                    }

                    // Biome weighting
                    if ((biomeRaw & BIOME_ARCTIC) != 0) {
                        metalPotential += 0.3;
                        sulfurPotential += 0.1;
                    } else if ((biomeRaw & BIOME_ARID) != 0) {
                        sulfurPotential += 0.4;
                        stonePotential += 0.1;
                    } else if ((biomeRaw & BIOME_TUNDRA) != 0) {
                        metalPotential += 0.2;
                        sulfurPotential += 0.2;
                    } else {
                        // Temperate
                        stonePotential += 0.2;
                    }

                    stonePotential = Math.Clamp(stonePotential, 0, 1);
                    sulfurPotential = Math.Clamp(sulfurPotential, 0, 1);
                    metalPotential = Math.Clamp(metalPotential, 0, 1);
                    genericDensity = Math.Clamp(genericDensity, 0, 1);

                    // Only save notable points to keep JSON small
                    if (genericDensity > 0.15) {
                        densityMatrix.Add(new {
                            x = x,
                            y = y,
                            generic = Math.Round(genericDensity, 2),
                            stone = Math.Round(stonePotential, 2),
                            sulfur = Math.Round(sulfurPotential, 2),
                            metal = Math.Round(metalPotential, 2)
                        });
                    }
                }
            }

            var outputData = new {
                model_version = "resource-density-v0.1",
                confidence = "ESTIMATED_PROBABILISTIC",
                resolution = matrixSize,
                description = "Honest probabilistic density model based on terrain topology and biome without direct node extraction.",
                data = densityMatrix
            };

            string outDir = Path.GetDirectoryName(outPath);
            Directory.CreateDirectory(outDir);
            File.WriteAllText(outPath, JsonSerializer.Serialize(outputData, new JsonSerializerOptions { WriteIndented = true }));
            Console.WriteLine($"[C5-A] Generated Resource Density Matrix with {densityMatrix.Count} positive nodes.");
            Console.WriteLine($"[C5-A] Output written to {outPath}");
        }
    }
}
