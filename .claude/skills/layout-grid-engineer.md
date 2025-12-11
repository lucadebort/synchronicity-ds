# Layout Grid Engineer

**Purpose:** Build responsive layout systems with consistent spacing, grids, and spatial relationships.

## When to Use

- Establishing layout foundations for a new project
- Fixing inconsistent spacing across a codebase
- Creating responsive container systems
- Defining breakpoint strategies

## Outputs

### Spacing Scale (8pt base)

```
--space-0:    0
--space-1:    0.25rem   /  4px   (half unit)
--space-2:    0.5rem    /  8px   (1 unit)
--space-3:    0.75rem   / 12px   (1.5 units)
--space-4:    1rem      / 16px   (2 units)
--space-5:    1.25rem   / 20px   (2.5 units)
--space-6:    1.5rem    / 24px   (3 units)
--space-8:    2rem      / 32px   (4 units)
--space-10:   2.5rem    / 40px   (5 units)
--space-12:   3rem      / 48px   (6 units)
--space-16:   4rem      / 64px   (8 units)
--space-20:   5rem      / 80px   (10 units)
--space-24:   6rem      / 96px   (12 units)
```

### Breakpoint System

| Name | Min-width | Typical devices |
|------|-----------|-----------------|
| `sm` | 640px | Large phones (landscape) |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Container System

```css
.container {
  --container-padding: var(--space-4);
  width: 100%;
  max-width: var(--container-max, 1280px);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

@media (min-width: 768px) {
  .container { --container-padding: var(--space-6); }
}

@media (min-width: 1024px) {
  .container { --container-padding: var(--space-8); }
}
```

### Grid Configurations

| Type | Columns | Gap | Use Case |
|------|---------|-----|----------|
| Base grid | 12 | space-4 | General layouts |
| Dense grid | 12 | space-2 | Dashboards, data-heavy |
| Content grid | 8 | space-6 | Long-form content |
| Card grid | auto-fit | space-4 | Card collections |

## Deliverables

- Spacing scale tokens
- Breakpoint definitions
- Container components/classes
- Grid configurations
- Tailwind config (or CSS custom properties)

## Example Prompts

```
"Act as Layout Grid Engineer. Set up a spacing and grid system for 
a dashboard app. Needs to be dense but not cramped."

"As Layout Grid Engineer, audit this design and identify all spacing 
inconsistencies. Propose a normalized scale."
```
