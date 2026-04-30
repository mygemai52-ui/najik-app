/**
 * Bottom navigation bars.
 *
 * Two variants — consumer (4 tabs) and owner (4 tabs). The active tab uses the
 * lime indicator bar above the icon — per the brand rules this is one of only
 * five surfaces lime is allowed on. Do not change.
 *
 * The owner nav lives inside the dark "Owner mode" wrapper (see OwnerShell),
 * which gives it a different visual signature from the consumer nav.
 */
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Link } from 'expo-router';
import { Home, Compass, Ticket, User, ChartBar, Inbox, Edit, Reply } from '@/icons/Icon';
import { colors } from '@/theme';

type Tab = {
  key: string;
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number; color?: string; fill?: string }>;
};

const consumerTabs: Tab[] = [
  { key: 'home',     label: 'Home',     href: '/(consumer)/home',        Icon: Home },
  { key: 'explore',  label: 'Explore',  href: '/(consumer)/restaurants', Icon: Compass },
  { key: 'bookings', label: 'Bookings', href: '/(consumer)/bookings',    Icon: Ticket },
  { key: 'profile',  label: 'Profile',  href: '/(consumer)/profile',     Icon: User },
];

const ownerTabs: Tab[] = [
  { key: 'home',     label: 'Home',     href: '/(owner)/dashboard',    Icon: ChartBar },
  { key: 'bookings', label: 'Bookings', href: '/(owner)/inbox',     Icon: Inbox },
  { key: 'listing',  label: 'Listing',  href: '/(owner)/edit-listing', Icon: Edit },
  { key: 'reviews',  label: 'Reviews',  href: '/(owner)/reviews',      Icon: Reply },
];

export function BottomNav({
  active,
  variant = 'consumer',
}: {
  active: string;
  variant?: 'consumer' | 'owner';
}) {
  const tabs = variant === 'owner' ? ownerTabs : consumerTabs;
  return (
    <View
      className="flex-row border-t border-line bg-surface-card"
      style={{ paddingTop: 8, paddingBottom: 12 }}
    >
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <Link key={t.key} href={t.href as never} asChild>
            <Pressable className="flex-1 items-center" style={{ gap: 4 }}>
              <View
                style={{
                  height: 3,
                  width: 22,
                  borderRadius: 2,
                  backgroundColor: isActive ? colors.lime[500] : 'transparent',
                }}
              />
              <t.Icon size={20} color={isActive ? colors.plum[500] : colors.inkMuted} />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '700',
                  color: isActive ? colors.plum[500] : colors.inkMuted,
                }}
              >
                {t.label}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}
