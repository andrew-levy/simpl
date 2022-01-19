import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

type AnimatedPressableProps = PressableProps & {
  scaleTo?: number;
  onLayout?: (event: any) => void;
};
const ReanimatedPressable = Animated.createAnimatedComponent(Pressable);
export const AnimatedPressable = ({
  scaleTo = 0.9,
  onLayout,
  ...props
}: AnimatedPressableProps) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value) }],
    };
  });
  return (
    <ReanimatedPressable
      {...props}
      onLayout={onLayout}
      style={[props.style, animatedStyle]}
      onPressIn={() => {
        scale.value = withTiming(scaleTo, { duration: 50 });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 50 });
      }}
      onLongPress={() => {
        scale.value = withTiming(1, { duration: 50 });
      }}
    />
  );
};
