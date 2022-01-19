import React, { useState } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List, Row } from 'react-native-ios-list';
import { Text } from '../components/Text';
import { Entypo } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useColorScheme } from '../hooks/useColorScheme';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { VStack } from '../components/VStack';
import { HStack } from '../components/HStack';
import { ADA_SYMBOL } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { ActivityStackNavigationProp } from '../navigation/ActivityStack';
import { useBack } from '../hooks/useBack';
import { StatusBar } from 'expo-status-bar';

const transactions = [
  {
    type: 'Sent',
    amount: `${Math.floor(Math.random() * 100)} ${ADA_SYMBOL}`,
    date: 'Dec 3, 2021',
    to: '$levy1',
  },
  {
    type: 'Received',
    amount: `${Math.floor(Math.random() * 100)} ${ADA_SYMBOL}`,
    date: 'Dec 3, 2021',
    from: '$kendra',
  },
  {
    type: 'Sent',
    amount: `${Math.floor(Math.random() * 100)} ${ADA_SYMBOL}`,
    date: 'Dec 3, 2021',
    to: '$levy1',
  },
];

export const Activity = () => {
  const headerHeight = useHeaderHeight();
  const { colorPalette, isLight } = useColorScheme();
  const navigation = useNavigation<ActivityStackNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  const fetchTransactions = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setRefreshing(false);
  };
  useBack(navigation);

  return (
    <ScrollView
      contentInset={{ top: headerHeight / 2 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchTransactions}
          tintColor={
            isLight ? colorPalette.systemGray3 : colorPalette.systemGray
          }
          progressViewOffset={headerHeight}
        />
      }
      style={{
        paddingTop: headerHeight - 40,
        backgroundColor: colorPalette.systemQuaternaryBackground,
      }}
    >
      <StatusBar style='light' animated />

      {transactions ? (
        <List
          hideDividers
          style={{
            marginTop: -30,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            backgroundColor: colorPalette.systemQuaternaryBackground,
          }}
        >
          {transactions.map((t, i) => (
            <Row key={i} highlightColor={colorPalette.systemGray6}>
              <AnimatedPressable
                scaleTo={0.9}
                onPress={() => {
                  navigation.navigate('ActivityDetails', {
                    hash: 'dmkemdoemd',
                  });
                }}
              >
                <HStack justify='space-between'>
                  <HStack>
                    <View
                      style={[
                        styles.icon,
                        {
                          backgroundColor:
                            t.type === 'Sent'
                              ? colorPalette.systemIndigo
                              : colorPalette.systemBlue,
                          shadowColor:
                            t.type === 'Sent'
                              ? colorPalette.systemIndigo
                              : colorPalette.systemBlue,
                        },
                      ]}
                    >
                      <Text weight='bold' size='md' color='white'>
                        {ADA_SYMBOL}
                      </Text>
                    </View>
                    <VStack align='flex-start'>
                      <Text weight='bold'>{t.type}</Text>
                      <Text size='xs'>{t.date}</Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Text
                      size='sm'
                      weight='semiBold'
                      style={{ marginRight: 5 }}
                    >
                      {t.amount}
                    </Text>
                    <Entypo
                      name='chevron-right'
                      size={20}
                      color={colorPalette.systemGray2}
                    />
                  </HStack>
                </HStack>
              </AnimatedPressable>
            </Row>
          ))}
        </List>
      ) : (
        <VStack
          style={{
            marginTop: '75%',
          }}
        >
          <Text size='md' weight='bold'>
            No transactions yet
          </Text>
          <Text size='lg'>😔</Text>
        </VStack>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icon: {
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginRight: 15,
  },
});
