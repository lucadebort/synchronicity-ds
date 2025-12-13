import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  type ViewStyle,
  type LayoutChangeEvent,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface CollapsibleProps {
  /** Header content */
  title: string | React.ReactNode;
  /** Collapsible content */
  children: React.ReactNode;
  /** Initial expanded state */
  defaultExpanded?: boolean;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Expansion change handler */
  onExpandedChange?: (expanded: boolean) => void;
  /** Disable animation */
  noAnimation?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Header style */
  headerStyle?: ViewStyle;
  /** Content style */
  contentStyle?: ViewStyle;
}

/**
 * Collapsible - Expandable/collapsible content section
 *
 * @example
 * ```tsx
 * <Collapsible title="Show more details">
 *   <Text>Hidden content that can be revealed.</Text>
 * </Collapsible>
 * ```
 */
export function Collapsible({
  title,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  noAnimation = false,
  style,
  headerStyle,
  contentStyle,
}: CollapsibleProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const rotateAnim = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const heightAnim = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggle = useCallback(() => {
    const newExpanded = !isExpanded;

    if (!noAnimation) {
      Animated.parallel([
        Animated.spring(rotateAnim, {
          toValue: newExpanded ? 1 : 0,
          friction: 8,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(heightAnim, {
          toValue: newExpanded ? 1 : 0,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      rotateAnim.setValue(newExpanded ? 1 : 0);
      heightAnim.setValue(newExpanded ? 1 : 0);
    }

    if (controlledExpanded === undefined) {
      setInternalExpanded(newExpanded);
    }
    onExpandedChange?.(newExpanded);
  }, [isExpanded, controlledExpanded, rotateAnim, heightAnim, noAnimation, onExpandedChange]);

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0) {
      setContentHeight(height);
    }
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight || 200],
  });

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={handleToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        style={[
          styles.header,
          { borderBottomColor: colors['border-default'] },
          isExpanded && styles.headerExpanded,
          headerStyle,
        ]}
      >
        <View style={styles.headerContent}>
          {typeof title === 'string' ? (
            <Text
              style={[
                styles.headerText,
                {
                  color: colors['text-primary'],
                  ...theme.typography['type-label-md'],
                },
              ]}
            >
              {title}
            </Text>
          ) : (
            title
          )}
        </View>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <Text style={[styles.chevron, { color: colors['text-secondary'] }]}>▼</Text>
        </Animated.View>
      </Pressable>

      <Animated.View
        style={[
          styles.contentWrapper,
          { height: contentHeight > 0 ? animatedHeight : 'auto', opacity: isExpanded || contentHeight === 0 ? 1 : heightAnim },
        ]}
      >
        <View
          onLayout={handleContentLayout}
          style={[
            styles.content,
            contentStyle,
            { display: isExpanded || contentHeight === 0 ? 'flex' : 'none' },
          ]}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

export interface CollapsibleGroupProps {
  /** Child collapsible items */
  children: React.ReactNode;
  /** Only allow one item expanded at a time */
  accordion?: boolean;
  /** Custom style */
  style?: ViewStyle;
}

/**
 * CollapsibleGroup - Group of collapsible items with optional accordion behavior
 */
export function CollapsibleGroup({
  children,
  accordion = false,
  style,
}: CollapsibleGroupProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!accordion) {
    return <View style={style}>{children}</View>;
  }

  return (
    <View style={style}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<CollapsibleProps>, {
            expanded: expandedIndex === index,
            onExpandedChange: (expanded: boolean) => {
              setExpandedIndex(expanded ? index : null);
            },
          });
        }
        return child;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  headerExpanded: {},
  headerContent: {
    flex: 1,
    marginRight: 12,
  },
  headerText: {},
  chevron: {
    fontSize: 10,
  },
  contentWrapper: {
    overflow: 'hidden',
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
});
