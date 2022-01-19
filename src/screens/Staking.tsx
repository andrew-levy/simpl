import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '../components/Text';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useColorScheme } from '../hooks/useColorScheme';
import { VStack } from '../components/VStack';
import { HStack } from '../components/HStack';
import { ADA_SYMBOL } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
import CountDown from 'react-native-countdown-component';
import { useBack } from '../hooks/useBack';
import { MainStackNavigationProp } from '../navigation/MainStack';
import { StatusBar } from 'expo-status-bar';

const timeUntilNextEpoch = 4 * 24 * 60 * 60;

export const Staking = () => {
  const headerHeight = useHeaderHeight();
  const { colorPalette, isDark } = useColorScheme();
  const navigation = useNavigation<MainStackNavigationProp>();
  useBack(navigation);

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: headerHeight + 20,
        backgroundColor: colorPalette.systemQuaternaryBackground,
        paddingHorizontal: 30,
      }}
    >
      <StatusBar style='light' animated />
      <VStack
        style={{
          marginBottom: 40,
          padding: 20,
          borderRadius: 15,
          backgroundColor: isDark
            ? colorPalette.systemGray5
            : colorPalette.systemGray6,
        }}
      >
        <Text
          weight='semiBold'
          size='lg'
          style={{
            marginBottom: 20,
          }}
        >
          Next Reward
        </Text>
        <CountDown
          until={timeUntilNextEpoch}
          onFinish={() => alert('finished')}
          digitTxtStyle={{
            fontFamily: 'SF-Pro-Rounded-Bold',
            fontWeight: 'bold',
            fontSize: 30,
          }}
          timeToShow={['D', 'H', 'M', 'S']}
          digitStyle={{
            backgroundColor: colorPalette.systemTeal,
            width: 50,
            height: 50,
            marginHorizontal: 10,
          }}
          timeLabels={{ d: 'Day', h: 'Hour', m: 'Min', s: 'Sec' }}
          timeLabelStyle={{
            fontFamily: 'SF-Pro-Rounded-Bold',
            fontWeight: 'bold',
            fontSize: 20,
            color: colorPalette.systemGray,
            marginTop: 10,
          }}
          size={20}
        />
      </VStack>
      <HStack justify='flex-start'>
        <FontAwesome5
          name='coins'
          size={40}
          style={{ width: 50, height: 50 }}
          color={colorPalette.systemForeground}
        />
        <VStack
          align='flex-start'
          style={{
            marginBottom: 10,
            marginLeft: 10,
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text weight='semiBold' size='lg'>
            Staked
          </Text>
          <Text weight='semiBold' size='md' color={colorPalette.systemTeal}>
            {`3,141.59 ${ADA_SYMBOL}`}
          </Text>
        </VStack>
      </HStack>

      <HStack justify='flex-start'>
        <Ionicons
          name='ios-gift'
          size={45}
          style={{ width: 50, height: 50 }}
          color={colorPalette.systemForeground}
        />
        <VStack
          align='flex-start'
          style={{
            marginBottom: 10,
            marginLeft: 10,
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text weight='semiBold' size='lg'>
            Rewards
          </Text>
          <Text weight='semiBold' size='md' color={colorPalette.systemTeal}>
            {`18.290 ${ADA_SYMBOL}`}
          </Text>
        </VStack>
      </HStack>

      <HStack justify='flex-start'>
        <FontAwesome
          name='group'
          size={40}
          style={{ width: 50, height: 50 }}
          color={colorPalette.systemForeground}
        />
        <VStack
          align='flex-start'
          style={{
            marginBottom: 10,
            marginLeft: 10,
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text weight='semiBold' size='lg'>
            Pool
          </Text>
          <Text weight='semiBold' size='md' color={colorPalette.systemTeal}>
            Bloom Six
          </Text>
          <Text weight='semiBold' size='sm' color={colorPalette.systemGray2}>
            8e06g...2n0p
          </Text>
        </VStack>
      </HStack>
    </ScrollView>
  );
};
