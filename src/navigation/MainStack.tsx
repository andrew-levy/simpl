import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Main } from '../screens/Main';
import { Receive } from '../screens/Receive';
import { Settings } from '../screens/Settings';
import { useColorScheme } from '../hooks/useColorScheme';
import { BlurEffectTypes } from 'react-native-screens';
import { SendStack } from './SendStack';
import { ActivityStack } from './ActivityStack';
import { Text } from '../components/Text';
import { HStack } from '../components/HStack';
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';
import { Staking } from '../screens/Staking';
import { Collectibles } from '../screens/Collectibles';

export type MainStackParamList = {
  Main: undefined;
  ActivityStack: undefined;
  Receive: undefined;
  SendStack: undefined;
  Staking: undefined;
  Settings: undefined;
  Collectibles: undefined;
};

export type MainStackNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  const { colorPalette, colorScheme } = useColorScheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Main'
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ActivityStack'
        component={ActivityStack}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Receive'
        component={Receive}
        options={{
          presentation: 'modal',
          headerBlurEffect: colorScheme as BlurEffectTypes,
          headerTransparent: true,
          headerTitleStyle: {
            color: colorPalette.systemForeground,
            fontFamily: 'SF-Pro-Rounded-Bold',
          },
          headerTitle: () => (
            <HStack>
              <MaterialCommunityIcons
                name='qrcode-scan'
                size={18}
                color={colorPalette.systemForeground}
                style={{ marginRight: 5 }}
              />
              <Text weight='bold'>Receive</Text>
            </HStack>
          ),
        }}
      />
      <Stack.Screen
        name='SendStack'
        component={SendStack}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Staking'
        component={Staking}
        options={{
          presentation: 'modal',
          headerBlurEffect: colorScheme as BlurEffectTypes,
          headerTransparent: true,
          headerTitleStyle: {
            color: colorPalette.systemForeground,
            fontFamily: 'SF-Pro-Rounded-Bold',
          },
          headerTitle: () => (
            <HStack>
              <Feather
                name='percent'
                size={18}
                color={colorPalette.systemForeground}
                style={{ marginRight: 5 }}
              />
              <Text weight='bold'>Staking</Text>
            </HStack>
          ),
        }}
      />
      <Stack.Screen
        name='Settings'
        component={Settings}
        options={{
          presentation: 'modal',
          headerStyle: {
            backgroundColor: colorPalette.systemGray6,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: colorPalette.systemForeground,
            fontFamily: 'SF-Pro-Rounded-Bold',
          },
          headerTitle: () => (
            <HStack>
              <Feather
                name='settings'
                size={18}
                color={colorPalette.systemForeground}
                style={{ marginRight: 5 }}
              />
              <Text weight='bold'>Settings</Text>
            </HStack>
          ),
        }}
      />
      <Stack.Screen
        name='Collectibles'
        component={Collectibles}
        options={{
          presentation: 'modal',
          headerStyle: {
            backgroundColor: colorPalette.systemGray6,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: colorPalette.systemForeground,
            fontFamily: 'SF-Pro-Rounded-Bold',
          },
          headerTitle: () => (
            <HStack>
              <MaterialIcons
                name='collections'
                size={18}
                color={colorPalette.systemForeground}
                style={{ marginRight: 5 }}
              />
              <Text weight='bold'>Collectibles</Text>
            </HStack>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
