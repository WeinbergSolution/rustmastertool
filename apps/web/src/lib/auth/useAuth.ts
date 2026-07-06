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
  profile: any | null;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    status: 'auth_pending',
    user: null,
    isAuthenticated: false,
    profile: null,
  });

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setState({
        status: 'unauthenticated',
        user: null,
        isAuthenticated: false,
        profile: null,
      });
      return;
    }

    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase!.auth.getSession();
        
        if (error) {
          if (mounted) setState({ status: 'unauthenticated', user: null, isAuthenticated: false, profile: null });
          return;
        }

        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          if (mounted) {
            setState({
              status: 'authenticated',
              user: session.user,
              isAuthenticated: true,
              profile,
            });
          }
        } else {
          if (mounted) setState({ status: 'unauthenticated', user: null, isAuthenticated: false, profile: null });
        }
      } catch (e) {
        if (mounted) setState({ status: 'unauthenticated', user: null, isAuthenticated: false, profile: null });
      }
    };

    checkSession();

    const { data: authListener } = supabase!.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;

      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setState({
          status: 'authenticated',
          user: session.user,
          isAuthenticated: true,
          profile,
        });
      } else {
        setState({
          status: 'unauthenticated',
          user: null,
          isAuthenticated: false,
          profile: null,
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

// Fetch profile data without upserting (read-only from client)
async function fetchProfile(userId: string) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.warn('Could not fetch profile:', error.message);
      return null;
    }
    return data;
  } catch (e) {
    console.warn('Error fetching profile:', e);
    return null;
  }
}
