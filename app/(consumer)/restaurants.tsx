/**
 * Screen 04 · Restaurants — list view
 *
 * Sticky budget pill across the top — you can never lose the constraint that
 * defines this app. Sort + Filter + Map are first-class actions, not buried in
 * a meatball menu. Each card surfaces "Tables free / 3 tables left / Closes in
 * 30 min" so the user can answer "can I walk in now?" without tapping in.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { MockStatusBar } from '@/components/StatusBar';
import { BottomNav } from '@/components/BottomNav';
import { Photo } from '@/components/Photo';
import {
  ScreenHeader,
  Pill,
  Card as UICard,
  StarRating,
  PromotedBadge,
  VerifiedBadge,
} from '@/components/ui';
import { Filter, MapIcon, Heart, Caret } from '@/icons/Icon';
import { colors } from '@/theme';
import { listings } from '@/data/mock';

const FILTER_CHIPS = [
  { key: 'budget',  label: 'Rs. 500 budget', plum: true },
  { key: 'walk',    label: 'Walking · 1 km' },
  { key: 'open',    label: 'Open now' },
  { key: 'rating',  label: '★ 4+' },
  { key: 'veg',     label: 'Veg' },
  { key: 'newari',  label: 'Newari' },
  { key: 'tibetan', label: 'Tibetan' },
];

export default function Restaurants() {
  const [active, setActive] = useState('budget');
  const router = useRouter();

  const food = listings.filter(
    (l) => l.category === 'restaurants' || l.category === 'cafes',
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      <ScreenHeader
        title="Restaurants"
        subtitle="24 within Rs. 500 · Thamel"
        onBack={() => router.back()}
        right={
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable
              onPress={() => router.push('/(consumer)/map')}
              style={iconBtnStyle}
            >
              <MapIcon size={16} color={colors.ink} />
            </Pressable>
            <Pressable
              onPress={() => router.push('/(consumer)/filter')}
              style={iconBtnStyle}
            >
              <Filter size={16} color={colors.ink} />
            </Pressable>
          </View>
        }
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 6, paddingHorizontal: 14, paddingVertical: 8 }}
      >
        {FILTER_CHIPS.map((c) => (
          <Pill
            key={c.key}
            label={c.label}
            active={active === c.key}
            onPress={() => setActive(c.key)}
          />
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 14,
          paddingBottom: 8,
        }}
      >
        <Text style={{ fontSize: 11, color: colors.inkMuted }}>
          Showing {food.length} of 86 — sorted by{' '}
          <Text style={{ color: colors.ink, fontWeight: '700' }}>Best match</Text>
        </Text>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text style={{ fontSize: 11, color: colors.plum[700], fontWeight: '700' }}>
            Sort
          </Text>
          <Caret size={12} color={colors.plum[700]} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 14, paddingTop: 0, paddingBottom: 24, gap: 10 }}
      >
        {food.map((l) => (
          <Link key={l.id} href={`/(consumer)/listing/${l.id}` as never} asChild>
            <Pressable>
              <UICard padded={false}>
                <View style={{ flexDirection: 'row' }}>
                  <Photo
                    variant={l.photo}
                    style={{
                      width: 110,
                      height: 110,
                      borderTopLeftRadius: 16,
                      borderBottomLeftRadius: 16,
                    }}
                  >
                    <View
                      style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        flexDirection: 'row',
                        gap: 4,
                      }}
                    >
                      {l.promoted ? <PromotedBadge /> : null}
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Heart size={13} color="#fff" />
                    </View>
                  </Photo>
                  <View style={{ flex: 1, padding: 10 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={{ fontSize: 14, fontWeight: '800', color: colors.ink }}>
                        {l.name}
                      </Text>
                      {l.verified ? <VerifiedBadge /> : null}
                    </View>
                    <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }}>
                      {l.cuisine} · {l.distanceKm} km
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 4,
                        marginTop: 6,
                      }}
                    >
                      {l.tags.slice(0, 2).map((t) => (
                        <View
                          key={t}
                          style={{
                            paddingVertical: 2,
                            paddingHorizontal: 6,
                            borderRadius: 6,
                            backgroundColor: colors.line,
                          }}
                        >
                          <Text style={{ fontSize: 10, fontWeight: '700', color: colors.inkSec }}>
                            {t}
                          </Text>
                        </View>
                      ))}
                      <View
                        style={{
                          paddingVertical: 2,
                          paddingHorizontal: 6,
                          borderRadius: 6,
                          backgroundColor:
                            l.status.includes('Closes') ? '#FECACA' :
                              l.status.includes('left') ? '#FFE9C7' : '#DCFCE7',
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: '700',
                            color: l.status.includes('Closes')
                              ? colors.err
                              : l.status.includes('left')
                              ? colors.warn
                              : colors.ok,
                          }}
                        >
                          {l.status}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 8,
                      }}
                    >
                      <StarRating rating={l.rating} count={l.reviews} />
                      <Text style={{ fontSize: 12 }}>
                        <Text style={{ color: colors.inkMuted }}>From </Text>
                        <Text style={{ color: colors.plum[700], fontWeight: '800' }}>
                          Rs. {l.priceFrom}
                        </Text>
                        <Text style={{ color: colors.inkMuted, fontSize: 10 }}> /person</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </UICard>
            </Pressable>
          </Link>
        ))}
      </ScrollView>

      <BottomNav active="explore" />
    </View>
  );
}

const iconBtnStyle = {
  width: 36,
  height: 36,
  borderRadius: 12,
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: colors.line,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};
