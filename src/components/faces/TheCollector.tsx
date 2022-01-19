import React from 'react';
import { Text } from '../Text';
import { useColorScheme } from '../../hooks/useColorScheme';
import { VStack } from '../VStack';
import { Spacer } from '../Spacer';

export const TheCollector = () => {
  const { colorPalette } = useColorScheme();
  return (
    <VStack align='flex-start' style={{ padding: 10 }}>
      <Text color={colorPalette.systemPink} size='md' weight='semiBold'>
        ADA Price
      </Text>
    </VStack>
  );
};
