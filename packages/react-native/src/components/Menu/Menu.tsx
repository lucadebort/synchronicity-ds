import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  StyleSheet,
  Dimensions,
  type ViewStyle,
  type LayoutRectangle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export interface MenuItem {
  /** Item key */
  key: string;
  /** Item label */
  label: string;
  /** Item icon */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Destructive action */
  destructive?: boolean;
  /** Divider after this item */
  divider?: boolean;
}

export interface MenuProps {
  /** Menu items */
  items: MenuItem[];
  /** Trigger element */
  trigger: React.ReactNode;
  /** Item press handler */
  onSelect: (key: string) => void;
  /** Menu placement */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Menu - Dropdown menu with options
 *
 * @example
 * ```tsx
 * <Menu
 *   trigger={<IconButton icon={<MoreIcon />} accessibilityLabel="Menu" />}
 *   items={[
 *     { key: 'edit', label: 'Edit' },
 *     { key: 'share', label: 'Share' },
 *     { key: 'delete', label: 'Delete', destructive: true },
 *   ]}
 *   onSelect={handleSelect}
 * />
 * ```
 */
export function Menu({
  items,
  trigger,
  onSelect,
  placement = 'bottom-end',
  style,
}: MenuProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const triggerRef = useRef<View>(null);

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 10,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
    }
  }, [isOpen, scaleAnim, opacityAnim]);

  const handleOpen = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      setIsOpen(true);
    });
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => setIsOpen(false));
  };

  const handleSelect = (key: string) => {
    handleClose();
    onSelect(key);
  };

  const getMenuPosition = () => {
    if (!triggerLayout) return {};

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const menuWidth = 200;
    const menuMaxHeight = items.length * 48 + 16;

    let top = triggerLayout.y + triggerLayout.height + 8;
    let left = triggerLayout.x;

    if (placement.includes('end')) {
      left = triggerLayout.x + triggerLayout.width - menuWidth;
    }

    if (placement.includes('top')) {
      top = triggerLayout.y - menuMaxHeight - 8;
    }

    // Keep within screen bounds
    left = Math.max(8, Math.min(left, screenWidth - menuWidth - 8));
    top = Math.max(8, Math.min(top, screenHeight - menuMaxHeight - 8));

    return { top, left };
  };

  return (
    <>
      <Pressable ref={triggerRef} onPress={handleOpen}>
        {trigger}
      </Pressable>

      <Modal visible={isOpen} transparent animationType="none" onRequestClose={handleClose}>
        <Pressable style={styles.backdrop} onPress={handleClose}>
          <Animated.View
            style={[
              styles.menu,
              {
                backgroundColor: colors['surface-elevated'],
                ...getMenuPosition(),
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
              },
              style,
            ]}
          >
            {items.map((item, index) => (
              <React.Fragment key={item.key}>
                <Pressable
                  onPress={() => !item.disabled && handleSelect(item.key)}
                  disabled={item.disabled}
                  style={[
                    styles.menuItem,
                    { opacity: item.disabled ? 0.5 : 1 },
                  ]}
                >
                  {item.icon && <View style={styles.menuItemIcon}>{item.icon}</View>}
                  <Text
                    style={[
                      styles.menuItemLabel,
                      {
                        color: item.destructive ? '#ef4444' : colors['text-primary'],
                        ...theme.typography['type-body-md'],
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
                {item.divider && index < items.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: colors['border-default'] }]} />
                )}
              </React.Fragment>
            ))}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

export interface ContextMenuProps {
  /** Context menu items */
  items: MenuItem[];
  /** Item press handler */
  onSelect: (key: string) => void;
  /** Wrapped content (long-pressable) */
  children: React.ReactNode;
  /** Delay before showing menu */
  delayMs?: number;
}

/**
 * ContextMenu - Long-press menu
 */
export function ContextMenu({
  items,
  onSelect,
  children,
  delayMs = 500,
}: ContextMenuProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleLongPress = (event: { nativeEvent: { pageX: number; pageY: number } }) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY, left: pageX });
    setIsOpen(true);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => setIsOpen(false));
  };

  const handleSelect = (key: string) => {
    handleClose();
    onSelect(key);
  };

  return (
    <>
      <Pressable onLongPress={handleLongPress} delayLongPress={delayMs}>
        {children}
      </Pressable>

      <Modal visible={isOpen} transparent animationType="none" onRequestClose={handleClose}>
        <Pressable style={styles.backdrop} onPress={handleClose}>
          <Animated.View
            style={[
              styles.menu,
              {
                backgroundColor: colors['surface-elevated'],
                top: menuPosition.top,
                left: menuPosition.left,
                opacity: opacityAnim,
              },
            ]}
          >
            {items.map((item) => (
              <Pressable
                key={item.key}
                onPress={() => !item.disabled && handleSelect(item.key)}
                disabled={item.disabled}
                style={[
                  styles.menuItem,
                  { opacity: item.disabled ? 0.5 : 1 },
                ]}
              >
                {item.icon && <View style={styles.menuItemIcon}>{item.icon}</View>}
                <Text
                  style={[
                    styles.menuItemLabel,
                    {
                      color: item.destructive ? '#ef4444' : colors['text-primary'],
                      ...theme.typography['type-body-md'],
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    minWidth: 180,
    maxWidth: 280,
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuItemIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemLabel: {},
  divider: {
    height: 1,
    marginVertical: 4,
    marginHorizontal: 16,
  },
});
