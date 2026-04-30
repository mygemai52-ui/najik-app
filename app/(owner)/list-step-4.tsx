/**
 * Screen 19 · Listing · Step 4 of 4 — Verify.
 *
 * Owner uploads PAN/VAT or Citizenship for the Verified badge — the #1 trust
 * signal per the design doc. Without verification a listing is still publishable
 * but doesn't get the plum mark.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { OwnerBar } from '@/components/OwnerBar';
import { StepHeader } from '@/components/StepHeader';
import {
  ScreenHeader,
  PrimaryButton,
  StickyCTA,
  SectionHeader,
  Card,
} from '@/components/ui';
import { Verify, Camera, Check, Plus } from '@/icons/Icon';
import { colors } from '@/theme';

type DocType = 'pan' | 'vat' | 'citizenship';

export default function ListStep4() {
  const router = useRouter();
  const [type, setType] = useState<DocType>('pan');
  const [agreed, setAgreed] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OwnerBar flow="List your business" />
      <ScreenHeader title="Verify" subtitle="Get the Verified badge" onBack={() => router.back()} />
      <StepHeader step={4} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: colors.plum[500],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Verify size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '800', fontSize: 14 }}>Why verify?</Text>
              <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }}>
                Verified listings get up to 3× more views & higher conversion.
              </Text>
            </View>
          </View>
        </Card>

        <SectionHeader title="Document type" pre="Pick one" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {(['pan', 'vat', 'citizenship'] as DocType[]).map((t) => (
            <Pressable
              key={t}
              onPress={() => setType(t)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 999,
                backgroundColor: t === type ? colors.plum[500] : '#fff',
                borderWidth: 1,
                borderColor: t === type ? colors.plum[500] : colors.lineStrong,
              }}
            >
              <Text
                style={{
                  color: t === type ? '#fff' : colors.ink,
                  fontWeight: '700',
                  fontSize: 12,
                  textTransform: 'uppercase',
                }}
              >
                {t === 'pan' ? 'PAN' : t === 'vat' ? 'VAT' : 'Citizenship'}
              </Text>
            </Pressable>
          ))}
        </View>

        <SectionHeader title="Upload" pre="Photo or PDF" />
        <View
          style={{
            height: 160,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: colors.line,
            borderStyle: 'dashed',
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Camera size={24} color={colors.plum[500]} />
          <Text style={{ fontWeight: '800', fontSize: 13 }}>Take a photo</Text>
          <Text style={{ fontSize: 11, color: colors.inkMuted }}>
            or upload from your gallery
          </Text>
        </View>

        <Pressable
          onPress={() => setAgreed(!agreed)}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 10,
            marginTop: 14,
            padding: 12,
            backgroundColor: agreed ? colors.plum[50] : '#fff',
            borderWidth: 1,
            borderColor: agreed ? colors.plum[500] : colors.line,
            borderRadius: 12,
          }}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              borderWidth: 2,
              borderColor: agreed ? colors.plum[500] : colors.lineStrong,
              backgroundColor: agreed ? colors.plum[500] : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {agreed ? <Check size={12} color="#fff" /> : null}
          </View>
          <Text style={{ flex: 1, fontSize: 12, color: colors.inkSec, lineHeight: 18 }}>
            I confirm I'm authorised to list this business and that the
            information provided is accurate. Najik may share my contact info
            with confirmed bookings only.
          </Text>
        </Pressable>
      </ScrollView>

      <StickyCTA>
        <PrimaryButton
          label="Submit for verification"
          disabled={!agreed}
          onPress={() => router.replace('/(owner)/verification-pending')}
        />
      </StickyCTA>
    </View>
  );
}
