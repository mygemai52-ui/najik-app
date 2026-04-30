/**
 * PhoneFrame
 *
 * On web (and tablet/desktop), wraps the app in a 390×844 phone bezel sitting on
 * the deep-plum prototype background, mirroring the live prototype shell. On
 * native mobile the wrapper is a no-op so the app fills the device.
 *
 * The handoff (README §brand rules + §implementation notes) is mobile-only at
 * 390×844 — desktop is "purely for prototype viewing".
 */
import React from 'react';
import { Platform, View, useWindowDimensions } from 'react-native';
import { device } from '@/theme';

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();

  // Native mobile: no bezel, full screen.
  if (Platform.OS !== 'web') {
    return <View className="flex-1 bg-surface-bg">{children}</View>;
  }

  // Phone-sized web viewport: also full screen (PWA / phone browser).
  if (width <= device.w + 32) {
    return <View className="flex-1 bg-surface-bg">{children}</View>;
  }

  // Desktop / tablet web: render the phone bezel on a dark prototype shell.
  // Scale down if the viewport is shorter than 844 + padding so the whole
  // device is visible without scrolling.
  const verticalPad = 24;
  const minScale = Math.min(1, (height - verticalPad * 2) / (device.h + 32));
  return (
    <View
      className="flex-1 items-center justify-center bg-page-bg"
      style={{
        backgroundColor: '#0E0A1A',
      }}
    >
      <View
        style={{
          width: device.w,
          height: device.h,
          borderRadius: 44,
          padding: 8,
          backgroundColor: '#15101D',
          boxShadow:
            '0 28px 60px -16px rgba(46,11,82,0.40), 0 0 0 1px rgba(255,255,255,0.04)',
          transform: minScale < 1 ? [{ scale: minScale }] : undefined,
        }}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 36,
            overflow: 'hidden',
            backgroundColor: '#FAFAF7',
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
}
