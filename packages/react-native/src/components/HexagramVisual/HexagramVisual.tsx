import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useColors } from '../../hooks/useTheme';

export type LineType = 'yang' | 'yin' | 'changing-yang' | 'changing-yin';

export interface HexagramVisualProps {
  /** Array of 6 line types from bottom to top */
  lines: LineType[];
  /** Size of the hexagram */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to show the changing lines with animation */
  animated?: boolean;
  /** Show the transformed hexagram instead of the primary */
  showTransformed?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * HexagramVisual - Renders an I Ching hexagram with 6 lines
 *
 * @example
 * ```tsx
 * <HexagramVisual
 *   lines={['yang', 'yin', 'changing-yang', 'yin', 'yang', 'yang']}
 *   size="lg"
 * />
 * ```
 */
export function HexagramVisual({
  lines,
  size = 'md',
  animated = false,
  showTransformed = false,
  style,
  accessibilityLabel,
}: HexagramVisualProps) {
  const colors = useColors();

  const sizeConfig = {
    sm: { lineHeight: 4, lineGap: 4, breakGap: 6, width: 40 },
    md: { lineHeight: 6, lineGap: 6, breakGap: 8, width: 60 },
    lg: { lineHeight: 8, lineGap: 8, breakGap: 10, width: 80 },
    xl: { lineHeight: 10, lineGap: 10, breakGap: 12, width: 100 },
  };

  const config = sizeConfig[size];

  const getDisplayLine = (line: LineType): 'yang' | 'yin' => {
    if (showTransformed) {
      if (line === 'changing-yang') return 'yin';
      if (line === 'changing-yin') return 'yang';
    }
    return line === 'yang' || line === 'changing-yang' ? 'yang' : 'yin';
  };

  const isChanging = (line: LineType): boolean => {
    return line === 'changing-yang' || line === 'changing-yin';
  };

  const renderLine = (line: LineType, index: number) => {
    const displayLine = getDisplayLine(line);
    const changing = isChanging(line);
    const lineColor = changing ? colors['gold-primary'] : colors['text-primary'];

    if (displayLine === 'yang') {
      // Solid line
      return (
        <View
          key={index}
          style={[
            styles.line,
            {
              height: config.lineHeight,
              width: config.width,
              backgroundColor: lineColor,
              borderRadius: config.lineHeight / 2,
            },
          ]}
        />
      );
    }

    // Broken line (yin)
    const segmentWidth = (config.width - config.breakGap) / 2;
    return (
      <View key={index} style={[styles.yinLine, { width: config.width }]}>
        <View
          style={[
            styles.line,
            {
              height: config.lineHeight,
              width: segmentWidth,
              backgroundColor: lineColor,
              borderRadius: config.lineHeight / 2,
            },
          ]}
        />
        <View style={{ width: config.breakGap }} />
        <View
          style={[
            styles.line,
            {
              height: config.lineHeight,
              width: segmentWidth,
              backgroundColor: lineColor,
              borderRadius: config.lineHeight / 2,
            },
          ]}
        />
      </View>
    );
  };

  // Lines are rendered from bottom (index 0) to top (index 5)
  const reversedLines = [...lines].reverse();

  return (
    <View
      style={[styles.container, { gap: config.lineGap }, style]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
    >
      {reversedLines.map((line, index) => renderLine(line, index))}
    </View>
  );
}

/**
 * HexagramPair - Shows primary and transformed hexagram side by side
 */
export interface HexagramPairProps {
  /** Array of 6 line types from bottom to top */
  lines: LineType[];
  /** Size of each hexagram */
  size?: 'sm' | 'md' | 'lg';
  /** Gap between the two hexagrams */
  gap?: number;
  /** Custom style overrides */
  style?: ViewStyle;
}

export function HexagramPair({
  lines,
  size = 'md',
  gap = 24,
  style,
}: HexagramPairProps) {
  const hasChangingLines = lines.some(
    (l) => l === 'changing-yang' || l === 'changing-yin'
  );

  if (!hasChangingLines) {
    return <HexagramVisual lines={lines} size={size} style={style} />;
  }

  return (
    <View style={[styles.pairContainer, { gap }, style]}>
      <HexagramVisual
        lines={lines}
        size={size}
        accessibilityLabel="Primary hexagram"
      />
      <View style={styles.arrow}>
        <View style={styles.arrowLine} />
        <View style={styles.arrowHead} />
      </View>
      <HexagramVisual
        lines={lines}
        size={size}
        showTransformed
        accessibilityLabel="Transformed hexagram"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {},
  yinLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pairContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowLine: {
    width: 16,
    height: 2,
    backgroundColor: '#666',
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#666',
  },
});
