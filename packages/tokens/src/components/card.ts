/**
 * TIER 3: Card Component Tokens
 * Specific tokens for the Card component.
 */

import { semanticSpacing as s } from '../semantic/spacing';
import { semanticRadius as r } from '../semantic/radius';

export const cardTokens = {
  // Padding
  'card-padding-sm': s['inset-sm'],
  'card-padding-md': s['inset-md'],
  'card-padding-lg': s['inset-lg'],

  // Radius
  'card-radius': r['radius-card'],

  // Gap between elements
  'card-gap': s['stack-md'],
} as const;

export const cardColorTokens = {
  'card-background': 'background-secondary',
  'card-background-elevated': 'background-primary',
  'card-border': 'border-subtle',
} as const;

export type CardToken = keyof typeof cardTokens;
export type CardColorToken = keyof typeof cardColorTokens;
