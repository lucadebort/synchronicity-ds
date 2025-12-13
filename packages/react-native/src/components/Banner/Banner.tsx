import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type BannerVariant = 'info' | 'success' | 'warning' | 'error';

export interface BannerProps {
  /** Banner message */
  message: string;
  /** Banner title */
  title?: string;
  /** Banner variant */
  variant?: BannerVariant;
  /** Left icon */
  icon?: React.ReactNode;
  /** Dismissible */
  onDismiss?: () => void;
  /** Action button */
  action?: {
    label: string;
    onPress: () => void;
  };
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Banner - Inline notification banner
 *
 * @example
 * ```tsx
 * <Banner
 *   variant="info"
 *   title="New Feature"
 *   message="Try our new reading history feature!"
 *   action={{ label: 'Try it', onPress: handleAction }}
 *   onDismiss={() => setShowBanner(false)}
 * />
 * ```
 */
export function Banner({
  message,
  title,
  variant = 'info',
  icon,
  onDismiss,
  action,
  style,
}: BannerProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, opacityAnim]);

  const variantStyles = {
    info: {
      background: 'rgba(59, 130, 246, 0.15)',
      border: '#3b82f6',
      icon: '#3b82f6',
    },
    success: {
      background: 'rgba(34, 197, 94, 0.15)',
      border: '#22c55e',
      icon: '#22c55e',
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.15)',
      border: '#f59e0b',
      icon: '#f59e0b',
    },
    error: {
      background: 'rgba(239, 68, 68, 0.15)',
      border: '#ef4444',
      icon: '#ef4444',
    },
  };

  const currentVariant = variantStyles[variant];

  const defaultIcons: Record<BannerVariant, string> = {
    info: 'ℹ️',
    success: '✓',
    warning: '⚠️',
    error: '✕',
  };

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss?.());
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: currentVariant.background,
          borderLeftColor: currentVariant.border,
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }],
        },
        style,
      ]}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        {icon || (
          <Text style={[styles.defaultIcon, { color: currentVariant.icon }]}>
            {defaultIcons[variant]}
          </Text>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {title && (
          <Text
            style={[
              styles.title,
              {
                color: colors['text-primary'],
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
              color: colors['text-secondary'],
              ...theme.typography['type-body-sm'],
            },
          ]}
        >
          {message}
        </Text>
        {action && (
          <Pressable
            onPress={action.onPress}
            style={styles.actionButton}
          >
            <Text
              style={[
                styles.actionText,
                {
                  color: currentVariant.border,
                  ...theme.typography['type-label-sm'],
                },
              ]}
            >
              {action.label}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Dismiss */}
      {onDismiss && (
        <Pressable
          onPress={handleDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss banner"
          style={styles.dismissButton}
        >
          <Text style={[styles.dismissIcon, { color: colors['text-secondary'] }]}>×</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

export interface AnnouncementBannerProps {
  /** Announcement message */
  message: string;
  /** Click handler */
  onPress?: () => void;
  /** Dismissible */
  onDismiss?: () => void;
  /** Custom style */
  style?: ViewStyle;
}

/**
 * AnnouncementBanner - Top-level announcement
 */
export function AnnouncementBanner({
  message,
  onPress,
  onDismiss,
  style,
}: AnnouncementBannerProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const content = (
    <View
      style={[
        styles.announcementContainer,
        { backgroundColor: colors['gold-primary'] },
        style,
      ]}
    >
      <Text
        style={[
          styles.announcementText,
          {
            color: colors['background'],
            ...theme.typography['type-body-sm'],
          },
        ]}
        numberOfLines={1}
      >
        {message}
      </Text>
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          style={styles.announcementDismiss}
        >
          <Text style={[styles.announcementDismissIcon, { color: colors['background'] }]}>×</Text>
        </Pressable>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderLeftWidth: 4,
    borderRadius: 8,
    gap: 12,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  message: {
    lineHeight: 20,
  },
  actionButton: {
    marginTop: 8,
  },
  actionText: {},
  dismissButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -4,
  },
  dismissIcon: {
    fontSize: 22,
    fontWeight: '300',
  },
  announcementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  announcementText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
  },
  announcementDismiss: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  announcementDismissIcon: {
    fontSize: 18,
    fontWeight: '600',
  },
});
