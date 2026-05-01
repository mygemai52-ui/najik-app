/**
 * "Owner mode · {flow}" bar pinned at the very top of every owner-mode screen.
 *
 * Per the handoff brand rules (#4): every owner screen has a thin dark bar at
 * the top; switch-back affordance ("Switch to user view") is always top-right.
 */
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export function OwnerBar({ flow }: { flow: string }) {
  const router = useRouter();
  return (
    <View
      className="flex-row items-center justify-between px-4"
      style={{ height: 30, backgroundColor: '#15101D' }}
    >
      <Text style={{ color: '#E2DFEC', fontSize: 11, fontWeight: '700' }}>
        Owner mode · <Text style={{ color: '#D4F542' }}>{flow}</Text>
      </Text>
      <Pressable onPress={() => router.replace('/(consumer)/home')}>
        <Text style={{ color: '#9890AC', fontSize: 11, fontWeight: '600' }}>
          Switch to user view ›
        </Text>
      </Pressable>
    </View>
  );
}
