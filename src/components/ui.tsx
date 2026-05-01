/**
 * Small, reusable UI atoms shared across screens.
 *
 * - PrimaryButton:  filled plum CTA — sticks to the bottom of detail screens.
 * - SecondaryButton: low-emphasis outline.
 * - LimeButton:     reserved for one-time onboarding moments (per brand rules).
 * - Pill:           pill-shaped chip (filter chips, category chips, status chips).
 * - Card:           rounded surface with shadow.
 * - VerifiedBadge:  plum check pill — Najik's #1 trust signal.
 * - PromotedBadge:  lime pill (revenue signal — one of the five lime surfaces).
 * - StarRating:     plum-toned star rating (NOT yellow, by brand decision).
 * - SectionHeader:  small uppercase header used between rails on Home.
 * - InfoRow:        icon + title + subtitle row (used on detail screens).
 */
import React from 'react';
import { Pressable, Text, View, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { Star, Verify, CaretR, Sparkles } from '@/icons/Icon';
import { colors } from '@/theme';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
  icon?: React.ReactNode;
};

export function PrimaryButton({ label, onPress, disabled, style, icon }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="flex-row items-center justify-center rounded-md"
      style={[
        {
          paddingVertical: 14,
          paddingHorizontal: 18,
          borderRadius: 14,
          backgroundColor: disabled ? colors.plum[200] : colors.plum[500],
          gap: 8,
          shadowColor: colors.plum[500],
          shadowOpacity: 0.25,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
        },
        style,
      ]}
    >
      {icon}
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}

export function SecondaryButton({ label, onPress, disabled, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          paddingVertical: 13,
          paddingHorizontal: 18,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: colors.lineStrong,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text style={{ color: colors.ink, fontWeight: '700', fontSize: 13 }}>{label}</Text>
    </Pressable>
  );
}

export function LimeButton({ label, onPress, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          paddingVertical: 14,
          paddingHorizontal: 18,
          borderRadius: 14,
          backgroundColor: colors.lime[500],
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: colors.lime[500],
          shadowOpacity: 0.35,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 8 },
        },
        style,
      ]}
    >
      <Text style={{ color: colors.lime[900], fontWeight: '800', fontSize: 14 }}>
        {label}
      </Text>
    </Pressable>
  );
}

type PillProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'plum' | 'lime' | 'ok' | 'warn' | 'err' | 'ghost';
};
export function Pill({ label, active, onPress, icon, variant = 'default' }: PillProps) {
  const styles = (() => {
    if (variant === 'plum')  return { bg: colors.plum[500],  fg: '#fff' };
    if (variant === 'lime')  return { bg: colors.lime[500],  fg: colors.lime[900] };
    if (variant === 'ok')    return { bg: '#DCFCE7',         fg: colors.ok };
    if (variant === 'warn')  return { bg: '#FEF3C7',         fg: colors.warn };
    if (variant === 'err')   return { bg: '#FEE2E2',         fg: colors.err };
    if (variant === 'ghost') return { bg: 'transparent',     fg: colors.inkSec };
    return active
      ? { bg: colors.plum[500], fg: '#fff' }
      : { bg: '#fff', fg: colors.ink };
  })();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: styles.bg,
        borderWidth: variant === 'default' && !active ? 1 : 0,
        borderColor: colors.lineStrong,
      }}
    >
      {icon}
      <Text style={{ color: styles.fg, fontWeight: '600', fontSize: 12 }}>{label}</Text>
    </Pressable>
  );
}

export function Card({
  children,
  style,
  padded = true,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: padded ? 14 : 0,
          shadowColor: '#0F0A1E',
          shadowOpacity: 0.06,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 6 },
          borderWidth: 1,
          borderColor: colors.line,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function VerifiedBadge() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 999,
        backgroundColor: colors.plum[50],
      }}
    >
      <Verify size={10} color={colors.plum[500]} />
      <Text style={{ color: colors.plum[700], fontWeight: '700', fontSize: 10 }}>
        Verified
      </Text>
    </View>
  );
}

export function PromotedBadge() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 999,
        backgroundColor: colors.lime[500],
      }}
    >
      <Sparkles size={10} color={colors.lime[900]} />
      <Text style={{ color: colors.lime[900], fontWeight: '800', fontSize: 10 }}>
        Promoted
      </Text>
    </View>
  );
}

export function StarRating({
  rating,
  count,
  size = 12,
}: {
  rating: number;
  count?: number;
  size?: number;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Star size={size} color={colors.star} fill={colors.star} />
      <Text style={{ fontWeight: '700', fontSize: 12, color: colors.ink }}>
        {rating.toFixed(1)}
      </Text>
      {count != null && (
        <Text style={{ color: colors.inkMuted, fontSize: 11 }}>({count})</Text>
      )}
    </View>
  );
}

export function SectionHeader({
  pre,
  title,
  action,
  onAction,
}: {
  pre?: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 8,
      }}
    >
      <View>
        {pre ? (
          <Text
            style={{
              color: colors.lime[700],
              fontSize: 10,
              fontWeight: '800',
              letterSpacing: 1.4,
              textTransform: 'uppercase',
            }}
          >
            {pre}
          </Text>
        ) : null}
        <Text style={{ fontWeight: '800', fontSize: 16, color: colors.ink }}>
          {title}
        </Text>
      </View>
      {action ? (
        <Pressable
          onPress={onAction}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
        >
          <Text style={{ color: colors.plum[700], fontWeight: '700', fontSize: 12 }}>
            {action}
          </Text>
          <CaretR size={12} color={colors.plum[700]} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function InfoRow({
  icon,
  title,
  subtitle,
  right,
  style,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
        style,
      ]}
    >
      {icon ? (
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
          {icon}
        </View>
      ) : null}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', fontSize: 13, color: colors.ink }}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ color: colors.inkMuted, fontSize: 11, marginTop: 2 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

export function Divider({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[
        { height: 1, backgroundColor: colors.line, marginVertical: 8 },
        style,
      ]}
    />
  );
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  right,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  // Importing here avoids a top-level cycle with Icon ↔ ui.
  const { Back } = require('@/icons/Icon');
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          flex: 1,
        }}
      >
        {onBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={10}
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: colors.line,
            }}
          >
            <Back size={16} color={colors.ink} />
          </Pressable>
        ) : null}
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '800', fontSize: 16, color: colors.ink }}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={{ color: colors.inkMuted, fontSize: 11 }}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
      {right}
    </View>
  );
}

export function StickyCTA({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 12,
        borderTopWidth: 1,
        borderTopColor: colors.line,
        backgroundColor: '#fff',
      }}
    >
      {children}
    </View>
  );
}

export function MiniText({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text style={[{ color: colors.inkMuted, fontSize: 11 }, style]}>{children}</Text>
  );
}
