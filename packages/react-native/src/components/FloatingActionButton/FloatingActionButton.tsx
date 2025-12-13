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

export type FABSize = 'sm' | 'md' | 'lg';
export type FABVariant = 'primary' | 'secondary' | 'surface';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface FABProps {
  /** Icon to display */
  icon: React.ReactNode;
  /** Optional label for extended FAB */
  label?: string;
  /** Button size */
  size?: FABSize;
  /** Button variant */
  variant?: FABVariant;
  /** Screen position */
  position?: FABPosition;
  /** Press handler */
  onPress: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel: string;
}

/**
 * FloatingActionButton - Primary action button that floats above content
 *
 * @example
 * ```tsx
 * <FloatingActionButton
 *   icon={<PlusIcon />}
 *   onPress={handleAdd}
 *   accessibilityLabel="Add new reading"
 * />
 * ```
 */
export function FloatingActionButton({
  icon,
  label,
  size = 'md',
  variant = 'primary',
  position = 'bottom-right',
  onPress,
  disabled = false,
  style,
  accessibilityLabel,
}: FABProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const mountAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      friction: 8,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [mountAnim]);

  const sizeConfig = {
    sm: { size: 40, iconSize: 18 },
    md: { size: 56, iconSize: 24 },
    lg: { size: 72, iconSize: 32 },
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors['gold-primary'],
      textColor: colors['background'],
    },
    secondary: {
      backgroundColor: colors['surface-elevated'],
      textColor: colors['gold-primary'],
    },
    surface: {
      backgroundColor: colors['surface'],
      textColor: colors['text-primary'],
    },
  };

  const positionStyles = {
    'bottom-right': { bottom: 24, right: 24 },
    'bottom-left': { bottom: 24, left: 24 },
    'bottom-center': { bottom: 24, left: '50%' as const, transform: [{ translateX: -sizeConfig[size].size / 2 }] },
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantStyles[variant];
  const currentPosition = positionStyles[position];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const isExtended = !!label;

  return (
    <Animated.View
      style={[
        styles.container,
        currentPosition,
        {
          opacity: disabled ? 0.5 : 1,
          transform: [
            { scale: Animated.multiply(scaleAnim, mountAnim) },
          ],
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
        style={[
          styles.button,
          {
            backgroundColor: currentVariant.backgroundColor,
            height: currentSize.size,
            minWidth: currentSize.size,
            borderRadius: isExtended ? currentSize.size / 2 : currentSize.size / 2,
            paddingHorizontal: isExtended ? 20 : 0,
          },
        ]}
      >
        <View style={[styles.iconContainer, { width: currentSize.iconSize, height: currentSize.iconSize }]}>
          {icon}
        </View>
        {label && (
          <Text
            style={[
              styles.label,
              {
                color: currentVariant.textColor,
                ...theme.typography['type-label-md'],
              },
            ]}
          >
            {label}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

export interface SpeedDialAction {
  /** Action icon */
  icon: React.ReactNode;
  /** Action label */
  label: string;
  /** Press handler */
  onPress: () => void;
}

export interface SpeedDialProps {
  /** Main FAB icon when closed */
  icon: React.ReactNode;
  /** Main FAB icon when open */
  openIcon?: React.ReactNode;
  /** Speed dial actions */
  actions: SpeedDialAction[];
  /** Open state (controlled) */
  open?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** FAB position */
  position?: FABPosition;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label for main button */
  accessibilityLabel: string;
}

/**
 * SpeedDial - FAB that expands to reveal additional actions
 */
export function SpeedDial({
  icon,
  openIcon,
  actions,
  open: controlledOpen,
  onOpenChange,
  position = 'bottom-right',
  style,
  accessibilityLabel,
}: SpeedDialProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const [internalOpen, setInternalOpen] = React.useState(false);
  const animatedOpen = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(animatedOpen, {
        toValue: isOpen ? 1 : 0,
        friction: 8,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.spring(rotation, {
        toValue: isOpen ? 1 : 0,
        friction: 8,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen, animatedOpen, rotation]);

  const handleToggle = () => {
    const newOpen = !isOpen;
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const handleActionPress = (action: SpeedDialAction) => {
    handleToggle();
    action.onPress();
  };

  const positionStyles = {
    'bottom-right': { bottom: 24, right: 24, alignItems: 'flex-end' as const },
    'bottom-left': { bottom: 24, left: 24, alignItems: 'flex-start' as const },
    'bottom-center': { bottom: 24, left: '50%' as const, alignItems: 'center' as const },
  };

  const rotateIcon = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={[styles.speedDialContainer, positionStyles[position], style]}>
      {actions.map((action, index) => {
        const translateY = animatedOpen.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(index + 1) * 60],
        });
        const opacity = animatedOpen.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0, 1],
        });
        const scale = animatedOpen.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.speedDialAction,
              {
                transform: [{ translateY }, { scale }],
                opacity,
              },
            ]}
          >
            <View style={[styles.actionLabelContainer, { backgroundColor: colors['surface-elevated'] }]}>
              <Text style={[styles.actionLabel, { color: colors['text-primary'], ...theme.typography['type-body-sm'] }]}>
                {action.label}
              </Text>
            </View>
            <Pressable
              onPress={() => handleActionPress(action)}
              accessibilityLabel={action.label}
              style={[
                styles.actionButton,
                { backgroundColor: colors['surface-elevated'] },
              ]}
            >
              {action.icon}
            </Pressable>
          </Animated.View>
        );
      })}

      <Pressable
        onPress={handleToggle}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ expanded: isOpen }}
        style={[
          styles.mainButton,
          { backgroundColor: colors['gold-primary'] },
        ]}
      >
        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          {isOpen && openIcon ? openIcon : icon}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 8,
  },
  speedDialContainer: {
    position: 'absolute',
    zIndex: 1000,
  },
  speedDialAction: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 8,
    bottom: 0,
  },
  actionLabelContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 12,
  },
  actionLabel: {},
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  mainButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
