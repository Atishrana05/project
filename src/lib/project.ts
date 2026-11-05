// All project facts sourced from the KB West Walk brochure & price list dated 12 July 2026.

export const BRAND = {
  name: 'KB West Walk',
  developer: 'Shree Kunj Bihariji Realty Pvt. Ltd.',
  website: 'www.kbwestwalk.co',
  tagline: 'Every Step, A Story',
  subheadline:
    'A destination where retail, entertainment, hospitality and modern living come together.',
};

export const CONTACT = {
  phones: ['9560511663', '+91 98731 80237', '+91 98118 89875'],
  whatsapp: '919560511663', // E.164 without + for wa.me
  whatsappDisplay: '+91 95605 11663',
  siteOffice: 'Plot No. C-3, Ecotech-12, Greater Noida West – 201318',
  corporateOffice: 'FF-39, First Floor, KB Complex, Alpha-2, Greater Noida',
  rera: 'UPRERAPRJ422027/01/2026',
  promoterId: 'UPRERAPRM414706',
  upReraUrl: 'https://www.up-rera.in',
  email: 'sales@kbwestwalk.co',
};

export const IMAGES = {
  heroBuilding: '/image.png',
  heroAtrium:
    'https://images.pexels.com/photos/11395484/pexels-photo-11395484.jpeg?auto=compress&cs=tinysrgb&h=1200',
  developerTower: '/image copy.png',
  experience: {
    mall:
      'https://images.pexels.com/photos/2767756/pexels-photo-2767756.jpeg?auto=compress&cs=tinysrgb&h=900',
    atrium:
      'https://images.pexels.com/photos/36776752/pexels-photo-36776752.jpeg?auto=compress&cs=tinysrgb&h=900',
    multiplex:
      'https://images.pexels.com/photos/7991404/pexels-photo-7991404.jpeg?auto=compress&cs=tinysrgb&h=900',
    foodCourt:
      'https://images.pexels.com/photos/2287523/pexels-photo-2287523.jpeg?auto=compress&cs=tinysrgb&h=900',
    studios:
      'https://images.pexels.com/photos/7045363/pexels-photo-7045363.jpeg?auto=compress&cs=tinysrgb&h=900',
    retail:
      'https://images.pexels.com/photos/15306470/pexels-photo-15306470.jpeg?auto=compress&cs=tinysrgb&h=900',
  },
  location:
    'https://images.pexels.com/photos/15059576/pexels-photo-15059576.jpeg?auto=compress&cs=tinysrgb&h=1200',
  locationNight:
    'https://images.pexels.com/photos/2887207/pexels-photo-2887207.jpeg?auto=compress&cs=tinysrgb&h=1200',
};

export const FLOOR_PLANS: { id: string; label: string; image: string }[] = [
  { id: 'lgf-b1', label: 'Lower Ground Floor / Basement-1', image: 'https://images.pexels.com/photos/4458205/pexels-photo-4458205.jpeg?auto=compress&cs=tinysrgb&h=900' },
  { id: 'gf', label: 'Ground Floor', image: 'https://images.pexels.com/photos/4792483/pexels-photo-4792483.jpeg?auto=compress&cs=tinysrgb&h=900' },
  { id: '1f', label: 'First Floor', image: 'https://images.pexels.com/photos/9052461/pexels-photo-9052461.jpeg?auto=compress&cs=tinysrgb&h=900' },
  { id: '2f', label: 'Second Floor', image: 'https://images.pexels.com/photos/4458196/pexels-photo-4458196.jpeg?auto=compress&cs=tinysrgb&h=900' },
  { id: '3f', label: 'Third Floor', image: 'https://images.pexels.com/photos/4458210/pexels-photo-4458210.jpeg?auto=compress&cs=tinysrgb&h=900' },
  { id: '4f', label: 'Fourth Floor (Food Court / Restaurant)', image: 'https://images.pexels.com/photos/4458193/pexels-photo-4458193.jpeg?auto=compress&cs=tinysrgb&h=900' },
  { id: '5f', label: 'Fifth Floor', image: 'https://images.pexels.com/photos/4458205/pexels-photo-4458205.jpeg?auto=compress&cs=tinysrgb&h=900&dpr=2' },
  { id: '7f', label: 'Seventh Floor', image: 'https://images.pexels.com/photos/4792483/pexels-photo-4792483.jpeg?auto=compress&cs=tinysrgb&h=900&dpr=2' },
  { id: 'studio-typical', label: 'Typical Studio Floor', image: 'https://images.pexels.com/photos/9052461/pexels-photo-9052461.jpeg?auto=compress&cs=tinysrgb&h=900&dpr=2' },
];

export type FloorPricing = {
  id: string;
  name: string;
  bsp: number; // per sq ft
  note?: string;
};

export const FLOOR_PRICING: FloorPricing[] = [
  { id: 'lgf', name: 'Lower Ground', bsp: 25900 },
  { id: 'gf', name: 'Ground', bsp: 37900 },
  { id: '1f', name: 'First', bsp: 24900 },
  { id: '2f', name: 'Second', bsp: 20900 },
  { id: '3f', name: 'Third', bsp: 17900 },
  { id: '4f', name: 'Fourth (Food Court / Restaurant)', bsp: 21900 },
  { id: '5f', name: 'Fifth', bsp: 17900 },
  { id: 'studio', name: 'Studios', bsp: 11900 },
];

export const PLC = [
  { id: 'atrium', label: 'Atrium Facing', value: '5% of BSP' },
  { id: '24m', label: '24m Road Facing', value: '5% of BSP' },
  { id: 'corner', label: 'Corner Units', value: '7.5% of BSP' },
  { id: 'corner-130', label: 'Corner + 130m Road Facing', value: '12.5% of BSP' },
  { id: '130', label: '130m Road Facing', value: '10% of BSP' },
  { id: 'studio-atrium', label: 'Studio Atrium Facing', value: '₹150 per sq. ft.' },
  { id: 'studio-130', label: 'Studio 130m Road Facing', value: '₹250 per sq. ft.' },
];

export const ADDITIONAL_CHARGES = [
  { label: 'IFMS', value: '₹100 / sq. ft.' },
  { label: 'EDC', value: '₹100 / sq. ft.' },
  { label: 'IDC', value: '₹100 / sq. ft.' },
  { label: 'FFC', value: '₹100 / sq. ft.' },
  { label: 'One-time Lease Rent', value: '₹600 / sq. ft.' },
  { label: 'Electricity', value: '₹25,000 / KVA' },
  { label: 'Power Backup', value: '₹15,000 / KVA' },
  { label: 'GST / Taxes', value: 'As applicable' },
];

export type PaymentPlan = {
  id: string;
  name: string;
  tagline: string;
  milestones: { label: string; pct: number }[];
};

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'down-payment',
    name: 'Down Payment Plan with Rent Assistance',
    tagline: 'Maximise upfront savings with rent assistance support.',
    milestones: [
      { label: 'Booking', pct: 10 },
      { label: 'Within 60 days', pct: 80 },
      { label: 'On CC Applied', pct: 10 },
    ],
  },
  {
    id: 'special-1',
    name: 'Special Payment Plan 1',
    tagline: 'Balanced 4-stage construction linked plan.',
    milestones: [
      { label: 'Booking', pct: 10 },
      { label: 'Within 60 days', pct: 40 },
      { label: 'On 6th Floor Slab', pct: 25 },
      { label: 'On CC Applied', pct: 25 },
    ],
  },
  {
    id: 'special-2',
    name: 'Special Payment Plan 2',
    tagline: 'Stretched milestones for steady cash flow.',
    milestones: [
      { label: 'Booking', pct: 10 },
      { label: 'Within 60 days', pct: 30 },
      { label: 'On Ground Floor Slab', pct: 20 },
      { label: 'On 6th Floor Slab', pct: 20 },
      { label: 'On CC Applied', pct: 20 },
    ],
  },
  {
    id: 'construction-linked',
    name: 'Construction Linked Plan',
    tagline: 'Pay as the structure rises — slab by slab.',
    milestones: [
      { label: 'Booking', pct: 10 },
      { label: 'Within 60 days', pct: 15 },
      { label: 'Foundation / Plinth', pct: 15 },
      { label: 'Lower Ground Floor Slab', pct: 15 },
      { label: '5th Floor Slab', pct: 10 },
      { label: '10th Floor Slab', pct: 10 },
      { label: '15th Floor Slab', pct: 10 },
      { label: '18th Floor Slab', pct: 10 },
      { label: 'On CC Applied', pct: 5 },
    ],
  },
];

export const LOCATION_ADVANTAGES = [
  { icon: 'Train', title: 'Sector 52 Metro', value: '15-minute drive' },
  { icon: 'Train', title: 'Proposed Ecotech-12 Metro', value: 'Walking distance' },
  { icon: 'Route', title: 'NH-24', value: '10-minute connectivity' },
  { icon: 'Route', title: 'Noida–Greater Noida Expressway', value: '10-minute drive' },
  { icon: 'MapPin', title: 'Crossing Republic', value: '5-minute connectivity' },
  { icon: 'Plane', title: 'Hindon Airport', value: 'Approximately 25 km' },
  { icon: 'Plane', title: 'Jewar International Airport', value: 'Approximately 45-minute drive' },
];

export const NEARBY_HOSPITALS = ['Max Super Speciality Hospital', 'Fortis Hospital', 'Yatharth Hospital'];

export const NEARBY_SCHOOLS = [
  'DPS',
  'Lotus Valley',
  'GD Goenka',
  'Wisdom Tree',
  'Ryan International',
];

export const ENQUIRY_TYPES = [
  { id: 'price_list', label: 'Price List' },
  { id: 'floor_plan', label: 'Floor Plan' },
  { id: 'brochure', label: 'Brochure' },
  { id: 'payment_plan', label: 'Payment Plan' },
  { id: 'site_visit', label: 'Site Visit' },
] as const;

export const FLOOR_OPTIONS = [
  'Lower Ground',
  'Ground',
  'First',
  'Second',
  'Third',
  'Fourth (Food Court / Restaurant)',
  'Fifth',
  'Studios',
];

export const BUDGET_OPTIONS = [
  'Under ₹25 Lakh',
  '₹25 Lakh – ₹50 Lakh',
  '₹50 Lakh – ₹1 Crore',
  '₹1 Crore – ₹2 Crore',
  'Above ₹2 Crore',
];

export const CALLBACK_TIMES = [
  'Morning (9 AM – 12 PM)',
  'Afternoon (12 PM – 3 PM)',
  'Late Afternoon (3 PM – 6 PM)',
  'Evening (6 PM – 8 PM)',
];

export const LEAD_STATUSES = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'site_visit_scheduled', label: 'Site Visit Scheduled' },
  { id: 'closed', label: 'Closed' },
  { id: 'lost', label: 'Lost' },
] as const;

export const inr = (n: number) =>
  '₹' + n.toLocaleString('en-IN');
