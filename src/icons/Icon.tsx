/**
 * Inline SVG icon library.
 *
 * Ported from najik-handoff/source/screens-data.js (the icon block at the top).
 * Keeping `viewBox="0 0 24 24"` and `stroke="currentColor"` so they inherit
 * text colour just like the prototype — we don't ship an icon font.
 */
import React from 'react';
import Svg, { Circle, Path, Polyline, Rect, Line } from 'react-native-svg';

type Props = { size?: number; color?: string; fill?: string };

const stroke = (size = 16, color = 'currentColor', sw = 2) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: color,
  strokeWidth: sw,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const Pin = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);
export const Search = ({ size, color }: Props) => (
  <Svg {...stroke(size, color, 2.2)}>
    <Circle cx="11" cy="11" r="7" />
    <Path d="M21 21l-4.3-4.3" />
  </Svg>
);
export const Bell = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <Path d="M13 21a2 2 0 0 1-3.5 0" />
  </Svg>
);
export const Heart = ({ size, color, fill }: Props) =>
  fill ? (
    <Svg width={size ?? 16} height={size ?? 16} viewBox="0 0 24 24" fill={fill}>
      <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
  ) : (
    <Svg {...stroke(size, color)}>
      <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
  );
export const Fork = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M3 3v6a3 3 0 0 0 6 0V3" />
    <Path d="M6 9v12" />
    <Path d="M14 3v18" />
    <Path d="M14 9c0-3 3-6 6-6" />
  </Svg>
);
export const Cup = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M17 8h1a3 3 0 0 1 0 6h-1" />
    <Path d="M3 8h14v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
  </Svg>
);
export const Bed = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M2 12h20" />
    <Path d="M2 4v16" />
    <Path d="M22 8v12" />
    <Path d="M2 12c4-2 14-2 18 0" />
  </Svg>
);
export const Cart = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Circle cx="9" cy="20" r="1.5" />
    <Circle cx="18" cy="20" r="1.5" />
    <Path d="M2 4h3l3 12h12l2-8H6" />
  </Svg>
);
export const Scissors = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Circle cx="6" cy="6" r="3" />
    <Circle cx="6" cy="18" r="3" />
    <Path d="M20 4 9 15" />
    <Path d="M14 14l6 6" />
  </Svg>
);
export const Wrench = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-3 3-7-7 3-3z" />
    <Path d="M11 11 4 18l3 3 7-7" />
  </Svg>
);
export const Plane = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M22 16l-7-2-3 6-2-1 1-7-9-3 1-2 9 2 5-5 2 1-3 6 6 3z" />
  </Svg>
);
export const More = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Circle cx="6" cy="12" r="1.5" />
    <Circle cx="12" cy="12" r="1.5" />
    <Circle cx="18" cy="12" r="1.5" />
  </Svg>
);
export const Home = ({ size, color, fill }: Props) =>
  fill ? (
    <Svg width={size ?? 16} height={size ?? 16} viewBox="0 0 24 24" fill={fill}>
      <Path d="M12 3l9 8h-2v10h-5v-6h-4v6H5V11H3z" />
    </Svg>
  ) : (
    <Svg {...stroke(size, color)}>
      <Path d="M3 11l9-8 9 8" />
      <Path d="M5 9v12h14V9" />
    </Svg>
  );
export const Compass = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Circle cx="12" cy="12" r="10" />
    <Path d="M16 8l-2 6-6 2 2-6 6-2z" />
  </Svg>
);
export const Ticket = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M3 9a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3 2 2 0 0 0 0 4 3 3 0 0 1-3 3H6a3 3 0 0 1-3-3 2 2 0 0 0 0-4z" />
    <Path d="M13 6v12" />
  </Svg>
);
export const User = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Circle cx="12" cy="8" r="4" />
    <Path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </Svg>
);
export const Caret = ({ size, color }: Props) => (
  <Svg {...stroke(size, color, 2.4)}>
    <Polyline points="6 9 12 15 18 9" />
  </Svg>
);
export const CaretR = ({ size, color }: Props) => (
  <Svg {...stroke(size, color, 2.4)}>
    <Polyline points="9 6 15 12 9 18" />
  </Svg>
);
export const Back = ({ size, color }: Props) => (
  <Svg {...stroke(size, color, 2.2)}>
    <Polyline points="15 6 9 12 15 18" />
  </Svg>
);
export const Share = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Circle cx="6" cy="12" r="3" />
    <Circle cx="18" cy="6" r="3" />
    <Circle cx="18" cy="18" r="3" />
    <Path d="M8.5 10.5l7-3.5M8.5 13.5l7 3.5" />
  </Svg>
);
export const Star = ({ size, color, fill }: Props) =>
  fill ? (
    <Svg width={size ?? 16} height={size ?? 16} viewBox="0 0 24 24" fill={fill}>
      <Path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.5L6 22l1.5-7.2L2 10l7.1-1.1z" />
    </Svg>
  ) : (
    <Svg {...stroke(size, color)}>
      <Path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.5L6 22l1.5-7.2L2 10l7.1-1.1z" />
    </Svg>
  );
export const Check = ({ size, color }: Props) => (
  <Svg {...stroke(size, color, 2.4)}>
    <Polyline points="20 6 9 17 4 12" />
  </Svg>
);
export const X = ({ size, color }: Props) => (
  <Svg {...stroke(size, color, 2.2)}>
    <Line x1="18" y1="6" x2="6" y2="18" />
    <Line x1="6" y1="6" x2="18" y2="18" />
  </Svg>
);
export const Plus = ({ size, color }: Props) => (
  <Svg {...stroke(size, color, 2.4)}>
    <Line x1="12" y1="5" x2="12" y2="19" />
    <Line x1="5" y1="12" x2="19" y2="12" />
  </Svg>
);
export const Minus = ({ size, color }: Props) => (
  <Svg {...stroke(size, color, 2.4)}>
    <Line x1="5" y1="12" x2="19" y2="12" />
  </Svg>
);
export const Trend = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Polyline points="3 17 9 11 13 15 21 7" />
    <Polyline points="14 7 21 7 21 14" />
  </Svg>
);
export const Lock = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Rect x="4" y="11" width="16" height="10" rx="2" />
    <Path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Svg>
);
export const Card = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Rect x="2" y="6" width="20" height="13" rx="2" />
    <Line x1="2" y1="11" x2="22" y2="11" />
  </Svg>
);
export const Mic = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Rect x="9" y="3" width="6" height="11" rx="3" />
    <Path d="M5 11a7 7 0 0 0 14 0" />
    <Line x1="12" y1="18" x2="12" y2="22" />
  </Svg>
);
export const Filter = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M3 4h18l-7 9v6l-4 2v-8z" />
  </Svg>
);
export const MapIcon = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M9 3l-6 2v16l6-2 6 2 6-2V3l-6 2z" />
    <Line x1="9" y1="3" x2="9" y2="19" />
    <Line x1="15" y1="5" x2="15" y2="21" />
  </Svg>
);
export const List = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Line x1="8" y1="6" x2="21" y2="6" />
    <Line x1="8" y1="12" x2="21" y2="12" />
    <Line x1="8" y1="18" x2="21" y2="18" />
    <Circle cx="4" cy="6" r="1" />
    <Circle cx="4" cy="12" r="1" />
    <Circle cx="4" cy="18" r="1" />
  </Svg>
);
export const Clock = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Circle cx="12" cy="12" r="9" />
    <Polyline points="12 7 12 12 15 14" />
  </Svg>
);
export const Calendar = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Rect x="3" y="5" width="18" height="16" rx="2" />
    <Line x1="3" y1="10" x2="21" y2="10" />
    <Line x1="8" y1="3" x2="8" y2="7" />
    <Line x1="16" y1="3" x2="16" y2="7" />
  </Svg>
);
export const Phone = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.9 9.8a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />
  </Svg>
);
export const Camera = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M2 7h4l2-3h8l2 3h4v13H2z" />
    <Circle cx="12" cy="13" r="4" />
  </Svg>
);
export const Edit = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M11 4H4v16h16v-7" />
    <Path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z" />
  </Svg>
);
export const ChartBar = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Line x1="4" y1="20" x2="4" y2="10" />
    <Line x1="10" y1="20" x2="10" y2="4" />
    <Line x1="16" y1="20" x2="16" y2="14" />
    <Line x1="22" y1="20" x2="2" y2="20" />
  </Svg>
);
export const Inbox = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <Path d="M5 4h14l3 8v8H2v-8z" />
  </Svg>
);
export const Reply = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Polyline points="9 17 4 12 9 7" />
    <Path d="M20 18v-2a4 4 0 0 0-4-4H4" />
  </Svg>
);
export const Tag = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M20.6 13.4 13 21l-9-9V4h8z" />
    <Circle cx="8" cy="8" r="1.5" />
  </Svg>
);
export const QR = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Rect x="3" y="3" width="7" height="7" rx="1" />
    <Rect x="14" y="3" width="7" height="7" rx="1" />
    <Rect x="3" y="14" width="7" height="7" rx="1" />
    <Line x1="14" y1="14" x2="14" y2="21" />
    <Line x1="18" y1="14" x2="18" y2="18" />
    <Line x1="14" y1="18" x2="21" y2="18" />
    <Line x1="21" y1="14" x2="21" y2="21" />
  </Svg>
);
export const Wallet = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M3 7a2 2 0 0 1 2-2h14v4H5a2 2 0 0 0-2 2z" />
    <Rect x="3" y="9" width="19" height="11" rx="2" />
    <Circle cx="17" cy="14.5" r="1.2" />
  </Svg>
);
export const Settings = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Circle cx="12" cy="12" r="3" />
    <Path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </Svg>
);
export const Globe = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Circle cx="12" cy="12" r="10" />
    <Line x1="2" y1="12" x2="22" y2="12" />
    <Path d="M12 2a15 15 0 0 1 0 20" />
    <Path d="M12 2a15 15 0 0 0 0 20" />
  </Svg>
);
export const Send = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M22 2 11 13" />
    <Path d="M22 2 15 22 11 13 2 9z" />
  </Svg>
);
export const Wifi = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M5 12.5a14 14 0 0 1 14 0" />
    <Path d="M8 16a8 8 0 0 1 8 0" />
    <Circle cx="12" cy="19" r="1" />
  </Svg>
);
export const Signal = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Line x1="4" y1="20" x2="4" y2="17" />
    <Line x1="9" y1="20" x2="9" y2="14" />
    <Line x1="14" y1="20" x2="14" y2="10" />
    <Line x1="19" y1="20" x2="19" y2="6" />
  </Svg>
);
export const Verify = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M12 2 4 5v6c0 5 4 9 8 11 4-2 8-6 8-11V5z" />
    <Polyline points="9 12 11 14 15 10" />
  </Svg>
);
export const Image = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Rect x="3" y="3" width="18" height="18" rx="2" />
    <Circle cx="9" cy="9" r="2" />
    <Path d="m21 15-5-5L5 21" />
  </Svg>
);
export const Sparkles = ({ size, color }: Props) => (
  <Svg {...stroke(size, color)}>
    <Path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <Path d="M19 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
  </Svg>
);
