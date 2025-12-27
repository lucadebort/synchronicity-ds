import React, { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps {
  /** Current value */
  value: boolean;
  /** Change handler */
  onValueChange: (value: boolean) => void;
  /** Size of the switch */
  size?: SwitchSize;
  /** Disabled state */
  disabled?: boolean;
  /** Custom active color */
  activeColor?: string;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel: string;
}

/**
 * Switch - Toggle control for boolean settings
 *
 * @example
 * ```tsx
 * <Switch
 *   value={isDarkMode}
 *   onValueChange={setIsDarkMode}
 *   accessibilityLabel="Dark mode"
 * />
 * ```
 */
export function Switch({
  value,
  onValueChange,
  size = 'md',
  disabled = false,
  activeColor,
  style,
  accessibilityLabel,
}: SwitchProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const translateX = useRef(new Animated.Value(value ? 1 : 0)).current;
  const [isFocused, setIsFocused] = useState(false);

  const sizeConfig = {
    sm: { width: 36, height: 20, thumbSize: 16, padding: 2 },
    md: { width: 48, height: 28, thumbSize: 24, padding: 2 },
    lg: { width: 56, height: 32, thumbSize: 28, padding: 2 },
  };

  const currentSize = sizeConfig[size];
  const thumbOffset = currentSize.width - currentSize.thumbSize - currentSize.padding * 2;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  }, [value, translateX]);

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  const trackColor = value
    ? activeColor || colors['gold-primary']
    : colors['surface-elevated'];

  const thumbTranslate = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, thumbOffset],
  });

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled }}
      style={[
        styles.track,
        {
          width: currentSize.width,
          height: currentSize.height,
          borderRadius: currentSize.height / 2,
          backgroundColor: trackColor,
          padding: currentSize.padding,
          opacity: disabled ? 0.5 : 1,
          borderWidth: isFocused && !disabled ? 2 : 0,
          borderColor: isFocused && !disabled ? colors['border-focus'] : 'transparent',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            width: currentSize.thumbSize,
            height: currentSize.thumbSize,
            borderRadius: currentSize.thumbSize / 2,
            backgroundColor: colors['text-on-color'],
            transform: [{ translateX: thumbTranslate }],
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
  },
  thumb: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
