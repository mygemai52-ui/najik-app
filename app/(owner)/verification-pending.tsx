/**
 * Screen 20 · Verification pending.
 *
 * Holding state after the owner submits verification. The owner can browse
 * their dashboard while we review (typically <24 hours) so they don't have to
 * sit on this screen.
 */
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { OwnerBar } from '@/components/OwnerBar';
import { ScreenHeader, Card, PrimaryButton, SecondaryButton } from '@/components/ui';
import { Clock, Verify, Check } from '@/icons/Icon';
import { colors } from '@/theme';

export default function VerificationPending() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OwnerBar flow="Verification" />
      <ScreenHeader title="Verification pending" />

      <ScrollView contentContainerStyle={{ padding: 14, alignItems: 'center', paddingBottom: 24 }}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: colors.plum[50],
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16,
          }}
        >
          <Clock size={36} color={colors.plum[700]} />
        </View>
        <Text style={{ marginTop: 16, fontSize: 22, fontWeight: '800', textAlign: 'center' }}>
          Hang tight, we're reviewing
        </Text>
        <Text
          style={{
            marginTop: 6,
            color: colors.inkMuted,
            fontSize: 13,
            textAlign: 'center',
            paddingHorizontal: 12,
          }}
        >
          Most listings are verified in under 24 hours. We'll send you an SMS as
          soon as you're live.
        </Text>

        <Card style={{ width: '100%', marginTop: 18 }}>
          <Step n={1} text="Listing submitted" done />
          <Step n={2} text="Document review" current />
          <Step n={3} text="Phone verification call (if needed)" />
          <Step n={4} text="Live on Najik" />
        </Card>

        <PrimaryButton
          label="Open my dashboard"
          style={{ marginTop: 16, alignSelf: 'stretch' }}
          onPress={() => router.replace('/(owner)/dashboard')}
        />
        <SecondaryButton
          label="Back to consumer view"
          style={{ marginTop: 8, alignSelf: 'stretch' }}
          onPress={() => router.replace('/(consumer)/home')}
        />
      </ScrollView>
    </View>
  );
}

function Step({ n, text, done, current }: { n: number; text: string; done?: boolean; current?: boolean }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 8,
      }}
    >
      <View
        style={{
          width: 26,
          height: 26,
          borderRadius: 13,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: done ? colors.plum[500] : current ? colors.lime[500] : colors.line,
        }}
      >
        {done ? (
          <Check size={14} color="#fff" />
        ) : (
          <Text style={{ fontWeight: '800', fontSize: 11, color: current ? colors.lime[900] : colors.inkMuted }}>
            {n}
          </Text>
        )}
      </View>
      <Text
        style={{
          fontSize: 13,
          fontWeight: current || done ? '700' : '500',
          color: current ? colors.ink : done ? colors.ink : colors.inkMuted,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
