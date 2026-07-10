
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/auth/useAuth';
import { User } from 'lucide-react';

export function AuthUI() {
  const { status, user, profile } = useAuth();



  const handleLogout = async () => {
    if (!supabase) return;
    
    // Clear auth-specific context and pending actions on explicit sign out
    // We intentionally LEAVE neutral search context (query, results, view) intact.
    window.sessionStorage.removeItem('serverExplorer.pendingAction');

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

    </div>
  );
}
