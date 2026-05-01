/**
 * Screen 03 · Home — budget-first discovery
 *
 * Budget chip first, category tiles second, list third — every other competitor
 * leads with category. Najik does not. The Tihar / festive promo card is the
 * one place where the lime accent pairs with a warm gradient (one of the five
 * lime surfaces).
 */
import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { MockStatusBar } from '@/components/StatusBar';
import { BottomNav } from '@/components/BottomNav';
import { Photo } from '@/components/Photo';
import {
  Pill,
  Card as UICard,
  SectionHeader,
  StarRating,
  VerifiedBadge,
  PromotedBadge,
  MiniText,
} from '@/components/ui';
import {
  Search, Mic, Pin, Bell, Fork, Cup, Bed, Cart, Scissors, Wrench, Plane, More,
  Heart, Sparkles,
} from '@/icons/Icon';
import { colors } from '@/theme';
import { categories, listings } from '@/data/mock';

const BUDGETS = [
  { value: 200,  label: 'Rs. 200' },
  { value: 500,  label: 'Rs. 500' },
  { value: 1000, label: 'Rs. 1,000' },
  { value: 1500, label: 'Rs. 1,500' },
  { value: 3000, label: 'Rs. 3,000' },
];

const CAT_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  restaurants: Fork, cafes: Cup, hotels: Bed, groceries: Cart,
  salons: Scissors, garages: Wrench, travel: Plane, more: More,
};

export default function Home() {
  const [budget, setBudget] = useState<number>(500);
  const router = useRouter();

  const personalised = useMemo(
    () => listings.filter((l) => l.priceFrom <= budget).slice(0, 4),
    [budget],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      {/* Address bar */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 4,
          paddingBottom: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              backgroundColor: colors.plum[500],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Pin size={14} color={colors.lime[500]} />
          </View>
          <View>
            <Text style={{ fontSize: 10, color: colors.inkMuted, fontWeight: '600' }}>
              Deliver / browse near
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: colors.ink }}>
              Newroad, Kathmandu ▾
            </Text>
          </View>
        </View>
        <Pressable
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: colors.line,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bell size={16} color={colors.ink} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={{ paddingHorizontal: 16, paddingTop: 4 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: colors.ink, letterSpacing: -0.3 }}>
            Namaste, <Text style={{ color: colors.plum[700] }}>Sujata</Text> 👋
          </Text>
          <Text style={{ color: colors.inkMuted, fontSize: 13, marginTop: 2 }}>
            आजको <Text style={{ fontWeight: '800', color: colors.ink }}>बजेट</Text>{' '}
            कति राख्नु हुन्छ?
          </Text>
        </View>

        {/* Search */}
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 14,
              paddingHorizontal: 12,
              paddingVertical: 10,
              shadowColor: '#0F0A1E',
              shadowOpacity: 0.04,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            <Search size={14} color={colors.inkMuted} />
            <Text style={{ flex: 1, color: colors.inkMuted, fontSize: 13 }}>
              Search restaurants, hotels, salons…
            </Text>
            <Mic size={14} color={colors.plum[500]} />
          </View>
        </View>

        {/* Budget chips — the brand promise */}
        <View style={{ paddingHorizontal: 16, marginTop: 14 }}>
          <Text
            style={{
              color: colors.lime[700],
              fontSize: 10,
              fontWeight: '800',
              letterSpacing: 1.4,
              textTransform: 'uppercase',
            }}
          >
            Set your budget
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 6, paddingVertical: 8 }}
          >
            {BUDGETS.map((b) => (
              <Pill
                key={b.value}
                label={b.label}
                active={budget === b.value}
                onPress={() => setBudget(b.value)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Category grid */}
        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {categories.map((c) => {
              const Icon = CAT_ICONS[c.key] ?? More;
              return (
                <Pressable
                  key={c.key}
                  onPress={() =>
                    c.key === 'restaurants' || c.key === 'cafes'
                      ? router.push('/(consumer)/restaurants')
                      : null
                  }
                  style={{
                    width: '22.5%',
                    aspectRatio: 1,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: colors.line,
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      backgroundColor: colors.plum[50],
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={16} color={colors.plum[500]} />
                  </View>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: colors.ink }}>
                    {c.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Festive / promoted card */}
        <View style={{ paddingHorizontal: 16 }}>
          <Pressable
            style={{
              marginTop: 18,
              borderRadius: 16,
              padding: 14,
              backgroundColor: colors.plum[700],
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: colors.lime[500],
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: colors.lime[500],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={20} color={colors.lime[900]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff', fontSize: 13, fontWeight: '800' }}>
                Tihar specials · दीपावली
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2 }}>
                Hand-picked sets up to 30% off · this week only
              </Text>
            </View>
            <Text style={{ color: colors.lime[500], fontSize: 11, fontWeight: '800' }}>
              Open ›
            </Text>
          </Pressable>
        </View>

        {/* Personalised rail — Near you within budget */}
        <View style={{ paddingHorizontal: 16 }}>
          <SectionHeader
            pre="Near you · within Rs. " 
            title={`${budget.toLocaleString()} budget`}
            action="See all"
            onAction={() => router.push('/(consumer)/restaurants')}
          />
          <View style={{ gap: 10 }}>
            {personalised.map((l) => (
              <Link key={l.id} href={`/(consumer)/listing/${l.id}` as never} asChild>
                <Pressable>
                  <UICard padded={false}>
                    <View style={{ flexDirection: 'row' }}>
                      <Photo
                        variant={l.photo}
                        style={{
                          width: 96,
                          height: 96,
                          borderTopLeftRadius: 16,
                          borderBottomLeftRadius: 16,
                          padding: 8,
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
                          <Text style={{ fontSize: 13, fontWeight: '800', color: colors.ink }}>
                            {l.name}
                          </Text>
                          {l.verified ? <VerifiedBadge /> : null}
                        </View>
                        <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }}>
                          {l.cuisine} · {l.area}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            marginTop: 6,
                          }}
                        >
                          <StarRating rating={l.rating} count={l.reviews} />
                          <Text
                            style={{
                              color: colors.ok,
                              fontWeight: '700',
                              fontSize: 11,
                            }}
                          >
                            {l.status}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 6,
                          }}
                        >
                          <Text style={{ fontSize: 11, color: colors.inkMuted }}>
                            {l.distanceKm} km
                          </Text>
                          <Text style={{ fontWeight: '800', color: colors.ink }}>
                            from <Text style={{ color: colors.plum[700] }}>Rs. {l.priceFrom}</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </UICard>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <SectionHeader pre="Just opened" title="New on Najik" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {listings.slice(0, 5).map((l) => (
              <Pressable
                key={l.id}
                onPress={() => router.push(`/(consumer)/listing/${l.id}` as never)}
                style={{ width: 160 }}
              >
                <Photo
                  variant={l.photo}
                  style={{
                    width: 160,
                    height: 96,
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                  }}
                />
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderBottomLeftRadius: 14,
                    borderBottomRightRadius: 14,
                    padding: 10,
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderColor: colors.line,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '800', color: colors.ink }}>
                    {l.name}
                  </Text>
                  <MiniText>{l.area}</MiniText>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 4,
                    }}
                  >
                    <StarRating rating={l.rating} size={11} />
                    <Text style={{ fontSize: 11, fontWeight: '700' }}>
                      Rs. {l.priceFrom}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomNav active="home" />
    </View>
  );
}
