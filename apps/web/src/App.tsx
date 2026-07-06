import { AppShell } from './components/AppShell';
import { SteamCallback } from './features/auth/SteamCallback';

function App() {
  const path = window.location.pathname;

  if (path === '/auth/steam/callback') {
    return <SteamCallback />;
  }

  return (
    <AppShell />
  );
}

export default App;

