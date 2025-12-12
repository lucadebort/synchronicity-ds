import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors } from '../../hooks/useTheme';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Spinner color */
  color?: string;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * Spinner - Loading indicator
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" color="#d4af37" />
 * ```
 */
export function Spinner({
  size = 'md',
  color,
  style,
  accessibilityLabel = 'Loading',
}: SpinnerProps) {
  const colors = useColors();
  const rotation = useRef(new Animated.Value(0)).current;

  const sizeConfig = {
    sm: { size: 16, borderWidth: 2 },
    md: { size: 24, borderWidth: 2.5 },
    lg: { size: 32, borderWidth: 3 },
    xl: { size: 48, borderWidth: 4 },
  };

  const currentSize = sizeConfig[size];
  const spinnerColor = color || colors['gold-primary'];

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();

    return () => animation.stop();
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View
        style={[
          styles.spinner,
          {
            width: currentSize.size,
            height: currentSize.size,
            borderWidth: currentSize.borderWidth,
            borderColor: `${spinnerColor}30`,
            borderTopColor: spinnerColor,
            borderRadius: currentSize.size / 2,
            transform: [{ rotate }],
          },
        ]}
      />
    </View>
  );
}

export interface LoadingOverlayProps {
  /** Whether the overlay is visible */
  visible: boolean;
  /** Loading message */
  message?: string;
  /** Spinner size */
  size?: SpinnerSize;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * LoadingOverlay - Full screen loading indicator
 */
export function LoadingOverlay({
  visible,
  message,
  size = 'lg',
  style,
}: LoadingOverlayProps) {
  const colors = useColors();

  if (!visible) return null;

  return (
    <View
      style={[
        styles.overlay,
        { backgroundColor: `${colors['background']}E6` },
        style,
      ]}
    >
      <Spinner size={size} />
      {message && (
        <Animated.Text
          style={[
            styles.message,
            { color: colors['text-secondary'] },
          ]}
        >
          {message}
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    borderStyle: 'solid',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  message: {
    marginTop: 16,
    fontSize: 14,
  },
});
