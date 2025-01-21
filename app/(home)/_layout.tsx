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
  const dataList = [
    {
      title: 'Burial',
      name: 'Willams Alex',
      dob: '07-02-1963',
      kin: 'Alex John',
      location: 'Karnail Singh Stadium',
      phone: '+91 0211420420',
      uploadDate: '30 min ago',
    },
    // Add more data objects as needed
  ];
  return (
    <Stack initialRouteName='home' screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="index"/> */}
      <Stack.Screen name="home" />
      <Stack.Screen name="(checklist)" />
    </Stack>
  );
}
