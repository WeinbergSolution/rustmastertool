import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/auth/useAuth';
import { User } from 'lucide-react';

export function AuthUI() {
  const { status, user, profile } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const enableDevMagicLink = import.meta.env.VITE_ENABLE_DEV_MAGIC_LINK === 'true';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Check your email for the login link!' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  if (status === 'auth_pending') {
    return <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Checking session…</div>;
  }

  if (status === 'authenticated') {
    let displayName = 'Authenticated User';
    if (profile) {
      if (profile.steam_persona_name) {
        displayName = profile.steam_persona_name;
      } else if (profile.username) {
        displayName = profile.username;
      } else if (profile.steam_id) {
        displayName = `SteamID ${profile.steam_id}`;
      } else {
        displayName = 'Steam linked';
      }
    } else if (user?.email && !user.email.includes('@steam.rustmastertool.local')) {
      displayName = user.email;
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }} title={profile ? "Profile loaded" : "Profile provisioning pending"}>
          {displayName}
        </div>
        <button className="btn-secondary" onClick={handleLogout}>Sign out</button>
      </div>
    );
  }

  const handleSteamLogin = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) return;
    const origin = encodeURIComponent(window.location.origin);
    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/steam-auth?action=login&origin=${origin}`;
    window.location.href = edgeFunctionUrl;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }} title="RustMasterTool accounts will use Steam identity. Email sign-in is not part of the production auth flow.">
        Authenticating with Steam
      </div>
      <button className="btn-steam" onClick={handleSteamLogin} title="Sign in securely via Steam">
        <User size={16} />
        Sign in with Steam
      </button>

      {enableDevMagicLink && (
        <div style={{ borderLeft: '1px solid #333', paddingLeft: '1rem', marginLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 'bold' }} title="Developer test auth">DEV ONLY</div>
          <form onSubmit={handleLogin} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="email"
              placeholder="Dev Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '0.375rem 0.5rem', borderRadius: '4px', border: '1px solid #333', background: '#111', color: '#fff', fontSize: '0.875rem' }}
            />
            <button type="submit" className="btn-primary" disabled={loading} style={{ fontSize: '0.875rem', padding: '0.375rem 0.75rem' }}>
              {loading ? 'Sending...' : 'Magic Link'}
            </button>
          </form>
          {message && (
            <div style={{ fontSize: '0.75rem', color: message.type === 'error' ? '#ef4444' : '#10b981' }}>
              {message.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
