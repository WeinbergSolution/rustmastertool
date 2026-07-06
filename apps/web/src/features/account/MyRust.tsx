import { User, ShieldCheck, Clock, Award, Package, ExternalLink, Lock } from 'lucide-react';
import { useAuth } from '../../lib/auth/useAuth';

export function MyRust() {
  const { status, user, profile } = useAuth();

  if (status !== 'authenticated') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
        <User size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <h2>Authentication Required</h2>
        <p>Sign in with Steam to view your MyRust Profile.</p>
      </div>
    );
  }

  let displayName = 'Unknown Survivor';
  let steamId = profile?.steam_id || user?.user_metadata?.provider_id || '';
  if (profile) {
    if (profile.steam_persona_name) displayName = profile.steam_persona_name;
    else if (profile.username) displayName = profile.username;
  } else if (user?.user_metadata?.persona && user.user_metadata.persona !== 'Unknown Steam User') {
    displayName = user.user_metadata.persona;
  }
  
  const avatar = profile?.avatar_url || user?.user_metadata?.avatar;
  const steamProfileUrl = steamId ? `https://steamcommunity.com/profiles/${steamId}` : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Hero Profile Banner */}
      <div style={{ 
        position: 'relative',
        backgroundColor: 'var(--bg-panel)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        <div style={{ 
          height: '160px', 
          background: 'linear-gradient(to bottom, rgba(205, 65, 43, 0.2), var(--bg-panel))',
          borderBottom: '1px solid var(--border-color)'
        }}></div>
        
        <div style={{ padding: '0 2rem 2rem 2rem', position: 'relative', display: 'flex', gap: '2rem' }}>
          <div style={{ 
            marginTop: '-64px',
            borderRadius: '8px',
            border: '4px solid var(--bg-card)',
            backgroundColor: 'var(--bg-hover)',
            width: '128px',
            height: '128px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            {avatar ? (
              <img src={avatar} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={64} style={{ color: 'var(--text-muted)' }} />
            )}
          </div>
          
          <div style={{ paddingTop: '1rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {displayName}
                  <span title="Steam Identity Verified" style={{ display: 'flex' }}>
                    <ShieldCheck size={24} style={{ color: 'var(--status-success)' }} />
                  </span>
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  {steamId && <span>SteamID64: <span style={{ fontFamily: 'monospace' }}>{steamId}</span></span>}
                  {steamProfileUrl && (
                    <a href={steamProfileUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-rust)', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                      View on Steam <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        
        {/* Playtime (Gated) */}
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} /> Playtime Stats</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.5 }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Rust Playtime</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>--- hrs</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Past 2 Weeks</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'monospace' }}>--- hrs</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Last Played</div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Unknown</div>
            </div>
          </div>
          
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(20,20,22,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
             <Lock size={24} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
             <div style={{ fontSize: '0.875rem', color: '#fff', fontWeight: 'bold' }}>Requires Steam Data Sync</div>
             <div style={{ fontSize: '0.75rem', color: 'var(--accent-rust)' }}>Coming in Phase 1.5-B</div>
          </div>
        </div>

        {/* Achievements (Gated) */}
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Award size={18} /> Achievements</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.5 }}>
             <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Completion</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>--%</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Unlocked</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'monospace' }}>-- / --</div>
            </div>
          </div>
          
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(20,20,22,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
             <Lock size={24} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
             <div style={{ fontSize: '0.875rem', color: '#fff', fontWeight: 'bold' }}>Requires Steam Data Sync</div>
             <div style={{ fontSize: '0.75rem', color: 'var(--accent-rust)' }}>Coming in Phase 1.5-B</div>
          </div>
        </div>

        {/* Inventory (Gated) */}
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Package size={18} /> Rust Inventory</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.5 }}>
             <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Skins Owned</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>---</div>
            </div>
             <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Est. Value</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'monospace' }}>$ --.--</div>
            </div>
          </div>
          
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(20,20,22,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
             <Lock size={24} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
             <div style={{ fontSize: '0.875rem', color: '#fff', fontWeight: 'bold' }}>Requires Steam Data Sync</div>
             <div style={{ fontSize: '0.75rem', color: 'var(--accent-rust)' }}>Coming in Phase 1.5-B</div>
          </div>
        </div>

      </div>
    </div>
  );
}
