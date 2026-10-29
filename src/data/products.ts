export interface Product {
  id: string;
  name: string;
  category: 'bats' | 'gloves' | 'balls' | 'pads' | 'kits';
  pricePKR: number;
  originalPricePKR?: number;
  spec: string;
  image: string;
  badge?: string;
  shortDescription: string;
  features: string[];
  inStock: boolean;
  sizes: string[];
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'bat-01',
    name: 'Pro Master Grade-1 English Willow Bat',
    category: 'bats',
    pricePKR: 28500,
    originalPricePKR: 31000,
    spec: 'Grade 1 English Willow · Lime & White Spiral Grip · Lime 3D Stickers',
    image: '/images/bat-lime-white.jpg',
    badge: 'Best Seller',
    shortDescription: 'Handcrafted from selected cleft English Willow with mid-to-low sweet spot, massive 40mm contoured edges, and custom lime green and white textured spiral grip with matching lime decals.',
    features: [
      'Authentic Grade 1 English Willow cleft with clean straight grains',
      'Massive 39-41mm edges with duckbill toe profile',
      'Vibrant lime green and white spiral rubber grip for maximum traction',
      'Modern lime green & white embossed 3D brand stickers with chrome accents'
    ],
    inStock: true,
    sizes: ['Short Handle (SH) 2.7 lbs', 'Short Handle (SH) 2.8 lbs', 'Short Handle (SH) 2.9 lbs', 'Long Handle (LH)']
  },
  {
    id: 'bat-02',
    name: 'PowerStroke Pro Tour Edition Bat',
    category: 'bats',
    pricePKR: 21500,
    originalPricePKR: 24000,
    spec: 'Seasoned Match Willow · Lime Green & White Grip · 40mm Edges',
    image: '/images/bat-lime-white.jpg',
    badge: 'Club Match',
    shortDescription: 'Powerful tournament bat individually balanced with thick spine profile, lime green & white handle grip, and clean lime aesthetic.',
    features: [
      'Dense air-dried seasoned match willow',
      'Thick power spine with enlarged middle for maximum boundary power',
      'Dual-tone lime green and white grip pre-installed',
      'Includes lime green toe guard protection'
    ],
    inStock: true,
    sizes: ['Short Handle (SH) Standard', 'Long Handle (LH) Extra Reach']
  },
  {
    id: 'bat-03',
    name: 'Gladiator Edition Players Reserve Willow Bat',
    category: 'bats',
    pricePKR: 29500,
    originalPricePKR: 33000,
    spec: 'Players Reserve Willow · Lime & White Foil Stickers · 10+ Grains',
    image: '/images/bat-lime-white.jpg',
    badge: 'Test Grade',
    shortDescription: 'Elite tournament edition bat balance-tuned for competitive cricket matches with lime green and white signature stickers and custom spiral grip.',
    features: [
      'Elite player-grade unbleached English Willow',
      'Minimal concaving with full profile hitting zone',
      'Signature lime green and white laser embossed foil stickers',
      'Includes padded thermal bat cover'
    ],
    inStock: true,
    sizes: ['Short Handle (SH) 2.8 lbs', 'Short Handle (SH) 2.85 lbs']
  },
  {
    id: 'gloves-01',
    name: 'Velocity HD Pro Batting Gloves',
    category: 'gloves',
    pricePKR: 2400,
    originalPricePKR: 2800,
    spec: 'Sheepskin Palm · Lime Green & White HD Armor Fingers',
    image: '/images/gloves-lime-white.jpg',
    badge: 'Pro Choice',
    shortDescription: 'Test-grade batting gloves featuring premium white sheepskin leather palm with high-density lime green and white multi-split finger protection.',
    features: [
      'Genuine white sheepskin leather palm for sensitive bat handle grip',
      'Split finger design with high-density lime green & white HD protection blocks',
      'Double-sided sweat absorbing towelled wristband',
      'Airflow gusset system for cool ventilation during long innings'
    ],
    inStock: true,
    sizes: ['Right Hand - Men', 'Left Hand - Men', 'Right Hand - Youth']
  },
  {
    id: 'gloves-02',
    name: 'Club Match Series Batting Gloves',
    category: 'gloves',
    pricePKR: 1750,
    originalPricePKR: 2100,
    spec: 'Durable Calf Leather · Lime & White Multi-Flex',
    image: '/images/gloves-lime-white.jpg',
    badge: 'Club Grade',
    shortDescription: 'Reliable match gloves for club cricket and academy players providing robust impact protection and flexible feel in lime and white styling.',
    features: [
      'Supple white leather palm with reinforced thumb patch',
      'Padded fingers with lime green protection inserts',
      'Elasticated velcro wrist closure',
      'Breathable mesh knuckles'
    ],
    inStock: true,
    sizes: ['Right Hand - Men', 'Left Hand - Men']
  },
  {
    id: 'balls-01',
    name: 'Test Red 4-Piece Alum Tanned Leather Balls (Pack of 2)',
    category: 'balls',
    pricePKR: 4200,
    originalPricePKR: 4800,
    spec: 'Box of 2 Balls · 4-Piece Hand Stitched · 156g',
    image: '/images/cricket-balls.jpg',
    badge: 'Match Ball',
    shortDescription: 'Official match quality four-piece red leather cricket balls with pronounced 80-stitch seam, wax coated for shape retention and swing.',
    features: [
      'Top-grade alum-tanned dyed cowhide leather',
      'Hand-stitched with rot-proof bonded thread (80+ stitches)',
      'Natural cork core wound with pure wool for uniform bounce',
      'Maintains prominent seam for swing and seam bowlers up to 50 overs'
    ],
    inStock: true,
    sizes: ['Senior Match (156g - 5.5 oz)', 'Box of 2 (Standard Red)']
  },
  {
    id: 'balls-02',
    name: 'Pro County White Leather Balls (Pack of 2)',
    category: 'balls',
    pricePKR: 4500,
    originalPricePKR: 5200,
    spec: 'Box of 2 Balls · White 4-Piece for Day/Night Matches',
    image: '/images/cricket-balls.jpg',
    badge: 'Day/Night',
    shortDescription: 'High-visibility white leather cricket balls engineered for day/night T20 and 50-over hard ball tournaments under floodlights.',
    features: [
      'Specially treated polyurethane-finished white hide',
      'Heavy-duty green seam for sharp track visibility',
      'Waterproofed finish to resist wet evening dews',
      'Consistent 156g weight calibrated to PCB specifications'
    ],
    inStock: true,
    sizes: ['Senior White (156g)', 'Box of 2 (Standard White)']
  },
  {
    id: 'balls-03',
    name: 'Club Practice Heavy Tape-Ball & Training Set (Pack of 6)',
    category: 'balls',
    pricePKR: 2100,
    originalPricePKR: 2600,
    spec: '6-Pack Heavy Training Balls · High Durability Core',
    image: '/images/cricket-balls.jpg',
    badge: 'Training Pack',
    shortDescription: 'Durable heavy-duty cricket training balls suitable for net practice, knockouts, and taped tournament practice sessions.',
    features: [
      'Even flight bounce engineered to mimic hard-ball pace',
      'Wear-resistant rubber compound',
      'Standard 6-pack bundle'
    ],
    inStock: true,
    sizes: ['6-Pack Practice Set']
  },
  {
    id: 'pads-01',
    name: 'Kaboom Vulcan Ultra-Light Batting Leg Guards',
    category: 'pads',
    pricePKR: 7900,
    originalPricePKR: 9200,
    spec: 'Molded High-Density Foam · Ergonomic Knee Cup',
    image: '/images/batting-pads.jpg',
    badge: 'Pro Protection',
    shortDescription: 'Modern lightweight batting pads in crisp white and energetic red/lime trim. Cane-free foam vertical bolsters for lightning fast running between wickets.',
    features: [
      'Ultra high-density lightweight EVA foam construction',
      'Ergonomic pre-curved knee socket with gel bolster',
      'Padded quick-release 50mm calf and ankle straps',
      'Reinforced instep with hard-wearing leatherette pipeline'
    ],
    inStock: true,
    sizes: ['Men Standard (Right Hand)', 'Men Standard (Left Hand)', 'Youth Size']
  },
  {
    id: 'pads-02',
    name: 'Pro Armour Batting Combo Pack (Pads + Thigh Guard + Arm Guard)',
    category: 'pads',
    pricePKR: 11500,
    originalPricePKR: 13500,
    spec: '3-Piece Protective Suite · Pads, Dual Thigh & Arm Guard',
    image: '/images/batting-pads.jpg',
    badge: 'Combo Value',
    shortDescription: 'Complete batsman protection bundle including match-grade batting pads, dual thigh guard with inner groin protector, and padded forearm guard.',
    features: [
      'Full test-grade batting pads with reinforced side wings',
      'Molded dual inner and outer thigh guard combo with towel waistband',
      'Contoured arm guard with moisture-wicking lining',
      'All matching athletic color scheme'
    ],
    inStock: true,
    sizes: ['Men Senior Combo', 'Youth Combo']
  },
  {
    id: 'kits-01',
    name: 'Tour Series Deluxe Cricket Wheelie Kit Bag',
    category: 'kits',
    pricePKR: 9800,
    originalPricePKR: 11500,
    spec: 'Heavy Duty 1680D Cordura · White & Lime Green · Wheelie Bag',
    image: '/images/kit-bag-lime.jpg',
    badge: 'Heavy Duty',
    shortDescription: 'Spacious tournament-ready cricket bag with separate padded internal bat cave, dedicated ventilated shoe compartment, and tractor-tread wheels.',
    features: [
      'Water-resistant 1680D ballistic nylon in athletic white and lime green',
      'Accommodates 2 pairs of pads, helmet, 3 bats, 3 pairs of gloves',
      'Triple all-terrain wheels with reinforced base runner bars',
      'External accessories pockets and heavy duty zippers'
    ],
    inStock: true,
    sizes: ['Full Size Senior (95cm x 38cm x 36cm)']
  },
  {
    id: 'kits-02',
    name: 'Champion Club Full Cricket Gear Combo Kit',
    category: 'kits',
    pricePKR: 39500,
    originalPricePKR: 47000,
    spec: 'Complete 8-Piece Hardball Suite: Bat, Pads, Gloves, Helmet, Bag & More',
    image: '/images/kit-bag-lime.jpg',
    badge: 'Complete Kit',
    shortDescription: 'The ultimate all-in-one cricket kit for club cricketers, academy players, and league debuts. Everything you need to step onto the pitch with confidence.',
    features: [
      '1x Pro Grade English Willow or Seasoned Bat of your choice',
      '1x Pair Ultra-Light Batting Leg Pads',
      '1x Pair Test Leather Batting Gloves',
      '1x Impact-Tested Steel Grille Cricket Helmet',
      '1x Dual Thigh Guard + 1x Abdominal Guard + 1x Arm Guard',
      '1x Heavy-Duty Wheelie Cricket Kit Bag'
    ],
    inStock: true,
    sizes: ['Senior Men Kit', 'Youth Academy Kit']
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Equipment', icon: 'Sparkles', count: 12 },
  { id: 'bats', name: 'Cricket Bats', icon: 'Sword', count: 3, description: 'Grade 1 English & Seasoned Kashmir Willow' },
  { id: 'gloves', name: 'Batting Gloves', icon: 'Hand', count: 2, description: 'Test grade shark-tooth & sheepskin' },
  { id: 'balls', name: 'Leather Balls', icon: 'Circle', count: 3, description: '4-piece match red & white T20 balls' },
  { id: 'pads', name: 'Pads & Protective', icon: 'Shield', count: 2, description: 'Ultra-light guards & combo bundles' },
  { id: 'kits', name: 'Kit Bags & Combos', icon: 'Package', count: 2, description: 'Wheelie tournament bags & full kits' },
] as const;

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Sheikhupura',
  'Jhelum',
  'Mardan',
  'Muzaffarabad (AJK)',
  'Gilgit',
  'Other City / Town'
];
