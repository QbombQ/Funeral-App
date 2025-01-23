import { Tabs, Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import NavigationHeader from '@/components/navigation/NavigationHeader';

export default function HomeLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack initialRouteName='home' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="(checklist)" />
    </Stack>
  );
}
