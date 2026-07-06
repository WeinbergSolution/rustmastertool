import { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Zap, Bell, X, Eye, Server, User } from 'lucide-react';
import { useAuth } from '../../lib/auth/useAuth';
import { watchlistRepository } from '../../lib/data/watchlistRepository';
import { supabase } from '../../lib/supabaseClient';
import type { BattleMetricsServerSummary } from '../../lib/api/battlemetrics';
import type { ViewState } from '../../components/AppShell';

interface DashboardProps {
  onViewChange?: (view: ViewState) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const { status, user, profile } = useAuth();
  const [watchedServers, setWatchedServers] = useState<BattleMetricsServerSummary[]>([]);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(true);
  const [activeServerId, setActiveServerId] = useState<string | null>(null);

  const cloudRepo = (status === 'authenticated' && import.meta.env.VITE_DATA_MODE === 'supabase') ? watchlistRepository : null;

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setIsWatchlistLoading(true);
      try {
        if (status === 'authenticated' && user) {
           const saved = window.localStorage.getItem(`rm_watchlist_${user.id}`);
           if (saved && mounted) {
             setWatchedServers(JSON.parse(saved));
           } else if (mounted) {
             setWatchedServers([]);
           }

           if (supabase) {
             const { data: p } = await supabase.from('profiles').select('active_server_id').eq('id', user.id).single();
             if (p?.active_server_id && mounted) setActiveServerId(p.active_server_id);
           }
        } else if (status === 'unauthenticated' && mounted) {
           setWatchedServers([]);
           setActiveServerId(null);
        }
      } catch (e) {
        console.warn('Failed to load data', e);
      } finally {
        if (mounted) setIsWatchlistLoading(false);
      }
    }
    if (status !== 'auth_pending') loadData();
    return () => { mounted = false; };
  }, [status, user]);

  const toggleWatch = async (id: string, internalUuid?: string) => {
    if (status !== 'authenticated' || !user) return;
    const existingIndex = watchedServers.findIndex(s => s.id === id);
    let newServers: BattleMetricsServerSummary[];
    let resolvedUuid = internalUuid;
    
    if (existingIndex >= 0) {
      resolvedUuid = internalUuid || (watchedServers[existingIndex] as any).internal_uuid;
      newServers = watchedServers.filter(s => s.id !== id);
    } else {
      return; // Dashboard only supports removal of already watched servers
    }
    
    setWatchedServers(newServers);
    try { window.localStorage.setItem(`rm_watchlist_${user.id}`, JSON.stringify(newServers)); } catch (e) {}

    if (cloudRepo && resolvedUuid) {
       try { await cloudRepo.toggleServer(id, resolvedUuid); } catch (e) { console.error(e); }
    }
  };

  let displayName = 'Unknown Survivor';
  if (profile) {
    if (profile.steam_persona_name) displayName = profile.steam_persona_name;
    else if (profile.username) displayName = profile.username;
    else if (profile.steam_id) displayName = `SteamID ${profile.steam_id}`;
  } else if (user?.user_metadata?.persona && user.user_metadata.persona !== 'Unknown Steam User') {
    displayName = user.user_metadata.persona;
  }
  const avatar = profile?.avatar_url || user?.user_metadata?.avatar;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
      
      {/* Hero Panel / My Rust Context */}
      <div className="card" style={{ backgroundColor: 'var(--bg-hover)', borderLeft: '4px solid var(--accent-rust)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>My Rust Context</h2>
        
        {status === 'authenticated' ? (
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               {avatar ? (
                 <img src={avatar} alt="Avatar" style={{ width: '48px', height: '48px', borderRadius: '4px' }} />
               ) : (
                 <div style={{ width: '48px', height: '48px', borderRadius: '4px', backgroundColor: 'var(--bg-panel)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={24} />
                 </div>
               )}
               <div>
                 <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{displayName}</div>
                 <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Steam Identity Verified</div>
               </div>
            </div>
            
            <div style={{ paddingLeft: '2rem', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Active Server</div>
               {activeServerId ? (
                 <div style={{ fontWeight: 'bold', color: 'var(--accent-rust)' }}>Set via Internal ID: {activeServerId.substring(0,8)}...</div>
               ) : (
                 <div style={{ color: 'var(--text-disabled)' }}>No active server set</div>
               )}
            </div>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Real Provider Mode active. The Server Explorer now fetches live data from BattleMetrics.
            </p>
            <div className="status-list">
              <div className="status-chip success"><Zap size={16}/> BM Edge Function Proxy</div>
              <div className="status-chip success"><Eye size={16}/> Live Provider Integration</div>
              <div className="status-chip pending"><Activity size={16}/> Steam Login Required for Context</div>
            </div>
          </>
        )}
      </div>

      <div className="dashboard-grid">
        
        {/* Quick Actions */}
        <div className="card col-span-8">
           <div className="card-title">Server Discovery</div>
           <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
             Find and analyze live Rust servers to add them to your watchlist or set them as your active server.
           </p>
           <button 
             onClick={() => onViewChange?.('servers')}
             style={{
               display: 'flex', alignItems: 'center', gap: '0.5rem',
               padding: '1rem 2rem', backgroundColor: 'var(--accent-rust)', color: '#fff', 
               border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
             }}
           >
             <Server size={20} /> Open Server Explorer
           </button>
        </div>

        {/* Population Trend & Alerts */}
        <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card">
            <div className="card-title">Population Trend</div>
            <div className="gated-overlay" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ padding: '1rem', textAlign: 'center' }}>
                 <Activity size={32} style={{ color: 'var(--text-disabled)', margin: '0 auto 0.5rem' }} />
                 <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Historical snapshots gated until polling budget recalibrated.</p>
               </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Alert Center <Bell size={18} style={{ color: 'var(--text-muted)' }}/></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--status-warning)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <ShieldAlert size={12}/> Roadmap Feature.
              </div>
              <button disabled style={{ marginTop: '0.5rem', padding: '0.5rem', width: '100%', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-disabled)', borderRadius: '4px', cursor: 'not-allowed' }}>
                Manage Alerts (Coming Later)
              </button>
            </div>
          </div>

        </div>

        {/* Watchlist & Map Intel */}
        <div className="card col-span-6">
          <div className="card-title">Watchlist Summary</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {status !== 'authenticated' ? (
              <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                <ShieldAlert size={24} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                <p>Sign in with Steam to manage your Watchlist.</p>
              </div>
            ) : isWatchlistLoading ? (
              <div style={{ padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                Loading watchlist...
              </div>
            ) : watchedServers.length === 0 ? (
              <div style={{ padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                No servers currently in watchlist. Open the Server Explorer to add some.
              </div>
            ) : (
              <div className="server-list" style={{ gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                {watchedServers.map(server => (
                  <div key={server.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-panel)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{server.name}</span>
                    <button onClick={() => toggleWatch(server.id)} style={{ background: 'transparent', border: 'none', color: 'var(--status-error)', cursor: 'pointer' }} title="Remove from Watchlist">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card col-span-6">
          <div className="card-title">Map Intelligence Preview</div>
          <div className="gated-overlay" style={{ height: '140px', backgroundColor: 'var(--bg-panel)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-disabled)' }}>Coming with RustMaps integration.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
