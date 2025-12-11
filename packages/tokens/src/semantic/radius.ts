/**
 * TIER 2: Semantic Radius Tokens
 * Border radius with contextual meaning.
 */

import { radius as r } from '../primitives/radius';

export const semanticRadius = {
  'radius-none': r['radius-0'],
  'radius-interactive': r['radius-8'],
  'radius-container': r['radius-12'],
  'radius-card': r['radius-16'],
  'radius-modal': r['radius-20'],
  'radius-pill': r['radius-full'],
} as const;

export type SemanticRadius = keyof typeof semanticRadius;
