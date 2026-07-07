import { useAuth } from '../../lib/auth/useAuth';
import { Server, Crosshair, History, ChevronRight, Compass } from 'lucide-react';
import type { ViewState } from '../AppShell';

interface MobileHomeProps {
  onViewChange: (view: ViewState) => void;
}

/**
 * Mobile Home foundation (Command Center).
 * Presentation + navigation only — reads auth status but changes no server/auth/watchlist logic.
 * The single sign-in affordance lives in the top bar; Home shows no duplicate sign-in button.
 */
export function MobileHome({ onViewChange }: MobileHomeProps) {
  const { status } = useAuth();
  const isAuthed = status === 'authenticated';

  return (
    <div className="mobile-home">
      {/* Compact command-center hero */}
      <section className="mobile-hero">
        <div className="mobile-hero-kicker">Rust Command Center</div>
        <h1 className="mobile-hero-title">Find your server.<br />Own your wipe.</h1>
        {!isAuthed && (
          <p className="mobile-hero-copy">
            Browsing works without Steam. Sign in to save watchlists, active servers and MyRust.
          </p>
        )}
        <button className="btn-primary mobile-hero-cta" onClick={() => onViewChange('servers')}>
          <Compass size={18} />
          Explore Servers
        </button>
      </section>

      {/* Active server / choose server */}
      <section className="mobile-active-card" onClick={() => onViewChange('servers')}>
        <div className="mobile-active-label">Your Active Server</div>
        <div className="mobile-active-body">
          <div className="mobile-active-text">
            {isAuthed ? 'No active server set yet.' : 'Sign in to set an active server.'}
          </div>
          <div className="mobile-active-cta">
            Choose your server <ChevronRight size={16} />
          </div>
        </div>
      </section>

      {/* Phase rail (swipeable) */}
      <section className="mobile-rail-section">
        <div className="mobile-rail-title">Your session, end to end</div>
        <div className="mobile-home-rail" role="list">
          <button className="mobile-phase-card" role="listitem" onClick={() => onViewChange('servers')}>
            <div className="mobile-phase-icon"><Server size={22} /></div>
            <div className="mobile-phase-name">Pre-Game</div>
            <div className="mobile-phase-desc">Browse & analyze servers, maps and wipes.</div>
            <div className="mobile-phase-cta">Open Servers <ChevronRight size={14} /></div>
          </button>

          <button className="mobile-phase-card" role="listitem" onClick={() => onViewChange('current_connection')}>
            <div className="mobile-phase-icon"><Crosshair size={22} /></div>
            <div className="mobile-phase-name">In-Game Companion <span className="mobile-phase-badge">soon</span></div>
            <div className="mobile-phase-desc">Live server context and tools while you play.</div>
            <div className="mobile-phase-cta">Preview <ChevronRight size={14} /></div>
          </button>

          <button className="mobile-phase-card" role="listitem" onClick={() => onViewChange('session_battle_log')}>
            <div className="mobile-phase-icon"><History size={22} /></div>
            <div className="mobile-phase-name">After-Game <span className="mobile-phase-badge">soon</span></div>
            <div className="mobile-phase-desc">Session battle log and learnings for next time.</div>
            <div className="mobile-phase-cta">Preview <ChevronRight size={14} /></div>
          </button>
        </div>
      </section>
    </div>
  );
}
