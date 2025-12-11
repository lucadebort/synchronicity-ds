/**
 * Synchronicity Design System - Tokens
 *
 * 3-Tier Token Architecture:
 * - TIER 1 (Primitives): Raw values, theme-agnostic
 * - TIER 2 (Semantic): Contextual meaning, theme-aware
 * - TIER 3 (Component): Component-specific tokens
 */

// Re-export all tiers
export * from './primitives';
export * from './semantic';
export * from './components';

// Import for combined export
import { primitives } from './primitives';
import { semantic } from './semantic';
import { componentTokens } from './components';

/**
 * Complete token system
 */
export const tokens = {
  primitives,
  semantic,
  components: componentTokens,
} as const;

/**
 * Theme type for consumers
 */
export type Theme = 'light' | 'dark' | 'trueBlack';

/**
 * Get semantic colors for a theme
 */
export const getThemeColors = (theme: Theme) => {
  switch (theme) {
    case 'light':
      return semantic.colors.light;
    case 'trueBlack':
      return semantic.colors.trueBlack;
    case 'dark':
    default:
      return semantic.colors.dark;
  }
};

/**
 * Create a complete theme object
 */
export const createTheme = (theme: Theme) => ({
  colors: getThemeColors(theme),
  spacing: semantic.spacing,
  typography: semantic.typography,
  motion: semantic.motion,
  springMotion: semantic.springMotion,
  radius: semantic.radius,
  zIndex: semantic.zIndex,
  components: componentTokens,
});

export type ThemeObject = ReturnType<typeof createTheme>;
