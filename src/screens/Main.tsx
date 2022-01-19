import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Actions } from '../components/Actions';
import { useColorScheme } from '../hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainHeader } from '../components/MainHeader';
import { Faces } from '../components/Faces';

export const Main = () => {
  const { colorPalette, isLight, setColorScheme } = useColorScheme();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function getColorSchemeFromStorage() {
      const colorScheme = await AsyncStorage.getItem('colorScheme');
      if (colorScheme) {
        setColorScheme(colorScheme as 'dark' | 'light' | 'system');
      }
    }
    getColorSchemeFromStorage();
  }, []);

  return (
    <>
      <StatusBar animated style={isLight ? 'dark' : 'light'} />
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: colorPalette.systemPrimaryBackground,
          },
        ]}
      >
        <MainHeader isEditing={isEditing} setIsEditing={setIsEditing} />
        <Faces isEditing={isEditing} setIsEditing={setIsEditing} />
      </SafeAreaView>
      <Actions />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});
