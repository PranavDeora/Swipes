import React from 'react';
import { RotateCcw, X, Bookmark, Heart, ShoppingBag, Info, Sparkles, RefreshCw } from 'lucide-react';
import { Product, SwipeAction } from '../types';
import { useShazlo } from '../context/ShazloContext';
import { SwipeCard } from './SwipeCard';

interface DeckViewProps {
  onOpenDetails: (product: Product) => void;
  onShare: (product: Product) => void;
  onNavigateToCloset: () => void;
}

export const DeckView: React.FC<DeckViewProps> = ({
  onOpenDetails,
  onShare,
  onNavigateToCloset
}) => {
  const { 
    activeDeck, 
    handleSwipe, 
    undoLastSwipe, 
    canUndo, 
    resetDeck,
    coins,
    closetIds,
    cartIntentIds,
    likedIds
  } = useShazlo();

  const current = activeDeck[0];
  const next = activeDeck[1];

  if (!current) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-900 mb-4">
          <Sparkles className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="font-editorial text-3xl font-bold tracking-tight text-stone-900 mb-2">
          Curated Deck Complete
        </h2>
        <p className="text-sm text-stone-600 mb-6 max-w-xs">
          You've reviewed today's approved fashion drops. Your preference weights have calibrated your personal style vector.
        </p>

        {/* Discovery Summary Stats */}
        <div className="w-full grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-stone-200 mb-6">
          <div className="text-center">
            <span className="block font-mono text-xl font-bold text-stone-900 tabular-nums">
              {likedIds.length}
            </span>
            <span className="text-[11px] text-stone-500 font-medium">Liked</span>
          </div>
          <div className="text-center border-x border-stone-100">
            <span className="block font-mono text-xl font-bold text-amber-700 tabular-nums">
              {closetIds.length}
            </span>
            <span className="text-[11px] text-stone-500 font-medium">In Closet</span>
          </div>
          <div className="text-center">
            <span className="block font-mono text-xl font-bold text-indigo-700 tabular-nums">
              {cartIntentIds.length}
            </span>
            <span className="text-[11px] text-stone-500 font-medium">Cart Intent</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={resetDeck}
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Re-shuffle Deck</span>
          </button>
          <button
            onClick={onNavigateToCloset}
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-stone-100 text-stone-900 font-medium text-sm hover:bg-stone-200 border border-stone-200 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            <span>View Closet ({closetIds.length})</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-between max-w-md w-full mx-auto px-4 pt-2 pb-20 select-none">
      {/* Top micro gesture indicator */}
      <div className="w-full flex items-center justify-between text-[11px] text-stone-500 font-medium px-2 py-1 mb-2">
        <span>← Pass (-1)</span>
        <span className="text-stone-700 font-semibold">↑ Cart (+3) · ↓ Closet (+2)</span>
        <span>Like (+1) →</span>
      </div>

      {/* Card Stack Container (3:4 ratio standard for high fashion lookbooks) */}
      <div className="relative w-full aspect-[3/4] max-h-[580px]">
        {/* Next Card (Underneath) */}
        {next && (
          <SwipeCard
            key={next.id}
            product={next}
            isFront={false}
            onSwipe={handleSwipe}
            onOpenDetails={onOpenDetails}
            onShare={onShare}
          />
        )}

        {/* Current Card (Interactive Front) */}
        <SwipeCard
          key={current.id}
          product={current}
          isFront={true}
          onSwipe={handleSwipe}
          onOpenDetails={onOpenDetails}
          onShare={onShare}
        />
      </div>

      {/* Ergonomic Action Controls Bar */}
      <div className="w-full flex items-center justify-center gap-2.5 sm:gap-3.5 mt-4">
        {/* Undo / Rewind */}
        <button
          onClick={undoLastSwipe}
          disabled={!canUndo}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            canUndo
              ? 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 shadow-sm active:scale-95'
              : 'bg-stone-100 text-stone-300 border border-stone-200/50 cursor-not-allowed opacity-50'
          }`}
          aria-label="Rewind last swipe"
          title="Rewind last swipe"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Dislike / Pass (Swipe Left) */}
        <button
          onClick={() => handleSwipe('dislike')}
          className="w-13 h-13 rounded-full bg-white text-rose-600 border border-stone-200 hover:bg-rose-50 shadow-md flex items-center justify-center transition-all active:scale-90"
          aria-label="Pass on item"
          title="Pass (-1 coin)"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Save to Closet (Swipe Down) */}
        <button
          onClick={() => handleSwipe('closet')}
          className="w-11 h-11 rounded-full bg-white text-amber-600 border border-stone-200 hover:bg-amber-50 shadow-sm flex items-center justify-center transition-all active:scale-90"
          aria-label="Save to digital closet"
          title="Save to closet (+2 coins)"
        >
          <Bookmark className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Like (Swipe Right) */}
        <button
          onClick={() => handleSwipe('like')}
          className="w-13 h-13 rounded-full bg-stone-900 text-white hover:bg-stone-800 shadow-md flex items-center justify-center transition-all active:scale-90"
          aria-label="Like item"
          title="Like (+1 coin)"
        >
          <Heart className="w-6 h-6 fill-white" />
        </button>

        {/* Express Cart Intent (Swipe Up) */}
        <button
          onClick={() => handleSwipe('cart')}
          className="w-11 h-11 rounded-full bg-white text-indigo-600 border border-stone-200 hover:bg-indigo-50 shadow-sm flex items-center justify-center transition-all active:scale-90"
          aria-label="Express cart intent"
          title="Express cart intent (+3 coins)"
        >
          <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
