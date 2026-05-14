import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export const themes = {
  dark: {
    bg: '#0a0f1a',
    cardBg: '#0d1f33',
    sidebarBg: '#0d1520',
    border: 'rgba(59, 130, 246, 0.3)',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    textMuted: '#6b7280',
  },
  light: {
    bg: '#f8fafc',
    cardBg: '#ffffff',
    sidebarBg: '#ffffff',
    border: 'rgba(226, 232, 240, 1)',
    text: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
  },
};
