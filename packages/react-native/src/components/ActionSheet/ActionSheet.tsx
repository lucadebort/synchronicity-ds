import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  Animated,
  StyleSheet,
  Dimensions,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface ActionSheetOption {
  /** Option label */
  label: string;
  /** Called when option is selected */
  onPress: () => void;
  /** Destructive styling (red) */
  destructive?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Icon element */
  icon?: React.ReactNode;
}

export interface ActionSheetProps {
  /** Whether the sheet is visible */
  visible: boolean;
  /** Called when the sheet should close */
  onClose: () => void;
  /** Sheet title */
  title?: string;
  /** Sheet message */
  message?: string;
  /** Action options */
  options: ActionSheetOption[];
  /** Cancel button label */
  cancelLabel?: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * ActionSheet - Bottom action menu with options
 *
 * @example
 * ```tsx
 * <ActionSheet
 *   visible={showActions}
 *   onClose={() => setShowActions(false)}
 *   title="Reading Options"
 *   options={[
 *     { label: 'Share', onPress: handleShare },
 *     { label: 'Save to Journal', onPress: handleSave },
 *     { label: 'Delete', onPress: handleDelete, destructive: true },
 *   ]}
 * />
 * ```
 */
export function ActionSheet({
  visible,
  onClose,
  title,
  message,
  options,
  cancelLabel = 'Cancel',
  style,
}: ActionSheetProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

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

  const handleOptionPress = (option: ActionSheetOption) => {
    if (!option.disabled) {
      onClose();
      // Small delay to allow animation to complete
      setTimeout(() => option.onPress(), 100);
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
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close action sheet"
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
            },
            style,
          ]}
        >
          <View
            style={[
              styles.optionsContainer,
              {
                backgroundColor: colors['surface-elevated'],
                borderRadius: Number(theme.radius['radius-container']),
              },
            ]}
          >
            {(title || message) && (
              <View style={styles.header}>
                {title && (
                  <Text
                    style={[
                      styles.title,
                      {
                        color: colors['text-secondary'],
                        ...theme.typography['type-label-sm'],
                      },
                    ]}
                  >
                    {title}
                  </Text>
                )}
                {message && (
                  <Text
                    style={[
                      styles.message,
                      {
                        color: colors['text-tertiary'],
                        ...theme.typography['type-body-sm'],
                      },
                    ]}
                  >
                    {message}
                  </Text>
                )}
              </View>
            )}

            {options.map((option, index) => (
              <Pressable
                key={index}
                onPress={() => handleOptionPress(option)}
                disabled={option.disabled}
                accessibilityRole="button"
                accessibilityLabel={option.label}
                accessibilityState={{ disabled: option.disabled }}
                style={({ pressed }) => [
                  styles.option,
                  {
                    backgroundColor: pressed ? colors['surface'] : 'transparent',
                    borderTopWidth: index > 0 || title || message ? StyleSheet.hairlineWidth : 0,
                    borderTopColor: colors['border-default'],
                    opacity: option.disabled ? 0.5 : 1,
                  },
                ]}
              >
                {option.icon && <View style={styles.optionIcon}>{option.icon}</View>}
                <Text
                  style={[
                    styles.optionLabel,
                    {
                      color: option.destructive ? '#ef4444' : colors['text-primary'],
                      ...theme.typography['type-body-md'],
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
            style={({ pressed }) => [
              styles.cancelButton,
              {
                backgroundColor: pressed ? colors['surface'] : colors['surface-elevated'],
                borderRadius: Number(theme.radius['radius-container']),
              },
            ]}
          >
            <Text
              style={[
                styles.cancelLabel,
                {
                  color: colors['gold-primary'],
                  ...theme.typography['type-label-md'],
                },
              ]}
            >
              {cancelLabel}
            </Text>
          </Pressable>
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
    padding: 8,
    paddingBottom: 32,
  },
  optionsContainer: {
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  message: {
    textAlign: 'center',
    marginTop: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionLabel: {
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelLabel: {
    fontWeight: '600',
  },
});
