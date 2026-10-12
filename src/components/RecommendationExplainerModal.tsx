import React from 'react';
import { X, Sparkles, Sliders, Zap, Database, BrainCircuit, Info } from 'lucide-react';
import { useShazlo } from '../context/ShazloContext';

interface RecommendationExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecommendationExplainerModal: React.FC<RecommendationExplainerModalProps> = ({
  isOpen,
  onClose
}) => {
  const { userProfile, swipeHistory } = useShazlo();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              Recommendation Architecture
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 text-xs">
          {/* PRD Model Concept Explanation */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-stone-900">
              <span className="text-[11px] uppercase tracking-wider text-stone-500">
                Hybrid SGD Scoring Formulation
              </span>
              <span className="font-mono text-xs bg-stone-200 px-2 py-0.5 rounded-full">
                70 : 30 Ratio
              </span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Shazlo pairs high-dimensional visual garment representations with demographic affinity signals to dynamically estimate personalized style relevance.
            </p>

            <div className="p-2.5 rounded-xl bg-white border border-stone-200 font-mono text-[11px] text-stone-800 text-center">
              Score = (0.70 × VisualEmbedding) + (0.30 × DemographicFit)
            </div>
          </div>

          {/* Dual Source Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 70% Product representation */}
            <div className="p-3.5 rounded-2xl border border-stone-200 bg-white space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-stone-900">
                <BrainCircuit className="w-4 h-4 text-stone-700" />
                <span>Product Representation</span>
              </div>
              <span className="font-mono font-bold text-amber-700 text-sm block">
                70% Weight
              </span>
              <ul className="space-y-1 text-stone-500 text-[11px]">
                <li>• Visual silhouette & neckline cut</li>
                <li>• Color palette harmony</li>
                <li>• Fabric drape & texture analysis</li>
                <li>• Curated aesthetic affinity</li>
              </ul>
            </div>

            {/* 30% User demographic */}
            <div className="p-3.5 rounded-2xl border border-stone-200 bg-white space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-stone-900">
                <Database className="w-4 h-4 text-stone-700" />
                <span>Demographic Calibration</span>
              </div>
              <span className="font-mono font-bold text-stone-700 text-sm block">
                30% Weight
              </span>
              <ul className="space-y-1 text-stone-500 text-[11px]">
                <li>• Age cohort alignment ({userProfile.age} yrs)</li>
                <li>• Campus trends ({userProfile.college || 'General'})</li>
                <li>• Student lifestyle considerations</li>
                <li>• Stated style preferences</li>
              </ul>
            </div>
          </div>

          {/* Online Gradient Updates from Gestures */}
          <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2.5">
            <div className="flex items-center justify-between font-bold text-stone-900">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                Live Gesture Weight Coefficients
              </span>
              <span className="text-stone-400 font-normal">
                {swipeHistory.length} interactions recorded
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="block text-emerald-800 font-bold">Right Swipe</span>
                <span className="text-stone-500 font-mono">+1.0 Preference</span>
              </div>
              <div className="p-2 rounded-xl bg-rose-50 border border-rose-100">
                <span className="block text-rose-800 font-bold">Left Swipe</span>
                <span className="text-stone-500 font-mono">-1.5 Penalty</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
                <span className="block text-amber-800 font-bold">Down Swipe</span>
                <span className="text-stone-500 font-mono">+2.0 Closet</span>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                <span className="block text-indigo-800 font-bold">Up Swipe</span>
                <span className="text-stone-500 font-mono">+3.0 Cart Intent</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-100 text-stone-600 text-[11px] flex items-start gap-2">
            <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
            <span>
              Per PRD Section 7.3: This ratio is configured for experimental validation and adapts continuously as new swipe interaction telemetry is recorded.
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
