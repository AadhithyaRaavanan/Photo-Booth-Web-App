'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Flame,
  Gift,
  Share2,
  CheckCircle2,
  Sliders,
  Menu,
} from 'lucide-react';
import { playChimeSound } from './AudioChime';

/**
 * ExactDiwaliLanding Component
 *
 * Implements the Modern Festive Evening UI Design inspired by the user's reference:
 * - Top navigation bar with active cyan underline indicator
 * - Elegant cursive script accent "Happy Festive" paired with bold all-caps "DIWALI PARTY / CELEBRATE WITH US!"
 * - Radiant cyan / electric blue call-to-action button
 * - Background translucent "2026" watermark layered in the night sky
 * - Bottom stepper progress indicator "01 ──── 03"
 * - Sleek glassmorphism festive privileges card on the right
 * - High-contrast text, buttons, and icons that never interfere with the background animations
 */
export default function ExactDiwaliLanding({
  shopName = 'Dream Salon',
  customerName = '',
  onEnterPhotoBooth = () => {},
  onOpenNameModal = () => {},
}) {
  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between text-white select-none overflow-x-hidden">
      {/* ---------------------------------------------------------------------
          1. TOP NAVIGATION HEADER (Matching reference layout)
         --------------------------------------------------------------------- */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-5 pb-3 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <span className="text-base">🪔</span>
          </div>
          <div>
            <span className="font-serif font-black tracking-widest text-sm sm:text-base text-white block uppercase leading-none">
              {shopName}
            </span>
            <span className="text-[10px] text-cyan-300/80 tracking-[0.2em] font-sans font-bold uppercase block mt-0.5">
              PHOTO BOOTH · 30% OFF
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links with Active Cyan Pill Indicator */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-white/70">
          <div className="relative cursor-pointer text-white">
            <span className="text-cyan-300">Home</span>
            <div className="w-5 h-0.5 bg-cyan-400 mx-auto mt-1 rounded-full shadow-[0_0_8px_#22d3ee]" />
          </div>
          <button
            onClick={() => {
              playChimeSound('click');
              onEnterPhotoBooth();
            }}
            className="hover:text-cyan-300 transition"
          >
            Palace Frames
          </button>
          <button
            onClick={() => {
              playChimeSound('click');
              onOpenNameModal();
            }}
            className="hover:text-cyan-300 transition"
          >
            {customerName ? `Guest: ${customerName}` : 'Personalize'}
          </button>
          <a
            href="#rewards"
            onClick={(e) => {
              e.preventDefault();
              playChimeSound('click');
              onEnterPhotoBooth();
            }}
            className="hover:text-cyan-300 transition"
          >
            Claim 30% OFF
          </a>
        </nav>

        {/* Right: Quick CTA Badge & Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playChimeSound('click');
              onOpenNameModal();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-cyan-400/30 text-xs font-semibold text-cyan-200 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>{customerName ? customerName : 'Guest Login'}</span>
          </button>

          <button
            onClick={() => {
              playChimeSound('click');
              onEnterPhotoBooth();
            }}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-sans font-black text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.5)] transition active:scale-95 flex items-center gap-1.5"
          >
            <span>JOIN BOOTH</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ---------------------------------------------------------------------
          2. GIANT TRANSLUCENT SKY WATERMARK ("2026" / "DIWALI")
         --------------------------------------------------------------------- */}
      <div
        className="pointer-events-none absolute right-4 sm:right-16 top-20 sm:top-24 select-none z-0"
        aria-hidden="true"
      >
        <span className="font-sans font-black text-[130px] sm:text-[210px] md:text-[260px] text-white/[0.035] leading-none block tracking-tighter">
          2026
        </span>
      </div>

      {/* ---------------------------------------------------------------------
          3. HERO STAGE CONTENT (Left Headline + Right Showcase Card)
         --------------------------------------------------------------------- */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 md:py-10 flex flex-col justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: HERO TYPOGRAPHY & CALL TO ACTION */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5"
          >
            {/* Top Festive Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-200 text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Diwali Festive Edition</span>
              <span className="text-amber-400 font-extrabold">✦</span>
              <span className="text-amber-300 font-black">FLAT 30% OFF PASS</span>
            </div>

            {/* Script Cursive Accent (Matching user reference "Happy New") */}
            <div className="font-serif italic font-normal text-cyan-300 text-3xl sm:text-5xl md:text-6xl drop-shadow-[0_0_25px_rgba(34,211,238,0.7)] tracking-wide">
              Happy Festive
            </div>

            {/* Bold All-Caps Title (Matching user reference "YEAR'S PARTY") */}
            <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              DIWALI PARTY
            </h1>

            {/* Sub-Headline (Matching user reference "CELEBRATE WITH US!") */}
            <h2 className="font-sans font-extrabold text-xs sm:text-sm md:text-base text-cyan-100/90 tracking-[0.25em] uppercase">
              CELEBRATE WITH US &amp; UNLOCK EXCLUSIVE 30% REWARD!
            </h2>

            {/* Personalized Guest Badge */}
            {customerName && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-amber-400/40 text-xs text-amber-200">
                <span>
                  Welcome, <strong className="text-white font-bold">{customerName}</strong>!
                </span>
                <button
                  onClick={onOpenNameModal}
                  className="underline text-cyan-300 hover:text-white text-[11px]"
                >
                  (Change)
                </button>
              </div>
            )}

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200/85 max-w-xl leading-relaxed font-normal">
              Capture your radiant celebration at{' '}
              <strong className="text-white font-bold">{shopName}</strong>! Step into our royal
              photo booth, frame your portrait with authentic Diwali palace frames, and share to
              unlock your verified 30% OFF salon pass.
            </p>

            {/* Call To Action Buttons (Matching reference vibrant cyan button) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playChimeSound('click');
                  onEnterPhotoBooth();
                }}
                className="w-full sm:w-auto py-3.5 sm:py-4 px-8 sm:px-10 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-sans font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(6,182,212,0.65)] flex items-center justify-center gap-2.5 transition active:scale-95 group"
              >
                <Camera className="w-4 h-4 stroke-[2.5]" />
                <span>ENTER PHOTO BOOTH</span>
                <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                onClick={() => {
                  playChimeSound('click');
                  onOpenNameModal();
                }}
                className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{customerName ? 'Edit Name' : 'Personalize Greeting'}</span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: SLEEK GLASSMORPHISM SHOWCASE CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-md rounded-3xl p-6 sm:p-7 bg-[#0b041c]/75 backdrop-blur-xl border border-cyan-400/30 shadow-[0_0_50px_rgba(0,0,0,0.7)] relative overflow-hidden space-y-5">
              {/* Top ambient glow blob */}
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

              {/* Bottom Card Action */}
              <button
                onClick={() => {
                  playChimeSound('click');
                  onEnterPhotoBooth();
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
          4. BOTTOM STEPPER / TIMELINE (Matching "01 ──── 04" in reference image)
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
