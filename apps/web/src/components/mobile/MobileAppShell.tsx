import { useState } from 'react';
import { MobileTopBar } from './MobileTopBar';
import { MobileBottomNav, type MobileTab } from './MobileBottomNav';
import { MobileMoreSheet } from './MobileMoreSheet';
import type { ViewState } from '../AppShell';

interface MobileAppShellProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  children: React.ReactNode;
}

// Views that map onto a primary bottom tab.
const TAB_FOR_VIEW: Partial<Record<ViewState, MobileTab>> = {
  dashboard: 'home',
  servers: 'servers',
  current_connection: 'live',
  learn: 'learn',
  base_blueprints: 'learn',
};

// Views that are reached via the "More" sheet -> highlight the More tab.
const MORE_VIEWS: ViewState[] = [
  'my_rust', 'watchlist', 'settings', 'server_pulse',
  'live_map', 'raid_calculator',
  'session_battle_log', 'filter_profiles', 'map_intel',
];

/**
 * Mobile application shell (< 1024px). Replaces the desktop sidebar with a
 * compact top bar + fixed bottom navigation + a "More" bottom sheet.
 * Shares the exact same view content (children) and `ViewState` router as desktop.
 */
export function MobileAppShell({ currentView, onViewChange, children }: MobileAppShellProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  const activeTab: MobileTab =
    TAB_FOR_VIEW[currentView] ?? (MORE_VIEWS.includes(currentView) ? 'more' : 'home');

  const handleTabSelect = (tab: MobileTab) => {
    if (tab === 'more') {
      setMoreOpen(true);
      return;
    }
    setMoreOpen(false);
    switch (tab) {
      case 'home': onViewChange('dashboard'); break;
      case 'servers': onViewChange('servers'); break;
      case 'live': onViewChange('current_connection'); break;
      case 'learn': onViewChange('learn'); break;
    }
  };

  return (
    <div className="mobile-shell">
      <MobileTopBar onViewChange={onViewChange} />

      <main className="mobile-content">
        {children}
      </main>

      <MobileBottomNav activeTab={activeTab} onTabSelect={handleTabSelect} />

      <MobileMoreSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        onViewChange={onViewChange}
      />
    </div>
  );
}
