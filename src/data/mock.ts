/**
 * Mock domain data for the v1 prototype.
 *
 * Everything UI reads goes through this file. When we wire up a real backend
 * (Node/Express + Postgres/PostGIS per the handoff §9), the function shapes
 * stay the same — only their bodies swap to fetch().
 */

export type Category =
  | 'restaurants'
  | 'cafes'
  | 'hotels'
  | 'groceries'
  | 'salons'
  | 'garages'
  | 'travel'
  | 'more';

export type PhotoVariant = 'default' | 'warm' | 'cool' | 'green' | 'bed' | 'peach';

export type Listing = {
  id: string;
  name: string;
  category: Category;
  cuisine?: string;
  area: string;
  distanceKm: number;
  priceFrom: number;
  rating: number;
  reviews: number;
  photo: PhotoVariant;
  promoted?: boolean;
  verified?: boolean;
  openNow: boolean;
  status: string;
  payments: string[];
  tags: string[];
  /** Mocked map pin — relative 0..1 coords inside the map view rectangle. */
  pin: { x: number; y: number };
};

export type ServiceItem = {
  id: string;
  name: string;
  duration: string;
  price: number;
  popular?: boolean;
};

export type RoomType = {
  id: string;
  name: string;
  bed: string;
  guests: number;
  pricePerNight: number;
  refundable: boolean;
};

export type ReviewAspect = 'food' | 'service' | 'value' | 'ambience' | 'cleanliness';

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  body: string;
  aspects: { [k in ReviewAspect]?: number };
  reply?: { author: string; body: string; date: string };
};

export type Booking = {
  id: string;
  listingId: string;
  listingName: string;
  category: Category;
  when: string;
  status: 'upcoming' | 'past' | 'cancelled';
  partySize?: number;
  checkIn?: string;
  checkOut?: string;
  price: number;
  paymentMethod: string;
  qrPayload: string;
  photo: PhotoVariant;
};

export const categories: { key: Category; label: string }[] = [
  { key: 'restaurants', label: 'Restaurants' },
  { key: 'cafes',       label: 'Cafés' },
  { key: 'hotels',      label: 'Hotels' },
  { key: 'groceries',   label: 'Groceries' },
  { key: 'salons',      label: 'Salons' },
  { key: 'garages',     label: 'Garages' },
  { key: 'travel',      label: 'Travel' },
  { key: 'more',        label: 'More' },
];

export const cities = [
  'Kathmandu',
  'Pokhara',
  'Biratnagar',
  'Butwal',
  'Birgunj',
  'Dharan',
];

export const paymentMethods = [
  { key: 'esewa',    label: 'eSewa',         tag: 'Most popular' },
  { key: 'khalti',   label: 'Khalti',        tag: 'Fast' },
  { key: 'fonepay',  label: 'FonePay QR',    tag: 'Bank QR' },
  { key: 'imepay',   label: 'IME Pay' },
  { key: 'connect',  label: 'ConnectIPS' },
  { key: 'card',     label: 'Card (Visa / Mastercard)' },
  { key: 'cod',      label: 'Pay at venue',  tag: 'Cash on arrival' },
];

export const listings: Listing[] = [
  {
    id: 'r1',
    name: 'Newroad Café',
    category: 'restaurants',
    cuisine: 'Newari · Continental',
    area: 'Newroad, Kathmandu',
    distanceKm: 0.4,
    priceFrom: 320,
    rating: 4.6,
    reviews: 218,
    photo: 'warm',
    promoted: true,
    verified: true,
    openNow: true,
    status: 'Open · 5 tables free',
    payments: ['eSewa', 'Khalti', 'Cash'],
    tags: ['Authentic food', 'Good value', 'Cosy'],
    pin: { x: 0.32, y: 0.58 },
  },
  {
    id: 'r2',
    name: 'Thakali Kitchen',
    category: 'restaurants',
    cuisine: 'Thakali set',
    area: 'Baneshwor, Kathmandu',
    distanceKm: 1.1,
    priceFrom: 450,
    rating: 4.5,
    reviews: 412,
    photo: 'green',
    verified: true,
    openNow: true,
    status: 'Open · busy at dinner',
    payments: ['eSewa', 'FonePay', 'Cash'],
    tags: ['Family-friendly', 'Generous portions'],
    pin: { x: 0.62, y: 0.34 },
  },
  {
    id: 'r3',
    name: 'Chiya Bari',
    category: 'cafes',
    cuisine: 'Café · tea & light bites',
    area: 'Patan',
    distanceKm: 2.4,
    priceFrom: 220,
    rating: 4.7,
    reviews: 156,
    photo: 'peach',
    verified: true,
    openNow: true,
    status: 'Closes in 30 min',
    payments: ['eSewa', 'Khalti', 'IME Pay'],
    tags: ['Quiet', 'Great chiya'],
    pin: { x: 0.51, y: 0.72 },
  },
  {
    id: 'r4',
    name: 'Momo Hut Express',
    category: 'restaurants',
    cuisine: 'Momos · Fast bites',
    area: 'Thamel, Kathmandu',
    distanceKm: 0.9,
    priceFrom: 180,
    rating: 4.3,
    reviews: 289,
    photo: 'cool',
    openNow: true,
    status: 'Open · 12 covers',
    payments: ['eSewa', 'Cash'],
    tags: ['Cheap', 'Quick'],
    pin: { x: 0.18, y: 0.41 },
  },
  {
    id: 'h1',
    name: 'Hotel Mountain View',
    category: 'hotels',
    cuisine: '3-star · lakeside',
    area: 'Lakeside, Pokhara',
    distanceKm: 0.6,
    priceFrom: 2400,
    rating: 4.6,
    reviews: 521,
    photo: 'bed',
    verified: true,
    openNow: true,
    status: 'Free cancellation · 8 rooms left',
    payments: ['Khalti', 'Card', 'ConnectIPS'],
    tags: ['Lake view', 'Free Wi-Fi', 'Breakfast included'],
    pin: { x: 0.43, y: 0.5 },
  },
  {
    id: 'h2',
    name: 'Lakeside Boutique Inn',
    category: 'hotels',
    cuisine: 'Boutique · 12 rooms',
    area: 'Lakeside, Pokhara',
    distanceKm: 0.8,
    priceFrom: 3200,
    rating: 4.8,
    reviews: 198,
    photo: 'cool',
    verified: true,
    openNow: true,
    status: 'Free cancellation · 3 left',
    payments: ['Khalti', 'eSewa', 'Card'],
    tags: ['Quiet', 'Premium'],
    pin: { x: 0.7, y: 0.6 },
  },
  {
    id: 's1',
    name: 'Glow Salon · Baneshwor',
    category: 'salons',
    cuisine: 'Hair · skin · bridal',
    area: 'New Baneshwor',
    distanceKm: 1.5,
    priceFrom: 350,
    rating: 4.5,
    reviews: 87,
    photo: 'peach',
    verified: true,
    openNow: true,
    status: 'Slots tomorrow 11 AM · 1 PM',
    payments: ['eSewa', 'Khalti', 'Cash'],
    tags: ['Female-only floor', 'Wedding-ready'],
    pin: { x: 0.55, y: 0.45 },
  },
  {
    id: 's2',
    name: "Manju's Beauty Studio",
    category: 'salons',
    cuisine: 'Threading · facial',
    area: 'Butwal',
    distanceKm: 0.9,
    priceFrom: 250,
    rating: 4.4,
    reviews: 53,
    photo: 'warm',
    openNow: true,
    status: 'Walk-ins OK · pay at venue',
    payments: ['Cash', 'eSewa'],
    tags: ['Friendly', 'Affordable'],
    pin: { x: 0.27, y: 0.66 },
  },
];

export const services: { [listingId: string]: ServiceItem[] } = {
  s1: [
    { id: 'svc-1', name: 'Haircut · women', duration: '45 min', price: 600, popular: true },
    { id: 'svc-2', name: 'Threading',        duration: '15 min', price: 180 },
    { id: 'svc-3', name: 'Facial · classic', duration: '60 min', price: 1200 },
    { id: 'svc-4', name: 'Bridal package',   duration: '3 hr',   price: 8500, popular: true },
  ],
  s2: [
    { id: 'svc-1', name: 'Threading',         duration: '10 min', price: 100, popular: true },
    { id: 'svc-2', name: 'Haircut',           duration: '30 min', price: 350 },
    { id: 'svc-3', name: 'Cleanup · classic', duration: '40 min', price: 700 },
  ],
};

export const rooms: { [listingId: string]: RoomType[] } = {
  h1: [
    { id: 'rm-1', name: 'Standard Double', bed: '1 double', guests: 2, pricePerNight: 2400, refundable: true },
    { id: 'rm-2', name: 'Deluxe Lake View', bed: '1 king',  guests: 2, pricePerNight: 3600, refundable: true },
    { id: 'rm-3', name: 'Family Suite',    bed: '1 king + 2 single', guests: 4, pricePerNight: 5400, refundable: false },
  ],
  h2: [
    { id: 'rm-1', name: 'Boutique Queen',  bed: '1 queen', guests: 2, pricePerNight: 3200, refundable: true },
    { id: 'rm-2', name: 'Premier Suite',   bed: '1 king',  guests: 2, pricePerNight: 4900, refundable: true },
  ],
};

export const reviews: { [listingId: string]: Review[] } = {
  r1: [
    {
      id: 'rv-1',
      author: 'Riya G.',
      rating: 5,
      date: '2 weeks ago',
      body: 'Came on a Friday — got a table within 5 mins. Newari thali under Rs. 400, hard to beat.',
      aspects: { food: 5, service: 4, value: 5, ambience: 4 },
    },
    {
      id: 'rv-2',
      author: 'Anish R.',
      rating: 4,
      date: '1 month ago',
      body: 'Authentic flavour. Service slows down on weekends. Worth the wait.',
      aspects: { food: 5, service: 3, value: 4, ambience: 4 },
    },
  ],
  s1: [
    {
      id: 'rv-1',
      author: 'Sujata K.',
      rating: 5,
      date: '1 week ago',
      body: 'Booked the bridal package — Manju was patient through three trial looks.',
      aspects: { service: 5, value: 5, cleanliness: 5 },
      reply: {
        author: 'Glow Salon',
        body: 'Thank you Sujata — wishing you a beautiful wedding day! 💜',
        date: '6 days ago',
      },
    },
  ],
};

export const bookings: Booking[] = [
  {
    id: 'b-1',
    listingId: 'r1',
    listingName: 'Newroad Café',
    category: 'restaurants',
    when: 'Today · 7:30 PM',
    partySize: 4,
    status: 'upcoming',
    price: 0,
    paymentMethod: 'Pay at venue',
    qrPayload: 'najik://booking/b-1',
    photo: 'warm',
  },
  {
    id: 'b-2',
    listingId: 'h1',
    listingName: 'Hotel Mountain View',
    category: 'hotels',
    when: '9 May → 11 May',
    checkIn: '9 May, 2 PM',
    checkOut: '11 May, 11 AM',
    status: 'upcoming',
    price: 4800,
    paymentMethod: 'Khalti',
    qrPayload: 'najik://booking/b-2',
    photo: 'bed',
  },
  {
    id: 'b-3',
    listingId: 's1',
    listingName: 'Glow Salon · Baneshwor',
    category: 'salons',
    when: '12 Apr · 11:00 AM',
    status: 'past',
    price: 600,
    paymentMethod: 'eSewa',
    qrPayload: 'najik://booking/b-3',
    photo: 'peach',
  },
];

export const ownerBookings = [
  { id: 'ob-1', guest: 'Sujata K.',   when: 'Today · 7:30 PM',     status: 'pending'   as const, party: 4, note: 'Birthday — table near window' },
  { id: 'ob-2', guest: 'Anish R.',    when: 'Today · 8:00 PM',     status: 'confirmed' as const, party: 2 },
  { id: 'ob-3', guest: 'Bibek N.',    when: 'Tomorrow · 12:30 PM', status: 'confirmed' as const, party: 6, note: 'Vegetarian' },
  { id: 'ob-4', guest: 'Manju P.',    when: 'Tomorrow · 7:00 PM',  status: 'pending'   as const, party: 3 },
];

/**
 * Stub network helpers — keep the call sites awaiting Promises so swapping
 * to fetch() later is a one-liner.
 */
export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getListings(category?: Category): Promise<Listing[]> {
  await wait(0);
  return category ? listings.filter((l) => l.category === category) : listings;
}
export async function getListing(id: string): Promise<Listing | undefined> {
  await wait(0);
  return listings.find((l) => l.id === id);
}
