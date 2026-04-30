/**
 * Screen 05 · Map view
 *
 * The handoff says "currently a hand-drawn SVG basemap. Replace with Mapbox GL
 * or Google Maps SDK in production; preserve the pin chip styling." We honour
 * that here — a stylised map placeholder + plum pin chips that show the listing
 * name + price-from. Tapping a chip opens a quick card; tapping the card opens
 * the full detail.
 */
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Line, Rect } from 'react-native-svg';
import { MockStatusBar } from '@/components/StatusBar';
import { BottomNav } from '@/components/BottomNav';
import { Photo } from '@/components/Photo';
import { ScreenHeader, Pill, StarRating, VerifiedBadge } from '@/components/ui';
import { List, Filter } from '@/icons/Icon';
import { colors } from '@/theme';
import { listings } from '@/data/mock';

const MAP_W = 358;
const MAP_H = 480;

export default function Map() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string>(listings[0].id);
  const active = listings.find((l) => l.id === activeId)!;

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      <ScreenHeader
        title="Map view"
        subtitle="Within Rs. 500"
        onBack={() => router.back()}
        right={
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable
              style={iconBtnStyle}
              onPress={() => router.replace('/(consumer)/restaurants')}
            >
              <List size={16} color={colors.ink} />
            </Pressable>
            <Pressable
              style={iconBtnStyle}
              onPress={() => router.push('/(consumer)/filter')}
            >
              <Filter size={16} color={colors.ink} />
            </Pressable>
          </View>
        }
      />

      <View style={{ height: 44 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6, paddingHorizontal: 14, paddingVertical: 6, alignItems: 'center' }}
        >
          {['Rs. 500 budget', 'Walking · 1 km', 'Open now', '★ 4+'].map((l) => (
            <Pill key={l} label={l} active={l === 'Rs. 500 budget'} />
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          marginHorizontal: 14,
          width: MAP_W,
          height: MAP_H,
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: '#E5DCC7',
        }}
      >
        <Svg width={MAP_W} height={MAP_H} viewBox={`0 0 ${MAP_W} ${MAP_H}`}>
          <Rect width={MAP_W} height={MAP_H} fill="#E5DCC7" />
          {/* Roads */}
          <Path
            d={`M0 ${MAP_H * 0.4} Q ${MAP_W * 0.5} ${MAP_H * 0.45}, ${MAP_W} ${MAP_H * 0.3}`}
            stroke="#fff"
            strokeWidth={10}
            fill="none"
          />
          <Path
            d={`M${MAP_W * 0.2} 0 Q ${MAP_W * 0.4} ${MAP_H * 0.5}, ${MAP_W * 0.7} ${MAP_H}`}
            stroke="#fff"
            strokeWidth={10}
            fill="none"
          />
          <Line
            x1={0}
            y1={MAP_H * 0.7}
            x2={MAP_W}
            y2={MAP_H * 0.78}
            stroke="#fff"
            strokeWidth={8}
          />
          {/* Soft park area */}
          <Circle cx={MAP_W * 0.78} cy={MAP_H * 0.68} r={60} fill="#C5D9B0" opacity={0.7} />
          {/* River */}
          <Path
            d={`M0 ${MAP_H * 0.85} Q ${MAP_W * 0.4} ${MAP_H * 0.95}, ${MAP_W} ${MAP_H * 0.82}`}
            stroke="#A9CCEB"
            strokeWidth={14}
            fill="none"
          />
          <Path
            d={`M0 ${MAP_H * 0.85} Q ${MAP_W * 0.4} ${MAP_H * 0.95}, ${MAP_W} ${MAP_H * 0.82}`}
            stroke="#7BB6E0"
            strokeWidth={4}
            fill="none"
          />
        </Svg>
        {listings.map((l) => {
          const x = l.pin.x * MAP_W;
          const y = l.pin.y * MAP_H;
          const isActive = l.id === activeId;
          return (
            <Pressable
              key={l.id}
              onPress={() => setActiveId(l.id)}
              style={{
                position: 'absolute',
                left: x - 50,
                top: y - 18,
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 999,
                backgroundColor: isActive ? colors.plum[500] : '#fff',
                borderWidth: 1,
                borderColor: isActive ? colors.plum[500] : colors.lineStrong,
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 4 },
              }}
            >
              <Text
                style={{
                  color: isActive ? '#fff' : colors.ink,
                  fontSize: 11,
                  fontWeight: '800',
                }}
              >
                Rs. {l.priceFrom}
              </Text>
            </Pressable>
          );
        })}
        {/* Quick card overlay */}
        <Pressable
          onPress={() => router.push(`/(consumer)/listing/${active.id}` as never)}
          style={{
            position: 'absolute',
            left: 12,
            right: 12,
            bottom: 12,
            backgroundColor: '#fff',
            borderRadius: 14,
            padding: 10,
            flexDirection: 'row',
            gap: 10,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
          }}
        >
          <Photo
            variant={active.photo}
            style={{ width: 64, height: 64, borderRadius: 10 }}
          />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontWeight: '800', fontSize: 13, color: colors.ink }}>
                {active.name}
              </Text>
              {active.verified ? <VerifiedBadge /> : null}
            </View>
            <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }}>
              {active.cuisine} · {active.distanceKm} km
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 6,
              }}
            >
              <StarRating rating={active.rating} count={active.reviews} />
              <Text style={{ fontWeight: '800', color: colors.plum[700], fontSize: 12 }}>
                Rs. {active.priceFrom}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>

      <View style={{ flex: 1 }} />
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
