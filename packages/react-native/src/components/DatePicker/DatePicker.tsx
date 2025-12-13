import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  ScrollView,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export interface DatePickerProps {
  /** Selected date */
  value: Date | null;
  /** Date change handler */
  onValueChange: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Label */
  label?: string;
  /** Placeholder */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Format function */
  formatDate?: (date: Date) => string;
  /** Custom style */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * DatePicker - Calendar date selection
 *
 * @example
 * ```tsx
 * <DatePicker
 *   value={date}
 *   onValueChange={setDate}
 *   label="Reading Date"
 * />
 * ```
 */
export function DatePicker({
  value,
  onValueChange,
  minDate,
  maxDate,
  label,
  placeholder = 'Select date',
  disabled = false,
  formatDate,
  style,
  accessibilityLabel,
}: DatePickerProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
  const slideAnim = useRef(new Animated.Value(0)).current;

  const defaultFormatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const format = formatDate || defaultFormatDate;

  const openPicker = () => {
    if (disabled) return;
    setViewDate(value || new Date());
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

  const handleSelectDate = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onValueChange(newDate);
    closePicker();
  };

  const navigateMonth = (direction: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + direction, 1));
  };

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: Array<{ day: number; isCurrentMonth: boolean; isDisabled: boolean }> = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, isDisabled: true });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDisabled =
        (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) ||
        (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)));
      days.push({ day, isCurrentMonth: true, isDisabled: !!isDisabled });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ day, isCurrentMonth: false, isDisabled: true });
    }

    return days;
  }, [viewDate, minDate, maxDate]);

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      viewDate.getMonth() === today.getMonth() &&
      viewDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      value &&
      day === value.getDate() &&
      viewDate.getMonth() === value.getMonth() &&
      viewDate.getFullYear() === value.getFullYear()
    );
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
          accessibilityLabel={accessibilityLabel || label || 'Date picker'}
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
            {value ? format(value) : placeholder}
          </Text>
          <Text style={[styles.calendarIcon, { color: colors['text-secondary'] }]}>📅</Text>
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
                <Pressable onPress={() => navigateMonth(-1)} style={styles.navButton}>
                  <Text style={[styles.navText, { color: colors['text-primary'] }]}>‹</Text>
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors['text-primary'], ...theme.typography['type-label-lg'] }]}>
                  {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                </Text>
                <Pressable onPress={() => navigateMonth(1)} style={styles.navButton}>
                  <Text style={[styles.navText, { color: colors['text-primary'] }]}>›</Text>
                </Pressable>
              </View>

              {/* Day names */}
              <View style={styles.daysHeader}>
                {DAYS.map((day) => (
                  <Text
                    key={day}
                    style={[styles.dayName, { color: colors['text-secondary'], ...theme.typography['type-label-sm'] }]}
                  >
                    {day}
                  </Text>
                ))}
              </View>

              {/* Calendar grid */}
              <View style={styles.calendar}>
                {calendarDays.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => item.isCurrentMonth && !item.isDisabled && handleSelectDate(item.day)}
                    disabled={!item.isCurrentMonth || item.isDisabled}
                    style={[
                      styles.dayCell,
                      isSelected(item.day) && item.isCurrentMonth && {
                        backgroundColor: colors['gold-primary'],
                        borderRadius: 20,
                      },
                      isToday(item.day) && item.isCurrentMonth && !isSelected(item.day) && {
                        borderWidth: 1,
                        borderColor: colors['gold-primary'],
                        borderRadius: 20,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        {
                          color: !item.isCurrentMonth || item.isDisabled
                            ? colors['text-secondary']
                            : isSelected(item.day)
                            ? colors['background']
                            : colors['text-primary'],
                          opacity: !item.isCurrentMonth ? 0.3 : item.isDisabled ? 0.5 : 1,
                          ...theme.typography['type-body-md'],
                        },
                      ]}
                    >
                      {item.day}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {/* Actions */}
              <View style={[styles.actions, { borderTopColor: colors['border-default'] }]}>
                <Pressable onPress={closePicker} style={styles.actionButton}>
                  <Text style={[styles.actionText, { color: colors['text-secondary'], ...theme.typography['type-label-md'] }]}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    onValueChange(new Date());
                    closePicker();
                  }}
                  style={styles.actionButton}
                >
                  <Text style={[styles.actionText, { color: colors['gold-primary'], ...theme.typography['type-label-md'] }]}>
                    Today
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
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
  calendarIcon: {
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
  navButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 28,
    fontWeight: '300',
  },
  headerTitle: {
    textAlign: 'center',
  },
  daysHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {},
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    marginTop: 8,
    gap: 24,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {},
});
