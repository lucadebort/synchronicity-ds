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

export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

export interface PopoverProps {
  /** Popover content */
  content: React.ReactNode;
  /** Trigger element */
  children: React.ReactNode;
  /** Placement relative to trigger */
  placement?: PopoverPlacement;
  /** Show arrow pointing to trigger */
  showArrow?: boolean;
  /** Close on content press */
  closeOnPress?: boolean;
  /** Controlled visibility */
  visible?: boolean;
  /** Visibility change handler */
  onVisibleChange?: (visible: boolean) => void;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Popover - Floating content overlay
 *
 * @example
 * ```tsx
 * <Popover
 *   content={<Text>Additional information</Text>}
 *   placement="bottom"
 * >
 *   <Text>Tap for more info</Text>
 * </Popover>
 * ```
 */
export function Popover({
  content,
  children,
  placement = 'bottom',
  showArrow = true,
  closeOnPress = true,
  visible: controlledVisible,
  onVisibleChange,
  style,
}: PopoverProps) {
  const colors = useColors();
  const [internalVisible, setInternalVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const triggerRef = useRef<View>(null);

  const isVisible = controlledVisible !== undefined ? controlledVisible : internalVisible;

  useEffect(() => {
    if (isVisible) {
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
  }, [isVisible, scaleAnim, opacityAnim]);

  const handleOpen = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      if (controlledVisible === undefined) {
        setInternalVisible(true);
      }
      onVisibleChange?.(true);
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
    ]).start(() => {
      if (controlledVisible === undefined) {
        setInternalVisible(false);
      }
      onVisibleChange?.(false);
    });
  };

  const handleContentPress = () => {
    if (closeOnPress) {
      handleClose();
    }
  };

  const getPopoverPosition = () => {
    if (!triggerLayout) return {};

    const { width: screenWidth } = Dimensions.get('window');
    const popoverWidth = 240;
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = triggerLayout.y - gap;
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = triggerLayout.y + triggerLayout.height + gap;
        break;
      case 'left':
        top = triggerLayout.y + triggerLayout.height / 2;
        left = triggerLayout.x - popoverWidth - gap;
        break;
      case 'right':
        top = triggerLayout.y + triggerLayout.height / 2;
        left = triggerLayout.x + triggerLayout.width + gap;
        break;
    }

    switch (placement) {
      case 'top':
      case 'bottom':
        left = triggerLayout.x + triggerLayout.width / 2 - popoverWidth / 2;
        break;
      case 'top-start':
      case 'bottom-start':
        left = triggerLayout.x;
        break;
      case 'top-end':
      case 'bottom-end':
        left = triggerLayout.x + triggerLayout.width - popoverWidth;
        break;
    }

    // Keep within screen bounds
    left = Math.max(8, Math.min(left, screenWidth - popoverWidth - 8));

    return { top, left };
  };

  const getArrowPosition = () => {
    if (!triggerLayout) return {};

    const arrowSize = 8;
    const popoverPos = getPopoverPosition();

    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return {
          bottom: -arrowSize,
          left: triggerLayout.x + triggerLayout.width / 2 - (popoverPos.left || 0) - arrowSize,
          transform: [{ rotate: '180deg' }],
        };
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return {
          top: -arrowSize,
          left: triggerLayout.x + triggerLayout.width / 2 - (popoverPos.left || 0) - arrowSize,
        };
      case 'left':
        return {
          right: -arrowSize,
          top: '50%',
          marginTop: -arrowSize,
          transform: [{ rotate: '90deg' }],
        };
      case 'right':
        return {
          left: -arrowSize,
          top: '50%',
          marginTop: -arrowSize,
          transform: [{ rotate: '-90deg' }],
        };
      default:
        return {};
    }
  };

  return (
    <>
      <Pressable ref={triggerRef} onPress={handleOpen}>
        {children}
      </Pressable>

      <Modal visible={isVisible} transparent animationType="none" onRequestClose={handleClose}>
        <Pressable style={styles.backdrop} onPress={handleClose}>
          <Animated.View
            style={[
              styles.popover,
              {
                backgroundColor: colors['surface-elevated'],
                ...getPopoverPosition(),
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
              },
              style,
            ]}
          >
            {showArrow && (
              <View
                style={[
                  styles.arrow,
                  { borderBottomColor: colors['surface-elevated'] },
                  getArrowPosition() as ViewStyle,
                ]}
              />
            )}
            <Pressable onPress={handleContentPress}>
              {content}
            </Pressable>
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
  popover: {
    position: 'absolute',
    minWidth: 120,
    maxWidth: 280,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
