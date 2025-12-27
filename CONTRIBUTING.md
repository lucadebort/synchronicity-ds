# Contributing to Synchronicity Design System

Thank you for your interest in contributing! This document provides guidelines for contributing to the design system.

## Component Lifecycle

Components follow a clear lifecycle from draft to stable:

### Stages

- **🟢 Stable** - Production ready, semantic versioning applies
- **🟡 Beta** - API stable, user testing in progress
- **🔵 Alpha** - Feature complete, API may change
- **⚪ Draft** - In development, API unstable
- **🔴 Deprecated** - Will be removed, use alternative

### Status in Documentation

Each component doc includes a status indicator:

```mdx
---
title: Button
status: stable
version: 2.1.0
since: 1.0.0
deprecated: false
---
```

## Code Standards

### TypeScript Requirements

- 100% type coverage required
- All props documented with JSDoc
- Explicit return types for public APIs
- No `any` types (use `unknown` if necessary)

### Component Standards

```typescript
interface ComponentProps {
  /** Always document props with JSDoc */
  variant?: 'primary' | 'secondary'; // Use enums, not strings
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean; // Boolean props for binary states
  children: ReactNode; // Required props have no ?
  style?: ViewStyle; // Escape hatch
  testID?: string; // Always include for testing
}
```

### Design Token Usage

**✅ DO:**
```typescript
backgroundColor: colors['surface-elevated']
padding: spacing['inset-md']
```

**❌ DON'T:**
```typescript
backgroundColor: '#ffffff'
padding: 16
```

All values must use design tokens. No hardcoded values.

### Accessibility Requirements

All components must meet these standards:

- WCAG 2.1 AA minimum
- Touch targets ≥ 44×44pt
- Screen reader support with proper roles
- Keyboard navigation where applicable
- Focus indicators visible (2px outline)
- Color contrast tested across all themes

## Component Proposal Process

### 1. Create RFC Issue

Use the "Component Proposal" template:

- Component name and purpose
- Use cases and examples
- Similar components in other design systems
- Proposed API design
- Accessibility considerations

### 2. Design Review

Core team reviews:
- API design consistency
- Token usage
- Accessibility patterns
- Performance implications

### 3. Implementation

Create feature branch:
```bash
git checkout -b component/component-name
```

Build component with:
- TypeScript implementation
- Design token integration
- Accessibility attributes
- All required variants/states

### 4. Documentation

Required sections:
- Overview (what it is, when to use)
- Anatomy diagram
- Variants & states table
- Usage guidelines (Do/Don't)
- Accessibility section
- Code examples (3+ use cases)

### 5. Testing

Add tests for:
- All variant combinations
- Accessibility attributes
- Touch target sizes
- Keyboard interactions
- Theme switching

### 6. Approval

Final review checklist:
- [ ] Tests passing
- [ ] Documentation complete
- [ ] Accessibility audit
- [ ] No console warnings
- [ ] Cross-platform tested (iOS + Android)

## Pull Request Requirements

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New component
- [ ] Bug fix
- [ ] Enhancement
- [ ] Breaking change
- [ ] Documentation

## Checklist
- [ ] Tests added/updated
- [ ] Documentation added/updated
- [ ] Accessibility tested
- [ ] Design tokens used (no hardcoded values)
- [ ] Changelog entry added
- [ ] Cross-platform tested

## Screenshots
(if applicable)
```

### Commit Message Format

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (not visual style)
- `refactor`: Code restructure
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```
feat(button): add loading state with spinner
fix(alert): use semantic tokens instead of hardcoded colors
docs(tokens): add token architecture diagram
```

## Development Workflow

### Setup

```bash
# Clone repository
git clone https://github.com/lucadebort/synchronicity-ds.git
cd synchronicity-ds

# Install dependencies
pnpm install

# Build tokens first
pnpm --filter @synchronicity/tokens build

# Start docs site
pnpm --filter @synchronicity/docs dev
```

### Development Commands

```bash
# Build all packages
pnpm build

# Run type checking
pnpm typecheck

# Run tests
pnpm test

# Generate Storybook stories
pnpm --filter @synchronicity/react-native storybook-generate
```

### Creating a New Component

```bash
# Use component generator (coming soon)
pnpm create-component ComponentName

# Or manually create:
packages/react-native/src/components/ComponentName/
├── ComponentName.tsx
├── index.ts
└── __tests__/
    └── ComponentName.test.tsx
```

## Design Token Guidelines

### Adding New Tokens

Tokens follow a 3-tier architecture:

```
Primitives → Semantic → Component
```

**Example flow:**
```typescript
// 1. Primitive (raw value)
const blue = { 'blue-500': '#3b82f6' };

// 2. Semantic (contextual meaning)
const colors = { 'interactive-primary': blue['blue-500'] };

// 3. Component (specific use)
const button = { 'button-primary-bg': colors['interactive-primary'] };
```

### Token Naming Conventions

| Category | Pattern | Example |
|----------|---------|---------|
| Color | `{context}-{variant}` | `surface-elevated` |
| Typography | `{property}-{scale}` | `font-size-lg` |
| Spacing | `{context}-{scale}` | `spacing-inset-md` |
| Radius | `{context}` | `radius-interactive` |
| Motion | `motion-{speed}` | `motion-fast` |

## Release Process

### Before Release

- [ ] All tests passing
- [ ] No console warnings
- [ ] Documentation up to date
- [ ] CHANGELOG updated
- [ ] Version bumped (using Changesets)
- [ ] Breaking changes documented

### Accessibility Audit

- [ ] VoiceOver tested (iOS)
- [ ] TalkBack tested (Android)
- [ ] Color contrast validated (all themes)
- [ ] Touch targets verified (≥44×44pt)
- [ ] Keyboard navigation tested
- [ ] Reduced motion tested

### Cross-platform Testing

- [ ] iOS Simulator
- [ ] Android Emulator
- [ ] Physical iOS device
- [ ] Physical Android device

## Questions?

- 📖 Check [Documentation](https://synchronicity-ds.vercel.app/)
- 💬 Open a [Discussion](https://github.com/lucadebort/synchronicity-ds/discussions)
- 🐛 Report bugs via [Issues](https://github.com/lucadebort/synchronicity-ds/issues)

---

Built with intention. Designed for clarity. Created for mindful experiences.
