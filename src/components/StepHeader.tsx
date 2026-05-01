/**
 * Step indicator used across the 4-step listing wizard (screens 16-19).
 * Pinned under the OwnerBar; shows progress so the owner knows how far they
 * are from done — meeting the design doc target of ~10 min for full setup.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@/theme';

export function StepHeader({ step, total = 4 }: { step: number; total?: number }) {
  return (
    <View style={{ paddingHorizontal: 14, paddingTop: 8 }}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: i < step ? colors.plum[500] : colors.line,
            }}
          />
        ))}
      </View>
      <Text
        style={{
          marginTop: 6,
          fontSize: 10,
          color: colors.inkMuted,
          fontWeight: '700',
          letterSpacing: 1.4,
          textTransform: 'uppercase',
        }}
      >
        Step {step} of {total}
      </Text>
    </View>
  );
}
