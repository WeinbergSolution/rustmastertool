import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/auth/useAuth';

export function AuthUI() {
  const { status, user } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Check your email for the login link!' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  if (status === 'auth_pending') {
    return <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Checking session…</div>;
  }

  if (status === 'authenticated') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {user?.email}
        </div>
        <button className="btn-secondary" onClick={handleLogout}>Sign out</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Local — not signed in</div>
      <form onSubmit={handleLogin} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.375rem 0.5rem', borderRadius: '4px', border: '1px solid #333', background: '#111', color: '#fff' }}
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Sending...' : 'Send magic link'}
        </button>
      </form>
      {message && (
        <div style={{ fontSize: '0.75rem', color: message.type === 'error' ? '#ef4444' : '#10b981' }}>
          {message.text}
        </div>
      )}
    </div>
  );
}
