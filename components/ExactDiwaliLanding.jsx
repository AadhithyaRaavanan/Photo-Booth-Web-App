'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import { playChimeSound } from './AudioChime';

/**
 * ExactDiwaliLanding Component — Luxury Boutique Indian Festive Redesign
 *
 * Visual Improvements:
 * - Refined typographic wordmark ("Dream Salon" + "BEAUTY · STYLE · CONFIDENCE")
 * - Composed display serif headline with elegant weight & italic contrast (no clashing neon fonts)
 * - Tactile, perforated festive voucher ticket with scalloped cutouts & gold foil stamp
 * - Solid antique marigold CTA with deep plum typography & subtle inner highlight (no cyan neon)
 * - Quiet top bar with minimalist Admin text link & tasteful label
 * - Clean "Enter · Snap · Share" step progress in footer
 */
function ExactDiwaliLanding({
  shopName = 'Dream Salon',
  shopConfig = {},
  customerName = '',
  onEnterPhotoBooth = () => {},
  onOpenNameModal = () => {},
}) {
  const currentShopName = shopConfig.shopName || shopName || 'Dream Salon';
  const currentTagline = shopConfig.shopTagline || 'BEAUTY · STYLE · CONFIDENCE';
  const currentHeadline = shopConfig.campaignHeadline || 'DIWALI PARTY';
  const currentDiscount = shopConfig.discountLabel || (shopConfig.defaultDiscount ? `FLAT ${shopConfig.defaultDiscount} OFF` : 'FLAT 30% OFF');
  const discountShort = shopConfig.defaultDiscount ? `${shopConfig.defaultDiscount.replace('%', '')}% OFF` : '30% OFF';
  const currentSubtext =
    shopConfig.campaignSubtext ||
    `Step into our royal festive photo booth, frame your portrait with handcrafted palace frames, and share to unlock your exclusive ${discountShort} salon pass.`;

  return (
    <div className="min-h-screen w-full relative z-10 flex flex-col justify-between text-[#f6ebdd] select-none overflow-x-hidden">
      {/* ---------------------------------------------------------------------
          1. REFINED TOP BAR (Quiet Admin link & understated pass badge)
         --------------------------------------------------------------------- */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-5 sm:pt-7 pb-2 flex items-center justify-between">
        {/* Left: Quiet Admin Text Link & Brand Wordmark */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/admin"
            className="text-[11px] font-medium tracking-wider text-[#a89cb5] hover:text-[#f2c14e] transition-colors py-1 flex items-center gap-1.5 group"
            title="Admin Dashboard"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8a33d]/70 group-hover:bg-[#f2c14e] transition-colors" />
            <span className="uppercase tracking-widest text-[10px]">Admin</span>
          </Link>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          {/* Refined Brand Wordmark */}
          <div className="flex items-center gap-2.5">
            <svg
              className="w-5 h-5 text-[#e8a33d] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Elegant Diya Motif */}
              <path d="M4 14c0 4.418 3.582 8 8 8s8-3.582 8-8H4z" fill="rgba(232, 163, 61, 0.2)" />
              <path d="M12 2c-1.5 2.5-3 5-3 7a3 3 0 0 0 6 0c0-2-1.5-4.5-3-7z" fill="#f2c14e" stroke="none" />
              <path d="M3 14h18" strokeLinecap="round" />
            </svg>
            <div>
              <span className="font-serif text-sm sm:text-base font-bold tracking-wider text-white block uppercase leading-tight">
                {currentShopName}
              </span>
              <span className="text-[9px] text-[#a89cb5] tracking-[0.22em] font-sans font-medium uppercase block">
                {currentTagline}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Small Elegant Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14051f]/80 border border-[#e8a33d]/25 text-[11px] text-[#f6ebdd] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8a33d]" />
          <span className="font-serif font-semibold text-[#f2c14e] tracking-wide">{discountShort} PASS</span>
        </div>
      </header>

      {/* ---------------------------------------------------------------------
          2. GIANT TRANSLUCENT SKY WATERMARK ("2026" Tone-on-Tone)
         --------------------------------------------------------------------- */}
      <div
        className="pointer-events-none absolute right-4 sm:right-16 top-16 sm:top-20 select-none z-0"
        aria-hidden="true"
      >
        <span className="font-serif font-bold text-[140px] sm:text-[220px] md:text-[270px] text-white/[0.03] leading-none block tracking-tight">
          2026
        </span>
      </div>

      {/* ---------------------------------------------------------------------
          3. HERO STAGE CONTENT (Left Headline + Right Tactile Ticket)
         --------------------------------------------------------------------- */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 md:py-12 flex flex-col justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: COMPOSED TYPOGRAPHY & SOLID MARIGOLD CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5"
          >
            {/* Subtle Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a0828]/70 border border-[#e8a33d]/25 text-[11px] font-medium text-[#f6d289] tracking-wider uppercase">
              <span className="text-[10px] text-[#e8a33d]">✦</span>
              <span>Diwali Festive Collection</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80 font-normal">Complimentary Portrait Pass</span>
            </div>

            {/* Composed Headline Lockup */}
            <div className="space-y-1">
              <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#f2c14e] font-normal tracking-wide">
                Celebrate the joy of
              </p>
              <h1 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.08] capitalize">
                {currentHeadline.toLowerCase()}
              </h1>
            </div>

            {/* Sub-Headline & Description */}
            <p className="text-sm sm:text-base text-[#f6ebdd]/90 font-medium">
              Radiant festive portraits crafted in moments, framed in palace gold.
            </p>

            <p className="text-xs sm:text-sm text-[#a89cb5] max-w-xl leading-relaxed font-normal">
              {currentSubtext}
            </p>

            {/* PRIMARY CALL TO ACTION BUTTON (Solid Marigold-Gold, Deep Plum Text) */}
            <div className="pt-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playChimeSound('click');
                  onOpenNameModal();
                }}
                className="w-full sm:w-auto py-4 px-9 sm:px-11 rounded-full btn-primary-marigold text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-3 active:scale-98 group cursor-pointer"
              >
                <Camera className="w-4 h-4 stroke-[2.2]" />
                <span>Enter Photo Booth</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: TACTILE FESTIVE VOUCHER TICKET */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-md rounded-2xl p-6 sm:p-7 boutique-card relative space-y-5">
              {/* Delicate Corner Filigree Ornaments */}
              <div className="absolute top-2.5 left-2.5 text-[#e8a33d]/25 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M2 12C2 6.477 6.477 2 12 2" strokeWidth="1" />
                  <path d="M5 12C5 8.134 8.134 5 12 5" strokeWidth="0.8" />
                </svg>
              </div>
              <div className="absolute top-2.5 right-2.5 text-[#e8a33d]/25 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 12C22 6.477 17.523 2 12 2" strokeWidth="1" />
                  <path d="M19 12C19 8.134 15.866 5 12 5" strokeWidth="0.8" />
                </svg>
              </div>

              {/* Ticket Top: Shop Stamp & Discount Seal */}
              <div className="flex items-center justify-between border-b border-[#e8a33d]/15 pb-4">
                <div>
                  <span className="text-[10px] text-[#f2c14e] font-semibold uppercase tracking-widest block">
                    Festive Invitation Pass
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white tracking-wide mt-0.5">
                    {currentShopName} VIP
                  </h3>
                </div>

                {/* Stamped 30% OFF Seal */}
                <div className="relative px-3.5 py-1.5 rounded-xl bg-gradient-to-br from-[#9e1644] to-[#680b2c] border border-[#e8a33d]/40 shadow-sm text-center">
                  <span className="block text-[9px] uppercase tracking-wider text-[#f6ebdd]/80 font-medium">
                    Reward
                  </span>
                  <span className="block text-xs sm:text-sm font-serif font-black text-white tracking-wider">
                    {discountShort}
                  </span>
                </div>
              </div>

              {/* Ruled Benefits List with Custom SVG Icons */}
              <div className="space-y-3 py-1">
                {/* Benefit 1 */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#0e0316]/60 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#e8a33d]/10 border border-[#e8a33d]/25 text-[#f2c14e] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      Eight Royal Palace Frames
                    </span>
                    <span className="text-[11px] text-[#a89cb5] block leading-snug mt-0.5">
                      Twin peacocks, marigold garlands, and authentic temple arches.
                    </span>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#0e0316]/60 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#e8a33d]/10 border border-[#e8a33d]/25 text-[#f2c14e] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="5" y="2" width="14" height="20" rx="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      Tailored 9:16 Story Download
                    </span>
                    <span className="text-[11px] text-[#a89cb5] block leading-snug mt-0.5">
                      High-resolution 1080×1920 export formatted for Instagram &amp; WhatsApp.
                    </span>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#0e0316]/60 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#e8a33d]/10 border border-[#e8a33d]/25 text-[#f2c14e] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="9" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      Instant Verified Salon Voucher
                    </span>
                    <span className="text-[11px] text-[#a89cb5] block leading-snug mt-0.5">
                      Share your festive story to reveal your unique QR discount code.
                    </span>
                  </div>
                </div>
              </div>

              {/* Perforated Divider Line */}
              <div className="pt-2 border-t border-dashed border-[#e8a33d]/25" />

              {/* Secondary Card Action */}
              <button
                onClick={() => {
                  playChimeSound('click');
                  onOpenNameModal();
                }}
                className="w-full py-3 px-4 rounded-xl btn-secondary-boutique text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Camera &amp; Select Frame</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#e8a33d]" />
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* ---------------------------------------------------------------------
          4. REFINED BOTTOM STEPPER & FOOTER
         --------------------------------------------------------------------- */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#a89cb5]">
        {/* Left: Clean 3-Step Progress */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-serif text-xs">
            <span className="font-bold text-[#f2c14e]">01</span>
            <div className="w-10 sm:w-14 h-px bg-[#e8a33d]/40" />
            <span className="text-[#a89cb5]/60">03</span>
          </div>
          <span className="text-[11px] text-[#f6ebdd]/80 font-medium">
            Enter · Snap · Share
          </span>
        </div>

        {/* Right: Understated Domain & Festive Edition */}
        <div className="flex items-center gap-3 text-[11px] text-[#a89cb5]">
          <span className="font-medium text-[#f6ebdd]/80">
            www.dreamsalon.com
          </span>
          <span>·</span>
          <span>Diwali Festive Edition</span>
        </div>
      </footer>
    </div>
  );
}

export default React.memo(ExactDiwaliLanding);
