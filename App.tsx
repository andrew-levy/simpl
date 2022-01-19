import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStack } from './src/navigation/MainStack';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ColorSchemeProvider } from './src/providers/ColorSchemeProvider';
import { ContextMenuProvider } from './src/components/ContextMenu/components/provider/Provider';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from './src/hooks/useColorScheme';

export default function App() {
  const [fontsLoaded] = useFonts({
    'SF-Pro-Rounded-Bold': require('./assets/fonts/SF-Pro-Rounded-Bold.otf'),
    'SF-Pro-Rounded-Semibold': require('./assets/fonts/SF-Pro-Rounded-Semibold.otf'),
    'SF-Pro-Rounded-Medium': require('./assets/fonts/SF-Pro-Rounded-Medium.otf'),
    'SF-Pro-Rounded-Regular': require('./assets/fonts/SF-Pro-Rounded-Regular.otf'),
    'DMMono-Regular': require('./assets/fonts/DMMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaProvider>
      <ColorSchemeProvider>
        <AppWithColorScheme />
      </ColorSchemeProvider>
    </SafeAreaProvider>
  );
}

const AppWithColorScheme = () => {
  const { colorScheme } = useColorScheme();
  return (
    <ContextMenuProvider
      theme={colorScheme as 'light' | 'dark'}
      iconComponent={Feather}
    >
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ContextMenuProvider>
  );
};
