import React, { ReactNode } from 'react';
import { Text as RNText, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';

type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type RoundedTextProps = {
  children: ReactNode;
  weight?: 'regular' | 'bold' | 'semiBold' | 'medium';
  size?: Size;
  color?: string;
  style?: StyleProp<TextStyle>;
};

const getFontFamily = (weight: 'regular' | 'bold' | 'semiBold' | 'medium') => {
  switch (weight) {
    case 'regular':
      return styles.regular;
    case 'bold':
      return styles.bold;
    case 'semiBold':
      return styles.semiBold;
    case 'medium':
      return styles.medium;
  }
};

const getFontSize = (size: Size) => {
  switch (size) {
    case 'xxs':
      return 12;
    case 'xs':
      return 14;
    case 'sm':
      return 18;
    case 'md':
      return 20;
    case 'lg':
      return 28;
    case 'xl':
      return 30;
    case '2xl':
      return 36;
    case '3xl':
      return 40;
  }
};
export const Text = ({
  children,
  weight = 'regular',
  size = 'sm',
  color,
  style,
}: RoundedTextProps) => {
  const { colorPalette } = useColorScheme();
  return (
    <RNText
      style={[
        getFontFamily(weight),
        {
          fontSize: getFontSize(size),
          color: color || colorPalette.systemForeground,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'SF-Pro-Rounded-Regular',
  },
  medium: {
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
  semiBold: {
    fontFamily: 'SF-Pro-Rounded-Semibold',
  },
  bold: {
    fontFamily: 'SF-Pro-Rounded-Bold',
  },
});
