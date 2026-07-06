import { LineChart, Database, Zap } from 'lucide-react';

export function ServerPulseView() {
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

        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(205, 65, 43, 0.1)', border: '1px dashed var(--accent-rust)', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Ingestion Runbook</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0 0 1rem 0' }}>
            Data collection is currently manual. Server Administrators can run the Edge Function Ingest task to populate the database.
          </p>
          <code style={{ display: 'block', padding: '1rem', backgroundColor: '#111', borderRadius: '4px', color: 'var(--status-success)', fontFamily: 'monospace' }}>
            curl -X POST https://[PROJECT_REF].supabase.co/functions/v1/server-pulse-ingest \<br/>
            &nbsp;&nbsp;-H "server-pulse-ingest-secret: [SECRET]" \<br/>
            &nbsp;&nbsp;-d {'\'{"category":"official", "maxPages":2}\''}
          </code>
        </div>
      </div>
    </div>
  );
}
