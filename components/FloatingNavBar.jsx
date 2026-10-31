'use client';

import React from 'react';
import { Camera, Gift, Home } from 'lucide-react';
import { playChimeSound } from './AudioChime';

export default function FloatingNavBar({
  currentStep = 'landing',
  onNavigate = () => {},
  hasUnlockedCoupon = false,
  onOpenCoupon = () => {},
  shopName = 'Dream Salon',
}) {
  // Hide the floating nav bar during camera mode to prevent UI overlap
  if (currentStep === 'camera') {
    return null;
  }

  return (
    <nav className="fixed top-3 inset-x-3 sm:inset-x-6 max-w-3xl mx-auto z-50 select-none">
      <div className="relative rounded-2xl bg-[#280516]/85 backdrop-blur-xl border border-gold-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.25)] px-4 py-2.5 flex items-center justify-between gap-2 transition-all duration-300">
        {/* Left: Brand Identity with Gold Logo Emblem */}
        <button
          onClick={() => {
            playChimeSound('click');
            onNavigate('landing');
          }}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#690f34] via-[#941b4b] to-[#d4af37] p-1.5 flex items-center justify-center border border-gold-300/60 shadow-sm group-hover:scale-105 transition">
            <span className="text-sm">🪔</span>
          </div>
          <div>
            <span className="block font-serif text-xs sm:text-sm font-bold gold-gradient-text tracking-wider leading-none">
              {shopName}
            </span>
            <span className="block text-[8px] sm:text-[9px] font-sans tracking-[0.2em] text-[#fae7b4]/70 uppercase font-medium mt-0.5">
              Diwali Celebration
            </span>
          </div>
        </button>

        {/* Right: Clean Navigation Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 p-1 rounded-xl border border-gold-500/20 text-xs">
          <button
            onClick={() => {
              playChimeSound('click');
              onNavigate('landing');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentStep === 'landing'
                ? 'bg-gradient-to-r from-gold-500 to-amber-500 text-black font-bold shadow-sm'
                : 'text-champagne/70 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              playChimeSound('click');
              onNavigate('camera');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentStep === 'camera'
                ? 'bg-gradient-to-r from-gold-500 to-amber-500 text-black font-bold shadow-sm'
                : 'text-champagne/70 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Photo Booth</span>
          </button>

          {hasUnlockedCoupon && (
            <button
              onClick={() => {
                playChimeSound('click');
                onOpenCoupon();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 font-bold animate-pulse hover:bg-emerald-900 transition"
            >
              <Gift className="w-3.5 h-3.5 text-emerald-400" />
              <span>My Coupon</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
