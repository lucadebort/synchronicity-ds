import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export interface ListItemProps {
  /** Primary text */
  title: string;
  /** Secondary text */
  subtitle?: string;
  /** Left element (icon, avatar, etc.) */
  leading?: React.ReactNode;
  /** Right element (icon, badge, etc.) */
  trailing?: React.ReactNode;
  /** Called when item is pressed */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Show divider below */
  divider?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * ListItem - Individual item in a List
 */
export function ListItem({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  disabled = false,
  divider = true,
  style,
  accessibilityLabel,
}: ListItemProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const content = (
    <View
      style={[
        styles.item,
        {
          borderBottomColor: divider ? colors['border-default'] : 'transparent',
          borderBottomWidth: divider ? StyleSheet.hairlineWidth : 0,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {leading && <View style={styles.leading}>{leading}</View>}

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: colors['text-primary'],
              ...theme.typography['type-body-md'],
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              {
                color: colors['text-secondary'],
                ...theme.typography['type-body-sm'],
              },
            ]}
            numberOfLines={2}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {trailing && <View style={styles.trailing}>{trailing}</View>}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          { backgroundColor: pressed ? colors['surface'] : 'transparent' },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

export interface ListProps {
  /** List items */
  children: React.ReactNode;
  /** List header */
  header?: string;
  /** List footer */
  footer?: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * List - Container for ListItem components
 *
 * @example
 * ```tsx
 * <List header="Settings">
 *   <ListItem title="Notifications" trailing={<Switch />} />
 *   <ListItem title="Dark Mode" trailing={<Switch />} />
 *   <ListItem title="About" onPress={showAbout} trailing={<ChevronRight />} />
 * </List>
 * ```
 */
export function List({
  children,
  header,
  footer,
  style,
}: ListProps) {
  const colors = useColors();
  const theme = useThemeObject();

  return (
    <View style={[styles.list, style]}>
      {header && (
        <Text
          style={[
            styles.header,
            {
              color: colors['text-secondary'],
              ...theme.typography['type-label-sm'],
            },
          ]}
        >
          {header}
        </Text>
      )}

      <View
        style={[
          styles.container,
          {
            backgroundColor: colors['surface-elevated'],
            borderRadius: Number(theme.radius['radius-container']),
          },
        ]}
      >
        {children}
      </View>

      {footer && (
        <Text
          style={[
            styles.footer,
            {
              color: colors['text-tertiary'],
              ...theme.typography['type-body-sm'],
            },
          ]}
        >
          {footer}
        </Text>
      )}
    </View>
  );
}

export interface ListSectionProps {
  /** Section title */
  title: string;
  /** Section items */
  children: React.ReactNode;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * ListSection - Grouped section within a List
 */
export function ListSection({
  title,
  children,
  style,
}: ListSectionProps) {
  const colors = useColors();
  const theme = useThemeObject();

  return (
    <View style={[styles.section, style]}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors['text-secondary'],
            ...theme.typography['type-label-sm'],
          },
        ]}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {},
  header: {
    marginBottom: 8,
    paddingHorizontal: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  container: {
    overflow: 'hidden',
  },
  footer: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  leading: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {},
  subtitle: {
    marginTop: 2,
  },
  trailing: {
    marginLeft: 12,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    paddingHorizontal: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
