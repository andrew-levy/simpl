import { AnimatePresence, MotiView } from 'moti';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Text } from './Text';
import { useColorScheme } from '../hooks/useColorScheme';

type ToastProps = {
  text: string;
  icon?: JSX.Element;
  state: boolean;
};

export const CopyToast = ({ text, icon, state }: ToastProps) => {
  const { width } = useWindowDimensions();
  const { colorPalette, isDark } = useColorScheme();
  return (
    <AnimatePresence>
      {state && (
        <MotiView
          from={{ opacity: 0, translateY: 100 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 100 }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 50,
            right: width / 2 - 60,
            width: 120,
            borderRadius: 15,
            backgroundColor: isDark
              ? colorPalette.systemGray5
              : colorPalette.systemGray6,
            paddingVertical: 8,
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}
        >
          {icon}
          <Text
            style={{ marginLeft: 5 }}
            weight='bold'
            color={colorPalette.systemGray}
          >
            {text}
          </Text>
        </MotiView>
      )}
    </AnimatePresence>
  );
};
