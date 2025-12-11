import React, { createContext, useContext, useMemo } from 'react';
import { createTheme, type Theme, type ThemeObject } from '@synchronicity/tokens';

interface ThemeContextValue {
  theme: Theme;
  themeObject: ThemeObject;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}

export function ThemeProvider({ theme: initialTheme = 'light', children }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(initialTheme);

  const themeObject = useMemo(() => createTheme(theme), [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      // Cycle: light -> dark -> trueBlack -> light
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'trueBlack';
      return 'light';
    });
  }, []);

  const value = useMemo(
    () => ({
      theme,
      themeObject,
      toggleTheme,
      setTheme,
    }),
    [theme, themeObject, toggleTheme]
  );

  return React.createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to get just the theme object (colors, spacing, etc.)
 */
export function useThemeObject(): ThemeObject {
  const { themeObject } = useTheme();
  return themeObject;
}

/**
 * Hook to get colors for the current theme
 */
export function useColors() {
  const { themeObject } = useTheme();
  return themeObject.colors;
}
