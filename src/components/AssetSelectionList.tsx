import { MotiView } from 'moti';
import React from 'react';
import { AnimatedPressable } from './AnimatedPressable';
import { HStack } from './HStack';
import { VStack } from './VStack';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '../hooks/useColorScheme';
import { Text } from './Text';
import { View, Image } from 'react-native';
import { ADA_SYMBOL } from '../utils/constants';

type AssetSelectionListProps = {
  selectedAsset: number;
  onSelect: (asset: any) => void;
};

const ASSET_HEIGHT = 70;
const ASSET_MARGIN = 10;
const HORIZONTAL_MARGIN = 20;

export const AssetSelectionList = ({
  selectedAsset,
  onSelect,
}: AssetSelectionListProps) => {
  const { colorPalette, isDark } = useColorScheme();
  const assets = [
    {
      name: 'ADA',
      icon: (
        <View
          style={{
            borderRadius: 15,
            width: 40,
            height: 40,
            backgroundColor: colorPalette.systemBlue,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 15,
            marginRight: 10,
          }}
        >
          <Text size='md' color='white'>
            {ADA_SYMBOL}
          </Text>
        </View>
      ),
      value: '0.00',
    },
    {
      name: '$levy',
      icon: (
        <Image
          source={require('../../assets/handle.jpeg')}
          width={40}
          height={40}
          style={{
            width: 40,
            height: 40,
            margin: 15,
            marginRight: 10,
            borderRadius: 15,
          }}
        />
      ),
      value: 'Handle',
    },
    {
      name: '$andrewlevy',
      icon: (
        <Image
          source={require('../../assets/handle.jpeg')}
          width={40}
          height={40}
          style={{
            width: 40,
            height: 40,
            margin: 15,
            marginRight: 10,
            borderRadius: 15,
          }}
        />
      ),
      value: 'Handle',
    },
    {
      name: '$.eth',
      icon: (
        <Image
          source={require('../../assets/handle.jpeg')}
          width={40}
          height={40}
          style={{
            width: 40,
            height: 40,
            margin: 15,
            marginRight: 10,
            borderRadius: 15,
          }}
        />
      ),
      value: 'Handle',
    },
  ];

  const unselected = () => selectedAsset === -1;
  const currentIsSelected = (i: number) => selectedAsset === i;

  return (
    <MotiView
      animate={{
        height:
          selectedAsset === -1
            ? (ASSET_HEIGHT + ASSET_MARGIN) * assets.length
            : 100,
      }}
      transition={{
        damping: 15,
      }}
    >
      {assets.map((asset, i) => (
        <MotiView
          key={i}
          from={{
            translateY: 0,
            opacity: 1,
          }}
          animate={{
            zIndex: unselected() || currentIsSelected(i) ? 100 : -i,
            opacity: unselected() || currentIsSelected(i) ? 1 : 1 - i * 0.2,
            scale:
              unselected() || currentIsSelected(i) ? 1 : 1 - (i + 1) * 0.02,
            translateY: unselected()
              ? 0
              : currentIsSelected(i)
              ? -(ASSET_HEIGHT + ASSET_MARGIN) * i
              : i > selectedAsset
              ? -(ASSET_HEIGHT + ASSET_MARGIN) * i + i * 5
              : -(ASSET_HEIGHT + ASSET_MARGIN) * i + (i + 1) * 5,
            // opacity: selectedAsset === -1 ? 1 : selectedAsset === i ? 1 : 0,
            // translateY:
            //   selectedAsset === i ? -(ASSET_HEIGHT + ASSET_MARGIN) * i : 0,
          }}
          transition={{ damping: 15 }}
        >
          <AnimatedPressable
            onPress={() => onSelect(i)}
            disabled={selectedAsset !== -1 && selectedAsset !== i}
          >
            <HStack
              justify='space-between'
              align='center'
              style={{
                backgroundColor: isDark
                  ? colorPalette.systemGray5
                  : colorPalette.systemGray6,
                borderRadius: 15,
                marginHorizontal: HORIZONTAL_MARGIN,
                marginTop: ASSET_MARGIN,
                marginBottom: 0,
                height: ASSET_HEIGHT,
                borderColor: colorPalette.systemGray5,
                borderWidth: unselected() || currentIsSelected(i) ? 0 : 0.3,
              }}
            >
              <HStack>
                {asset.icon}
                <VStack align='flex-start'>
                  <Text weight='semiBold'>{asset.name}</Text>
                  {asset.value && (
                    <Text
                      weight='semiBold'
                      color={colorPalette.systemGray}
                      size='xs'
                    >
                      {asset.value}
                    </Text>
                  )}
                </VStack>
              </HStack>

              {selectedAsset === i ? (
                <MaterialCommunityIcons
                  name='refresh'
                  size={24}
                  color={colorPalette.systemBlue}
                  style={{
                    borderRadius: 6,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginRight: 10,
                  }}
                />
              ) : (
                <Feather
                  name='arrow-right-circle'
                  size={24}
                  color={colorPalette.systemGray}
                  style={{
                    borderRadius: 6,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginRight: 10,
                  }}
                />
              )}
            </HStack>
          </AnimatedPressable>
        </MotiView>
      ))}
    </MotiView>
  );
};
