import { create } from 'zustand';

interface ThemeState {
    theme: 'light' | 'dark';
    setTheme: () => void;
}
const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  setTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useThemeStore;
