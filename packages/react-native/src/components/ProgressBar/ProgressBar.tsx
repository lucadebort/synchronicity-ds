import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, type ViewStyle } from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'gold';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  /** Progress value from 0 to 100 */
  value: number;
  /** Visual variant */
  variant?: ProgressBarVariant;
  /** Size of the bar */
  size?: ProgressBarSize;
  /** Animate value changes */
  animated?: boolean;
  /** Show indeterminate loading state */
  indeterminate?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * ProgressBar - Linear progress indicator
 *
 * @example
 * ```tsx
 * <ProgressBar value={75} />
 * <ProgressBar value={100} variant="success" />
 * <ProgressBar indeterminate variant="gold" />
 * ```
 */
export function ProgressBar({
  value,
  variant = 'default',
  size = 'md',
  animated = true,
  indeterminate = false,
  style,
  accessibilityLabel = 'Progress',
}: ProgressBarProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const indeterminateAnim = useRef(new Animated.Value(0)).current;

  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));

  useEffect(() => {
    if (animated && !indeterminate) {
      Animated.timing(animatedValue, {
        toValue: clampedValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(clampedValue);
    }
  }, [clampedValue, animated, indeterminate, animatedValue]);

  useEffect(() => {
    if (indeterminate) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(indeterminateAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(indeterminateAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [indeterminate, indeterminateAnim]);

  const sizeConfig = {
    sm: { height: 4, radius: 2 },
    md: { height: 8, radius: 4 },
    lg: { height: 12, radius: 6 },
  };

  const currentSize = sizeConfig[size];

  const getColor = () => {
    switch (variant) {
      case 'success':
        return colors['support-success'];
      case 'warning':
        return colors['support-warning'];
      case 'gold':
        return colors['gold-primary'];
      case 'default':
      default:
        return colors['interactive-primary'];
    }
  };

  const progressWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const indeterminateLeft = indeterminateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '70%'],
  });

  const indeterminateWidth = indeterminateAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['30%', '50%', '30%'],
  });

  return (
    <View
      style={[
        styles.track,
        {
          height: currentSize.height,
          borderRadius: currentSize.radius,
          backgroundColor: colors['surface-elevated'],
        },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{
        min: 0,
        max: 100,
        now: indeterminate ? undefined : clampedValue,
      }}
    >
      {indeterminate ? (
        <Animated.View
          style={[
            styles.fill,
            {
              height: currentSize.height,
              borderRadius: currentSize.radius,
              backgroundColor: getColor(),
              left: indeterminateLeft,
              width: indeterminateWidth,
            },
          ]}
        />
      ) : (
        <Animated.View
          style={[
            styles.fill,
            {
              height: currentSize.height,
              borderRadius: currentSize.radius,
              backgroundColor: getColor(),
              width: progressWidth,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
