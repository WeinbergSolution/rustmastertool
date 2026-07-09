using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace ResourceHeatmapProbe
{
    class Program
    {
        static void Main(string[] args)
        {
            string mapPath = args.Length > 0 ? args[0] : @"D:\RustMasterToolMapGen\output\proceduralmap.4750.1321.286.map";
            byte[] fileBytes = File.ReadAllBytes(mapPath);
            string ascii = Encoding.ASCII.GetString(fileBytes);

            string[] targets = { "stone", "sulfur", "sulphur", "metal", "ore", "node", "resource", "collectable", "spawn", "mineral", "rocks", "forest", "shore", "core", "more" };
            
            Console.WriteLine("\n[Direct Resource Truth Audit]");
            foreach (var target in targets)
            {
                int countWord = Regex.Matches(ascii, $@"\b{target}\b", RegexOptions.IgnoreCase).Count;
                int countSub = Regex.Matches(ascii, target, RegexOptions.IgnoreCase).Count;
                Console.WriteLine($"Found '{target}': {countWord} (as full word), {countSub} (as substring)");
            }
        }
    }
}
