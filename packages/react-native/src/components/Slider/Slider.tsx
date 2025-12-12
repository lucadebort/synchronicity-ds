import React, { useRef } from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  type ViewStyle,
  type LayoutChangeEvent,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderProps {
  /** Current value */
  value: number;
  /** Called when value changes */
  onValueChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Size of the slider */
  size?: SliderSize;
  /** Disabled state */
  disabled?: boolean;
  /** Custom track color */
  trackColor?: string;
  /** Custom fill color */
  fillColor?: string;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel: string;
}

/**
 * Slider - Range input for selecting numeric values
 *
 * @example
 * ```tsx
 * <Slider
 *   value={volume}
 *   onValueChange={setVolume}
 *   min={0}
 *   max={100}
 *   accessibilityLabel="Volume"
 * />
 * ```
 */
export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  disabled = false,
  trackColor,
  fillColor,
  style,
  accessibilityLabel,
}: SliderProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const trackWidth = useRef(0);
  const pan = useRef(new Animated.Value(0)).current;

  const sizeConfig = {
    sm: { trackHeight: 4, thumbSize: 16 },
    md: { trackHeight: 6, thumbSize: 20 },
    lg: { trackHeight: 8, thumbSize: 24 },
  };

  const currentSize = sizeConfig[size];

  const clamp = (val: number, minVal: number, maxVal: number) => {
    return Math.min(Math.max(val, minVal), maxVal);
  };

  const valueToPosition = (val: number) => {
    const percentage = (val - min) / (max - min);
    return percentage * trackWidth.current;
  };

  const positionToValue = (pos: number) => {
    const percentage = pos / trackWidth.current;
    const rawValue = percentage * (max - min) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    return clamp(steppedValue, min, max);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        pan.setOffset(valueToPosition(value));
        pan.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        const newPosition = clamp(
          valueToPosition(value) + gestureState.dx,
          0,
          trackWidth.current
        );
        const newValue = positionToValue(newPosition);
        if (newValue !== value) {
          onValueChange(newValue);
        }
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    trackWidth.current = event.nativeEvent.layout.width - currentSize.thumbSize;
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <View
      style={[
        styles.container,
        { opacity: disabled ? 0.5 : 1 },
        style,
      ]}
      onLayout={handleLayout}
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{
        min,
        max,
        now: value,
      }}
    >
      <View
        style={[
          styles.track,
          {
            height: currentSize.trackHeight,
            backgroundColor: trackColor || colors['surface-elevated'],
            borderRadius: currentSize.trackHeight / 2,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              height: currentSize.trackHeight,
              backgroundColor: fillColor || colors['gold-primary'],
              borderRadius: currentSize.trackHeight / 2,
            },
          ]}
        />
      </View>

      <View
        {...panResponder.panHandlers}
        style={[
          styles.thumbContainer,
          {
            left: `${percentage}%`,
            marginLeft: -currentSize.thumbSize / 2,
          },
        ]}
      >
        <View
          style={[
            styles.thumb,
            {
              width: currentSize.thumbSize,
              height: currentSize.thumbSize,
              borderRadius: currentSize.thumbSize / 2,
              backgroundColor: colors['text-on-color'],
              borderWidth: 2,
              borderColor: colors['gold-primary'],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    width: '100%',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  thumbContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
