import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, useThemeObject } from '../../hooks/useTheme';

export type StepStatus = 'pending' | 'current' | 'completed';
export type StepIndicatorVariant = 'horizontal' | 'vertical';

export interface Step {
  /** Step key */
  key: string;
  /** Step label */
  label: string;
  /** Optional description */
  description?: string;
  /** Step icon when completed */
  completedIcon?: React.ReactNode;
}

export interface StepIndicatorProps {
  /** Array of steps */
  steps: Step[];
  /** Currently active step index */
  currentStep: number;
  /** Layout variant */
  variant?: StepIndicatorVariant;
  /** Allow clicking on completed steps */
  onStepPress?: (index: number) => void;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * StepIndicator - Progress indicator for multi-step flows
 *
 * @example
 * ```tsx
 * <StepIndicator
 *   steps={[
 *     { key: 'question', label: 'Ask Question' },
 *     { key: 'cast', label: 'Cast Hexagram' },
 *     { key: 'interpret', label: 'Interpretation' },
 *   ]}
 *   currentStep={1}
 * />
 * ```
 */
export function StepIndicator({
  steps,
  currentStep,
  variant = 'horizontal',
  onStepPress,
  style,
  accessibilityLabel = 'Progress indicator',
}: StepIndicatorProps) {
  const colors = useColors();
  const theme = useThemeObject();
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(progressAnim, {
      toValue: currentStep,
      friction: 8,
      tension: 50,
      useNativeDriver: false,
    }).start();
  }, [currentStep, progressAnim]);

  const getStepStatus = (index: number): StepStatus => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'pending';
  };

  const handleStepPress = (index: number) => {
    if (onStepPress && index <= currentStep) {
      onStepPress(index);
    }
  };

  const renderStep = (step: Step, index: number) => {
    const status = getStepStatus(index);
    const isClickable = onStepPress && index <= currentStep;

    const getStepColor = () => {
      switch (status) {
        case 'completed':
          return colors['gold-primary'];
        case 'current':
          return colors['gold-primary'];
        default:
          return colors['border-default'];
      }
    };

    const getTextColor = () => {
      switch (status) {
        case 'completed':
        case 'current':
          return colors['text-primary'];
        default:
          return colors['text-secondary'];
      }
    };

    const stepContent = (
      <>
        <View
          style={[
            styles.stepCircle,
            {
              backgroundColor: status === 'current' ? colors['gold-primary'] : 'transparent',
              borderColor: getStepColor(),
              borderWidth: 2,
            },
          ]}
        >
          {status === 'completed' ? (
            step.completedIcon || (
              <Text style={[styles.checkmark, { color: colors['gold-primary'] }]}>✓</Text>
            )
          ) : (
            <Text
              style={[
                styles.stepNumber,
                {
                  color: status === 'current' ? colors['background'] : getStepColor(),
                },
              ]}
            >
              {index + 1}
            </Text>
          )}
        </View>
        <View style={variant === 'horizontal' ? styles.stepTextHorizontal : styles.stepTextVertical}>
          <Text
            style={[
              styles.stepLabel,
              {
                color: getTextColor(),
                ...theme.typography['type-label-sm'],
              },
            ]}
            numberOfLines={1}
          >
            {step.label}
          </Text>
          {step.description && variant === 'vertical' && (
            <Text
              style={[
                styles.stepDescription,
                {
                  color: colors['text-secondary'],
                  ...theme.typography['type-body-sm'],
                },
              ]}
              numberOfLines={2}
            >
              {step.description}
            </Text>
          )}
        </View>
      </>
    );

    if (variant === 'horizontal') {
      return (
        <View key={step.key} style={styles.horizontalStepWrapper}>
          <Pressable
            onPress={() => handleStepPress(index)}
            disabled={!isClickable}
            accessibilityRole="button"
            accessibilityLabel={`Step ${index + 1}: ${step.label}`}
            accessibilityState={{ selected: status === 'current' }}
            style={[
              styles.horizontalStep,
              { opacity: isClickable ? 1 : status === 'pending' ? 0.7 : 1 },
            ]}
          >
            {stepContent}
          </Pressable>
          {index < steps.length - 1 && (
            <View style={[styles.horizontalConnector, { backgroundColor: colors['border-default'] }]}>
              <Animated.View
                style={[
                  styles.horizontalConnectorProgress,
                  {
                    backgroundColor: colors['gold-primary'],
                    width: progressAnim.interpolate({
                      inputRange: [index, index + 1],
                      outputRange: ['0%', '100%'],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
              />
            </View>
          )}
        </View>
      );
    }

    return (
      <View key={step.key} style={styles.verticalStepWrapper}>
        <View style={styles.verticalStepLeft}>
          <Pressable
            onPress={() => handleStepPress(index)}
            disabled={!isClickable}
            accessibilityRole="button"
            accessibilityLabel={`Step ${index + 1}: ${step.label}`}
            accessibilityState={{ selected: status === 'current' }}
          >
            <View
              style={[
                styles.stepCircle,
                {
                  backgroundColor: status === 'current' ? colors['gold-primary'] : 'transparent',
                  borderColor: getStepColor(),
                  borderWidth: 2,
                },
              ]}
            >
              {status === 'completed' ? (
                step.completedIcon || (
                  <Text style={[styles.checkmark, { color: colors['gold-primary'] }]}>✓</Text>
                )
              ) : (
                <Text
                  style={[
                    styles.stepNumber,
                    {
                      color: status === 'current' ? colors['background'] : getStepColor(),
                    },
                  ]}
                >
                  {index + 1}
                </Text>
              )}
            </View>
          </Pressable>
          {index < steps.length - 1 && (
            <View style={[styles.verticalConnector, { backgroundColor: colors['border-default'] }]}>
              <Animated.View
                style={[
                  styles.verticalConnectorProgress,
                  {
                    backgroundColor: colors['gold-primary'],
                    height: progressAnim.interpolate({
                      inputRange: [index, index + 1],
                      outputRange: ['0%', '100%'],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
              />
            </View>
          )}
        </View>
        <View style={styles.verticalStepContent}>
          <Text
            style={[
              styles.stepLabel,
              {
                color: getTextColor(),
                ...theme.typography['type-label-md'],
              },
            ]}
          >
            {step.label}
          </Text>
          {step.description && (
            <Text
              style={[
                styles.stepDescription,
                {
                  color: colors['text-secondary'],
                  ...theme.typography['type-body-sm'],
                },
              ]}
            >
              {step.description}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        variant === 'horizontal' ? styles.horizontalContainer : styles.verticalContainer,
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: steps.length - 1, now: currentStep }}
    >
      {steps.map((step, index) => renderStep(step, index))}
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  verticalContainer: {
    flexDirection: 'column',
  },
  horizontalStepWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  horizontalStep: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    fontWeight: '700',
  },
  stepTextHorizontal: {
    marginTop: 8,
    alignItems: 'center',
    maxWidth: 80,
  },
  stepTextVertical: {
    marginLeft: 12,
  },
  stepLabel: {
    textAlign: 'center',
  },
  stepDescription: {
    marginTop: 4,
    textAlign: 'left',
  },
  horizontalConnector: {
    flex: 1,
    height: 2,
    marginTop: 15,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  horizontalConnectorProgress: {
    height: '100%',
  },
  verticalStepWrapper: {
    flexDirection: 'row',
    minHeight: 72,
  },
  verticalStepLeft: {
    alignItems: 'center',
  },
  verticalConnector: {
    width: 2,
    flex: 1,
    marginVertical: 4,
    overflow: 'hidden',
  },
  verticalConnectorProgress: {
    width: '100%',
  },
  verticalStepContent: {
    flex: 1,
    marginLeft: 16,
    paddingBottom: 24,
  },
});
