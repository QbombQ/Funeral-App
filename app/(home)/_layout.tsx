import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import tw from "twrnc";

export default function HomeLayout() {
  const { userToken, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !userToken) {
      router.replace("/(auth)/signin"); // Redirect to login if not authenticated
    }
  }, [userToken, isLoading]);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="(checklist)" />
      <Stack.Screen name="(budget)" />
      <Stack.Screen name="(location)" />
      <Stack.Screen name="(notification)" />
      <Stack.Screen name="(vault)" />
    </Stack>
  );
}
