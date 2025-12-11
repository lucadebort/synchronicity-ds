/**
 * TIER 1: Z-Index Primitives
 * Raw z-index values for layering.
 */

export const zIndex = {
  'z-0': 0,
  'z-10': 10,
  'z-20': 20,
  'z-30': 30,
  'z-40': 40,
  'z-50': 50,
  'z-auto': 'auto',
} as const;

export type ZIndexPrimitive = keyof typeof zIndex;
