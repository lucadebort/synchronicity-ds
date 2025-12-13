import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  ScrollView,
  StyleSheet,
  type ViewStyle,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type TimeFormat = '12h' | '24h';

export interface TimePickerProps {
  /** Selected time (Date object with time set) */
  value: Date | null;
  /** Time change handler */
  onValueChange: (date: Date) => void;
  /** Time format */
  format?: TimeFormat;
  /** Minute step */
  minuteStep?: number;
  /** Label */
  label?: string;
  /** Placeholder */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Custom format function */
  formatTime?: (date: Date) => string;
  /** Custom style */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

const ITEM_HEIGHT = 40;

/**
 * TimePicker - Time selection with wheel picker
 *
 * @example
 * ```tsx
 * <TimePicker
 *   value={time}
 *   onValueChange={setTime}
 *   label="Reading Time"
 * />
 * ```
 */
export function TimePicker({
  value,
  onValueChange,
  format = '12h',
  minuteStep = 1,
  label,
  placeholder = 'Select time',
  disabled = false,
  formatTime,
  style,
  accessibilityLabel,
}: TimePickerProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const [selectedHour, setSelectedHour] = useState(() => {
    if (!value) return format === '12h' ? 12 : 0;
    const h = value.getHours();
    return format === '12h' ? (h % 12) || 12 : h;
  });
  const [selectedMinute, setSelectedMinute] = useState(() => {
    if (!value) return 0;
    return Math.round(value.getMinutes() / minuteStep) * minuteStep;
  });
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(() => {
    if (!value) return 'AM';
    return value.getHours() >= 12 ? 'PM' : 'AM';
  });

  const hours = format === '12h'
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i);

  const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);

  const defaultFormatTime = (date: Date) => {
    const h = date.getHours();
    const m = date.getMinutes();
    if (format === '24h') {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }
    const hour12 = (h % 12) || 12;
    const period = h >= 12 ? 'PM' : 'AM';
    return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const formatFn = formatTime || defaultFormatTime;

  const openPicker = () => {
    if (disabled) return;
    if (value) {
      const h = value.getHours();
      setSelectedHour(format === '12h' ? (h % 12) || 12 : h);
      setSelectedMinute(Math.round(value.getMinutes() / minuteStep) * minuteStep);
      setSelectedPeriod(h >= 12 ? 'PM' : 'AM');
    }
    setIsOpen(true);
    Animated.spring(slideAnim, {
      toValue: 1,
      friction: 8,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  const closePicker = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsOpen(false));
  };

  const handleConfirm = () => {
    const now = value || new Date();
    const newDate = new Date(now);
    let hour = selectedHour;

    if (format === '12h') {
      if (selectedPeriod === 'AM' && hour === 12) {
        hour = 0;
      } else if (selectedPeriod === 'PM' && hour !== 12) {
        hour += 12;
      }
    }

    newDate.setHours(hour, selectedMinute, 0, 0);
    onValueChange(newDate);
    closePicker();
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <>
      <View style={[styles.container, style]}>
        {label && (
          <Text style={[styles.label, { color: colors['text-secondary'], ...theme.typography['type-label-sm'] }]}>
            {label}
          </Text>
        )}
        <Pressable
          onPress={openPicker}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel || label || 'Time picker'}
          accessibilityState={{ disabled }}
          style={[
            styles.trigger,
            {
              backgroundColor: colors['surface'],
              borderColor: colors['border-default'],
              opacity: disabled ? 0.5 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.triggerText,
              {
                color: value ? colors['text-primary'] : colors['text-secondary'],
                ...theme.typography['type-body-md'],
              },
            ]}
          >
            {value ? formatFn(value) : placeholder}
          </Text>
          <Text style={[styles.clockIcon, { color: colors['text-secondary'] }]}>🕐</Text>
        </Pressable>
      </View>

      <Modal visible={isOpen} transparent animationType="none" onRequestClose={closePicker}>
        <Pressable style={styles.backdrop} onPress={closePicker}>
          <Animated.View
            style={[
              styles.picker,
              {
                backgroundColor: colors['surface-elevated'],
                transform: [{ translateY }],
              },
            ]}
          >
            <Pressable>
              {/* Header */}
              <View style={[styles.header, { borderBottomColor: colors['border-default'] }]}>
                <Pressable onPress={closePicker} style={styles.headerButton}>
                  <Text style={[styles.headerButtonText, { color: colors['text-secondary'], ...theme.typography['type-label-md'] }]}>
                    Cancel
                  </Text>
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors['text-primary'], ...theme.typography['type-label-lg'] }]}>
                  Select Time
                </Text>
                <Pressable onPress={handleConfirm} style={styles.headerButton}>
                  <Text style={[styles.headerButtonText, { color: colors['gold-primary'], ...theme.typography['type-label-md'] }]}>
                    Done
                  </Text>
                </Pressable>
              </View>

              {/* Wheel pickers */}
              <View style={styles.wheels}>
                <WheelPicker
                  items={hours}
                  selected={selectedHour}
                  onSelect={setSelectedHour}
                  formatItem={(h) => h.toString().padStart(2, '0')}
                  colors={colors}
                  theme={theme}
                />
                <Text style={[styles.separator, { color: colors['text-primary'] }]}>:</Text>
                <WheelPicker
                  items={minutes}
                  selected={selectedMinute}
                  onSelect={setSelectedMinute}
                  formatItem={(m) => m.toString().padStart(2, '0')}
                  colors={colors}
                  theme={theme}
                />
                {format === '12h' && (
                  <WheelPicker
                    items={['AM', 'PM'] as const}
                    selected={selectedPeriod}
                    onSelect={setSelectedPeriod as (val: 'AM' | 'PM') => void}
                    formatItem={(p) => p}
                    colors={colors}
                    theme={theme}
                  />
                )}
              </View>

              {/* Selection indicator */}
              <View
                style={[
                  styles.selectionIndicator,
                  { borderColor: colors['border-default'] },
                ]}
                pointerEvents="none"
              />
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

interface WheelPickerProps<T extends string | number> {
  items: readonly T[];
  selected: T;
  onSelect: (item: T) => void;
  formatItem: (item: T) => string;
  colors: Record<string, string>;
  theme: { typography: Record<string, { fontSize?: number; fontWeight?: string; lineHeight?: number }> };
}

function WheelPicker<T extends string | number>({
  items,
  selected,
  onSelect,
  formatItem,
  colors,
  theme,
}: WheelPickerProps<T>) {
  const scrollRef = useRef<ScrollView>(null);
  const selectedIndex = items.indexOf(selected);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (index >= 0 && index < items.length) {
      onSelect(items[index]);
    }
  }, [items, onSelect]);

  React.useEffect(() => {
    const index = items.indexOf(selected);
    if (index >= 0 && scrollRef.current) {
      scrollRef.current.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
    }
  }, []);

  return (
    <View style={styles.wheelContainer}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScroll}
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
      >
        {items.map((item, index) => {
          const isSelected = item === selected;
          return (
            <View key={index} style={styles.wheelItem}>
              <Text
                style={[
                  styles.wheelItemText,
                  {
                    color: isSelected ? colors['text-primary'] : colors['text-secondary'],
                    opacity: isSelected ? 1 : 0.5,
                    ...theme.typography['type-body-lg'],
                    fontSize: isSelected ? 22 : 18,
                    fontWeight: isSelected ? '600' : '400',
                  },
                ]}
              >
                {formatItem(item)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  triggerText: {},
  clockIcon: {
    fontSize: 18,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  picker: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  headerButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  headerButtonText: {},
  headerTitle: {
    textAlign: 'center',
  },
  wheels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_HEIGHT * 5,
    paddingHorizontal: 16,
  },
  wheelContainer: {
    width: 80,
    height: ITEM_HEIGHT * 5,
    overflow: 'hidden',
  },
  wheelItem: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelItemText: {
    textAlign: 'center',
  },
  separator: {
    fontSize: 24,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  selectionIndicator: {
    position: 'absolute',
    top: 60 + ITEM_HEIGHT * 2,
    left: 32,
    right: 32,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    pointerEvents: 'none',
  },
});
