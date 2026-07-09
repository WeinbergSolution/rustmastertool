import { useState } from 'react';
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

  // If they have access, render the AppShell (children)
  if (session && hasBetaAccess) {
    return <>{children}</>;
  }

  const handleActivate = async () => {
    setErrorMsg('');
    if (!keyInput.trim()) {
      setErrorMsg('PLEASE ENTER A KEY');
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
              <p>You must be identified before accessing the Command Center.</p>
              <div className="beta-gate-warning">
                <strong>AUTHENTICATION REQUIRED</strong>
                <p>Create an account or sign in before activating your beta key.</p>
              </div>
              <a href="/auth" className="btn btn-primary tactical-btn w-full justify-center">
                <LogIn size={18} /> Sign In to Proceed
              </a>
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
