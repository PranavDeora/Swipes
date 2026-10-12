import React from 'react';
import { X, ExternalLink, Sparkles, Bookmark, ShoppingBag, Share2, Shield, RotateCcw, Sparkle } from 'lucide-react';
import { Product } from '../types';
import { useShazlo } from '../context/ShazloContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onShare: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onShare
}) => {
  const { 
    closetIds, 
    cartIntentIds, 
    toggleCloset, 
    toggleCartIntent, 
    getScoreBreakdown 
  } = useShazlo();

  if (!product) return null;

  const inCloset = closetIds.includes(product.id);
  const inCart = cartIntentIds.includes(product.id);
  const breakdown = getScoreBreakdown(product);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Sheet Container */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10">
        {/* Top Drag Handle for mobile */}
        <div className="w-10 h-1.5 bg-stone-200 rounded-full mx-auto my-3 sm:hidden" />

        {/* Header Action Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-bold text-stone-500">
              {product.brand}
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500">
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onShare(product)}
              className="p-2 rounded-full text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Main Visual & Title */}
          <div className="flex gap-4 items-start">
            <div className="w-28 h-36 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-editorial text-2xl font-bold tracking-tight text-stone-900 leading-snug">
                {product.name}
              </h2>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-2xl font-bold text-stone-900 tabular-nums">
                  ${product.price}
                </span>
                <span className="text-xs text-stone-400 font-medium">USD</span>
              </div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* 70/30 Recommendation Breakdown Section */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Recommendation Engine Alignment
              </div>
              <span className="font-mono text-sm font-bold text-stone-900 tabular-nums">
                {breakdown.combinedScore}% Match
              </span>
            </div>

            {/* Split Progress Bars */}
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-stone-600 mb-1">
                  <span>Product Visual Representation (70% weight)</span>
                  <span className="font-mono font-semibold">{breakdown.visualScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-900 rounded-full transition-all duration-500"
                    style={{ width: `${breakdown.visualScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-600 mb-1">
                  <span>User Demographic Alignment (30% weight)</span>
                  <span className="font-mono font-semibold">{breakdown.demographicScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-600 rounded-full transition-all duration-500"
                    style={{ width: `${breakdown.demographicScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Key Alignment Factors */}
            <div className="pt-1 flex flex-wrap gap-1.5">
              {breakdown.keyFactors.map((factor, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium text-stone-600 bg-white border border-stone-200 px-2.5 py-1 rounded-lg"
                >
                  ✓ {factor}
                </span>
              ))}
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-1 gap-3 text-xs">
            {/* Material */}
            <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                Fabric & Composition
              </span>
              <p className="font-medium text-stone-900">
                {product.material}
              </p>
            </div>

            {/* Care Instructions */}
            <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                Care Instructions
              </span>
              <p className="font-medium text-stone-900">
                {product.careInstructions}
              </p>
            </div>

            {/* Return Policy */}
            <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                Return & Exchange Policy
              </span>
              <p className="font-medium text-stone-900">
                {product.returnPolicy}
              </p>
            </div>
          </div>

          {/* External Retailer Website Link (Validated) */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-stone-900">
                Official {product.brand} Retail Partner
              </p>
              <p className="text-[11px] text-stone-600">
                View live product availability and sizing on brand's verified website.
              </p>
            </div>
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shrink-0"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Actions Sticky Footer */}
        <div className="p-4 border-t border-stone-200 bg-white grid grid-cols-2 gap-3">
          <button
            onClick={() => toggleCloset(product.id)}
            className={`h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
              inCloset
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-stone-100 text-stone-900 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${inCloset ? 'fill-amber-900' : ''}`} />
            <span>{inCloset ? 'In Closet' : 'Add to Closet (+2)'}</span>
          </button>

          <button
            onClick={() => toggleCartIntent(product.id)}
            className={`h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
              inCart
                ? 'bg-indigo-600 text-white'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{inCart ? 'In Cart Intent' : 'Cart Intent (+3)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
