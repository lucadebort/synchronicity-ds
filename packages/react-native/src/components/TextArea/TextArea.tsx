import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextInputProps,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export interface TextAreaProps extends Omit<TextInputProps, 'style' | 'multiline'> {
  /** Current value */
  value: string;
  /** Change handler */
  onChangeText: (text: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label above the input */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (shows error state) */
  error?: string;
  /** Number of lines */
  numberOfLines?: number;
  /** Maximum character count */
  maxLength?: number;
  /** Show character count */
  showCharacterCount?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel: string;
}

/**
 * TextArea - Multi-line text input
 *
 * @example
 * ```tsx
 * <TextArea
 *   value={notes}
 *   onChangeText={setNotes}
 *   label="Reading Notes"
 *   placeholder="Enter your thoughts..."
 *   numberOfLines={4}
 *   maxLength={500}
 *   showCharacterCount
 *   accessibilityLabel="Reading notes"
 * />
 * ```
 */
export function TextArea({
  value,
  onChangeText,
  placeholder,
  label,
  helperText,
  error,
  numberOfLines = 4,
  maxLength,
  showCharacterCount = false,
  disabled = false,
  style,
  accessibilityLabel,
  ...rest
}: TextAreaProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const [isFocused, setIsFocused] = useState(false);

  const hasError = !!error;
  const borderColor = hasError
    ? '#ef4444'
    : isFocused
    ? colors['gold-primary']
    : colors['border-default'];

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: colors['text-primary'],
              ...theme.typography['type-label-sm'],
            },
          ]}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            backgroundColor: colors['surface'],
            borderRadius: Number(theme.radius['radius-interactive']),
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors['text-tertiary']}
          multiline
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={accessibilityLabel}
          style={[
            styles.input,
            {
              color: colors['text-primary'],
              minHeight: numberOfLines * 24,
              ...theme.typography['type-body-md'],
            },
          ]}
          textAlignVertical="top"
          {...rest}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          {hasError ? (
            <Text
              style={[
                styles.error,
                {
                  color: '#ef4444',
                  ...theme.typography['type-body-sm'],
                },
              ]}
            >
              {error}
            </Text>
          ) : helperText ? (
            <Text
              style={[
                styles.helperText,
                {
                  color: colors['text-tertiary'],
                  ...theme.typography['type-body-sm'],
                },
              ]}
            >
              {helperText}
            </Text>
          ) : null}
        </View>

        {showCharacterCount && maxLength && (
          <Text
            style={[
              styles.characterCount,
              {
                color: value.length >= maxLength ? '#ef4444' : colors['text-tertiary'],
                ...theme.typography['type-body-sm'],
              },
            ]}
          >
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    padding: 12,
  },
  input: {
    padding: 0,
    margin: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  footerLeft: {
    flex: 1,
  },
  helperText: {},
  error: {},
  characterCount: {
    marginLeft: 8,
  },
});
