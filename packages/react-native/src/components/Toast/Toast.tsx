import React, { useEffect, useRef, createContext, useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastConfig {
  /** Toast message */
  message: string;
  /** Toast variant */
  variant?: ToastVariant;
  /** Duration in ms (0 for persistent) */
  duration?: number;
  /** Position on screen */
  position?: ToastPosition;
}

interface ToastState {
  id: number;
  message: string;
  variant: ToastVariant;
  duration: number;
  position: ToastPosition;
  visible: boolean;
}

interface ToastContextValue {
  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Hook to show toasts
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

/**
 * ToastProvider - Provides toast functionality to the app
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = useCallback(() => {
    setToast((prev) => (prev ? { ...prev, visible: false } : null));
    setTimeout(() => setToast(null), 300);
  }, []);

  const showToast = useCallback((config: ToastConfig) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const newToast: ToastState = {
      id: Date.now(),
      message: config.message,
      variant: config.variant || 'default',
      duration: config.duration ?? 3000,
      position: config.position || 'bottom',
      visible: true,
    };

    setToast(newToast);

    if (newToast.duration > 0) {
      timeoutRef.current = setTimeout(hideToast, newToast.duration);
    }
  }, [hideToast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && <ToastView toast={toast} />}
    </ToastContext.Provider>
  );
}

interface ToastViewProps {
  toast: ToastState;
}

function ToastView({ toast }: ToastViewProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const translateY = useRef(new Animated.Value(toast.position === 'top' ? -100 : 100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast.visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
          tension: 80,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: toast.position === 'top' ? -100 : 100,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [toast.visible, toast.position, translateY, opacity]);

  const variantStyles: Record<ToastVariant, { bg: string; text: string }> = {
    default: {
      bg: colors['surface-elevated'],
      text: colors['text-primary'],
    },
    success: {
      bg: '#065f46',
      text: '#d1fae5',
    },
    warning: {
      bg: '#78350f',
      text: '#fef3c7',
    },
    error: {
      bg: '#7f1d1d',
      text: '#fee2e2',
    },
    info: {
      bg: '#1e3a5f',
      text: '#dbeafe',
    },
  };

  const variant = variantStyles[toast.variant || 'default'];

  return (
    <Animated.View
      style={[
        styles.toast,
        toast.position === 'top' ? styles.toastTop : styles.toastBottom,
        {
          backgroundColor: variant.bg,
          borderRadius: Number(theme.radius['radius-interactive']),
          transform: [{ translateY }],
          opacity,
        },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Text
        style={[
          styles.message,
          {
            color: variant.text,
            ...theme.typography['type-body-md'],
          },
        ]}
      >
        {toast.message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 16,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  toastTop: {
    top: 60,
  },
  toastBottom: {
    bottom: 60,
  },
  message: {
    textAlign: 'center',
  },
});
