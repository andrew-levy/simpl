import React, { ComponentProps, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { List, Row } from 'react-native-ios-list';
import { Text } from '../components/Text';
import { useColorScheme } from '../hooks/useColorScheme';
import { AntDesign, Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HStack } from '../components/HStack';
import { useBack } from '../hooks/useBack';
import { useNavigation } from '@react-navigation/core';
import { MainStackNavigationProp } from '../navigation/MainStack';

export const Settings = () => {
  const { colorPalette, isDark, isLight, isSystem, setColorScheme } =
    useColorScheme();
  const navigation = useNavigation<MainStackNavigationProp>();
  useBack(navigation);

  const themeOptions = [
    {
      label: 'Light',
      value: 'light' as const,
      icon: <Feather name='sun' size={24} color={colorPalette.systemYellow} />,
      checked: isLight,
    },
    {
      label: 'Dark',
      value: 'dark' as const,
      icon: <Feather name='moon' size={24} color={colorPalette.systemIndigo} />,
      checked: isDark,
    },
    {
      label: 'System',
      value: 'system' as const,
      icon: (
        <Feather name='smartphone' size={24} color={colorPalette.systemBlue} />
      ),
      checked: isSystem,
    },
  ];

  return (
    <ScrollView
      style={{
        backgroundColor: colorPalette.systemGray6,
      }}
    >
      <StatusBar style='light' animated />
      <List
        header='Wallet'
        inset
        backgroundColor={colorPalette.systemSecondaryBackground}
      >
        <Row>
          <HStack justify='space-between'>
            <Text>$levy</Text>
            <Text
              style={{ fontWeight: 'bold', fontFamily: 'DMMono-Regular' }}
              color={colorPalette.systemGray}
            >
              addr1...s0e9
            </Text>
          </HStack>
        </Row>
      </List>
      <List
        inset
        sideBar
        header='Theme'
        backgroundColor={colorPalette.systemSecondaryBackground}
        dividerColor={colorPalette.systemGray3}
      >
        {themeOptions.map((option, i) => (
          <Row
            key={i}
            highlightColor={colorPalette.systemHighlight}
            onPress={async () => {
              setColorScheme(option.value);
              await AsyncStorage.setItem('colorScheme', option.value);
            }}
            leading={option.icon}
            trailing={
              option.checked ? (
                <AntDesign
                  name='check'
                  size={20}
                  color={colorPalette.systemBlue}
                />
              ) : null
            }
          >
            <Text
              style={{ marginVertical: 2 }}
              color={colorPalette.systemForeground}
            >
              {option.label}
            </Text>
          </Row>
        ))}
      </List>
    </ScrollView>
  );
};
