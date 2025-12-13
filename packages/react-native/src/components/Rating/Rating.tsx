import React, { useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps {
  /** Current rating value (0-5) */
  value: number;
  /** Change handler */
  onValueChange?: (value: number) => void;
  /** Maximum rating value */
  max?: number;
  /** Rating size */
  size?: RatingSize;
  /** Read-only mode */
  readOnly?: boolean;
  /** Show numeric value */
  showValue?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * Rating - Star rating input/display
 *
 * @example
 * ```tsx
 * <Rating
 *   value={rating}
 *   onValueChange={setRating}
 *   accessibilityLabel="Rate this reading"
 * />
 * ```
 */
export function Rating({
  value,
  onValueChange,
  max = 5,
  size = 'md',
  readOnly = false,
  showValue = false,
  style,
  accessibilityLabel = 'Rating',
}: RatingProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const scaleAnims = useRef(
    Array.from({ length: max }, () => new Animated.Value(1))
  ).current;

  const sizeConfig = {
    sm: { starSize: 16, gap: 4, fontSize: 12 },
    md: { starSize: 24, gap: 6, fontSize: 14 },
    lg: { starSize: 32, gap: 8, fontSize: 16 },
  };

  const currentSize = sizeConfig[size];

  const handlePress = (index: number) => {
    if (readOnly || !onValueChange) return;

    // Toggle off if pressing the same star
    const newValue = value === index + 1 ? 0 : index + 1;
    onValueChange(newValue);

    // Animate the pressed star
    Animated.sequence([
      Animated.spring(scaleAnims[index], {
        toValue: 1.3,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderStar = (index: number) => {
    const isFilled = index < value;
    const isHalf = index === Math.floor(value) && value % 1 >= 0.5;

    return (
      <Animated.View
        key={index}
        style={[
          styles.starContainer,
          {
            width: currentSize.starSize,
            height: currentSize.starSize,
            transform: [{ scale: scaleAnims[index] }],
          },
        ]}
      >
        <Pressable
          onPress={() => handlePress(index)}
          disabled={readOnly}
          accessibilityRole="button"
          accessibilityLabel={`${index + 1} star${index === 0 ? '' : 's'}`}
          accessibilityState={{ selected: isFilled }}
          style={styles.starPressable}
        >
          <Text
            style={[
              styles.star,
              {
                fontSize: currentSize.starSize,
                color: isFilled ? colors['gold-primary'] : colors['border-default'],
              },
            ]}
          >
            {isFilled || isHalf ? '★' : '☆'}
          </Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max, now: value }}
    >
      <View style={[styles.starsContainer, { gap: currentSize.gap }]}>
        {Array.from({ length: max }, (_, index) => renderStar(index))}
      </View>
      {showValue && (
        <Text
          style={[
            styles.valueText,
            {
              ...theme.typography['type-body-md'],
              fontSize: currentSize.fontSize,
              color: colors['text-secondary'],
            },
          ]}
        >
          {value.toFixed(1)}
        </Text>
      )}
    </View>
  );
}

export interface RatingDisplayProps {
  /** Rating value */
  value: number;
  /** Maximum rating */
  max?: number;
  /** Display size */
  size?: RatingSize;
  /** Number of reviews */
  reviewCount?: number;
  /** Custom style */
  style?: ViewStyle;
}

/**
 * RatingDisplay - Compact read-only rating display
 */
export function RatingDisplay({
  value,
  max = 5,
  size = 'sm',
  reviewCount,
  style,
}: RatingDisplayProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const sizeConfig = {
    sm: { starSize: 14, fontSize: 12 },
    md: { starSize: 18, fontSize: 14 },
    lg: { starSize: 22, fontSize: 16 },
  };

  const currentSize = sizeConfig[size];

  return (
    <View style={[styles.displayContainer, style]}>
      <Text style={[styles.star, { fontSize: currentSize.starSize, color: colors['gold-primary'] }]}>
        ★
      </Text>
      <Text style={[styles.displayValue, { ...theme.typography['type-body-md'], fontSize: currentSize.fontSize, color: colors['text-primary'] }]}>
        {value.toFixed(1)}
      </Text>
      {reviewCount !== undefined && (
        <Text style={[styles.reviewCount, { ...theme.typography['type-body-sm'], fontSize: currentSize.fontSize - 2, color: colors['text-secondary'] }]}>
          ({reviewCount})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  starPressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    fontFamily: 'System',
  },
  valueText: {
    marginLeft: 8,
  },
  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  displayValue: {
    fontWeight: '500',
  },
  reviewCount: {},
});
