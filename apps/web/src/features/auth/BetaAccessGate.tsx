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
          <div className="beta-gate-warning" style={{marginBottom: '1rem', border: '1px dashed #ff9900', background: 'rgba(255, 153, 0, 0.1)', color: '#ff9900'}}>
            <strong>DEV TEST BYPASS AVAILABLE</strong>
            <p style={{fontSize: '0.8rem', marginTop: '4px'}}>Enter code 1337 below to bypass authentication for local testing.</p>
          </div>

          {!session ? (
            <div className="beta-gate-unauth">
              <p>You must be identified before accessing the Command Center.</p>
              <div className="beta-gate-warning">
                <strong>AUTHENTICATION REQUIRED</strong>
                <p>Create an account or sign in before activating your beta key.</p>
              </div>
              <a href="/auth" className="btn btn-primary tactical-btn w-full justify-center">
                <LogIn size={18} /> Sign In to Proceed
              </a>
              
              <div style={{marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--tactical-border)'}}>
                <p style={{fontSize: '0.85rem', color: 'var(--tactical-text-dim)', marginBottom: '0.5rem'}}>DEV ONLY: Test Bypass</p>
                <div className="key-input-group">
                  <Key className="key-icon" size={20} />
                  <input 
                    type="text" 
                    value={keyInput} 
                    onChange={(e) => setKeyInput(e.target.value)} 
                    placeholder="Enter bypass code"
                    className="beta-key-input"
                  />
                </div>
                {errorMsg && <div className="beta-error">{errorMsg}</div>}
                <button 
                  onClick={handleActivate} 
                  className="btn tactical-btn w-full justify-center"
                  style={{marginTop: '0.5rem', background: 'rgba(255, 153, 0, 0.2)', border: '1px solid #ff9900', color: '#ff9900'}}
                >
                  ACTIVATE DEV BYPASS
                </button>
              </div>
            </div>
          ) : (
            <div className="beta-gate-auth">
              <p>Identity verified: <strong>{session.user.email}</strong></p>
              <div className="beta-gate-warning">
                <strong>BETA KEY REQUIRED</strong>
                <p>Enter your 4-digit access code to unlock the Command Center.</p>
              </div>
              
              <div className="key-input-group">
                <Key className="key-icon" size={20} />
                <input 
                  type="text" 
                  value={keyInput} 
                  onChange={(e) => setKeyInput(e.target.value)} 
                  placeholder="XXXX"
                  className="beta-key-input"
                  maxLength={10}
                />
              </div>
              
              {errorMsg && <div className="beta-error">{errorMsg}</div>}
              
              <button 
                onClick={handleActivate} 
                className="btn btn-primary tactical-btn w-full justify-center"
                disabled={isActivating}
              >
                {isActivating ? <Loader2 className="spinner" size={18} /> : 'ACTIVATE BETA'}
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
