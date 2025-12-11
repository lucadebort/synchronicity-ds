/**
 * TIER 1: Typography Primitives
 * Raw typography values - platform-agnostic.
 */

// Font sizes (in pixels/points)
export const fontSize = {
  'font-size-10': 10,
  'font-size-12': 12,
  'font-size-14': 14,
  'font-size-16': 16,
  'font-size-18': 18,
  'font-size-20': 20,
  'font-size-24': 24,
  'font-size-28': 28,
  'font-size-32': 32,
  'font-size-36': 36,
  'font-size-40': 40,
  'font-size-48': 48,
  'font-size-56': 56,
  'font-size-64': 64,
  'font-size-72': 72,
  'font-size-96': 96,
} as const;

// Font weights
export const fontWeight = {
  'font-weight-300': '300',
  'font-weight-400': '400',
  'font-weight-500': '500',
  'font-weight-600': '600',
  'font-weight-700': '700',
  'font-weight-900': '900',
} as const;

// Line height multipliers
export const lineHeight = {
  'line-height-100': 1.0, // Display text
  'line-height-120': 1.2, // Tight
  'line-height-140': 1.4, // Headings
  'line-height-150': 1.5, // Normal
  'line-height-160': 1.6, // Relaxed
  'line-height-180': 1.8, // Loose
  'line-height-200': 2.0, // Double
} as const;

// Letter spacing (in pixels)
export const letterSpacing = {
  'letter-spacing-tight': -0.5,
  'letter-spacing-normal': 0,
  'letter-spacing-wide': 0.5,
  'letter-spacing-wider': 1,
  'letter-spacing-widest': 2,
  'letter-spacing-ultra': 4,
  'letter-spacing-extreme': 6,
  'letter-spacing-ritual': 8,
} as const;

// Font family tokens (platform-specific in semantic layer)
export const fontFamily = {
  'font-family-serif': 'serif',
  'font-family-sans': 'sans-serif',
  'font-family-mono': 'monospace',
} as const;

export const typographyPrimitives = {
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  fontFamily,
} as const;

export type FontSizePrimitive = keyof typeof fontSize;
export type FontWeightPrimitive = keyof typeof fontWeight;
export type LineHeightPrimitive = keyof typeof lineHeight;
export type LetterSpacingPrimitive = keyof typeof letterSpacing;
