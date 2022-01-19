import { useContext } from 'react';
import { Colors } from '../theme/colors';
import { ColorSchemeContext } from '../providers/ColorSchemeProvider';

export const useColorScheme = () => {
  return (
    useContext(ColorSchemeContext) || {
      colorScheme: 'light',
      setColorScheme: () => {},
      colorPalette: Colors.light,
      isDark: false,
      isLight: true,
      isSystem: false,
    }
  );
};
