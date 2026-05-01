/**
 * Screen 03 · Home — budget-first discovery
 *
 * Faithful port of the canonical prototype (see najik-handoff/source/screens-data.js
 * `Screen 03` block). Budget-first chip rail, tinted category tiles, warm Tihar
 * promo, "Restaurants near you" rail, "Trending in Thamel" 2-up grid.
 */
import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MockStatusBar } from '@/components/StatusBar';
import { BottomNav } from '@/components/BottomNav';
import { Photo } from '@/components/Photo';
import {
  Search, Mic, Bell, User, Caret, CaretR,
  Fork, Cup, Bed, Cart, Scissors, Wrench, Plane, More,
  Heart, Verify, Star, Trend, Sparkles,
} from '@/icons/Icon';
import { colors } from '@/theme';

const BUDGETS = [200, 500, 1000, 2000];

const CATS = [
  { key: 'restaurants', label: 'Restaurants', Icon: Fork },
  { key: 'cafes',       label: 'Cafés',       Icon: Cup },
  { key: 'hotels',      label: 'Hotels',      Icon: Bed },
  { key: 'groceries',   label: 'Groceries',   Icon: Cart },
  { key: 'salons',      label: 'Salons',      Icon: Scissors },
  { key: 'garages',     label: 'Garages',     Icon: Wrench },
  { key: 'travel',      label: 'Travel',      Icon: Plane },
  { key: 'more',        label: 'More',        Icon: More },
] as const;

type Listing = {
  id: string;
  name: string;
  sub: string;
  rating: number;
  price: string;
  status: string;
  statusTone?: 'default' | 'warn';
  badge?: 'verified' | 'promoted';
  variant: 'warm' | 'cool' | 'green' | 'bed' | 'peach';
  saved?: boolean;
};

const NEAR_YOU: Listing[] = [
  { id: 'r1', name: 'Yangling Tibetan',  sub: 'Tibetan · 0.4 km · Thamel',     rating: 4.6, price: 'Rs. 350/person', status: 'Open · 5 tables free',  badge: 'verified', variant: 'warm',  saved: true },
  { id: 'r2', name: 'Bota Momo Centre',  sub: 'Newari · 0.8 km · Jhamsikhel',  rating: 4.4, price: 'Rs. 280/person', status: 'Open · 3 tables left',  badge: 'promoted', variant: 'cool' },
  { id: 'r3', name: 'Or2k Vegetarian',   sub: 'Veg · Multi-cuisine · 1.1 km',  rating: 4.7, price: 'Rs. 450/person', status: 'Closes in 30 min', statusTone: 'warn', badge: 'verified', variant: 'green' },
];

const TRENDING = [
  { id: 'h1', name: 'Hotel Mulberry', sub: 'Rs. 4,200/night · 4.5★', tag: 'Hot',   variant: 'bed'   as const },
  { id: 's1', name: 'Glow Salon',     sub: 'From Rs. 600 · 4.6★',     tag: 'Hot',   variant: 'peach' as const },
];

export default function Home() {
  const [budget, setBudget] = useState<number | 'none'>(500);
  const [saved, setSaved] = useState<Record<string, boolean>>(
    Object.fromEntries(NEAR_YOU.map((l) => [l.id, !!l.saved]))
  );
  const router = useRouter();

  const listings = useMemo(
    () => (budget === 'none' ? NEAR_YOU : NEAR_YOU.filter((_, i) => i < 3)),
    [budget],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />

      {/* Address bar — Location · नजिकै / Thamel ▾ + bell + avatar */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 6,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: colors.surface,
        }}
      >
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text style={{ fontSize: 9.5, color: colors.inkMuted, fontWeight: '500', letterSpacing: 0.4 }}>
            Location · नजिकै
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '800', color: colors.ink }}>Thamel</Text>
            <Caret size={12} color={colors.plum[500]} />
          </View>
        </View>
        <View style={{ flex: 1 }} />
        <Pressable
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Bell size={14} color={colors.ink} />
          <View
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 7,
              height: 7,
              borderRadius: 3.5,
              backgroundColor: colors.lime[500],
              borderWidth: 1.5,
              borderColor: colors.card,
            }}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push('/(consumer)/profile')}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.plum[500],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <User size={14} color="#fff" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: colors.ink, letterSpacing: -0.3, lineHeight: 26 }}>
            Namaste, <Text style={{ color: colors.plum[700] }}>Sujata</Text> 👋
          </Text>
          <Text style={{ color: colors.inkMuted, fontSize: 12, marginTop: 2 }}>
            आजको <Text style={{ fontWeight: '800', color: colors.plum[700] }}>बजेट</Text>{' '}कति राख्नु हुन्छ?
          </Text>
        </View>

        {/* Search */}
        <View style={{ paddingHorizontal: 14, paddingBottom: 4 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 9,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 12,
              paddingHorizontal: 13,
              paddingVertical: 11,
              shadowColor: '#0F0A1E',
              shadowOpacity: 0.04,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 1,
            }}
          >
            <Search size={14} color={colors.inkMuted} />
            <Text style={{ flex: 1, color: colors.inkMuted, fontSize: 12.5 }}>
              Search restaurants, hotels, salons…
            </Text>
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: colors.plum[50],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mic size={12} color={colors.plum[700]} />
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={{ paddingHorizontal: 14 }}>
          {/* Budget chip rail */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 6, paddingTop: 12, paddingBottom: 4 }}
          >
            <ChipPill active label="Within budget" icon={<Trend size={11} color="#fff" />} />
            {BUDGETS.map((v) => (
              <BudgetChip
                key={v}
                label={`Rs. ${v.toLocaleString()}`}
                selected={budget === v}
                onPress={() => setBudget(v)}
              />
            ))}
            <BudgetChip
              label="No limit"
              selected={budget === 'none'}
              onPress={() => setBudget('none')}
            />
          </ScrollView>

          {/* Categories — 4-col grid */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
              marginTop: 14,
            }}
          >
            {CATS.map(({ key, label, Icon }) => (
              <Pressable
                key={key}
                onPress={() =>
                  key === 'restaurants' || key === 'cafes'
                    ? router.push('/(consumer)/restaurants')
                    : null
                }
                style={{
                  width: '22.6%',
                  borderRadius: 14,
                  paddingTop: 10,
                  paddingBottom: 8,
                  alignItems: 'center',
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.line,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={16} color={colors.plum[700]} />
                </View>
                <Text style={{ fontSize: 10, fontWeight: '600', color: colors.ink, marginTop: 5 }}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Tihar promo card */}
          <View style={{ marginTop: 14, borderRadius: 16, overflow: 'hidden' }}>
            <LinearGradient
              colors={['#FFE9C7', colors.plum[50]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 14, flexDirection: 'row', gap: 12, alignItems: 'center' }}
            >
              {/* lime decoration circle top-right */}
              <View
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -10,
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: colors.lime[500],
                  opacity: 0.3,
                }}
              />
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#0F0A1E',
                  shadowOpacity: 0.06,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 1,
                }}
              >
                <Sparkles size={18} color={colors.warn} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '800',
                    color: colors.warn,
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                  }}
                >
                  Tihar specials
                </Text>
                <Text style={{ fontWeight: '800', fontSize: 14, color: colors.ink, letterSpacing: -0.1 }}>
                  Khaja sets from Rs. 280
                </Text>
                <Text style={{ fontSize: 10, color: colors.inkSec, marginTop: 1 }}>
                  तिहार विशेष · ३० भन्दा बढी रेस्टुरेन्ट
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Restaurants near you */}
          <SectionHd
            title="Restaurants near you"
            onSeeAll={() => router.push('/(consumer)/restaurants')}
          />
          {listings.map((l) => (
            <ListingRow
              key={l.id}
              item={l}
              saved={!!saved[l.id]}
              onToggleSave={() => setSaved((s) => ({ ...s, [l.id]: !s[l.id] }))}
              onPress={() => router.push(`/(consumer)/listing/${l.id}` as never)}
            />
          ))}

          {/* Trending in Thamel */}
          <SectionHd title="Trending in Thamel" onSeeAll={() => {}} style={{ marginTop: 18 }} />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {TRENDING.map((t) => (
              <Pressable
                key={t.id}
                onPress={() => router.push(`/(consumer)/listing/${t.id}` as never)}
                style={{ flex: 1, borderRadius: 14, overflow: 'hidden', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }}
              >
                <Photo variant={t.variant} style={{ aspectRatio: 16 / 11 }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: colors.lime[500],
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ fontSize: 9, fontWeight: '800', color: colors.lime[900] }}>{t.tag}</Text>
                  </View>
                </Photo>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontWeight: '800', fontSize: 12, color: colors.ink }} numberOfLines={1}>
                    {t.name}
                  </Text>
                  <Text style={{ fontSize: 10.5, color: colors.inkMuted, marginTop: 2 }}>{t.sub}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNav active="home" />
    </View>
  );
}

/* --------- subcomponents --------- */

function ChipPill({ label, active, icon }: { label: string; active?: boolean; icon?: React.ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 999,
        backgroundColor: active ? colors.plum[500] : colors.card,
        borderWidth: active ? 0 : 1,
        borderColor: colors.lineStrong,
      }}
    >
      {icon}
      <Text style={{ color: active ? '#fff' : colors.ink, fontWeight: active ? '600' : '500', fontSize: 11 }}>
        {label}
      </Text>
    </View>
  );
}

function BudgetChip({ label, selected, onPress }: { label: string; selected?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 999,
        backgroundColor: selected ? colors.plum[500] : colors.card,
        borderWidth: selected ? 0 : 1,
        borderColor: colors.lineStrong,
      }}
    >
      <Text
        style={{
          color: selected ? '#fff' : colors.ink,
          fontWeight: selected ? '700' : '500',
          fontSize: 11,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function SectionHd({ title, onSeeAll, style }: { title: string; onSeeAll?: () => void; style?: object }) {
  return (
    <View
      style={[
        {
          marginTop: 14,
          marginBottom: 6,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        style,
      ]}
    >
      <Text style={{ fontSize: 14, fontWeight: '800', color: colors.ink, letterSpacing: -0.1 }}>
        {title}
      </Text>
      {onSeeAll ? (
        <Pressable onPress={onSeeAll} style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <Text style={{ fontSize: 11.5, color: colors.plum[700], fontWeight: '700' }}>See all</Text>
          <CaretR size={10} color={colors.plum[700]} />
        </Pressable>
      ) : null}
    </View>
  );
}

function ListingRow({
  item,
  saved,
  onToggleSave,
  onPress,
}: {
  item: Listing;
  saved: boolean;
  onToggleSave: () => void;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: colors.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.line,
        overflow: 'hidden',
      }}
    >
      <Photo variant={item.variant} style={{ width: 80, height: 80 }} />
      <View style={{ flex: 1, paddingHorizontal: 11, paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Text style={{ fontWeight: '800', fontSize: 13, color: colors.ink }} numberOfLines={1}>
              {item.name}
            </Text>
            {item.badge === 'verified' ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.plum[500], paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}>
                <Verify size={10} color="#fff" />
                <Text style={{ fontSize: 9, fontWeight: '800', color: '#fff' }}>Verified</Text>
              </View>
            ) : null}
            {item.badge === 'promoted' ? (
              <View style={{ backgroundColor: colors.lime[500], paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}>
                <Text style={{ fontSize: 9, fontWeight: '800', color: colors.lime[900] }}>Promoted</Text>
              </View>
            ) : null}
          </View>
          <Pressable onPress={onToggleSave} hitSlop={6}>
            {saved ? <Heart size={14} color={colors.plum[500]} fill={colors.plum[500]} /> : <Heart size={14} color={colors.inkMuted} />}
          </Pressable>
        </View>
        <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }} numberOfLines={1}>
          {item.sub}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Star size={11} color={colors.plum[700]} />
            <Text style={{ fontSize: 11, fontWeight: '800', color: colors.ink }}>{item.rating}</Text>
          </View>
          <Text style={{ fontSize: 11, fontWeight: '700', color: colors.ink }}>{item.price}</Text>
          <Text style={{ fontSize: 10.5, fontWeight: '700', color: item.statusTone === 'warn' ? colors.warn : colors.ok }}>
            {item.status}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
