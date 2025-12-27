import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /** Label text displayed above the input */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error message (displays in error state) */
  error?: string;
  /** Visual variant */
  variant?: 'default' | 'filled';
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Left icon or element */
  leftElement?: React.ReactNode;
  /** Right icon or element */
  rightElement?: React.ReactNode;
  /** Full width input */
  fullWidth?: boolean;
  /** Container style override */
  containerStyle?: ViewStyle;
  /** Input style override */
  inputStyle?: ViewStyle;
}

/**
 * Input - Text input component with label and validation states
 *
 * @example
 * ```tsx
 * <Input
 *   label="Question"
 *   placeholder="What would you like to ask?"
 *   helperText="Be specific about your question"
 *   value={question}
 *   onChangeText={setQuestion}
 * />
 * ```
 */
export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      helperText,
      error,
      variant = 'default',
      size = 'md',
      leftElement,
      rightElement,
      fullWidth = false,
      containerStyle,
      inputStyle,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
  const colors = useColors();
  const theme = useThemeObject();
  const [isFocused, setIsFocused] = useState(false);
  const borderAnimation = useRef(new Animated.Value(0)).current;

  const hasError = !!error;

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.timing(borderAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    Animated.timing(borderAnimation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
    onBlur?.(e);
  };

  const sizeStyles = {
    sm: {
      height: 40,
      paddingHorizontal: theme.spacing['inset-sm'],
      fontSize: theme.typography['type-body-sm'].fontSize,
    },
    md: {
      height: 48,
      paddingHorizontal: theme.spacing['inset-md'],
      fontSize: theme.typography['type-body-md'].fontSize,
    },
    lg: {
      height: 56,
      paddingHorizontal: theme.spacing['inset-md'],
      fontSize: theme.typography['type-body-lg'].fontSize,
    },
  };

  const currentSize = sizeStyles[size];

  const borderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      hasError ? colors['support-error'] : colors['border-default'],
      hasError ? colors['support-error'] : colors['interactive-primary'],
    ],
  });

  const backgroundColor =
    variant === 'filled' ? colors['surface'] : 'transparent';

  return (
    <View style={[fullWidth && styles.fullWidth, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: hasError ? colors['support-error'] : colors['text-secondary'],
              fontSize: theme.typography['type-body-sm'].fontSize,
              marginBottom: theme.spacing['stack-xs'],
            },
          ]}
        >
          {label}
        </Text>
      )}

      <Animated.View
        style={[
          styles.inputContainer,
          {
            height: currentSize.height,
            borderColor: borderColor,
            borderRadius: theme.radius['radius-interactive'],
            backgroundColor,
          },
          variant === 'default' && styles.inputContainerBorder,
        ]}
      >
        {leftElement && (
          <View style={[styles.element, { marginRight: theme.spacing['inline-xs'] }]}>
            {leftElement}
          </View>
        )}

        <TextInput
          ref={ref}
          style={[
            styles.input,
            {
              color: colors['text-primary'],
              fontSize: currentSize.fontSize,
              paddingHorizontal: currentSize.paddingHorizontal,
            },
            inputStyle,
          ]}
          placeholderTextColor={colors['text-tertiary']}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={label || props.placeholder}
          {...props}
        />

        {rightElement && (
          <View style={[styles.element, { marginLeft: theme.spacing['inline-xs'] }]}>
            {rightElement}
          </View>
        )}
      </Animated.View>

      {(helperText || error) && (
        <Text
          style={[
            styles.helperText,
            {
              color: hasError ? colors['support-error'] : colors['text-tertiary'],
              fontSize: theme.typography['type-caption'].fontSize,
              marginTop: theme.spacing['stack-xs'],
            },
          ]}
          accessibilityRole={hasError ? 'alert' : undefined}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  label: {
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerBorder: {
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  element: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    // Styles applied inline
  },
});
