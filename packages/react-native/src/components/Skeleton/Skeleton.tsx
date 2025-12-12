import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, type ViewStyle } from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export interface SkeletonProps {
  /** Width of the skeleton (number or percentage string) */
  width?: number | string;
  /** Height of the skeleton */
  height?: number;
  /** Border radius */
  borderRadius?: number;
  /** Use circular shape (sets borderRadius to height/2) */
  circle?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Skeleton - Loading placeholder with pulse animation
 *
 * @example
 * ```tsx
 * <Skeleton width={200} height={20} />
 * <Skeleton width="100%" height={48} borderRadius={24} />
 * <Skeleton width={40} height={40} circle />
 * ```
 */
export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 4,
  circle = false,
  style,
}: SkeletonProps) {
  const colors = useColors();
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const finalRadius = circle ? height / 2 : borderRadius;

  return (
    <Animated.View
      style={[
        {
          width: width as number,
          height,
          borderRadius: finalRadius,
          backgroundColor: colors['surface-elevated'],
          opacity: pulseAnim,
        },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    />
  );
}

export interface SkeletonTextProps {
  /** Number of lines to render */
  lines?: number;
  /** Height of each line */
  lineHeight?: number;
  /** Width of the last line (percentage string) */
  lastLineWidth?: string;
  /** Gap between lines */
  spacing?: number;
  /** Custom style for container */
  style?: ViewStyle;
}

/**
 * SkeletonText - Loading placeholder for text content
 *
 * @example
 * ```tsx
 * <SkeletonText lines={3} lastLineWidth="60%" />
 * ```
 */
export function SkeletonText({
  lines = 3,
  lineHeight = 16,
  lastLineWidth = '60%',
  spacing = 8,
  style,
}: SkeletonTextProps) {
  const theme = useThemeObject();

  return (
    <View style={[styles.textContainer, style]}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          width={index === lines - 1 ? lastLineWidth : '100%'}
          height={lineHeight}
          borderRadius={4}
          style={{ marginBottom: index < lines - 1 ? spacing : 0 }}
        />
      ))}
    </View>
  );
}

export interface SkeletonGroupProps {
  /** Child skeleton elements */
  children: React.ReactNode;
  /** Custom style for container */
  style?: ViewStyle;
}

/**
 * SkeletonGroup - Container for organizing skeleton elements
 *
 * @example
 * ```tsx
 * <SkeletonGroup>
 *   <Skeleton width={60} height={60} circle />
 *   <SkeletonText lines={2} />
 * </SkeletonGroup>
 * ```
 */
export function SkeletonGroup({ children, style }: SkeletonGroupProps) {
  return <View style={style}>{children}</View>;
}

const styles = StyleSheet.create({
  textContainer: {
    width: '100%',
  },
});
