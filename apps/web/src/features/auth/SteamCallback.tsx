import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

export function SteamCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function handleCallback() {
      if (!supabase) {
        if (mounted) {
          setStatus('error');
          setErrorMsg('Supabase client not configured.');
        }
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const tokenHash = params.get('token_hash');

      if (!tokenHash) {
        if (mounted) {
          setStatus('error');
          setErrorMsg('Missing token_hash in URL.');
        }
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'email'
        });

        if (error) {
          throw error;
        }

        if (mounted) {
          setStatus('success');
          // Short delay to show success before redirect
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }
      } catch (err: any) {
        console.error('Steam Auth Error:', err);
        if (mounted) {
          setStatus('error');
          setErrorMsg(err.message || 'Failed to authenticate Steam session');
        }
      }
    }

    handleCallback();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100vh', backgroundColor: 'var(--bg-default)', color: 'var(--text-primary)', gap: '1rem'
    }}>
      {status === 'loading' && (
        <>
          <Loader2 size={48} className="spin" style={{ color: 'var(--accent-rust)' }} />
          <h2>Authenticating Steam Session...</h2>
          <p style={{ color: 'var(--text-muted)' }}>Validating your identity with the server.</p>
        </>
      )}
      
      {status === 'success' && (
        <>
          <CheckCircle size={48} style={{ color: 'var(--status-online)' }} />
          <h2>Authentication Successful!</h2>
          <p style={{ color: 'var(--text-muted)' }}>Redirecting to dashboard...</p>
        </>
      )}

      {status === 'error' && (
        <>
          <AlertTriangle size={48} style={{ color: 'var(--status-error)' }} />
          <h2>Authentication Failed</h2>
          <p style={{ color: 'var(--status-error)' }}>{errorMsg}</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary" style={{ marginTop: '1rem' }}>
            Return to Dashboard
          </button>
        </>
      )}
    </div>
  );
}
