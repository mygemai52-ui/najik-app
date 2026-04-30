/**
 * Screen 23 · Owner · Booking detail.
 *
 * One screen per booking. Two large CTAs at the bottom — Decline (low emphasis)
 * and Confirm (plum). Owner can also message the guest from here.
 */
import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { OwnerBar } from '@/components/OwnerBar';
import {
  ScreenHeader,
  Card,
  Pill,
  StickyCTA,
  PrimaryButton,
  SecondaryButton,
  Divider,
  InfoRow,
} from '@/components/ui';
import { colors } from '@/theme';
import { ownerBookings } from '@/data/mock';
import { Phone, Send, Pin, Calendar, User } from '@/icons/Icon';

export default function OwnerBookingDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const b = ownerBookings.find((x) => x.id === id) ?? ownerBookings[0];
  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OwnerBar flow="Booking detail" />
      <ScreenHeader title={`Booking · ${b.guest}`} onBack={() => router.back()} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        <Card>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontWeight: '800', fontSize: 16 }}>{b.guest}</Text>
            <Pill
              label={b.status === 'pending' ? 'Pending' : 'Confirmed'}
              variant={b.status === 'pending' ? 'warn' : 'ok'}
            />
          </View>
          <Divider />
          <InfoRow
            icon={<Calendar size={14} color={colors.plum[700]} />}
            title={b.when}
            subtitle={`Party of ${b.party}`}
          />
          {b.note ? (
            <InfoRow
              icon={<User size={14} color={colors.plum[700]} />}
              title="Guest note"
              subtitle={b.note}
            />
          ) : null}
          <InfoRow
            icon={<Pin size={14} color={colors.plum[700]} />}
            title="Newroad Café"
            subtitle="Newroad, Kathmandu"
          />
        </Card>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
          <SecondaryButton
            label="Call guest"
            style={{ flex: 1 }}
          />
          <SecondaryButton
            label="Message"
            style={{ flex: 1 }}
          />
        </View>

        <Card style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: '800', fontSize: 13 }}>Cancellation policy</Text>
          <Text style={{ marginTop: 4, fontSize: 12, color: colors.inkSec, lineHeight: 18 }}>
            Free cancellation up to 2 hours before. After that, no-show fee
            applies (capped at one drink/dish). Customer is informed at checkout.
          </Text>
        </Card>
      </ScrollView>

      <StickyCTA>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <SecondaryButton label="Decline" style={{ flex: 1 }} onPress={() => router.back()} />
          <PrimaryButton
            label="Confirm booking"
            style={{ flex: 2 }}
            onPress={() => router.replace('/(owner)/inbox')}
          />
        </View>
      </StickyCTA>
    </View>
  );
}
