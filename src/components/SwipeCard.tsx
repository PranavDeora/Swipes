import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { Info, Share2, Sparkles, ShoppingBag, Bookmark, Heart, X } from 'lucide-react';
import { Product, SwipeAction } from '../types';
import { useShazlo } from '../context/ShazloContext';

interface SwipeCardProps {
  product: Product;
  isFront: boolean;
  onSwipe: (action: SwipeAction) => void;
  onOpenDetails: (product: Product) => void;
  onShare: (product: Product) => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  product,
  isFront,
  onSwipe,
  onOpenDetails,
  onShare
}) => {
  const { getScoreBreakdown } = useShazlo();
  const breakdown = getScoreBreakdown(product);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Dynamic transforms
  const rotate = useTransform(x, [-200, 200], [-14, 14]);
  const opacity = useTransform(x, [-300, -200, 0, 200, 300], [0.6, 1, 1, 1, 0.6]);

  // Stamp opacities
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const dislikeOpacity = useTransform(x, [-30, -120], [0, 1]);
  const cartOpacity = useTransform(y, [-30, -120], [0, 1]);
  const closetOpacity = useTransform(y, [30, 120], [0, 1]);

  const [exitDirection, setExitDirection] = useState<SwipeAction | null>(null);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isFront) return;

    const thresholdX = 90;
    const thresholdY = 90;
    const velocityThreshold = 400;

    const absX = Math.abs(info.offset.x);
    const absY = Math.abs(info.offset.y);

    if (absX > absY) {
      // Horizontal swipe dominates
      if (info.offset.x > thresholdX || info.velocity.x > velocityThreshold) {
        setExitDirection('like');
        onSwipe('like');
      } else if (info.offset.x < -thresholdX || info.velocity.x < -velocityThreshold) {
        setExitDirection('dislike');
        onSwipe('dislike');
      }
    } else {
      // Vertical swipe dominates
      if (info.offset.y < -thresholdY || info.velocity.y < -velocityThreshold) {
        setExitDirection('cart');
        onSwipe('cart');
      } else if (info.offset.y > thresholdY || info.velocity.y > velocityThreshold) {
        setExitDirection('closet');
        onSwipe('closet');
      }
    }
  };

  if (!isFront) {
    // Background card in stack
    return (
      <div 
        className="absolute inset-0 rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-md select-none pointer-events-none transform scale-95 translate-y-3 opacity-90 transition-all duration-300"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-xs uppercase tracking-widest text-stone-300 font-medium">
            {product.brand}
          </p>
          <h3 className="font-editorial text-2xl font-bold tracking-tight">
            {product.name}
          </h3>
          <p className="font-mono text-base font-semibold mt-1">
            ${product.price}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      drag={isFront}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={
        exitDirection === 'like'
          ? { x: 500, opacity: 0, rotate: 20 }
          : exitDirection === 'dislike'
          ? { x: -500, opacity: 0, rotate: -20 }
          : exitDirection === 'cart'
          ? { y: -500, opacity: 0 }
          : exitDirection === 'closet'
          ? { y: 500, opacity: 0 }
          : { x: 0, y: 0 }
      }
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="swipe-card absolute inset-0 rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-xl cursor-grab active:cursor-grabbing select-none"
    >
      {/* Product Image */}
      <div className="relative w-full h-full bg-stone-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover pointer-events-none"
          loading="eager"
        />

        {/* Ambient Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-stone-950/30 pointer-events-none" />

        {/* Top Floating Tags Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-auto">
          {/* Recommendation Match Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-950/60 backdrop-blur-md text-white border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-xs font-semibold tracking-tight">
              {breakdown.combinedScore}% Match
            </span>
          </div>

          {/* Quick Share Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(product);
            }}
            className="w-9 h-9 rounded-full bg-stone-950/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-stone-950/80 transition-colors"
            aria-label="Share product"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Gesture Feedback Stamps */}
        {/* RIGHT: LIKE (+1) */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-16 right-6 z-20 pointer-events-none transform rotate-12 border-4 border-emerald-400 bg-emerald-950/70 text-emerald-300 px-4 py-2 rounded-2xl font-black text-2xl tracking-wider uppercase backdrop-blur-sm"
        >
          LIKE +1
        </motion.div>

        {/* LEFT: PASS (-1) */}
        <motion.div
          style={{ opacity: dislikeOpacity }}
          className="absolute top-16 left-6 z-20 pointer-events-none transform -rotate-12 border-4 border-rose-400 bg-rose-950/70 text-rose-300 px-4 py-2 rounded-2xl font-black text-2xl tracking-wider uppercase backdrop-blur-sm"
        >
          PASS -1
        </motion.div>

        {/* UP: CART INTENT (+3) */}
        <motion.div
          style={{ opacity: cartOpacity }}
          className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none border-4 border-indigo-400 bg-indigo-950/80 text-indigo-200 px-5 py-2.5 rounded-2xl font-black text-xl tracking-wider uppercase backdrop-blur-sm whitespace-nowrap"
        >
          CART INTENT +3
        </motion.div>

        {/* DOWN: SAVE TO CLOSET (+2) */}
        <motion.div
          style={{ opacity: closetOpacity }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 pointer-events-none border-4 border-amber-400 bg-amber-950/80 text-amber-200 px-5 py-2.5 rounded-2xl font-black text-xl tracking-wider uppercase backdrop-blur-sm whitespace-nowrap"
        >
          IN CLOSET +2
        </motion.div>

        {/* Bottom Information Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 pointer-events-auto">
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-stone-300 font-medium mb-1">
            <span className="uppercase tracking-wider font-semibold text-white">
              {product.brand}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.aesthetic}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          {/* Product Title & Price */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {product.name}
            </h2>
            <span className="font-mono text-xl sm:text-2xl font-semibold text-white tabular-nums shrink-0">
              ${product.price}
            </span>
          </div>

          {/* Material & Key Feature Highlight */}
          <p className="text-xs text-stone-300 line-clamp-1 mb-4">
            {product.material}
          </p>

          {/* Tap for specs bar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide transition-all"
          >
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-stone-300" />
              Fabric, Care & 70:30 Model Fit
            </span>
            <span className="text-stone-300 text-[11px]">View Specs →</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
