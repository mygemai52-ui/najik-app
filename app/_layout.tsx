import '../global.css';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { PhoneFrame } from '@/components/PhoneFrame';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PhoneFrame>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: '#FAFAF7' },
            }}
          />
          <StatusBar style="dark" />
        </PhoneFrame>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
