import { AppShell } from './components/AppShell';
import { SteamCallback } from './features/auth/SteamCallback';
import { LandingPage } from './features/marketing/LandingPage';
import { PricingPage } from './features/pricing/PricingPage';
import { AuthPage } from './features/auth/AuthPage';
import { BetaAccessGate } from './features/auth/BetaAccessGate';

function App() {
  const path = window.location.pathname;

  if (path === '/auth/steam/callback') {
    return <SteamCallback />;
  }

  if (path === '/' || path === '/index.html') {
    return <LandingPage />;
  }

  if (path === '/pricing') {
    return <PricingPage />;
  }

  if (path === '/auth') {
    return <AuthPage />;
  }

  // Fallback to AppShell for /app and any unknown routes
  // to maintain backward compatibility for existing users, protected by Beta Gate
  return (
    <BetaAccessGate>
      <AppShell />
    </BetaAccessGate>
  );
}

export default App;

