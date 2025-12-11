/**
 * TIER 2: Semantic Spacing Tokens
 * Contextual spacing with meaning.
 */

import { spacing as s } from '../primitives/spacing';

export const semanticSpacing = {
  // Inset (padding)
  'inset-xs': s['space-1'],
  'inset-sm': s['space-2'],
  'inset-md': s['space-4'],
  'inset-lg': s['space-6'],
  'inset-xl': s['space-8'],
  'inset-2xl': s['space-12'],

  // Stack (vertical)
  'stack-xs': s['space-1'],
  'stack-sm': s['space-2'],
  'stack-md': s['space-4'],
  'stack-lg': s['space-6'],
  'stack-xl': s['space-8'],
  'stack-2xl': s['space-12'],
  'stack-3xl': s['space-16'],

  // Inline (horizontal)
  'inline-xs': s['space-1'],
  'inline-sm': s['space-2'],
  'inline-md': s['space-4'],
  'inline-lg': s['space-6'],
  'inline-xl': s['space-8'],

  // Layout
  'layout-gutter': s['space-4'],
  'layout-margin': s['space-5'],
  'layout-section': s['space-12'],
  'layout-page': s['space-16'],
} as const;

export type SemanticSpacing = keyof typeof semanticSpacing;
