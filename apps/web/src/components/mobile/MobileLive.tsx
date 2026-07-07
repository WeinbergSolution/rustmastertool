import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../lib/auth/useAuth';
import { Crosshair, Compass, ChevronRight } from 'lucide-react';
import type { ViewState } from '../AppShell';

interface MobileLiveProps {
  onViewChange: (view: ViewState) => void;
}

/**
 * Live / Track tab foundation.
 * Honest empty state until an active server is set; a compact "tracking prepared"
 * state once one exists. Read-only: reuses the same active_server_id read pattern
 * as the existing views. No fake live feed, no new backend logic.
 */
export function MobileLive({ onViewChange }: MobileLiveProps) {
  const { status } = useAuth();
  const [hasActiveServer, setHasActiveServer] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    if (status !== 'authenticated' || !supabase) {
      setHasActiveServer(false);
      return;
    }
    (async () => {
      try {
        const { data: { user } } = await supabase!.auth.getUser();
        if (!user) { if (mounted) setHasActiveServer(false); return; }
        const { data: p } = await supabase!
          .from('profiles')
          .select('active_server_id')
          .eq('id', user.id)
          .single();
        if (mounted) setHasActiveServer(Boolean(p?.active_server_id));
      } catch {
        if (mounted) setHasActiveServer(false);
      }
    })();
    return () => { mounted = false; };
  }, [status]);

  return (
    <div className="mobile-live">
      <div className="mobile-live-header">
        <div className="mobile-live-icon"><Crosshair size={22} /></div>
        <div>
          <h2 className="mobile-live-title">Live Track</h2>
          <p className="mobile-live-sub">Follow your active Rust server in real time.</p>
        </div>
      </div>

      {hasActiveServer ? (
        <div className="mobile-live-card">
          <div className="mobile-live-badge">Active server set</div>
          <p className="mobile-live-text">
            Live tracking is prepared for your active server. The full live companion
            (population, map context and events) arrives in an upcoming phase.
          </p>
          <button className="mobile-live-link" onClick={() => onViewChange('servers')}>
            Manage servers <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        <div className="mobile-live-empty">
          <p className="mobile-live-empty-text">
            {status === 'authenticated'
              ? 'Choose an active server to start live tracking.'
              : 'Sign in and choose an active server to start live tracking.'}
          </p>
          <button className="btn-primary mobile-hero-cta" onClick={() => onViewChange('servers')}>
            <Compass size={18} />
            Explore Servers
          </button>
        </div>
      )}
    </div>
  );
}
