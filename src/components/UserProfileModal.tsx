import React, { useState } from 'react';
import { X, User, Coins, Award, Shield, AlertTriangle, GraduationCap, Check } from 'lucide-react';
import { FashionAesthetic } from '../types';
import { useShazlo } from '../context/ShazloContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { userProfile, updateUserProfile, coins, stylistTier, resetUserAccount } = useShazlo();

  const [name, setName] = useState(userProfile.name);
  const [age, setAge] = useState(userProfile.age);
  const [gender, setGender] = useState(userProfile.gender);
  const [studentStatus, setStudentStatus] = useState(userProfile.studentStatus);
  const [college, setCollege] = useState(userProfile.college);
  const [selectedAesthetics, setSelectedAesthetics] = useState<FashionAesthetic[]>(userProfile.preferredAesthetics);
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSavedToast, setIsSavedToast] = useState(false);

  if (!isOpen) return null;

  const allAesthetics: FashionAesthetic[] = [
    'Quiet Luxury',
    'Minimalist',
    'Streetwear',
    'Romantic / Bohemian',
    'Parisian Chic',
    'Tailored Classic'
  ];

  const handleToggleAesthetic = (aesthetic: FashionAesthetic) => {
    setSelectedAesthetics(prev => 
      prev.includes(aesthetic)
        ? prev.filter(a => a !== aesthetic)
        : [...prev, aesthetic]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      age: Number(age),
      gender,
      studentStatus,
      college,
      preferredAesthetics: selectedAesthetics
    });
    setIsSavedToast(true);
    setTimeout(() => {
      setIsSavedToast(false);
      onClose();
    }, 600);
  };

  const handleDeleteAccount = () => {
    resetUserAccount();
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-stone-900" />
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              Style Profile & Account
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Stylist Tier & Coins Gamification Banner */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                  Curator Status
                </span>
                <h4 className="font-editorial text-xl font-bold text-stone-900">
                  {stylistTier.title}
                </h4>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm">
                <Coins className="w-4 h-4 text-amber-600" />
                <span className="font-mono text-sm font-bold text-stone-900 tabular-nums">
                  {coins} coins
                </span>
              </div>
            </div>

            {/* Progress to next tier */}
            <div>
              <div className="flex justify-between text-[11px] text-stone-500 mb-1">
                <span>Progress to next styling milestone</span>
                <span className="font-mono">{Math.round(stylistTier.progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-900 rounded-full transition-all duration-300"
                  style={{ width: `${stylistTier.progress}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-stone-500">
              Earn coins with every gesture (+1 like, +2 closet, +3 cart intent) to unlock private brand partner drops.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  min="16"
                  max="99"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Gender Expression
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
                >
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Male">Male</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Student & College */}
            <div className="p-3.5 rounded-xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 font-semibold text-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={studentStatus}
                    onChange={(e) => setStudentStatus(e.target.checked)}
                    className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900"
                  />
                  <span>Student Status (Campus Trends & Discounts)</span>
                </label>
                <GraduationCap className="w-4 h-4 text-stone-400" />
              </div>

              {studentStatus && (
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">
                    College / University Campus
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Parsons School of Design, NYU, UCLA"
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
                  />
                </div>
              )}
            </div>

            {/* Aesthetic Affinities (Feed into 30% demographic and preference weighting) */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1.5">
                Preferred Fashion Aesthetics (Select all that fit your vibe)
              </label>
              <div className="flex flex-wrap gap-2">
                {allAesthetics.map(aesthetic => {
                  const isSelected = selectedAesthetics.includes(aesthetic);
                  return (
                    <button
                      key={aesthetic}
                      type="button"
                      onClick={() => handleToggleAesthetic(aesthetic)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {aesthetic}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Privacy Controls & Account Deletion */}
            <div className="pt-3 border-t border-stone-100">
              <div className="flex items-start gap-2 text-[11px] text-stone-500 mb-3">
                <Shield className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>
                  Your interaction preferences are processed locally to calibrate recommendations.
                  You can purge your saved sessions and request immediate data deletion below.
                </span>
              </div>

              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                >
                  Delete Account & Purge Interaction Data
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-rose-800 font-bold">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Confirm Complete Data Deletion?</span>
                  </div>
                  <p className="text-[11px] text-rose-700">
                    This will permanently delete your closet, cart intent list, swipe preferences, and coin balance.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-700"
                    >
                      Confirm Purge
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-1.5 rounded-lg bg-stone-200 text-stone-700 font-medium text-xs hover:bg-stone-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-semibold hover:bg-stone-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 shadow-sm"
              >
                {isSavedToast ? <Check className="w-4 h-4" /> : null}
                <span>{isSavedToast ? 'Saved!' : 'Save Profile'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
