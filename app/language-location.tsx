/**
 * Screen 02 · Language + Location
 *
 * Default-Nepali, English toggle. Soft, contextual location-permission rationale
 * before invoking the OS dialog (addresses the #1 first-launch drop-off per the
 * design doc). Manual city pick is a first-class fallback.
 */
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MockStatusBar } from '@/components/StatusBar';
import { PrimaryButton } from '@/components/ui';
import { Pin, Check } from '@/icons/Icon';
import { colors } from '@/theme';
import { cities } from '@/data/mock';

type Lang = 'np' | 'en';

export default function LanguageLocation() {
  const [lang, setLang] = useState<Lang>('np');
  const [city, setCity] = useState<string | null>(null);
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <MockStatusBar />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <Text style={{ fontWeight: '800', fontSize: 18, letterSpacing: -0.4, color: colors.ink }}>
            najik
          </Text>
          <Text style={{ color: colors.plum[700], fontSize: 12, fontWeight: '600' }}>
            नजिक
          </Text>
        </View>

        <Text
          style={{
            marginTop: 24,
            fontSize: 22,
            fontWeight: '800',
            letterSpacing: -0.4,
            color: colors.ink,
          }}
        >
          Choose your language
        </Text>
        <Text style={{ color: colors.inkMuted, fontSize: 13 }}>तपाईंको भाषा छान्नुहोस्</Text>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 18 }}>
          <LangCard
            primary
            selected={lang === 'np'}
            onPress={() => setLang('np')}
            tag="Default"
            big="नेपाली"
            small="Nepali"
          />
          <LangCard
            selected={lang === 'en'}
            onPress={() => setLang('en')}
            tag="Switch"
            big="English"
            small="अंग्रेजी"
          />
        </View>

        <View
          style={{
            marginTop: 28,
            padding: 14,
            backgroundColor: colors.plum[50],
            borderRadius: 14,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              backgroundColor: colors.plum[500],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Pin size={16} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: colors.ink }}>
              Use your location
            </Text>
            <Text style={{ fontSize: 11, color: colors.inkSec, marginTop: 3, lineHeight: 16 }}>
              So we only show what's actually near you. We never share your live
              location with businesses.
            </Text>
          </View>
        </View>

        <PrimaryButton
          label="Allow location · सहमत छु"
          style={{ marginTop: 10 }}
          onPress={() => router.replace('/(consumer)/home')}
        />

        <Text
          style={{
            textAlign: 'center',
            marginTop: 14,
            color: colors.plum[700],
            fontWeight: '700',
            fontSize: 12,
          }}
        >
          Or pick a city manually
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 12,
          }}
        >
          {cities.map((c) => {
            const active = c === city;
            return (
              <Pressable
                key={c}
                onPress={() => setCity(c)}
                style={{
                  width: '48%',
                  backgroundColor: active ? colors.plum[50] : '#fff',
                  borderWidth: 1,
                  borderColor: active ? colors.plum[500] : colors.line,
                  borderRadius: 12,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Pin size={14} color={colors.plum[500]} />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: colors.ink,
                  }}
                >
                  {c}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {city ? (
          <PrimaryButton
            label={`Continue with ${city}`}
            style={{ marginTop: 16 }}
            onPress={() => router.replace('/(consumer)/home')}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

function LangCard({
  primary,
  selected,
  onPress,
  tag,
  big,
  small,
}: {
  primary?: boolean;
  selected: boolean;
  onPress: () => void;
  tag: string;
  big: string;
  small: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        borderWidth: 2,
        borderColor: selected ? colors.plum[500] : colors.lineStrong,
        backgroundColor: selected ? colors.plum[50] : colors.card,
        borderRadius: 14,
        padding: 14,
        position: 'relative',
      }}
    >
      {selected ? (
        <View
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: colors.plum[500],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={10} color="#fff" />
        </View>
      ) : null}
      <Text
        style={{
          fontSize: 11,
          fontWeight: '700',
          color: selected ? colors.plum[700] : colors.inkMuted,
        }}
      >
        {tag}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: colors.ink,
          marginTop: 4,
        }}
      >
        {big}
      </Text>
      <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }}>
        {small}
      </Text>
    </Pressable>
  );
}
