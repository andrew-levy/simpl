import React from 'react';
import { View } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { useHeaderHeight } from '@react-navigation/elements';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Text } from '../components/Text';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  SendStackNavigationProp,
  SendStackParamList,
} from '../navigation/SendStack';
import { VStack } from '../components/VStack';
import { useBack } from '../hooks/useBack';
import { StatusBar } from 'expo-status-bar';
import { SlideToSend } from '../components/SlideToSend';
import { ADA_SYMBOL } from '../utils/constants';
import { HStack } from '../components/HStack';

export const SendReview = () => {
  const { colorPalette } = useColorScheme();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<SendStackNavigationProp>();
  const { params } = useRoute<RouteProp<SendStackParamList, 'SendReview'>>();

  useBack(navigation);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: headerHeight - 20,
        backgroundColor: colorPalette.systemQuaternaryBackground,
      }}
    >
      <StatusBar style='light' animated />

      <VStack
        style={{
          padding: 20,
          borderRadius: 15,
          marginHorizontal: 20,
        }}
      >
        <HStack justify='space-between' style={{ width: '100%' }}>
          <VStack align='flex-start'>
            <Text weight='bold' size='xl'>
              {params.amount} {ADA_SYMBOL}
            </Text>
            <Text weight='bold' size='md' color={colorPalette.systemGray}>
              $1000
            </Text>
          </VStack>
          <View
            style={{
              borderRadius: 15,
              width: 50,
              height: 50,
              backgroundColor: colorPalette.systemBlue,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text size='md' color='white'>
              {ADA_SYMBOL}
            </Text>
          </View>
        </HStack>

        <HStack justify='space-between' style={{ width: '100%' }}>
          <VStack
            align='flex-start'
            style={{
              marginRight: 10,
              marginVertical: 5,
              backgroundColor: colorPalette.systemGray3,
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 10,
            }}
          >
            <Text size='sm' weight='bold' color={colorPalette.systemGray}>
              to
            </Text>
          </VStack>
          <Feather
            name='chevrons-down'
            size={50}
            color={colorPalette.systemGray4}
            style={{ marginVertical: 5 }}
          />
        </HStack>

        <HStack justify='space-between' style={{ width: '100%' }}>
          <VStack align='flex-start'>
            <Text weight='bold' size='xl'>
              {params.to}
            </Text>
            <Text weight='bold' size='md' color={colorPalette.systemGray}>
              addr1...4k3j
            </Text>
          </VStack>
          <Ionicons
            name='ios-wallet'
            size={50}
            color={colorPalette.systemGray2}
          />
        </HStack>
      </VStack>

      <View style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}>
        <SlideToSend />
      </View>
    </View>
  );
};

{
  /* <VStack
style={{
  marginRight: 10,
  marginVertical: 10,
  backgroundColor: colorPalette.systemGray3,
  paddingHorizontal: 10,
  paddingVertical: 2,
  borderRadius: 10,
}}
>
<Text size='sm' weight='bold' color={colorPalette.systemGray}>
  To
</Text>
</VStack> */
}
