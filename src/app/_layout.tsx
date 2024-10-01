import '../../global.css';

import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { cssInterop } from 'nativewind';
import { useColorScheme } from 'react-native';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

cssInterop(Image, {
  className: {
    target: 'style', // map className->style
  },
});

export default function RootLayout() {
  const theme =   useColorScheme() ?? 'light';

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="[username]" />
      </Stack>
    </ThemeProvider>
  );
}
