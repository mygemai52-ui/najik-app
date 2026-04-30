/**
 * Screen 12 · My bookings (Upcoming · Past · Cancelled)
 *
 * Per the design doc this list is offline-tolerant — bookings shouldn't
 * disappear when signal does. Today it's local mock state; when we wire up the
 * real API we'll cache the latest payload via AsyncStorage so the QR is
 * always reachable.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MockStatusBar } from '@/components/StatusBar';
import { BottomNav } from '@/components/BottomNav';
import { Photo } from '@/components/Photo';
import { ScreenHeader, Card, MiniText, Pill } from '@/components/ui';
import { QR, Calendar } from '@/icons/Icon';
import { colors } from '@/theme';
import { bookings, Booking } from '@/data/mock';

type Tab = 'upcoming' | 'past' | 'cancelled';

export default function Bookings() {
  const [tab, setTab] = useState<Tab>('upcoming');
  const router = useRouter();
  const filtered = bookings.filter((b) => b.status === tab);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      <ScreenHeader title="My bookings" subtitle="All your visits, in one place" />

      <View
        style={{
          flexDirection: 'row',
          gap: 6,
          paddingHorizontal: 14,
          paddingVertical: 6,
        }}
      >
        {(['upcoming', 'past', 'cancelled'] as Tab[]).map((t) => (
          <Pill
            key={t}
            label={t[0].toUpperCase() + t.slice(1)}
            active={t === tab}
            onPress={() => setTab(t)}
          />
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 14, paddingTop: 0, gap: 10, paddingBottom: 24 }}>
        {filtered.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              padding: 32,
              borderRadius: 16,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: colors.line,
            }}
          >
            <Calendar size={32} color={colors.inkMuted} />
            <Text style={{ marginTop: 10, fontWeight: '800', fontSize: 14 }}>
              No {tab} bookings
            </Text>
            <Text
              style={{
                marginTop: 4,
                color: colors.inkMuted,
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              When you book somewhere, it'll show up here.
            </Text>
          </View>
        ) : (
          filtered.map((b) => <BookingCard key={b.id} b={b} onPress={() => router.push('/(consumer)/review')} />)
        )}
      </ScrollView>

      <BottomNav active="bookings" />
    </View>
  );
}

function BookingCard({ b, onPress }: { b: Booking; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card padded={false}>
        <View style={{ flexDirection: 'row' }}>
          <Photo
            variant={b.photo}
            style={{
              width: 92,
              height: 100,
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                backgroundColor: 'rgba(255,255,255,0.18)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <QR size={22} color="#fff" />
            </View>
          </Photo>
          <View style={{ flex: 1, padding: 12 }}>
            <Text style={{ fontWeight: '800', fontSize: 14 }}>{b.listingName}</Text>
            <Text style={{ color: colors.inkMuted, fontSize: 11, marginTop: 2 }}>
              {b.when}
            </Text>
            {b.partySize ? (
              <MiniText style={{ marginTop: 4 }}>Party of {b.partySize}</MiniText>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  backgroundColor: colors.plum[50],
                  borderRadius: 999,
                }}
              >
                <Text style={{ fontSize: 10, fontWeight: '800', color: colors.plum[700] }}>
                  {b.paymentMethod}
                </Text>
              </View>
              <Text style={{ fontSize: 12, fontWeight: '800', color: colors.ink }}>
                {b.price > 0 ? `Rs. ${b.price.toLocaleString()}` : '—'}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
