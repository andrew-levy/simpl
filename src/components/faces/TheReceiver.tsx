import React, { useEffect, useState } from 'react';
import { Text } from '../Text';
import { useColorScheme } from '../../hooks/useColorScheme';
import { VStack } from '../VStack';
import { Spacer } from '../Spacer';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { HStack } from '../HStack';
import { AnimatedPressable } from '../AnimatedPressable';
import { Feather, AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { CopyToast } from '../CopyToast';
import { useCopyToast } from '../../hooks/useCopyToast';
import { address } from '../../utils/constants';
import { formatAddress } from '../../utils';

export const TheReceiver = () => {
  const { colorPalette, isDark } = useColorScheme();
  const { toastState, triggerToast } = useCopyToast();

  return (
    <>
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
    width: 250,
    alignSelf: 'center',
    alignItems: 'center',
  },
  name: {
    margin: 15,
  },
});
