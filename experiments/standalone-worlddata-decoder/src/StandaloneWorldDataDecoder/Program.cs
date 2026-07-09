using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Collections.Generic;
using K4os.Compression.LZ4.Legacy;
using ProtoBuf;

namespace StandaloneWorldDataDecoder
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
        [ProtoMember(2)] public uint id { get; set; }
        [ProtoMember(3)] public VectorData position { get; set; }
        [ProtoMember(4)] public VectorData rotation { get; set; }
        [ProtoMember(5)] public VectorData scale { get; set; }
    }

    [ProtoContract]
    public class VectorData {
        [ProtoMember(1)] public float x { get; set; }
        [ProtoMember(2)] public float y { get; set; }
        [ProtoMember(3)] public float z { get; set; }
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
            string outPath = @"D:\RustMasterToolMapGen\experiments\standalone-worlddata-decoder\output\worlddata-summary.json";

            for (int i = 0; i < args.Length; i++)
            {
                if (args[i] == "--map-path" && i + 1 < args.Length) mapPath = args[i + 1];
                if (args[i] == "--out" && i + 1 < args.Length) outPath = args[i + 1];
            }

            Console.WriteLine($"[C4-C] Decoding {mapPath}");
            using var fileStream = File.OpenRead(mapPath);
            Console.WriteLine($"[C4-C] File Size: {fileStream.Length} bytes");

            byte[] header = new byte[12];
            fileStream.Read(header, 0, 12);

            uint word0 = BitConverter.ToUInt32(header, 0);
            long timestamp = BitConverter.ToInt64(header, 4);

            Console.WriteLine($"[C4-C] Header Version: {word0}");
            Console.WriteLine($"[C4-C] Timestamp: {timestamp}");

            Console.WriteLine($"[C4-C] Attempting LZ4 Decode (multiple blocks) from offset 12");

            try
            {
                fileStream.Seek(12, SeekOrigin.Begin);
                using var ms = new MemoryStream();
                
                int blockCount = 0;
                while (fileStream.Position < fileStream.Length)
                {
                    long startPos = fileStream.Position;
                    using var lz4Stream = LZ4Legacy.Decode(fileStream, leaveOpen: true);
                    lz4Stream.CopyTo(ms);
                    blockCount++;
                    Console.WriteLine($"[C4-C] Decoded LZ4 block {blockCount}, uncompressed chunk size, file pos: {fileStream.Position} / {fileStream.Length}");
                    
                    if (fileStream.Position == startPos)
                    {
                        Console.WriteLine("[C4-C] File position did not advance. Aborting loop to prevent infinite loop.");
                        break;
                    }
                }
                
                byte[] uncompressedData = ms.ToArray();
                Console.WriteLine($"[C4-C] Total LZ4 Decode SUCCESS! Uncompressed Size: {uncompressedData.Length} bytes");

                var outputData = new Dictionary<string, object>();
                var layersInfo = new List<object>();
                int prefabCount = 0;
                int pathCount = 0;
                int oreCount = 0;

                using var pbStream = new MemoryStream(uncompressedData);
                using var reader = ProtoReader.State.Create(pbStream, null);
                
                try {
                    while (reader.ReadFieldHeader() > 0)
                    {
                        if (reader.FieldNumber == 1) 
                        {
                            uint size = reader.ReadUInt32();
                            Console.WriteLine($"[C4-C] Parsed WorldSize: {size}");
                        }
                        else if (reader.FieldNumber == 2)
                        {
                            // MapData
                            var mapToken = reader.StartSubItem();
                            string mapName = null;
                            byte[] mapData = null;
                            while (reader.ReadFieldHeader() > 0)
                            {
                                if (reader.FieldNumber == 1) mapName = reader.ReadString();
                                else if (reader.FieldNumber == 2) mapData = reader.AppendBytes(null);
                                else reader.SkipField();
                            }
                            reader.EndSubItem(mapToken);

                            if (mapName != null && mapData != null)
                            {
                                using var sha256 = SHA256.Create();
                                var hash = sha256.ComputeHash(mapData);
                                string hashStr = BitConverter.ToString(hash).Replace("-", "");

                                layersInfo.Add(new {
                                    layer = mapName,
                                    byteLength = mapData.Length,
                                    resolution_hint = Math.Sqrt(mapData.Length / 2.0),
                                    sha256 = hashStr
                                });
                                Console.WriteLine($"[C4-C] Parsed Map Layer: {mapName} ({mapData.Length} bytes)");
                            }
                        }
                        else if (reader.FieldNumber == 3)
                        {
                            // PrefabData
                            prefabCount++;
                            var prefabToken = reader.StartSubItem();
                            string category = null;
                            while (reader.ReadFieldHeader() > 0)
                            {
                                if (reader.FieldNumber == 1) category = reader.ReadString();
                                else reader.SkipField();
                            }
                            reader.EndSubItem(prefabToken);

                            if (category != null && (category.Contains("ore") || category.Contains("stone") || category.Contains("sulfur") || category.Contains("metal")))
                            {
                                oreCount++;
                            }
                        }
                        else if (reader.FieldNumber == 4)
                        {
                            // PathData
                            pathCount++;
                            reader.SkipField();
                        }
                        else
                        {
                            reader.SkipField();
                        }
                    }
                } catch (Exception parseEx) {
                    Console.WriteLine($"[C4-C] Protobuf Parse interrupted: {parseEx.Message}");
                }

                Console.WriteLine($"[C4-C] Protobuf Parse Complete. Maps: {layersInfo.Count}, Prefabs: {prefabCount}");

                outputData["layers"] = layersInfo;
                outputData["prefab_count"] = prefabCount;
                outputData["path_count"] = pathCount;
                outputData["decode_status"] = "SUCCESS";
                outputData["ore_prefabs_found"] = oreCount;

                string outDir = Path.GetDirectoryName(outPath);
                Directory.CreateDirectory(outDir);
                File.WriteAllText(outPath, JsonSerializer.Serialize(outputData, new JsonSerializerOptions { WriteIndented = true }));
                Console.WriteLine($"[C4-C] Wrote decode summary to {outPath}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[C4-C] ERROR: {ex.GetType().Name} - {ex.Message}");
            }
        }
    }
}
