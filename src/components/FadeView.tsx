import React, { ReactNode } from 'react';
import { MotiView, AnimatePresence } from 'moti';
import { StyleProp, ViewStyle } from 'react-native';

type FadeViewProps = {
  children: ReactNode;
  show?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const FadeView = ({ show, children, style }: FadeViewProps) => {
  return (
    <AnimatePresence>
      {show && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          {...style}
        >
          {children}
        </MotiView>
      )}
    </AnimatePresence>
  );
};
