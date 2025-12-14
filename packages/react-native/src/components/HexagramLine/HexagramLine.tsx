import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, type ViewStyle, Pressable, Text } from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type LineValue = 6 | 7 | 8 | 9;
export type LineNature = 'yang' | 'yin' | 'changing-yang' | 'changing-yin';

export interface HexagramLineProps {
  /** Line value (6=old yin, 7=yang, 8=yin, 9=old yang) */
  value: LineValue;
  /** Size of the line */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the line number */
  showNumber?: boolean;
  /** Line position (1-6 from bottom) */
  position?: number;
  /** Whether this line is highlighted/selected */
  highlighted?: boolean;
  /** Whether to animate changing lines */
  animated?: boolean;
  /** Show the transformed state for changing lines */
  showTransformed?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * HexagramLine - A single line of a hexagram with optional interactivity
 *
 * Line values follow the traditional I Ching numbering:
 * - 6: Old Yin (changing yin → yang)
 * - 7: Young Yang (stable)
 * - 8: Young Yin (stable)
 * - 9: Old Yang (changing yang → yin)
 *
 * @example
 * ```tsx
 * <HexagramLine value={9} position={1} showNumber />
 * <HexagramLine value={6} animated showTransformed />
 * ```
 */
export function HexagramLine({
  value,
  size = 'md',
  showNumber = false,
  position,
  highlighted = false,
  animated = false,
  showTransformed = false,
  onPress,
  style,
}: HexagramLineProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const animValue = useRef(new Animated.Value(0)).current;

  const sizeConfig = {
    sm: { lineHeight: 4, breakGap: 6, width: 48, fontSize: 10 },
    md: { lineHeight: 6, breakGap: 8, width: 72, fontSize: 12 },
    lg: { lineHeight: 8, breakGap: 10, width: 96, fontSize: 14 },
  };

  const config = sizeConfig[size];

  const getLineNature = (v: LineValue): LineNature => {
    switch (v) {
      case 6:
        return 'changing-yin';
      case 7:
        return 'yang';
      case 8:
        return 'yin';
      case 9:
        return 'changing-yang';
    }
  };

  const nature = getLineNature(value);
  const isChanging = value === 6 || value === 9;

  useEffect(() => {
    if (animated && isChanging) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animated, isChanging, animValue]);

  const getDisplayNature = (): 'yang' | 'yin' => {
    if (showTransformed && isChanging) {
      return nature === 'changing-yang' ? 'yin' : 'yang';
    }
    return nature === 'yang' || nature === 'changing-yang' ? 'yang' : 'yin';
  };

  const displayNature = getDisplayNature();

  const lineColor = isChanging
    ? colors['gold-primary']
    : highlighted
    ? colors['gold-primary']
    : colors['text-primary'];

  const opacity = animated && isChanging
    ? animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.4],
      })
    : 1;

  const renderLine = () => {
    if (displayNature === 'yang') {
      return (
        <Animated.View
          style={[
            styles.solidLine,
            {
              height: config.lineHeight,
              width: config.width,
              backgroundColor: lineColor,
              borderRadius: config.lineHeight / 2,
              opacity,
            },
          ]}
        />
      );
    }

    const segmentWidth = (config.width - config.breakGap) / 2;
    return (
      <View style={[styles.brokenLine, { width: config.width }]}>
        <Animated.View
          style={[
            styles.segment,
            {
              height: config.lineHeight,
              width: segmentWidth,
              backgroundColor: lineColor,
              borderRadius: config.lineHeight / 2,
              opacity,
            },
          ]}
        />
        <View style={{ width: config.breakGap }} />
        <Animated.View
          style={[
            styles.segment,
            {
              height: config.lineHeight,
              width: segmentWidth,
              backgroundColor: lineColor,
              borderRadius: config.lineHeight / 2,
              opacity,
            },
          ]}
        />
      </View>
    );
  };

  const content = (
    <View style={[styles.container, style]}>
      {showNumber && position && (
        <Text
          style={[
            styles.number,
            {
              ...theme.typography['type-body-sm'],
              color: colors['text-tertiary'],
              fontSize: config.fontSize,
            },
          ]}
        >
          {position}
        </Text>
      )}
      {renderLine()}
      {isChanging && (
        <View
          style={[
            styles.changingIndicator,
            { backgroundColor: colors['gold-muted'] },
          ]}
        >
          <Text
            style={[
              styles.changingText,
              {
                ...theme.typography['type-caption'],
                color: colors['gold-primary'],
              },
            ]}
          >
            {value === 9 ? '○' : '×'}
          </Text>
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button">
        {content}
      </Pressable>
    );
  }

  return content;
}

/**
 * LineStack - Renders multiple lines stacked vertically
 */
export interface LineStackProps {
  /** Array of line values from bottom to top */
  values: LineValue[];
  /** Size of the lines */
  size?: 'sm' | 'md' | 'lg';
  /** Gap between lines */
  gap?: number;
  /** Show line position numbers */
  showNumbers?: boolean;
  /** Handler when a line is pressed */
  onLinePress?: (index: number, value: LineValue) => void;
  /** Custom style overrides */
  style?: ViewStyle;
}

export function LineStack({
  values,
  size = 'md',
  gap = 6,
  showNumbers = false,
  onLinePress,
  style,
}: LineStackProps) {
  const reversedValues = [...values].reverse();

  return (
    <View style={[styles.stack, { gap }, style]}>
      {reversedValues.map((value, index) => {
        const position = values.length - index;
        return (
          <HexagramLine
            key={index}
            value={value}
            size={size}
            position={position}
            showNumber={showNumbers}
            onPress={onLinePress ? () => onLinePress(position - 1, value) : undefined}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  solidLine: {},
  brokenLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segment: {},
  number: {
    width: 16,
    textAlign: 'right',
  },
  changingIndicator: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  changingText: {
    fontWeight: '600',
  },
  stack: {
    alignItems: 'center',
  },
});
