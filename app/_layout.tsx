import React, { useEffect } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NavigationProvider } from "@/context/NavigationContext";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { AuthProvider } from "@/context/AuthContext";
import config from "@/config.json"
import { connectSocket, disconnectSocket } from "@/context/socket";
import SocketListener from "@/components/SocketListener";
// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    RalewayRegular: require("../assets/fonts/Raleway-Regular.ttf"),
    RalewayBold: require("../assets/fonts/Raleway-Bold.ttf"),
    RaleWaySemiBold: require("../assets/fonts/Raleway-SemiBold.ttf"),
    RalewayMedium: require("../assets/fonts/Raleway-Medium.ttf"),
    NunitoMedium: require("@/assets/fonts/NunitoSans_10pt-Medium.ttf"),
    NunitoRegular: require("@/assets/fonts/NunitoSans_10pt-Regular.ttf"),
    NunitoSemiBold: require("@/assets/fonts/NunitoSans_10pt-SemiBold.ttf"),
    NunitoBold: require("@/assets/fonts/NunitoSans_10pt-Bold.ttf"),
    PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("@/assets/fonts/Poppins-Light.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // ✅ Custom Toast Configuration
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "green", backgroundColor: "#E7F6E1", zIndex: 20 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: "bold", color: "#2E7D32" }}
        text2Style={{ fontSize: 14, color: "#4CAF50" }}
      />
    ),

    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: "red", backgroundColor: "#FCE4EC", zIndex: 20 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: "bold", color: "#D32F2F" }}
        text2Style={{ fontSize: 14, color: "#E53935" }}
      />
    ),
  };

  return (
    <AuthProvider>
      <NavigationProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="inverted" />
          <Toast config={toastConfig} />
          <SocketListener />
        </ThemeProvider>
      </NavigationProvider>
    </AuthProvider>
  );
}
