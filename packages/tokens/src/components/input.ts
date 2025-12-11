/**
 * TIER 3: Input Component Tokens
 * Specific tokens for Input/TextInput components.
 */

import { semanticSpacing as s } from '../semantic/spacing';
import { semanticRadius as r } from '../semantic/radius';
import { typeStyles as t } from '../semantic/typography';

export const inputTokens = {
  // Padding
  'input-padding-x': s['inset-md'],
  'input-padding-y': s['inset-sm'],

  // Heights
  'input-height-sm': 36,
  'input-height-md': 44,
  'input-height-lg': 52,

  // Radius
  'input-radius': r['radius-interactive'],

  // Typography
  'input-font': t['type-body-md'],
  'input-placeholder-font': t['type-body-md'],
  'input-label-font': t['type-label-sm'],
  'input-helper-font': t['type-caption'],
} as const;

export const inputColorTokens = {
  'input-background': 'background-primary',
  'input-background-disabled': 'background-tertiary',
  'input-border': 'border-default',
  'input-border-hover': 'border-strong',
  'input-border-focus': 'border-accent',
  'input-border-error': 'support-error',
  'input-text': 'text-primary',
  'input-text-placeholder': 'text-tertiary',
  'input-text-disabled': 'text-disabled',
  'input-label': 'text-secondary',
  'input-helper': 'text-tertiary',
  'input-error': 'support-error',
} as const;

export type InputToken = keyof typeof inputTokens;
export type InputColorToken = keyof typeof inputColorTokens;
