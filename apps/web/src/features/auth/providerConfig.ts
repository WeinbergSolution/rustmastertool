export type AuthProviderStatus = 'active' | 'planned' | 'requires_config';

export interface AuthProviderConfig {
  id: string;
  name: string;
  status: AuthProviderStatus;
  icon?: string; // We can map this to Lucide icons in the component
}

export const authProviders: AuthProviderConfig[] = [
  {
    id: 'steam',
    name: 'Steam',
    status: 'active',
  }
];
