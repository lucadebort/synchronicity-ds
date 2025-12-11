/**
 * TIER 1: Color Primitives
 * Raw color values with no semantic meaning.
 * These are the foundation - they NEVER change based on theme.
 */

// Gold Spectrum - Primary brand color
export const gold = {
  'gold-10': '#fffdf5',
  'gold-20': '#fff8e1',
  'gold-30': '#ffecb3',
  'gold-40': '#ffe082',
  'gold-50': '#ffd54f',
  'gold-60': '#d4af37', // Primary gold
  'gold-70': '#c9a868', // Warm muted gold
  'gold-80': '#b8972f',
  'gold-90': '#8a7424', // Deep gold
  'gold-100': '#6b4f00', // Very dark gold
  // Special gold variants
  'gold-glow': '#ffe8a3', // Ethereal glow effect
  'gold-light-accent': '#f4cf67', // Light accent
  // Light mode accessible golds (WCAG AA)
  'gold-accessible': '#886a00', // 5.2:1 on cream
  'gold-accessible-dark': '#6b4f00', // 7.2:1 on cream
} as const;

// Gray Spectrum - Neutral palette (cool for dark, warm for light)
export const gray = {
  // Warm grays (light mode)
  'gray-warm-10': '#f5f2ea',
  'gray-warm-20': '#eae5db',
  'gray-warm-30': '#dacfc5',
  'gray-warm-40': '#8a7f75',
  'gray-warm-50': '#6b5f55',
  'gray-warm-60': '#5a4f45',
  'gray-warm-70': '#3a3530',
  'gray-warm-80': '#2a2520',
  // Cool grays (dark mode)
  'gray-cool-10': '#e8e6e3',
  'gray-cool-20': '#b8b6b3',
  'gray-cool-30': '#a8a6a3',
  'gray-cool-40': '#8a8a9a',
  'gray-cool-50': '#7585a0',
  'gray-cool-60': '#5a6578',
  'gray-cool-70': '#4a5568',
  'gray-cool-80': '#2a2a38',
  'gray-cool-90': '#1e1e2e',
  'gray-cool-100': '#12121a',
} as const;

// True Black & White + OLED optimized
export const neutral = {
  black: '#000000',
  white: '#ffffff',
  // OLED-optimized dark mode foundations
  'void': '#0a0a0f', // Deep void (dark mode bg)
  'void-pure': '#000000', // True black (OLED mode bg)
  'void-surface': '#0a0a0a', // True black surface
  // Light mode foundations
  'cream': '#faf8f3', // Soft cream white
  'cream-warm': '#f5f2ea', // Warm paper
  'cream-deep': '#eeebe2', // Deeper warm
} as const;

// Ethereal Spectrum - Accent colors
export const ethereal = {
  'ethereal-blue-10': '#e0f2fe',
  'ethereal-blue-20': '#bae6fd',
  'ethereal-blue-30': '#7dd3fc',
  'ethereal-blue-40': '#38bdf8',
  'ethereal-blue-50': '#0ea5e9',
  'ethereal-blue-60': '#6b9ac4',

  'ethereal-indigo-10': '#e0e7ff',
  'ethereal-indigo-20': '#c7d2fe',
  'ethereal-indigo-30': '#a5b4fc',
  'ethereal-indigo-40': '#818cf8',
  'ethereal-indigo-50': '#6366f1',
  'ethereal-indigo-60': '#9b8aa8',

  'ethereal-violet-10': '#ede9fe',
  'ethereal-violet-20': '#ddd6fe',
  'ethereal-violet-30': '#c4b5fd',
  'ethereal-violet-40': '#a78bfa',
  'ethereal-violet-50': '#8b5cf6',
  'ethereal-violet-60': '#b19cd9',
} as const;

// Support Colors - Semantic states (raw values)
export const support = {
  'support-green-10': '#d1fae5',
  'support-green-20': '#a7f3d0',
  'support-green-30': '#6ee7b7',
  'support-green-40': '#34d399',
  'support-green-50': '#10b981',
  'support-green-60': '#059669',

  'support-red-10': '#fee2e2',
  'support-red-20': '#fecaca',
  'support-red-30': '#fca5a5',
  'support-red-40': '#f87171',
  'support-red-50': '#ef4444',
  'support-red-60': '#dc2626',

  'support-amber-10': '#fef3c7',
  'support-amber-20': '#fde68a',
  'support-amber-30': '#fcd34d',
  'support-amber-40': '#fbbf24',
  'support-amber-50': '#f59e0b',
  'support-amber-60': '#d97706',
} as const;

// All color primitives
export const colorPrimitives = {
  ...gold,
  ...gray,
  ...neutral,
  ...ethereal,
  ...support,
} as const;

export type ColorPrimitive = keyof typeof colorPrimitives;
