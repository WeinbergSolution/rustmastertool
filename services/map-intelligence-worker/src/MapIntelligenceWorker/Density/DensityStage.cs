using System;
using System.Collections.Generic;
using MapIntelligenceWorker.Contracts;

namespace MapIntelligenceWorker.Density
{
    public static class DensityStage {
        public static DensityMatrix Run(byte[] topologyData) {
            Console.WriteLine($"[DensityStage] Running resource-density-v0.2");
            int matrixSize = 256;
            var densityMatrix = new List<DensityPoint>();

            int GetTopology(byte[] data, double nx, double ny) {
                if (data == null || data.Length == 0) return 0;
                int res = 2048; 
                int x = (int)Math.Clamp(nx * res, 0, res - 1);
                int y = (int)Math.Clamp(ny * res, 0, res - 1);
                int idx = (y * res + x) * 4;
                if (idx < 0 || idx + 4 > data.Length) return 0;
                return BitConverter.ToInt32(data, idx);
            }

            int TOPOLOGY_FIELD = 1;
            int TOPOLOGY_CLIFF = 2; 
            int TOPOLOGY_FOREST = 512;
            int TOPOLOGY_MOUNTAIN = 4096;

            for (int y = 0; y < matrixSize; y++)
            {
                for (int x = 0; x < matrixSize; x++)
                {
                    double nx = (double)x / matrixSize;
                    double ny = 1.0 - ((double)y / matrixSize);

                    int topologyRaw = GetTopology(topologyData, nx, ny);
                    
                    double genericDensity = 0.0;
                    double stonePotential = 0.0;
                    double sulfurPotential = 0.0;
                    double metalPotential = 0.0;

                    bool isCliff = (topologyRaw & TOPOLOGY_CLIFF) != 0;
                    bool isMountain = (topologyRaw & TOPOLOGY_MOUNTAIN) != 0;
                    bool isForest = (topologyRaw & TOPOLOGY_FOREST) != 0;
                    bool isField = (topologyRaw & TOPOLOGY_FIELD) != 0;
                    
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
                        densityMatrix.Add(new DensityPoint {
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

            return new DensityMatrix {
                model_version = "resource-density-v0.2",
                resolution = matrixSize,
                data = densityMatrix
            };
        }
    }
}
