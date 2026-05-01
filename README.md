# Najik · नजिक

Budget+location-first local discovery and booking — Nepal.

This is the v1 React Native application based on the Najik design handoff
(see `najik-handoff.zip`). Built with **Expo** so the same codebase ships
to **iOS, Android and Web**.

> **Live web preview:** https://dist-ctkovbyh.devinapps.com

## Stack

| | |
| --- | --- |
| Framework | [Expo SDK 54](https://docs.expo.dev/) (React Native 0.81 + React 19) |
| Routing   | [Expo Router](https://docs.expo.dev/router/) (file-based, typed routes) |
| Styling   | [NativeWind v4](https://www.nativewind.dev/) (Tailwind for RN) |
| Language  | TypeScript (strict) |
| Icons     | Inline `react-native-svg` (50+ in `src/icons/Icon.tsx`) |
| Targets   | iOS · Android · Web |
| State     | Local + zustand-ready (mock data layer in `src/data/mock.ts`) |

## Project structure

```
najik-app/
├── app/                          # Expo Router file-based routes
│   ├── _layout.tsx               # Root layout, status bar, PhoneFrame on web
│   ├── index.tsx                 # /  → /splash
│   ├── splash.tsx                # 01 · Splash & welcome
│   ├── language-location.tsx     # 02 · Language + Location
│   ├── (consumer)/               # Consumer-facing screens
│   │   ├── _layout.tsx
│   │   ├── home.tsx              # 03 · Home — budget-first
│   │   ├── restaurants.tsx       # 04 · Restaurants list
│   │   ├── map.tsx               # 05 · Map view
│   │   ├── filter.tsx            # 06 · Filter sheet
│   │   ├── listing/[id].tsx      # 07/08/09 · Detail (restaurant/hotel/salon)
│   │   ├── checkout.tsx          # 10 · Checkout & payment
│   │   ├── booking-confirmed.tsx # 11 · Booking confirmed (QR)
│   │   ├── bookings.tsx          # 12 · My bookings
│   │   ├── review.tsx            # 13 · Write a review
│   │   ├── profile.tsx           # 14 · Profile
│   │   └── list-your-business.tsx# 15 · List your business (entry)
│   └── (owner)/                  # Owner-mode screens
│       ├── _layout.tsx
│       ├── list-step-1.tsx       # 16 · Listing wizard · Basics
│       ├── list-step-2.tsx       # 17 · Hours & photos
│       ├── list-step-3.tsx       # 18 · Services & price
│       ├── list-step-4.tsx       # 19 · Verify
│       ├── verification-pending.tsx # 20 · Verification pending
│       ├── dashboard.tsx         # 21 · Owner dashboard
│       ├── bookings.tsx          # 22 · Bookings inbox
│       ├── booking/[id].tsx      # 23 · Booking detail
│       ├── edit-listing.tsx      # 24 · Edit listing
│       └── reviews.tsx           # 25 · Reviews & reply
├── src/
│   ├── components/               # Atoms (Button, Pill, Card, BottomNav, …)
│   ├── icons/Icon.tsx            # 50+ inline SVG icons
│   ├── theme/index.ts            # Bazaar design tokens (TS constants)
│   └── data/mock.ts              # Mock domain data — swap to API later
├── tailwind.config.js            # Bazaar tokens → Tailwind theme
├── app.json                      # Expo config (slug, scheme, bundle ids)
├── babel.config.js               # NativeWind preset
├── metro.config.js               # NativeWind metro plugin
└── tsconfig.json                 # Strict TS, @/ → src/ alias
```

## Getting started

```bash
# 1. Install
npm install

# 2. Run on web (deploys to a local browser)
npm run web

# 3. Run on a device via Expo Go (scan the QR with the Expo Go app)
npm run start

# 4. iOS simulator (Mac only) / Android emulator
npm run ios
npm run android

# 5. Build static web bundle (deploys to /dist)
npm run build:web
```

### Lint & typecheck

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # expo lint
```

## Shipping to iOS + Android

Expo gives us two paths:

1. **Expo Go (dev)** — scan the QR code printed by `npm run start` with the
   [Expo Go app](https://expo.dev/go) on iOS or Android. No build step.
2. **EAS Build (production)** — when you're ready to ship to the App Store /
   Play Store:

   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   eas build --platform ios       # → Apple App Store
   eas build --platform android   # → Google Play Store
   eas submit --platform ios
   eas submit --platform android
   ```

   This requires Apple Developer + Google Play Console accounts. Set bundle
   identifiers in `app.json` (already set to `com.najik.app`).

## Brand rules (from the design doc)

- **Plum #7B2CBF** — primary brand colour. CTAs, verified badge, headers.
- **Lime #D4F542** — appears on **exactly five** surfaces and nowhere else:
  1. The "i"-pin on the splash wordmark.
  2. The active-tab indicator on the bottom nav.
  3. The "Promoted" badge.
  4. The booking-confirmed success ring.
  5. The festive promo card on Home (Tihar specials).
- Stars are **plum** `#5B1A95`, never yellow.
- Reference viewport is **390 × 844 px** (iPhone 14 / Pixel 7).
- Fonts are DM Sans (Latin) + Noto Sans Devanagari (Nepali).

## Mock data → real backend

All UI reads through `src/data/mock.ts`. Functions return promises (`getListings`,
`getListing`, …) so swapping to `fetch()` is a one-file change. The backend
recommended in the handoff (§9) is **Node/Express + Postgres + PostGIS** with
sandbox credentials for eSewa, Khalti and FonePay.

## Stub integrations (TODO)

| Surface | Stub | Production work |
| --- | --- | --- |
| eSewa / Khalti / FonePay / IME Pay / ConnectIPS | Selection only — confirms instantly | Wire each merchant SDK; webhook for confirmation |
| Google Maps  | Hand-drawn SVG basemap | Mapbox GL or Google Maps SDK; PostGIS spatial filters |
| OTP via SMS | Skipped | Sparrow / Twilio integration; rate-limit per phone |
| Push notifications | None | Expo push service (`expo-notifications`) |
| Analytics | None | Mixpanel / Amplitude — funnel events from §6 of design doc |

## License

Private — © Najik. All rights reserved.
