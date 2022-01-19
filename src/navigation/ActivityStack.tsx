import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useColorScheme } from '../hooks/useColorScheme';
import { BlurEffectTypes } from 'react-native-screens';
import { RouteProp } from '@react-navigation/native';
import { Activity } from '../screens/Activity';
import { Text } from '../components/Text';
import { ActivityDetails } from '../screens/ActivityDetails';
import { HStack } from '../components/HStack';
import { Feather } from '@expo/vector-icons';

export type ActivityStackParamList = {
  Activity: undefined;
  ActivityDetails: {
    hash: string;
  };
};

export type ActivityStackNavigationProp =
  NativeStackNavigationProp<ActivityStackParamList>;

export type ActivityStackRouteProp = RouteProp<
  ActivityStackParamList,
  'ActivityDetails'
>;

const Stack = createNativeStackNavigator<ActivityStackParamList>();

export const ActivityStack = () => {
  const { colorPalette, colorScheme } = useColorScheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Activity'
        component={Activity}
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
                name='clock'
                size={18}
                color={colorPalette.systemForeground}
                style={{ marginRight: 5 }}
              />
              <Text weight='bold'>Activity</Text>
            </HStack>
          ),
        }}
      />
      <Stack.Screen
        name='ActivityDetails'
        component={ActivityDetails}
        options={{
          headerBlurEffect: colorScheme as BlurEffectTypes,
          headerTransparent: true,
          title: '',
          headerTitleStyle: {
            color: colorPalette.systemForeground,
            fontFamily: 'SF-Pro-Rounded-Bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};
