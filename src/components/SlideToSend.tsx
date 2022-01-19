import React, { useEffect } from 'react';
import { View, AppState } from 'react-native';
import { Text } from '../components/Text';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Path } from 'react-native-svg';
import * as Haptics from 'expo-haptics';

import { useColorScheme } from '../hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import { AnimatePresence, MotiView } from 'moti';
import * as LocalAuthentication from 'expo-local-authentication';

type SlideToSendProps = {};

const BUTTON_WIDTH = 100;
const END = 200;
const TRACK_WIDTH = 300;
const TRACK_HEIGHT = 50;

export const SlideToSend = ({}: SlideToSendProps) => {
  const onFaceId = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      const isCompatible = await LocalAuthentication.hasHardwareAsync();
      if (!isCompatible) {
        throw new Error("Your device isn't compatible.");
      }
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        throw new Error('No Faces / Fingers found.');
      }
      await LocalAuthentication.authenticateAsync();
      // Send the asset here
      offset.value = 0;
      start.value = 0;
    } catch (error) {
      throw new Error('Could not authenticate.');
    }
  };
  const offset = useSharedValue(0);
  const start = useSharedValue(0);
  const width = useSharedValue(BUTTON_WIDTH);
  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      const newPos = e.translationX + start.value;
      if (newPos >= 0 && newPos <= END) {
        offset.value = newPos;
      } else if (newPos > END) {
        offset.value = withSpring(Math.min(END + e.translationX, 200));
      }
      width.value =
        newPos > END
          ? Math.max(width.value - e.translationX, BUTTON_WIDTH - 10)
          : newPos < 0
          ? Math.min(width.value - e.translationX, BUTTON_WIDTH - 10)
          : 100;
    })
    .onEnd(() => {
      width.value = 100;
      if (offset.value < 170) {
        offset.value = withSpring(0);
        start.value = 0;
      } else {
        offset.value = withSpring(END);
        start.value = offset.value;
        runOnJS(onFaceId)();
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
      width: withTiming(width.value),
    };
  });
  const { colorPalette, isDark } = useColorScheme();

  useEffect(() => {
    AppState.addEventListener('change', console.log);
    return () => {
      AppState.removeEventListener('change', console.log);
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View>
        <View
          style={{
            backgroundColor: isDark
              ? colorPalette.systemGray5
              : colorPalette.systemGray6,
            width: TRACK_WIDTH,
            height: TRACK_HEIGHT,
            borderRadius: 100,
          }}
        >
          <AnimatePresence>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <MotiView
                  key={i}
                  from={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  delay={i * END}
                  transition={{
                    loop: true,
                    duration: 1000,
                  }}
                >
                  <Feather
                    name='chevron-right'
                    size={24}
                    color={colorPalette.systemGray3}
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 28 * i + 15,
                    }}
                  />
                </MotiView>
              ))}
          </AnimatePresence>
          <Animated.View
            style={[
              animatedStyle,
              {
                backgroundColor: colorPalette.systemBlue,
                width: BUTTON_WIDTH,
                height: TRACK_HEIGHT,
                borderRadius: 50,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              },
            ]}
          >
            <Svg
              viewBox='0 0 27 27'
              width={20}
              height={20}
              style={{ marginRight: 10 }}
            >
              <Path
                clipRule='evenodd'
                d='M0 8.152c0 .78.426 1.206 1.191 1.206.765 0 1.177-.427 1.177-1.207V4.68c0-1.53.823-2.31 2.294-2.31H8.22c.764 0 1.19-.427 1.19-1.192C9.412.427 8.986 0 8.222 0H4.618C1.558 0 0 1.516 0 4.547v3.605zm24.632 0c0 .78.427 1.206 1.177 1.206.78 0 1.191-.427 1.191-1.207V4.548C27 1.516 25.47 0 22.382 0h-3.588c-.78 0-1.206.427-1.206 1.177 0 .765.427 1.192 1.206 1.192h3.559c1.441 0 2.28.78 2.28 2.31v3.473zM11.265 15.14c0-.427.338-.75.78-.75h.484c.192 0 .368-.104.368-.369v-4.62c0-.485.309-.78.78-.78.47 0 .764.295.764.78v4.488c0 1.383-.735 2.075-2.059 2.075h-.132c-.691 0-.985-.354-.985-.824zM8.25 8.65c-.574 0-.985.413-.985.987v1.957c0 .603.411 1 .985 1 .603 0 1-.397 1-1V9.638c0-.574-.397-.986-1-.986zm9.25.987c0-.574.397-.986 1-.986.573 0 .97.412.97.986v1.957c0 .603-.396 1-.97 1-.603 0-1-.397-1-1V9.638zm-8.765 8.754c1.177 1.207 2.883 1.943 4.588 1.943 1.692 0 3.383-.736 4.589-1.943a.948.948 0 00.206-.588.742.742 0 00-.765-.765c-.28 0-.427.132-.632.338-.81.883-2.133 1.413-3.398 1.413-1.279 0-2.558-.56-3.397-1.413-.205-.206-.367-.338-.647-.338-.455 0-.779.323-.779.765 0 .25.103.427.235.588zM4.618 27C1.558 27 0 25.485 0 22.439v-3.59c0-.78.412-1.207 1.191-1.207.75 0 1.177.427 1.177 1.207v3.472c0 1.53.823 2.31 2.294 2.31H8.22c.764 0 1.19.427 1.19 1.192 0 .75-.426 1.177-1.19 1.177H4.618zm12.97-1.177c0 .75.427 1.177 1.206 1.177h3.588C25.471 27 27 25.47 27 22.439v-3.59c0-.78-.427-1.207-1.191-1.207-.765 0-1.177.427-1.177 1.207v3.472c0 1.53-.838 2.31-2.28 2.31h-3.558c-.78 0-1.206.427-1.206 1.192z'
                fillRule='evenodd'
                fill='white'
              />
            </Svg>
            <Text weight='bold' color='white'>
              Send
            </Text>
          </Animated.View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};
