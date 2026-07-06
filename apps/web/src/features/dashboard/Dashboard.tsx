import { useState, useEffect } from 'react';
import { Server, User, BookOpen, Activity, ArrowRight, Eye, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../lib/auth/useAuth';
import { supabase } from '../../lib/supabaseClient';
import type { ViewState } from '../../components/AppShell';

interface DashboardProps {
  onViewChange?: (view: ViewState) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const { status, user, profile } = useAuth();
  const [activeServerId, setActiveServerId] = useState<string | null>(null);
  const [watchlistCount, setWatchlistCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      if (status === 'authenticated' && user) {
        try {
          const saved = window.localStorage.getItem(`rm_watchlist_${user.id}`);
          if (saved && mounted) {
            setWatchlistCount(JSON.parse(saved).length);
          }
          if (supabase) {
            const { data: p } = await supabase.from('profiles').select('active_server_id').eq('id', user.id).single();
            if (p?.active_server_id && mounted) setActiveServerId(p.active_server_id);
          }
        } catch (e) {}
      } else if (mounted) {
        setWatchlistCount(0);
        setActiveServerId(null);
      }
    }
    loadData();
    
    const handleWatchlistUpdated = () => {
      loadData();
    };
    window.addEventListener('watchlistUpdated', handleWatchlistUpdated);
    
    return () => { 
      mounted = false; 
      window.removeEventListener('watchlistUpdated', handleWatchlistUpdated);
    };
  }, [status, user]);

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', paddingBottom: '2rem' }}>
      
      {/* Hero Panel / My Rust Context */}
      <div className="card" style={{ backgroundColor: 'var(--bg-panel)', borderLeft: '4px solid var(--accent-rust)', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={24} style={{ color: 'var(--accent-rust)' }} />
          Command Center
        </h2>
        
        {status === 'authenticated' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
               {avatar ? (
                 <img src={avatar} alt="Avatar" style={{ width: '64px', height: '64px', borderRadius: '8px', border: '2px solid var(--border-color)' }} />
               ) : (
                 <div style={{ width: '64px', height: '64px', borderRadius: '8px', backgroundColor: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={32} />
                 </div>
               )}
               <div>
                 <div style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.25rem' }}>{displayName}</div>
                 <div style={{ fontSize: '0.875rem', color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-success)' }}></div>
                   Steam Identity Verified
                 </div>
                 <button 
                   onClick={() => onViewChange?.('my_rust')}
                   style={{ marginTop: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                 >
                   View MyRust Profile
                 </button>
               </div>
            </div>
            
            <div style={{ paddingLeft: '2rem', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Active Server Context</div>
               {activeServerId ? (
                 <>
                   <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>Connection Set</div>
                   <button 
                     onClick={() => onViewChange?.('current_connection')}
                     style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', background: 'rgba(205, 65, 43, 0.1)', border: '1px solid var(--accent-rust)', color: 'var(--accent-rust)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold' }}
                   >
                     View Current Connection
                   </button>
                 </>
               ) : (
                 <>
                   <div style={{ color: 'var(--text-disabled)', marginBottom: '0.5rem' }}>No active server set.</div>
                   <button 
                     onClick={() => onViewChange?.('servers')}
                     style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', background: 'var(--accent-rust)', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold' }}
                   >
                     Choose Your Server
                   </button>
                 </>
               )}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem 0', fontSize: '1.1rem' }}>
                Welcome to RustMasterTool. Sign in with Steam to unlock your personalized survival companion.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => {
                    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
                    if (supabaseUrl) {
                      const origin = encodeURIComponent(window.location.origin);
                      window.location.href = `${supabaseUrl}/functions/v1/steam-auth?action=login&origin=${origin}`;
                    }
                  }}
                  className="btn-steam"
                >
                  Sign in with Steam
                </button>
                <button 
                  onClick={() => onViewChange?.('servers')}
                  style={{ padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Browse Servers Anonymously
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        
        {/* Pre-Game */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
           <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phase 1</div>
           <div className="card-title" style={{ color: 'var(--accent-rust)' }}>Pre-Game</div>
           <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', flex: 1, marginBottom: '1.5rem' }}>
             Find, filter, and analyze live Rust servers before you join. Build your watchlist and find the perfect wipe.
           </p>
           <button 
             onClick={() => onViewChange?.('servers')}
             style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
           >
             <Server size={18} /> Browse & Analyze Servers
           </button>
        </div>

        {/* In-Game */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
           <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phase 2</div>
           <div className="card-title">In-Game Companion</div>
           <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', flex: 1, marginBottom: '1.5rem' }}>
             Live Map, Raid Calculator, and Current Connection support while you play.
           </p>
           <button 
             onClick={() => onViewChange?.('current_connection')}
             style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
           >
             <Activity size={18} /> Open Live Companion
           </button>
        </div>

        {/* After-Game */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
           <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phase 3</div>
           <div className="card-title">After-Game</div>
           <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', flex: 1, marginBottom: '1.5rem' }}>
             Review your Session Battle Log, track durations, and log learnings for your next wipe.
           </p>
           <button 
             onClick={() => onViewChange?.('session_battle_log')}
             style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
           >
             <BookOpen size={18} /> View Battle Logs
           </button>
        </div>

      </div>

      {/* Watchlist Summary */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div className="card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Eye size={20} /> Watchlist Summary
          </div>
          {status === 'authenticated' && (
            <span className="badge" style={{ backgroundColor: 'var(--bg-hover)' }}>{watchlistCount} Servers</span>
          )}
        </div>
        
        {status !== 'authenticated' ? (
          <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '4px', color: 'var(--text-muted)' }}>
            <ShieldAlert size={24} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
            <p>Sign in with Steam to manage your Watchlist.</p>
          </div>
        ) : watchlistCount === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '4px', color: 'var(--text-muted)' }}>
            <p style={{ margin: '0 0 1rem 0' }}>Your watchlist is empty.</p>
            <button 
              onClick={() => onViewChange?.('servers')}
              style={{ padding: '0.5rem 1rem', background: 'var(--accent-rust)', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}
            >
              Find Servers
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-panel)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-muted)' }}>You are tracking {watchlistCount} servers.</span>
            <button 
              onClick={() => onViewChange?.('watchlist')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}
            >
              Manage Watchlist <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
