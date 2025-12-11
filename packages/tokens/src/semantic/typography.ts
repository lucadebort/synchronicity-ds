/**
 * TIER 2: Semantic Typography Tokens
 * Typography styles with meaning.
 */

import { fontSize, fontWeight, lineHeight, letterSpacing } from '../primitives/typography';

export const typeStyles = {
  // Display
  'type-display-large': {
    fontSize: fontSize['font-size-48'],
    fontWeight: fontWeight['font-weight-300'],
    lineHeight: lineHeight['line-height-120'],
    letterSpacing: letterSpacing['letter-spacing-tight'],
  },
  'type-display-medium': {
    fontSize: fontSize['font-size-40'],
    fontWeight: fontWeight['font-weight-300'],
    lineHeight: lineHeight['line-height-120'],
    letterSpacing: letterSpacing['letter-spacing-tight'],
  },
  'type-display-small': {
    fontSize: fontSize['font-size-32'],
    fontWeight: fontWeight['font-weight-300'],
    lineHeight: lineHeight['line-height-120'],
    letterSpacing: letterSpacing['letter-spacing-normal'],
  },

  // Heading
  'type-heading-xl': {
    fontSize: fontSize['font-size-28'],
    fontWeight: fontWeight['font-weight-600'],
    lineHeight: lineHeight['line-height-140'],
    letterSpacing: letterSpacing['letter-spacing-normal'],
  },
  'type-heading-lg': {
    fontSize: fontSize['font-size-24'],
    fontWeight: fontWeight['font-weight-600'],
    lineHeight: lineHeight['line-height-140'],
    letterSpacing: letterSpacing['letter-spacing-normal'],
  },
  'type-heading-md': {
    fontSize: fontSize['font-size-20'],
    fontWeight: fontWeight['font-weight-600'],
    lineHeight: lineHeight['line-height-140'],
    letterSpacing: letterSpacing['letter-spacing-normal'],
  },
  'type-heading-sm': {
    fontSize: fontSize['font-size-18'],
    fontWeight: fontWeight['font-weight-600'],
    lineHeight: lineHeight['line-height-140'],
    letterSpacing: letterSpacing['letter-spacing-normal'],
  },

  // Body
  'type-body-lg': {
    fontSize: fontSize['font-size-18'],
    fontWeight: fontWeight['font-weight-400'],
    lineHeight: lineHeight['line-height-160'],
    letterSpacing: letterSpacing['letter-spacing-normal'],
  },
  'type-body-md': {
    fontSize: fontSize['font-size-16'],
    fontWeight: fontWeight['font-weight-400'],
    lineHeight: lineHeight['line-height-150'],
    letterSpacing: letterSpacing['letter-spacing-normal'],
  },
  'type-body-sm': {
    fontSize: fontSize['font-size-14'],
    fontWeight: fontWeight['font-weight-400'],
    lineHeight: lineHeight['line-height-150'],
    letterSpacing: letterSpacing['letter-spacing-normal'],
  },

  // Label
  'type-label-lg': {
    fontSize: fontSize['font-size-16'],
    fontWeight: fontWeight['font-weight-500'],
    lineHeight: lineHeight['line-height-140'],
    letterSpacing: letterSpacing['letter-spacing-wide'],
  },
  'type-label-md': {
    fontSize: fontSize['font-size-14'],
    fontWeight: fontWeight['font-weight-500'],
    lineHeight: lineHeight['line-height-140'],
    letterSpacing: letterSpacing['letter-spacing-wide'],
  },
  'type-label-sm': {
    fontSize: fontSize['font-size-12'],
    fontWeight: fontWeight['font-weight-500'],
    lineHeight: lineHeight['line-height-140'],
    letterSpacing: letterSpacing['letter-spacing-wide'],
  },

  // Caption
  'type-caption': {
    fontSize: fontSize['font-size-12'],
    fontWeight: fontWeight['font-weight-400'],
    lineHeight: lineHeight['line-height-140'],
    letterSpacing: letterSpacing['letter-spacing-normal'],
  },

  // Ritual (special contemplative typography)
  'type-ritual-symbol': {
    fontSize: fontSize['font-size-72'],
    fontWeight: fontWeight['font-weight-400'],
    lineHeight: lineHeight['line-height-100'],
    letterSpacing: letterSpacing['letter-spacing-normal'],
  },
  'type-ritual-title': {
    fontSize: fontSize['font-size-24'],
    fontWeight: fontWeight['font-weight-300'],
    lineHeight: lineHeight['line-height-160'],
    letterSpacing: letterSpacing['letter-spacing-wider'],
  },
} as const;

export type TypeStyle = keyof typeof typeStyles;
