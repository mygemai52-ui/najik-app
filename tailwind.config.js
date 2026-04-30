/**
 * Najik · Bazaar brand tokens (locked).
 * Mirrors najik-handoff/design-tokens.json — see Najik-Design-Doc.md.
 *
 * Brand rules:
 *   - Plum 500 #7B2CBF is primary identity / CTAs / verified / headers.
 *   - Lime 500 #D4F542 is reserved for exactly five surfaces (see README §brand rules).
 *   - Star fill is plum-toned, not yellow.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
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
        ink: {
          DEFAULT:   '#15101D',
          secondary: '#475569',
          muted:     '#6B7280',
        },
        line: {
          DEFAULT: '#ECE7E0',
          strong:  '#DCD4C9',
        },
        surface: {
          bg:   '#FAFAF7',
          card: '#FFFFFF',
        },
        ok:   '#15803D',
        warn: '#B45309',
        err:  '#B91C1C',
        star: '#6B21A8',
        page: {
          bg:    '#0E0A1A',
          text:  '#E2DFEC',
          muted: '#9890AC',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        deva: ['Noto Sans Devanagari', 'sans-serif'],
      },
      fontSize: {
        nano:    '9px',
        micro:   '10px',
        tiny:    '11px',
        caption: '12px',
        label:   '13px',
        bodySm:  '14px',
        body:    '16px',
        h3:      '18px',
        h2:      '22px',
        h1:      '28px',
      },
      borderRadius: {
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '20px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};
