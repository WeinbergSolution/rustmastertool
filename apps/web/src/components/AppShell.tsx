import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { Dashboard } from '../features/dashboard/Dashboard';

export function AppShell() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar />
        <div className="content-area">
           <Dashboard />
        </div>
      </main>
    </div>
  );
}

