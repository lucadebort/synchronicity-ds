import React from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type TrigramName =
  | 'heaven'
  | 'earth'
  | 'thunder'
  | 'water'
  | 'mountain'
  | 'wind'
  | 'fire'
  | 'lake';

export type TrigramLines = [boolean, boolean, boolean]; // [bottom, middle, top], true = yang

export interface TrigramVisualProps {
  /** Trigram by name */
  name?: TrigramName;
  /** Or specify lines directly: [bottom, middle, top], true = yang */
  lines?: TrigramLines;
  /** Size of the trigram */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the trigram label */
  showLabel?: boolean;
  /** Whether to show the Chinese character */
  showChinese?: boolean;
  /** Custom label color */
  labelColor?: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

const TRIGRAM_DATA: Record<
  TrigramName,
  { lines: TrigramLines; chinese: string; symbol: string }
> = {
  heaven: { lines: [true, true, true], chinese: '乾', symbol: '☰' },
  earth: { lines: [false, false, false], chinese: '坤', symbol: '☷' },
  thunder: { lines: [true, false, false], chinese: '震', symbol: '☳' },
  water: { lines: [false, true, false], chinese: '坎', symbol: '☵' },
  mountain: { lines: [true, false, false], chinese: '艮', symbol: '☶' },
  wind: { lines: [true, true, false], chinese: '巽', symbol: '☴' },
  fire: { lines: [true, false, true], chinese: '離', symbol: '☲' },
  lake: { lines: [false, true, true], chinese: '兌', symbol: '☱' },
};

/**
 * TrigramVisual - Renders a single I Ching trigram (3 lines)
 *
 * @example
 * ```tsx
 * <TrigramVisual name="heaven" showLabel />
 * <TrigramVisual lines={[true, false, true]} />
 * ```
 */
export function TrigramVisual({
  name,
  lines: linesProp,
  size = 'md',
  showLabel = false,
  showChinese = false,
  labelColor,
  style,
}: TrigramVisualProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const sizeConfig = {
    sm: { lineHeight: 3, lineGap: 3, breakGap: 5, width: 32, fontSize: 10 },
    md: { lineHeight: 5, lineGap: 5, breakGap: 7, width: 48, fontSize: 12 },
    lg: { lineHeight: 7, lineGap: 7, breakGap: 9, width: 64, fontSize: 14 },
  };

  const config = sizeConfig[size];

  const trigramData = name ? TRIGRAM_DATA[name] : null;
  const lines = linesProp || trigramData?.lines || [false, false, false];
  const displayName = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : undefined;

  const lineColor = colors['text-primary'];

  const renderLine = (isYang: boolean, index: number) => {
    if (isYang) {
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

  // Render from top to bottom (reverse the array since lines are bottom-to-top)
  const reversedLines = [...lines].reverse();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.linesContainer, { gap: config.lineGap }]}>
        {reversedLines.map((isYang, index) => renderLine(isYang, index))}
      </View>
      {(showLabel || showChinese) && (
        <View style={styles.labelContainer}>
          {showChinese && trigramData && (
            <Text
              style={[
                styles.chinese,
                {
                  ...theme.typography['type-body-md'],
                  color: labelColor || colors['text-secondary'],
                  fontSize: config.fontSize + 4,
                },
              ]}
            >
              {trigramData.chinese}
            </Text>
          )}
          {showLabel && displayName && (
            <Text
              style={[
                styles.label,
                {
                  ...theme.typography['type-body-sm'],
                  color: labelColor || colors['text-tertiary'],
                  fontSize: config.fontSize,
                },
              ]}
            >
              {displayName}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

/**
 * TrigramPair - Shows upper and lower trigrams with labels
 */
export interface TrigramPairProps {
  /** Upper trigram name */
  upper: TrigramName;
  /** Lower trigram name */
  lower: TrigramName;
  /** Size of the trigrams */
  size?: 'sm' | 'md' | 'lg';
  /** Show trigram labels */
  showLabels?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
}

export function TrigramPair({
  upper,
  lower,
  size = 'md',
  showLabels = true,
  style,
}: TrigramPairProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const sizeConfig = {
    sm: { gap: 16, fontSize: 10 },
    md: { gap: 24, fontSize: 12 },
    lg: { gap: 32, fontSize: 14 },
  };

  const config = sizeConfig[size];

  return (
    <View style={[styles.pairContainer, style]}>
      <View style={styles.trigramSection}>
        {showLabels && (
          <Text
            style={[
              styles.sectionLabel,
              {
                ...theme.typography['type-label-sm'],
                color: colors['text-tertiary'],
                fontSize: config.fontSize,
              },
            ]}
          >
            Upper
          </Text>
        )}
        <TrigramVisual name={upper} size={size} showLabel showChinese />
      </View>
      <View style={{ height: config.gap }} />
      <View style={styles.trigramSection}>
        {showLabels && (
          <Text
            style={[
              styles.sectionLabel,
              {
                ...theme.typography['type-label-sm'],
                color: colors['text-tertiary'],
                fontSize: config.fontSize,
              },
            ]}
          >
            Lower
          </Text>
        )}
        <TrigramVisual name={lower} size={size} showLabel showChinese />
      </View>
    </View>
  );
}

/**
 * TrigramGrid - Shows all 8 trigrams in a grid
 */
export interface TrigramGridProps {
  /** Size of each trigram */
  size?: 'sm' | 'md';
  /** Number of columns */
  columns?: 4 | 8;
  /** Handler when a trigram is selected */
  onSelect?: (name: TrigramName) => void;
  /** Currently selected trigram */
  selected?: TrigramName;
  /** Custom style overrides */
  style?: ViewStyle;
}

export function TrigramGrid({
  size = 'sm',
  columns = 4,
  onSelect,
  selected,
  style,
}: TrigramGridProps) {
  const colors = useColors();

  const trigrams: TrigramName[] = [
    'heaven',
    'lake',
    'fire',
    'thunder',
    'wind',
    'water',
    'mountain',
    'earth',
  ];

  return (
    <View
      style={[
        styles.grid,
        { flexWrap: 'wrap' },
        style,
      ]}
    >
      {trigrams.map((name) => (
        <View
          key={name}
          style={[
            styles.gridItem,
            { width: `${100 / columns}%` },
            selected === name && {
              backgroundColor: colors['gold-muted'],
              borderRadius: 8,
            },
          ]}
        >
          <TrigramVisual
            name={name}
            size={size}
            showLabel
            labelColor={selected === name ? colors['gold-primary'] : undefined}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  linesContainer: {
    alignItems: 'center',
  },
  line: {},
  yinLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  chinese: {
    lineHeight: 24,
  },
  label: {
    marginTop: 2,
  },
  pairContainer: {
    alignItems: 'center',
  },
  trigramSection: {
    alignItems: 'center',
  },
  sectionLabel: {
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  grid: {
    flexDirection: 'row',
  },
  gridItem: {
    padding: 12,
    alignItems: 'center',
  },
});
