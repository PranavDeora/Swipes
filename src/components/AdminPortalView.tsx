import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  Plus, 
  Filter, 
  FileText, 
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Layers
} from 'lucide-react';
import { Product, ProductStatus, ProductCategory, FashionAesthetic } from '../types';
import { useShazlo } from '../context/ShazloContext';

export const AdminPortalView: React.FC = () => {
  const { 
    allProducts, 
    brands, 
    updateProductStatus, 
    bulkUpdateProductStatus, 
    ingestNewProduct, 
    auditLogs,
    triggerCloudinarySync,
    isSyncing
  } = useShazlo();

  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [showIngestModal, setShowIngestModal] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Filter products by brand and status
  const filteredProducts = allProducts.filter(p => {
    const brandMatch = selectedBrand === 'All' || p.brand === selectedBrand;
    const statusMatch = selectedStatus === 'all' || p.status === selectedStatus;
    return brandMatch && statusMatch;
  });

  // Bulk selection toggles
  const handleToggleSelect = (id: string) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllFiltered = () => {
    if (selectedProductIds.length === filteredProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map(p => p.id));
    }
  };

  const handleBulkApprove = () => {
    if (selectedProductIds.length === 0) return;
    bulkUpdateProductStatus(selectedProductIds, 'approved');
    setSelectedProductIds([]);
  };

  const handleBulkReject = () => {
    if (selectedProductIds.length === 0) return;
    bulkUpdateProductStatus(selectedProductIds, 'rejected');
    setSelectedProductIds([]);
  };

  const handleRunSync = async () => {
    setSyncFeedback(null);
    const result = await triggerCloudinarySync();
    setSyncFeedback(
      `✓ Cloudinary Sync Complete: ${result.addedCount} new style registered, ${result.duplicateCount} existing items verified and de-duplicated in ${result.durationMs}ms.`
    );
  };

  // New product ingestion form state
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('Reformation');
  const [formCategory, setFormCategory] = useState<ProductCategory>('Dresses');
  const [formAesthetic, setFormAesthetic] = useState<FashionAesthetic>('Quiet Luxury');
  const [formPrice, setFormPrice] = useState(220);
  const [formMaterial, setFormMaterial] = useState('100% Organic Cotton');
  const [formCare, setFormCare] = useState('Hand wash cold, dry flat.');
  const [formReturn, setFormReturn] = useState('30-day return policy.');
  const [formExternalUrl, setFormExternalUrl] = useState('https://www.thereformation.com');
  const [formImageUrl, setFormImageUrl] = useState('/src/assets/images/fashion_reformation_dress_1791784818150.jpg');

  const handleSubmitIngest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    ingestNewProduct({
      name: formName,
      brand: formBrand,
      category: formCategory,
      aesthetic: formAesthetic,
      price: Number(formPrice),
      currency: '$',
      material: formMaterial,
      careInstructions: formCare,
      returnPolicy: formReturn,
      externalUrl: formExternalUrl,
      imageUrl: formImageUrl,
      status: 'pending', // Starts as pending per PRD workflow
      description: `New catalog addition for ${formBrand}.`,
      inStock: true,
      demographicAffinities: {
        ageMin: 18,
        ageMax: 35,
        targetGenders: ['female', 'all'],
        studentMatch: true
      },
      visualFeatures: {
        colorPalette: ['Neutral Tone'],
        silhouette: 'Curated Cut',
        warmth: 0.5,
        eleganceScore: 0.85,
        boldnessScore: 0.6
      }
    });

    setFormName('');
    setShowIngestModal(false);
  };

  const pendingCount = allProducts.filter(p => p.status === 'pending').length;
  const approvedCount = allProducts.filter(p => p.status === 'approved').length;
  const rejectedCount = allProducts.filter(p => p.status === 'rejected').length;

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 pb-24 space-y-6">
      {/* Top Header & Cloudinary Sync Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-stone-900" />
            <h1 className="font-editorial text-3xl font-bold tracking-tight text-stone-900">
              Brand Catalog Admin
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Ingestion, Cloudinary synchronization & curator approval governance (PRD Section 8)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Ingest New Product Trigger */}
          <button
            onClick={() => setShowIngestModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold transition-colors border border-stone-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ingest Product</span>
          </button>

          {/* Cloudinary Sync Button */}
          <button
            onClick={handleRunSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-sm disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing Cloudinary...' : 'Sync Cloudinary Catalog'}</span>
          </button>
        </div>
      </div>

      {/* Sync feedback notification */}
      {syncFeedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
          <span>{syncFeedback}</span>
          <button 
            onClick={() => setSyncFeedback(null)} 
            className="text-emerald-700 hover:text-emerald-900 font-semibold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Catalog KPI Status Cards */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setSelectedStatus('pending')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'pending'
              ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-300'
              : 'bg-white border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-amber-700 font-semibold">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Pending Review
            </span>
          </div>
          <span className="font-mono text-2xl font-bold text-stone-900 tabular-nums block mt-1">
            {pendingCount}
          </span>
          <span className="text-[11px] text-stone-400">Hidden from user feed</span>
        </button>

        <button
          onClick={() => setSelectedStatus('approved')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'approved'
              ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-300'
              : 'bg-white border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Live & Approved
            </span>
          </div>
          <span className="font-mono text-2xl font-bold text-stone-900 tabular-nums block mt-1">
            {approvedCount}
          </span>
          <span className="text-[11px] text-stone-400">Active in swipe deck</span>
        </button>

        <button
          onClick={() => setSelectedStatus('rejected')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'rejected'
              ? 'bg-rose-50/80 border-rose-300 ring-1 ring-rose-300'
              : 'bg-white border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-rose-700 font-semibold">
            <span className="flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Rejected Samples
            </span>
          </div>
          <span className="font-mono text-2xl font-bold text-stone-900 tabular-nums block mt-1">
            {rejectedCount}
          </span>
          <span className="text-[11px] text-stone-400">Failed threshold policy</span>
        </button>
      </div>

      {/* Brand Horizontal Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedBrand('All')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedBrand === 'All'
              ? 'bg-stone-900 text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          All Brands
        </button>
        {brands.map(brand => (
          <button
            key={brand.name}
            onClick={() => setSelectedBrand(brand.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedBrand === brand.name
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {brand.name}
          </button>
        ))}
      </div>

      {/* Bulk Action Controls Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={filteredProducts.length > 0 && selectedProductIds.length === filteredProducts.length}
            onChange={handleSelectAllFiltered}
            className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900"
          />
          <span className="text-xs text-stone-600 font-medium">
            {selectedProductIds.length} of {filteredProducts.length} selected
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedProductIds.length > 0 && (
            <>
              <button
                onClick={handleBulkApprove}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Approve Selected ({selectedProductIds.length})</span>
              </button>
              <button
                onClick={handleBulkReject}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject Selected ({selectedProductIds.length})</span>
              </button>
            </>
          )}

          <div className="flex items-center gap-1 ml-2 pl-2 border-l border-stone-200">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`text-xs px-2.5 py-1 rounded-md ${
                selectedStatus === 'all' ? 'bg-stone-100 font-bold text-stone-900' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              All Statuses
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Table / Cards */}
      <div className="space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white border border-stone-200 text-stone-500 text-sm">
            No products match the selected brand and status filters.
          </div>
        ) : (
          filteredProducts.map(product => {
            const isSelected = selectedProductIds.includes(product.id);

            return (
              <div
                key={product.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSelected ? 'bg-stone-50 border-stone-400' : 'bg-white border-stone-200'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleSelect(product.id)}
                    className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900"
                  />

                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
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
                      <span>{product.category}</span>
                      <span>·</span>
                      <span className="font-mono">${product.price}</span>
                    </div>

                    <h4 className="text-sm font-semibold text-stone-900">
                      {product.name}
                    </h4>

                    <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                      {product.material}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        product.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : product.status === 'rejected'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {product.status}
                      </span>
                      {product.reviewedBy && (
                        <span className="text-[10px] text-stone-400">
                          by {product.reviewedBy}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Toggle Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {product.status !== 'approved' && (
                    <button
                      onClick={() => updateProductStatus(product.id, 'approved')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  {product.status !== 'rejected' && (
                    <button
                      onClick={() => updateProductStatus(product.id, 'rejected')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}

                  {product.status !== 'pending' && (
                    <button
                      onClick={() => updateProductStatus(product.id, 'pending')}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 text-xs font-medium transition-colors"
                    >
                      Reset to Pending
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Admin Audit Log (PRD Section 8.3) */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
            <FileText className="w-4 h-4" />
            Administrative Audit Log & Traceability
          </div>
          <span className="text-[11px] text-stone-400">
            Immutable operation record
          </span>
        </div>

        <div className="space-y-2">
          {auditLogs.slice(0, 4).map(log => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-stone-400">
                  {log.timestamp}
                </span>
                <span className="font-semibold text-stone-800">
                  [{log.action}]
                </span>
                <span className="text-stone-600">
                  {log.details}
                </span>
              </div>
              <span className="text-[11px] text-stone-400 italic">
                {log.adminName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ingest Modal */}
      {showIngestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-editorial text-2xl font-bold text-stone-900">
                Ingest Product (Cloudinary)
              </h3>
              <button 
                onClick={() => setShowIngestModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitIngest} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Cleo Cutout Midi Dress"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Brand *
                  </label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    {brands.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Dresses">Dresses</option>
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Knitwear">Knitwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Aesthetic *
                  </label>
                  <select
                    value={formAesthetic}
                    onChange={(e) => setFormAesthetic(e.target.value as FashionAesthetic)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Quiet Luxury">Quiet Luxury</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Streetwear">Streetwear</option>
                    <option value="Romantic / Bohemian">Romantic / Bohemian</option>
                    <option value="Parisian Chic">Parisian Chic</option>
                    <option value="Tailored Classic">Tailored Classic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Fabric Composition *
                </label>
                <input
                  type="text"
                  required
                  value={formMaterial}
                  onChange={(e) => setFormMaterial(e.target.value)}
                  placeholder="e.g. 100% Mulberry Silk Charmeuse"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Care Instructions *
                </label>
                <input
                  type="text"
                  required
                  value={formCare}
                  onChange={(e) => setFormCare(e.target.value)}
                  placeholder="e.g. Dry clean only"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Return Policy *
                </label>
                <input
                  type="text"
                  required
                  value={formReturn}
                  onChange={(e) => setFormReturn(e.target.value)}
                  placeholder="e.g. 30-day domestic returns"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Official Retailer URL *
                </label>
                <input
                  type="url"
                  required
                  value={formExternalUrl}
                  onChange={(e) => setFormExternalUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowIngestModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 font-medium hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800"
                >
                  Register In Pending Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
