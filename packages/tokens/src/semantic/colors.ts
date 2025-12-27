/**
 * TIER 2: Semantic Color Tokens
 * Contextual meaning - these CHANGE based on theme.
 * Directly mapped from iching-app-native design system.
 */

import { gold, gray, neutral, ethereal, support } from '../primitives/colors';

/**
 * Light Mode - Warm, contemplative palette (WCAG AA compliant)
 */
export const lightColors = {
  // Foundation
  'background': neutral['cream'], // #faf8f3
  'surface': neutral['cream-warm'], // #f5f2ea
  'surface-elevated': neutral['cream-deep'], // #eeebe2
  'border': gray['gray-warm-30'], // #dacfc5

  // Text - Carefully balanced for readability
  'text-primary': gray['gray-warm-80'], // #2a2520 - 14.3:1 (AAA)
  'text-secondary': gray['gray-warm-60'], // #5a4f45 - 7.5:1 (AAA)
  'text-tertiary': gray['gray-warm-50'], // #6b5f55 - 5.0:1 (AA)
  'text-disabled': gray['gray-warm-40'],
  'text-inverse': neutral.white,
  'text-on-color': neutral.white,

  // Gold Spectrum - Fully accessible
  'gold-primary': gold['gold-accessible'], // #886a00 - 5.2:1
  'gold-light': gold['gold-60'], // #d4af37
  'gold-muted': gold['gold-accessible'], // #8a6700 - 4.6:1
  'gold-dark': gold['gold-accessible-dark'], // #6b4f00 - 7.2:1
  'gold-glow': gold['gold-light-accent'], // #f4cf67
  'text-accent': gold['gold-accessible'],

  // Interactive
  'interactive-primary': gold['gold-accessible'],
  'interactive-primary-hover': gold['gold-100'],
  'interactive-primary-active': gold['gold-accessible-dark'],
  'interactive-secondary': gray['gray-warm-20'],
  'interactive-secondary-hover': gray['gray-warm-30'],
  'interactive-disabled': gray['gray-warm-30'],

  // Border
  'border-subtle': gray['gray-warm-20'],
  'border-default': gray['gray-warm-30'],
  'border-strong': gray['gray-warm-50'],
  'border-inverse': gray['gray-warm-80'],
  'border-accent': gold['gold-accessible'],
  'border-focus': gold['gold-accessible'],

  // Ethereal (Accent)
  'ethereal-blue': '#6b7c9a',
  'ethereal-indigo': '#7b7fc9',
  'ethereal-violet': '#9b8cd6',

  // Support / Semantic
  'support-success': '#0d8f68',
  'support-success-subtle': support['support-green-10'],
  'support-warning': '#d87600',
  'support-warning-subtle': support['support-amber-10'],
  'support-error': '#c93a3a',
  'support-error-subtle': support['support-red-10'],
  'support-info': ethereal['ethereal-blue-50'],
  'support-info-subtle': ethereal['ethereal-blue-10'],

  // Alert States
  'alert-info-bg': 'rgba(107, 124, 154, 0.1)',
  'alert-info-border': ethereal['ethereal-blue-30'],
  'alert-info-text': ethereal['ethereal-blue-60'],
  'alert-info-title': ethereal['ethereal-blue-70'],
  'alert-success-bg': 'rgba(13, 143, 104, 0.1)',
  'alert-success-border': support['support-green-30'],
  'alert-success-text': support['support-green-60'],
  'alert-success-title': support['support-green-70'],
  'alert-warning-bg': 'rgba(216, 118, 0, 0.1)',
  'alert-warning-border': support['support-amber-30'],
  'alert-warning-text': support['support-amber-60'],
  'alert-warning-title': support['support-amber-70'],
  'alert-error-bg': 'rgba(201, 58, 58, 0.1)',
  'alert-error-border': support['support-red-30'],
  'alert-error-text': support['support-red-60'],
  'alert-error-title': support['support-red-70'],

  // Grays (for direct access)
  'gray-900': gray['gray-warm-70'],
  'gray-700': gray['gray-warm-60'],
  'gray-600': '#7a6f65',
  'gray-500': gray['gray-warm-50'],
  'gray-400': gray['gray-warm-40'],
  'gray-300': gray['gray-warm-30'],
  'gray-200': gray['gray-warm-20'],
  'gray-100': gray['gray-warm-10'],

  // Overlay
  'overlay-light': 'rgba(255, 255, 255, 0.7)',
  'overlay-dark': 'rgba(0, 0, 0, 0.5)',

  // Hexagram specific
  'hexagram-line': gray['gray-warm-70'],
  'hexagram-line-changing': gold['gold-60'],
} as const;

/**
 * Dark Mode - Mysterious deep palette (WCAG AA compliant)
 */
export const darkColors = {
  // Foundation - OLED optimized
  'background': neutral['void'], // #0a0a0f
  'surface': gray['gray-cool-100'], // #12121a
  'surface-elevated': gray['gray-cool-90'], // #1e1e2e
  'border': '#1a1a24',

  // Text - Pristine readability
  'text-primary': gray['gray-cool-10'], // #e8e6e3 - 15.9:1 (AAA)
  'text-secondary': gray['gray-cool-20'], // #b8b6b3 - 9.8:1 (AAA)
  'text-tertiary': gray['gray-cool-40'], // #8a8a9a - 5.8:1 (AA)
  'text-disabled': gray['gray-cool-60'],
  'text-inverse': gray['gray-cool-100'],
  'text-on-color': gray['gray-cool-100'],

  // Gold Spectrum - Excellent contrast on dark
  'gold-primary': gold['gold-60'], // #d4af37 - 9.4:1 (AAA)
  'gold-light': gold['gold-light-accent'], // #f4cf67 - 13.1:1 (AAA)
  'gold-muted': gold['gold-70'], // #c9a868
  'gold-dark': gold['gold-90'], // #8a7424
  'gold-glow': gold['gold-glow'], // #ffe8a3
  'text-accent': gold['gold-50'],

  // Interactive
  'interactive-primary': gold['gold-60'],
  'interactive-primary-hover': gold['gold-50'],
  'interactive-primary-active': gold['gold-40'],
  'interactive-secondary': gray['gray-cool-80'],
  'interactive-secondary-hover': gray['gray-cool-70'],
  'interactive-disabled': gray['gray-cool-70'],

  // Border
  'border-subtle': gray['gray-cool-80'],
  'border-default': gray['gray-cool-70'],
  'border-strong': gray['gray-cool-50'],
  'border-inverse': gray['gray-cool-20'],
  'border-accent': gold['gold-50'],
  'border-focus': gold['gold-50'],

  // Ethereal (Accent)
  'ethereal-blue': gray['gray-cool-70'], // #4a5568
  'ethereal-indigo': ethereal['ethereal-indigo-50'], // #6366f1
  'ethereal-violet': ethereal['ethereal-violet-50'], // #8b5cf6

  // Support / Semantic
  'support-success': support['support-green-50'], // #10b981
  'support-success-subtle': support['support-green-60'],
  'support-warning': support['support-amber-50'], // #f59e0b
  'support-warning-subtle': support['support-amber-60'],
  'support-error': support['support-red-50'], // #ef4444
  'support-error-subtle': support['support-red-60'],
  'support-info': ethereal['ethereal-blue-40'],
  'support-info-subtle': ethereal['ethereal-blue-60'],

  // Alert States
  'alert-info-bg': 'rgba(99, 102, 241, 0.1)',
  'alert-info-border': 'rgba(99, 102, 241, 0.3)',
  'alert-info-text': '#a5b4fc',
  'alert-info-title': '#c7d2fe',
  'alert-success-bg': 'rgba(16, 185, 129, 0.1)',
  'alert-success-border': 'rgba(16, 185, 129, 0.3)',
  'alert-success-text': '#6ee7b7',
  'alert-success-title': '#a7f3d0',
  'alert-warning-bg': 'rgba(245, 158, 11, 0.1)',
  'alert-warning-border': 'rgba(245, 158, 11, 0.3)',
  'alert-warning-text': '#fcd34d',
  'alert-warning-title': '#fde68a',
  'alert-error-bg': 'rgba(239, 68, 68, 0.1)',
  'alert-error-border': 'rgba(239, 68, 68, 0.3)',
  'alert-error-text': '#fca5a5',
  'alert-error-title': '#fecaca',

  // Grays (for direct access)
  'gray-900': gray['gray-cool-80'],
  'gray-700': gray['gray-cool-70'],
  'gray-600': gray['gray-cool-60'],
  'gray-500': gray['gray-cool-50'],
  'gray-400': gray['gray-cool-40'],
  'gray-300': gray['gray-cool-30'],
  'gray-200': gray['gray-cool-20'],
  'gray-100': gray['gray-cool-10'],

  // Overlay
  'overlay-light': 'rgba(255, 255, 255, 0.1)',
  'overlay-dark': 'rgba(0, 0, 0, 0.7)',

  // Hexagram specific
  'hexagram-line': gray['gray-cool-20'],
  'hexagram-line-changing': gold['gold-50'],
} as const;

/**
 * True Black Mode - Pure black for OLED (maximum battery savings)
 */
export const trueBlackColors = {
  // Foundation - Pure black
  'background': neutral['void-pure'], // #000000
  'surface': neutral['void-surface'], // #0a0a0a
  'surface-elevated': '#141414',
  'border': '#1a1a1a',

  // Text - Same as dark
  'text-primary': gray['gray-cool-10'],
  'text-secondary': gray['gray-cool-20'],
  'text-tertiary': gray['gray-cool-40'],
  'text-disabled': gray['gray-cool-60'],
  'text-inverse': gray['gray-cool-100'],
  'text-on-color': gray['gray-cool-100'],

  // Gold Spectrum - Same as dark
  'gold-primary': gold['gold-60'],
  'gold-light': gold['gold-light-accent'],
  'gold-muted': gold['gold-70'],
  'gold-dark': gold['gold-90'],
  'gold-glow': gold['gold-glow'],
  'text-accent': gold['gold-50'],

  // Interactive - Same as dark
  'interactive-primary': gold['gold-60'],
  'interactive-primary-hover': gold['gold-50'],
  'interactive-primary-active': gold['gold-40'],
  'interactive-secondary': gray['gray-cool-80'],
  'interactive-secondary-hover': gray['gray-cool-70'],
  'interactive-disabled': gray['gray-cool-70'],

  // Border - Same as dark
  'border-subtle': gray['gray-cool-80'],
  'border-default': gray['gray-cool-70'],
  'border-strong': gray['gray-cool-50'],
  'border-inverse': gray['gray-cool-20'],
  'border-accent': gold['gold-50'],
  'border-focus': gold['gold-50'],

  // Ethereal - Same as dark
  'ethereal-blue': gray['gray-cool-70'],
  'ethereal-indigo': ethereal['ethereal-indigo-50'],
  'ethereal-violet': ethereal['ethereal-violet-50'],

  // Support - Same as dark
  'support-success': support['support-green-50'],
  'support-success-subtle': support['support-green-60'],
  'support-warning': support['support-amber-50'],
  'support-warning-subtle': support['support-amber-60'],
  'support-error': support['support-red-50'],
  'support-error-subtle': support['support-red-60'],
  'support-info': ethereal['ethereal-blue-40'],
  'support-info-subtle': ethereal['ethereal-blue-60'],

  // Alert States - Same as dark
  'alert-info-bg': 'rgba(99, 102, 241, 0.1)',
  'alert-info-border': 'rgba(99, 102, 241, 0.3)',
  'alert-info-text': '#a5b4fc',
  'alert-info-title': '#c7d2fe',
  'alert-success-bg': 'rgba(16, 185, 129, 0.1)',
  'alert-success-border': 'rgba(16, 185, 129, 0.3)',
  'alert-success-text': '#6ee7b7',
  'alert-success-title': '#a7f3d0',
  'alert-warning-bg': 'rgba(245, 158, 11, 0.1)',
  'alert-warning-border': 'rgba(245, 158, 11, 0.3)',
  'alert-warning-text': '#fcd34d',
  'alert-warning-title': '#fde68a',
  'alert-error-bg': 'rgba(239, 68, 68, 0.1)',
  'alert-error-border': 'rgba(239, 68, 68, 0.3)',
  'alert-error-text': '#fca5a5',
  'alert-error-title': '#fecaca',

  // Grays - Same as dark
  'gray-900': gray['gray-cool-80'],
  'gray-700': gray['gray-cool-70'],
  'gray-600': gray['gray-cool-60'],
  'gray-500': gray['gray-cool-50'],
  'gray-400': gray['gray-cool-40'],
  'gray-300': gray['gray-cool-30'],
  'gray-200': gray['gray-cool-20'],
  'gray-100': gray['gray-cool-10'],

  // Overlay - Same as dark
  'overlay-light': 'rgba(255, 255, 255, 0.1)',
  'overlay-dark': 'rgba(0, 0, 0, 0.7)',

  // Hexagram specific - Same as dark
  'hexagram-line': gray['gray-cool-20'],
  'hexagram-line-changing': gold['gold-50'],
} as const;

export type SemanticColor = keyof typeof lightColors;
