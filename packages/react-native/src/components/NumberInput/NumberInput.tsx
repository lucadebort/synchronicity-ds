import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type NumberInputSize = 'sm' | 'md' | 'lg';

export interface NumberInputProps {
  /** Current value */
  value: number;
  /** Change handler */
  onValueChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Size of the input */
  size?: NumberInputSize;
  /** Disabled state */
  disabled?: boolean;
  /** Label above the input */
  label?: string;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel: string;
}

/**
 * NumberInput - Numeric input with increment/decrement buttons
 *
 * @example
 * ```tsx
 * <NumberInput
 *   value={quantity}
 *   onValueChange={setQuantity}
 *   min={1}
 *   max={10}
 *   accessibilityLabel="Quantity"
 * />
 * ```
 */
export function NumberInput({
  value,
  onValueChange,
  min = 0,
  max = Infinity,
  step = 1,
  size = 'md',
  disabled = false,
  label,
  style,
  accessibilityLabel,
}: NumberInputProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const sizeConfig = {
    sm: { height: 32, buttonWidth: 32, fontSize: 14 },
    md: { height: 40, buttonWidth: 40, fontSize: 16 },
    lg: { height: 48, buttonWidth: 48, fontSize: 18 },
  };

  const currentSize = sizeConfig[size];

  const handleIncrement = () => {
    if (!disabled && value + step <= max) {
      onValueChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (!disabled && value - step >= min) {
      onValueChange(value - step);
    }
  };

  const handleTextChange = (text: string) => {
    const numValue = parseInt(text, 10);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onValueChange(numValue);
    }
  };

  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: colors['text-primary'],
              ...theme.typography['type-label-sm'],
            },
          ]}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            height: currentSize.height,
            borderColor: colors['border-default'],
            backgroundColor: colors['surface'],
            borderRadius: Number(theme.radius['radius-interactive']),
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <Pressable
          onPress={handleDecrement}
          disabled={disabled || !canDecrement}
          accessibilityRole="button"
          accessibilityLabel="Decrease"
          style={[
            styles.button,
            {
              width: currentSize.buttonWidth,
              opacity: canDecrement ? 1 : 0.3,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: colors['text-primary'],
                fontSize: currentSize.fontSize + 4,
              },
            ]}
          >
            −
          </Text>
        </Pressable>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors['border-default'] },
          ]}
        />

        <TextInput
          value={value.toString()}
          onChangeText={handleTextChange}
          keyboardType="number-pad"
          editable={!disabled}
          accessibilityLabel={accessibilityLabel}
          accessibilityValue={{ min, max, now: value }}
          style={[
            styles.input,
            {
              color: colors['text-primary'],
              fontSize: currentSize.fontSize,
            },
          ]}
        />

        <View
          style={[
            styles.divider,
            { backgroundColor: colors['border-default'] },
          ]}
        />

        <Pressable
          onPress={handleIncrement}
          disabled={disabled || !canIncrement}
          accessibilityRole="button"
          accessibilityLabel="Increase"
          style={[
            styles.button,
            {
              width: currentSize.buttonWidth,
              opacity: canIncrement ? 1 : 0.3,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: colors['text-primary'],
                fontSize: currentSize.fontSize + 4,
              },
            ]}
          >
            +
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '400',
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
  },
  input: {
    flex: 1,
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
});
