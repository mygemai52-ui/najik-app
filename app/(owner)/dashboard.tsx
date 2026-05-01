/**
 * Screen 21 · Owner dashboard.
 *
 * Today's number-one number is the same the owner cares about: bookings.
 * Everything else (views, conversion, revenue) is secondary. The Bookings
 * inbox CTA is the largest tap target on the page.
 */
import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { OwnerBar } from '@/components/OwnerBar';
import { BottomNav } from '@/components/BottomNav';
import { ScreenHeader, Card, SectionHeader, MiniText } from '@/components/ui';
import {
  Inbox,
  ChartBar,
  Tag,
  Edit,
  Reply,
  CaretR,
  Sparkles,
  Verify,
} from '@/icons/Icon';
import { colors } from '@/theme';
import { ownerBookings } from '@/data/mock';

export default function Dashboard() {
  const router = useRouter();
  const pending = ownerBookings.filter((b) => b.status === 'pending').length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OwnerBar flow="Dashboard" />
      <ScreenHeader title="Newroad Café" subtitle="Owner · You" />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 24 }}>
        {/* Verified card */}
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: colors.plum[500],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Verify size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '800', fontSize: 14 }}>You're verified · live</Text>
              <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }}>
                Your listing is showing in search · last edited yesterday
              </Text>
            </View>
          </View>
        </Card>

        {/* Today */}
        <SectionHeader title="Today" pre="Snapshot" />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <KPI label="Bookings" value="12" sub="+3 from yesterday" highlight />
          <KPI label="Views" value="284" sub="+18%" />
          <KPI label="Earnings" value="Rs. 4,820" sub="—" />
        </View>

        {/* Quick actions */}
        <SectionHeader title="Quick actions" pre="Manage" />
        <View style={{ gap: 8 }}>
          <Action
            icon={<Inbox size={18} color={colors.plum[700]} />}
            title="Bookings inbox"
            sub={`${pending} pending · 2 confirmed today`}
            onPress={() => router.push('/(owner)/inbox')}
            badge={pending > 0 ? `${pending} new` : undefined}
          />
          <Action
            icon={<Edit size={18} color={colors.plum[700]} />}
            title="Edit listing"
            sub="Hours, photos, menu, prices"
            onPress={() => router.push('/(owner)/edit-listing')}
          />
          <Action
            icon={<Reply size={18} color={colors.plum[700]} />}
            title="Reviews & replies"
            sub="3 unreplied · avg ★ 4.6"
            onPress={() => router.push('/(owner)/reviews')}
          />
          <Action
            icon={<Tag size={18} color={colors.plum[700]} />}
            title="Run a promo"
            sub="Boost views · Tihar special"
          />
        </View>

        {/* Insights stub */}
        <SectionHeader title="Insights" pre="This week" />
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: '800', fontSize: 13 }}>Search → views</Text>
            <Text style={{ color: colors.ok, fontWeight: '700', fontSize: 12 }}>+12%</Text>
          </View>
          <MiniText style={{ marginTop: 4 }}>
            Most customers found you via "Newari restaurants near Newroad".
          </MiniText>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'flex-end',
              height: 60,
              gap: 6,
            }}
          >
            {[40, 55, 38, 70, 60, 75, 90].map((h, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: h,
                  borderRadius: 4,
                  backgroundColor: i === 6 ? colors.plum[500] : colors.plum[100],
                }}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4,
            }}
          >
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <Text key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: colors.inkMuted }}>
                {d}
              </Text>
            ))}
          </View>
        </Card>
      </ScrollView>

      <BottomNav active="home" variant="owner" />
    </View>
  );
}

function KPI({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: highlight ? colors.plum[500] : '#fff',
        borderRadius: 14,
        padding: 12,
        borderWidth: highlight ? 0 : 1,
        borderColor: colors.line,
      }}
    >
      <Text
        style={{
          fontSize: 10,
          fontWeight: '800',
          color: highlight ? 'rgba(255,255,255,0.7)' : colors.inkMuted,
          textTransform: 'uppercase',
          letterSpacing: 1.2,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontWeight: '800',
          fontSize: 22,
          color: highlight ? '#fff' : colors.ink,
          marginTop: 4,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontSize: 10,
          color: highlight ? colors.lime[500] : colors.inkMuted,
          marginTop: 2,
        }}
      >
        {sub}
      </Text>
    </View>
  );
}

function Action({
  icon,
  title,
  sub,
  onPress,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  onPress?: () => void;
  badge?: string;
}) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: colors.plum[50],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={{ fontWeight: '800', fontSize: 14 }}>{title}</Text>
              {badge ? (
                <View
                  style={{
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 999,
                    backgroundColor: colors.err,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>
                    {badge}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }}>{sub}</Text>
          </View>
          <CaretR size={14} color={colors.inkMuted} />
        </View>
      </Card>
    </Pressable>
  );
}
