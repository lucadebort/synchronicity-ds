/**
 * TIER 1: Touch Target Primitives
 * Platform-specific minimum touch target sizes.
 */

export const touchTarget = {
  // iOS Human Interface Guidelines minimum
  'touch-ios-min': 44,
  // Material Design minimum
  'touch-android-min': 48,
  // Comfortable touch targets
  'touch-comfortable': 56,
  'touch-large': 64,
} as const;

export type TouchTargetPrimitive = keyof typeof touchTarget;
