import React from 'react';
import { Compass, Bookmark, ShoppingBag, Store, ShieldCheck } from 'lucide-react';
import { useShazlo } from '../context/ShazloContext';

export type NavTab = 'discover' | 'closet' | 'cart' | 'brands' | 'admin';

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const { closetIds, cartIntentIds, allProducts } = useShazlo();

  const pendingCount = allProducts.filter(p => p.status === 'pending').length;

  const tabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'closet', label: 'Closet', icon: Bookmark, badge: closetIds.length },
    { id: 'cart', label: 'Cart Intent', icon: ShoppingBag, badge: cartIntentIds.length },
    { id: 'brands', label: 'Brands', icon: Store },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, badge: pendingCount > 0 ? pendingCount : undefined },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 px-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                isActive ? 'text-stone-900 font-semibold' : 'text-stone-400 hover:text-stone-600'
              }`}
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-stone-900 text-[10px] font-bold text-white flex items-center justify-center tabular-nums">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-1 whitespace-nowrap">
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-6 h-0.5 bg-stone-900 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
