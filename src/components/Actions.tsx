import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  Entypo,
} from '@expo/vector-icons';
import { AnimatePresence, MotiView } from 'moti';
import { AnimatedPressable } from './AnimatedPressable';
import {
  MainStackNavigationProp,
  MainStackParamList,
} from '../navigation/MainStack';
import { Text } from './Text';
import { useColorScheme } from '../hooks/useColorScheme';

type Action = {
  title: string;
  icon: JSX.Element;
  screen: keyof MainStackParamList;
  color: string;
};

export const Actions = () => {
  const [expanded, setExpanded] = useState(false);
  const { colorPalette } = useColorScheme();
  const actions: Action[] = [
    {
      title: 'Send',
      icon: <FontAwesome name='send' size={24} color='white' />,
      screen: 'SendStack',
      color: colorPalette.systemOrange,
    },
    {
      title: 'Collectibles',
      icon: <MaterialIcons name='collections' size={24} color='white' />,
      screen: 'Collectibles',
      color: colorPalette.systemIndigo,
    },

    {
      title: 'Activity',
      icon: <Feather name='clock' size={24} color='white' />,
      screen: 'ActivityStack',
      color: colorPalette.systemGreen,
    },
    {
      title: 'Stake',
      icon: <Feather name='percent' size={24} color='white' />,
      screen: 'Staking',
      color: colorPalette.systemTeal,
    },
  ];
  return (
    <>
      <AnimatedPressable
        onPress={() => setExpanded(!expanded)}
        style={[
          styles.button,
          {
            backgroundColor: colorPalette.systemBlue,
            shadowColor: colorPalette.systemBlue,
          },
        ]}
      >
        <AnimatePresence>
          {expanded ? (
            <Feather name='x' size={24} color='white' />
          ) : (
            <Entypo name='dots-three-horizontal' size={24} color='white' />
          )}
        </AnimatePresence>
      </AnimatedPressable>
      <AnimatePresence>
        {expanded && (
          <View style={styles.container}>
            {actions.map((action, i) => (
              <Action key={i} action={action} index={i} />
            ))}
          </View>
        )}
      </AnimatePresence>
    </>
  );
};

const Action = ({ action, index }: { action: Action; index: number }) => {
  const navigation = useNavigation<MainStackNavigationProp>();
  return (
    <MotiView
      transition={{ delay: index * 100, damping: 15 }}
      from={{
        opacity: 0,
        translateX: 0,
      }}
      animate={{
        opacity: 1,
        translateX: -65 * (index + 1),
      }}
      exit={{
        opacity: 0,
        translateX: 0,
      }}
    >
      <AnimatedPressable
        onPress={() => navigation.navigate(action.screen)}
        style={[
          styles.button,
          {
            backgroundColor: action.color,
            shadowColor: action.color,
          },
        ]}
      >
        {action.icon}
      </AnimatedPressable>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    borderRadius: 100,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1,
  },
});
