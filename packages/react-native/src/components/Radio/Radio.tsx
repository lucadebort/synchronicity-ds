import React, { useEffect, useRef } from 'react';
import {
  Pressable,
  View,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors } from '../../hooks/useTheme';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps {
  /** Whether the radio is selected */
  selected: boolean;
  /** Called when the radio is pressed */
  onSelect: () => void;
  /** Size of the radio */
  size?: RadioSize;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel: string;
}

/**
 * Radio - Selection control for single choice from multiple options
 *
 * @example
 * ```tsx
 * <Radio
 *   selected={selectedValue === 'option1'}
 *   onSelect={() => setSelectedValue('option1')}
 *   accessibilityLabel="Option 1"
 * />
 * ```
 */
export function Radio({
  selected,
  onSelect,
  size = 'md',
  disabled = false,
  style,
  accessibilityLabel,
}: RadioProps) {
  const colors = useColors();
  const scale = useRef(new Animated.Value(selected ? 1 : 0)).current;

  const sizeConfig = {
    sm: { outer: 16, inner: 8, borderWidth: 1.5 },
    md: { outer: 20, inner: 10, borderWidth: 2 },
    lg: { outer: 24, inner: 12, borderWidth: 2 },
  };

  const currentSize = sizeConfig[size];

  useEffect(() => {
    Animated.spring(scale, {
      toValue: selected ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  }, [selected, scale]);

  const handlePress = () => {
    if (!disabled) {
      onSelect();
    }
  };

  const borderColor = selected ? colors['gold-primary'] : colors['border-default'];

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected, disabled }}
      style={[
        styles.container,
        {
          width: currentSize.outer,
          height: currentSize.outer,
          borderRadius: currentSize.outer / 2,
          borderWidth: currentSize.borderWidth,
          borderColor,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.inner,
          {
            width: currentSize.inner,
            height: currentSize.inner,
            borderRadius: currentSize.inner / 2,
            backgroundColor: colors['gold-primary'],
            transform: [{ scale }],
          },
        ]}
      />
    </Pressable>
  );
}

export interface RadioGroupProps {
  /** Currently selected value */
  value: string;
  /** Called when selection changes */
  onValueChange: (value: string) => void;
  /** Radio group children */
  children: React.ReactNode;
  /** Custom style overrides */
  style?: ViewStyle;
}

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

/**
 * RadioGroup - Container for managing radio selection state
 */
export function RadioGroup({
  value,
  onValueChange,
  children,
  style,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <View style={style} accessibilityRole="radiogroup">
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps {
  /** Value for this radio option */
  value: string;
  /** Size of the radio */
  size?: RadioSize;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel: string;
}

/**
 * RadioGroupItem - Individual radio within a RadioGroup
 */
export function RadioGroupItem({
  value,
  size = 'md',
  disabled = false,
  style,
  accessibilityLabel,
}: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext);

  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  return (
    <Radio
      selected={context.value === value}
      onSelect={() => context.onValueChange(value)}
      size={size}
      disabled={disabled}
      style={style}
      accessibilityLabel={accessibilityLabel}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {},
});
