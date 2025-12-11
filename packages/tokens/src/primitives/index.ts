/**
 * TIER 1: PRIMITIVES
 * Raw, theme-agnostic values. These never change based on theme.
 */

export * from './colors';
export * from './spacing';
export * from './typography';
export * from './radius';
export * from './duration';
export * from './easing';
export * from './z-index';
export * from './opacity';
export * from './border';
export * from './touch';
export * from './shadow';
export * from './haptics';

// Re-export all primitives as a single object
import { colorPrimitives } from './colors';
import { spacing } from './spacing';
import { typographyPrimitives } from './typography';
import { radius } from './radius';
import { duration } from './duration';
import { easingPrimitives } from './easing';
import { zIndex } from './z-index';
import { opacity } from './opacity';
import { borderWidth } from './border';
import { touchTarget } from './touch';
import { shadow, borderElevation } from './shadow';
import { hapticPatterns } from './haptics';

export const primitives = {
  color: colorPrimitives,
  spacing,
  typography: typographyPrimitives,
  radius,
  duration,
  ...easingPrimitives,
  zIndex,
  opacity,
  borderWidth,
  touchTarget,
  shadow,
  borderElevation,
  hapticPatterns,
} as const;
