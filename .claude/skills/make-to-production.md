# Make to Production

**Purpose:** Transform design tool exports (Figma Make, AI-generated code, prototypes) into production-grade, deployable code — using whatever stack fits the project.

## When to Use

- After exporting from Figma Make/Dev Mode
- Converting prototypes to production code
- Cleaning up AI-generated code
- When code "works" but isn't production-ready

## Prerequisites

Before transforming code, the **stack should be decided** (by Frontend Architect or prior agreement). This skill adapts to the chosen framework:

| If using... | I'll produce... |
|-------------|-----------------|
| Next.js | App Router components, server/client boundaries |
| Astro | `.astro` components, islands for interactivity |
| SvelteKit | Svelte components, load functions |
| Vite + React | React components, client-side routing |
| Plain HTML/CSS | Semantic HTML, CSS custom properties |

## The Problem with Generated Code

Typical issues in Make/AI exports:
- Inline styles instead of design tokens
- Div soup (non-semantic HTML)
- No component boundaries
- Hardcoded values
- Missing accessibility
- No responsive behavior
- Everything in one file
- Framework-specific anti-patterns

## Transformation Process

### Phase 1: Audit

1. Inventory all elements and their styling
2. Identify repeated patterns → future components
3. Extract color values → map to tokens
4. Extract spacing values → map to scale
5. Note accessibility issues (missing labels, contrast, etc.)

### Phase 2: Tokenize

Convert hardcoded values to design tokens:

```css
/* Before */
color: #2563eb;
padding: 12px 24px;
border-radius: 8px;

/* After */
color: var(--color-primary);
padding: var(--space-3) var(--space-6);
border-radius: var(--radius-md);
```

### Phase 3: Componentize

Break monolithic output into logical components:

```
Hero Section → <Hero>, <HeroHeadline>, <HeroCTA>
Feature Grid → <FeatureGrid>, <FeatureCard>
Testimonials → <TestimonialCarousel>, <TestimonialCard>
```

### Phase 4: Semanticize

Replace divs with appropriate HTML:

```html
<!-- Before -->
<div class="nav">
  <div class="nav-item">...</div>
</div>

<!-- After -->
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/">...</a></li>
  </ul>
</nav>
```

### Phase 5: Optimize

- Implement responsive behavior
- Add loading states
- Optimize images (framework-specific: `next/image`, `<Image />` in Astro, etc.)
- Add proper meta tags / SEO
- Implement error boundaries (where applicable)
- Add `prefers-reduced-motion` support
- Apply framework-specific performance patterns

## Output Checklist

- [ ] No inline styles (all Tailwind/CSS Modules/custom properties)
- [ ] Semantic HTML throughout
- [ ] Components properly separated per framework conventions
- [ ] Design tokens implemented
- [ ] Responsive at all breakpoints
- [ ] Accessibility audit passed
- [ ] Performance optimized (LCP < 2.5s, CLS < 0.1)
- [ ] Framework best practices followed
- [ ] Ready for deployment

## Example Prompts

```
"Act as Make to Production. Here's the export from Figma Make [code]. 
We're using Astro with React islands. Transform it."

"As Make to Production, audit this generated code and give me a 
prioritized list of what needs to be fixed."

"Act as Make to Production. Convert this prototype to clean Svelte 
components following SvelteKit conventions."

"As Make to Production, I have this AI-generated React component. 
Clean it up for production — we use Tailwind and TypeScript."
```
