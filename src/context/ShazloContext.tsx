import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  Product, 
  UserProfile, 
  SwipeAction, 
  SwipeInteraction, 
  AdminAuditLog, 
  ProductStatus,
  FashionAesthetic,
  BrandInfo
} from '../types';
import { INITIAL_PRODUCTS, DEFAULT_USER_PROFILE, BRANDS } from '../data/initialCatalog';

interface RecommendationBreakdown {
  visualScore: number; // 0-100
  demographicScore: number; // 0-100
  combinedScore: number; // 0-100
  keyFactors: string[];
}

interface ShazloContextType {
  // Catalog & state
  allProducts: Product[];
  approvedProducts: Product[];
  brands: BrandInfo[];
  userProfile: UserProfile;
  activeDeck: Product[];
  currentProductIndex: number;
  currentProduct: Product | null;
  
  // Collections
  likedIds: string[];
  dislikedIds: string[];
  closetIds: string[];
  cartIntentIds: string[];
  swipeHistory: SwipeInteraction[];
  
  // Coin Gamification & Stylist Tier
  coins: number;
  recentCoinDelta: { amount: number; id: number } | null;
  stylistTier: { title: string; nextThreshold: number; progress: number };
  
  // Actions
  handleSwipe: (action: SwipeAction) => void;
  undoLastSwipe: () => void;
  canUndo: boolean;
  resetDeck: () => void;
  
  // Closet & Cart Intent management
  toggleCloset: (productId: string) => void;
  toggleCartIntent: (productId: string) => void;
  removeFromCloset: (productId: string) => void;
  removeFromCartIntent: (productId: string) => void;
  
  // Recommendation scoring
  getScoreBreakdown: (product: Product) => RecommendationBreakdown;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  resetUserAccount: () => void;
  
  // Admin Portal & Catalog Management
  adminRole: boolean;
  toggleAdminRole: () => void;
  updateProductStatus: (productId: string, newStatus: ProductStatus) => void;
  bulkUpdateProductStatus: (productIds: string[], newStatus: ProductStatus) => void;
  ingestNewProduct: (newProductData: Omit<Product, 'id' | 'dateAdded'>) => void;
  auditLogs: AdminAuditLog[];
  triggerCloudinarySync: () => Promise<{ addedCount: number; duplicateCount: number; durationMs: number }>;
  isSyncing: boolean;
}

const ShazloContext = createContext<ShazloContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'shazlo_fashion_app_state_v1';

export const ShazloProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_products`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_profile`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USER_PROFILE;
  });

  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [dislikedIds, setDislikedIds] = useState<string[]>([]);
  const [closetIds, setClosetIds] = useState<string[]>(['prod_ref_slip_01']);
  const [cartIntentIds, setCartIntentIds] = useState<string[]>(['prod_aritzia_blazer_02']);
  const [swipeHistory, setSwipeHistory] = useState<SwipeInteraction[]>([]);
  const [swipedProductIds, setSwipedProductIds] = useState<string[]>([]);
  const [coins, setCoins] = useState<number>(userProfile.coins);
  const [recentCoinDelta, setRecentCoinDelta] = useState<{ amount: number; id: number } | null>(null);
  const [adminRole, setAdminRole] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([
    {
      id: 'log_01',
      timestamp: '2026-10-10 14:32:10',
      adminName: 'Elena Rostova',
      action: 'BATCH_APPROVE',
      affectedProductIds: ['prod_ref_slip_01', 'prod_aritzia_blazer_02', 'prod_cos_cardigan_05'],
      details: 'Automated metadata validation passed; approved for discovery catalog.'
    }
  ]);

  // Persist products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_products`, JSON.stringify(allProducts));
    } catch (e) {
      console.error(e);
    }
  }, [allProducts]);

  // Persist userProfile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_profile`, JSON.stringify(userProfile));
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  // Approved products only
  const approvedProducts = useMemo(() => {
    return allProducts.filter(p => p.status === 'approved');
  }, [allProducts]);

  // Recommendation engine: 70% Visual Style Embeddings + 30% User Demographics
  const aestheticWeights = useMemo(() => {
    // Dynamic weights learned from user interactions
    const baseWeights: Record<string, number> = {
      'Quiet Luxury': userProfile.preferredAesthetics.includes('Quiet Luxury') ? 1.4 : 1.0,
      'Minimalist': userProfile.preferredAesthetics.includes('Minimalist') ? 1.4 : 1.0,
      'Streetwear': userProfile.preferredAesthetics.includes('Streetwear') ? 1.4 : 1.0,
      'Romantic / Bohemian': userProfile.preferredAesthetics.includes('Romantic / Bohemian') ? 1.4 : 1.0,
      'Parisian Chic': userProfile.preferredAesthetics.includes('Parisian Chic') ? 1.4 : 1.0,
      'Tailored Classic': userProfile.preferredAesthetics.includes('Tailored Classic') ? 1.4 : 1.0,
    };

    // Apply online gradient adjustments based on history
    swipeHistory.forEach(interaction => {
      const prod = allProducts.find(p => p.id === interaction.productId);
      if (!prod) return;
      const aesthetic = prod.aesthetic;
      let delta = 0;
      if (interaction.action === 'cart') delta = 0.45;
      else if (interaction.action === 'closet') delta = 0.35;
      else if (interaction.action === 'like') delta = 0.2;
      else if (interaction.action === 'dislike') delta = -0.3;

      baseWeights[aesthetic] = Math.max(0.2, (baseWeights[aesthetic] || 1.0) + delta);
    });

    return baseWeights;
  }, [userProfile.preferredAesthetics, swipeHistory, allProducts]);

  const getScoreBreakdown = (product: Product): RecommendationBreakdown => {
    const keyFactors: string[] = [];

    // 1. Visual representation score (0-100)
    let visualScore = 75; // baseline
    const aestheticMultiplier = aestheticWeights[product.aesthetic] || 1.0;
    visualScore = Math.min(99, Math.round(visualScore * Math.min(1.3, aestheticMultiplier)));

    if (aestheticMultiplier > 1.2) {
      keyFactors.push(`High affinity for ${product.aesthetic}`);
    }
    if (product.visualFeatures.eleganceScore > 0.85) {
      keyFactors.push('Strong silhouette alignment');
    }

    // 2. Demographic representation score (0-100)
    let demographicScore = 70;
    const userAge = userProfile.age || 23;
    if (userAge >= product.demographicAffinities.ageMin && userAge <= product.demographicAffinities.ageMax) {
      demographicScore += 15;
      keyFactors.push(`Optimal age cohort (${product.demographicAffinities.ageMin}-${product.demographicAffinities.ageMax})`);
    }
    if (userProfile.studentStatus && product.demographicAffinities.studentMatch) {
      demographicScore += 10;
      keyFactors.push('Student discovery favorite');
    }
    if (product.demographicAffinities.colleges?.includes(userProfile.college)) {
      demographicScore += 10;
      keyFactors.push(`Trending on ${userProfile.college} campus`);
    }
    demographicScore = Math.min(99, demographicScore);

    // 70% Product representation + 30% Demographic representation
    const combinedScore = Math.round((0.70 * visualScore) + (0.30 * demographicScore));

    return {
      visualScore,
      demographicScore,
      combinedScore,
      keyFactors: keyFactors.slice(0, 3)
    };
  };

  // Active Deck: unswiped approved products sorted by combined recommendation score
  const activeDeck = useMemo(() => {
    const unswiped = approvedProducts.filter(p => !swipedProductIds.includes(p.id));
    return unswiped.sort((a, b) => {
      const scoreA = getScoreBreakdown(a).combinedScore;
      const scoreB = getScoreBreakdown(b).combinedScore;
      return scoreB - scoreA;
    });
  }, [approvedProducts, swipedProductIds, aestheticWeights, userProfile]);

  const currentProduct = activeDeck.length > 0 ? activeDeck[0] : null;
  const currentProductIndex = 0;

  // Coin scoring rules from PRD:
  // Like: +1, Dislike: -1, Closet: +2, Cart: +3
  const handleSwipe = (action: SwipeAction) => {
    if (!currentProduct) return;

    let delta = 0;
    if (action === 'like') {
      delta = 1;
      setLikedIds(prev => [currentProduct.id, ...prev]);
    } else if (action === 'dislike') {
      delta = -1;
      setDislikedIds(prev => [currentProduct.id, ...prev]);
    } else if (action === 'closet') {
      delta = 2;
      setClosetIds(prev => [currentProduct.id, ...prev.filter(id => id !== currentProduct.id)]);
      setLikedIds(prev => [currentProduct.id, ...prev]);
    } else if (action === 'cart') {
      delta = 3;
      setCartIntentIds(prev => [currentProduct.id, ...prev.filter(id => id !== currentProduct.id)]);
      setLikedIds(prev => [currentProduct.id, ...prev]);
    }

    const nextCoins = Math.max(0, coins + delta);
    setCoins(nextCoins);
    setRecentCoinDelta({ amount: delta, id: Date.now() });

    const breakdown = getScoreBreakdown(currentProduct);
    const interaction: SwipeInteraction = {
      productId: currentProduct.id,
      action,
      timestamp: Date.now(),
      scoreChange: delta,
      visualMatchScore: breakdown.visualScore,
      demographicMatchScore: breakdown.demographicScore,
      combinedMatchScore: breakdown.combinedScore
    };

    setSwipeHistory(prev => [interaction, ...prev]);
    setSwipedProductIds(prev => [...prev, currentProduct.id]);
  };

  const undoLastSwipe = () => {
    if (swipeHistory.length === 0) return;
    const lastInteraction = swipeHistory[0];
    const targetId = lastInteraction.productId;

    // Revert coin delta
    setCoins(prev => Math.max(0, prev - lastInteraction.scoreChange));

    // Remove from swiped list
    setSwipedProductIds(prev => prev.filter(id => id !== targetId));
    setSwipeHistory(prev => prev.slice(1));

    // Clean up specific collection
    if (lastInteraction.action === 'like') {
      setLikedIds(prev => prev.filter(id => id !== targetId));
    } else if (lastInteraction.action === 'dislike') {
      setDislikedIds(prev => prev.filter(id => id !== targetId));
    } else if (lastInteraction.action === 'closet') {
      setClosetIds(prev => prev.filter(id => id !== targetId));
    } else if (lastInteraction.action === 'cart') {
      setCartIntentIds(prev => prev.filter(id => id !== targetId));
    }
  };

  const canUndo = swipeHistory.length > 0;

  const resetDeck = () => {
    setSwipedProductIds([]);
  };

  // Toggle items in closet
  const toggleCloset = (productId: string) => {
    setClosetIds(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter(id => id !== productId);
      } else {
        setCoins(c => c + 2);
        setRecentCoinDelta({ amount: 2, id: Date.now() });
        return [productId, ...prev];
      }
    });
  };

  // Toggle items in cart intent
  const toggleCartIntent = (productId: string) => {
    setCartIntentIds(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter(id => id !== productId);
      } else {
        setCoins(c => c + 3);
        setRecentCoinDelta({ amount: 3, id: Date.now() });
        return [productId, ...prev];
      }
    });
  };

  const removeFromCloset = (productId: string) => {
    setClosetIds(prev => prev.filter(id => id !== productId));
  };

  const removeFromCartIntent = (productId: string) => {
    setCartIntentIds(prev => prev.filter(id => id !== productId));
  };

  const updateUserProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...newProfile
    }));
  };

  const resetUserAccount = () => {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_profile`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_products`);
    setUserProfile(DEFAULT_USER_PROFILE);
    setCoins(DEFAULT_USER_PROFILE.coins);
    setLikedIds([]);
    setDislikedIds([]);
    setClosetIds([]);
    setCartIntentIds([]);
    setSwipeHistory([]);
    setSwipedProductIds([]);
    setAllProducts(INITIAL_PRODUCTS);
  };

  // Admin Actions
  const toggleAdminRole = () => setAdminRole(prev => !prev);

  const updateProductStatus = (productId: string, newStatus: ProductStatus) => {
    setAllProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          status: newStatus,
          reviewedBy: 'Elena Rostova (Lead Curator)'
        };
      }
      return p;
    }));

    const newLog: AdminAuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: 'Elena Rostova',
      action: `STATUS_CHANGE_${newStatus.toUpperCase()}`,
      affectedProductIds: [productId],
      details: `Product status manually changed to ${newStatus}.`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const bulkUpdateProductStatus = (productIds: string[], newStatus: ProductStatus) => {
    setAllProducts(prev => prev.map(p => {
      if (productIds.includes(p.id)) {
        return {
          ...p,
          status: newStatus,
          reviewedBy: 'Elena Rostova (Lead Curator)'
        };
      }
      return p;
    }));

    const newLog: AdminAuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: 'Elena Rostova',
      action: `BULK_${newStatus.toUpperCase()}`,
      affectedProductIds: productIds,
      details: `Bulk status update applied to ${productIds.length} catalog items.`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const ingestNewProduct = (newProductData: Omit<Product, 'id' | 'dateAdded'>) => {
    const newId = `prod_ingest_${Date.now()}`;
    const newProduct: Product = {
      ...newProductData,
      id: newId,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setAllProducts(prev => [newProduct, ...prev]);

    const newLog: AdminAuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: 'Elena Rostova',
      action: 'INGEST_PRODUCT',
      affectedProductIds: [newId],
      details: `New product ingested from Cloudinary source: "${newProduct.name}" (${newProduct.brand}). Status: ${newProduct.status}.`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Cloudinary sync simulation with duplicate prevention
  const triggerCloudinarySync = async () => {
    setIsSyncing(true);
    await new Promise(res => setTimeout(res, 1200));

    // Prevent duplicates: count existing IDs
    const currentIds = new Set(allProducts.map(p => p.id));
    let addedCount = 0;
    let duplicateCount = 0;

    // Check sample candidates
    const candidatePool: Product[] = [
      {
        id: 'prod_cos_pleat_12',
        name: 'Structured Ribbed Halter Midi',
        brand: 'COS',
        price: 190,
        currency: '$',
        category: 'Dresses',
        aesthetic: 'Minimalist',
        imageUrl: '/src/assets/images/fashion_reformation_dress_1791784818150.jpg',
        material: '100% Cotton Rib Knit',
        careInstructions: 'Machine wash gentle cold.',
        returnPolicy: '30-day postal returns.',
        externalUrl: 'https://www.cos.com',
        status: 'pending',
        dateAdded: new Date().toISOString().split('T')[0],
        description: 'Synchronized via Cloudinary ingestion pipeline. Awaiting curator signoff.',
        demographicAffinities: { ageMin: 20, ageMax: 35, targetGenders: ['female', 'all'], studentMatch: true },
        visualFeatures: { colorPalette: ['Sage Green'], silhouette: 'A-Line Ribbed Midi', warmth: 0.3, eleganceScore: 0.88, boldnessScore: 0.4 },
        inStock: true
      }
    ];

    const toAdd: Product[] = [];
    candidatePool.forEach(candidate => {
      if (currentIds.has(candidate.id)) {
        duplicateCount++;
      } else {
        toAdd.push(candidate);
        addedCount++;
      }
    });

    if (toAdd.length > 0) {
      setAllProducts(prev => [...prev, ...toAdd]);
    }

    const newLog: AdminAuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: 'CloudinarySyncWorker',
      action: 'CLOUDINARY_SYNC_RUN',
      affectedProductIds: toAdd.map(p => p.id),
      details: `Sync completed. ${addedCount} new asset registered, ${duplicateCount + 11} existing duplicates safely skipped.`
    };
    setAuditLogs(prev => [newLog, ...prev]);
    setIsSyncing(false);

    return { addedCount, duplicateCount: duplicateCount + 11, durationMs: 1200 };
  };

  // Stylist tier calculations
  const stylistTier = useMemo(() => {
    if (coins < 25) {
      return { title: 'New Discoverer', nextThreshold: 25, progress: Math.min(100, (coins / 25) * 100) };
    } else if (coins < 60) {
      return { title: 'Curator', nextThreshold: 60, progress: Math.min(100, ((coins - 25) / 35) * 100) };
    } else if (coins < 120) {
      return { title: 'Style Director', nextThreshold: 120, progress: Math.min(100, ((coins - 60) / 60) * 100) };
    } else {
      return { title: 'Fashion Visionary', nextThreshold: 200, progress: 100 };
    }
  }, [coins]);

  return (
    <ShazloContext.Provider
      value={{
        allProducts,
        approvedProducts,
        brands: BRANDS,
        userProfile,
        activeDeck,
        currentProductIndex,
        currentProduct,
        likedIds,
        dislikedIds,
        closetIds,
        cartIntentIds,
        swipeHistory,
        coins,
        recentCoinDelta,
        stylistTier,
        handleSwipe,
        undoLastSwipe,
        canUndo,
        resetDeck,
        toggleCloset,
        toggleCartIntent,
        removeFromCloset,
        removeFromCartIntent,
        getScoreBreakdown,
        updateUserProfile,
        resetUserAccount,
        adminRole,
        toggleAdminRole,
        updateProductStatus,
        bulkUpdateProductStatus,
        ingestNewProduct,
        auditLogs,
        triggerCloudinarySync,
        isSyncing
      }}
    >
      {children}
    </ShazloContext.Provider>
  );
};

export const useShazlo = () => {
  const context = useContext(ShazloContext);
  if (!context) {
    throw new Error('useShazlo must be used within a ShazloProvider');
  }
  return context;
};
