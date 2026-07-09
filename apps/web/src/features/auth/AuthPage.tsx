import './AuthPage.css';
import { PublicHeader } from '../../components/public/PublicHeader';
import { authProviders, type AuthProviderConfig } from './providerConfig';
import { Mail, Phone, AlertCircle } from 'lucide-react';
// We'll use a generic icon or custom SVG for Steam/Amazon/Google since lucide doesn't have all brand icons, 
// or map some available ones.

export function AuthPage() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  
  const handleProviderClick = (provider: AuthProviderConfig) => {
    if (provider.status === 'active' && provider.id === 'steam') {
      const origin = encodeURIComponent(window.location.origin);
      window.location.href = `${supabaseUrl}/functions/v1/steam-auth?action=login&origin=${origin}`;
    }
  };

  const renderIcon = (id: string) => {
    switch (id) {
      case 'email': return <Mail size={20} />;
      case 'phone': return <Phone size={20} />;
      // For brands without lucide icons, use a placeholder or generic icon for now
      default: return null; 
    }
  };

  return (
    <div className="auth-page">
      <PublicHeader />
      
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-header">
            <h1>Welcome to RustMasterTool</h1>
            <p>Sign in to your Command Center</p>
          </div>

          <div className="auth-providers-list">
            {authProviders.map((provider) => (
              <button
                key={provider.id}
                className={`provider-btn ${provider.status !== 'active' ? 'disabled' : ''} provider-${provider.id}`}
                onClick={() => handleProviderClick(provider)}
                disabled={provider.status !== 'active'}
              >
                <div className="provider-icon-name">
                  {renderIcon(provider.id)}
                  <span>Continue with {provider.name}</span>
                </div>
                
                {provider.status === 'planned' && (
                  <span className="provider-badge planned">Planned</span>
                )}
                {provider.status === 'requires_config' && (
                  <span className="provider-badge requires-config" title="Requires Configuration">
                    <AlertCircle size={14} /> Coming soon
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="auth-footer">
            <p>
              By signing in, you agree to our Terms of Service and Privacy Policy. 
              RustMasterTool is not affiliated with Facepunch Studios.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
