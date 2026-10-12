import React, { useState } from 'react';
import { ShazloProvider, useShazlo } from './context/ShazloContext';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { DeckView } from './components/DeckView';
import { DigitalClosetView } from './components/DigitalClosetView';
import { CartIntentView } from './components/CartIntentView';
import { BrandDirectoryView } from './components/BrandDirectoryView';
import { AdminPortalView } from './components/AdminPortalView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ShareModal } from './components/ShareModal';
import { RecommendationExplainerModal } from './components/RecommendationExplainerModal';
import { Product } from './types';
import { Sparkles, Bookmark, ShoppingBag, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

function ShazloAppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('discover');
  
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAlgorithmOpen, setIsAlgorithmOpen] = useState(false);
  const [shareConfig, setShareConfig] = useState<{
    isOpen: boolean;
    product?: Product | null;
    isClosetShare?: boolean;
    closetCount?: number;
  }>({ isOpen: false });

  const { 
    userProfile, 
    coins, 
    stylistTier, 
    closetIds, 
    cartIntentIds, 
    allProducts, 
    adminRole, 
    toggleAdminRole,
    approvedProducts
  } = useShazlo();

  const handleShareProduct = (product: Product) => {
    setShareConfig({
      isOpen: true,
      product,
      isClosetShare: false
    });
  };

  const handleShareCloset = () => {
    setShareConfig({
      isOpen: true,
      isClosetShare: true,
      closetCount: closetIds.length
    });
  };

  const recentClosetItems = allProducts.filter(p => closetIds.includes(p.id)).slice(0, 3);
  const recentCartItems = allProducts.filter(p => cartIntentIds.includes(p.id)).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col selection:bg-stone-900 selection:text-white">
      {/* Universal Top Bar */}
      <Header
        activeTab={activeTab}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAlgorithm={() => setIsAlgorithmOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'discover' && (
          <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            {/* Desktop Left Rail: Stylist Vector & Telemetry (Hidden on mobile) */}
            <aside className="hidden lg:block lg:col-span-3 space-y-4 sticky top-20">
              <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
                    {userProfile.name[0]}
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-stone-900 leading-tight">
                      {userProfile.name}
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      {userProfile.college || 'Fashion Enthusiast'}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>Curator Rank</span>
                    <span className="font-semibold text-stone-900">{stylistTier.title}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Coins Balance</span>
                    <span className="font-mono font-bold text-amber-700">{coins}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Model Ratio</span>
                    <span className="font-medium text-stone-900">70% Visual · 30% Profile</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsAlgorithmOpen(true)}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-[11px] font-semibold text-stone-700 transition-colors border border-stone-200 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Inspect Recommendation Weights</span>
                </button>
              </div>

              {/* Aesthetic Affinities */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
                <span className="block text-[11px] uppercase tracking-wider font-bold text-stone-400">
                  Calibrated Aesthetics
                </span>
                <div className="space-y-2 text-xs">
                  {userProfile.preferredAesthetics.map(aesthetic => (
                    <div key={aesthetic} className="flex items-center justify-between">
                      <span className="text-stone-700">{aesthetic}</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                        High Fit
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Central Discovery Swipe Stack */}
            <section className="w-full lg:col-span-6 flex flex-col items-center">
              <DeckView
                onOpenDetails={(p) => setSelectedProduct(p)}
                onShare={handleShareProduct}
                onNavigateToCloset={() => setActiveTab('closet')}
              />
            </section>

            {/* Desktop Right Rail: Digital Closet & Cart Intent Mini Rail (Hidden on mobile) */}
            <aside className="hidden lg:block lg:col-span-3 space-y-4 sticky top-20">
              {/* Mini Closet Preview */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                    <Bookmark className="w-4 h-4 text-amber-600" />
                    <span>Closet Quick View</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('closet')}
                    className="text-[11px] font-semibold text-stone-500 hover:text-stone-900"
                  >
                    All ({closetIds.length}) →
                  </button>
                </div>

                {recentClosetItems.length === 0 ? (
                  <p className="text-xs text-stone-400 italic py-2">
                    Swipe down on pieces to save to your digital closet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {recentClosetItems.map(item => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedProduct(item)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-12 object-cover rounded-lg bg-stone-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-stone-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-stone-500 font-mono">
                            ${item.price} · {item.brand}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mini Cart Intent Preview */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                    <ShoppingBag className="w-4 h-4 text-indigo-600" />
                    <span>Cart Intent Queue</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('cart')}
                    className="text-[11px] font-semibold text-stone-500 hover:text-stone-900"
                  >
                    View ({cartIntentIds.length}) →
                  </button>
                </div>

                {recentCartItems.length === 0 ? (
                  <p className="text-xs text-stone-400 italic py-2">
                    Swipe up on pieces to register checkout intent.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {recentCartItems.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-stone-50"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-semibold text-stone-900 truncate">
                            {item.name}
                          </p>
                          <span className="text-[11px] font-mono text-stone-600">
                            ${item.price}
                          </span>
                        </div>
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white text-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
                          title="Open brand website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'closet' && (
          <DigitalClosetView
            onOpenDetails={(p) => setSelectedProduct(p)}
            onShareProduct={handleShareProduct}
            onShareCloset={handleShareCloset}
            onNavigateToDiscover={() => setActiveTab('discover')}
          />
        )}

        {activeTab === 'cart' && (
          <CartIntentView
            onOpenDetails={(p) => setSelectedProduct(p)}
            onNavigateToDiscover={() => setActiveTab('discover')}
          />
        )}

        {activeTab === 'brands' && (
          <BrandDirectoryView
            onOpenDetails={(p) => setSelectedProduct(p)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPortalView />
        )}
      </main>

      {/* Universal Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />

      {/* Product Detail Specifications Bottom Sheet */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onShare={handleShareProduct}
      />

      {/* User Onboarding & Demographics Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Product & Closet Sharing Modal */}
      <ShareModal
        isOpen={shareConfig.isOpen}
        product={shareConfig.product}
        isClosetShare={shareConfig.isClosetShare}
        closetCount={shareConfig.closetCount}
        onClose={() => setShareConfig({ isOpen: false })}
      />

      {/* Recommendation Engine Explainer Modal */}
      <RecommendationExplainerModal
        isOpen={isAlgorithmOpen}
        onClose={() => setIsAlgorithmOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ShazloProvider>
      <ShazloAppContent />
    </ShazloProvider>
  );
}
