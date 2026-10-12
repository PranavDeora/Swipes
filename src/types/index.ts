export type ProductCategory = 
  | 'Dresses' 
  | 'Tops' 
  | 'Bottoms' 
  | 'Outerwear' 
  | 'Accessories' 
  | 'Knitwear';

export type FashionAesthetic = 
  | 'Quiet Luxury' 
  | 'Minimalist' 
  | 'Streetwear' 
  | 'Romantic / Bohemian' 
  | 'Parisian Chic' 
  | 'Tailored Classic'
  | 'Y2K / Indie';

export type ProductStatus = 'approved' | 'pending' | 'rejected';

export interface VisualFeatures {
  colorPalette: string[];
  silhouette: string;
  warmth: number; // 0 to 1
  eleganceScore: number; // 0 to 1
  boldnessScore: number; // 0 to 1
}

export interface DemographicAffinities {
  ageMin: number;
  ageMax: number;
  targetGenders: string[];
  studentMatch: boolean;
  colleges?: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: string;
  category: ProductCategory;
  aesthetic: FashionAesthetic;
  imageUrl: string;
  material: string;
  careInstructions: string;
  returnPolicy: string;
  externalUrl: string;
  status: ProductStatus;
  dateAdded: string;
  reviewedBy?: string;
  demographicAffinities: DemographicAffinities;
  visualFeatures: VisualFeatures;
  inStock: boolean;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  dob: string;
  age: number;
  gender: string;
  studentStatus: boolean;
  college: string;
  preferredAesthetics: FashionAesthetic[];
  coins: number;
  stylistTier: string;
}

export type SwipeAction = 'like' | 'dislike' | 'closet' | 'cart';

export interface SwipeInteraction {
  productId: string;
  action: SwipeAction;
  timestamp: number;
  scoreChange: number;
  visualMatchScore: number;
  demographicMatchScore: number;
  combinedMatchScore: number;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  affectedProductIds: string[];
  details: string;
}

export interface BrandInfo {
  name: string;
  tagline: string;
  headquarters: string;
  priceTier: '$$' | '$$$' | '$$$$';
  sustainabilityRating: string;
  website: string;
  signatureStyle: string;
}
