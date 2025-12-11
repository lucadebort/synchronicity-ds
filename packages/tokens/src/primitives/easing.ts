/**
 * TIER 1: Easing Primitives
 * Raw bezier curve values for animations.
 */

// Bezier curves [x1, y1, x2, y2]
export const easing = {
  'ease-linear': [0, 0, 1, 1] as const,
  'ease-in': [0.4, 0, 1, 1] as const,
  'ease-out': [0, 0, 0.2, 1] as const,
  'ease-in-out': [0.4, 0, 0.2, 1] as const,
  'ease-mystical': [0.16, 1, 0.3, 1] as const,
  'ease-bounce': [0.34, 1.56, 0.64, 1] as const,
} as const;

// Spring configurations (for Reanimated)
export const spring = {
  'spring-gentle': { damping: 20, stiffness: 100 },
  'spring-default': { damping: 15, stiffness: 150 },
  'spring-bouncy': { damping: 10, stiffness: 200 },
  'spring-stiff': { damping: 25, stiffness: 300 },
} as const;

export const easingPrimitives = {
  easing,
  spring,
} as const;

export type EasingPrimitive = keyof typeof easing;
export type SpringPrimitive = keyof typeof spring;
