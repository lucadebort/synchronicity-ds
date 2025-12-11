/**
 * TIER 1: Duration Primitives
 * Raw animation duration values in milliseconds.
 */

export const duration = {
  'duration-0': 0,
  'duration-100': 100,
  'duration-150': 150, // Instant
  'duration-200': 200,
  'duration-300': 300, // Fast
  'duration-400': 400,
  'duration-500': 500, // Moderate
  'duration-600': 600,
  'duration-800': 800, // Slow
  'duration-1000': 1000,
  'duration-1200': 1200, // Ritual / Breath hold
  'duration-1500': 1500,
  'duration-2000': 2000,
  'duration-3000': 3000,
  'duration-3600': 3600, // Breath in
  'duration-4800': 4800, // Breath out
} as const;

export type DurationPrimitive = keyof typeof duration;
