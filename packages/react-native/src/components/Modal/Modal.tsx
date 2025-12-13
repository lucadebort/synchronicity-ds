import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal as RNModal,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface ModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: ModalSize;
  /** Close on backdrop press */
  closeOnBackdrop?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Modal content */
  children: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Modal - Dialog overlay
 *
 * @example
 * ```tsx
 * <Modal
 *   visible={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Reading"
 * >
 *   <Text>Are you sure you want to save this reading?</Text>
 * </Modal>
 * ```
 */
export function Modal({
  visible,
  onClose,
  title,
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  children,
  footer,
  style,
}: ModalProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
    }
  }, [visible, scaleAnim, opacityAnim]);

  const sizeConfig = {
    sm: { width: '70%' as const, maxWidth: 300 },
    md: { width: '85%' as const, maxWidth: 400 },
    lg: { width: '90%' as const, maxWidth: 500 },
    full: { width: '95%' as const, maxWidth: '100%' as const },
  };

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable
        style={[styles.backdrop, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}
        onPress={handleBackdropPress}
      >
        <Animated.View
          style={[
            styles.modal,
            {
              backgroundColor: colors['surface-elevated'],
              width: sizeConfig[size].width,
              maxWidth: sizeConfig[size].maxWidth,
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
            style,
          ]}
        >
          <Pressable>
            {/* Header */}
            {(title || showCloseButton) && (
              <View style={[styles.header, { borderBottomColor: colors['border-default'] }]}>
                {title && (
                  <Text
                    style={[
                      styles.title,
                      {
                        color: colors['text-primary'],
                        ...theme.typography['type-heading-md'],
                      },
                    ]}
                  >
                    {title}
                  </Text>
                )}
                {showCloseButton && (
                  <Pressable
                    onPress={onClose}
                    accessibilityRole="button"
                    accessibilityLabel="Close modal"
                    style={styles.closeButton}
                  >
                    <Text style={[styles.closeIcon, { color: colors['text-secondary'] }]}>×</Text>
                  </Pressable>
                )}
              </View>
            )}

            {/* Content */}
            <View style={styles.content}>
              {children}
            </View>

            {/* Footer */}
            {footer && (
              <View style={[styles.footer, { borderTopColor: colors['border-default'] }]}>
                {footer}
              </View>
            )}
          </Pressable>
        </Animated.View>
      </Pressable>
    </RNModal>
  );
}

export interface ConfirmModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
  /** Confirm handler */
  onConfirm: () => void;
  /** Modal title */
  title: string;
  /** Modal message */
  message: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Destructive action */
  destructive?: boolean;
}

/**
 * ConfirmModal - Confirmation dialog
 */
export function ConfirmModal({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  destructive = false,
}: ConfirmModalProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={title}
      size="sm"
      showCloseButton={false}
      footer={
        <View style={styles.confirmFooter}>
          <Pressable
            onPress={onClose}
            style={[styles.footerButton, { backgroundColor: colors['surface'] }]}
          >
            <Text style={[styles.footerButtonText, { color: colors['text-secondary'], ...theme.typography['type-label-md'] }]}>
              {cancelText}
            </Text>
          </Pressable>
          <Pressable
            onPress={handleConfirm}
            style={[
              styles.footerButton,
              { backgroundColor: destructive ? '#ef4444' : colors['gold-primary'] },
            ]}
          >
            <Text style={[styles.footerButtonText, { color: destructive ? '#ffffff' : colors['background'], ...theme.typography['type-label-md'] }]}>
              {confirmText}
            </Text>
          </Pressable>
        </View>
      }
    >
      <Text style={[styles.message, { color: colors['text-secondary'], ...theme.typography['type-body-md'] }]}>
        {message}
      </Text>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    borderRadius: 16,
    overflow: 'hidden',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  title: {},
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  closeIcon: {
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 28,
  },
  content: {
    padding: 20,
  },
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  confirmFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  footerButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerButtonText: {},
  message: {
    textAlign: 'center',
  },
});
