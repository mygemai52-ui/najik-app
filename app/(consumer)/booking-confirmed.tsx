/**
 * Screen 11 · Booking confirmed — QR check-in
 *
 * Lime success ring is one of the five brand-locked lime surfaces (the one
 * celebratory moment). QR is the primary check-in artefact and works offline —
 * per the design doc this is critical because data coverage is patchy outside
 * the valley.
 */
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Svg, { Rect } from 'react-native-svg';
import { MockStatusBar } from '@/components/StatusBar';
import { ScreenHeader, PrimaryButton, SecondaryButton, Card, Divider } from '@/components/ui';
import { Check, Calendar, Pin, Share, Phone } from '@/icons/Icon';
import { colors } from '@/theme';
import { listings } from '@/data/mock';

export default function BookingConfirmed() {
  const { listing: id } = useLocalSearchParams<{ listing: string }>();
  const router = useRouter();
  const listing = listings.find((l) => l.id === id) ?? listings[0];

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      <ScreenHeader title="Booking confirmed" onBack={() => router.replace('/(consumer)/bookings')} />

      <ScrollView contentContainerStyle={{ padding: 16, alignItems: 'center' }}>
        {/* Lime success ring */}
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            borderWidth: 6,
            borderColor: colors.lime[500],
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
            shadowColor: colors.lime[500],
            shadowOpacity: 0.3,
            shadowRadius: 18,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: colors.lime[500],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Check size={32} color={colors.lime[900]} />
          </View>
        </View>

        <Text
          style={{
            marginTop: 16,
            fontSize: 22,
            fontWeight: '800',
            color: colors.ink,
            letterSpacing: -0.4,
          }}
        >
          You're booked! 🎉
        </Text>
        <Text style={{ color: colors.inkMuted, fontSize: 13, marginTop: 4 }}>
          Confirmation sent to your phone.
        </Text>

        <Card style={{ width: '100%', marginTop: 18, alignItems: 'center' }}>
          {/* QR placeholder */}
          <Svg width={170} height={170} viewBox="0 0 21 21">
            <Rect width={21} height={21} fill="#fff" />
            {Array.from({ length: 21 }).map((_, x) =>
              Array.from({ length: 21 }).map((__, y) => {
                // Deterministic hash to render a QR-ish pattern
                const v = (x * 31 + y * 17) % 11;
                if (v < 5) return null;
                return (
                  <Rect
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    width={1}
                    height={1}
                    fill={colors.ink}
                  />
                );
              }),
            )}
            {/* Corner squares */}
            {[
              [0, 0],
              [14, 0],
              [0, 14],
            ].map(([cx, cy], i) => (
              <React.Fragment key={i}>
                <Rect x={cx} y={cy} width={7} height={7} fill={colors.ink} />
                <Rect x={cx + 1} y={cy + 1} width={5} height={5} fill="#fff" />
                <Rect x={cx + 2} y={cy + 2} width={3} height={3} fill={colors.ink} />
              </React.Fragment>
            ))}
          </Svg>
          <Text style={{ marginTop: 10, fontWeight: '800', fontSize: 14 }}>
            Booking #NAJ-{listing.id.toUpperCase()}-2487
          </Text>
          <Text style={{ color: colors.inkMuted, fontSize: 11 }}>
            Show this at check-in
          </Text>
          <Divider style={{ width: '100%' }} />
          <View style={{ width: '100%', gap: 6 }}>
            <Row icon={<Pin size={14} color={colors.plum[700]} />} text={listing.area} />
            <Row
              icon={<Calendar size={14} color={colors.plum[700]} />}
              text={
                listing.category === 'hotels'
                  ? '9 May → 11 May · 2 adults'
                  : listing.category === 'salons'
                  ? 'Tomorrow · 11:00 AM'
                  : 'Tonight · 7:30 PM · party of 4'
              }
            />
            <Row
              icon={<Phone size={14} color={colors.plum[700]} />}
              text="+977 1 4256xxx"
            />
          </View>
        </Card>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 14, width: '100%' }}>
          <SecondaryButton label="Add to calendar" style={{ flex: 1 }} />
          <SecondaryButton label="Share" style={{ flex: 1 }} />
        </View>

        <PrimaryButton
          label="See my bookings"
          style={{ marginTop: 14, alignSelf: 'stretch' }}
          onPress={() => router.replace('/(consumer)/bookings')}
        />
      </ScrollView>
    </View>
  );
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {icon}
      <Text style={{ fontSize: 12, color: colors.inkSec, flex: 1 }}>{text}</Text>
    </View>
  );
}
