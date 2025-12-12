import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type LayoutRectangle,
  Dimensions,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip content */
  content: string;
  /** Element to wrap */
  children: React.ReactElement;
  /** Position relative to trigger */
  position?: TooltipPosition;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Tooltip - Contextual information popup
 *
 * @example
 * ```tsx
 * <Tooltip content="Three coins are tossed six times">
 *   <IconButton icon="info" accessibilityLabel="Info" />
 * </Tooltip>
 * ```
 */
export function Tooltip({
  content,
  children,
  position = 'top',
  style,
}: TooltipProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const [visible, setVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
  const triggerRef = useRef<View>(null);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const show = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      setVisible(true);
    });
  };

  const hide = () => {
    setVisible(false);
  };

  const getTooltipPosition = () => {
    if (!triggerLayout) return {};

    const tooltipWidth = 200;
    const tooltipHeight = 40;
    const offset = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerLayout.y - tooltipHeight - offset;
        left = triggerLayout.x + triggerLayout.width / 2 - tooltipWidth / 2;
        break;
      case 'bottom':
        top = triggerLayout.y + triggerLayout.height + offset;
        left = triggerLayout.x + triggerLayout.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = triggerLayout.y + triggerLayout.height / 2 - tooltipHeight / 2;
        left = triggerLayout.x - tooltipWidth - offset;
        break;
      case 'right':
        top = triggerLayout.y + triggerLayout.height / 2 - tooltipHeight / 2;
        left = triggerLayout.x + triggerLayout.width + offset;
        break;
    }

    // Keep tooltip within screen bounds
    left = Math.max(8, Math.min(left, screenWidth - tooltipWidth - 8));
    top = Math.max(8, Math.min(top, screenHeight - tooltipHeight - 8));

    return { top, left, width: tooltipWidth };
  };

  return (
    <>
      <Pressable
        ref={triggerRef}
        onPressIn={show}
        onPressOut={hide}
        onLongPress={show}
      >
        {children}
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={hide}
      >
        <Pressable style={styles.overlay} onPress={hide}>
          <View
            style={[
              styles.tooltip,
              {
                backgroundColor: colors['surface-elevated'],
                borderRadius: Number(theme.radius['radius-interactive']),
                ...getTooltipPosition(),
              },
              style,
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: colors['text-primary'],
                  ...theme.typography['type-body-sm'],
                },
              ]}
            >
              {content}
            </Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  tooltip: {
    position: 'absolute',
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    textAlign: 'center',
  },
});
