# Najik — build progress

This file tracks where we are. Updated on every push so a fresh Devin session
(or you) can pick up exactly where we left off.

## Stack (locked, from your answers in https://app.devin.ai/sessions/67a22d43445245f28674b5a067d96377)

- Frontend: **Expo (React Native) + TypeScript + Expo Router + NativeWind** — iOS/Android/Web
- Backend: **Node + Express + TypeScript + Postgres + PostGIS** (deployed on Fly.io)
- Auth: **Twilio SMS OTP** (with `123456` dev bypass until creds provided)
- Payments: **Khalti sandbox** first, then eSewa, then FonePay
- Maps: **OSM + Leaflet** (web) / **react-native-maps with OSM tiles** (native)
- Languages: **Nepali + English** with profile toggle
- UI fidelity target: **pixel-perfect vs https://najik-prototype-sswjfhhl.devinapps.com**

## Where we are

| Slice | Status | PR | Notes |
| --- | --- | --- | --- |
| Initial scaffold (25 screens, mock data) | done | [#1](https://github.com/mygemai52-ui/najik-app/pull/1) | merged or pending |
| Devin Review fixes (dup keys, Math.min) | done | [#1](https://github.com/mygemai52-ui/najik-app/pull/1) | bundled into #1 |
| **UI pixel-parity vs new prototype** | in progress | #2 | started — 25 screens to align |
| Interactivity (state, filters, hearts, search) | pending | #2 | bundled with parity work |
| i18n (Nepali + English toggle) | pending | #2 | bundled with parity work |
| Backend scaffold (Node+Express+TS+Postgres+PostGIS+Drizzle+JWT) | pending | #3 | new repo `najik-api` |
| Auth (Twilio OTP stub, JWT) | pending | #4 |  |
| Listings + categories + spatial search | pending | #5 |  |
| Bookings + realtime owner inbox (SSE) | pending | #6 |  |
| Reviews + ratings | pending | #7 |  |
| Owner listing wizard + photo upload (S3) | pending | #7 |  |
| Khalti sandbox payments | pending | #8 |  |
| Wire frontend mock layer → real API | pending | #9 |  |
| Deploy backend (Fly.io) + Postgres + redeploy frontend | pending | #9 |  |

## Live preview

Web: https://dist-ctkovbyh.devinapps.com (this URL stays the same; redeployed on every push)

## Pixel-parity tracker (PR #2)

Comparing my current build vs the canonical handoff prototype.

| # | Screen | UI delta size | Interactivity delta | Status |
| --- | --- | --- | --- | --- |
| 01 | Splash | small | none | pending |
| 02 | Language + Location | small | language toggle | pending |
| 03 | Home — budget-first discovery | **large** | budget filter, search, hearts, Tihar promo, listing rail | pending |
| 04 | Restaurants — list view | medium | filter chips state, sort, heart toggle | pending |
| 05 | Map view | medium | pin select, list/map toggle | pending |
| 06 | Filter — bottom sheet | **large** (full-page → bottom sheet) | budget slider, distance, cuisine, toggles, live count | pending |
| 07 | Restaurant detail | medium | hero carousel, action row, aspect ratings, review preview | pending |
| 08 | Hotel detail | medium | date pickers, room select, sticky total | pending |
| 09 | Salon detail | medium | service multi-select, staff filter, slot grid | pending |
| 10 | Checkout | medium | promo code apply, payment select, line items | pending |
| 11 | Booking confirmed | small | code + cancel notice | pending |
| 12 | My bookings | medium | tab state, per-card actions, recently completed | pending |
| 13 | Write a review | medium | overall stars, per-aspect, char counter, tag chips | pending |
| 14 | Profile | medium | tier badge, 3 tiles, language toggle | pending |
| 15 | List your business | medium | reasons, 4-step preview, testimonials | pending |
| 16 | List · Step 1 — Basics | small | form state, GPS pin, save & exit | pending |
| 17 | List · Step 2 — Hours & photos | medium | per-day hours, copy-shortcut, photo grid w/ COVER | pending |
| 18 | List · Step 3 — Services & price | small | inline edit, drag-reorder | pending |
| 19 | List · Step 4 — Verify | medium | doc type select, upload, PAN field | pending |
| 20 | Verification pending | medium | status timeline, while-you-wait nudges, skip-queue | pending |
| 21 | Owner dashboard | medium | 4 KPI tiles, 7-day chart, things-to-do | pending |
| 22 | Bookings inbox | medium | tab state, swipe accept/decline | pending |
| 23 | Booking detail (owner) | medium | services list, customer note, status timeline, mark complete | pending |
| 24 | Edit listing | small | LIVE badge, hold-day, promote upsell | pending |
| 25 | Reviews & reply | **large** | distribution bars, aspect ratings, insight, inline reply, templates | pending |

## How we manage usage limits across this big project

1. **Per-feature PRs.** Each PR is small enough to review in one pass. No giant PRs.
2. **This `PROGRESS.md` is the resume point.** If you (or Devin) resume in a fresh session, read this file first.
3. **You can stop me anytime** by saying "pause here". I'll commit + push + update this file.
4. **Batch your feedback.** Click through one slice end-to-end, then send all feedback in one message.
5. **For huge mechanical tasks** (e.g., translating all 25 screens to Nepali), I'll spin up a child Devin session — that runs on its own machine and doesn't burn your interactive time.
6. **Saved secrets** for Twilio / Khalti / Supabase / Fly will be requested as org-scoped so they persist across sessions.

## Current secrets owed by you

- `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` (for real SMS OTP — currently stubbed with `123456` dev bypass)
- `KHALTI_PUBLIC_KEY` and `KHALTI_SECRET_KEY` (sandbox — sign up at https://test-pay.khalti.com/, share both keys)
- `FLY_API_TOKEN` (for backend deployment — `flyctl auth token`)

I'll prompt you for each via the Devin secrets flow when we get to the matching slice.
