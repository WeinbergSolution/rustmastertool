export type AuthStatus = 'unauthenticated' | 'auth_pending' | 'authenticated' | 'auth_required_for_cloud';

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
  // Phase 0.9 Passive Seam: Always return unauthenticated
  return {
    status: 'unauthenticated',
    user: null,
    isAuthenticated: false,
  };
}
