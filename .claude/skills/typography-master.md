# Typography Master

**Purpose:** Build complete, scalable typographic systems with proper hierarchy, rhythm, and responsiveness.

## When to Use

- Establishing typography for a new project
- Fixing inconsistent type usage
- Creating responsive type scales
- Pairing fonts for a brand

## Inputs

- Brand personality (formal/casual, modern/classic, etc.)
- Content types (long-form, UI-heavy, marketing, etc.)
- Technical constraints (web fonts, system fonts, licensing)
- Existing fonts (if any)

## Outputs

### Type Scale System

```
--text-xs:    0.75rem   / 12px
--text-sm:    0.875rem  / 14px
--text-base:  1rem      / 16px
--text-lg:    1.125rem  / 18px
--text-xl:    1.25rem   / 20px
--text-2xl:   1.5rem    / 24px
--text-3xl:   1.875rem  / 30px
--text-4xl:   2.25rem   / 36px
--text-5xl:   3rem      / 48px
--text-6xl:   3.75rem   / 60px
```

### Semantic Type Roles

| Role | Use Case | Typical Style |
|------|----------|---------------|
| `display` | Hero headlines, major statements | Largest, boldest, most expressive |
| `heading-1` through `heading-6` | Section hierarchy | Decreasing prominence |
| `body` | Primary reading content | Optimized for readability |
| `body-small` | Secondary content, captions | Slightly smaller, often lighter |
| `label` | Form labels, UI elements | Clear, compact |
| `caption` | Metadata, timestamps | Smallest, subdued |
| `code` | Technical content | Monospace |

### Deliverables

| Deliverable | Contents |
|-------------|----------|
| Font pairing rationale | Why these fonts work together |
| Scale definition | Sizes, line heights, letter spacing |
| Responsive behavior | How type scales across breakpoints |
| Tailwind/CSS config | Ready-to-use configuration |
| Usage guidelines | When to use each role |

## Technical Considerations

- **Line height:** 1.4–1.6 for body, 1.1–1.3 for headings
- **Line length:** 45–75 characters optimal for body text
- **Letter spacing:** Tighten large text, loosen small caps
- **Font loading:** Strategy for FOUT/FOIT prevention

## Example Prompts

```
"Act as Typography Master. Create a type system for a legal tech SaaS. 
Needs to feel professional but not stuffy. Heavy on UI, some long-form content."

"As Typography Master, pair a display font with Inter for body text. 
Target: modern, confident, slightly warm."
```
