import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Animated, {
  runOnUI,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useColorScheme } from '../hooks/useColorScheme';
import { Face } from './Face';
import { TheCollector } from './faces/TheCollector';
import { ThePriceChecker } from './faces/ThePriceChecker';
import { TheReceiver } from './faces/TheReceiver';
import { FadeView } from './FadeView';
import { HStack } from './HStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const faces = [
  { title: 'The Price Checker', content: <ThePriceChecker /> },
  { title: 'The Eager Beaver', content: null },
  { title: 'The Collector', content: <TheCollector /> },
  { title: 'The Receiver', content: <TheReceiver /> },
  { title: 'The Minimalist', content: null },
];

export const Faces = ({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
}) => {
  const { width } = useWindowDimensions();
  const faceWidth = width - 40;
  const scrollPosition = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [selectedFace, setSelectedFace] = useState(0);

  const scrollHanlder = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollPosition.value = e.contentOffset.x;
    },
  });
  const scrollToInitialPosition = (faceNumber: number) => {
    'worklet';
    scrollTo(scrollRef, faceNumber * width, 0, false);
  };

  useEffect(() => {
    const getFaceFromStorage = async () => {
      const faceFromStorage = await AsyncStorage.getItem('face');
      const faceNumber = faceFromStorage ? parseInt(faceFromStorage) : 0;
      setSelectedFace(faceNumber);
      runOnUI(scrollToInitialPosition)(faceNumber);
    };
    getFaceFromStorage();
  }, [scrollRef]);

  return (
    <View style={{ marginVertical: 50 }}>
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHanlder}
        horizontal
        snapToInterval={faceWidth + 40}
        scrollEventThrottle={1}
        decelerationRate='fast'
        disableIntervalMomentum
        scrollEnabled={isEditing}
        showsHorizontalScrollIndicator={false}
      >
        {faces.map((face, i) => (
          <Face
            key={i}
            index={i}
            face={face}
            scrollEnabledState={[isEditing, setIsEditing]}
            selectedFaceState={[selectedFace, setSelectedFace]}
            scrollPosition={scrollPosition}
          />
        ))}
      </Animated.ScrollView>
      <FadeView show={isEditing}>
        <HStack>
          {faces.map((_, i) => (
            <Dot
              key={i}
              index={i}
              scrollPosition={scrollPosition}
              faceWidth={faceWidth}
            />
          ))}
        </HStack>
      </FadeView>
    </View>
  );
};

const Dot = ({
  scrollPosition,
  index,
  faceWidth,
}: {
  scrollPosition: Animated.SharedValue<number>;
  index: number;
  faceWidth: number;
}) => {
  const { colorPalette } = useColorScheme();
  const animatedStyle = useAnimatedStyle(() => {
    const isSelected = Math.round(scrollPosition.value / faceWidth) === index;
    return {
      backgroundColor: isSelected
        ? colorPalette.systemGray
        : colorPalette.systemGray5,
    };
  });
  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          marginHorizontal: 3,
          width: 10,
          height: 10,
          borderRadius: 10,
        },
      ]}
    />
  );
};
