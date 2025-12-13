import React, { useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type TagSize = 'sm' | 'md' | 'lg';
export type TagVariant = 'filled' | 'outlined' | 'subtle';
export type TagColor = 'default' | 'gold' | 'success' | 'warning' | 'error' | 'info';

export interface TagProps {
  /** Tag content */
  children: string;
  /** Tag size */
  size?: TagSize;
  /** Tag variant */
  variant?: TagVariant;
  /** Tag color */
  color?: TagColor;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Removable (shows X button) */
  onRemove?: () => void;
  /** Press handler (makes tag interactive) */
  onPress?: () => void;
  /** Selected state */
  selected?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Tag - Label for categorization and filtering
 *
 * @example
 * ```tsx
 * <Tag>Hexagram</Tag>
 * <Tag color="gold" onRemove={handleRemove}>Favorite</Tag>
 * ```
 */
export function Tag({
  children,
  size = 'md',
  variant = 'subtle',
  color = 'default',
  leftIcon,
  onRemove,
  onPress,
  selected = false,
  style,
}: TagProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const sizeConfig = {
    sm: { height: 20, paddingH: 6, fontSize: 10, iconSize: 10 },
    md: { height: 26, paddingH: 10, fontSize: 12, iconSize: 12 },
    lg: { height: 32, paddingH: 14, fontSize: 14, iconSize: 14 },
  };

  const colorConfig = {
    default: {
      filled: { bg: colors['surface-elevated'], text: colors['text-primary'], border: 'transparent' },
      outlined: { bg: 'transparent', text: colors['text-secondary'], border: colors['border-default'] },
      subtle: { bg: `${colors['surface-elevated']}80`, text: colors['text-secondary'], border: 'transparent' },
    },
    gold: {
      filled: { bg: colors['gold-primary'], text: colors['background'], border: 'transparent' },
      outlined: { bg: 'transparent', text: colors['gold-primary'], border: colors['gold-primary'] },
      subtle: { bg: `${colors['gold-primary']}20`, text: colors['gold-primary'], border: 'transparent' },
    },
    success: {
      filled: { bg: '#22c55e', text: '#ffffff', border: 'transparent' },
      outlined: { bg: 'transparent', text: '#22c55e', border: '#22c55e' },
      subtle: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e', border: 'transparent' },
    },
    warning: {
      filled: { bg: '#f59e0b', text: '#ffffff', border: 'transparent' },
      outlined: { bg: 'transparent', text: '#f59e0b', border: '#f59e0b' },
      subtle: { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b', border: 'transparent' },
    },
    error: {
      filled: { bg: '#ef4444', text: '#ffffff', border: 'transparent' },
      outlined: { bg: 'transparent', text: '#ef4444', border: '#ef4444' },
      subtle: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'transparent' },
    },
    info: {
      filled: { bg: '#3b82f6', text: '#ffffff', border: 'transparent' },
      outlined: { bg: 'transparent', text: '#3b82f6', border: '#3b82f6' },
      subtle: { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6', border: 'transparent' },
    },
  };

  const currentSize = sizeConfig[size];
  const currentColor = colorConfig[color][variant];

  const handlePressIn = () => {
    if (onPress) {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        friction: 8,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
      }).start();
    }
  };

  const tagContent = (
    <>
      {leftIcon && (
        <View style={[styles.icon, { marginRight: 4 }]}>
          {leftIcon}
        </View>
      )}
      <Text
        style={[
          styles.text,
          {
            ...theme.typography['type-label-sm'],
            fontSize: currentSize.fontSize,
            color: currentColor.text,
          },
        ]}
      >
        {children}
      </Text>
      {onRemove && (
        <Pressable
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${children}`}
          style={styles.removeButton}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
        >
          <Text style={[styles.removeIcon, { fontSize: currentSize.iconSize, color: currentColor.text }]}>
            ×
          </Text>
        </Pressable>
      )}
    </>
  );

  const tagStyle = [
    styles.container,
    {
      height: currentSize.height,
      paddingHorizontal: currentSize.paddingH,
      backgroundColor: selected ? colors['gold-primary'] : currentColor.bg,
      borderColor: selected ? colors['gold-primary'] : currentColor.border,
      borderWidth: variant === 'outlined' || selected ? 1 : 0,
      borderRadius: currentSize.height / 2,
    },
    style,
  ];

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          accessibilityRole="button"
          accessibilityState={{ selected }}
          style={tagStyle}
        >
          {tagContent}
        </Pressable>
      </Animated.View>
    );
  }

  return <View style={tagStyle}>{tagContent}</View>;
}

export interface TagGroupProps {
  /** Child tags */
  children: React.ReactNode;
  /** Wrap tags */
  wrap?: boolean;
  /** Gap between tags */
  gap?: number;
  /** Custom style */
  style?: ViewStyle;
}

/**
 * TagGroup - Container for grouping tags
 */
export function TagGroup({
  children,
  wrap = true,
  gap = 8,
  style,
}: TagGroupProps) {
  return (
    <View
      style={[
        styles.group,
        {
          flexWrap: wrap ? 'wrap' : 'nowrap',
          gap,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '500',
  },
  removeButton: {
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    fontWeight: '700',
    opacity: 0.7,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
