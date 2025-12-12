import React from 'react';
import { View, Text, Image, StyleSheet, type ViewStyle, type ImageSourcePropType } from 'react-native';
import { useColors } from '../../hooks/useTheme';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** Image source for the avatar */
  source?: ImageSourcePropType;
  /** Fallback initials when no image */
  initials?: string;
  /** Fallback icon/emoji when no image or initials */
  icon?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Custom background color for initials/icon fallback */
  backgroundColor?: string;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * Avatar - User or entity representation
 *
 * @example
 * ```tsx
 * <Avatar source={{ uri: 'https://...' }} size="md" />
 * <Avatar initials="JD" size="lg" />
 * <Avatar icon="☯" size="sm" />
 * ```
 */
export function Avatar({
  source,
  initials,
  icon,
  size = 'md',
  backgroundColor,
  style,
  accessibilityLabel,
}: AvatarProps) {
  const colors = useColors();

  const sizeValues = {
    xs: { size: 24, fontSize: 10, iconSize: 14 },
    sm: { size: 32, fontSize: 12, iconSize: 18 },
    md: { size: 40, fontSize: 14, iconSize: 22 },
    lg: { size: 56, fontSize: 18, iconSize: 28 },
    xl: { size: 80, fontSize: 24, iconSize: 40 },
  };

  const currentSize = sizeValues[size];
  const bgColor = backgroundColor || colors['surface-elevated'];

  const containerStyle: ViewStyle = {
    width: currentSize.size,
    height: currentSize.size,
    borderRadius: currentSize.size / 2,
    backgroundColor: source ? 'transparent' : bgColor,
  };

  // Image avatar
  if (source) {
    return (
      <View style={[styles.container, containerStyle, style]}>
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: currentSize.size,
              height: currentSize.size,
              borderRadius: currentSize.size / 2,
            },
          ]}
          accessibilityLabel={accessibilityLabel || 'Avatar image'}
        />
      </View>
    );
  }

  // Initials fallback
  if (initials) {
    return (
      <View
        style={[styles.container, containerStyle, style]}
        accessibilityLabel={accessibilityLabel || `Avatar for ${initials}`}
        accessibilityRole="image"
      >
        <Text
          style={[
            styles.initials,
            {
              fontSize: currentSize.fontSize,
              color: colors['text-secondary'],
            },
          ]}
        >
          {initials.slice(0, 2).toUpperCase()}
        </Text>
      </View>
    );
  }

  // Icon fallback
  return (
    <View
      style={[styles.container, containerStyle, style]}
      accessibilityLabel={accessibilityLabel || 'Avatar'}
      accessibilityRole="image"
    >
      <Text
        style={[
          styles.icon,
          {
            fontSize: currentSize.iconSize,
          },
        ]}
      >
        {icon || '☯'}
      </Text>
    </View>
  );
}

export interface AvatarGroupProps {
  /** Avatar elements */
  children: React.ReactNode;
  /** Maximum avatars to show before +N indicator */
  max?: number;
  /** Size for all avatars in group */
  size?: AvatarSize;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * AvatarGroup - Stack of overlapping avatars
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3}>
 *   <Avatar initials="JD" />
 *   <Avatar initials="AB" />
 *   <Avatar initials="CD" />
 *   <Avatar initials="EF" />
 * </AvatarGroup>
 * ```
 */
export function AvatarGroup({
  children,
  max = 4,
  size = 'md',
  style,
}: AvatarGroupProps) {
  const colors = useColors();
  const childArray = React.Children.toArray(children);
  const visibleChildren = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  const sizeValues = {
    xs: { size: 24, fontSize: 8, overlap: -8 },
    sm: { size: 32, fontSize: 10, overlap: -10 },
    md: { size: 40, fontSize: 12, overlap: -12 },
    lg: { size: 56, fontSize: 14, overlap: -16 },
    xl: { size: 80, fontSize: 18, overlap: -20 },
  };

  const currentSize = sizeValues[size];

  return (
    <View style={[styles.group, style]}>
      {visibleChildren.map((child, index) => (
        <View
          key={index}
          style={[
            styles.groupItem,
            {
              marginLeft: index > 0 ? currentSize.overlap : 0,
              zIndex: visibleChildren.length - index,
              borderWidth: 2,
              borderColor: colors['background'],
              borderRadius: currentSize.size / 2 + 2,
            },
          ]}
        >
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
            : child}
        </View>
      ))}
      {remainingCount > 0 && (
        <View
          style={[
            styles.groupItem,
            styles.remainingBadge,
            {
              marginLeft: currentSize.overlap,
              width: currentSize.size,
              height: currentSize.size,
              borderRadius: currentSize.size / 2,
              backgroundColor: colors['surface-elevated'],
              borderWidth: 2,
              borderColor: colors['background'],
            },
          ]}
        >
          <Text
            style={[
              styles.remainingText,
              {
                fontSize: currentSize.fontSize,
                color: colors['text-secondary'],
              },
            ]}
          >
            +{remainingCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    fontWeight: '600',
  },
  icon: {
    opacity: 0.6,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupItem: {
    // zIndex applied inline
  },
  remainingBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  remainingText: {
    fontWeight: '600',
  },
});
