import { useAuth } from '../../lib/auth/useAuth';
import { User } from 'lucide-react';
import type { ViewState } from '../AppShell';

interface MobileTopBarProps {
  onViewChange: (view: ViewState) => void;
}

/**
 * Compact mobile header.
 * - Left: brand.
 * - Right: single, short auth action (Sign in) or avatar (tap -> MyRust).
 * Reuses the exact same Steam auth endpoints/flow as the desktop AuthUI —
 * no auth logic is changed here, only the compact presentation.
 */
export function MobileTopBar({ onViewChange }: MobileTopBarProps) {
  const { status, profile } = useAuth();

  const startSteamLogin = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) return;
    const origin = encodeURIComponent(window.location.origin);
    window.location.href = `${supabaseUrl}/functions/v1/steam-auth?action=login&origin=${origin}`;
  };

  const displayName = (() => {
    if (!profile) return 'Steam';
    if (profile.steam_persona_name) return profile.steam_persona_name;
    if (profile.username) return profile.username;
    return 'Steam';
  })();

  const avatarUrl = (profile as { avatar_url?: string } | null)?.avatar_url;

  return (
    <header className="mobile-topbar">
      <div className="mobile-topbar-brand" onClick={() => onViewChange('dashboard')}>
        <span className="mobile-topbar-logo">RM</span>
        <span className="mobile-topbar-name">RustMasterTool</span>
      </div>

      <div className="mobile-topbar-actions">
        {status === 'auth_pending' && (
          <span className="mobile-topbar-pending">…</span>
        )}

        {status === 'authenticated' && (
          <button
            className="mobile-avatar-btn"
            onClick={() => onViewChange('my_rust')}
            title={displayName}
            aria-label="Open MyRust profile"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="mobile-avatar-img" />
            ) : (
              <User size={18} />
            )}
          </button>
        )}

        {status === 'unauthenticated' && (
          <button className="btn-steam mobile-signin-btn" onClick={startSteamLogin} title="Sign in securely via Steam">
            <User size={16} />
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
