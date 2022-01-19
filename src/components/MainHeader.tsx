import React, { useMemo, useState } from 'react';
import { ADA_SYMBOL } from '../utils/constants';
import { AnimatedPressable } from './AnimatedPressable';
import { HStack } from './HStack';
import { VStack } from './VStack';
import { Text } from './Text';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../navigation/MainStack';
import { useColorScheme } from '../hooks/useColorScheme';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { HoldItem } from './ContextMenu/components/holdItem/HoldItem';

export const MainHeader = ({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
}) => {
  const [showDollars, setShowDollars] = useState(true);
  const { colorPalette, isDark } = useColorScheme();
  const navigation = useNavigation<MainStackNavigationProp>();
  const MenuItems = useMemo(
    () => [
      {
        text: 'Settings',
        icon: 'settings',
        onPress: () => navigation.navigate('Settings'),
      },
      ...(!isEditing
        ? [
            {
              text: 'Edit Home Screen',
              icon: 'edit',
              onPress: () => setIsEditing(true),
            },
          ]
        : []),
    ],
    [navigation, isEditing]
  );
  return (
    <HStack
      justify='space-between'
      align='flex-start'
      style={{ marginTop: 10, marginHorizontal: 20 }}
    >
      <VStack align='flex-start'>
        <AnimatedPressable
          onPress={() => setShowDollars((v) => !v)}
          scaleTo={0.9}
        >
          <HStack>
            <Text weight='bold' size='2xl'>
              {showDollars ? '$3,141.59' : `100,000 ${ADA_SYMBOL}`}
            </Text>
          </HStack>
        </AnimatedPressable>
        <AnimatedPressable
          onPress={() => {
            navigation.navigate('Receive');
          }}
        >
          <HStack
            align='center'
            style={{
              backgroundColor: isDark
                ? colorPalette.systemGray5
                : colorPalette.systemGray6,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 10,
              marginTop: 5,
            }}
          >
            <MaterialCommunityIcons
              name='qrcode-scan'
              size={20}
              color={colorPalette.systemGray}
              style={{ marginRight: 8 }}
            />
            <Text size='md' weight='bold' color={colorPalette.systemGreen}>
              $
            </Text>
            <Text size='md' weight='bold' color={colorPalette.systemGray}>
              levy
            </Text>
          </HStack>
        </AnimatedPressable>
      </VStack>
      <HStack style={{ marginTop: 8 }}>
        <HoldItem items={MenuItems} activateOn='tap'>
          <Feather
            name='settings'
            size={24}
            color={colorPalette.systemForeground}
          />
        </HoldItem>
      </HStack>
    </HStack>
  );
};
