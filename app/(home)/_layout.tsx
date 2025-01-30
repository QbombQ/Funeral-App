import { Stack } from 'expo-router';
import React from 'react';

export default function HomeLayout() {

  return (
    <Stack initialRouteName='home' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="(checklist)" />
      <Stack.Screen name="(budget)" />
      <Stack.Screen name="(location)" />
      <Stack.Screen name="(notification)" />
      <Stack.Screen name="(vault)" />
    </Stack>
  );
}
