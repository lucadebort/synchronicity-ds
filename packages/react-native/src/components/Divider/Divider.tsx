import React from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type DividerVariant = 'default' | 'subtle' | 'strong';
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps {
  /** Visual weight of the divider */
  variant?: DividerVariant;
  /** Direction of the divider */
  orientation?: DividerOrientation;
  /** Optional label text in the center */
  label?: string;
  /** Spacing around the divider */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Divider - Visual separator between content sections
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider variant="subtle" spacing="lg" />
 * <Divider label="or" />
 * ```
 */
export function Divider({
  variant = 'default',
  orientation = 'horizontal',
  label,
  spacing = 'md',
  style,
}: DividerProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const getColor = () => {
    switch (variant) {
      case 'subtle':
        return colors['border-subtle'];
      case 'strong':
        return colors['border-strong'];
      case 'default':
      default:
        return colors['border-default'];
    }
  };

  const spacingValues = {
    none: 0,
    sm: theme.spacing['stack-sm'],
    md: theme.spacing['stack-md'],
    lg: theme.spacing['stack-lg'],
  };

  const spacingValue = spacingValues[spacing];
  const lineColor = getColor();

  if (orientation === 'vertical') {
    return (
      <View
        style={[
          styles.vertical,
          {
            backgroundColor: lineColor,
            marginHorizontal: spacingValue,
          },
          style,
        ]}
        accessible={false}
      />
    );
  }

  if (label) {
    return (
      <View
        style={[
          styles.labelContainer,
          {
            marginVertical: spacingValue,
          },
          style,
        ]}
        accessible={false}
        accessibilityLabel={label}
      >
        <View style={[styles.line, { backgroundColor: lineColor }]} />
        <Text
          style={[
            styles.label,
            {
              color: colors['text-tertiary'],
              marginHorizontal: theme.spacing['inline-md'],
            },
          ]}
        >
          {label}
        </Text>
        <View style={[styles.line, { backgroundColor: lineColor }]} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.horizontal,
        {
          backgroundColor: lineColor,
          marginVertical: spacingValue,
        },
        style,
      ]}
      accessible={false}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
