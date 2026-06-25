import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/index.js';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      setLoading: (isLoading) => set({ isLoading })
    }),
    {
      name: 'auth-storage'
    }
  )
);