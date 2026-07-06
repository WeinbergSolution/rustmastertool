import { useState, useEffect } from 'react';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { Dashboard } from '../features/dashboard/Dashboard';
import { ServersExplorer } from '../features/dashboard/ServersExplorer';

export type ViewState = 'dashboard' | 'servers';

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
        </div>
      </main>
    </div>
  );
}

