/**
 * Screen 16 · Listing · Step 1 of 4 — Basics.
 *
 * Business name, category and location pin. Category list mirrors the consumer
 * IA so the same taxonomy drives discovery + listing — no fork between
 * consumer-facing categories and owner taxonomy.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { OwnerBar } from '@/components/OwnerBar';
import { StepHeader } from '@/components/StepHeader';
import {
  ScreenHeader,
  Pill,
  PrimaryButton,
  StickyCTA,
  SectionHeader,
} from '@/components/ui';
import { Pin, Search } from '@/icons/Icon';
import { colors } from '@/theme';
import { categories } from '@/data/mock';

export default function ListStep1() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [cat, setCat] = useState('restaurants');
  const [area, setArea] = useState('Newroad, Kathmandu');

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OwnerBar flow="List your business" />
      <ScreenHeader
        title="Basics"
        subtitle="What is your business?"
        onBack={() => router.back()}
      />
      <StepHeader step={1} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        <SectionHeader title="Business name" pre="Required" />
        <View style={inputBox}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Newroad Café"
            placeholderTextColor={colors.inkMuted}
            style={inputText}
          />
        </View>

        <SectionHeader title="Category" pre="Pick one" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {categories
            .filter((c) => c.key !== 'more')
            .map((c) => (
              <Pill
                key={c.key}
                label={c.label}
                active={cat === c.key}
                onPress={() => setCat(c.key)}
              />
            ))}
        </View>

        <SectionHeader title="Location" pre="Pin on map" />
        <View
          style={{
            ...inputBox,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Search size={14} color={colors.inkMuted} />
          <TextInput
            value={area}
            onChangeText={setArea}
            placeholder="Address, area or landmark"
            placeholderTextColor={colors.inkMuted}
            style={[inputText, { flex: 1 }]}
          />
        </View>
        <View
          style={{
            marginTop: 8,
            height: 140,
            borderRadius: 14,
            backgroundColor: '#E5DCC7',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: colors.plum[500],
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
            }}
          >
            <Pin size={12} color={colors.lime[500]} />
            <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>
              Drag to set exact pin
            </Text>
          </View>
        </View>
      </ScrollView>

      <StickyCTA>
        <PrimaryButton label="Continue · Step 2 of 4" onPress={() => router.push('/(owner)/list-step-2')} />
      </StickyCTA>
    </View>
  );
}

const inputBox = {
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: colors.line,
  borderRadius: 14,
  paddingHorizontal: 12,
  paddingVertical: 10,
};
const inputText = { fontSize: 14, color: colors.ink, fontFamily: 'DM Sans' };
