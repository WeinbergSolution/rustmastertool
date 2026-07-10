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
  },
  {
    id: 'google',
    name: 'Google',
    status: 'planned',
  },
  {
    id: 'email',
    name: 'Email & Password',
    status: 'requires_config',
  },
  {
    id: 'phone',
    name: 'Phone (SMS)',
    status: 'planned',
  },
  {
    id: 'github',
    name: 'GitHub',
    status: 'planned',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    status: 'planned',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    status: 'planned',
  }
];
