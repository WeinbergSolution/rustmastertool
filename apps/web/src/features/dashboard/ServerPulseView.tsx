import { LineChart, Database, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export function ServerPulseView() {
  const [serverCount, setServerCount] = useState<number>(0);
  const [snapshotCount, setSnapshotCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      if (!supabase) return;
      try {
        const { count: sCount } = await supabase.from('provider_servers').select('*', { count: 'exact', head: true });
        const { count: snapCount } = await supabase.from('server_population_snapshots').select('*', { count: 'exact', head: true });
        if (mounted) {
          setServerCount(sCount || 0);
          setSnapshotCount(snapCount || 0);
        }
      } catch (e) {
        // Migration might not be applied, ignore
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    fetchStats();
    return () => { mounted = false; };
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', paddingBottom: '2rem' }}>
      <div className="card" style={{ backgroundColor: 'var(--bg-panel)', borderLeft: '4px solid var(--accent-rust)', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <LineChart size={24} style={{ color: 'var(--accent-rust)' }} />
          Server Pulse
        </h2>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          Server Pulse is RustMasterTool's upcoming intelligence engine. We are actively collecting historical population snapshots of Rust servers to build wipe decay curves, retention scores, and server health analytics.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-hover)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
             <Database size={24} style={{ color: 'var(--accent-rust)', marginBottom: '1rem' }} />
             <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Historical Snapshots</h3>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
               Continuous monitoring of player counts, queues, and wipe events to establish long-term server profiles.
             </p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-hover)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
             <LineChart size={24} style={{ color: 'var(--status-warning)', marginBottom: '1rem' }} />
             <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Wipe Decay Curves</h3>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
               Visualize how fast a server dies after wipe. Choose servers that match your preferred wipe longevity.
             </p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-hover)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
             <Zap size={24} style={{ color: 'var(--status-success)', marginBottom: '1rem' }} />
             <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Retention Scores</h3>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
               Algorithmic health scores based on queue pressure, average player duration, and wipe consistency.
             </p>
          </div>
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Current Data Status</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
              {isLoading ? 'Connecting to intelligence backend to evaluate global snapshot retention...' : serverCount > 0 ? 'Data collection is active. Retention curves require multiple snapshots after wipe.' : 'Server Pulse database is waiting for first ingestion.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-rust)' }}>{isLoading ? '-' : snapshotCount.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Snapshots</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-rust)' }}>{isLoading ? '-' : serverCount.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Servers Tracked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
