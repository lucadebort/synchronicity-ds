# @synchronicity/react-native

> **Coming Soon** - This package is currently in active development and not yet published to npm.

React Native component library for the Synchronicity Design System.

## About

A contemplative design system for mindful applications. Born from I Ching divination practice, crafted for React Native.

- **45 Production-Ready Components** – From foundational UI to specialized I Ching divination tools
- **Three Contemplative Themes** – Light (warm cream), Dark (deep void), True Black (pure OLED)
- **Accessible by Default** – WCAG AA contrast ratios, screen reader support
- **TypeScript First** – Full type safety and autocomplete

## Documentation

For comprehensive documentation, visit [synchronicity-ds.vercel.app](https://synchronicity-ds.vercel.app/)

- [Getting Started](https://synchronicity-ds.vercel.app/getting-started/introduction/)
- [Components](https://synchronicity-ds.vercel.app/components/)
- [Foundations](https://synchronicity-ds.vercel.app/foundations/overview/)
- [Design Tokens](https://synchronicity-ds.vercel.app/tokens/architecture/)

## Installation (Coming Soon)

```bash
npm install @synchronicity/react-native
```

## Basic Usage (Preview)

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

## License

MIT
