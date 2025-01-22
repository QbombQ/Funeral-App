import { Tabs, Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function BudgetLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{headerShown:false}}>
      {/* <Tabs.Screen name="(home)" /> */}
      <Stack.Screen name="index"/>
      <Stack.Screen name="payment"/>
      {/* <Stack.Screen name="createchecklist"/>
      <Stack.Screen name="viewchecklist"/> */}
    </Stack>
  );
}
