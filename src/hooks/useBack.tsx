import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { ActivityStackNavigationProp } from '../navigation/ActivityStack';
import { MainStackNavigationProp } from '../navigation/MainStack';
import { SendStackNavigationProp } from '../navigation/SendStack';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from './useColorScheme';

export const useBack = (
  navigation:
    | ActivityStackNavigationProp
    | MainStackNavigationProp
    | SendStackNavigationProp,
  color?: string
) => {
  const { colorPalette } = useColorScheme();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={navigation.goBack}
          style={{ padding: 5, paddingLeft: 0 }}
        >
          <Feather
            name='chevron-left'
            size={26}
            color={color || colorPalette.systemForeground}
          />
        </Pressable>
      ),
    });
  }, [navigation, colorPalette]);
};
