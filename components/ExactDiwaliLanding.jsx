'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Gift,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { playChimeSound } from './AudioChime';

/**
 * ExactDiwaliLanding Component
 *
 * Clean, modern festive UI matching the reference design:
 * - NO cluttered navbar (clean minimal top branding)
 * - Single primary CTA button: [ ENTER PHOTO BOOTH ✦ ] that directly triggers the Name Modal
 * - High-contrast text & glassmorphism cards that let the evening sky & fireworks shine through
 * - Bottom stepper progress indicator: 01 ──── 03
 */
export default function ExactDiwaliLanding({
  shopName = 'Dream Salon',
  customerName = '',
  onEnterPhotoBooth = () => {},
  onOpenNameModal = () => {},
}) {
  return (
    <div className="min-h-screen w-full relative z-10 flex flex-col justify-between text-white select-none overflow-x-hidden">
      {/* ---------------------------------------------------------------------
          1. CLEAN TOP BRANDING (NO NAVBAR - Clean & Minimal)
         --------------------------------------------------------------------- */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-2 flex items-center justify-between">
        {/* Left: Brand Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)]">
            <span className="text-base">🪔</span>
          </div>
          <div>
            <span className="font-serif font-black tracking-widest text-sm sm:text-base text-white block uppercase leading-none drop-shadow">
              {shopName}
            </span>
            <span className="text-[10px] text-cyan-300 tracking-[0.22em] font-sans font-bold uppercase block mt-0.5">
              ROYAL FESTIVE PHOTO BOOTH
            </span>
          </div>
        </div>

        {/* Right: Quick Festive Pass Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0319]/80 backdrop-blur-md border border-cyan-400/35 text-xs text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span className="font-bold text-amber-300">FLAT 30% OFF PASS</span>
        </div>
      </header>

      {/* ---------------------------------------------------------------------
          2. GIANT TRANSLUCENT SKY WATERMARK ("2026")
         --------------------------------------------------------------------- */}
      <div
        className="pointer-events-none absolute right-4 sm:right-16 top-16 sm:top-20 select-none z-0"
        aria-hidden="true"
      >
        <span className="font-sans font-black text-[140px] sm:text-[220px] md:text-[270px] text-white/[0.04] leading-none block tracking-tighter">
          2026
        </span>
      </div>

      {/* ---------------------------------------------------------------------
          3. HERO STAGE CONTENT (Left Headline + Right Showcase Card)
         --------------------------------------------------------------------- */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 md:py-10 flex flex-col justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: HERO TYPOGRAPHY & SINGLE CTA BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5"
          >
            {/* Top Festive Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/75 border border-cyan-400/40 text-cyan-200 text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Diwali Festive Edition</span>
              <span className="text-amber-400 font-extrabold">✦</span>
              <span className="text-amber-300 font-black">EXCLUSIVE GIFT PASS</span>
            </div>

            {/* Script Cursive Accent */}
            <div className="font-serif italic font-normal text-cyan-300 text-3xl sm:text-5xl md:text-6xl drop-shadow-[0_0_25px_rgba(34,211,238,0.7)] tracking-wide">
              Happy Festive
            </div>

            {/* Bold All-Caps Title */}
            <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05] uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
              DIWALI PARTY
            </h1>

            {/* Sub-Headline */}
            <h2 className="font-sans font-extrabold text-xs sm:text-sm md:text-base text-cyan-100/90 tracking-[0.25em] uppercase">
              CELEBRATE WITH US &amp; UNLOCK EXCLUSIVE 30% REWARD!
            </h2>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200/85 max-w-xl leading-relaxed font-normal">
              Capture your radiant celebration at{' '}
              <strong className="text-white font-bold">{shopName}</strong>! Step into our royal
              photo booth, frame your portrait with authentic Diwali palace frames, and share to
              unlock your verified 30% OFF salon pass.
            </p>

            {/* SINGLE CALL TO ACTION BUTTON (Directly opens Name Modal with Skip option) */}
            <div className="pt-2 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playChimeSound('click');
                  onOpenNameModal();
                }}
                className="w-full sm:w-auto py-4 px-9 sm:px-11 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-sans font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(6,182,212,0.7)] flex items-center justify-center gap-3 transition active:scale-95 group"
              >
                <Camera className="w-4 h-4 stroke-[2.5]" />
                <span>ENTER PHOTO BOOTH</span>
                <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: SLEEK GLASSMORPHISM SHOWCASE CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-md rounded-3xl p-6 sm:p-7 bg-[#090317]/80 backdrop-blur-xl border border-cyan-400/35 shadow-[0_0_50px_rgba(0,0,0,0.75)] relative overflow-hidden space-y-5">
              {/* Ambient Glow Blobs */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header: 30% Pass Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 font-bold">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-black text-sm text-white block">
                      DIWALI FESTIVE PASS
                    </span>
                    <span className="text-[10px] text-amber-300/80 uppercase font-bold tracking-wider">
                      Dream Salon Exclusive
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#e91e63] to-[#ff5722] text-white font-black text-xs tracking-wider uppercase shadow-md animate-pulse">
                  30% OFF
                </span>
              </div>

              {/* Perks List */}
              <div className="space-y-3 py-1">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-400/30 transition">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      8 Authentic Royal Frames
                    </span>
                    <span className="text-[11px] text-slate-300/75 block">
                      Peacock arches, marigold garlands, and 24K gold foil borders.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-400/30 transition">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Exact 1080×1920 Story Export
                    </span>
                    <span className="text-[11px] text-slate-300/75 block">
                      1-click download tailored for Instagram Story &amp; WhatsApp Status.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-400/30 transition">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Instant Verified Voucher
                    </span>
                    <span className="text-[11px] text-slate-300/75 block">
                      Share to unlock your instant QR discount code on the spot.
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Action: Also opens Name Modal */}
              <button
                onClick={() => {
                  playChimeSound('click');
                  onOpenNameModal();
                }}
                className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-cyan-400/40 text-cyan-200 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>Launch Camera &amp; Frames</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* ---------------------------------------------------------------------
          4. BOTTOM STEPPER / TIMELINE (Matching "01 ──── 03" in reference image)
         --------------------------------------------------------------------- */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        {/* Left: 01 ─── 03 Stepper indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="font-bold text-cyan-300">01</span>
            <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500/20 rounded-full" />
            <span className="text-slate-500">03</span>
          </div>
          <span className="hidden sm:inline text-[11px] text-slate-300 font-medium">
            Page 1: Enter Booth → Page 2: Snap Portrait → Page 3: Share &amp; Rewards
          </span>
        </div>

        {/* Right: URL & Status */}
        <div className="flex items-center gap-4 text-[11px]">
          <span className="font-sans font-bold text-slate-200 tracking-wider">
            www.dreamsalon.com
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-cyan-300/80">Diwali Festive Photo Booth 2026</span>
        </div>
      </footer>
    </div>
  );
}
