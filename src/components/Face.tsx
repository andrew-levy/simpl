import React, { useEffect } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useColorScheme } from '../hooks/useColorScheme';
import { Text } from './Text';
import { VStack } from './VStack';
import * as Haptics from 'expo-haptics';
import { FadeView } from './FadeView';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FaceProps = {
  face: { title: string; content: React.ReactNode };
  index: number;
  scrollPosition: Animated.SharedValue<number>;
  selectedFaceState: [number, (v: number) => void];
  scrollEnabledState: [boolean, (v: boolean) => void];
};

export const Face = ({
  face,
  index,
  scrollPosition,
  scrollEnabledState,
  selectedFaceState,
}: FaceProps) => {
  const { colorPalette } = useColorScheme();
  const { width } = useWindowDimensions();
  const [scrollEnabled, setScrollEnabled] = scrollEnabledState;
  const [selectedFace, setSelectedFace] = selectedFaceState;
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scrollEnabled ? 0.8 : 1),
        },
      ],
      borderWidth: withSpring(scrollEnabled ? 1.5 : 0),
      padding: withTiming(scrollEnabled ? 20 : 0),
    };
  });

  return (
    <VStack>
      <FadeView show={scrollEnabled} style={{ position: 'absolute', top: 0 }}>
        <Text weight='bold' size='md' color={colorPalette.systemGray}>
          {face.title}
        </Text>
      </FadeView>
      <Pressable
        onLongPress={() => {
          setScrollEnabled(true);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
      >
        <Animated.View
          style={[
            animatedStyle,
            {
              width: width - 40,
              height: 500,
              borderRadius: 40,
              borderColor: colorPalette.systemGray5,
              marginHorizontal: 20,
            },
          ]}
        >
          {face.content}
          <FadeView
            show={scrollEnabled}
            style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}
          >
            <Pressable
              style={{
                backgroundColor: colorPalette.systemBlue,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
              }}
              onPress={async () => {
                setScrollEnabled(false);
                setSelectedFace(index);
                await AsyncStorage.setItem('face', JSON.stringify(index));
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
            >
              <Text weight='bold' color='white' size='md'>
                Select
              </Text>
            </Pressable>
          </FadeView>
        </Animated.View>
      </Pressable>
    </VStack>
  );
};
