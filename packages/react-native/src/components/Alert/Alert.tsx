import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  /** Alert title */
  title?: string;
  /** Alert message */
  children: string;
  /** Visual variant */
  variant?: AlertVariant;
  /** Show close button */
  onClose?: () => void;
  /** Action button */
  action?: {
    label: string;
    onPress: () => void;
  };
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Alert - Contextual feedback messages for user actions
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Success">
 *   Your reading has been saved.
 * </Alert>
 * ```
 */
export function Alert({
  title,
  children,
  variant = 'info',
  onClose,
  action,
  style,
}: AlertProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string; title: string }> = {
    info: {
      bg: 'rgba(99, 102, 241, 0.1)',
      border: 'rgba(99, 102, 241, 0.3)',
      text: '#a5b4fc',
      title: '#c7d2fe',
    },
    success: {
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.3)',
      text: '#6ee7b7',
      title: '#a7f3d0',
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.3)',
      text: '#fcd34d',
      title: '#fde68a',
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.1)',
      border: 'rgba(239, 68, 68, 0.3)',
      text: '#fca5a5',
      title: '#fecaca',
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentVariant.bg,
          borderColor: currentVariant.border,
          borderRadius: Number(theme.radius['radius-container']),
        },
        style,
      ]}
      accessibilityRole="alert"
    >
      <View style={styles.content}>
        {title && (
          <Text
            style={[
              styles.title,
              {
                color: currentVariant.title,
                ...theme.typography['type-label-md'],
              },
            ]}
          >
            {title}
          </Text>
        )}
        <Text
          style={[
            styles.message,
            {
              color: currentVariant.text,
              ...theme.typography['type-body-sm'],
            },
          ]}
        >
          {children}
        </Text>
        {action && (
          <Pressable
            onPress={action.onPress}
            style={styles.actionButton}
            accessibilityRole="button"
            accessibilityLabel={action.label}
          >
            <Text
              style={[
                styles.actionText,
                {
                  color: currentVariant.title,
                  ...theme.typography['type-label-sm'],
                },
              ]}
            >
              {action.label}
            </Text>
          </Pressable>
        )}
      </View>

      {onClose && (
        <Pressable
          onPress={onClose}
          style={styles.closeButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Dismiss alert"
        >
          <Text style={[styles.closeIcon, { color: currentVariant.text }]}>×</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {},
  actionButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  actionText: {
    fontWeight: '600',
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 20,
  },
});
