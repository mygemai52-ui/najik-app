/**
 * Screen 25 · Owner · Reviews & reply.
 *
 * Most recent first; stars + body + per-aspect chips. Inline reply box. Per
 * the design doc, owners that reply within 24h see a 12% lift in conversion;
 * the screen makes that lift cheap to capture.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { OwnerBar } from '@/components/OwnerBar';
import { BottomNav } from '@/components/BottomNav';
import {
  ScreenHeader,
  Card,
  StarRating,
  Pill,
  MiniText,
  Divider,
  PrimaryButton,
  SectionHeader,
} from '@/components/ui';
import { Reply, Send } from '@/icons/Icon';
import { colors } from '@/theme';

const FAKE = [
  {
    id: '1',
    author: 'Riya G.',
    rating: 5,
    date: '2 weeks ago',
    body: 'Newari thali under Rs. 400 — generous portions and quick on Friday.',
    aspects: { Food: 5, Service: 4, Value: 5 },
    reply: null as null | string,
  },
  {
    id: '2',
    author: 'Anish R.',
    rating: 4,
    date: '1 month ago',
    body: 'Authentic flavour. Service slows on weekends. Worth the wait.',
    aspects: { Food: 5, Service: 3, Value: 4 },
    reply: 'Thank you Anish — we\'ve added staff for Sat dinners. Hope to see you soon!',
  },
];

export default function OwnerReviews() {
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OwnerBar flow="Reviews" />
      <ScreenHeader title="Reviews & replies" subtitle="Avg ★ 4.6 · 218 reviews" />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Pill label="All" active />
          <Pill label="Unreplied · 3" />
          <Pill label="★ 5" />
          <Pill label="★ 1–3" />
        </View>

        <SectionHeader title="Recent" pre="Last 30 days" />
        {FAKE.map((r) => (
          <Card key={r.id} style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <View>
                <Text style={{ fontWeight: '800', fontSize: 14 }}>{r.author}</Text>
                <MiniText>{r.date}</MiniText>
              </View>
              <StarRating rating={r.rating} />
            </View>
            <Text style={{ fontSize: 12, color: colors.inkSec, marginTop: 8, lineHeight: 18 }}>
              {r.body}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {Object.entries(r.aspects).map(([k, v]) => (
                <Pill key={k} label={`${k} ${v}/5`} variant="ghost" />
              ))}
            </View>
            <Divider />
            {r.reply ? (
              <View
                style={{
                  backgroundColor: colors.plum[50],
                  padding: 12,
                  borderRadius: 12,
                  flexDirection: 'row',
                  gap: 8,
                }}
              >
                <Reply size={14} color={colors.plum[700]} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, fontWeight: '800', color: colors.plum[700] }}>
                    Newroad Café · owner
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.inkSec, marginTop: 4, lineHeight: 18 }}>
                    {r.reply}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.line,
                  borderRadius: 12,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <TextInput
                  value={drafts[r.id] ?? ''}
                  onChangeText={(v) => setDrafts((p) => ({ ...p, [r.id]: v }))}
                  placeholder="Write a quick reply…"
                  placeholderTextColor={colors.inkMuted}
                  style={{ flex: 1, fontSize: 13, color: colors.ink }}
                />
                <Pressable
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    backgroundColor: colors.plum[500],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Send size={14} color="#fff" />
                </Pressable>
              </View>
            )}
          </Card>
        ))}
      </ScrollView>

      <BottomNav active="reviews" variant="owner" />
    </View>
  );
}
