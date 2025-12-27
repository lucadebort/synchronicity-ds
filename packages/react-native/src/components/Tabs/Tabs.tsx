import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
  type LayoutChangeEvent,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export interface TabItem {
  /** Tab key/value */
  key: string;
  /** Tab label */
  label: string;
  /** Tab icon */
  icon?: React.ReactNode;
  /** Badge count */
  badge?: number;
  /** Disabled state */
  disabled?: boolean;
}

export interface TabsProps {
  /** Tab items */
  tabs: TabItem[];
  /** Currently selected tab key */
  value: string;
  /** Change handler */
  onValueChange: (value: string) => void;
  /** Scrollable tabs */
  scrollable?: boolean;
  /** Full width tabs */
  fullWidth?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * Tabs - Horizontal tab navigation
 *
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { key: 'reading', label: 'Reading' },
 *     { key: 'trigrams', label: 'Trigrams' },
 *     { key: 'history', label: 'History', badge: 3 },
 *   ]}
 *   value={activeTab}
 *   onValueChange={setActiveTab}
 * />
 * ```
 */
export function Tabs({
  tabs,
  value,
  onValueChange,
  scrollable = false,
  fullWidth = false,
  style,
  accessibilityLabel = 'Tabs',
}: TabsProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const [tabLayouts, setTabLayouts] = useState<{ [key: string]: { x: number; width: number } }>({});
  const [focusedTab, setFocusedTab] = useState<string | null>(null);

  const selectedIndex = tabs.findIndex((tab) => tab.key === value);

  useEffect(() => {
    const layout = tabLayouts[value];
    if (layout) {
      Animated.parallel([
        Animated.spring(indicatorPosition, {
          toValue: layout.x,
          useNativeDriver: true,
          friction: 8,
          tension: 100,
        }),
        Animated.spring(indicatorWidth, {
          toValue: layout.width,
          useNativeDriver: false,
          friction: 8,
          tension: 100,
        }),
      ]).start();
    }
  }, [value, tabLayouts, indicatorPosition, indicatorWidth]);

  const handleTabLayout = (key: string) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts((prev) => ({
      ...prev,
      [key]: { x, width },
    }));
  };

  const handleTabPress = (key: string, disabled?: boolean) => {
    if (!disabled) {
      onValueChange(key);
    }
  };

  const TabsContainer = scrollable ? ScrollView : View;
  const containerProps = scrollable
    ? { horizontal: true, showsHorizontalScrollIndicator: false }
    : {};

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: colors['border-default'] },
        style,
      ]}
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
    >
      <TabsContainer
        {...containerProps}
        style={[styles.tabsWrapper, fullWidth && styles.fullWidth]}
        contentContainerStyle={fullWidth && styles.fullWidth}
      >
        <View style={[styles.tabsRow, fullWidth && styles.fullWidth]}>
          {tabs.map((tab) => {
            const isSelected = tab.key === value;
            const isDisabled = tab.disabled;

            const isFocused = focusedTab === tab.key;

            return (
              <Pressable
                key={tab.key}
                onPress={() => handleTabPress(tab.key, tab.disabled)}
                onLayout={handleTabLayout(tab.key)}
                onFocus={() => setFocusedTab(tab.key)}
                onBlur={() => setFocusedTab(null)}
                disabled={isDisabled}
                accessibilityRole="tab"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: isSelected, disabled: isDisabled }}
                style={[
                  styles.tab,
                  fullWidth && styles.tabFullWidth,
                  {
                    opacity: isDisabled ? 0.5 : 1,
                    borderBottomWidth: isFocused && !isDisabled ? 2 : 0,
                    borderBottomColor: isFocused && !isDisabled ? colors['border-focus'] : 'transparent',
                  },
                ]}
              >
                {tab.icon && <View style={styles.tabIcon}>{tab.icon}</View>}
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isSelected ? colors['gold-primary'] : colors['text-secondary'],
                      ...theme.typography['type-label-md'],
                    },
                  ]}
                >
                  {tab.label}
                </Text>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: colors['gold-primary'] },
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}

          <Animated.View
            style={[
              styles.indicator,
              {
                backgroundColor: colors['gold-primary'],
                width: indicatorWidth,
                transform: [{ translateX: indicatorPosition }],
              },
            ]}
          />
        </View>
      </TabsContainer>
    </View>
  );
}

export interface TabPanelProps {
  /** Panel content */
  children: React.ReactNode;
  /** Tab key this panel is for */
  value: string;
  /** Currently selected tab */
  selectedValue: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * TabPanel - Content panel for a tab
 */
export function TabPanel({
  children,
  value,
  selectedValue,
  style,
}: TabPanelProps) {
  if (value !== selectedValue) {
    return null;
  }

  return (
    <View style={style}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  tabsWrapper: {},
  fullWidth: {
    flex: 1,
  },
  tabsRow: {
    flexDirection: 'row',
    position: 'relative',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
  },
  tabFullWidth: {
    flex: 1,
  },
  tabIcon: {
    marginRight: 4,
  },
  tabLabel: {},
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1a1a24',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    borderRadius: 1,
  },
});
