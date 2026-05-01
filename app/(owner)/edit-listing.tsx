/**
 * Screen 24 · Owner · Edit listing.
 *
 * The same fields as the 4-step wizard, condensed into a single editable view
 * for the live listing. Edits to "Pause listing" toggle hide the place from
 * search without deleting state.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { OwnerBar } from '@/components/OwnerBar';
import { BottomNav } from '@/components/BottomNav';
import {
  ScreenHeader,
  Card,
  PrimaryButton,
  StickyCTA,
  SectionHeader,
  Divider,
  Pill,
} from '@/components/ui';
import { Camera, Edit, Pin, Clock, Tag, Verify, Image, CaretR } from '@/icons/Icon';
import { colors } from '@/theme';

export default function EditListing() {
  const router = useRouter();
  const [paused, setPaused] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OwnerBar flow="Edit listing" />
      <ScreenHeader title="Edit listing" subtitle="Newroad Café" />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontWeight: '800', fontSize: 14 }}>Pause listing</Text>
              <Text style={{ color: colors.inkMuted, fontSize: 11, marginTop: 2 }}>
                Hide from search & block new bookings.
              </Text>
            </View>
            <Switch
              value={paused}
              onValueChange={setPaused}
              trackColor={{ true: colors.plum[500], false: colors.line }}
              thumbColor="#fff"
            />
          </View>
        </Card>

        <SectionHeader title="Sections" pre="Edit anything" />
        <Card padded={false}>
          <Section icon={<Edit size={16} color={colors.plum[700]} />} title="Basics" sub="Name, category, location" />
          <Section icon={<Clock size={16} color={colors.plum[700]} />} title="Hours" sub="Mon–Sun · 10:00 AM – 10:00 PM" />
          <Section icon={<Image size={16} color={colors.plum[700]} />} title="Photos" sub="6 photos · cover set" />
          <Section icon={<Tag size={16} color={colors.plum[700]} />} title="Menu / services" sub="14 items · From Rs. 40" />
          <Section icon={<Pin size={16} color={colors.plum[700]} />} title="Map pin" sub="Newroad, Kathmandu" last />
        </Card>

        <SectionHeader title="Verification" pre="Trust" />
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
              <Text style={{ fontWeight: '800', fontSize: 14 }}>Verified · PAN</Text>
              <Text style={{ color: colors.inkMuted, fontSize: 11, marginTop: 2 }}>
                Last reviewed · 6 weeks ago
              </Text>
            </View>
            <Pill label="Active" variant="ok" />
          </View>
        </Card>

        <SectionHeader title="Promo" pre="Get more bookings" />
        <Pressable
          style={{
            padding: 14,
            borderRadius: 16,
            backgroundColor: colors.plum[700],
            borderWidth: 1,
            borderColor: colors.lime[500],
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: colors.lime[500],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Tag size={18} color={colors.lime[900]} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '800', fontSize: 14, color: '#fff' }}>
              Run a Tihar promo
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 }}>
              Auto-apply 15% off · pay only on bookings
            </Text>
          </View>
          <CaretR size={14} color={colors.lime[500]} />
        </Pressable>
      </ScrollView>

      <StickyCTA>
        <PrimaryButton label="Save changes" onPress={() => router.back()} />
      </StickyCTA>
    </View>
  );
}

function Section({
  icon,
  title,
  sub,
  last,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  last?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.line,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: colors.plum[50],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', fontSize: 13 }}>{title}</Text>
        <Text style={{ color: colors.inkMuted, fontSize: 11, marginTop: 2 }}>{sub}</Text>
      </View>
      <CaretR size={14} color={colors.inkMuted} />
    </View>
  );
}
