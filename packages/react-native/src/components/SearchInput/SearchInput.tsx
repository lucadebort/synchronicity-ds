import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type TextInputProps,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type SearchInputSize = 'sm' | 'md' | 'lg';

export interface SearchInputProps extends Omit<TextInputProps, 'style'> {
  /** Current value */
  value: string;
  /** Change handler */
  onChangeText: (text: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Size of the input */
  size?: SearchInputSize;
  /** Show loading indicator */
  loading?: boolean;
  /** Called when clear button is pressed */
  onClear?: () => void;
  /** Called when search is submitted */
  onSubmit?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * SearchInput - Text input optimized for search
 *
 * @example
 * ```tsx
 * <SearchInput
 *   value={query}
 *   onChangeText={setQuery}
 *   placeholder="Search hexagrams..."
 *   onSubmit={handleSearch}
 *   onClear={() => setQuery('')}
 * />
 * ```
 */
export function SearchInput({
  value,
  onChangeText,
  placeholder = 'Search...',
  size = 'md',
  loading = false,
  onClear,
  onSubmit,
  disabled = false,
  style,
  accessibilityLabel = 'Search',
  ...rest
}: SearchInputProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const sizeConfig = {
    sm: { height: 36, fontSize: 14, iconSize: 16, padding: 10 },
    md: { height: 44, fontSize: 16, iconSize: 18, padding: 12 },
    lg: { height: 52, fontSize: 18, iconSize: 20, padding: 14 },
  };

  const currentSize = sizeConfig[size];

  const borderColor = isFocused ? colors['gold-primary'] : colors['border-default'];

  const handleClear = () => {
    onChangeText('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: currentSize.height,
          borderColor,
          backgroundColor: colors['surface'],
          borderRadius: Number(theme.radius['radius-interactive']),
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.searchIcon,
          {
            fontSize: currentSize.iconSize,
            color: colors['text-tertiary'],
          },
        ]}
      >
        🔍
      </Text>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors['text-tertiary']}
        editable={!disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        accessibilityLabel={accessibilityLabel}
        style={[
          styles.input,
          {
            color: colors['text-primary'],
            fontSize: currentSize.fontSize,
            paddingHorizontal: currentSize.padding,
          },
        ]}
        {...rest}
      />

      {loading && (
        <Text style={[styles.loadingIcon, { color: colors['text-tertiary'] }]}>
          ⟳
        </Text>
      )}

      {value.length > 0 && !loading && (
        <Pressable
          onPress={handleClear}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={styles.clearButton}
        >
          <Text
            style={[
              styles.clearIcon,
              {
                color: colors['text-tertiary'],
                fontSize: currentSize.iconSize,
              },
            ]}
          >
            ✕
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  loadingIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
  },
  clearIcon: {},
});
