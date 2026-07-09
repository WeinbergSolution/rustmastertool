using System.Collections.Generic;

namespace MapIntelligenceWorker.Contracts
{
    public class DensityPoint {
        public int x { get; set; }
        public int y { get; set; }
        public double generic { get; set; }
        public double stone { get; set; }
        public double sulfur { get; set; }
        public double metal { get; set; }
    }

    public class DensityMatrix {
        public string model_version { get; set; }
        public int resolution { get; set; }
        public List<DensityPoint> data { get; set; }
    }
}
