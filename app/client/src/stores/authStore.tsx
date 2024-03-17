import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  setIsAuth: (isAuthenticated: boolean) => void;
  clearIsAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated') || 'false'),
  setIsAuth: (isAuthenticated) => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    set({ isAuthenticated });
  },
  clearIsAuth: () => {
    localStorage.removeItem('isAuthenticated');
    set({ isAuthenticated: false });
  },
}));
