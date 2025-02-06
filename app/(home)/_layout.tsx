import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { connectSocket,disconnectSocket } from "@/context/socket";
import SocketListener from "@/components/SocketListener";
export default function HomeLayout() {
  const {userId} = useAuth()
  const { userToken, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !userToken) {
      router.replace("/(auth)/signin"); 
    }
  }, [userToken, isLoading]);
  useEffect(() => {
    if (userId) {
      connectSocket(userId);
    }

    return () => {
      disconnectSocket();
    };
  }, [userId]);
  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
    <Stack initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="(checklist)" />
      <Stack.Screen name="(budget)" />
      <Stack.Screen name="(location)" />
      <Stack.Screen name="(notification)" />
      <Stack.Screen name="(vault)" />
    </Stack>
    <SocketListener/>
    </>
  );
}
