import { Tabs, Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Stack initialRouteName='index'>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="explore" options={{ headerShown: false }} />
      </Stack>
  );
}
