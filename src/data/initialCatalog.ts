import { Product, BrandInfo } from '../types';

export const BRANDS: BrandInfo[] = [
  {
    name: 'Reformation',
    tagline: 'Sustainable women’s clothing and effortless silhouettes',
    headquarters: 'Los Angeles, USA',
    priceTier: '$$$',
    sustainabilityRating: 'Climate Neutral Certified',
    website: 'https://www.thereformation.com',
    signatureStyle: 'Feminine drape, silk slips, vintage floral cuts'
  },
  {
    name: 'Aritzia',
    tagline: 'Everyday luxury designed for the modern wardrobe',
    headquarters: 'Vancouver, Canada',
    priceTier: '$$$',
    sustainabilityRating: 'B Corp Verified Supply Chain',
    website: 'https://www.aritzia.com',
    signatureStyle: 'Architectural tailoring, effortless elevated basics'
  },
  {
    name: 'Paloma Wool',
    tagline: 'Experimental art-fashion project from Barcelona',
    headquarters: 'Barcelona, Spain',
    priceTier: '$$$',
    sustainabilityRating: 'Small-batch artisanal production',
    website: 'https://palomawool.com',
    signatureStyle: 'Sculptural knits, expressive prints, Mediterranean ease'
  },
  {
    name: 'COS',
    tagline: 'Reinvented classics and understated wardrobe essentials',
    headquarters: 'London, UK',
    priceTier: '$$',
    sustainabilityRating: '100% Sustainably Sourced Cotton & Wool',
    website: 'https://www.cos.com',
    signatureStyle: 'Clean architectural silhouettes, monochrome volume'
  },
  {
    name: 'Jacquemus',
    tagline: 'Provencal poetry, sun-drenched silhouettes and modern sensuality',
    headquarters: 'Paris, France',
    priceTier: '$$$$',
    sustainabilityRating: 'European artisanal heritage',
    website: 'https://www.jacquemus.com',
    signatureStyle: 'Geometric bags, micro tailoring, Riviera luxury'
  },
  {
    name: 'Stüssy',
    tagline: 'Pioneering California surf & streetwear culture',
    headquarters: 'Irvine, California',
    priceTier: '$$',
    sustainabilityRating: 'Fair Labor Standard',
    website: 'https://www.stussy.com',
    signatureStyle: 'Distressed vintage leathers, relaxed utility denim'
  },
  {
    name: 'Dôen',
    tagline: 'Nostalgic California bohemian heirlooms',
    headquarters: 'Santa Barbara, California',
    priceTier: '$$$',
    sustainabilityRating: 'Women-owned collective & natural dyes',
    website: 'https://www.shopdoen.com',
    signatureStyle: 'Romantic gathers, pastoral eyelets, heritage embroidery'
  },
  {
    name: 'With Jéan',
    tagline: 'Vintage-inspired pieces made for summer days and balmy nights',
    headquarters: 'Sydney, Australia',
    priceTier: '$$',
    sustainabilityRating: 'Ethical small batch factories',
    website: 'https://withjean.com',
    signatureStyle: 'Corset bodices, ruched baby tees, flirty hemlines'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_ref_slip_01',
    name: 'Franklin Emerald Silk Slip Dress',
    brand: 'Reformation',
    price: 298,
    currency: '$',
    category: 'Dresses',
    aesthetic: 'Quiet Luxury',
    imageUrl: '/src/assets/images/fashion_reformation_dress_1791784818150.jpg',
    material: '100% Mulberry Silk Charmeuse (19mm weight)',
    careInstructions: 'Dry clean only. Steam on low heat inside-out.',
    returnPolicy: 'Free 30-day domestic returns with prepaid return shipping label.',
    externalUrl: 'https://www.thereformation.com',
    status: 'approved',
    dateAdded: '2026-10-08',
    reviewedBy: 'Elena Rostova (Lead Curator)',
    description: 'A liquid-drape bias cut slip dress in deep emerald silk with delicate adjustable straps and a graceful ankle-grazing fluted hem.',
    demographicAffinities: {
      ageMin: 20,
      ageMax: 35,
      targetGenders: ['female', 'all'],
      studentMatch: true,
      colleges: ['NYU', 'Parsons', 'Columbia', 'FIT', 'UCLA']
    },
    visualFeatures: {
      colorPalette: ['Emerald Green', 'Deep Forest', 'Gold Accent'],
      silhouette: 'Bias Cut Column Slip',
      warmth: 0.35,
      eleganceScore: 0.94,
      boldnessScore: 0.62
    },
    inStock: true
  },
  {
    id: 'prod_aritzia_blazer_02',
    name: 'The Effortless Linen Oversized Blazer',
    brand: 'Aritzia',
    price: 248,
    currency: '$',
    category: 'Outerwear',
    aesthetic: 'Minimalist',
    imageUrl: '/src/assets/images/fashion_minimalist_blazer_1791784836700.jpg',
    material: '100% French Flax Linen, cupro viscose interior lining',
    careInstructions: 'Dry clean only. Light iron or press cloth.',
    returnPolicy: '14-day refund or 30-day merchandise credit in original condition.',
    externalUrl: 'https://www.aritzia.com',
    status: 'approved',
    dateAdded: '2026-10-09',
    reviewedBy: 'Elena Rostova (Lead Curator)',
    description: 'Double-breasted tailored blazer cut in breathable European linen with structured shoulder pads and genuine horn buttons.',
    demographicAffinities: {
      ageMin: 21,
      ageMax: 36,
      targetGenders: ['female', 'all'],
      studentMatch: true,
      colleges: ['Stanford', 'UCLA', 'NYU', 'Michigan', 'USC']
    },
    visualFeatures: {
      colorPalette: ['Natural Oat', 'Travertine Beige', 'Warm Sand'],
      silhouette: 'Structured Oversized Double-Breasted',
      warmth: 0.45,
      eleganceScore: 0.91,
      boldnessScore: 0.55
    },
    inStock: true
  },
  {
    id: 'prod_stussy_leather_03',
    name: 'Washed Cowhide Aviator Bomber',
    brand: 'Stüssy',
    price: 360,
    currency: '$',
    category: 'Outerwear',
    aesthetic: 'Streetwear',
    imageUrl: '/src/assets/images/fashion_streetwear_leather_1791784849080.jpg',
    material: '100% Genuine Full-Grain Distressed Cowhide Leather, ribbed wool cuffs',
    careInstructions: 'Specialist leather clean only. Store on shaped hanger.',
    returnPolicy: '30-day unworn returns in original branded dust bag packaging.',
    externalUrl: 'https://www.stussy.com',
    status: 'approved',
    dateAdded: '2026-10-07',
    reviewedBy: 'Marcus Vance (Streetwear Editor)',
    description: 'Distressed vintage wash cropped flight jacket featuring two snap flap bellows pockets, antiqued metal zipper, and a supple broken-in hand feel.',
    demographicAffinities: {
      ageMin: 18,
      ageMax: 30,
      targetGenders: ['female', 'all', 'male'],
      studentMatch: true,
      colleges: ['Parsons', 'FIT', 'UT Austin', 'USC', 'Pratt']
    },
    visualFeatures: {
      colorPalette: ['Distressed Dark Umber', 'Aged Brown', 'Washed Brass'],
      silhouette: 'Cropped Boxy Aviator',
      warmth: 0.75,
      eleganceScore: 0.68,
      boldnessScore: 0.89
    },
    inStock: true
  },
  {
    id: 'prod_paloma_skirt_04',
    name: 'Aura Pleated Satin Midi Skirt',
    brand: 'Paloma Wool',
    price: 210,
    currency: '$',
    category: 'Bottoms',
    aesthetic: 'Parisian Chic',
    imageUrl: '/src/assets/images/fashion_silk_midi_skirt_1791784861333.jpg',
    material: '92% Heavy Weight Acetate Satin, 8% Elastane',
    careInstructions: 'Hand wash cold or gentle machine cycle. Dry flat away from direct sun.',
    returnPolicy: '14-day exchange or store credit for EU and International deliveries.',
    externalUrl: 'https://palomawool.com',
    status: 'approved',
    dateAdded: '2026-10-10',
    reviewedBy: 'Elena Rostova (Lead Curator)',
    description: 'Accordion pleated satin skirt with sunburst fluid drape that catches the light as you move. Concealed elasticized waistband.',
    demographicAffinities: {
      ageMin: 19,
      ageMax: 32,
      targetGenders: ['female', 'all'],
      studentMatch: true,
      colleges: ['NYU', 'Parsons', 'Columbia', 'Berkeley']
    },
    visualFeatures: {
      colorPalette: ['Champagne Pearl', 'Warm Biscuit', 'Gold Reflect'],
      silhouette: 'Fluted Pleated A-Line Midi',
      warmth: 0.3,
      eleganceScore: 0.88,
      boldnessScore: 0.58
    },
    inStock: true
  },
  {
    id: 'prod_cos_cardigan_05',
    name: 'Pure Cashmere Chunky Ribbed Knit',
    brand: 'COS',
    price: 275,
    currency: '$',
    category: 'Knitwear',
    aesthetic: 'Quiet Luxury',
    imageUrl: '/src/assets/images/fashion_knit_cardigan_1791784872717.jpg',
    material: '100% GOTS-Certified Mongolian Cashmere (7-gauge rib)',
    careInstructions: 'Hand wash with cashmere shampoo. Lay flat on dry towel to dry.',
    returnPolicy: '30-day in-store or postal return with tags attached.',
    externalUrl: 'https://www.cos.com',
    status: 'approved',
    dateAdded: '2026-10-09',
    reviewedBy: 'Elena Rostova (Lead Curator)',
    description: 'Substantial chunky crewneck knit woven from ethically combed cashmere yarns, featuring dropped shoulders and clean tubular hems.',
    demographicAffinities: {
      ageMin: 22,
      ageMax: 35,
      targetGenders: ['female', 'all'],
      studentMatch: true,
      colleges: ['Harvard', 'MIT', 'Stanford', 'NYU', 'Yale']
    },
    visualFeatures: {
      colorPalette: ['Oat Milk White', 'Soft Cream', 'Alabaster'],
      silhouette: 'Relaxed Heavyweight Crewneck',
      warmth: 0.85,
      eleganceScore: 0.92,
      boldnessScore: 0.35
    },
    inStock: true
  },
  {
    id: 'prod_aritzia_trousers_06',
    name: 'Agency Pleated Tailored Wool Trousers',
    brand: 'Aritzia',
    price: 178,
    currency: '$',
    category: 'Bottoms',
    aesthetic: 'Tailored Classic',
    imageUrl: '/src/assets/images/fashion_wide_trousers_1791784905750.jpg',
    material: '98% Italian Virgin Wool, 2% Elastane for natural give',
    careInstructions: 'Dry clean only. Medium iron with press cloth.',
    returnPolicy: '14-day online return window with complimentary postal return label.',
    externalUrl: 'https://www.aritzia.com',
    status: 'approved',
    dateAdded: '2026-10-08',
    reviewedBy: 'Marcus Vance (Streetwear Editor)',
    description: 'High-waisted wide-leg trousers tailored with deep front pleats, slant pockets, and a clean hook-and-bar fly closure.',
    demographicAffinities: {
      ageMin: 20,
      ageMax: 35,
      targetGenders: ['female', 'all'],
      studentMatch: true,
      colleges: ['Columbia', 'NYU', 'Stanford', 'USC', 'Michigan']
    },
    visualFeatures: {
      colorPalette: ['Charcoal Heather', 'Slate Grey', 'Graphite'],
      silhouette: 'High-Rise Wide Leg Pleated',
      warmth: 0.6,
      eleganceScore: 0.89,
      boldnessScore: 0.42
    },
    inStock: true
  },
  {
    id: 'prod_jacquemus_bag_07',
    name: 'Le Grand Chiquito Top-Handle Box Bag',
    brand: 'Jacquemus',
    price: 890,
    currency: '$',
    category: 'Accessories',
    aesthetic: 'Quiet Luxury',
    imageUrl: '/src/assets/images/fashion_leather_bag_1791784918012.jpg',
    material: '100% Smooth Italian Calfskin Leather, gold-finish zinc alloy hardware',
    careInstructions: 'Wipe with soft micro-fiber cloth. Store in cotton dust bag.',
    returnPolicy: '14-day international returns with security ribbon intact.',
    externalUrl: 'https://www.jacquemus.com',
    status: 'approved',
    dateAdded: '2026-10-06',
    reviewedBy: 'Elena Rostova (Lead Curator)',
    description: 'Architectural structured top handle bag with magnetic flap closure, interior pocket, and detachable leather shoulder strap with gold lobster clasps.',
    demographicAffinities: {
      ageMin: 22,
      ageMax: 38,
      targetGenders: ['female', 'all'],
      studentMatch: false,
      colleges: ['Parsons', 'Columbia', 'NYU', 'FIT']
    },
    visualFeatures: {
      colorPalette: ['Obsidian Black', 'Brushed Gold', 'Deep Ebony'],
      silhouette: 'Geometric Structured Box Trapezoid',
      warmth: 0.1,
      eleganceScore: 0.98,
      boldnessScore: 0.78
    },
    inStock: true
  },
  {
    id: 'prod_doen_trench_08',
    name: 'Kensington Heritage Double-Breasted Trench',
    brand: 'Dôen',
    price: 498,
    currency: '$',
    category: 'Outerwear',
    aesthetic: 'Tailored Classic',
    imageUrl: '/src/assets/images/fashion_trench_coat_1791784928828.jpg',
    material: '100% Water-Resistant Cotton Gabardine, horn buckles',
    careInstructions: 'Dry clean only. Reproof water-repellent coating annually.',
    returnPolicy: '30-day return policy on unworn items with tags attached.',
    externalUrl: 'https://www.shopdoen.com',
    status: 'approved',
    dateAdded: '2026-10-05',
    reviewedBy: 'Elena Rostova (Lead Curator)',
    description: 'Sweeping flared double-breasted trench in rich honey caramel with exaggerated storm flaps, raglan sleeves, and a belted cinched waist.',
    demographicAffinities: {
      ageMin: 22,
      ageMax: 38,
      targetGenders: ['female', 'all'],
      studentMatch: true,
      colleges: ['Yale', 'Georgetown', 'Berkeley', 'NYU']
    },
    visualFeatures: {
      colorPalette: ['Honey Caramel', 'Warm Amber', 'Tortoiseshell'],
      silhouette: 'Flared Flapped Double-Breasted Maxi Trench',
      warmth: 0.65,
      eleganceScore: 0.95,
      boldnessScore: 0.7
    },
    inStock: true
  },
  // Additional items in "pending" status to showcase Admin catalog ingestion & review workflow
  {
    id: 'prod_withjean_top_09',
    name: 'Isabelle Ruched Corset Top',
    brand: 'With Jéan',
    price: 189,
    currency: '$',
    category: 'Tops',
    aesthetic: 'Romantic / Bohemian',
    imageUrl: '/src/assets/images/fashion_reformation_dress_1791784818150.jpg',
    material: '100% Cotton Poplin, structured boning through bodice',
    careInstructions: 'Cold gentle hand wash. Do not tumble dry.',
    returnPolicy: '14-day store credit on full-price merchandise.',
    externalUrl: 'https://withjean.com',
    status: 'pending',
    dateAdded: '2026-10-11',
    description: 'Underwire bustier top with gathered sweetheart neckline and delicate cap sleeves. Needs image review before publication.',
    demographicAffinities: {
      ageMin: 18,
      ageMax: 26,
      targetGenders: ['female', 'all'],
      studentMatch: true,
      colleges: ['USC', 'UCLA', 'Miami', 'FIT']
    },
    visualFeatures: {
      colorPalette: ['Antique Bone', 'Pollen Yellow'],
      silhouette: 'Cropped Structured Corset Bodice',
      warmth: 0.2,
      eleganceScore: 0.79,
      boldnessScore: 0.82
    },
    inStock: true
  },
  {
    id: 'prod_paloma_knit_10',
    name: 'Valentin Swirl Open-Back Halter Knit',
    brand: 'Paloma Wool',
    price: 165,
    currency: '$',
    category: 'Tops',
    aesthetic: 'Y2K / Indie',
    imageUrl: '/src/assets/images/fashion_silk_midi_skirt_1791784861333.jpg',
    material: '80% Viscose, 20% Polyamide stretch knit yarn',
    careInstructions: 'Hand wash cold with mild detergent.',
    returnPolicy: '14-day exchange or refund for unused items.',
    externalUrl: 'https://palomawool.com',
    status: 'pending',
    dateAdded: '2026-10-11',
    description: 'Graphic engineered swirl halter top with exposed low back and high neck tie. Pending metadata verification.',
    demographicAffinities: {
      ageMin: 18,
      ageMax: 28,
      targetGenders: ['female', 'all'],
      studentMatch: true,
      colleges: ['NYU', 'Parsons', 'Pratt', 'RISD']
    },
    visualFeatures: {
      colorPalette: ['Sage Swirl', 'Moss Green', 'Warm Cream'],
      silhouette: 'Halterneck Low Back Cutout',
      warmth: 0.25,
      eleganceScore: 0.74,
      boldnessScore: 0.88
    },
    inStock: true
  },
  {
    id: 'prod_unapproved_sample_11',
    name: 'Prototype Synthetic Sheer Mesh Layer',
    brand: 'Stüssy',
    price: 95,
    currency: '$',
    category: 'Tops',
    aesthetic: 'Streetwear',
    imageUrl: '/src/assets/images/fashion_streetwear_leather_1791784849080.jpg',
    material: '100% Polyester Mesh (Failed sustainable threshold test)',
    careInstructions: 'Machine wash delicate cold.',
    returnPolicy: 'Final sale item.',
    externalUrl: 'https://www.stussy.com',
    status: 'rejected',
    dateAdded: '2026-10-04',
    reviewedBy: 'Elena Rostova (Lead Curator)',
    description: 'Sample rejected due to material sustainability policy violation and incomplete vendor size chart.',
    demographicAffinities: {
      ageMin: 18,
      ageMax: 25,
      targetGenders: ['female', 'all'],
      studentMatch: true,
      colleges: ['USC', 'Parsons']
    },
    visualFeatures: {
      colorPalette: ['Charcoal Black'],
      silhouette: 'Skin-tight Mesh Long Sleeve',
      warmth: 0.1,
      eleganceScore: 0.5,
      boldnessScore: 0.9
    },
    inStock: false
  }
];

export const DEFAULT_USER_PROFILE = {
  id: 'usr_shazlo_001',
  name: 'Maya Lin',
  dob: '2003-05-18',
  age: 23,
  gender: 'Female',
  studentStatus: true,
  college: 'Parsons School of Design',
  preferredAesthetics: ['Quiet Luxury', 'Minimalist', 'Parisian Chic'] as any[],
  coins: 18,
  stylistTier: 'Curator'
};
