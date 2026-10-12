import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Share2, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ShareModalProps {
  product?: Product | null;
  isClosetShare?: boolean;
  closetCount?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  product,
  isClosetShare,
  closetCount = 0,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareTitle = isClosetShare 
    ? `Explore Maya's Curated Digital Closet (${closetCount} pieces) on Shazlo`
    : `Discover ${product?.name} by ${product?.brand} on Shazlo`;

  const shareUrl = isClosetShare
    ? `https://shazlo.app/closet/maya-lin`
    : `https://shazlo.app/p/${product?.id || 'discovery'}`;

  const whatsappMessage = encodeURIComponent(
    `${shareTitle}\n\nCheck it out here: ${shareUrl}`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Found this on Shazlo: Swipe to Style!`,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-stone-900" />
            <h3 className="font-editorial text-xl font-bold text-stone-900">
              {isClosetShare ? 'Share Digital Closet' : 'Share Fashion Piece'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Share Preview Card */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2">
          {product && !isClosetShare ? (
            <>
              <div className="w-20 h-24 rounded-xl overflow-hidden bg-stone-200 mx-auto shadow-sm">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                  {product.brand}
                </span>
                <p className="text-xs font-semibold text-stone-900 line-clamp-1">
                  {product.name}
                </p>
                <p className="font-mono text-xs font-bold text-stone-900">
                  ${product.price}
                </p>
              </div>
            </>
          ) : (
            <div className="py-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-lg font-bold text-stone-900">
                Maya's Closet
              </h4>
              <p className="text-xs text-stone-500">
                {closetCount} saved runway & casual fashion silhouettes
              </p>
            </div>
          )}

          <div className="text-[10px] text-stone-400 font-medium">
            Recipients can preview without app installation
          </div>
        </div>

        {/* Share Action Buttons */}
        <div className="space-y-2">
          {/* WhatsApp Direct */}
          <a
            href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </a>

          {/* Copy Link Input */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-stone-200 bg-stone-50">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-2 text-xs font-mono text-stone-600 focus:outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shrink-0 flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Native Share button */}
          <button
            onClick={handleNativeShare}
            className="w-full py-2.5 rounded-xl text-stone-700 hover:bg-stone-100 font-medium text-xs transition-colors"
          >
            More Sharing Options
          </button>
        </div>
      </div>
    </div>
  );
};
