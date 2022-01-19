import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useColorScheme } from './useColorScheme';

export const useAnimatedColorTransition = (
  style: 'color' | 'backgroundColor',
  color: [string, string]
) => {
  const { isDark } = useColorScheme();
  const progress = useDerivedValue(() =>
    isDark ? withTiming(1) : withTiming(0)
  );
  return useAnimatedStyle(() => {
    const interpolatedColor = interpolateColor(
      progress.value,
      [0, 1],
      [color[0], color[1]]
    );
    if (style === 'color') {
      return {
        color: interpolatedColor,
      };
    }
    return {
      backgroundColor: interpolatedColor,
    };
  }, [progress.value, color, style]);
};
