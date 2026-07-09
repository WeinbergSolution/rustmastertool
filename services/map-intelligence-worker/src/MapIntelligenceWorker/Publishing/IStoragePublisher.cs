using System;
using System.Threading.Tasks;

namespace MapIntelligenceWorker.Publishing
{
    public interface IStoragePublisher
    {
        Task PublishAsync(PublishPlan plan, bool confirmRealUpload);
    }
}
