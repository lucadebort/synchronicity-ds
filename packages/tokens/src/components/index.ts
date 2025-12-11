/**
 * TIER 3: COMPONENT TOKENS
 * Component-specific tokens that reference semantic tokens.
 */

export * from './button';
export * from './card';
export * from './input';

import { buttonTokens, buttonColorTokens } from './button';
import { cardTokens, cardColorTokens } from './card';
import { inputTokens, inputColorTokens } from './input';

export const componentTokens = {
  button: { ...buttonTokens, colors: buttonColorTokens },
  card: { ...cardTokens, colors: cardColorTokens },
  input: { ...inputTokens, colors: inputColorTokens },
} as const;
