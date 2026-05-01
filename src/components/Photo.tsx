/**
 * Photo placeholder — uses the same five gradient variants the prototype's
 * `.photo.{warm,cool,green,bed,peach}` classes do. Per README, swap with real
 * <Image> components once content is shot. The shape stays the same: a plum
 * gradient with a soft lime/peach highlight in the corner so the brand reads
 * even before there's photography.
 */
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export type PhotoVariant = 'default' | 'warm' | 'cool' | 'green' | 'bed' | 'peach';

const palettes: Record<PhotoVariant, { colors: [string, string]; start: { x: number; y: number }; end: { x: number; y: number } }> = {
  default: { colors: ['#B884E5', '#5B1A95'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  warm:    { colors: ['#B45309', '#5B1A95'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  cool:    { colors: ['#7B2CBF', '#2E0B52'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  green:   { colors: ['#4A6512', '#5B1A95'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  bed:     { colors: ['#B884E5', '#5B1A95'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  peach:   { colors: ['#F2A65A', '#5B1A95'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
};

export function Photo({
  variant = 'default',
  style,
  children,
}: {
  variant?: PhotoVariant;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}) {
  const p = palettes[variant];
  return (
    <LinearGradient colors={p.colors} start={p.start} end={p.end} style={style as ViewStyle}>
      {children}
    </LinearGradient>
  );
}
