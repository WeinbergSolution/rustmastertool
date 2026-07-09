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
            string outPath = @"D:\RustMasterToolMapGen\experiments\resource-heatmap-calibration\output\density-matrix-v0.2.json";

            for (int i = 0; i < args.Length; i++)
            {
                if (args[i] == "--map-path" && i + 1 < args.Length) mapPath = args[i + 1];
                if (args[i] == "--out" && i + 1 < args.Length) outPath = args[i + 1];
            }

            Console.WriteLine($"[C5-C] Loading Map: {mapPath}");
            using var fileStream = File.OpenRead(mapPath);
            fileStream.Seek(12, SeekOrigin.Begin);
            
            using var ms = new MemoryStream();
            try {
                while (fileStream.Position < fileStream.Length) {
                    using var lz4Stream = LZ4Legacy.Decode(fileStream, leaveOpen: true);
                    lz4Stream.CopyTo(ms);
                }
            } catch {}
            
            byte[] uncompressedData = ms.ToArray();
            var maps = new Dictionary<string, byte[]>();

            using var pbStream = new MemoryStream(uncompressedData);
            using var reader = ProtoReader.State.Create(pbStream, null);
            
            try {
                while (reader.ReadFieldHeader() > 0) {
                    if (reader.FieldNumber == 1) {
                        uint size = reader.ReadUInt32();
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

            // Build Matrix (256x256 for better visual clarity during calibration)
            int matrixSize = 256;
            var densityMatrix = new List<object>();

            // Topology: 2048x2048 32-bit int
            int GetTopology(byte[] data, double nx, double ny) {
                if (data == null || data.Length == 0) return 0;
                int res = 2048; // Hardcode known Rust topology size for 16.7MB
                int x = (int)Math.Clamp(nx * res, 0, res - 1);
                int y = (int)Math.Clamp(ny * res, 0, res - 1);
                int idx = (y * res + x) * 4;
                if (idx < 0 || idx + 4 > data.Length) return 0;
                return BitConverter.ToInt32(data, idx);
            }

            // Constants
            int TOPOLOGY_FIELD = 1;
            int TOPOLOGY_CLIFF = 2; 
            int TOPOLOGY_FOREST = 512;
            int TOPOLOGY_MOUNTAIN = 4096;
            int TOPOLOGY_TIER0 = 0x4000;
            int TOPOLOGY_TIER1 = 0x8000;
            int TOPOLOGY_TIER2 = 0x10000;

            for (int y = 0; y < matrixSize; y++)
            {
                for (int x = 0; x < matrixSize; x++)
                {
                    double nx = (double)x / matrixSize;
                    // Y in Rust/Unity is 0 at the bottom. We want our 2D array Y=0 to be Top.
                    // So we read ny = 1.0 - ny from the game data.
                    double ny = 1.0 - ((double)y / matrixSize);

                    int topologyRaw = maps.ContainsKey("topology") ? GetTopology(maps["topology"], nx, ny) : 0;
                    
                    double genericDensity = 0.0;
                    double stonePotential = 0.0;
                    double sulfurPotential = 0.0;
                    double metalPotential = 0.0;

                    // Rust node spawns strongly favor Cliffs, Mountains, and Forests.
                    // Tier 0/1/2 topology also dictates spawn clusters (monuments usually have exclusions).
                    bool isCliff = (topologyRaw & TOPOLOGY_CLIFF) != 0;
                    bool isMountain = (topologyRaw & TOPOLOGY_MOUNTAIN) != 0;
                    bool isForest = (topologyRaw & TOPOLOGY_FOREST) != 0;
                    bool isField = (topologyRaw & TOPOLOGY_FIELD) != 0;
                    
                    // Simple Calibration Logic
                    if (isCliff || isMountain) {
                        genericDensity += 0.8;
                        stonePotential += 0.9;
                        sulfurPotential += 0.7;
                        metalPotential += 0.8;
                    } else if (isForest) {
                        genericDensity += 0.5;
                        stonePotential += 0.4;
                        sulfurPotential += 0.3;
                        metalPotential += 0.2;
                    } else if (isField) {
                        genericDensity += 0.2;
                        stonePotential += 0.1;
                    }

                    if (genericDensity > 0) {
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
                model_version = "resource-density-v0.2",
                confidence = "CALIBRATED_ESTIMATED",
                resolution = matrixSize,
                description = "Tuned topology weights and fixed Y-axis orientation.",
                data = densityMatrix
            };

            string outDir = Path.GetDirectoryName(outPath);
            Directory.CreateDirectory(outDir);
            File.WriteAllText(outPath, JsonSerializer.Serialize(outputData, new JsonSerializerOptions { WriteIndented = true }));
            Console.WriteLine($"[C5-C] Generated Resource Density Matrix v0.2 with {densityMatrix.Count} nodes.");
            Console.WriteLine($"[C5-C] Output written to {outPath}");
        }
    }
}
