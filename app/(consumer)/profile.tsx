/**
 * Screen 14 · Profile
 *
 * Wallet · Saved places · Reviews live above the fold. "For business owners"
 * stub is a first-class entry point so we can capture supply-side intent
 * inside the consumer app without shipping a second APK on day one.
 *
 * Language toggle is also here — defaults to Nepali per the design doc.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { MockStatusBar } from '@/components/StatusBar';
import { BottomNav } from '@/components/BottomNav';
import {
  ScreenHeader,
  Card,
  SectionHeader,
  Pill,
  InfoRow,
  Divider,
} from '@/components/ui';
import {
  Heart,
  Wallet,
  Edit,
  Settings,
  Globe,
  Bell,
  Sparkles,
  CaretR,
  ChartBar,
} from '@/icons/Icon';
import { colors } from '@/theme';

export default function Profile() {
  const router = useRouter();
  const [lang, setLang] = useState<'np' | 'en'>('np');

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      <ScreenHeader title="Profile" />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 24 }}>
        {/* Header card */}
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: colors.plum[500],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '800', fontSize: 22 }}>S</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '800', fontSize: 16 }}>Sujata Karki</Text>
              <Text style={{ color: colors.inkMuted, fontSize: 12 }}>+977 98xxxxxxxx</Text>
            </View>
            <Pressable
              onPress={() => null}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.lineStrong,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: '700', color: colors.ink }}>Edit</Text>
            </Pressable>
          </View>
          <Divider />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Stat label="Bookings" value="12" />
            <Stat label="Reviews" value="8" />
            <Stat label="Saved" value="24" />
          </View>
        </Card>

        {/* Wallet */}
        <SectionHeader title="Wallet" pre="Najik balance" />
        <Card>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  backgroundColor: colors.plum[50],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Wallet size={18} color={colors.plum[700]} />
              </View>
              <View>
                <Text style={{ fontSize: 12, color: colors.inkMuted }}>Available</Text>
                <Text style={{ fontWeight: '800', fontSize: 18, color: colors.ink }}>
                  Rs. 240
                </Text>
              </View>
            </View>
            <Pressable
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: colors.plum[500],
              }}
            >
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '800' }}>
                Top up
              </Text>
            </Pressable>
          </View>
        </Card>

        {/* For business owners */}
        <SectionHeader title="For business owners" pre="List your place" />
        <Link href="/(consumer)/list-your-business" asChild>
          <Pressable>
            <Card>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <View
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    backgroundColor: colors.lime[500],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Sparkles size={18} color={colors.lime[900]} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '800', fontSize: 14 }}>
                    List your business on Najik
                  </Text>
                  <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }}>
                    Free to join · 8–15% only on completed bookings
                  </Text>
                </View>
                <CaretR size={14} color={colors.inkMuted} />
              </View>
            </Card>
          </Pressable>
        </Link>

        <Pressable onPress={() => router.push('/(owner)/dashboard')}>
          <Card style={{ marginTop: 8 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  backgroundColor: colors.plum[700],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChartBar size={18} color={colors.lime[500]} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '800', fontSize: 14 }}>
                  Switch to owner mode
                </Text>
                <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }}>
                  See your dashboard, bookings inbox & reviews
                </Text>
              </View>
              <CaretR size={14} color={colors.inkMuted} />
            </View>
          </Card>
        </Pressable>

        {/* Settings */}
        <SectionHeader title="Settings" pre="Account" />
        <Card padded={false}>
          <InfoRow
            icon={<Heart size={16} color={colors.plum[700]} />}
            title="Saved places"
            subtitle="24 places"
            right={<CaretR size={14} color={colors.inkMuted} />}
            style={{ paddingHorizontal: 14 }}
          />
          <Divider style={{ marginVertical: 0 }} />
          <InfoRow
            icon={<Edit size={16} color={colors.plum[700]} />}
            title="My reviews"
            subtitle="8 reviews · 2 drafts"
            right={<CaretR size={14} color={colors.inkMuted} />}
            style={{ paddingHorizontal: 14 }}
          />
          <Divider style={{ marginVertical: 0 }} />
          <InfoRow
            icon={<Bell size={16} color={colors.plum[700]} />}
            title="Notifications"
            subtitle="Booking reminders · review prompts"
            right={<CaretR size={14} color={colors.inkMuted} />}
            style={{ paddingHorizontal: 14 }}
          />
          <Divider style={{ marginVertical: 0 }} />
          <View style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingVertical: 4,
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  backgroundColor: colors.plum[50],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Globe size={16} color={colors.plum[700]} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', fontSize: 13 }}>Language</Text>
                <Text style={{ color: colors.inkMuted, fontSize: 11 }}>
                  Switch UI between English and नेपाली
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <Pill label="नेपाली" active={lang === 'np'} onPress={() => setLang('np')} />
                <Pill label="EN" active={lang === 'en'} onPress={() => setLang('en')} />
              </View>
            </View>
          </View>
          <Divider style={{ marginVertical: 0 }} />
          <InfoRow
            icon={<Settings size={16} color={colors.plum[700]} />}
            title="Help & support"
            right={<CaretR size={14} color={colors.inkMuted} />}
            style={{ paddingHorizontal: 14 }}
          />
        </Card>

        <Pressable
          style={{
            marginTop: 14,
            alignSelf: 'center',
            paddingHorizontal: 18,
            paddingVertical: 10,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: colors.err, fontWeight: '700' }}>Log out</Text>
        </Pressable>
      </ScrollView>

      <BottomNav active="profile" />
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ fontWeight: '800', fontSize: 18, color: colors.ink }}>{value}</Text>
      <Text style={{ color: colors.inkMuted, fontSize: 11 }}>{label}</Text>
    </View>
  );
}
