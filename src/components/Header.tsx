import React from 'react';
import { Sparkles, Coins, User, SlidersHorizontal } from 'lucide-react';
import { useShazlo } from '../context/ShazloContext';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenProfile: () => void;
  onOpenAlgorithm: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenProfile,
  onOpenAlgorithm,
  activeTab
}) => {
  const { coins, recentCoinDelta, stylistTier, adminRole, toggleAdminRole } = useShazlo();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3">
          <a href="#" className="font-editorial text-2xl font-bold tracking-tight text-stone-900 select-none">
            Shazlo
          </a>
          <span className="hidden sm:inline-block text-xs text-stone-500 font-medium tracking-wider uppercase">
            Swipe to Style
          </span>
          {adminRole && (
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Admin Mode
            </span>
          )}
        </div>

        {/* Zone 2: Contextual Sub-Nav or Algorithm Indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs text-stone-500">
          <button
            onClick={onOpenAlgorithm}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-stone-100 text-stone-700 transition-colors"
            title="View 70/30 recommendation model architecture"
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-900" />
            <span className="font-medium">70:30 Hybrid Model Active</span>
          </button>
        </div>

        {/* Zone 3: Actions & Gamification Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Shazlo Coins Display with Animated Delta */}
          <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-900 border border-stone-200">
            <Coins className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-mono text-xs font-bold tabular-nums">
              {coins}
            </span>
            <span className="hidden sm:inline text-[11px] text-stone-500 font-medium">
              coins
            </span>

            {/* Flying coin feedback */}
            <AnimatePresence>
              {recentCoinDelta && (
                <motion.div
                  key={recentCoinDelta.id}
                  initial={{ opacity: 0, y: 0, scale: 0.8 }}
                  animate={{ opacity: 1, y: -24, scale: 1.1 }}
                  exit={{ opacity: 0, y: -36 }}
                  transition={{ duration: 0.8 }}
                  className={`absolute right-1 text-xs font-bold tabular-nums pointer-events-none px-1.5 py-0.5 rounded-full shadow-sm ${
                    recentCoinDelta.amount > 0 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {recentCoinDelta.amount > 0 ? `+${recentCoinDelta.amount}` : recentCoinDelta.amount}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Algorithm Info for mobile */}
          <button
            onClick={onOpenAlgorithm}
            className="md:hidden p-2 rounded-full text-stone-600 hover:bg-stone-100 transition-colors"
            aria-label="Algorithm Model"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* User Profile trigger */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full text-stone-700 hover:bg-stone-100 border border-stone-200 transition-colors"
            aria-label="User Profile"
          >
            <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px] font-bold">
              M
            </div>
            <span className="hidden sm:inline text-xs font-medium">
              {stylistTier.title}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
