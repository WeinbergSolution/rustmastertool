import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export function useBetaAccess() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [hasBetaAccess, setHasBetaAccess] = useState(false);

  useEffect(() => {
    // Check current session
    supabase?.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.user_metadata?.rustMasterBetaAccess) {
        setHasBetaAccess(true);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase?.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.user_metadata?.rustMasterBetaAccess) {
        setHasBetaAccess(true);
      } else {
        setHasBetaAccess(false);
      }
      setLoading(false);
    }) || { data: { subscription: null } };

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const activateBetaKey = async (key: string) => {
    if (!session) return { error: 'Not logged in' };
    
    // Valid beta key for this development phase
    if (key === '1337') {
      try {
        // IMPORTANT: 1337 is DEV ONLY. 
        // Client-side validation is not production security.
        // True production solution requires:
        // - Edge Function for validation
        // - Dedicated beta_keys table
        // - Row Level Security (RLS)
        // - Server-side account binding
        
        if (!supabase) throw new Error('Supabase client not initialized');
        
        const { error } = await supabase.auth.updateUser({
          data: {
            rustMasterBetaAccess: true,
            rustMasterBetaKey: "1337",
            rustMasterBetaGrantedAt: new Date().toISOString()
          }
        });
        
        if (error) throw error;
        
        setHasBetaAccess(true);
        return { success: true };
      } catch (err: any) {
        return { error: err.message || 'Error updating user metadata' };
      }
    } else {
      return { error: 'Invalid Beta Key' };
    }
  };

  return {
    loading,
    session,
    hasBetaAccess,
    activateBetaKey
  };
}
