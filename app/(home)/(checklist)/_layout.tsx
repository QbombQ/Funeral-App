import { Stack } from 'expo-router';
import React from 'react';
export default function ChecklistLayout() {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="createchecklist" />
      <Stack.Screen name="viewchecklist" />
      <Stack.Screen name="editchecklist" />
    </Stack>
  );
}
