import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    RalewayRegular: require('../assets/fonts/Raleway-Regular.ttf'),
    RalewayBold: require('../assets/fonts/Raleway-Bold.ttf'),
    RaleWaySemiBold: require('../assets/fonts/Raleway-SemiBold.ttf'),
    RalewayMedium: require('../assets/fonts/Raleway-Medium.ttf'),
    NunitoMedium: require('@/assets/fonts/NunitoSans_10pt-Medium.ttf'),
    NunitoRegular: require('@/assets/fonts/NunitoSans_10pt-Regular.ttf'),
    NunitoSemiBold: require('@/assets/fonts/NunitoSans_10pt-SemiBold.ttf'),
    NunitoBold: require('@/assets/fonts/NunitoSans_10pt-Bold.ttf'),
    PoppinsMedium: require('@/assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  } 

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName='index'>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
