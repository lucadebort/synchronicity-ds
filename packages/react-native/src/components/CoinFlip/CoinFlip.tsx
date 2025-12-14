import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Pressable,
  Text,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type CoinSide = 'heads' | 'tails';

export interface CoinFlipProps {
  /** Current side showing */
  side: CoinSide;
  /** Size of the coin */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the coin is currently flipping */
  flipping?: boolean;
  /** Duration of flip animation in ms */
  flipDuration?: number;
  /** Handler when flip animation completes */
  onFlipComplete?: () => void;
  /** Handler when coin is pressed */
  onPress?: () => void;
  /** Whether the coin is interactive */
  disabled?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * CoinFlip - An animated coin for I Ching casting
 *
 * In traditional I Ching coin casting:
 * - Heads (yang side with Chinese character) = 3 points
 * - Tails (yin side, usually blank or different) = 2 points
 *
 * @example
 * ```tsx
 * <CoinFlip side="heads" onPress={handleFlip} />
 * <CoinFlip side="tails" flipping />
 * ```
 */
export function CoinFlip({
  side,
  size = 'md',
  flipping = false,
  flipDuration = 500,
  onFlipComplete,
  onPress,
  disabled = false,
  style,
}: CoinFlipProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const sizeConfig = {
    sm: { diameter: 40, borderWidth: 2, fontSize: 16 },
    md: { diameter: 56, borderWidth: 3, fontSize: 22 },
    lg: { diameter: 72, borderWidth: 4, fontSize: 28 },
  };

  const config = sizeConfig[size];

  useEffect(() => {
    if (flipping) {
      // Multiple rotations for realistic flip effect
      Animated.parallel([
        Animated.timing(spinValue, {
          toValue: 3, // 3 full rotations
          duration: flipDuration,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: flipDuration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: flipDuration / 2,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        spinValue.setValue(0);
        onFlipComplete?.();
      });
    }
  }, [flipping, flipDuration, spinValue, scaleValue, onFlipComplete]);

  const rotation = spinValue.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ['0deg', '360deg', '720deg', '1080deg'],
  });

  const isHeads = side === 'heads';
  const backgroundColor = isHeads ? colors['gold-primary'] : colors['surface-elevated'];
  const borderColor = isHeads ? colors['gold-dark'] : colors['border-default'];
  const textColor = isHeads ? colors['text-on-color'] : colors['text-secondary'];

  const content = (
    <Animated.View
      style={[
        styles.coin,
        {
          width: config.diameter,
          height: config.diameter,
          borderRadius: config.diameter / 2,
          borderWidth: config.borderWidth,
          backgroundColor,
          borderColor,
          transform: [{ rotateX: rotation }, { scale: scaleValue }],
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.coinText,
          {
            ...theme.typography['type-display-small'],
            fontSize: config.fontSize,
            color: textColor,
          },
        ]}
      >
        {isHeads ? '乾' : '坤'}
      </Text>
      {isHeads && (
        <View
          style={[
            styles.centerDot,
            {
              width: config.diameter * 0.15,
              height: config.diameter * 0.15,
              borderRadius: (config.diameter * 0.15) / 2,
              backgroundColor: colors['gold-dark'],
            },
          ]}
        />
      )}
    </Animated.View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={onPress}
        disabled={flipping}
        accessibilityRole="button"
        accessibilityLabel={`Coin showing ${side}`}
        accessibilityState={{ disabled: flipping || disabled }}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

/**
 * CoinValue - Displays the value (2 or 3) of a coin
 */
export interface CoinValueProps {
  /** Coin side */
  side: CoinSide;
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Custom style */
  style?: ViewStyle;
}

export function CoinValue({ side, size = 'md', style }: CoinValueProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const sizeConfig = {
    sm: { fontSize: 12 },
    md: { fontSize: 14 },
    lg: { fontSize: 16 },
  };

  const value = side === 'heads' ? 3 : 2;

  return (
    <View style={[styles.valueContainer, style]}>
      <Text
        style={[
          styles.valueText,
          {
            ...theme.typography['type-body-md'],
            fontSize: sizeConfig[size].fontSize,
            color: colors['text-secondary'],
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  coin: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  coinText: {
    fontWeight: '700',
  },
  centerDot: {
    position: 'absolute',
  },
  valueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontWeight: '600',
  },
});
