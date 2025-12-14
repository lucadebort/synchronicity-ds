import React from 'react';
import { View, Text, StyleSheet, Pressable, type ViewStyle } from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';
import { HexagramVisual, type LineType } from '../HexagramVisual';

export interface ReadingCardProps {
  /** Hexagram number (1-64) */
  hexagramNumber: number;
  /** Hexagram name */
  name: string;
  /** Chinese name */
  chineseName?: string;
  /** Array of 6 line types */
  lines: LineType[];
  /** Date of the reading */
  date?: Date;
  /** Question or intention */
  question?: string;
  /** Whether reading has changing lines */
  hasChangingLines?: boolean;
  /** Transformed hexagram number (if has changing lines) */
  transformedNumber?: number;
  /** Transformed hexagram name */
  transformedName?: string;
  /** Press handler */
  onPress?: () => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * ReadingCard - Card displaying an I Ching reading summary
 *
 * @example
 * ```tsx
 * <ReadingCard
 *   hexagramNumber={1}
 *   name="The Creative"
 *   chineseName="乾"
 *   lines={['yang', 'yang', 'yang', 'yang', 'yang', 'yang']}
 *   date={new Date()}
 *   question="What should I focus on?"
 *   onPress={() => navigate('reading', { id })}
 * />
 * ```
 */
export function ReadingCard({
  hexagramNumber,
  name,
  chineseName,
  lines,
  date,
  question,
  hasChangingLines,
  transformedNumber,
  transformedName,
  onPress,
  size = 'md',
  style,
}: ReadingCardProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const sizeConfig = {
    sm: {
      padding: 12,
      hexagramSize: 'sm' as const,
      titleSize: 14,
      numberSize: 12,
      metaSize: 10,
    },
    md: {
      padding: 16,
      hexagramSize: 'md' as const,
      titleSize: 16,
      numberSize: 14,
      metaSize: 12,
    },
    lg: {
      padding: 20,
      hexagramSize: 'lg' as const,
      titleSize: 18,
      numberSize: 16,
      metaSize: 14,
    },
  };

  const config = sizeConfig[size];

  const formatDate = (d: Date): string => {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const content = (
    <View
      style={[
        styles.card,
        {
          padding: config.padding,
          backgroundColor: colors['surface-elevated'],
          borderColor: colors['border-default'],
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.hexagramSection}>
          <HexagramVisual lines={lines} size={config.hexagramSize} />
        </View>
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.number,
                {
                  ...theme.typography['type-label-md'],
                  fontSize: config.numberSize,
                  color: colors['gold-primary'],
                },
              ]}
            >
              {hexagramNumber}
            </Text>
            {chineseName && (
              <Text
                style={[
                  styles.chinese,
                  {
                    ...theme.typography['type-display-small'],
                    fontSize: config.titleSize + 4,
                    color: colors['text-primary'],
                  },
                ]}
              >
                {chineseName}
              </Text>
            )}
          </View>
          <Text
            style={[
              styles.name,
              {
                ...theme.typography['type-heading-sm'],
                fontSize: config.titleSize,
                color: colors['text-primary'],
              },
            ]}
            numberOfLines={1}
          >
            {name}
          </Text>
          {hasChangingLines && transformedNumber && transformedName && (
            <View style={styles.transformRow}>
              <Text
                style={[
                  styles.transformArrow,
                  {
                    ...theme.typography['type-body-sm'],
                    fontSize: config.metaSize,
                    color: colors['text-tertiary'],
                  },
                ]}
              >
                →
              </Text>
              <Text
                style={[
                  styles.transformText,
                  {
                    ...theme.typography['type-body-sm'],
                    fontSize: config.metaSize,
                    color: colors['gold-primary'],
                  },
                ]}
              >
                {transformedNumber}. {transformedName}
              </Text>
            </View>
          )}
        </View>
      </View>

      {(date || question) && (
        <View
          style={[
            styles.footer,
            { borderTopColor: colors['border-default'] },
          ]}
        >
          {question && (
            <Text
              style={[
                styles.question,
                {
                  ...theme.typography['type-body-sm'],
                  fontSize: config.metaSize,
                  color: colors['text-secondary'],
                },
              ]}
              numberOfLines={2}
            >
              {question}
            </Text>
          )}
          {date && (
            <Text
              style={[
                styles.date,
                {
                  ...theme.typography['type-body-sm'],
                  fontSize: config.metaSize,
                  color: colors['text-tertiary'],
                },
              ]}
            >
              {formatDate(date)}
            </Text>
          )}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Reading: ${name}`}
        style={({ pressed }) => [
          pressed && { opacity: 0.8 },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

/**
 * ReadingCardCompact - Minimal version for lists
 */
export interface ReadingCardCompactProps {
  /** Hexagram number */
  hexagramNumber: number;
  /** Hexagram name */
  name: string;
  /** Lines */
  lines: LineType[];
  /** Date */
  date?: Date;
  /** Press handler */
  onPress?: () => void;
  /** Custom style */
  style?: ViewStyle;
}

export function ReadingCardCompact({
  hexagramNumber,
  name,
  lines,
  date,
  onPress,
  style,
}: ReadingCardCompactProps) {
  const colors = useColors();
  const theme = useThemeObject();

  const formatDate = (d: Date): string => {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const content = (
    <View
      style={[
        styles.compactCard,
        {
          backgroundColor: colors['surface-elevated'],
          borderColor: colors['border-default'],
        },
        style,
      ]}
    >
      <HexagramVisual lines={lines} size="sm" />
      <View style={styles.compactInfo}>
        <Text
          style={[
            styles.compactName,
            {
              ...theme.typography['type-body-md'],
              color: colors['text-primary'],
            },
          ]}
          numberOfLines={1}
        >
          <Text style={{ color: colors['gold-primary'] }}>
            {hexagramNumber}.
          </Text>{' '}
          {name}
        </Text>
        {date && (
          <Text
            style={[
              styles.compactDate,
              {
                ...theme.typography['type-body-sm'],
                color: colors['text-tertiary'],
              },
            ]}
          >
            {formatDate(date)}
          </Text>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button">
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
  },
  hexagramSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  number: {
    fontWeight: '600',
  },
  chinese: {},
  name: {},
  transformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  transformArrow: {},
  transformText: {},
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  question: {},
  date: {
    marginTop: 4,
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
  },
  compactInfo: {
    flex: 1,
  },
  compactName: {},
  compactDate: {
    marginTop: 2,
  },
});
