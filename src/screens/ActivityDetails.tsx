import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { List, Row } from 'react-native-ios-list';
import { useColorScheme } from '../hooks/useColorScheme';
import {
  ActivityStackNavigationProp,
  ActivityStackRouteProp,
} from '../navigation/ActivityStack';
import { StatusBar } from 'expo-status-bar';

type ActivityDetailsProps = {};

export const ActivityDetails = ({}: ActivityDetailsProps) => {
  const headerHeight = useHeaderHeight();
  const { colorPalette } = useColorScheme();
  const { params } = useRoute<ActivityStackRouteProp>();
  const navigation = useNavigation<ActivityStackNavigationProp>();

  useEffect(() => {
    if (params?.hash) {
      navigation.setOptions({
        title: params.hash,
      });
    }
  }, [params]);

  return (
    <ScrollView
      style={{
        paddingTop: headerHeight || 0,
        backgroundColor: colorPalette.systemQuaternaryBackground,
      }}
    >
      <StatusBar style='light' animated />
      <List
        hideDividers
        style={{
          borderTopWidth: 0,
          borderBottomWidth: 0,
          backgroundColor: colorPalette.systemQuaternaryBackground,
        }}
      >
        <Row highlightColor={colorPalette.systemGray6}></Row>
      </List>
    </ScrollView>
  );
};
