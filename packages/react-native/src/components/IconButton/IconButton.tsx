import React, { useState } from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type PressableProps,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type IconButtonVariant = 'default' | 'ghost' | 'filled';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends Omit<PressableProps, 'style'> {
  /** Icon content (emoji, symbol, or icon component) */
  icon: React.ReactNode;
  /** Visual variant */
  variant?: IconButtonVariant;
  /** Button size */
  size?: IconButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /** Use circular shape */
  rounded?: boolean;
  /** Accessibility label (required) */
  accessibilityLabel: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * IconButton - Pressable icon-only button
 *
 * @example
 * ```tsx
 * <IconButton
 *   icon={<MenuIcon />}
 *   accessibilityLabel="Open menu"
 *   onPress={handleMenuPress}
 * />
 * <IconButton
 *   icon="☰"
 *   variant="filled"
 *   rounded
 *   accessibilityLabel="Menu"
 * />
 * ```
 */
export function IconButton({
  icon,
  variant = 'default',
  size = 'md',
  disabled = false,
  rounded = false,
  accessibilityLabel,
  style,
  onPress,
  ...props
}: IconButtonProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const [isFocused, setIsFocused] = useState(false);

  const sizeConfig = {
    sm: { size: 32, iconSize: 16, radius: 6 },
    md: { size: 40, iconSize: 20, radius: 8 },
    lg: { size: 48, iconSize: 24, radius: 10 },
  };

  const currentSize = sizeConfig[size];

  const getBackgroundColor = (pressed: boolean) => {
    if (disabled) return 'transparent';

    switch (variant) {
      case 'filled':
        return pressed ? colors['surface-elevated'] : colors['surface'];
      case 'ghost':
        return pressed ? colors['surface'] : 'transparent';
      case 'default':
      default:
        return pressed ? colors['surface'] : 'transparent';
    }
  };

  const getBorderColor = () => {
    if (disabled) return colors['border-subtle'];

    switch (variant) {
      case 'default':
        return colors['border-default'];
      case 'filled':
      case 'ghost':
      default:
        return 'transparent';
    }
  };

  const getIconColor = () => {
    if (disabled) return colors['text-disabled'];
    return colors['text-secondary'];
  };

  const borderRadius = rounded ? currentSize.size / 2 : currentSize.radius;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        {
          width: currentSize.size,
          height: currentSize.size,
          borderRadius,
          backgroundColor: getBackgroundColor(pressed),
          borderColor: isFocused && !disabled ? colors['border-focus'] : getBorderColor(),
          borderWidth: isFocused && !disabled ? 2 : (variant === 'default' ? 1 : 0),
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...props}
    >
      <View style={styles.iconContainer}>
        {typeof icon === 'string' ? (
          <Text
            style={[
              styles.iconText,
              {
                fontSize: currentSize.iconSize,
                color: getIconColor(),
              },
            ]}
          >
            {icon}
          </Text>
        ) : (
          icon
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    textAlign: 'center',
  },
});
