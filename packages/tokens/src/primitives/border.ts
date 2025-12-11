/**
 * TIER 1: Border Primitives
 * Raw border width values.
 */

export const borderWidth = {
  'border-0': 0,
  'border-1': 1,
  'border-2': 2,
  'border-3': 3,
  'border-4': 4,
} as const;

export type BorderWidthPrimitive = keyof typeof borderWidth;
