import React, { useState, useMemo } from 'react';
import { Bookmark, ShoppingBag, Trash2, Share2, Sparkles, ExternalLink, ArrowRight, Info } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { useShazlo } from '../context/ShazloContext';

interface DigitalClosetViewProps {
  onOpenDetails: (product: Product) => void;
  onShareProduct: (product: Product) => void;
  onShareCloset: () => void;
  onNavigateToDiscover: () => void;
}

export const DigitalClosetView: React.FC<DigitalClosetViewProps> = ({
  onOpenDetails,
  onShareProduct,
  onShareCloset,
  onNavigateToDiscover
}) => {
  const { allProducts, closetIds, cartIntentIds, removeFromCloset, toggleCartIntent } = useShazlo();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const closetProducts = useMemo(() => {
    return allProducts.filter(p => closetIds.includes(p.id));
  }, [allProducts, closetIds]);

  const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Knitwear', 'Accessories'];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return closetProducts;
    return closetProducts.filter(p => p.category === selectedCategory);
  }, [closetProducts, selectedCategory]);

  // Closet stats
  const totalValue = closetProducts.reduce((sum, item) => sum + item.price, 0);

  // Dominant aesthetic calculation
  const dominantAesthetic = useMemo(() => {
    if (closetProducts.length === 0) return 'Undetermined';
    const counts: Record<string, number> = {};
    closetProducts.forEach(p => {
      counts[p.aesthetic] = (counts[p.aesthetic] || 0) + 1;
    });
    let max = 0;
    let dominant = 'Quiet Luxury';
    for (const [aesthetic, count] of Object.entries(counts)) {
      if (count > max) {
        max = count;
        dominant = aesthetic;
      }
    }
    return dominant;
  }, [closetProducts]);

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 pb-24 space-y-6">
      {/* Header & Closet Share Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <h1 className="font-editorial text-3xl font-bold tracking-tight text-stone-900">
            Digital Closet
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Personal sanctuary of curated silhouettes and saved fashion pieces
          </p>
        </div>

        {closetProducts.length > 0 && (
          <button
            onClick={onShareCloset}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share My Closet</span>
          </button>
        )}
      </div>

      {/* Closet Analytics Strip */}
      {closetProducts.length > 0 && (
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-stone-200">
          <div>
            <span className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400">
              Curated Items
            </span>
            <span className="font-mono text-xl font-bold text-stone-900 tabular-nums">
              {closetProducts.length}
            </span>
          </div>
          <div className="border-x border-stone-100 px-3">
            <span className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400">
              Wardrobe Value
            </span>
            <span className="font-mono text-xl font-bold text-stone-900 tabular-nums">
              ${totalValue}
            </span>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400">
              Dominant Vibe
            </span>
            <span className="text-sm font-bold text-stone-800 truncate block">
              {dominantAesthetic}
            </span>
          </div>
        </div>
      )}

      {/* Category Segmented Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {closetProducts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 space-y-4">
          <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl font-bold text-stone-900">
              Your Closet is Empty
            </h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
              Swipe down or tap the closet icon on any item while discovering to save pieces for later.
            </p>
          </div>
          <button
            onClick={onNavigateToDiscover}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            <span>Start Discovering</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-white border border-stone-200">
          <p className="text-sm text-stone-500">
            No items in "{selectedCategory}". Try another category filter.
          </p>
        </div>
      ) : (
        /* Closet Grid */
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => {
            const inCart = cartIntentIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Product Image */}
                <div 
                  onClick={() => onOpenDetails(product)}
                  className="relative aspect-[3/4] bg-stone-100 cursor-pointer overflow-hidden"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top quick action pills */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShareProduct(product);
                      }}
                      className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 flex items-center justify-center hover:bg-white shadow-sm transition-colors"
                      aria-label="Share item"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCloset(product.id);
                      }}
                      className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm text-rose-600 flex items-center justify-center hover:bg-rose-50 shadow-sm transition-colors"
                      aria-label="Remove from closet"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Info Card Content */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium mb-1">
                      <span className="uppercase tracking-wider font-semibold text-stone-700">
                        {product.brand}
                      </span>
                      <span className="font-mono font-bold text-stone-900 tabular-nums">
                        ${product.price}
                      </span>
                    </div>
                    <h4 
                      onClick={() => onOpenDetails(product)}
                      className="text-xs font-semibold text-stone-900 line-clamp-1 cursor-pointer hover:underline"
                    >
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">
                      {product.material}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 mt-2 border-t border-stone-100 flex items-center gap-2">
                    <button
                      onClick={() => toggleCartIntent(product.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors ${
                        inCart
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                      }`}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{inCart ? 'In Cart' : 'Cart Intent'}</span>
                    </button>

                    <button
                      onClick={() => onOpenDetails(product)}
                      className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 transition-colors"
                      title="View specifications"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
