import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
  type LayoutChangeEvent,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';

export interface SegmentedControlOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /** Available options */
  options: SegmentedControlOption[];
  /** Currently selected value */
  value: string;
  /** Change handler */
  onValueChange: (value: string) => void;
  /** Size of the control */
  size?: SegmentedControlSize;
  /** Full width */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * SegmentedControl - Multi-option toggle selector
 *
 * @example
 * ```tsx
 * <SegmentedControl
 *   options={[
 *     { value: 'hexagram', label: 'Hexagram' },
 *     { value: 'trigrams', label: 'Trigrams' },
 *     { value: 'lines', label: 'Lines' },
 *   ]}
 *   value={view}
 *   onValueChange={setView}
 * />
 * ```
 */
export function SegmentedControl({
  options,
  value,
  onValueChange,
  size = 'md',
  fullWidth = false,
  disabled = false,
  style,
  accessibilityLabel = 'Segmented control',
}: SegmentedControlProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const translateX = useRef(new Animated.Value(0)).current;
  const segmentWidths = useRef<number[]>([]);
  const segmentPositions = useRef<number[]>([]);

  const sizeConfig = {
    sm: { height: 32, fontSize: 12, padding: 8 },
    md: { height: 40, fontSize: 14, padding: 12 },
    lg: { height: 48, fontSize: 16, padding: 16 },
  };

  const currentSize = sizeConfig[size];
  const selectedIndex = options.findIndex((opt) => opt.value === value);

  useEffect(() => {
    if (selectedIndex >= 0 && segmentPositions.current[selectedIndex] !== undefined) {
      Animated.spring(translateX, {
        toValue: segmentPositions.current[selectedIndex],
        useNativeDriver: true,
        friction: 8,
        tension: 100,
      }).start();
    }
  }, [selectedIndex, translateX]);

  const handleLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { width, x } = event.nativeEvent.layout;
    segmentWidths.current[index] = width;
    segmentPositions.current[index] = x;

    // Update animation if this is the selected segment
    if (index === selectedIndex) {
      translateX.setValue(x);
    }
  };

  const handleSelect = (optionValue: string, optionDisabled?: boolean) => {
    if (!disabled && !optionDisabled) {
      onValueChange(optionValue);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: currentSize.height,
          backgroundColor: colors['surface'],
          borderRadius: Number(theme.radius['radius-interactive']),
          opacity: disabled ? 0.5 : 1,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
    >
      {selectedIndex >= 0 && segmentWidths.current[selectedIndex] && (
        <Animated.View
          style={[
            styles.indicator,
            {
              width: segmentWidths.current[selectedIndex],
              backgroundColor: colors['surface-elevated'],
              borderRadius: Number(theme.radius['radius-interactive']) - 2,
              transform: [{ translateX }],
            },
          ]}
        />
      )}

      {options.map((option, index) => {
        const isSelected = option.value === value;
        const isDisabled = option.disabled || disabled;

        return (
          <Pressable
            key={option.value}
            onLayout={handleLayout(index)}
            onPress={() => handleSelect(option.value, option.disabled)}
            disabled={isDisabled}
            accessibilityRole="tab"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: isSelected, disabled: isDisabled }}
            style={[
              styles.segment,
              {
                paddingHorizontal: currentSize.padding,
                opacity: isDisabled ? 0.5 : 1,
              },
              fullWidth && styles.segmentFullWidth,
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: isSelected ? colors['text-primary'] : colors['text-secondary'],
                  fontSize: currentSize.fontSize,
                  fontWeight: isSelected ? '600' : '400',
                },
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    alignSelf: 'flex-start',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  indicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
  },
  segment: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  segmentFullWidth: {
    flex: 1,
  },
  label: {},
});
