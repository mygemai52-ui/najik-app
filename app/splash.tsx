/**
 * Screen 01 · Splash & welcome
 *
 * Wordmark + bilingual sub-line + 3 value props on a deep plum gradient. Lime
 * "i"-pin marker is one of the five brand-locked lime surfaces. Continue CTA
 * is also lime — only place lime sits on a primary action, intentionally tied
 * to a one-time onboarding moment (per the design doc).
 */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MockStatusBar } from '@/components/StatusBar';
import { LimeButton } from '@/components/ui';
import { Trend, Lock, Card } from '@/icons/Icon';
import { colors } from '@/theme';

export default function Splash() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={[colors.plum[500], colors.plum[900]]}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={{ flex: 1 }}
    >
      <MockStatusBar tint="#fff" />
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 28 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 1 }}>
          <Wordmark />
        </View>
        <Text
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 18,
            marginTop: 6,
            fontWeight: '500',
          }}
        >
          नजिक · <Text style={{ opacity: 0.55 }}>near you</Text>
        </Text>
        <View style={{ marginTop: 42, gap: 14 }}>
          <Prop
            icon={<Trend size={16} color={colors.lime[500]} />}
            title="Find within your budget"
            sub="Set a number — we hide what's over it."
          />
          <Prop
            icon={<Lock size={16} color={colors.lime[500]} />}
            title="Trusted & verified"
            sub="Owner-claimed, last-updated stamps."
          />
          <Prop
            icon={<Card size={16} color={colors.lime[500]} />}
            title="Pay your way"
            sub="eSewa · Khalti · FonePay · cash."
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, paddingBottom: 28 }}>
        <LimeButton
          label="Get started · सुरु गरौं"
          onPress={() => router.push('/language-location')}
        />
        <Text
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 11,
            textAlign: 'center',
            marginTop: 14,
          }}
        >
          By continuing you agree to our <Text style={{ textDecorationLine: 'underline' }}>Terms</Text> and{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Privacy</Text>.
        </Text>
      </View>
    </LinearGradient>
  );
}

function Wordmark() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      {['n', 'a', 'j'].map((c) => (
        <Text
          key={c}
          style={{
            color: '#fff',
            fontWeight: '800',
            fontSize: 54,
            letterSpacing: -2,
            lineHeight: 54,
          }}
        >
          {c}
        </Text>
      ))}
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: colors.lime[500],
            marginBottom: 2,
            shadowColor: colors.lime[500],
            shadowOpacity: 0.4,
            shadowRadius: 6,
          }}
        />
        <Text
          style={{
            color: '#fff',
            fontWeight: '800',
            fontSize: 54,
            letterSpacing: -2,
            lineHeight: 54,
          }}
        >
          i
        </Text>
      </View>
      <Text
        style={{
          color: '#fff',
          fontWeight: '800',
          fontSize: 54,
          letterSpacing: -2,
          lineHeight: 54,
        }}
      >
        k
      </Text>
    </View>
  );
}

function Prop({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          backgroundColor: 'rgba(212,245,66,0.18)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>{title}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 }}>
          {sub}
        </Text>
      </View>
    </View>
  );
}
