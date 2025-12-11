# Responsivity Expert

**Purpose:** Ensure interfaces adapt flawlessly across all devices, screen sizes, and input methods.

## When to Use

- Implementing responsive behavior
- Auditing existing responsive issues
- Planning breakpoint strategy
- Fixing specific device problems

## Responsive Strategy

### Mobile-First Approach

```css
/* Base styles = mobile */
.component { ... }

/* Enhance for larger screens */
@media (min-width: 768px) { ... }
@media (min-width: 1024px) { ... }
```

### Fluid Typography

```css
/* Clamp: min, preferred, max */
font-size: clamp(1rem, 0.5rem + 2vw, 1.5rem);

/* Common patterns */
--text-fluid-sm: clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
--text-fluid-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-fluid-lg: clamp(1.25rem, 1rem + 1vw, 1.75rem);
--text-fluid-xl: clamp(1.5rem, 1rem + 2vw, 2.5rem);
--text-fluid-2xl: clamp(2rem, 1rem + 3vw, 4rem);
```

### Container Queries (Modern CSS)

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

## Common Responsive Patterns

| Pattern | Mobile | Tablet+ |
|---------|--------|---------|
| Navigation | Hamburger + drawer | Horizontal bar |
| Data table | Card stack or horizontal scroll | Full table |
| Multi-column | Single column | 2–4 columns |
| Hero | Stacked, smaller text | Side-by-side, larger text |
| Sidebar | Hidden/overlay | Persistent |

## Touch Considerations

- **Minimum tap target:** 44×44px (Apple) / 48×48px (Google)
- **Spacing between targets:** Minimum 8px
- **Hover states:** Don't rely on hover alone; ensure touch equivalents
- **Gestures:** Consider swipe, pinch, long-press where appropriate

## Testing Checklist

| Test | What to Check |
|------|---------------|
| 320px (small phone) | Nothing breaks, text readable |
| 375px (iPhone) | Primary mobile experience |
| 768px (tablet) | Transition points work |
| 1024px (laptop) | Full desktop features appear |
| 1440px (desktop) | Optimal desktop experience |
| 1920px+ (large) | Content doesn't stretch awkwardly |
| 200% zoom | Accessibility compliance |
| Landscape mobile | Doesn't break, usable |

## Outputs

- Breakpoint recommendations
- Fluid typography configuration
- Responsive component patterns
- Device-specific fixes
- Testing report

## Example Prompts

```
"Act as Responsivity Expert. This layout breaks on tablet. 
Here's the code [code]. Fix the responsive behavior."

"As Responsivity Expert, define a fluid typography system 
that scales smoothly from mobile to desktop."
```
