import { LineChart, Clock, CheckCircle2, XCircle, AlertCircle, PlayCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface SchedulerState {
  id: string;
  category: string;
  enabled: boolean;
  interval_minutes: number;
  last_run_at: string | null;
  last_success_at: string | null;
  last_error_at: string | null;
}

interface IngestRun {
  id: string;
  category: string;
  status: string;
  started_at: string;
  finished_at: string | null;
  pages_processed: number;
  server_upsert_attempts: number;
  snapshot_insert_attempts: number;
  errors_count: number;
  dry_run: boolean;
}

export function ServerPulseView() {
  const [serverCount, setServerCount] = useState<number>(0);
  const [snapshotCount, setSnapshotCount] = useState<number>(0);
  const [schedulerStates, setSchedulerStates] = useState<SchedulerState[]>([]);
  const [recentRuns, setRecentRuns] = useState<IngestRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      if (!supabase) return;
      try {
        const [{ count: sCount }, { count: snapCount }, { data: states }, { data: runs }] = await Promise.all([
          supabase.from('provider_servers').select('*', { count: 'exact', head: true }),
          supabase.from('server_population_snapshots').select('*', { count: 'exact', head: true }),
          supabase.from('server_pulse_scheduler_state').select('*').order('category'),
          supabase.from('server_pulse_ingest_runs').select('*').order('started_at', { ascending: false }).limit(10)
        ]);

        if (mounted) {
          setServerCount(sCount || 0);
          setSnapshotCount(snapCount || 0);
          setSchedulerStates(states || []);
          setRecentRuns(runs || []);
        }
      } catch (e) {
        console.error("Failed to fetch server pulse stats:", e);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    fetchStats();
    return () => { mounted = false; };
  }, []);

  const hasAnyActive = schedulerStates.some(s => s.enabled);
  const isSchedulerPrepared = schedulerStates.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', paddingBottom: '2rem' }}>
      <div className="card" style={{ backgroundColor: 'var(--bg-panel)', borderLeft: '4px solid var(--accent-rust)', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <LineChart size={24} style={{ color: 'var(--accent-rust)' }} />
          Server Pulse Intelligence
        </h2>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          Server Pulse collects historical population snapshots of Rust servers to build wipe decay curves, retention scores, and server health analytics.
        </p>

        {/* Top Stats */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-hover)', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1 }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Servers Tracked</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{isLoading ? '-' : serverCount.toLocaleString()}</div>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-hover)', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1 }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Snapshots</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-rust)' }}>{isLoading ? '-' : snapshotCount.toLocaleString()}</div>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-hover)', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1 }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Scheduler Status</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: hasAnyActive ? 'var(--status-success)' : 'var(--text-muted)' }}>
              {isLoading ? '-' : hasAnyActive ? <><PlayCircle size={20}/> Active</> : isSchedulerPrepared ? <><Clock size={20}/> Prepared (Inactive)</> : <><AlertCircle size={20}/> Not deployed</>}
            </div>
          </div>
        </div>

        {/* Scheduler Categories */}
        {isSchedulerPrepared && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Scheduler Configuration</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {schedulerStates.map(state => (
                <div key={state.id} style={{ padding: '1rem', backgroundColor: 'var(--bg-panel)', border: `1px solid ${state.enabled ? 'var(--status-success)' : 'var(--border-color)'}`, borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, textTransform: 'capitalize' }}>{state.category}</h4>
                    {state.enabled ? <span style={{ color: 'var(--status-success)', fontSize: '0.75rem', fontWeight: 'bold' }}>ON</span> : <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>OFF</span>}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Interval: Every {state.interval_minutes}m</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Last Run: {state.last_run_at ? new Date(state.last_run_at).toLocaleString() : 'Never'}
                  </div>
                </div>
              ))}
            </div>
            {!hasAnyActive && (
               <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--status-warning)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <AlertCircle size={16} />
                 Scheduler prepared, awaiting remote activation via pg_cron.
               </div>
            )}
          </div>
        )}

        {/* Recent Runs */}
        {recentRuns.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Recent Ingest Runs</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Time</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Category</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Type</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Pages</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Server Upserts</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Snapshot Inserts</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Errors</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRuns.map(run => (
                    <tr key={run.id} style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '0.75rem 0.5rem' }}>{new Date(run.started_at).toLocaleString()}</td>
                      <td style={{ padding: '0.75rem 0.5rem', textTransform: 'capitalize' }}>{run.category}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        {run.status === 'success' && <span style={{ color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={14}/> Success</span>}
                        {run.status === 'partial_success' && <span style={{ color: 'var(--status-warning)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertCircle size={14}/> Partial</span>}
                        {run.status === 'failed' && <span style={{ color: 'var(--status-danger)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><XCircle size={14}/> Failed</span>}
                        {run.status === 'running' && <span style={{ color: '#3399ff', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14}/> Running</span>}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        {run.dry_run ? <span style={{ color: '#ff9900', fontSize: '0.75rem', padding: '2px 6px', backgroundColor: 'rgba(255, 153, 0, 0.1)', borderRadius: '12px' }}>DRY RUN</span> : 'Live'}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>{run.pages_processed}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>{run.server_upsert_attempts}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>{run.snapshot_insert_attempts}</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: run.errors_count > 0 ? 'var(--status-danger)' : 'inherit' }}>{run.errors_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
