import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type SpacerProps = {
  height?: number;
  width?: number;
};

export const Spacer = ({ height, width }: SpacerProps) => {
  if (width) {
    return <View style={{ width }} />;
  }
  if (height) {
    return <View style={{ height }} />;
  }
  return <View style={{ flex: 1 }} />;
};
