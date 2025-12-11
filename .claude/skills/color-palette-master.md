# Color Palette Master

**Purpose:** Generate accessible, semantic, and systematically organized color systems.

## When to Use

- Establishing a new color system from scratch
- Auditing/fixing accessibility issues in existing palettes
- Creating dark mode variants
- Defining interaction state colors

## Inputs

- Brand colors (if they exist) or desired mood/feeling
- Accessibility requirements (AA or AAA)
- Light mode only, dark mode only, or both
- Product context (marketing site, app, dashboard, etc.)

## Outputs

### Semantic Token Structure

```
colors/
├── primitive/          # Raw color values
│   ├── blue-50...900
│   ├── neutral-50...900
│   └── ...
├── semantic/           # Meaning-based tokens
│   ├── primary/
│   │   ├── default
│   │   ├── hover
│   │   ├── active
│   │   └── disabled
│   ├── secondary/
│   ├── success/
│   ├── warning/
│   ├── danger/
│   └── neutral/
├── component/          # Component-specific tokens
│   ├── button-primary-bg
│   ├── input-border
│   └── ...
└── surface/            # Background layers
    ├── page
    ├── card
    ├── elevated
    └── overlay
```

### Deliverables

| Deliverable | Format |
|-------------|--------|
| Token definitions | CSS custom properties, Tailwind config, or Figma variables |
| Contrast matrix | Table showing all text/background combinations with WCAG ratings |
| Usage guidelines | When to use each semantic color |
| Dark mode mapping | How tokens translate between modes |
| Gradient definitions | If applicable, with usage rules |

## Accessibility Requirements

- **Text on backgrounds:** Minimum 4.5:1 (AA) or 7:1 (AAA)
- **Large text:** Minimum 3:1 (AA) or 4.5:1 (AAA)
- **UI components:** Minimum 3:1 against adjacent colors
- **Focus indicators:** Minimum 3:1 against background

## Example Prompts

```
"Act as Color Palette Master. Generate a full color system starting 
from brand blue #2563EB. Need light and dark modes, WCAG AA compliant."

"As Color Palette Master, audit this palette for accessibility issues 
and propose fixes that maintain brand recognition."
```
