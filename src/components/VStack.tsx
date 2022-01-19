import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

type VStackProps = {
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

export const VStack = ({
  children,
  style,
  justify = 'center',
  align = 'center',
}: VStackProps) => {
  return (
    <View
      style={[
        {
          flexDirection: 'column',
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
