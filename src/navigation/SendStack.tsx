import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useColorScheme } from '../hooks/useColorScheme';
import { BlurEffectTypes } from 'react-native-screens';
import { Send } from '../screens/Send';
import { Camera } from '../screens/Camera';
import { RouteProp } from '@react-navigation/native';
import { HStack } from '../components/HStack';
import { Text } from '../components/Text';
import { FontAwesome } from '@expo/vector-icons';
import { SendReview } from '../screens/SendReview';

export type SendStackParamList = {
  Send: { initialValue: string } | undefined;
  Camera: undefined;
  SendReview: {
    to: string;
    amount: string;
    asset: string;
  };
};

export type SendStackNavigationProp =
  NativeStackNavigationProp<SendStackParamList>;

export type SendStackRouteProp = RouteProp<SendStackParamList, 'Camera'>;

const Stack = createNativeStackNavigator<SendStackParamList>();

export const SendStack = () => {
  const { colorPalette, colorScheme } = useColorScheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Send'
        component={Send}
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
              <FontAwesome
                name='send'
                size={18}
                color={colorPalette.systemForeground}
                style={{ marginRight: 5 }}
              />
              <Text weight='bold'>Send</Text>
            </HStack>
          ),
        }}
      />
      <Stack.Screen
        name='Camera'
        component={Camera}
        options={{
          headerTransparent: true,
          title: '',
          headerBackVisible: false,
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'SF-Pro-Rounded-Bold',
          },
        }}
      />
      <Stack.Screen
        name='SendReview'
        component={SendReview}
        options={{
          headerBlurEffect: colorScheme as BlurEffectTypes,
          headerTransparent: true,
          headerTitle: () => (
            <HStack>
              <FontAwesome
                name='send'
                size={18}
                color={colorPalette.systemForeground}
                style={{ marginRight: 5 }}
              />
              <Text weight='bold'>Review</Text>
            </HStack>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
