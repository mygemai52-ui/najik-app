/**
 * Screen 13 · Write a review
 *
 * Per-aspect ratings (Food / Service / Value / Ambience) instead of a single
 * number — design doc §3 calls this out as a key differentiator. Per-aspect
 * data also feeds the "Authentic food" / "Good value" tag chips on detail
 * pages without us hand-curating them.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MockStatusBar } from '@/components/StatusBar';
import {
  ScreenHeader,
  PrimaryButton,
  StickyCTA,
  Card,
  Pill,
  SectionHeader,
} from '@/components/ui';
import { Star, Camera } from '@/icons/Icon';
import { colors } from '@/theme';

const ASPECTS = ['Food', 'Service', 'Value', 'Ambience'] as const;
const TAGS = [
  'Authentic food',
  'Good value',
  'Cosy',
  'Family-friendly',
  'Fast service',
  'Generous portions',
  'Quiet',
  'Loud',
  'Veg-friendly',
];

export default function WriteReview() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [aspects, setAspects] = useState<Record<string, number>>({
    Food: 5,
    Service: 5,
    Value: 5,
    Ambience: 4,
  });
  const [tags, setTags] = useState<string[]>(['Authentic food', 'Good value']);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      <ScreenHeader
        title="Write a review"
        subtitle="Newroad Café · last night"
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        {/* Overall */}
        <Card style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 13 }}>Overall rating</Text>
          <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable key={n} onPress={() => setRating(n)} hitSlop={6}>
                <Star
                  size={32}
                  color={colors.star}
                  fill={n <= rating ? colors.star : 'transparent'}
                />
              </Pressable>
            ))}
          </View>
          <Text style={{ color: colors.inkMuted, fontSize: 11, marginTop: 6 }}>
            Tap a star to rate
          </Text>
        </Card>

        <SectionHeader title="Per-aspect" pre="The detail" />
        <Card>
          {ASPECTS.map((a) => (
            <View
              key={a}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 6,
              }}
            >
              <Text style={{ fontWeight: '700', fontSize: 13, flex: 1 }}>{a}</Text>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Pressable
                    key={n}
                    hitSlop={4}
                    onPress={() => setAspects((p) => ({ ...p, [a]: n }))}
                  >
                    <Star
                      size={16}
                      color={colors.star}
                      fill={n <= (aspects[a] ?? 0) ? colors.star : 'transparent'}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </Card>

        <SectionHeader title="Tag what stood out" pre="Quick chips" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {TAGS.map((t) => (
            <Pill
              key={t}
              label={t}
              active={tags.includes(t)}
              onPress={() =>
                setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))
              }
            />
          ))}
        </View>

        <SectionHeader title="A few words?" pre="Optional" />
        <View
          style={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: colors.line,
            borderRadius: 14,
            padding: 14,
            minHeight: 100,
          }}
        >
          <Text style={{ color: colors.inkMuted, fontSize: 12 }}>
            "Came on Friday — got a table within 5 mins. Newari thali under Rs. 400,
            hard to beat."
          </Text>
        </View>

        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginTop: 10,
            padding: 12,
            borderRadius: 12,
            backgroundColor: colors.plum[50],
            alignSelf: 'flex-start',
          }}
        >
          <Camera size={14} color={colors.plum[700]} />
          <Text style={{ fontSize: 12, fontWeight: '700', color: colors.plum[700] }}>
            Add photo
          </Text>
        </Pressable>
      </ScrollView>

      <StickyCTA>
        <PrimaryButton label="Post review" onPress={() => router.replace('/(consumer)/bookings')} />
      </StickyCTA>
    </View>
  );
}
