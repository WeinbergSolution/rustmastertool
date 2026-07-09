using System;
using System.Threading.Tasks;

namespace MapIntelligenceWorker.Publishing
{
    public class NoopStoragePublisher : IStoragePublisher
    {
        public Task PublishAsync(PublishPlan plan, bool confirmRealUpload)
        {
            Console.WriteLine($"[NoopStoragePublisher] Skipping real upload for {plan.totalObjects} objects. (Mode: dry-run or validate)");
            return Task.CompletedTask;
        }
    }
}
