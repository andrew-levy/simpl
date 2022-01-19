import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { useHeaderHeight } from '@react-navigation/elements';
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { Text } from '../components/Text';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  SendStackNavigationProp,
  SendStackParamList,
} from '../navigation/SendStack';
import { VStack } from '../components/VStack';
import { useBack } from '../hooks/useBack';
import { StatusBar } from 'expo-status-bar';
import { FadeView } from '../components/FadeView';
import { AssetSelectionList } from '../components/AssetSelectionList';
import { HStack } from '../components/HStack';
import { ADA_SYMBOL } from '../utils/constants';

export const Send = () => {
  const { colorPalette, isDark } = useColorScheme();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<SendStackNavigationProp>();
  const { params } = useRoute<RouteProp<SendStackParamList, 'Send'>>();
  const [amountValue, setAmountValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(-1);
  const [searchTextColor, setSearchTextColor] = useState(
    colorPalette.systemForeground
  );
  const [showAssets, setShowAssets] = useState(false);
  const [showAmount, setShowAmount] = useState(false);
  const [sendCurrency, setSendCurrency] = useState<'ada' | 'usd'>('ada');

  useBack(navigation);

  useEffect(() => {
    if (params?.initialValue) {
      setSearchValue(params.initialValue);
      setSearchTextColor(colorPalette.systemBlue);
      setShowAssets(true);
    }
  }, [params]);

  const canReview =
    searchValue.length > 0 && selectedAsset !== -1 && amountValue.length > 0;

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      style={{
        paddingTop: headerHeight - 20,
        backgroundColor: colorPalette.systemQuaternaryBackground,
      }}
    >
      <StatusBar style='light' animated />
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <TextInput
          value={searchValue}
          autoCorrect={false}
          autoCompleteType='off'
          onSubmitEditing={() => {
            if (searchValue.length > 0) {
              setShowAssets(true);
              setSearchTextColor(colorPalette.systemBlue);
            }
          }}
          onChangeText={(text) => {
            setSearchValue(text);
            setSearchTextColor(colorPalette.systemForeground);
            setShowAssets(false);
          }}
          placeholder='Enter an address or a $handle'
          placeholderTextColor={colorPalette.systemGray2}
          style={{
            width: '100%',
            padding: 10,
            backgroundColor: isDark
              ? colorPalette.systemGray5
              : colorPalette.systemGray6,
            borderRadius: 15,
            fontFamily: 'SF-Pro-Rounded-Bold',
            fontWeight: 'bold',
            color: searchTextColor,
            fontSize: 18,
            paddingLeft: 40,
            paddingRight: 40,
          }}
        />
        <Text
          color={colorPalette.systemGray}
          weight='bold'
          style={{ position: 'absolute', left: 12, top: 10 }}
        >
          to:
        </Text>
        <AnimatedPressable
          onPress={() => navigation.navigate('Camera')}
          style={{ position: 'absolute', right: 12, top: 9 }}
        >
          <MaterialCommunityIcons
            name='qrcode-scan'
            size={20}
            color={colorPalette.systemGray}
          />
        </AnimatedPressable>
      </View>

      <FadeView show={showAssets}>
        <VStack
          justify='flex-start'
          align='flex-start'
          style={{
            marginTop: 20,
            marginLeft: 30,
          }}
        >
          <Text size='xs' weight='bold' color={colorPalette.systemGray}>
            Asset
          </Text>
        </VStack>
        <AssetSelectionList
          selectedAsset={selectedAsset}
          onSelect={(i) => {
            if (selectedAsset === i) {
              setSelectedAsset(-1);
              setShowAmount(false);
            } else {
              setSelectedAsset(i);
              setShowAmount(true);
            }
          }}
        />
      </FadeView>

      <FadeView show={showAmount}>
        <HStack
          justify='space-between'
          align='flex-end'
          style={{
            marginTop: 20,
            marginHorizontal: 30,
          }}
        >
          <Text weight='bold' size='xs' color={colorPalette.systemGray}>
            Amount
          </Text>
          <AnimatedPressable
            onPress={() => {
              setSendCurrency('ada');
            }}
          >
            <Text weight='bold' color={colorPalette.systemBlue}>
              max
            </Text>
          </AnimatedPressable>
        </HStack>
        <View>
          <TextInput
            value={amountValue}
            placeholder='0'
            placeholderTextColor={colorPalette.systemGray2}
            keyboardType='numeric'
            onChangeText={(text) => {
              setAmountValue(text);
            }}
            style={{
              backgroundColor: isDark
                ? colorPalette.systemGray5
                : colorPalette.systemGray6,
              borderRadius: 15,
              marginHorizontal: 20,
              marginTop: 10,
              marginBottom: 0,
              height: 70,
              color: colorPalette.systemForeground,
              fontSize: 24,
              fontFamily: 'SF-Pro-Rounded-Bold',
              fontWeight: 'bold',
              padding: 20,
            }}
          />
        </View>
        <VStack style={{ marginHorizontal: 20 }}>
          <AnimatedPressable
            disabled={!canReview}
            onPress={() => {
              if (canReview) {
                navigation.navigate('SendReview', {
                  to: searchValue,
                  asset: 'ADA',
                  amount: amountValue,
                });
              }
            }}
            style={{
              marginVertical: 50,
              paddingVertical: 15,
              backgroundColor: canReview
                ? colorPalette.systemBlue
                : colorPalette.systemGray5,
              borderRadius: 30,
              width: '100%',
            }}
          >
            <HStack>
              <MaterialCommunityIcons
                name='file-document-outline'
                size={28}
                color={canReview ? 'white' : colorPalette.systemGray}
                style={{ marginRight: 5 }}
              />
              <Text
                style={{ textAlign: 'center' }}
                size='md'
                weight='bold'
                color={canReview ? 'white' : colorPalette.systemGray}
              >
                Review
              </Text>
            </HStack>
          </AnimatedPressable>
        </VStack>
      </FadeView>
    </ScrollView>
  );
};
