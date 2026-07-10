import { useState, useEffect } from 'react';
import './BetaAccessGate.css';
import { useBetaAccess } from './useBetaAccess';
import { ShieldAlert, LogIn, Key, Loader2 } from 'lucide-react';

interface BetaAccessGateProps {
  children: React.ReactNode;
}

export function BetaAccessGate({ children }: BetaAccessGateProps) {
  const { loading, session, hasBetaAccess, activateBetaKey } = useBetaAccess();
  const [keyInput, setKeyInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [devBypass, setDevBypass] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isBypassed = localStorage.getItem('dev_bypass') === 'true';
      if (isBypassed) {
        setDevBypass(true);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="beta-gate-container">
        <div className="beta-gate-card loading">
          <Loader2 className="spinner" size={32} />
          <p>INITIALIZING COMMAND CENTER...</p>
        </div>
      </div>
    );
  }

  // If they have access or dev bypass is active, render the AppShell (children)
  if ((session && hasBetaAccess) || devBypass) {
    return <>{children}</>;
  }

  const handleActivate = async () => {
    setErrorMsg('');
    const code = keyInput.trim();
    if (!code) {
      setErrorMsg('PLEASE ENTER A KEY');
      return;
    }
    
    // DEV BYPASS LOGIC
    if (code === '1337') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('dev_bypass', 'true');
        setDevBypass(true);
      }
      return;
    }
    
    setIsActivating(true);
    const result = await activateBetaKey(keyInput.trim());
    setIsActivating(false);
    
    if (result?.error) {
      setErrorMsg(result.error);
    }
  };

  return (
    <div className="beta-gate-container">
      <div className="beta-gate-card">
        <div className="beta-gate-header">
          <ShieldAlert className="beta-gate-icon" size={48} />
          <h2>RESTRICTED AREA</h2>
          <div className="tactical-line"></div>
        </div>
        
        <div className="beta-gate-content">
          {!session ? (
            <div className="beta-gate-unauth">
              <div className="beta-gate-warning">
                <strong>Authentication required</strong>
                <p>Sign in with Steam or enter a bypass code to continue.</p>
              </div>
              <a href="/auth" className="btn btn-primary tactical-btn w-full justify-center">
                <LogIn size={18} /> Sign In with Steam
              </a>
              
              <div style={{marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--tactical-border)'}}>
                <div className="key-input-group">
                  <Key className="key-icon" size={20} />
                  <input 
                    type="password" 
                    value={keyInput} 
                    onChange={(e) => setKeyInput(e.target.value)} 
                    placeholder="Bypass Code"
                    className="beta-key-input"
                  />
                </div>
                {errorMsg && <div className="beta-error">{errorMsg}</div>}
                <button 
                  onClick={handleActivate} 
                  className="btn tactical-btn w-full justify-center"
                  style={{marginTop: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--tactical-border)', color: 'var(--tactical-text)'}}
                >
                  ENTER BYPASS
                </button>
              </div>
            </div>
          ) : (
            <div className="beta-gate-auth">
              <p>Identity verified: <strong>{session.user.email}</strong></p>
              <div className="beta-gate-warning">
                <strong>Beta access required</strong>
                <p>Your account does not have beta access yet.</p>
              </div>
              
              <div className="key-input-group">
                <Key className="key-icon" size={20} />
                <input 
                  type="password" 
                  value={keyInput} 
                  onChange={(e) => setKeyInput(e.target.value)} 
                  placeholder="Bypass Code"
                  className="beta-key-input"
                  maxLength={10}
                />
              </div>
              
              {errorMsg && <div className="beta-error">{errorMsg}</div>}
              
              <button 
                onClick={handleActivate} 
                className="btn tactical-btn w-full justify-center"
                style={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--tactical-border)', color: 'var(--tactical-text)'}}
                disabled={isActivating}
              >
                {isActivating ? <Loader2 className="spinner" size={18} /> : 'ENTER BYPASS'}
              </button>
            </div>
          )}
        </div>
        
        <div className="beta-gate-footer">
          <a href="/" className="back-link">← RETURN TO BASE</a>
        </div>
      </div>
    </div>
  );
}
