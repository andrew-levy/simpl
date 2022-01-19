import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '../theme/colors';

type ColorSchemeProviderProps = {
  children: React.ReactNode;
};

export const ColorSchemeContext = React.createContext<{
  colorScheme: string | null | undefined;
  isLight: boolean;
  isDark: boolean;
  isSystem: boolean;
  setColorScheme: (colorScheme: 'light' | 'dark' | 'system') => void;
  colorPalette: typeof Colors.light | typeof Colors.dark;
} | null>(null);

export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState('light');
  const systemColorScheme = useColorScheme();
  const interpolatedColorScheme =
    colorScheme === 'system' ? systemColorScheme : colorScheme;
  const value = {
    colorScheme: interpolatedColorScheme,
    setColorScheme,
    colorPalette: Colors[interpolatedColorScheme as keyof typeof Colors],
    isLight: colorScheme === 'light',
    isDark: colorScheme === 'dark',
    isSystem: colorScheme === 'system',
  };

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
