import { useState, useEffect } from 'react';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { Dashboard } from '../features/dashboard/Dashboard';
import { ServersExplorer } from '../features/dashboard/ServersExplorer';
import { RoadmapView } from './RoadmapView';
import { MyRust } from '../features/account/MyRust';
import { Watchlist } from '../features/dashboard/Watchlist';

export type ViewState = 
  | 'dashboard' 
  | 'servers' 
  | 'watchlist' 
  | 'base_blueprints'
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

  useEffect(() => {
    window.sessionStorage.setItem('serverExplorer.view', currentView);
  }, [currentView]);

  return (
    <div className="app-layout">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="main-content">
        <Topbar />
        <div className="content-area">
           <div style={{ display: currentView === 'dashboard' ? 'block' : 'none', height: '100%' }}>
             <Dashboard onViewChange={setCurrentView} />
           </div>
           <div style={{ display: currentView === 'servers' ? 'block' : 'none', height: '100%' }}>
             <ServersExplorer />
           </div>
           <div style={{ display: currentView === 'watchlist' ? 'block' : 'none', height: '100%' }}>
             <Watchlist />
           </div>
           {currentView === 'base_blueprints' && (
             <RoadmapView 
               title="Base Blueprints" 
               message="Base Blueprints will collect Rust base builds, embedded guides, upkeep, build cost and raid-resistance analysis. Coming later."
             />
           )}
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
             <RoadmapView 
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
        </div>
      </main>
    </div>
  );
}

