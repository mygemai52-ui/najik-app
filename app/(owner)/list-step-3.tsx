/**
 * Screen 18 · Listing · Step 3 of 4 — Services & price.
 *
 * Owner enters their services / menu items / room types with a price each.
 * The same shape feeds the consumer detail-page service list (screen 09 / 08)
 * so what the owner types here is what the customer sees.
 *
 * "From Rs. X" transparent pricing is a key differentiator vs. competitors per
 * the design doc.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { OwnerBar } from '@/components/OwnerBar';
import { StepHeader } from '@/components/StepHeader';
import {
  ScreenHeader,
  PrimaryButton,
  StickyCTA,
  SectionHeader,
  Card,
  Divider,
} from '@/components/ui';
import { Plus, X } from '@/icons/Icon';
import { colors } from '@/theme';

type Item = { id: string; name: string; price: string };

export default function ListStep3() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: 'Newari thali', price: '380' },
    { id: '2', name: 'Buff momo · 10 pc', price: '180' },
    { id: '3', name: 'Chiya', price: '40' },
  ]);

  const update = (id: string, k: 'name' | 'price', v: string) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, [k]: v } : i)));

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OwnerBar flow="List your business" />
      <ScreenHeader title="Services & price" onBack={() => router.back()} />
      <StepHeader step={3} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        <SectionHeader
          title="Items, prices, durations"
          pre="What customers will see"
        />
        <Card>
          {items.map((item, idx) => (
            <View key={item.id}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingVertical: 8,
                }}
              >
                <View style={{ flex: 1 }}>
                  <TextInput
                    value={item.name}
                    placeholder="Item name"
                    placeholderTextColor={colors.inkMuted}
                    onChangeText={(v) => update(item.id, 'name', v)}
                    style={{ fontSize: 14, fontWeight: '700', color: colors.ink }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    backgroundColor: colors.plum[50],
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: colors.plum[700], fontWeight: '800' }}>Rs.</Text>
                  <TextInput
                    value={item.price}
                    keyboardType="numeric"
                    onChangeText={(v) => update(item.id, 'price', v)}
                    style={{ width: 60, fontWeight: '800', color: colors.plum[700] }}
                  />
                </View>
                <Pressable
                  onPress={() => setItems((p) => p.filter((i) => i.id !== item.id))}
                >
                  <X size={14} color={colors.inkMuted} />
                </Pressable>
              </View>
              {idx < items.length - 1 ? <Divider style={{ marginVertical: 0 }} /> : null}
            </View>
          ))}
        </Card>

        <Pressable
          onPress={() =>
            setItems((p) => [
              ...p,
              { id: String(Date.now()), name: '', price: '' },
            ])
          }
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginTop: 10,
            padding: 12,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.lineStrong,
            borderStyle: 'dashed',
            justifyContent: 'center',
          }}
        >
          <Plus size={14} color={colors.plum[700]} />
          <Text style={{ color: colors.plum[700], fontWeight: '700' }}>Add another item</Text>
        </Pressable>

        <SectionHeader title="Pricing display" pre="Auto" />
        <Card>
          <Text style={{ fontSize: 13, color: colors.inkSec }}>
            Customers will see "From <Text style={{ fontWeight: '800', color: colors.plum[700] }}>Rs. {(() => {
              const valid = items.map((i) => Number(i.price)).filter((n) => Number.isFinite(n) && n > 0);
              return valid.length > 0 ? Math.min(...valid) : 0;
            })()}</Text>" on your card.
          </Text>
          <Text style={{ marginTop: 6, fontSize: 11, color: colors.inkMuted }}>
            We compute this from your lowest-priced item. Hide individual items
            from search later from Edit listing.
          </Text>
        </Card>
      </ScrollView>

      <StickyCTA>
        <PrimaryButton
          label="Continue · Step 4 of 4"
          onPress={() => router.push('/(owner)/list-step-4')}
        />
      </StickyCTA>
    </View>
  );
}
