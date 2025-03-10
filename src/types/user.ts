export interface User {
  'profile-image': string | null;
  avatar: string | null;
  nick: string | null;
  username: string | null;
}

// Estado inicial
export interface UserState {
  data: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
