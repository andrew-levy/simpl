import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

type HStackProps = {
  children: React.ReactNode;
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  style?: StyleProp<ViewStyle>;
};

export const HStack = ({
  children,
  style,
  justify = 'center',
  align = 'center',
}: HStackProps) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: justify,
          alignItems: align,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
