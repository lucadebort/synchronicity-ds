/**
 * TIER 2: SEMANTIC TOKENS
 * Contextual meaning - these change based on theme/context.
 */

export * from './colors';
export * from './spacing';
export * from './typography';
export * from './motion';
export * from './radius';
export * from './z-index';

import { lightColors, darkColors, trueBlackColors } from './colors';
import { semanticSpacing } from './spacing';
import { typeStyles } from './typography';
import { motion, springMotion } from './motion';
import { semanticRadius } from './radius';
import { semanticZIndex } from './z-index';

export const semantic = {
  colors: {
    light: lightColors,
    dark: darkColors,
    trueBlack: trueBlackColors,
  },
  spacing: semanticSpacing,
  typography: typeStyles,
  motion,
  springMotion,
  radius: semanticRadius,
  zIndex: semanticZIndex,
} as const;
