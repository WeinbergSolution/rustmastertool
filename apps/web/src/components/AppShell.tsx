import { useState, useEffect } from 'react';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { Dashboard } from '../features/dashboard/Dashboard';
import { ServersExplorer } from '../features/dashboard/ServersExplorer';

export type ViewState = 'dashboard' | 'servers';

export function AppShell() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  useEffect(() => {
    // If there is a restored search context, switch to servers view automatically
    const restoredQuery = window.sessionStorage.getItem('rm_search_query');
    const selectedServer = window.sessionStorage.getItem('rm_search_selected_server');
    if (restoredQuery || selectedServer) {
      setCurrentView('servers');
    }
  }, []);

  return (
    <div className="app-layout">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="main-content">
        <Topbar />
        <div className="content-area">
           {currentView === 'dashboard' ? <Dashboard onViewChange={setCurrentView} /> : <ServersExplorer />}
        </div>
      </main>
    </div>
  );
}

