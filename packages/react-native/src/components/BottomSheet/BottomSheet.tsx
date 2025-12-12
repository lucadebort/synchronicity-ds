import React, { useEffect, useRef } from 'react';
import {
  View,
  Modal,
  Pressable,
  Animated,
  StyleSheet,
  Dimensions,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export type BottomSheetSize = 'sm' | 'md' | 'lg' | 'full';

export interface BottomSheetProps {
  /** Whether the sheet is visible */
  visible: boolean;
  /** Called when the sheet should close */
  onClose: () => void;
  /** Sheet content */
  children: React.ReactNode;
  /** Size preset */
  size?: BottomSheetSize;
  /** Custom height (overrides size) */
  height?: number;
  /** Show drag handle */
  showHandle?: boolean;
  /** Close on backdrop press */
  closeOnBackdrop?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * BottomSheet - Sliding panel from the bottom of the screen
 *
 * @example
 * ```tsx
 * <BottomSheet
 *   visible={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   size="md"
 * >
 *   <Text>Sheet content</Text>
 * </BottomSheet>
 * ```
 */
export function BottomSheet({
  visible,
  onClose,
  children,
  size = 'md',
  height,
  showHandle = true,
  closeOnBackdrop = true,
  style,
  accessibilityLabel = 'Bottom sheet',
}: BottomSheetProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const sizeHeights: Record<BottomSheetSize, number> = {
    sm: SCREEN_HEIGHT * 0.25,
    md: SCREEN_HEIGHT * 0.5,
    lg: SCREEN_HEIGHT * 0.75,
    full: SCREEN_HEIGHT * 0.9,
  };

  const sheetHeight = height || sizeHeights[size];

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
          tension: 65,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, backdropOpacity]);

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleBackdropPress}
            accessibilityRole="button"
            accessibilityLabel="Close sheet"
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              height: sheetHeight,
              backgroundColor: colors['surface-elevated'],
              borderTopLeftRadius: Number(theme.radius['radius-modal']),
              borderTopRightRadius: Number(theme.radius['radius-modal']),
              transform: [{ translateY }],
            },
            style,
          ]}
          accessibilityRole="none"
          accessibilityLabel={accessibilityLabel}
        >
          {showHandle && (
            <View style={styles.handleContainer}>
              <View
                style={[
                  styles.handle,
                  { backgroundColor: colors['border-default'] },
                ]}
              />
            </View>
          )}
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
});
