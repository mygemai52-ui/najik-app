/**
 * Screens 07 / 08 / 09 — Detail templates (one route, three layouts).
 *
 * The handoff defines three detail-page templates, one per booking pattern:
 *   • Restaurant → Reserve table (party-size + slot picker)
 *   • Hotel      → Book a room   (date range + room type + guests)
 *   • Service    → Book service  (service list with prices + slot picker)
 *
 * We dispatch on `listing.category` so that adding a fourth pattern (e.g.
 * garage, gym) is a small additional case without rewriting the page.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MockStatusBar } from '@/components/StatusBar';
import { Photo } from '@/components/Photo';
import {
  ScreenHeader,
  Pill,
  StarRating,
  VerifiedBadge,
  PromotedBadge,
  Card,
  StickyCTA,
  PrimaryButton,
  SectionHeader,
  Divider,
  MiniText,
} from '@/components/ui';
import {
  Heart,
  Share,
  Phone,
  Pin,
  Clock,
  Calendar,
  Plus,
  Minus,
  Check,
} from '@/icons/Icon';
import { colors } from '@/theme';
import { listings, services, rooms, reviews, REVIEW_ASPECT_LABELS, type ReviewAspect } from '@/data/mock';

export default function Listing() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Listing not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Photo
          variant={listing.photo}
          style={{ height: 220, paddingTop: 12, paddingHorizontal: 14 }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Pressable
              onPress={() => router.back()}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: 'rgba(255,255,255,0.18)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 18 }}>‹</Text>
            </Pressable>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Share size={16} color="#fff" />
              </Pressable>
              <Pressable
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Heart size={16} color="#fff" />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 12,
              left: 60,
              flexDirection: 'row',
              gap: 6,
            }}
          >
            {listing.promoted ? <PromotedBadge /> : null}
          </View>
        </Photo>

        <View style={{ paddingHorizontal: 14, paddingTop: 14 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: colors.ink }}>
                {listing.name}
              </Text>
              <Text style={{ color: colors.inkMuted, fontSize: 12, marginTop: 2 }}>
                {listing.cuisine}
              </Text>
            </View>
            {listing.verified ? <VerifiedBadge /> : null}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              marginTop: 8,
              flexWrap: 'wrap',
            }}
          >
            <StarRating rating={listing.rating} count={listing.reviews} />
            <Text style={{ fontSize: 11, color: colors.ok, fontWeight: '700' }}>
              {listing.status}
            </Text>
            <Text style={{ fontSize: 11, color: colors.inkMuted }}>
              {listing.distanceKm} km · {listing.area}
            </Text>
          </View>

          {/* Action row */}
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
            <ActionMini icon={<Phone size={14} color={colors.plum[700]} />} label="Call" />
            <ActionMini icon={<Pin size={14} color={colors.plum[700]} />} label="Directions" />
            <ActionMini icon={<Clock size={14} color={colors.plum[700]} />} label="Hours" />
            <ActionMini
              icon={<Share size={14} color={colors.plum[700]} />}
              label="Share"
            />
          </View>

          {/* Tags */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            {listing.tags.map((t) => (
              <Pill key={t} label={t} variant="ghost" />
            ))}
          </View>

          {/* Payments */}
          <SectionHeader title="Accepts" pre="Payments" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {listing.payments.map((p) => (
              <Pill key={p} label={p} variant="ghost" />
            ))}
          </View>

          {/* Booking pane */}
          {listing.category === 'restaurants' || listing.category === 'cafes' ? (
            <RestaurantPane />
          ) : listing.category === 'hotels' ? (
            <HotelPane id={listing.id} />
          ) : (
            <ServicePane id={listing.id} />
          )}

          {/* Reviews */}
          <SectionHeader title="Recent reviews" pre="Trust" action="See all" />
          {(reviews[listing.id] ?? reviews['r1']).map((r) => (
            <Card key={r.id} style={{ marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: '800', fontSize: 13 }}>{r.author}</Text>
                <StarRating rating={r.rating} size={12} />
              </View>
              <Text style={{ fontSize: 12, color: colors.inkSec, marginTop: 6 }}>
                {r.body}
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {Object.entries(r.aspects).map(([k, v]) => (
                  <View
                    key={k}
                    style={{
                      flexDirection: 'row',
                      gap: 4,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 6,
                      backgroundColor: colors.plum[50],
                    }}
                  >
                    <Text style={{ fontSize: 10, color: colors.plum[700], fontWeight: '700' }}>
                      {REVIEW_ASPECT_LABELS[k as ReviewAspect] ?? k}
                    </Text>
                    <Text style={{ fontSize: 10, color: colors.plum[700] }}>{v}/5</Text>
                  </View>
                ))}
              </View>
              <MiniText style={{ marginTop: 6 }}>{r.date}</MiniText>
            </Card>
          ))}
        </View>
      </ScrollView>

      <StickyCTA>
        <PrimaryButton
          label={
            listing.category === 'hotels'
              ? `Book a room · from Rs. ${listing.priceFrom}`
              : listing.category === 'salons'
              ? `Book appointment · from Rs. ${listing.priceFrom}`
              : `Reserve a table · from Rs. ${listing.priceFrom}`
          }
          onPress={() =>
            router.push(`/(consumer)/checkout?listing=${listing.id}` as never)
          }
        />
      </StickyCTA>
    </View>
  );
}

function ActionMini({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: colors.plum[50],
        borderRadius: 12,
        gap: 4,
      }}
    >
      {icon}
      <Text style={{ fontSize: 10, fontWeight: '700', color: colors.plum[700] }}>
        {label}
      </Text>
    </View>
  );
}

function Counter({
  value,
  setValue,
  min = 1,
  max = 8,
}: {
  value: number;
  setValue: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.lineStrong,
        padding: 4,
        gap: 8,
      }}
    >
      <Pressable
        onPress={() => setValue(Math.max(min, value - 1))}
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: colors.plum[50],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Minus size={12} color={colors.plum[700]} />
      </Pressable>
      <Text style={{ fontWeight: '800', minWidth: 18, textAlign: 'center' }}>
        {value}
      </Text>
      <Pressable
        onPress={() => setValue(Math.min(max, value + 1))}
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: colors.plum[500],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Plus size={12} color="#fff" />
      </Pressable>
    </View>
  );
}

function RestaurantPane() {
  const [party, setParty] = useState(4);
  const [slot, setSlot] = useState('7:30 PM');
  return (
    <>
      <SectionHeader title="Reserve a table" pre="Booking" />
      <Card>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '700', fontSize: 13 }}>Party size</Text>
          <Counter value={party} setValue={setParty} />
        </View>
        <Divider />
        <Text style={{ fontWeight: '700', fontSize: 13, marginBottom: 6 }}>
          Tonight · pick a time
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {['6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00'].map((t) => {
            const label = `${t} PM`;
            const active = slot === label;
            return (
              <Pill
                key={t}
                label={label}
                active={active}
                onPress={() => setSlot(label)}
              />
            );
          })}
        </View>
      </Card>
    </>
  );
}

function HotelPane({ id }: { id: string }) {
  const [adults, setAdults] = useState(2);
  const [room, setRoom] = useState((rooms[id] ?? rooms['h1'])[0].id);
  const list = rooms[id] ?? rooms['h1'];
  return (
    <>
      <SectionHeader title="Book a room" pre="Booking" />
      <Card>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 12,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 10, color: colors.inkMuted, fontWeight: '700' }}>
              CHECK-IN
            </Text>
            <Text style={{ fontWeight: '800', marginTop: 2 }}>9 May · 2 PM</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 12,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 10, color: colors.inkMuted, fontWeight: '700' }}>
              CHECK-OUT
            </Text>
            <Text style={{ fontWeight: '800', marginTop: 2 }}>11 May · 11 AM</Text>
          </View>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '700', fontSize: 13 }}>Adults</Text>
          <Counter value={adults} setValue={setAdults} max={6} />
        </View>
      </Card>
      <SectionHeader title="Room types" pre="Pick one" />
      <View style={{ gap: 8 }}>
        {list.map((r) => {
          const active = r.id === room;
          return (
            <Pressable
              key={r.id}
              onPress={() => setRoom(r.id)}
              style={{
                borderWidth: 2,
                borderColor: active ? colors.plum[500] : colors.line,
                backgroundColor: active ? colors.plum[50] : '#fff',
                borderRadius: 14,
                padding: 12,
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '800', fontSize: 14 }}>{r.name}</Text>
                <Text style={{ color: colors.inkMuted, fontSize: 11, marginTop: 2 }}>
                  {r.bed} · sleeps {r.guests}
                  {r.refundable ? ' · free cancellation' : ''}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: colors.plum[700], fontWeight: '800' }}>
                  Rs. {r.pricePerNight.toLocaleString()}
                </Text>
                <Text style={{ fontSize: 10, color: colors.inkMuted }}>/night</Text>
              </View>
              {active ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
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
    </>
  );
}

function ServicePane({ id }: { id: string }) {
  const list = services[id] ?? services['s1'];
  const [selected, setSelected] = useState<string[]>([list[0].id]);
  const [slot, setSlot] = useState('11:00 AM');
  const toggle = (s: string) =>
    setSelected((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  return (
    <>
      <SectionHeader title="Book appointment" pre="Booking" />
      <Card>
        <Text style={{ fontWeight: '700', fontSize: 13, marginBottom: 8 }}>
          Pick services
        </Text>
        {list.map((s) => {
          const active = selected.includes(s.id);
          return (
            <Pressable
              key={s.id}
              onPress={() => toggle(s.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: colors.line,
              }}
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  borderWidth: 2,
                  borderColor: active ? colors.plum[500] : colors.lineStrong,
                  backgroundColor: active ? colors.plum[500] : '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {active ? <Check size={12} color="#fff" /> : null}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', fontSize: 13 }}>{s.name}</Text>
                <Text style={{ color: colors.inkMuted, fontSize: 11 }}>{s.duration}</Text>
              </View>
              <Text style={{ fontWeight: '800', color: colors.plum[700] }}>
                Rs. {s.price}
              </Text>
            </Pressable>
          );
        })}
        <Divider />
        <Text style={{ fontWeight: '700', fontSize: 13, marginBottom: 6 }}>
          Tomorrow · pick a slot
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {['10:00 AM', '11:00 AM', '12:30 PM', '2:00 PM', '4:00 PM'].map((t) => (
            <Pill key={t} label={t} active={slot === t} onPress={() => setSlot(t)} />
          ))}
        </View>
      </Card>
    </>
  );
}
