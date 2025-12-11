/**
 * TIER 3: Button Component Tokens
 * Specific tokens for the Button component.
 */

import { semanticSpacing as s } from '../semantic/spacing';
import { semanticRadius as r } from '../semantic/radius';
import { typeStyles as t } from '../semantic/typography';

export const buttonTokens = {
  // Sizing
  'button-padding-x-sm': s['inset-sm'],
  'button-padding-y-sm': s['inset-xs'],
  'button-padding-x-md': s['inset-md'],
  'button-padding-y-md': s['inset-sm'],
  'button-padding-x-lg': s['inset-lg'],
  'button-padding-y-lg': s['inset-md'],

  // Min widths
  'button-min-width-sm': 64,
  'button-min-width-md': 80,
  'button-min-width-lg': 96,

  // Heights
  'button-height-sm': 32,
  'button-height-md': 40,
  'button-height-lg': 48,

  // Radius
  'button-radius': r['radius-interactive'],
  'button-radius-pill': r['radius-pill'],

  // Typography
  'button-font-sm': t['type-label-sm'],
  'button-font-md': t['type-label-md'],
  'button-font-lg': t['type-label-lg'],

  // Icon spacing
  'button-icon-gap-sm': s['inline-xs'],
  'button-icon-gap-md': s['inline-sm'],
  'button-icon-gap-lg': s['inline-sm'],
} as const;

// Color tokens reference semantic colors by name (resolved at runtime)
export const buttonColorTokens = {
  // Primary
  'button-primary-background': 'interactive-primary',
  'button-primary-background-hover': 'interactive-primary-hover',
  'button-primary-background-active': 'interactive-primary-active',
  'button-primary-text': 'text-on-color',
  'button-primary-border': 'transparent',

  // Secondary
  'button-secondary-background': 'transparent',
  'button-secondary-background-hover': 'interactive-secondary',
  'button-secondary-background-active': 'interactive-secondary-hover',
  'button-secondary-text': 'text-primary',
  'button-secondary-border': 'border-default',

  // Ghost
  'button-ghost-background': 'transparent',
  'button-ghost-background-hover': 'interactive-secondary',
  'button-ghost-background-active': 'interactive-secondary-hover',
  'button-ghost-text': 'text-primary',
  'button-ghost-border': 'transparent',

  // Danger
  'button-danger-background': 'support-error',
  'button-danger-background-hover': 'support-error',
  'button-danger-background-active': 'support-error',
  'button-danger-text': 'text-on-color',
  'button-danger-border': 'transparent',

  // Disabled (all variants)
  'button-disabled-background': 'interactive-disabled',
  'button-disabled-text': 'text-disabled',
  'button-disabled-border': 'transparent',
} as const;

export type ButtonToken = keyof typeof buttonTokens;
export type ButtonColorToken = keyof typeof buttonColorTokens;
