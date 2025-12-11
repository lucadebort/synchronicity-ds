/**
 * TIER 1: Spacing Primitives
 * Raw spacing values based on 4px grid.
 * These are platform-agnostic - just numbers.
 */

export const spacing = {
  'space-0': 0,
  'space-1': 4,
  'space-2': 8,
  'space-3': 12,
  'space-4': 16,
  'space-5': 20,
  'space-6': 24,
  'space-7': 28,
  'space-8': 32,
  'space-9': 36,
  'space-10': 40,
  'space-11': 44,
  'space-12': 48,
  'space-13': 52,
  'space-14': 56,
  'space-15': 60,
  'space-16': 64,
  'space-20': 80,
  'space-24': 96,
  'space-32': 128,
} as const;

export type SpacingPrimitive = keyof typeof spacing;
