import React, { useEffect, useRef } from 'react';
import {
  Pressable,
  View,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Called when the checkbox is toggled */
  onCheckedChange: (checked: boolean) => void;
  /** Size of the checkbox */
  size?: CheckboxSize;
  /** Disabled state */
  disabled?: boolean;
  /** Indeterminate state (partially checked) */
  indeterminate?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel: string;
}

/**
 * Checkbox - Selection control for multiple choices
 *
 * @example
 * ```tsx
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   accessibilityLabel="Accept terms"
 * />
 * ```
 */
export function Checkbox({
  checked,
  onCheckedChange,
  size = 'md',
  disabled = false,
  indeterminate = false,
  style,
  accessibilityLabel,
}: CheckboxProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const scale = useRef(new Animated.Value(checked || indeterminate ? 1 : 0)).current;

  const sizeConfig = {
    sm: { box: 16, icon: 10, borderRadius: 4, borderWidth: 1.5 },
    md: { box: 20, icon: 12, borderRadius: 5, borderWidth: 2 },
    lg: { box: 24, icon: 14, borderRadius: 6, borderWidth: 2 },
  };

  const currentSize = sizeConfig[size];

  useEffect(() => {
    Animated.spring(scale, {
      toValue: checked || indeterminate ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  }, [checked, indeterminate, scale]);

  const handlePress = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  const isActive = checked || indeterminate;
  const backgroundColor = isActive ? colors['gold-primary'] : 'transparent';
  const borderColor = isActive ? colors['gold-primary'] : colors['border-default'];

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
      style={[
        styles.container,
        {
          width: currentSize.box,
          height: currentSize.box,
          borderRadius: currentSize.borderRadius,
          borderWidth: currentSize.borderWidth,
          borderColor,
          backgroundColor,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{ scale }],
          },
        ]}
      >
        {indeterminate ? (
          <View
            style={[
              styles.indeterminateLine,
              {
                width: currentSize.icon,
                height: 2,
                backgroundColor: colors['text-on-color'],
              },
            ]}
          />
        ) : (
          <View style={styles.checkmark}>
            <View
              style={[
                styles.checkmarkShort,
                {
                  width: currentSize.icon * 0.4,
                  height: 2,
                  backgroundColor: colors['text-on-color'],
                },
              ]}
            />
            <View
              style={[
                styles.checkmarkLong,
                {
                  width: currentSize.icon * 0.7,
                  height: 2,
                  backgroundColor: colors['text-on-color'],
                },
              ]}
            />
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indeterminateLine: {
    borderRadius: 1,
  },
  checkmark: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkShort: {
    position: 'absolute',
    transform: [{ rotate: '45deg' }, { translateX: -2 }, { translateY: 2 }],
    borderRadius: 1,
  },
  checkmarkLong: {
    position: 'absolute',
    transform: [{ rotate: '-45deg' }, { translateX: 1 }, { translateY: 0 }],
    borderRadius: 1,
  },
});
