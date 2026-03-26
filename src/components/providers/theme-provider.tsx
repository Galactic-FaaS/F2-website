'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Storage key for localStorage
const THEME_STORAGE_KEY = 'fortran2-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to dark mode as per Carbon Design System
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Check localStorage first
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    
    if (stored && (stored === 'dark' || stored === 'light')) {
      setTheme(stored);
    } else {
      // Check system preference, but default to dark if no preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      
      if (prefersLight) {
        setTheme('light');
      } else {
        // Default to dark mode (includes case where system prefers dark or no preference)
        setTheme('dark');
      }
    }
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Add transition class for smooth theme change
    root.classList.add('theme-transition');
    
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      // Update meta theme-color for mobile browsers
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#F4F4F4');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      // Update meta theme-color for mobile browsers
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#161616');
    }
    
    // Store preference
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    
    // Remove transition class after animation
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 150);
    
    return () => clearTimeout(timeout);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleSetTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  // But still render children to avoid layout shift
  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default values during SSR to avoid hydration errors
    return {
      theme: 'dark' as Theme,
      setTheme: () => {},
      toggleTheme: () => {},
      mounted: false,
    };
  }
  return context;
}
