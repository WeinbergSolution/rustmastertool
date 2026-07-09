using System;
using System.IO;
using System.Collections.Generic;
using System.Security.Cryptography;
using K4os.Compression.LZ4.Legacy;
using ProtoBuf;

namespace MapIntelligenceWorker.Decode
{
    public class DecodeResult {
        public byte[] TopologyData { get; set; }
        public string MapSha256 { get; set; }
    }

    public static class DecodeStage {
        public static DecodeResult Run(string mapPath) {
            Console.WriteLine($"[DecodeStage] Loading Map: {mapPath}");
            using var fileStream = File.OpenRead(mapPath);
            
            // Hash Map File
            using var sha256 = SHA256.Create();
            byte[] hash = sha256.ComputeHash(fileStream);
            string sha256Hex = BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();

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
                    if (reader.FieldNumber == 2) {
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

            return new DecodeResult {
                TopologyData = maps.ContainsKey("topology") ? maps["topology"] : null,
                MapSha256 = sha256Hex
            };
        }
    }
}
