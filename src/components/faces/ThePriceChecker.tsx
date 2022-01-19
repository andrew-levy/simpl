import React from 'react';
import { Text } from '../Text';
import { useColorScheme } from '../../hooks/useColorScheme';
import { VStack } from '../VStack';
import { Spacer } from '../Spacer';

type ThePriceCheckerProps = {};

export const ThePriceChecker = ({}: ThePriceCheckerProps) => {
  const { colorPalette } = useColorScheme();
  return (
    <VStack align='flex-start'>
      <Text color={colorPalette.systemPink} size='md' weight='semiBold'>
        ADA Price
      </Text>
      <Text color={colorPalette.systemPink} size='3xl' weight='bold'>
        $1.90
      </Text>
      <Spacer height={10} />
      <Text color={colorPalette.systemGreen} size='md' weight='semiBold'>
        Daily
      </Text>
      <Text color={colorPalette.systemGreen} size='3xl' weight='bold'>
        + 10.82%
      </Text>
      <Spacer height={10} />
      <Text color={colorPalette.systemTeal} size='md' weight='semiBold'>
        24 hour
      </Text>
      <Text color={colorPalette.systemTeal} size='3xl' weight='bold'>
        + 2.38%
      </Text>
    </VStack>
  );
};
