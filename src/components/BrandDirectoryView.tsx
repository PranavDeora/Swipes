import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Sparkles, Filter, Store, ArrowUpRight } from 'lucide-react';
import { Product, BrandInfo } from '../types';
import { useShazlo } from '../context/ShazloContext';

interface BrandDirectoryViewProps {
  onOpenDetails: (product: Product) => void;
}

export const BrandDirectoryView: React.FC<BrandDirectoryViewProps> = ({
  onOpenDetails
}) => {
  const { brands, approvedProducts } = useShazlo();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  const filteredProducts = useMemo(() => {
    return approvedProducts.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.aesthetic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;
      return matchesSearch && matchesBrand;
    });
  }, [approvedProducts, searchQuery, selectedBrand]);

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 pb-24 space-y-6">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="font-editorial text-3xl font-bold tracking-tight text-stone-900">
          Brand Directory
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Explore curated fashion houses, artisanal labels, and sustainable partners
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search pieces by brand, silk, cashmere, aesthetic, dress..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all placeholder:text-stone-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
          >
            Clear
          </button>
        )}
      </div>

      {/* Brand Horizontal Badges */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedBrand('All')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedBrand === 'All'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          All Brands ({approvedProducts.length})
        </button>
        {brands.map(brand => {
          const count = approvedProducts.filter(p => p.brand === brand.name).length;
          return (
            <button
              key={brand.name}
              onClick={() => setSelectedBrand(brand.name)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedBrand === brand.name
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {brand.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Brand Profiles Showcase (when a specific brand is selected or all) */}
      {selectedBrand !== 'All' && (
        (() => {
          const brandData = brands.find(b => b.name === selectedBrand);
          if (!brandData) return null;
          return (
            <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-stone-900">
                    {brandData.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    {brandData.tagline}
                  </p>
                </div>
                <a
                  href={brandData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold transition-colors shrink-0"
                >
                  <span>Brand Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-[11px]">
                <div>
                  <span className="text-stone-400 block">Origin</span>
                  <span className="font-medium text-stone-800">{brandData.headquarters}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Price Range</span>
                  <span className="font-mono font-medium text-stone-800">{brandData.priceTier}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Sustainability</span>
                  <span className="font-medium text-stone-800">{brandData.sustainabilityRating}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Signature</span>
                  <span className="font-medium text-stone-800 truncate block">{brandData.signatureStyle}</span>
                </div>
              </div>
            </div>
          );
        })()
      )}

      {/* Product Results Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
          <span>Showing {filteredProducts.length} approved styles</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white border border-stone-200">
            <p className="text-sm text-stone-500">
              No products found matching "{searchQuery}".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => onOpenDetails(product)}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-stone-950/70 text-white text-[10px] font-mono font-bold">
                    ${product.price}
                  </div>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider font-semibold text-stone-500">
                      {product.brand}
                    </span>
                    <h4 className="text-xs font-semibold text-stone-900 line-clamp-1 mt-0.5">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      {product.aesthetic}
                    </span>
                  </div>

                  <div className="pt-2 mt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-600">
                    <span>Inspect Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
