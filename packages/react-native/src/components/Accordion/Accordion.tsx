import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface AccordionItemProps {
  /** Item title */
  title: string;
  /** Item content */
  children: React.ReactNode;
  /** Whether the item is expanded */
  expanded?: boolean;
  /** Called when item is toggled */
  onToggle?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * AccordionItem - Individual expandable section
 */
export function AccordionItem({
  title,
  children,
  expanded = false,
  onToggle,
  disabled = false,
  style,
}: AccordionItemProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const rotateAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [expanded, rotateAnim]);

  const handleToggle = () => {
    if (!disabled && onToggle) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onToggle();
    }
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View
      style={[
        styles.item,
        {
          borderBottomColor: colors['border-default'],
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Pressable
        onPress={handleToggle}
        disabled={disabled}
        style={styles.header}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ expanded }}
      >
        <Text
          style={[
            styles.title,
            {
              color: colors['text-primary'],
              ...theme.typography['type-label-md'],
            },
          ]}
        >
          {title}
        </Text>
        <Animated.Text
          style={[
            styles.chevron,
            {
              color: colors['text-secondary'],
              transform: [{ rotate: rotation }],
            },
          ]}
        >
          ▼
        </Animated.Text>
      </Pressable>

      {expanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

export interface AccordionProps {
  /** Accordion items */
  children: React.ReactNode;
  /** Allow multiple items to be expanded */
  allowMultiple?: boolean;
  /** Default expanded item indices */
  defaultExpanded?: number[];
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Accordion - Expandable content sections
 *
 * @example
 * ```tsx
 * <Accordion>
 *   <AccordionItem title="What is the I Ching?">
 *     <Text>The I Ching is an ancient Chinese divination text...</Text>
 *   </AccordionItem>
 *   <AccordionItem title="How do I cast a reading?">
 *     <Text>You can use coins, yarrow stalks, or other methods...</Text>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export function Accordion({
  children,
  allowMultiple = false,
  defaultExpanded = [],
  style,
}: AccordionProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const [expandedIndices, setExpandedIndices] = useState<number[]>(defaultExpanded);

  const handleToggle = (index: number) => {
    setExpandedIndices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      if (allowMultiple) {
        return [...prev, index];
      }
      return [index];
    });
  };

  const childArray = React.Children.toArray(children);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors['border-default'],
          borderRadius: Number(theme.radius['radius-container']),
        },
        style,
      ]}
    >
      {childArray.map((child, index) => {
        if (React.isValidElement<AccordionItemProps>(child)) {
          return React.cloneElement(child, {
            key: index,
            expanded: expandedIndices.includes(index),
            onToggle: () => handleToggle(index),
          });
        }
        return child;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  item: {
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    flex: 1,
  },
  chevron: {
    fontSize: 10,
    marginLeft: 12,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
});
