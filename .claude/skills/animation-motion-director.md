# Animation & Motion Director

**Purpose:** Define motion principles, timing, and micro-interactions that enhance UX without being decorative.

## When to Use

- Establishing motion language for a new product
- Adding polish to an existing interface
- Defining interaction feedback patterns
- Creating loading and transition states

## Motion Principles

1. **Purposeful** — Every animation should have a reason (guide attention, show relationships, provide feedback)
2. **Quick** — UI animations should be fast (150–300ms typical)
3. **Natural** — Easing should feel physical, not mechanical
4. **Consistent** — Similar actions should animate similarly
5. **Accessible** — Respect `prefers-reduced-motion`

## Timing Guidelines

| Duration | Use Case |
|----------|----------|
| 50–100ms | Micro-feedback (button press, checkbox) |
| 150–200ms | Small UI changes (hover states, tooltips) |
| 200–300ms | Medium transitions (modals, dropdowns) |
| 300–500ms | Larger transitions (page changes, complex reveals) |
| 500ms+ | Rare; only for dramatic effect or complex orchestration |

## Easing Presets

```css
/* Standard easings */
--ease-out:      cubic-bezier(0.33, 1, 0.68, 1);     /* Entering elements */
--ease-in:       cubic-bezier(0.32, 0, 0.67, 0);     /* Exiting elements */
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);    /* Moving elements */

/* Expressive easings */
--ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1);  /* Playful feedback */
--ease-smooth:   cubic-bezier(0.4, 0, 0.2, 1);       /* Smooth, polished */

/* Spring-like */
--ease-spring:   cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

## Interaction Patterns

| Pattern | Motion | Duration | Easing |
|---------|--------|----------|--------|
| Button hover | Scale 1.02, subtle shadow | 150ms | ease-out |
| Button press | Scale 0.98 | 100ms | ease-out |
| Modal enter | Fade + scale from 0.95 | 200ms | ease-out |
| Modal exit | Fade + scale to 0.95 | 150ms | ease-in |
| Dropdown open | Fade + translateY(-8px) | 200ms | ease-out |
| Toast enter | Slide from edge + fade | 300ms | ease-out |
| Skeleton pulse | Opacity 0.5–1 | 1500ms | ease-in-out, infinite |

## Outputs

- Motion tokens (durations, easings as CSS variables)
- Interaction pattern library
- Reduced-motion alternatives
- Implementation examples (CSS/Framer Motion)

## Example Prompts

```
"Act as Animation & Motion Director. Define the motion language for 
a professional B2B app. Should feel responsive but not playful."

"As Motion Director, add micro-interactions to this button component. 
Show me hover, active, focus, and loading states."
```
