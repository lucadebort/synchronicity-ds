import React from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'gold';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  /** Badge text content */
  children: string;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Use outlined style instead of filled */
  outlined?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Badge - Small status indicator or label
 *
 * @example
 * ```tsx
 * <Badge variant="gold">New</Badge>
 * <Badge variant="success" size="sm">Complete</Badge>
 * <Badge variant="warning" outlined>Pending</Badge>
 * ```
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  outlined = false,
  style,
}: BadgeProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const getColors = () => {
    switch (variant) {
      case 'success':
        return {
          bg: outlined ? 'transparent' : colors['support-success-subtle'],
          text: colors['support-success'],
          border: colors['support-success'],
        };
      case 'warning':
        return {
          bg: outlined ? 'transparent' : colors['support-warning-subtle'],
          text: colors['support-warning'],
          border: colors['support-warning'],
        };
      case 'error':
        return {
          bg: outlined ? 'transparent' : colors['support-error-subtle'],
          text: colors['support-error'],
          border: colors['support-error'],
        };
      case 'info':
        return {
          bg: outlined ? 'transparent' : colors['support-info-subtle'],
          text: colors['support-info'],
          border: colors['support-info'],
        };
      case 'gold':
        return {
          bg: outlined ? 'transparent' : colors['gold-muted'],
          text: outlined ? colors['gold-primary'] : colors['text-on-color'],
          border: colors['gold-primary'],
        };
      case 'default':
      default:
        return {
          bg: outlined ? 'transparent' : colors['surface-elevated'],
          text: colors['text-secondary'],
          border: colors['border-default'],
        };
    }
  };

  const sizeStyles = {
    sm: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      fontSize: 10,
      borderRadius: 4,
    },
    md: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      fontSize: 12,
      borderRadius: 6,
    },
    lg: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      fontSize: 14,
      borderRadius: 8,
    },
  };

  const badgeColors = getColors();
  const currentSize = sizeStyles[size];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: badgeColors.bg,
          borderColor: outlined ? badgeColors.border : 'transparent',
          borderWidth: outlined ? 1 : 0,
          paddingHorizontal: currentSize.paddingHorizontal,
          paddingVertical: currentSize.paddingVertical,
          borderRadius: currentSize.borderRadius,
        },
        style,
      ]}
      accessibilityRole="text"
    >
      <Text
        style={[
          styles.text,
          {
            color: badgeColors.text,
            fontSize: currentSize.fontSize,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
