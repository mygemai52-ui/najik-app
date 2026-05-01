/**
 * Screen 22 · Owner · Bookings inbox.
 *
 * Pending → Confirmed → Today → Tomorrow grouping. The owner accepts/declines
 * with two-tap moves. Tap a row to open the booking detail (screen 23).
 */
import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { OwnerBar } from '@/components/OwnerBar';
import { BottomNav } from '@/components/BottomNav';
import { ScreenHeader, Card, Pill, SectionHeader, MiniText } from '@/components/ui';
import { colors } from '@/theme';
import { ownerBookings } from '@/data/mock';

export default function OwnerBookings() {
  const router = useRouter();
  const pending = ownerBookings.filter((b) => b.status === 'pending');
  const confirmed = ownerBookings.filter((b) => b.status === 'confirmed');
  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OwnerBar flow="Bookings inbox" />
      <ScreenHeader title="Bookings inbox" subtitle={`${pending.length} pending · ${confirmed.length} confirmed`} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 24, gap: 8 }}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Pill label="All" active />
          <Pill label="Today" />
          <Pill label="This week" />
        </View>

        <SectionHeader title="Pending" pre={`${pending.length} need a reply`} />
        {pending.map((b) => (
          <Pressable key={b.id} onPress={() => router.push(`/(owner)/booking/${b.id}` as never)}>
            <Card>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '800', fontSize: 14 }}>{b.guest}</Text>
                  <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }}>
                    {b.when} · party of {b.party}
                  </Text>
                  {b.note ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                        marginTop: 6,
                      }}
                    >
                      <Text style={{ fontSize: 11, color: colors.plum[700], fontWeight: '700' }}>
                        Note:
                      </Text>
                      <Text style={{ fontSize: 11, color: colors.inkSec }}>{b.note}</Text>
                    </View>
                  ) : null}
                </View>
                <Pill label="Pending" variant="warn" />
              </View>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
                <Pressable
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.lineStrong,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontWeight: '700', fontSize: 12, color: colors.ink }}>
                    Decline
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 10,
                    backgroundColor: colors.plum[500],
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontWeight: '800', fontSize: 12, color: '#fff' }}>
                    Confirm
                  </Text>
                </Pressable>
              </View>
            </Card>
          </Pressable>
        ))}

        <SectionHeader title="Confirmed · upcoming" pre={`${confirmed.length} bookings`} />
        {confirmed.map((b) => (
          <Pressable key={b.id} onPress={() => router.push(`/(owner)/booking/${b.id}` as never)}>
            <Card>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '800', fontSize: 14 }}>{b.guest}</Text>
                  <MiniText style={{ marginTop: 2 }}>
                    {b.when} · party of {b.party}
                  </MiniText>
                  {b.note ? <MiniText>Note: {b.note}</MiniText> : null}
                </View>
                <Pill label="Confirmed" variant="ok" />
              </View>
            </Card>
          </Pressable>
        ))}
      </ScrollView>

      <BottomNav active="bookings" variant="owner" />
    </View>
  );
}
