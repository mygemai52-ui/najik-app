/**
 * Screen 06 · Filter sheet (full-page on mobile, modal-styled on web).
 *
 * Budget · distance · rating · open · payment · cuisine — all the levers used
 * across categories live in one sheet. Sliders have fixed steps that map to the
 * budget chips on Home, so the user's mental model is consistent.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MockStatusBar } from '@/components/StatusBar';
import { ScreenHeader, Pill, PrimaryButton, SectionHeader } from '@/components/ui';
import { colors } from '@/theme';
import { paymentMethods } from '@/data/mock';

const BUDGET_STOPS = [200, 500, 1000, 1500, 3000];
const DISTANCES = ['Walking · 1 km', '5 min ride', '15 min ride', 'Anywhere in city'];
const CUISINES  = ['Newari', 'Thakali', 'Tibetan', 'Indian', 'Continental', 'Pizza', 'Veg', 'Non-veg'];

export default function FilterSheet() {
  const router = useRouter();
  const [budget, setBudget] = useState(500);
  const [distance, setDistance] = useState(DISTANCES[0]);
  const [openNow, setOpenNow] = useState(true);
  const [minRating, setMinRating] = useState(4);
  const [cuisines, setCuisines] = useState<string[]>(['Newari']);
  const [payments, setPayments] = useState<string[]>(['esewa']);

  const toggle = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      <ScreenHeader
        title="Filter"
        subtitle="Refine the results"
        onBack={() => router.back()}
        right={
          <Pressable
            onPress={() => {
              setBudget(500);
              setDistance(DISTANCES[0]);
              setOpenNow(true);
              setMinRating(4);
              setCuisines([]);
              setPayments([]);
            }}
          >
            <Text style={{ color: colors.plum[700], fontWeight: '700' }}>Reset</Text>
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="Budget per person" pre="Rs." />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {BUDGET_STOPS.map((v) => (
            <Pill
              key={v}
              label={`Rs. ${v.toLocaleString()}`}
              active={v === budget}
              onPress={() => setBudget(v)}
            />
          ))}
        </View>

        <SectionHeader title="Distance" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {DISTANCES.map((d) => (
            <Pill
              key={d}
              label={d}
              active={d === distance}
              onPress={() => setDistance(d)}
            />
          ))}
        </View>

        <SectionHeader title="Live status" />
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Pill
            label="Open now"
            active={openNow}
            onPress={() => setOpenNow(!openNow)}
          />
          <Pill label="Tables free" />
          <Pill label="Free cancellation" />
        </View>

        <SectionHeader title="Minimum rating" />
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {[3, 3.5, 4, 4.5].map((r) => (
            <Pill
              key={r}
              label={`★ ${r}+`}
              active={r === minRating}
              onPress={() => setMinRating(r)}
            />
          ))}
        </View>

        <SectionHeader title="Cuisine" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {CUISINES.map((c) => (
            <Pill
              key={c}
              label={c}
              active={cuisines.includes(c)}
              onPress={() => setCuisines(toggle(cuisines, c))}
            />
          ))}
        </View>

        <SectionHeader title="Payments accepted" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {paymentMethods.map((p) => (
            <Pill
              key={p.key}
              label={p.label}
              active={payments.includes(p.key)}
              onPress={() => setPayments(toggle(payments, p.key))}
            />
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          padding: 14,
          borderTopWidth: 1,
          borderTopColor: colors.line,
          backgroundColor: '#fff',
        }}
      >
        <PrimaryButton
          label="Show 24 places"
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}
