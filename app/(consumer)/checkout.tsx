/**
 * Screen 10 · Checkout — pay your way
 *
 * Nepal-native rails first (eSewa → Khalti → FonePay → IME Pay → ConnectIPS),
 * cards next, "Pay at venue" never removed (60-70% of transactions are still
 * cash per the design doc). Order is intentional — eSewa is the default.
 *
 * The handoff §1.5 says these are the ranks: don't reorder casually.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MockStatusBar } from '@/components/StatusBar';
import {
  ScreenHeader,
  Card,
  StickyCTA,
  PrimaryButton,
  SectionHeader,
  Divider,
  MiniText,
} from '@/components/ui';
import { Check, Wallet, Card as CardIcon, Phone, Lock } from '@/icons/Icon';
import { Photo } from '@/components/Photo';
import { colors } from '@/theme';
import { listings, paymentMethods } from '@/data/mock';

export default function Checkout() {
  const { listing: id } = useLocalSearchParams<{ listing: string }>();
  const router = useRouter();
  const listing = listings.find((l) => l.id === id) ?? listings[0];
  const [pay, setPay] = useState<string>('esewa');
  const [promo, setPromo] = useState(false);

  const subtotal = listing.priceFrom * (listing.category === 'hotels' ? 2 : 1);
  const fee = Math.round(subtotal * 0.02);
  const discount = promo ? 100 : 0;
  const total = subtotal + fee - discount;

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      <ScreenHeader
        title="Checkout"
        subtitle="Step 2 of 3"
        onBack={() => router.back()}
        right={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 999,
              backgroundColor: colors.plum[50],
            }}
          >
            <Lock size={11} color={colors.plum[700]} />
            <Text style={{ fontSize: 10, fontWeight: '700', color: colors.plum[700] }}>
              Secure
            </Text>
          </View>
        }
      />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 24 }}>
        {/* Booking summary */}
        <Card padded={false}>
          <View style={{ flexDirection: 'row' }}>
            <Photo
              variant={listing.photo}
              style={{
                width: 72,
                height: 72,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
              }}
            />
            <View style={{ flex: 1, padding: 12 }}>
              <Text style={{ fontWeight: '800', fontSize: 14 }}>{listing.name}</Text>
              <Text style={{ color: colors.inkMuted, fontSize: 11, marginTop: 2 }}>
                {listing.area}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: colors.plum[700],
                  marginTop: 4,
                }}
              >
                {listing.category === 'hotels'
                  ? 'Standard Double · 2 nights · 2 adults'
                  : listing.category === 'salons'
                  ? 'Haircut · Threading · Tomorrow 11:00 AM'
                  : 'Table for 4 · Tonight 7:30 PM'}
              </Text>
            </View>
          </View>
        </Card>

        <SectionHeader title="Payment method" pre="Pay your way" />
        <View style={{ gap: 8 }}>
          {paymentMethods.map((p) => {
            const active = pay === p.key;
            return (
              <Pressable
                key={p.key}
                onPress={() => setPay(p.key)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  padding: 12,
                  borderWidth: 2,
                  borderColor: active ? colors.plum[500] : colors.line,
                  backgroundColor: active ? colors.plum[50] : '#fff',
                  borderRadius: 14,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: colors.line,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {p.key === 'cod' ? (
                    <Phone size={16} color={colors.plum[700]} />
                  ) : p.key === 'card' ? (
                    <CardIcon size={16} color={colors.plum[700]} />
                  ) : (
                    <Wallet size={16} color={colors.plum[700]} />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '700', fontSize: 13 }}>{p.label}</Text>
                  {p.tag ? (
                    <Text style={{ fontSize: 10, color: colors.inkMuted, marginTop: 2 }}>
                      {p.tag}
                    </Text>
                  ) : null}
                </View>
                {active ? (
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      backgroundColor: colors.plum[500],
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check size={12} color="#fff" />
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>

        {/* Promo code */}
        <SectionHeader title="Promo code" pre="Save more" />
        <Pressable
          onPress={() => setPromo(!promo)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            padding: 12,
            backgroundColor: promo ? colors.plum[50] : '#fff',
            borderWidth: 1,
            borderColor: promo ? colors.plum[500] : colors.line,
            borderRadius: 12,
          }}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              borderWidth: 2,
              borderColor: promo ? colors.plum[500] : colors.lineStrong,
              backgroundColor: promo ? colors.plum[500] : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {promo ? <Check size={12} color="#fff" /> : null}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700', fontSize: 13 }}>NAJIK100</Text>
            <Text style={{ fontSize: 11, color: colors.inkMuted }}>
              Rs. 100 off your first booking
            </Text>
          </View>
        </Pressable>

        {/* Receipt */}
        <SectionHeader title="Bill" pre="Receipt" />
        <Card>
          <Row label="Subtotal" value={`Rs. ${subtotal.toLocaleString()}`} />
          <Row label="Service fee (2%)" value={`Rs. ${fee.toLocaleString()}`} />
          {promo ? <Row label="NAJIK100" value={`− Rs. ${discount}`} accent /> : null}
          <Divider />
          <Row label="Total" value={`Rs. ${total.toLocaleString()}`} bold />
          <MiniText style={{ marginTop: 6 }}>
            You'll be charged via {paymentMethods.find((p) => p.key === pay)?.label}.
            VAT included.
          </MiniText>
        </Card>
      </ScrollView>

      <StickyCTA>
        <PrimaryButton
          label={
            pay === 'cod'
              ? `Confirm booking · Pay at venue`
              : `Pay Rs. ${total.toLocaleString()} via ${paymentMethods.find((p) => p.key === pay)?.label}`
          }
          onPress={() =>
            router.replace(`/(consumer)/booking-confirmed?listing=${listing.id}` as never)
          }
        />
      </StickyCTA>
    </View>
  );
}

function Row({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
      }}
    >
      <Text style={{ fontSize: bold ? 14 : 12, fontWeight: bold ? '800' : '500', color: accent ? colors.ok : colors.inkSec }}>
        {label}
      </Text>
      <Text
        style={{
          fontSize: bold ? 14 : 12,
          fontWeight: bold ? '800' : '600',
          color: accent ? colors.ok : colors.ink,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
