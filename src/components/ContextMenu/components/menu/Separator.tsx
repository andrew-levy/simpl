import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useInternal } from '../../hooks';

import { BORDER_LIGHT_COLOR, BORDER_DARK_COLOR } from './constants';

const SeparatorComponent = () => {
  const { theme } = useInternal();

  const separatorStyles = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme.value === 'dark' ? BORDER_DARK_COLOR : BORDER_LIGHT_COLOR,
    };
  }, [theme]);

  return <Animated.View style={[styles.separator, { ...separatorStyles }]} />;
};

export const Separator = memo(SeparatorComponent);

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 8,
  },
});
