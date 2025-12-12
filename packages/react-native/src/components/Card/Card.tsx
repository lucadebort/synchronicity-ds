import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type PressableProps,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends Omit<PressableProps, 'style'> {
  /** Visual variant of the card */
  variant?: CardVariant;
  /** Content to render inside the card */
  children: React.ReactNode;
  /** Custom padding override */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Border radius override */
  radius?: 'sm' | 'md' | 'lg';
  /** Make the card pressable */
  onPress?: () => void;
  /** Accessibility label (required for pressable cards) */
  accessibilityLabel?: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Card - Container component for grouping related content
 *
 * @example
 * ```tsx
 * <Card variant="elevated" padding="md" onPress={handlePress}>
 *   <Text>Card Content</Text>
 * </Card>
 * ```
 */
export function Card({
  variant = 'elevated',
  children,
  padding = 'md',
  radius = 'md',
  onPress,
  accessibilityLabel,
  style,
  ...props
}: CardProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const paddingValue = {
    none: 0,
    sm: theme.spacing['inset-sm'],
    md: theme.spacing['inset-md'],
    lg: theme.spacing['inset-lg'],
  }[padding];

  const radiusValue = {
    sm: theme.radius['radius-interactive'],
    md: theme.radius['radius-container'],
    lg: theme.radius['radius-card'],
  }[radius];

  const getBackgroundColor = (pressed: boolean) => {
    switch (variant) {
      case 'elevated':
        return pressed
          ? colors['surface-elevated']
          : colors['surface'];
      case 'filled':
        return pressed
          ? colors['surface-elevated']
          : colors['surface'];
      case 'outlined':
        return pressed ? colors['surface'] : 'transparent';
      default:
        return colors['surface'];
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'outlined':
        return colors['border-default'];
      case 'elevated':
      case 'filled':
      default:
        return 'transparent';
    }
  };

  const cardContent = (pressed: boolean = false) => (
    <View
      style={[
        styles.base,
        {
          backgroundColor: getBackgroundColor(pressed),
          borderColor: getBorderColor(),
          borderRadius: radiusValue,
          padding: paddingValue,
        },
        variant === 'outlined' && styles.outlined,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        {...props}
      >
        {({ pressed }) => cardContent(pressed)}
      </Pressable>
    );
  }

  return cardContent();
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  outlined: {
    borderWidth: 1,
  },
});
