# Synchronicity Design System

A contemplative design system for mindful applications. Born from I Ching divination practice, crafted for React Native.

**[📖 Documentation](https://synchronicity-ds.vercel.app/)** • **[🎨 Components](https://synchronicity-ds.vercel.app/components/)** • **[🧭 Foundations](https://synchronicity-ds.vercel.app/foundations/overview/)**

---

## Features

- **45 Production-Ready Components** – From foundational UI to specialized I Ching divination tools
- **Three Contemplative Themes** – Light (warm cream), Dark (deep void), True Black (pure OLED)
- **React Native First** – Built with Animated API, mobile-optimized, TypeScript-powered
- **Accessible by Default** – WCAG AA contrast ratios, screen reader support, inclusive design
- **I Ching Specific** – Hexagram rendering, coin casting animations, trigram systems, reading cards
- **Design Tokens** – Primitive → Semantic → Component token architecture

---

## Quick Start

### Installation

> **Note:** The npm package is not yet published. The component library is currently in active development.

For now, you can explore the [documentation](https://synchronicity-ds.vercel.app/) and [design tokens](https://synchronicity-ds.vercel.app/tokens/architecture/).

Once published, installation will be:

```bash
# Install the React Native package (coming soon)
npm install @synchronicity/react-native
```

### Basic Usage

```tsx
import { Button, Card, HexagramVisual } from '@synchronicity/react-native';

function App() {
  return (
    <Card variant="elevated">
      <HexagramVisual
        lines={['yang', 'yin', 'yang', 'yin', 'yang', 'yin']}
        size="large"
      />
      <Button variant="primary" onPress={() => console.log('Cast')}>
        Cast Hexagram
      </Button>
    </Card>
  );
}
```

---

## Repository Structure

```
synchronicity-design-system/
├── apps/
│   └── docs/          # Starlight documentation site
├── packages/
│   ├── react-native/  # React Native component library
│   └── tokens/        # Design tokens (JSON)
└── README.md
```

---

## Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Clone the repository
git clone https://github.com/lucadebort/synchronicity-ds.git
cd synchronicity-ds

# Install dependencies
pnpm install

# Build design tokens
pnpm --filter @synchronicity/tokens build

# Start documentation site
pnpm --filter @synchronicity/docs dev
```

### Available Scripts

```bash
# Build all packages
pnpm build

# Run documentation site locally
pnpm --filter @synchronicity/docs dev

# Build documentation for production
pnpm --filter @synchronicity/docs build

# Generate Storybook stories
pnpm --filter @synchronicity/react-native storybook-generate
```

---

## Philosophy

### Intentional Simplicity
Every element earns its place. Remove noise, let content breathe.

### Warm Luminosity
Gold (#d4af37) as the sacred accent—drawing attention with warmth, not aggression.

### Rhythmic Motion
Animations follow breathing patterns (400-600ms). Organic transitions, never mechanical.

### Inclusive Design
WCAG AA is the baseline. Every color tested, every interaction accessible.

---

## Component Categories

- **Actions & Buttons** (7) – Button, IconButton, FloatingActionButton, Link
- **Form Inputs** (11) – Input, TextArea, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker
- **Navigation** (10) – TabBar, Tabs, SegmentedControl, Breadcrumb, Stepper
- **Overlays & Modals** (8) – Modal, BottomSheet, ActionSheet, Drawer, Popover, Tooltip
- **Feedback & Status** (12) – Toast, Alert, Banner, Spinner, ProgressBar, Skeleton
- **Layout & Structure** (6) – Card, Divider, Accordion, Collapsible, List, ScreenContainer
- **I Ching Specific** (6) – HexagramVisual, ThreeCoins, TrigramCard, TrigramDrawingCanvas, ReadingListItem

---

## Design Tokens

Three-tier token architecture:

1. **Primitives** – Raw values (colors, spacing, typography scales)
2. **Semantic** – Contextual tokens (background.primary, text.body, spacing.md)
3. **Component** – Component-specific overrides (button.padding, card.radius)

All tokens support light, dark, and true-black themes.

---

## I Ching Components

The only design system built for contemplative practice.

```tsx
import { ThreeCoins, HexagramVisual, TrigramCard } from '@synchronicity/react-native';

// Coin casting with physics
<ThreeCoins
  throwing={isThrowing}
  onThrowComplete={(result) => setLines([...lines, result.lineType])}
  showValue
/>

// Hexagram display with changing lines
<HexagramVisual
  lines={lines}
  changingLines={[2, 5]}
  size="large"
/>

// Trigram flashcards
<TrigramCard trigram="qian" />
```

---

## Contributing

This is a personal project, but suggestions and feedback are welcome. Please open an issue to discuss major changes.

---

## License

MIT License - see LICENSE file for details

---

## Links

- **Documentation:** https://synchronicity-ds.vercel.app/
- **GitHub:** https://github.com/lucadebort/synchronicity-ds
- **NPM Package:** @synchronicity/react-native (coming soon)

---

Built with intention. Designed for clarity. Created for mindful experiences.
