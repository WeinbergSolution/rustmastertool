import { useState, useEffect, useRef } from 'react';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { Dashboard } from '../features/dashboard/Dashboard';
import { ServersExplorer } from '../features/dashboard/ServersExplorer';
import { RoadmapView } from './RoadmapView';
import { BaseBlueprintsView } from '../features/dashboard/BaseBlueprintsView';
import { MyRust } from '../features/account/MyRust';
import { Watchlist } from '../features/dashboard/Watchlist';
import { ServerPulseView } from '../features/dashboard/ServerPulseView';
import { LearnHub } from '../features/learn/LearnHub';
import { RustGuidesView } from '../features/learn/rust-guides/RustGuidesView';
import { useIsMobile } from './mobile/useIsMobile';
import { consumeLayerPop } from './mobile/useInAppBack';
import { MobileAppShell } from './mobile/MobileAppShell';
import { MobileHome } from './mobile/MobileHome';
import { MobileLive } from './mobile/MobileLive';

export type ViewState =
  | 'dashboard'
  | 'servers'
  | 'watchlist'
  | 'server_pulse'
  | 'base_blueprints'
  | 'rust_guides'
  | 'learn'
  | 'map_intel'
  | 'filter_profiles'
  | 'current_connection'
  | 'live_map'
  | 'raid_calculator'
  | 'session_battle_log'
  | 'my_rust'
  | 'settings';

export function AppShell() {
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    const savedView = window.sessionStorage.getItem('serverExplorer.view');
    return (savedView as ViewState) || 'dashboard';
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    window.sessionStorage.setItem('serverExplorer.view', currentView);
  }, [currentView]);

  // --- Thin mobile view history so the browser Back button walks tab history
  // instead of leaving the app. Desktop and sessionStorage are unaffected. ---
  const currentViewRef = useRef(currentView);
  currentViewRef.current = currentView;
  const viewPopRef = useRef(false);   // true while a view change originates from popstate
  const viewInitRef = useRef(false);

  // Seed the current view as the base history entry (once, on mobile).
  useEffect(() => {
    if (!isMobile || viewInitRef.current) return;
    window.history.replaceState({ __rmt: true, kind: 'view', view: currentViewRef.current }, '');
    viewInitRef.current = true;
  }, [isMobile]);

  // Push a history entry on each mobile view change (unless it came from Back).
  useEffect(() => {
    if (!isMobile || !viewInitRef.current) return;
    if (viewPopRef.current) { viewPopRef.current = false; return; }
    window.history.pushState({ __rmt: true, kind: 'view', view: currentView }, '');
  }, [currentView, isMobile]);

  // Restore the view on Back when a 'view' history entry surfaces.
  useEffect(() => {
    if (!isMobile) return;
    const onPop = (e: PopStateEvent) => {
      // If a layer (modal / sheet / detail) already handled this Back, do not
      // also treat it as a view navigation — otherwise closing an overlay would
      // wrongly jump back to a previous view.
      if (consumeLayerPop()) return;
      const st = e.state as { __rmt?: boolean; kind?: string; view?: ViewState } | null;
      if (st?.__rmt && st.kind === 'view' && st.view && st.view !== currentViewRef.current) {
        viewPopRef.current = true;
        setCurrentView(st.view);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [isMobile]);

  // Shared view content used by BOTH the desktop and mobile shells.
  // Always-mounted views use display toggling to preserve internal state
  // (e.g. server search) across navigation.
  const content = (
    <>
      <div style={{ display: currentView === 'dashboard' ? 'block' : 'none', height: '100%' }}>
        {isMobile
          ? <MobileHome onViewChange={setCurrentView} />
          : <Dashboard onViewChange={setCurrentView} />}
      </div>
      <div style={{ display: currentView === 'servers' ? 'block' : 'none', height: '100%' }}>
        <ServersExplorer />
      </div>
      <div style={{ display: currentView === 'watchlist' ? 'block' : 'none', height: '100%' }}>
        <Watchlist />
      </div>
      <div style={{ display: currentView === 'server_pulse' ? 'block' : 'none', height: '100%' }}>
        <ServerPulseView />
      </div>
      <div style={{ display: currentView === 'base_blueprints' ? 'block' : 'none', height: '100%' }}>
        <BaseBlueprintsView />
      </div>
      <div style={{ display: currentView === 'rust_guides' ? 'block' : 'none', height: '100%' }}>
        <RustGuidesView onViewChange={setCurrentView} />
      </div>
      {currentView === 'learn' && <LearnHub onViewChange={setCurrentView} />}
      {currentView === 'map_intel' && (
        <RoadmapView
          title="Map Intelligence"
          message="Map Intelligence will unlock map preview, monuments, heatmap overlays and build-location recommendations for selected servers."
        />
      )}
      {currentView === 'filter_profiles' && (
        <RoadmapView
          title="Filter Profiles"
          message="Save your preferred server filters to your account. Coming later."
        />
      )}
      {currentView === 'current_connection' && (
        isMobile
          ? <MobileLive onViewChange={setCurrentView} />
          : <RoadmapView
              title="Current Connection"
              message="Shows your active server connection context. Live data stream requires Rust+ integration. Coming later."
            />
      )}
      {currentView === 'live_map' && (
        <RoadmapView
          title="Live Map"
          message="Requires Rust+ / Companion integration. Coming later."
        />
      )}
      {currentView === 'raid_calculator' && (
        <RoadmapView
          title="Raid Calculator"
          message="Live raid cost tool — compare raid paths, sulfur cost and required explosives. Coming later."
        />
      )}
      {currentView === 'session_battle_log' && (
        <RoadmapView
          title="Session Battle Log"
          message="Track sessions, server history, play duration, map context and post-session learnings. Coming later."
        />
      )}
      {currentView === 'my_rust' && <MyRust />}
      {currentView === 'settings' && (
        <RoadmapView
          title="Settings"
          message="Tool configuration, theme options, and notification preferences will be available here."
        />
      )}
    </>
  );

  if (isMobile) {
    return (
      <MobileAppShell currentView={currentView} onViewChange={setCurrentView}>
        {content}
      </MobileAppShell>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="main-content">
        <Topbar />
        <div className="content-area">
          {content}
        </div>
      </main>
    </div>
  );
}
