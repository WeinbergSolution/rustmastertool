using System;
using System.IO;
using System.Reflection;
using System.Linq;
using System.Text.Json;
using System.Collections.Generic;

namespace DedicatedAssemblyDecodeWorker
{
    class Program
    {
        static string managedDir;

        static void Main(string[] args)
        {
            string mapPath = @"D:\RustMasterToolMapGen\output\proceduralmap.4750.1321.286.map";
            string serverRoot = @"D:\RustMasterToolMapGen\server";
            
            for (int i = 0; i < args.Length; i++)
            {
                if (args[i] == "--map-path" && i + 1 < args.Length) mapPath = args[i + 1];
                if (args[i] == "--server-root" && i + 1 < args.Length) serverRoot = args[i + 1];
            }

            managedDir = Path.Combine(serverRoot, "RustDedicated_Data", "Managed");
            Console.WriteLine($"[C4-B] Managed Dir: {managedDir}");

            AppDomain.CurrentDomain.AssemblyResolve += (sender, e) =>
            {
                var name = new AssemblyName(e.Name);
                string path = Path.Combine(managedDir, name.Name + ".dll");
                if (File.Exists(path)) return Assembly.LoadFrom(path);
                return null;
            };

            try
            {
                Assembly asm = Assembly.LoadFrom(Path.Combine(managedDir, "Rust.World.dll"));
                Type worldSerialization = asm.GetTypes().FirstOrDefault(t => t.Name == "WorldSerialization");

                if (worldSerialization != null)
                {
                    MethodInfo loadMethod = worldSerialization.GetMethod("Load", new Type[] { typeof(string) });

                    if (loadMethod != null)
                    {
                        object wsInstance = Activator.CreateInstance(worldSerialization);
                        Console.WriteLine($"[C4-B] Invoking Load...");
                        loadMethod.Invoke(wsInstance, new object[] { mapPath });
                        Console.WriteLine($"[C4-B] Load complete.");

                        var worldField = worldSerialization.GetField("world", BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                        object worldDataObj = worldField?.GetValue(wsInstance);

                        if (worldDataObj == null)
                        {
                            var worldProp = worldSerialization.GetProperty("world", BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                            worldDataObj = worldProp?.GetValue(wsInstance);
                        }

                        if (worldDataObj != null)
                        {
                            Console.WriteLine($"[C4-B] Found WorldData! Type: {worldDataObj.GetType().FullName}");

                            var mapsField = worldDataObj.GetType().GetField("maps") ?? worldDataObj.GetType().GetField("Maps");
                            var prefabsField = worldDataObj.GetType().GetField("prefabs") ?? worldDataObj.GetType().GetField("Prefabs");

                            var outputData = new Dictionary<string, object>();
                            var layersInfo = new List<object>();

                            if (mapsField != null)
                            {
                                var mapsList = mapsField.GetValue(worldDataObj) as System.Collections.IEnumerable;
                                if (mapsList != null)
                                {
                                    foreach (var mapObj in mapsList)
                                    {
                                        var nameField = mapObj.GetType().GetField("name");
                                        var dataField = mapObj.GetType().GetField("data");
                                        
                                        string name = nameField?.GetValue(mapObj) as string;
                                        byte[] data = dataField?.GetValue(mapObj) as byte[];

                                        if (name != null && data != null)
                                        {
                                            layersInfo.Add(new {
                                                layer = name,
                                                byteLength = data.Length,
                                                resolution_hint = Math.Sqrt(data.Length / 2.0)
                                            });
                                        }
                                    }
                                }
                            }

                            int prefabCount = 0;
                            if (prefabsField != null)
                            {
                                var prefabsList = prefabsField.GetValue(worldDataObj) as System.Collections.IList;
                                if (prefabsList != null) prefabCount = prefabsList.Count;
                            }

                            outputData["layers"] = layersInfo;
                            outputData["prefab_count"] = prefabCount;
                            outputData["decode_status"] = "SUCCESS";

                            string outDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "../../../output");
                            Directory.CreateDirectory(outDir);
                            string outPath = Path.Combine(outDir, "decode-summary.json");
                            File.WriteAllText(outPath, JsonSerializer.Serialize(outputData, new JsonSerializerOptions { WriteIndented = true }));
                            Console.WriteLine($"[C4-B] Wrote decode summary to {outPath}");
                        }
                        else
                        {
                            Console.WriteLine("[C4-B] Could not find 'world' field/property on WorldSerialization instance.");
                            // Print fields/properties to debug
                            foreach (var f in worldSerialization.GetFields(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance))
                                Console.WriteLine($"Field: {f.Name}");
                            foreach (var p in worldSerialization.GetProperties(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance))
                                Console.WriteLine($"Prop: {p.Name}");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[C4-B] ERROR: {ex.GetType().Name} - {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"[C4-B] INNER ERROR: {ex.InnerException.GetType().Name} - {ex.InnerException.Message}");
                }
            }
        }
    }
}
