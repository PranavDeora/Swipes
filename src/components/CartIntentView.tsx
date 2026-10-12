import React from 'react';
import { ShoppingBag, ExternalLink, ArrowRight, Bookmark, Trash2, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { useShazlo } from '../context/ShazloContext';

interface CartIntentViewProps {
  onOpenDetails: (product: Product) => void;
  onNavigateToDiscover: () => void;
}

export const CartIntentView: React.FC<CartIntentViewProps> = ({
  onOpenDetails,
  onNavigateToDiscover
}) => {
  const { allProducts, cartIntentIds, closetIds, removeFromCartIntent, toggleCloset } = useShazlo();

  const cartProducts = allProducts.filter(p => cartIntentIds.includes(p.id));
  const subtotal = cartProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-4 pb-24 space-y-6">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="font-editorial text-3xl font-bold tracking-tight text-stone-900">
          Cart Intent List
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          High purchase intent items ready for checkout on brand partner websites
        </p>
      </div>

      {cartProducts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 space-y-4">
          <div className="w-14 h-14 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl font-bold text-stone-900">
              No Cart Intent Items Yet
            </h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
              Swipe UP on any product card or tap the shopping bag icon to queue items you plan to purchase.
            </p>
          </div>
          <button
            onClick={onNavigateToDiscover}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            <span>Discover Fashion Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Summary Strip */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-500 font-medium">
                Total Intent Estimate ({cartProducts.length} items)
              </span>
              <div className="font-mono text-2xl font-bold text-stone-900 tabular-nums">
                ${subtotal} <span className="text-xs font-normal text-stone-400">USD</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Retail Partners</span>
            </div>
          </div>

          {/* Cart Intent Items List */}
          <div className="space-y-3">
            {cartProducts.map(product => {
              const inCloset = closetIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="p-4 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                >
                  <div className="flex gap-3.5 items-center">
                    <div 
                      onClick={() => onOpenDetails(product)}
                      className="w-16 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 cursor-pointer border border-stone-200"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                        <span className="uppercase tracking-wider font-semibold text-stone-800">
                          {product.brand}
                        </span>
                        <span>·</span>
                        <span>{product.aesthetic}</span>
                      </div>
                      <h4
                        onClick={() => onOpenDetails(product)}
                        className="text-sm font-semibold text-stone-900 cursor-pointer hover:underline"
                      >
                        {product.name}
                      </h4>
                      <p className="font-mono text-sm font-bold text-stone-900 tabular-nums mt-0.5">
                        ${product.price}
                      </p>
                    </div>
                  </div>

                  {/* Right actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => toggleCloset(product.id)}
                      className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 border border-stone-200 transition-colors text-xs font-medium flex items-center gap-1.5"
                      title={inCloset ? "Already in closet" : "Save to closet"}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${inCloset ? 'fill-stone-900' : ''}`} />
                      <span className="hidden sm:inline">{inCloset ? 'In Closet' : 'Save'}</span>
                    </button>

                    <button
                      onClick={() => removeFromCartIntent(product.id)}
                      className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-stone-200 transition-colors"
                      aria-label="Remove from cart intent"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-sm"
                    >
                      <span>Buy at {product.brand}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
