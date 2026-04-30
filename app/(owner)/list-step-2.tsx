/**
 * Screen 17 · Listing · Step 2 of 4 — Hours & photos.
 *
 * Day-by-day hours grid + photo upload tiles. We default to "Open" for every
 * day so owners only correct the closed days — saves taps for the common case.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { OwnerBar } from '@/components/OwnerBar';
import { StepHeader } from '@/components/StepHeader';
import {
  ScreenHeader,
  PrimaryButton,
  StickyCTA,
  SectionHeader,
  Card,
  Pill,
} from '@/components/ui';
import { Camera, Plus, Image, Phone } from '@/icons/Icon';
import { colors } from '@/theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ListStep2() {
  const router = useRouter();
  const [openDays, setOpenDays] = useState<Record<string, boolean>>(
    Object.fromEntries(DAYS.map((d) => [d, d !== 'Tue'])),
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OwnerBar flow="List your business" />
      <ScreenHeader title="Hours & photos" onBack={() => router.back()} />
      <StepHeader step={2} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        <SectionHeader title="Opening hours" pre="When are you open?" />
        <Card padded={false}>
          {DAYS.map((d) => (
            <View
              key={d}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.line,
                gap: 10,
              }}
            >
              <Text style={{ width: 40, fontWeight: '700', fontSize: 13 }}>{d}</Text>
              <Pill
                label={openDays[d] ? 'Open' : 'Closed'}
                variant={openDays[d] ? 'ok' : 'err'}
                onPress={() => setOpenDays((p) => ({ ...p, [d]: !p[d] }))}
              />
              <Text style={{ flex: 1 }} />
              <Text style={{ color: colors.inkMuted, fontSize: 12, fontWeight: '600' }}>
                {openDays[d] ? '10:00 AM – 10:00 PM' : '—'}
              </Text>
            </View>
          ))}
        </Card>

        <SectionHeader title="Photos" pre="Add at least 3" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={{
                width: '48%',
                aspectRatio: 1,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.line,
                borderStyle: 'dashed',
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Camera size={20} color={colors.plum[500]} />
              <Text style={{ fontSize: 11, color: colors.inkMuted }}>
                {i === 1 ? 'Cover photo' : 'Add photo'}
              </Text>
            </View>
          ))}
        </View>

        <SectionHeader title="Contact number" pre="For customers + Najik" />
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: colors.plum[50],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Phone size={16} color={colors.plum[700]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700', fontSize: 13 }}>+977 1 4256421</Text>
              <Text style={{ color: colors.inkMuted, fontSize: 11 }}>
                Verified via OTP · shown on detail page
              </Text>
            </View>
            <Text style={{ color: colors.plum[700], fontWeight: '700' }}>Edit</Text>
          </View>
        </Card>
      </ScrollView>

      <StickyCTA>
        <PrimaryButton
          label="Continue · Step 3 of 4"
          onPress={() => router.push('/(owner)/list-step-3')}
        />
      </StickyCTA>
    </View>
  );
}
