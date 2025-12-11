/**
 * TIER 2: Semantic Z-Index Tokens
 * Layering with contextual meaning.
 */

import { zIndex as z } from '../primitives/z-index';

export const semanticZIndex = {
  'z-base': z['z-0'],
  'z-dropdown': z['z-10'],
  'z-sticky': z['z-20'],
  'z-overlay': z['z-30'],
  'z-modal': z['z-40'],
  'z-toast': z['z-50'],
} as const;

export type SemanticZIndex = keyof typeof semanticZIndex;
