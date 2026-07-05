import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

export type AuthStatus = 'unauthenticated' | 'auth_pending' | 'authenticated';

export interface AuthUser {
  id: string;
  email?: string;
  [key: string]: any;
}

export interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    status: 'auth_pending',
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // If Supabase is not configured, we're unauthenticated (local mode)
    if (!isSupabaseConfigured() || !supabase) {
      setState({
        status: 'unauthenticated',
        user: null,
        isAuthenticated: false,
      });
      return;
    }

    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase!.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error.message);
          if (mounted) {
            setState({
              status: 'unauthenticated',
              user: null,
              isAuthenticated: false,
            });
          }
          return;
        }

        if (session?.user) {
          if (mounted) {
            setState({
              status: 'authenticated',
              user: session.user,
              isAuthenticated: true,
            });
          }
          await ensureProfile(session.user.id);
        } else {
          if (mounted) {
            setState({
              status: 'unauthenticated',
              user: null,
              isAuthenticated: false,
            });
          }
        }
      } catch (e) {
        console.error('Unexpected error checking session:', e);
        if (mounted) {
          setState({
            status: 'unauthenticated',
            user: null,
            isAuthenticated: false,
          });
        }
      }
    };

    checkSession();

    const { data: authListener } = supabase!.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.user) {
        setState({
          status: 'authenticated',
          user: session.user,
          isAuthenticated: true,
        });
        
        if (event === 'SIGNED_IN') {
           await ensureProfile(session.user.id);
        }
      } else {
        setState({
          status: 'unauthenticated',
          user: null,
          isAuthenticated: false,
        });
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return state;
}

// Defensive fallback: ensure public.profiles row exists after login
// This complements the auth.users trigger
async function ensureProfile(userId: string) {
  if (!supabase) return;
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: userId }, { onConflict: 'id' });
    
    if (error) {
      console.warn('Could not ensure profile for user:', error.message);
    }
  } catch (e) {
    console.warn('Error executing ensureProfile:', e);
  }
}
