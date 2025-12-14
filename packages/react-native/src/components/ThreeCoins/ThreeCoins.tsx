import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Pressable,
  Text,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';
import type { CoinSide } from '../CoinFlip';

export type ThrowResult = {
  coins: [CoinSide, CoinSide, CoinSide];
  value: 6 | 7 | 8 | 9;
  lineType: 'yin' | 'yang' | 'changing-yin' | 'changing-yang';
};

export interface ThreeCoinsProps {
  /** Current coin states */
  coins?: [CoinSide, CoinSide, CoinSide];
  /** Size of the coins */
  size?: 'sm' | 'md' | 'lg';
  /** Whether coins are currently being thrown */
  throwing?: boolean;
  /** Duration of throw animation */
  throwDuration?: number;
  /** Handler when throw completes with result */
  onThrowComplete?: (result: ThrowResult) => void;
  /** Handler when coins are pressed to throw */
  onPress?: () => void;
  /** Whether interaction is disabled */
  disabled?: boolean;
  /** Show the calculated value */
  showValue?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * ThreeCoins - Three coins for I Ching casting
 *
 * Traditional coin method:
 * - Heads = 3 points, Tails = 2 points
 * - 6 (2+2+2) = Old Yin (changing)
 * - 7 (2+2+3) = Young Yang
 * - 8 (2+3+3) = Young Yin
 * - 9 (3+3+3) = Old Yang (changing)
 *
 * @example
 * ```tsx
 * <ThreeCoins onThrowComplete={handleResult} />
 * <ThreeCoins coins={['heads', 'tails', 'heads']} showValue />
 * ```
 */
export function ThreeCoins({
  coins: coinsProp,
  size = 'md',
  throwing = false,
  throwDuration = 800,
  onThrowComplete,
  onPress,
  disabled = false,
  showValue = false,
  style,
}: ThreeCoinsProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const [coins, setCoins] = useState<[CoinSide, CoinSide, CoinSide]>(
    coinsProp || ['heads', 'heads', 'heads']
  );

  const spin1 = useRef(new Animated.Value(0)).current;
  const spin2 = useRef(new Animated.Value(0)).current;
  const spin3 = useRef(new Animated.Value(0)).current;
  const bounce = useRef(new Animated.Value(0)).current;

  const sizeConfig = {
    sm: { diameter: 36, gap: 8, fontSize: 12 },
    md: { diameter: 48, gap: 12, fontSize: 14 },
    lg: { diameter: 64, gap: 16, fontSize: 16 },
  };

  const config = sizeConfig[size];

  useEffect(() => {
    if (coinsProp) {
      setCoins(coinsProp);
    }
  }, [coinsProp]);

  const calculateResult = useCallback(
    (c: [CoinSide, CoinSide, CoinSide]): ThrowResult => {
      const sum = c.reduce(
        (acc: number, coin) => acc + (coin === 'heads' ? 3 : 2),
        0
      );
      const value = sum as 6 | 7 | 8 | 9;

      const lineTypeMap: Record<6 | 7 | 8 | 9, ThrowResult['lineType']> = {
        6: 'changing-yin',
        7: 'yang',
        8: 'yin',
        9: 'changing-yang',
      };

      return {
        coins: c,
        value,
        lineType: lineTypeMap[value],
      };
    },
    []
  );

  useEffect(() => {
    if (throwing) {
      // Stagger the animations for each coin
      const animations = [spin1, spin2, spin3].map((spin, index) =>
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.timing(spin, {
            toValue: 3 + Math.random(),
            duration: throwDuration + index * 100,
            useNativeDriver: true,
          }),
        ])
      );

      Animated.parallel([
        ...animations,
        Animated.sequence([
          Animated.timing(bounce, {
            toValue: 1,
            duration: throwDuration / 3,
            useNativeDriver: true,
          }),
          Animated.timing(bounce, {
            toValue: 0,
            duration: (throwDuration * 2) / 3,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Generate random result
        const newCoins: [CoinSide, CoinSide, CoinSide] = [
          Math.random() > 0.5 ? 'heads' : 'tails',
          Math.random() > 0.5 ? 'heads' : 'tails',
          Math.random() > 0.5 ? 'heads' : 'tails',
        ];

        setCoins(newCoins);
        spin1.setValue(0);
        spin2.setValue(0);
        spin3.setValue(0);

        onThrowComplete?.(calculateResult(newCoins));
      });
    }
  }, [throwing, throwDuration, spin1, spin2, spin3, bounce, onThrowComplete, calculateResult]);

  const valueSum = coins.reduce(
    (acc: number, coin) => acc + (coin === 'heads' ? 3 : 2),
    0
  );
  const value = valueSum as 6 | 7 | 8 | 9;

  const getLineTypeLabel = (v: 6 | 7 | 8 | 9): string => {
    switch (v) {
      case 6:
        return 'Old Yin ⚋';
      case 7:
        return 'Young Yang ⚊';
      case 8:
        return 'Young Yin ⚋';
      case 9:
        return 'Old Yang ⚊';
    }
  };

  const renderCoin = (
    side: CoinSide,
    spinAnim: Animated.Value,
    index: number
  ) => {
    const rotation = spinAnim.interpolate({
      inputRange: [0, 1, 2, 3, 4],
      outputRange: ['0deg', '360deg', '720deg', '1080deg', '1440deg'],
    });

    const translateY = bounce.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -20],
    });

    const isHeads = side === 'heads';
    const backgroundColor = isHeads
      ? colors['gold-primary']
      : colors['surface-elevated'];
    const borderColor = isHeads ? colors['gold-dark'] : colors['border-default'];
    const textColor = isHeads ? colors['text-on-color'] : colors['text-secondary'];

    return (
      <Animated.View
        key={index}
        style={[
          styles.coin,
          {
            width: config.diameter,
            height: config.diameter,
            borderRadius: config.diameter / 2,
            borderWidth: 2,
            backgroundColor,
            borderColor,
            transform: [{ rotateX: rotation }, { translateY }],
          },
        ]}
      >
        <Text
          style={[
            styles.coinText,
            {
              ...theme.typography['type-display-small'],
              fontSize: config.diameter * 0.4,
              color: textColor,
            },
          ]}
        >
          {isHeads ? '乾' : '坤'}
        </Text>
      </Animated.View>
    );
  };

  const content = (
    <View style={[styles.container, style]}>
      <View style={[styles.coinsRow, { gap: config.gap }]}>
        {renderCoin(coins[0], spin1, 0)}
        {renderCoin(coins[1], spin2, 1)}
        {renderCoin(coins[2], spin3, 2)}
      </View>
      {showValue && (
        <View style={styles.valueContainer}>
          <Text
            style={[
              styles.valueNumber,
              {
                ...theme.typography['type-display-small'],
                fontSize: config.fontSize + 4,
                color: value === 6 || value === 9
                  ? colors['gold-primary']
                  : colors['text-primary'],
              },
            ]}
          >
            {value}
          </Text>
          <Text
            style={[
              styles.valueLabel,
              {
                ...theme.typography['type-body-sm'],
                fontSize: config.fontSize,
                color: colors['text-secondary'],
              },
            ]}
          >
            {getLineTypeLabel(value)}
          </Text>
        </View>
      )}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={onPress}
        disabled={throwing}
        accessibilityRole="button"
        accessibilityLabel="Throw three coins"
        accessibilityState={{ disabled: throwing || disabled }}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

/**
 * ThrowHistory - Shows a history of throws
 */
export interface ThrowHistoryProps {
  /** Array of throw results */
  throws: ThrowResult[];
  /** Size of the display */
  size?: 'sm' | 'md';
  /** Custom style */
  style?: ViewStyle;
}

export function ThrowHistory({ throws, size = 'sm', style }: ThrowHistoryProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const sizeConfig = {
    sm: { fontSize: 10, gap: 4, coinSize: 16 },
    md: { fontSize: 12, gap: 6, coinSize: 20 },
  };

  const config = sizeConfig[size];

  return (
    <View style={[styles.historyContainer, { gap: config.gap }, style]}>
      {throws.map((t, index) => (
        <View key={index} style={[styles.historyRow, { gap: config.gap }]}>
          <Text
            style={[
              styles.historyNumber,
              {
                ...theme.typography['type-body-sm'],
                fontSize: config.fontSize,
                color: colors['text-tertiary'],
              },
            ]}
          >
            {index + 1}.
          </Text>
          <View style={[styles.miniCoins, { gap: 2 }]}>
            {t.coins.map((coin, coinIndex) => (
              <View
                key={coinIndex}
                style={[
                  styles.miniCoin,
                  {
                    width: config.coinSize,
                    height: config.coinSize,
                    borderRadius: config.coinSize / 2,
                    backgroundColor:
                      coin === 'heads'
                        ? colors['gold-primary']
                        : colors['surface-elevated'],
                    borderColor:
                      coin === 'heads'
                        ? colors['gold-dark']
                        : colors['border-default'],
                  },
                ]}
              />
            ))}
          </View>
          <Text
            style={[
              styles.historyValue,
              {
                ...theme.typography['type-body-md'],
                fontSize: config.fontSize + 2,
                color:
                  t.value === 6 || t.value === 9
                    ? colors['gold-primary']
                    : colors['text-primary'],
              },
            ]}
          >
            {t.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  coinsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coin: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  coinText: {
    fontWeight: '700',
  },
  valueContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  valueNumber: {
    fontWeight: '600',
  },
  valueLabel: {
    marginTop: 2,
  },
  historyContainer: {},
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyNumber: {
    width: 20,
  },
  miniCoins: {
    flexDirection: 'row',
  },
  miniCoin: {
    borderWidth: 1,
  },
  historyValue: {
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
});
