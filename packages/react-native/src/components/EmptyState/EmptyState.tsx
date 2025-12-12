import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';
import { Button } from '../Button';

export interface EmptyStateProps {
  /** Large icon or emoji to display */
  icon?: string;
  /** Main title text */
  title: string;
  /** Optional descriptive subtitle */
  subtitle?: string;
  /** Optional action button label */
  actionLabel?: string;
  /** Callback for action button press */
  onAction?: () => void;
  /** Use compact layout with less vertical padding */
  compact?: boolean;
  /** Accessibility label (defaults to title) */
  accessibilityLabel?: string;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * EmptyState - Displays when a list or view has no content
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon="☯"
 *   title="No Readings Yet"
 *   subtitle="Cast your first hexagram to begin your journey"
 *   actionLabel="Cast Hexagram"
 *   onAction={() => navigation.navigate('Cast')}
 * />
 * ```
 */
export function EmptyState({
  icon = '☯',
  title,
  subtitle,
  actionLabel,
  onAction,
  compact = false,
  accessibilityLabel,
  style,
}: EmptyStateProps) {
  const colors = useColors();
  const theme = useThemeObject();

  return (
    <View
      style={[
        styles.container,
        compact ? styles.containerCompact : styles.containerFull,
        { paddingHorizontal: theme.spacing['inset-xl'] },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel || title}
    >
      <Text
        style={[
          styles.icon,
          compact ? styles.iconCompact : styles.iconFull,
          { marginBottom: theme.spacing['stack-md'] },
        ]}
        accessibilityLabel={icon}
      >
        {icon}
      </Text>

      <Text
        style={[
          styles.title,
          {
            color: colors['text-secondary'],
            fontSize: compact
              ? theme.typography['type-body-lg'].fontSize
              : theme.typography['type-heading-md'].fontSize,
            marginBottom: theme.spacing['stack-xs'],
          },
        ]}
        accessibilityRole="header"
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={[
            styles.subtitle,
            {
              color: colors['text-tertiary'],
              fontSize: theme.typography['type-body-sm'].fontSize,
              lineHeight: theme.typography['type-body-sm'].lineHeight,
              marginBottom: actionLabel ? theme.spacing['stack-lg'] : 0,
            },
          ]}
          accessibilityRole="text"
        >
          {subtitle}
        </Text>
      )}

      {actionLabel && onAction && (
        <Button
          kind="primary"
          size="md"
          onPress={onAction}
          accessibilityLabel={actionLabel}
          style={{ marginTop: theme.spacing['stack-sm'] }}
        >
          {actionLabel}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFull: {
    flex: 1,
    paddingVertical: 64,
  },
  containerCompact: {
    paddingVertical: 32,
  },
  icon: {
    opacity: 0.3,
  },
  iconFull: {
    fontSize: 64,
  },
  iconCompact: {
    fontSize: 48,
  },
  title: {
    fontFamily: 'Georgia',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
});
