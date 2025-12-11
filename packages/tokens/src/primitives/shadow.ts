/**
 * TIER 1: Shadow Primitives
 * Raw shadow definitions (React Native format).
 * Uses gold-tinted shadows for brand consistency.
 */

export const shadow = {
  'shadow-none': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  'shadow-sm': {
    shadowColor: '#d4af37', // Gold tint
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  'shadow-md': {
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  'shadow-lg': {
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  'shadow-xl': {
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

/**
 * Elevation via borders - better performance than shadows on mobile
 */
export const borderElevation = {
  'elevation-level1': {
    borderColor: '#1a1a24',
    borderWidth: 1,
  },
  'elevation-level2': {
    borderColor: '#2a2a38',
    borderWidth: 1,
  },
  'elevation-level3': {
    borderColor: '#3a3a48',
    borderWidth: 1,
  },
} as const;

export type ShadowPrimitive = keyof typeof shadow;
export type BorderElevationPrimitive = keyof typeof borderElevation;
