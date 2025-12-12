import React from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type ChipVariant = 'filled' | 'outlined' | 'soft';
export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps {
  /** Chip label */
  children: string;
  /** Visual variant */
  variant?: ChipVariant;
  /** Size of the chip */
  size?: ChipSize;
  /** Selected state */
  selected?: boolean;
  /** Called when pressed */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Icon to show before label */
  icon?: React.ReactNode;
  /** Show close button */
  onClose?: () => void;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * Chip - Compact element for inputs, attributes, or actions
 *
 * @example
 * ```tsx
 * <Chip>Heaven</Chip>
 * <Chip selected onPress={() => {}}>Earth</Chip>
 * <Chip variant="outlined" onClose={() => {}}>Thunder</Chip>
 * ```
 */
export function Chip({
  children,
  variant = 'filled',
  size = 'md',
  selected = false,
  onPress,
  disabled = false,
  icon,
  onClose,
  style,
  accessibilityLabel,
}: ChipProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const sizeConfig = {
    sm: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      fontSize: 12,
      iconSize: 14,
      gap: 4,
    },
    md: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      fontSize: 14,
      iconSize: 16,
      gap: 6,
    },
    lg: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      fontSize: 16,
      iconSize: 18,
      gap: 8,
    },
  };

  const currentSize = sizeConfig[size];

  const getVariantStyles = () => {
    if (selected) {
      return {
        backgroundColor: colors['gold-primary'],
        borderColor: colors['gold-primary'],
        textColor: colors['text-on-color'],
      };
    }

    switch (variant) {
      case 'filled':
        return {
          backgroundColor: colors['surface-elevated'],
          borderColor: 'transparent',
          textColor: colors['text-primary'],
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderColor: colors['border-default'],
          textColor: colors['text-primary'],
        };
      case 'soft':
        return {
          backgroundColor: colors['surface'],
          borderColor: 'transparent',
          textColor: colors['text-secondary'],
        };
      default:
        return {
          backgroundColor: colors['surface-elevated'],
          borderColor: 'transparent',
          textColor: colors['text-primary'],
        };
    }
  };

  const variantStyles = getVariantStyles();
  const isInteractive = onPress || onClose;

  const content = (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          borderWidth: variant === 'outlined' || selected ? 1 : 0,
          paddingHorizontal: currentSize.paddingHorizontal,
          paddingVertical: currentSize.paddingVertical,
          borderRadius: 100,
          gap: currentSize.gap,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.label,
          {
            color: variantStyles.textColor,
            fontSize: currentSize.fontSize,
            fontWeight: '500',
          },
        ]}
      >
        {children}
      </Text>
      {onClose && (
        <Pressable
          onPress={onClose}
          disabled={disabled}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${children}`}
        >
          <Text
            style={[
              styles.closeIcon,
              {
                color: variantStyles.textColor,
                fontSize: currentSize.iconSize,
              },
            ]}
          >
            ×
          </Text>
        </Pressable>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || children}
        accessibilityState={{ selected, disabled }}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

export interface ChipGroupProps {
  /** Chip group children */
  children: React.ReactNode;
  /** Spacing between chips */
  spacing?: 'sm' | 'md' | 'lg';
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * ChipGroup - Container for multiple chips
 */
export function ChipGroup({
  children,
  spacing = 'sm',
  style,
}: ChipGroupProps) {
  const spacingValues = {
    sm: 6,
    md: 8,
    lg: 12,
  };

  return (
    <View style={[styles.group, { gap: spacingValues[spacing] }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
  },
  closeIcon: {
    fontWeight: '600',
    marginLeft: 2,
  },
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
