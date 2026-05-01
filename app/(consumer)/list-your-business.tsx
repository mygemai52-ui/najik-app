/**
 * Screen 15 · List your business — entry / supply-side onboarding stub.
 *
 * The pitch the small-business owner sees before entering the 4-step listing
 * wizard. Free to join, commission only on completed bookings, "Pay at venue"
 * walk-ins never charged — directly addresses the trust hurdle the design doc
 * §8 calls out.
 */
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { MockStatusBar } from '@/components/StatusBar';
import {
  ScreenHeader,
  PrimaryButton,
  StickyCTA,
  Card,
  SectionHeader,
  InfoRow,
} from '@/components/ui';
import { Sparkles, Verify, Wallet, ChartBar, Phone, Check } from '@/icons/Icon';
import { colors } from '@/theme';

export default function ListYourBusiness() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      <ScreenHeader title="List your business" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        <Card style={{ overflow: 'hidden' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: colors.lime[500],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={20} color={colors.lime[900]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '800', fontSize: 16 }}>
                Reach budget-first customers near you
              </Text>
              <Text style={{ fontSize: 12, color: colors.inkMuted, marginTop: 2 }}>
                40,000+ Najik users in Kathmandu Valley · growing weekly
              </Text>
            </View>
          </View>
        </Card>

        <SectionHeader title="Why list on Najik" pre="3 reasons" />
        <Card padded={false}>
          <InfoRow
            icon={<Wallet size={16} color={colors.plum[700]} />}
            title="Free to join"
            subtitle="No setup fee. 8–15% only on completed online bookings."
            style={{ paddingHorizontal: 14 }}
          />
          <InfoRow
            icon={<Phone size={16} color={colors.plum[700]} />}
            title="Calls & directions = free"
            subtitle="No commission on walk-ins or phone bookings."
            style={{ paddingHorizontal: 14 }}
          />
          <InfoRow
            icon={<Verify size={16} color={colors.plum[700]} />}
            title="Verified badge"
            subtitle="Plum verified mark = top of the list."
            style={{ paddingHorizontal: 14 }}
          />
          <InfoRow
            icon={<ChartBar size={16} color={colors.plum[700]} />}
            title="Owner dashboard"
            subtitle="See views, bookings, reviews — all in-app."
            style={{ paddingHorizontal: 14 }}
          />
        </Card>

        <SectionHeader title="What you'll need" pre="Setup · 4 steps · ~10 min" />
        <Card padded={false}>
          {[
            'Business name, category, location',
            'Hours, photos & contact',
            'Services / menu / room types & prices',
            'PAN / VAT or Citizenship for verification',
          ].map((s, i) => (
            <View
              key={s}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderBottomWidth: i === 3 ? 0 : 1,
                borderBottomColor: colors.line,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: colors.plum[50],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontWeight: '800', fontSize: 11, color: colors.plum[700] }}>
                  {i + 1}
                </Text>
              </View>
              <Text style={{ fontSize: 13, color: colors.ink, flex: 1 }}>{s}</Text>
              <Check size={14} color={colors.inkMuted} />
            </View>
          ))}
        </Card>
      </ScrollView>

      <StickyCTA>
        <PrimaryButton
          label="Get started · 4 quick steps"
          onPress={() => router.push('/(owner)/list-step-1')}
        />
      </StickyCTA>
    </View>
  );
}
