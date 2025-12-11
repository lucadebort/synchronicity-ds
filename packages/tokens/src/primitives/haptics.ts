/**
 * TIER 1: Haptic Primitives
 * Haptic feedback patterns for different interaction types.
 * These map to expo-haptics or react-native-haptic-feedback.
 */

export type HapticImpact = 'light' | 'medium' | 'heavy';
export type HapticNotification = 'success' | 'warning' | 'error';

export const hapticPatterns = {
  /** Tab switch, button tap, card select */
  'haptic-selection': {
    type: 'impact' as const,
    style: 'light' as HapticImpact,
  },
  /** Coin flip, card flip */
  'haptic-medium': {
    type: 'impact' as const,
    style: 'medium' as HapticImpact,
  },
  /** Cast complete, level unlock */
  'haptic-heavy': {
    type: 'impact' as const,
    style: 'heavy' as HapticImpact,
  },
  /** Correct answer, hexagram saved */
  'haptic-success': {
    type: 'notification' as const,
    style: 'success' as HapticNotification,
  },
  /** Incomplete session, missing data */
  'haptic-warning': {
    type: 'notification' as const,
    style: 'warning' as HapticNotification,
  },
  /** Error, failed action */
  'haptic-error': {
    type: 'notification' as const,
    style: 'error' as HapticNotification,
  },
  /** Ritual pattern for special moments (level complete, wisdom unlock) */
  'haptic-ritual': {
    type: 'sequence' as const,
    sequence: ['light', 'medium', 'heavy'] as HapticImpact[],
    delay: 100, // ms between each
  },
} as const;

export type HapticPattern = keyof typeof hapticPatterns;
