import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
// import { QRCode } from '../components/QRCode';
import { useColorScheme } from '../hooks/useColorScheme';
import { Text } from '../components/Text';
import { HStack } from '../components/HStack';
import { VStack } from '../components/VStack';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { Feather, AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useHeaderHeight } from '@react-navigation/elements';
import { CopyToast } from '../components/CopyToast';
import { useBack } from '../hooks/useBack';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../navigation/MainStack';
import { StatusBar } from 'expo-status-bar';
import { useCopyToast } from '../hooks/useCopyToast';
import { address } from '../utils/constants';
import { formatAddress } from '../utils';

export const Receive = () => {
  const { colorPalette, isDark } = useColorScheme();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<MainStackNavigationProp>();
  const { toastState, triggerToast } = useCopyToast();
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
      >
        <View style={styles.qrCodeWrapper}>
          <QRCode value={address} size={200} />
        </View>
        <VStack>
          <HStack style={styles.name}>
            <Text size='lg' weight='bold' color={colorPalette.systemGreen}>
              $
            </Text>
            <Text size='lg' weight='bold'>
              levy
            </Text>
          </HStack>
          <AnimatedPressable
            onPress={() => {
              Clipboard.setString(address);
              triggerToast();
            }}
            style={{
              backgroundColor: isDark
                ? colorPalette.systemGray5
                : colorPalette.systemGray6,
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
          >
            <HStack>
              <Feather
                name='copy'
                size={20}
                color={colorPalette.systemGray}
                style={{ marginRight: 8 }}
              />
              <Text size='md' weight='bold' color={colorPalette.systemGray}>
                {formatAddress(address)}
              </Text>
            </HStack>
          </AnimatedPressable>
        </VStack>
      </ScrollView>

      <CopyToast
        state={toastState}
        text='Copied'
        icon={
          <AntDesign
            name='checkcircle'
            size={20}
            color={colorPalette.systemGreen}
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  qrCodeWrapper: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    borderRadius: 40,
  },
  name: {
    margin: 15,
  },
});
