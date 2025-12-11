/**
 * TIER 2: Semantic Motion Tokens
 * Animation configurations with meaning.
 */

import { duration as d } from '../primitives/duration';
import { easing as e, spring as sp } from '../primitives/easing';

export const motion = {
  // Instant feedback
  'motion-instant': {
    duration: d['duration-100'],
    easing: e['ease-out'],
  },

  // Fast interactions
  'motion-fast': {
    duration: d['duration-200'],
    easing: e['ease-out'],
  },

  // Default transitions
  'motion-default': {
    duration: d['duration-300'],
    easing: e['ease-in-out'],
  },

  // Slow, deliberate transitions
  'motion-slow': {
    duration: d['duration-500'],
    easing: e['ease-in-out'],
  },

  // Contemplative (for ritual UI)
  'motion-contemplative': {
    duration: d['duration-800'],
    easing: e['ease-mystical'],
  },

  // Mystical reveal
  'motion-mystical': {
    duration: d['duration-1200'],
    easing: e['ease-mystical'],
  },

  // Breathing animation
  'motion-breath-in': {
    duration: d['duration-3600'],
    easing: e['ease-in-out'],
  },
  'motion-breath-out': {
    duration: d['duration-4800'],
    easing: e['ease-in-out'],
  },
} as const;

export const springMotion = {
  'spring-button': sp['spring-default'],
  'spring-modal': sp['spring-gentle'],
  'spring-card': sp['spring-gentle'],
  'spring-bounce': sp['spring-bouncy'],
} as const;

export type MotionToken = keyof typeof motion;
export type SpringMotionToken = keyof typeof springMotion;
