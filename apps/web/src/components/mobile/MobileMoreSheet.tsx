import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../lib/auth/useAuth';
import { BottomSheet } from './BottomSheet';
import type { ViewState } from '../AppShell';
import {
  User, Eye, Settings, LineChart, MapPin, Calculator, BookOpen, Filter, Map as MapIcon,
  Lock, ChevronRight, LogOut,
} from 'lucide-react';

interface MobileMoreSheetProps {
  open: boolean;
  onClose: () => void;
  onViewChange: (view: ViewState) => void;
}

interface Row {
  icon: typeof User;
  label: string;
  view: ViewState;
  gated?: boolean;
  note?: string;
}

const ACCOUNT_ROWS: Row[] = [
  { icon: User, label: 'MyRust', view: 'my_rust' },
  { icon: Eye, label: 'Watchlist', view: 'watchlist' },
  { icon: Settings, label: 'Settings', view: 'settings' },
];

// Secondary tools that are live but not primary bottom-nav features.
const TOOL_ROWS: Row[] = [
  { icon: LineChart, label: 'Server Pulse', view: 'server_pulse', note: 'Population & analytics' },
];

// Roadmap rows navigate to honest "coming soon" roadmap views — never dead buttons.
const ROADMAP_ROWS: Row[] = [
  { icon: MapPin, label: 'Live Map', view: 'live_map', gated: true, note: 'Requires Rust+ pairing' },
  { icon: Calculator, label: 'Raid Calculator', view: 'raid_calculator', gated: true, note: 'Coming soon' },
  { icon: BookOpen, label: 'Session Battle Log', view: 'session_battle_log', gated: true, note: 'Coming soon' },
  { icon: Filter, label: 'Saved Filters', view: 'filter_profiles', gated: true, note: 'Coming to server search' },
  { icon: MapIcon, label: 'Map Intel', view: 'map_intel', gated: true, note: 'Coming to server detail' },
];

export function MobileMoreSheet({ open, onClose, onViewChange }: MobileMoreSheetProps) {
  const { status } = useAuth();

  const go = (view: ViewState) => {
    onViewChange(view);
    onClose();
  };

  const handleLogout = async () => {
    if (!supabase) return;
    // Same explicit sign-out behaviour as the desktop AuthUI (no auth logic change).
    window.sessionStorage.removeItem('serverExplorer.pendingAction');
    await supabase.auth.signOut();
    onClose();
  };

  const renderRow = ({ icon: Icon, label, view, gated, note }: Row) => (
    <button key={view} className="mobile-more-row" onClick={() => go(view)}>
      <Icon size={18} className="mobile-more-row-icon" />
      <span className="mobile-more-row-label">
        {label}
        {note && <span className="mobile-more-row-note">{note}</span>}
      </span>
      {gated ? <Lock size={14} className="mobile-more-row-lock" /> : <ChevronRight size={16} className="mobile-more-row-chevron" />}
    </button>
  );

  return (
    <BottomSheet open={open} onClose={onClose} title="More">
      <div className="mobile-more-section-title">Account</div>
      {ACCOUNT_ROWS.map(renderRow)}

      {status === 'authenticated' && (
        <button className="mobile-more-row" onClick={handleLogout}>
          <LogOut size={18} className="mobile-more-row-icon" />
          <span className="mobile-more-row-label">Sign out</span>
        </button>
      )}

      <div className="mobile-more-section-title" style={{ marginTop: '1.25rem' }}>Tools</div>
      {TOOL_ROWS.map(renderRow)}

      <div className="mobile-more-section-title" style={{ marginTop: '1.25rem' }}>Coming soon · Roadmap</div>
      {ROADMAP_ROWS.map(renderRow)}
    </BottomSheet>
  );
}
