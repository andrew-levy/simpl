import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { useColorScheme } from '../hooks/useColorScheme';
import { Text } from '../components/Text';
import { HStack } from '../components/HStack';
import { VStack } from '../components/VStack';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBack } from '../hooks/useBack';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../navigation/MainStack';
import { StatusBar } from 'expo-status-bar';

export const Collectibles = () => {
  const { colorPalette } = useColorScheme();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<MainStackNavigationProp>();
  useBack(navigation);

  return (
    <>
      <StatusBar style='light' animated />
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={{
          paddingTop: headerHeight + 20,
          backgroundColor: colorPalette.systemQuaternaryBackground,
        }}
      ></ScrollView>
    </>
  );
};
