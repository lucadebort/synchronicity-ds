/**
 * TIER 1: Radius Primitives
 * Raw border radius values.
 */

export const radius = {
  'radius-0': 0,
  'radius-2': 2,
  'radius-4': 4,
  'radius-6': 6,
  'radius-8': 8,
  'radius-12': 12,
  'radius-16': 16,
  'radius-20': 20,
  'radius-24': 24,
  'radius-full': 9999,
} as const;

export type RadiusPrimitive = keyof typeof radius;
