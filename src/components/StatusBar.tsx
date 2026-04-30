/**
 * Mock iOS-style status bar shown at the top of every in-app screen.
 *
 * Per the handoff README: "the .sb row at the top of every phone is a mock;
 * remove for native (Android renders its own)". We keep it on web so the device
 * frame looks like a real phone in the prototype shell.
 */
import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Signal, Wifi } from '@/icons/Icon';

export function MockStatusBar({ tint = '#15101D' }: { tint?: string }) {
  if (Platform.OS !== 'web') return null;
  return (
    <View
      className="flex-row items-center justify-between px-4"
      style={{ height: 30 }}
    >
      <Text style={{ color: tint, fontWeight: '700', fontSize: 11 }}>9:41</Text>
      <View className="flex-row items-center" style={{ gap: 5 }}>
        <Signal size={12} color={tint} />
        <Wifi size={12} color={tint} />
        <View
          style={{
            width: 22,
            height: 11,
            borderWidth: 1.2,
            borderColor: tint,
            borderRadius: 3,
            opacity: 0.9,
            position: 'relative',
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: 1,
              top: 1,
              bottom: 1,
              width: '70%',
              backgroundColor: tint,
              borderRadius: 1,
            }}
          />
          <View
            style={{
              position: 'absolute',
              right: -3,
              top: 3,
              width: 2,
              height: 5,
              backgroundColor: tint,
              borderRadius: 1,
            }}
          />
        </View>
      </View>
    </View>
  );
}
