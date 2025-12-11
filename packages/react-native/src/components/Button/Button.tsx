import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { buttonTokens } from '@synchronicity/tokens';
import { useColors } from '../../hooks/useTheme';

export type ButtonKind = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /** Visual style variant */
  kind?: ButtonKind;
  /** Size of the button */
  size?: ButtonSize;
  /** Button label text */
  children: string;
  /** Shows loading spinner and disables button */
  loading?: boolean;
  /** Disables the button */
  disabled?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Pill-shaped button (fully rounded) */
  pill?: boolean;
  /** Accessibility label (REQUIRED for a11y compliance) */
  accessibilityLabel: string;
  /** Custom style overrides */
  style?: StyleProp<ViewStyle>;
  /** Custom text style overrides */
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Button component following Carbon Design System patterns.
 *
 * @example
 * ```tsx
 * <Button
 *   kind="primary"
 *   size="md"
 *   accessibilityLabel="Submit form"
 *   onPress={handleSubmit}
 * >
 *   Submit
 * </Button>
 * ```
 */
export function Button({
  kind = 'primary',
  size = 'md',
  children,
  loading = false,
  disabled = false,
  fullWidth = false,
  pill = false,
  accessibilityLabel,
  style,
  textStyle,
  onPress,
  ...props
}: ButtonProps) {
  const colors = useColors();
  const isDisabled = disabled || loading;

  // Get colors based on kind and state
  const getBackgroundColor = (pressed: boolean) => {
    if (isDisabled) return colors['interactive-disabled'];

    switch (kind) {
      case 'primary':
        return pressed
          ? colors['interactive-primary-active']
          : colors['interactive-primary'];
      case 'secondary':
        return pressed
          ? colors['interactive-secondary-hover']
          : 'transparent';
      case 'ghost':
        return pressed
          ? colors['interactive-secondary-hover']
          : 'transparent';
      case 'danger':
        return colors['support-error'];
      default:
        return colors['interactive-primary'];
    }
  };

  const getTextColor = () => {
    if (isDisabled) return colors['text-disabled'];

    switch (kind) {
      case 'primary':
      case 'danger':
        return colors['text-on-color'];
      case 'secondary':
      case 'ghost':
        return colors['text-primary'];
      default:
        return colors['text-on-color'];
    }
  };

  const getBorderColor = () => {
    if (isDisabled) return 'transparent';

    switch (kind) {
      case 'secondary':
        return colors['border-default'];
      default:
        return 'transparent';
    }
  };

  // Size tokens
  const sizeStyles = {
    sm: {
      height: buttonTokens['button-height-sm'],
      paddingHorizontal: buttonTokens['button-padding-x-sm'],
      minWidth: buttonTokens['button-min-width-sm'],
      fontSize: buttonTokens['button-font-sm'].fontSize,
      fontWeight: buttonTokens['button-font-sm'].fontWeight,
    },
    md: {
      height: buttonTokens['button-height-md'],
      paddingHorizontal: buttonTokens['button-padding-x-md'],
      minWidth: buttonTokens['button-min-width-md'],
      fontSize: buttonTokens['button-font-md'].fontSize,
      fontWeight: buttonTokens['button-font-md'].fontWeight,
    },
    lg: {
      height: buttonTokens['button-height-lg'],
      paddingHorizontal: buttonTokens['button-padding-x-lg'],
      minWidth: buttonTokens['button-min-width-lg'],
      fontSize: buttonTokens['button-font-lg'].fontSize,
      fontWeight: buttonTokens['button-font-lg'].fontWeight,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        {
          height: currentSize.height,
          paddingHorizontal: currentSize.paddingHorizontal,
          minWidth: fullWidth ? undefined : currentSize.minWidth,
          backgroundColor: getBackgroundColor(pressed),
          borderColor: getBorderColor(),
          borderRadius: pill
            ? buttonTokens['button-radius-pill']
            : buttonTokens['button-radius'],
          opacity: pressed && !isDisabled ? 0.9 : 1,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getTextColor()}
          accessibilityLabel="Loading"
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: currentSize.fontSize,
              fontWeight: currentSize.fontWeight as TextStyle['fontWeight'],
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});
