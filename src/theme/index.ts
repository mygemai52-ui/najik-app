/**
 * Najik · Bazaar brand tokens (locked).
 *
 * These TS constants mirror tailwind.config.js and design-tokens.json so that
 * non-Tailwind code paths (StyleSheet, gradients, animated values) can pull from
 * the same source of truth as className-based components.
 */
export const colors = {
  plum: {
    50:  '#F5EBFB',
    100: '#E5D0F4',
    200: '#D2AEEC',
    300: '#B884E5',
    500: '#7B2CBF',
    600: '#6B21A8',
    700: '#5B1A95',
    900: '#2E0B52',
  },
  lime: {
    100: '#F2FBC8',
    300: '#E2F77A',
    500: '#D4F542',
    700: '#A0BE2E',
    900: '#4A6512',
  },
  ink:        '#15101D',
  inkSec:     '#475569',
  inkMuted:   '#6B7280',
  line:       '#ECE7E0',
  lineStrong: '#DCD4C9',
  surface:    '#FAFAF7',
  card:       '#FFFFFF',
  ok:         '#15803D',
  warn:       '#B45309',
  err:        '#B91C1C',
  star:       '#6B21A8',
  page:       '#0E0A1A',
  pageText:   '#E2DFEC',
  pageMuted:  '#9890AC',
} as const;

export const radius = { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 } as const;

/** Reference device viewport (iPhone 14 / Pixel 7 logical px) — mobile-first. */
export const device = { w: 390, h: 844 } as const;
