import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EntriesProvider } from '../context/EntriesContext';
import { COLORS } from '../styles/tokens';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <EntriesProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.surface },
            headerTintColor: COLORS.text,
            contentStyle: { backgroundColor: COLORS.surface },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="detail/[id]"
            options={{ title: 'Detail Diary' }}
          />
          <Stack.Screen
            name="about"
            options={{ title: 'Tentang Aplikasi' }}
          />
        </Stack>
      </EntriesProvider>
    </SafeAreaProvider>
  );
}
