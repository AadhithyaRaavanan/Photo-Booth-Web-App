'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ArrowRight, Sparkles } from 'lucide-react';
import { playChimeSound } from './AudioChime';

/**
 * ExactDiwaliLanding Component
 * 1:1 identical reproduction of the reference image:
 * - Hanging yellow festive string lights garland across top
 * - Dark purple background with translucent star silhouettes & sparkles
 * - "Happy Diwali" in crisp bold white slab serif
 * - "FESTIVAL OF LIGHTS" in golden yellow
 * - Multiline descriptive text
 * - Neon hot-pink CTA button
 * - Center-right festive artwork: multi-layered colorful lotus, painted diya with glowing halo, decorated candle, colorful sparkler bursts
 * - Right sidebar: "12th / Friday", "Snack & Style", "Special 30% OFF" with horizontal dividers
 * - Bottom URL: "www.dreamsalon.com"
 */
export default function ExactDiwaliLanding({
  shopName = 'Dream Salon',
  customerName = '',
  onEnterPhotoBooth = () => {},
  onOpenNameModal = () => {},
}) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#240338] text-white flex flex-col justify-between select-none">
      
      {/* =========================================================================
          1. BACKGROUND: VIBRANT PURPLE GRADIENT + TRANSLUCENT STAR SILHOUETTES
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Rich purple background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4a0a64] via-[#2f0447] to-[#180126]" />

        {/* Large translucent dark purple 5-point star silhouettes */}
        <svg viewBox="0 0 1200 650" className="absolute inset-0 w-full h-full object-cover opacity-35">
          {/* Top-left star */}
          <polygon points="120,40 145,115 225,115 160,165 185,240 120,195 55,240 80,165 15,115 95,115" fill="#170124" />
          {/* Top-center star */}
          <polygon points="380,20 400,85 470,85 415,125 435,190 380,150 325,190 345,125 290,85 360,85" fill="#190226" />
          {/* Top-right star */}
          <polygon points="920,30 945,105 1025,105 960,155 985,230 920,185 855,230 880,155 815,105 895,105" fill="#170124" />
          {/* Mid-right star */}
          <polygon points="560,380 580,440 645,440 595,480 615,540 560,500 505,540 525,480 475,440 540,440" fill="#180126" />
          {/* Bottom-left star */}
          <polygon points="260,420 280,480 345,480 295,520 315,580 260,540 205,580 225,520 175,480 240,480" fill="#150122" />
        </svg>

        {/* Scattered 4-point sparkle stars with glowing aura */}
        <div className="absolute top-[22%] left-[42%] text-[#ff80bf] animate-pulse">
          <SparkleSVG size={16} />
        </div>
        <div className="absolute top-[18%] left-[72%] text-white animate-pulse" style={{ animationDelay: '1s' }}>
          <SparkleSVG size={14} />
        </div>
        <div className="absolute top-[38%] right-[22%] text-[#ffd54f] animate-pulse" style={{ animationDelay: '0.5s' }}>
          <SparkleSVG size={18} />
        </div>
        <div className="absolute bottom-[28%] left-[34%] text-pink-300 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <SparkleSVG size={15} />
        </div>
        <div className="absolute bottom-[16%] left-[7%] text-white/80 animate-pulse" style={{ animationDelay: '2s' }}>
          <SparkleSVG size={12} />
        </div>
        <div className="absolute top-[60%] right-[6%] text-amber-200 animate-pulse" style={{ animationDelay: '0.7s' }}>
          <SparkleSVG size={14} />
        </div>
      </div>

      {/* =========================================================================
          2. TOP HANGING STRING LIGHTS GARLAND (Identical to reference)
         ========================================================================= */}
      <div className="relative z-10 w-full overflow-hidden pointer-events-none select-none">
        <svg viewBox="0 0 1200 65" className="w-full h-12 sm:h-16 object-fill">
          <defs>
            <filter id="bulbGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dotted top swag line */}
          <path
            d="M 0,8 Q 150,30 300,8 Q 450,30 600,8 Q 750,30 900,8 Q 1050,30 1200,8"
            fill="none"
            stroke="#ffca28"
            strokeWidth="1.2"
            strokeDasharray="4,4"
            opacity="0.6"
          />

          {/* Main sagging wire */}
          <path
            d="M 0,16 Q 150,44 300,16 Q 450,44 600,16 Q 750,44 900,16 Q 1050,44 1200,16"
            fill="none"
            stroke="#ffd54f"
            strokeWidth="2"
          />

          {/* Glowing circular yellow light bulbs hanging from wire */}
          {[
            [30, 24], [60, 31], [90, 37], [120, 42], [150, 44], [180, 42], [210, 37], [240, 31], [270, 24],
            [330, 24], [360, 31], [390, 37], [420, 42], [450, 44], [480, 42], [510, 37], [540, 31], [570, 24],
            [630, 24], [660, 31], [690, 37], [720, 42], [750, 44], [780, 42], [810, 37], [840, 31], [870, 24],
            [930, 24], [960, 31], [990, 37], [1020, 42], [1050, 44], [1080, 42], [1110, 37], [1140, 31], [1170, 24]
          ].map(([x, y], idx) => (
            <g key={idx}>
              {/* Vertical string */}
              <line x1={x} y1={y - 6} x2={x} y2={y} stroke="#ffca28" strokeWidth="1" />
              {/* Glowing bulb */}
              <circle cx={x} cy={y + 3} r="4.5" fill="#fff59d" stroke="#ffb300" strokeWidth="1" filter="url(#bulbGlow)" />
            </g>
          ))}
        </svg>
      </div>

      {/* =========================================================================
          3. MAIN STAGE CONTENT (RESPONSIVE EXACT LAYOUT)
         ========================================================================= */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 md:py-6 flex flex-col justify-center">
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-8">

          {/* -------------------------------------------------------------------
              LEFT COLUMN: "Happy Diwali / FESTIVAL OF LIGHTS" + TEXT + READ MORE
             ------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[42%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-4"
          >
            {/* Main Title: "Happy Diwali" */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              Happy Diwali
            </h1>

            {/* Subheading: "FESTIVAL OF LIGHTS" */}
            <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-black text-[#ffd54f] tracking-[0.18em] uppercase drop-shadow-sm">
              FESTIVAL OF LIGHTS
            </h2>

            {/* Personalized greeting note */}
            {customerName && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-pink-500/20 border border-pink-400/40 text-xs font-semibold text-pink-200">
                <span>Welcome, <strong className="text-amber-300">{customerName}</strong>!</span>
                <button onClick={onOpenNameModal} className="underline text-amber-400 hover:text-white text-[11px]">
                  (Edit)
                </button>
              </div>
            )}

            {/* Paragraph Text (Clean, matching reference layout) */}
            <p className="text-xs sm:text-sm md:text-base text-violet-100/90 max-w-lg leading-relaxed font-normal">
              Capture your radiant festive glow at <strong className="text-white font-bold">{shopName}</strong>! Step into our royal festive photo booth, celebrate Diwali with our exclusive palace frame, and instantly unlock your exclusive 30% OFF salon voucher.
            </p>

            {/* CTA Button: NEON HOT PINK (Identical to "READ MORE" button in reference) */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playChimeSound('click');
                  onEnterPhotoBooth();
                }}
                className="py-3 sm:py-3.5 px-8 sm:px-10 rounded-lg bg-[#e91e63] hover:bg-[#ff1475] active:bg-[#d81557] text-white font-sans font-black text-sm sm:text-base tracking-widest uppercase shadow-[0_6px_25px_rgba(233,30,99,0.6)] flex items-center gap-2.5 transition group"
              >
                <span>ENTER PHOTO BOOTH</span>
                <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* -------------------------------------------------------------------
              CENTER-RIGHT FOCAL ARTWORK: LOTUS + DIYA + CANDLE + SPARKLER BURSTS
             ------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-[40%] flex items-center justify-center relative select-none py-2"
          >
            <div className="relative w-[340px] h-[260px] sm:w-[440px] sm:h-[320px] md:w-[480px] md:h-[350px]">
              
              {/* 1. Upper Celebratory Firework Burst (Lime, Pink, Turquoise, Orange, Yellow) */}
              <div className="absolute -top-6 right-28 sm:right-36 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none">
                <TopFireworkBurstSVG />
              </div>

              {/* 2. Left Firework Burst */}
              <div className="absolute bottom-6 left-0 sm:left-4 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none">
                <LeftFireworkBurstSVG />
              </div>

              {/* 3. Right Firework Burst */}
              <div className="absolute bottom-8 right-2 sm:right-6 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none">
                <RightFireworkBurstSVG />
              </div>

              {/* 4. Purple Oval Platform underneath the lotus & diya */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-10 sm:h-12 rounded-[50%] bg-[#7b1fa2]/40 blur-md pointer-events-none" />

              {/* 5. Center Multi-Layered Lotus Flower */}
              <div className="absolute bottom-2 left-6 sm:left-10 z-20 w-44 sm:w-56 md:w-64">
                <ExactLotusFlowerSVG />
              </div>

              {/* 6. Painted Clay Diya with Halo */}
              <div className="absolute bottom-4 right-20 sm:right-28 z-20 w-28 sm:w-36">
                <ExactPaintedDiyaSVG />
              </div>

              {/* 7. Decorated Patterned Pillar Candle with Halo */}
              <div className="absolute bottom-4 right-6 sm:right-10 z-20 w-16 sm:w-20">
                <ExactDecoratedCandleSVG />
              </div>

              {/* Floating stars beside the lotus */}
              <div className="absolute top-[35%] left-[2%] text-[#ffd54f]">
                <StarSVG size={16} />
              </div>
              <div className="absolute top-[25%] left-[8%] text-[#00e5ff]">
                <StarSVG size={14} />
              </div>
              <div className="absolute top-[42%] left-[12%] text-[#ff007f]">
                <StarSVG size={12} />
              </div>
            </div>
          </motion.div>

          {/* -------------------------------------------------------------------
              RIGHT COLUMN: "12th / Friday" • "Snack & Style" • "Special Ritual"
             ------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[18%] flex flex-row lg:flex-col items-center lg:items-start justify-around lg:justify-center text-center lg:text-left border-t lg:border-t-0 lg:border-l border-violet-700/40 pt-4 lg:pt-0 lg:pl-6 space-y-0 lg:space-y-6"
          >
            {/* Block 1: Date */}
            <div className="space-y-0.5">
              <span className="block font-sans text-3xl sm:text-4xl font-black text-[#e91e63] leading-none">
                12th
              </span>
              <span className="block font-sans text-base sm:text-lg font-bold text-[#76ff03] leading-tight">
                Festive Week
              </span>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-full h-[1px] bg-violet-700/40" />

            {/* Block 2: Food & Style */}
            <div className="space-y-0.5">
              <span className="block font-serif text-base sm:text-lg font-bold text-white leading-tight">
                Beauty
              </span>
              <span className="block font-serif text-xs sm:text-sm text-violet-200/80 leading-tight">
                and Style
              </span>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-full h-[1px] bg-violet-700/40" />

            {/* Block 3: Special Offer */}
            <div className="space-y-0.5">
              <span className="block font-serif text-base sm:text-lg font-black text-[#ffd54f] leading-tight">
                Special
              </span>
              <span className="block font-serif text-xs sm:text-sm font-bold text-[#ffd54f] leading-tight uppercase">
                30% OFF Pass
              </span>
            </div>
          </motion.div>

        </div>
      </main>

      {/* =========================================================================
          4. BOTTOM FOOTER BAR: WEBSITE URL (Identical to "www.diwalifest.com")
         ========================================================================= */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between text-xs text-violet-300/80">
        <span className="font-sans font-bold tracking-wider text-white hover:text-[#ffd54f] transition cursor-pointer">
          www.dreamsalon.com
        </span>
        <span className="text-[11px] text-violet-200/60 font-medium">
          Diwali Photo Booth & Discount Campaign
        </span>
      </footer>
    </div>
  );
}

/* =========================================================================
   VECTOR / SVG ARTWORK REPRODUCING THE REFERENCE POSTER EXACTLY
   ========================================================================= */

// 1. Multi-Layered Colorful Lotus Flower (Teal, Pink, Orange, Yellow, Foreground Leaves)
function ExactLotusFlowerSVG() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-auto drop-shadow-xl overflow-visible">
      <defs>
        <linearGradient id="lotusOrange" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff9800" />
          <stop offset="100%" stopColor="#f57c00" />
        </linearGradient>
        <linearGradient id="lotusYellow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffee58" />
          <stop offset="100%" stopColor="#ffd600" />
        </linearGradient>
      </defs>

      {/* Back Layer: Tall Top Center Petals (Orange & Yellow) */}
      <path d="M 140,10 C 120,45 110,85 140,135 C 170,85 160,45 140,10 Z" fill="url(#lotusOrange)" />
      <path d="M 140,25 C 125,55 120,85 140,125 C 160,85 155,55 140,25 Z" fill="url(#lotusYellow)" />

      {/* Back Diagonal Orange Petals */}
      <path d="M 140,135 C 95,95 85,55 105,30 C 130,45 145,85 140,135 Z" fill="#ff7043" />
      <path d="M 140,135 C 185,95 195,55 175,30 C 150,45 135,85 140,135 Z" fill="#ff7043" />

      {/* Mid Layer: Vivid Hot Pink / Magenta Petals */}
      <path d="M 140,145 C 75,115 50,85 70,60 C 105,75 130,110 140,145 Z" fill="#e91e63" />
      <path d="M 140,145 C 205,115 230,85 210,60 C 175,75 150,110 140,145 Z" fill="#e91e63" />

      {/* Outer Layer: Wide Horizontal Hot Pink Spread */}
      <path d="M 140,155 C 60,140 25,120 35,95 C 75,105 115,130 140,155 Z" fill="#d81b60" />
      <path d="M 140,155 C 220,140 255,120 245,95 C 205,105 165,130 140,155 Z" fill="#d81b60" />

      {/* Bottom Spread: Teal / Cyan Outer Base Petals */}
      <path d="M 140,165 C 50,165 15,145 20,120 C 65,130 110,150 140,165 Z" fill="#00bfa5" />
      <path d="M 140,165 C 230,165 265,145 260,120 C 215,130 170,150 140,165 Z" fill="#00bfa5" />

      {/* Foreground Center Petals: Turquoise / Green Standing Leaves */}
      <path d="M 140,85 C 120,115 115,145 140,175 C 165,145 160,115 140,85 Z" fill="#00e676" />
      <path d="M 140,175 C 105,145 100,120 115,100 C 130,115 140,145 140,175 Z" fill="#00b0ff" />
      <path d="M 140,175 C 175,145 180,120 165,100 C 150,115 140,145 140,175 Z" fill="#00b0ff" />

      {/* Central Base Leaf Buds */}
      <path d="M 140,120 C 130,140 128,155 140,175 C 152,155 150,140 140,120 Z" fill="#1de9b6" />
    </svg>
  );
}

// 2. Painted Clay Diya with Radiant Flame & Circular Ambient Halo
function ExactPaintedDiyaSVG() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Warm Ambient Halo behind flame */}
      <div className="absolute -top-10 w-24 h-24 rounded-full bg-[#ffb300]/25 blur-lg pointer-events-none" />

      {/* Flickering Golden Diya Flame */}
      <div className="relative -mb-1 z-10">
        <svg viewBox="0 0 50 70" className="w-10 h-14 animate-diya-flame overflow-visible">
          <defs>
            <radialGradient id="diyaFlameCore" cx="50%" cy="80%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#ffee58" />
              <stop offset="70%" stopColor="#ff9800" />
              <stop offset="100%" stopColor="#f4511e" />
            </radialGradient>
          </defs>
          <path
            d="M 25,2 C 34,26 46,40 46,52 C 46,62 37,68 25,68 C 13,68 4,62 4,52 C 4,40 16,26 25,2 Z"
            fill="url(#diyaFlameCore)"
            filter="drop-shadow(0 0 10px #ffb300)"
          />
        </svg>
      </div>

      {/* Painted Clay Bowl (Teal with Lime rim & white zig-zag triangles and pink dots) */}
      <svg viewBox="0 0 140 60" className="w-full drop-shadow-lg">
        {/* Diya Clay Bowl */}
        <path
          d="M 5,14 C 18,50 122,50 135,14 C 125,8 105,16 70,16 C 35,16 15,8 5,14 Z"
          fill="#00bfa5"
          stroke="#76ff03"
          strokeWidth="3"
        />

        {/* Painted White Zig-Zag / Triangle Garland */}
        <path
          d="M 20,26 L 32,38 L 44,26 L 56,38 L 68,26 L 80,38 L 92,26 L 104,38 L 116,26"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Painted Pink Dots */}
        <circle cx="32" cy="22" r="3" fill="#e91e63" />
        <circle cx="56" cy="22" r="3" fill="#e91e63" />
        <circle cx="80" cy="22" r="3" fill="#e91e63" />
        <circle cx="104" cy="22" r="3" fill="#e91e63" />

        {/* Stand base */}
        <path d="M 50,48 L 90,48 L 84,56 L 56,56 Z" fill="#7b1fa2" />
      </svg>
    </div>
  );
}

// 3. Decorated Pillar Candle with Paisley Filigree Patterns & Saucer Stand
function ExactDecoratedCandleSVG() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Warm Ambient Halo behind flame */}
      <div className="absolute -top-8 w-16 h-16 rounded-full bg-[#ffb300]/25 blur-md pointer-events-none" />

      {/* Candle Flame */}
      <div className="relative -mb-1 z-10">
        <svg viewBox="0 0 30 50" className="w-6 h-10 animate-diya-flame overflow-visible">
          <path
            d="M 15,2 C 21,18 28,28 28,36 C 28,44 22,48 15,48 C 8,48 2,44 2,36 C 2,28 9,18 15,2 Z"
            fill="url(#diyaFlameCore)"
            filter="drop-shadow(0 0 8px #ff9800)"
          />
        </svg>
      </div>

      {/* Candle Cylinder (Orange with White Paisley Filigree) */}
      <svg viewBox="0 0 50 90" className="w-full drop-shadow-md">
        {/* Main Pillar */}
        <rect x="8" y="2" width="34" height="74" rx="4" fill="#ff7043" stroke="#e64a19" strokeWidth="1.5" />
        
        {/* Swirled Paisley / Folk Filigree Patterns (White) */}
        <path
          d="M 16,16 Q 25,12 25,22 Q 25,32 16,36 Q 34,42 34,54 Q 34,66 18,70"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="25" cy="22" r="2.5" fill="#ffffff" />
        <circle cx="26" cy="54" r="2.5" fill="#ffffff" />

        {/* Saucer Stand */}
        <ellipse cx="25" cy="78" rx="24" ry="6" fill="#00bfa5" stroke="#76ff03" strokeWidth="2" />
      </svg>
    </div>
  );
}

// 4. Upper Large Celebratory Firework Burst (Multi-color rays)
function TopFireworkBurstSVG() {
  return (
    <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible">
      {/* 14 radiating festive rays */}
      {[
        { angle: 0, color: '#76ff03' },
        { angle: 25, color: '#e91e63' },
        { angle: 50, color: '#00e5ff' },
        { angle: 75, color: '#ff9800' },
        { angle: 100, color: '#ffd54f' },
        { angle: 125, color: '#e91e63' },
        { angle: 150, color: '#76ff03' },
        { angle: 175, color: '#00e5ff' },
        { angle: 200, color: '#ff9800' },
        { angle: 225, color: '#ffd54f' },
        { angle: 250, color: '#e91e63' },
        { angle: 275, color: '#76ff03' },
        { angle: 300, color: '#00e5ff' },
        { angle: 325, color: '#ff9800' },
        { angle: 345, color: '#ffd54f' },
      ].map((ray, i) => (
        <g key={i} transform={`rotate(${ray.angle} 80 80)`}>
          <line x1="80" y1="42" x2="80" y2="12" stroke={ray.color} strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="80" cy="80" r="4" fill="#ffd54f" />
    </svg>
  );
}

// 5. Left Small Firework Burst
function LeftFireworkBurstSVG() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => {
        const colors = ['#e91e63', '#76ff03', '#00e5ff', '#ffd54f', '#ff9800'];
        return (
          <g key={i} transform={`rotate(${angle} 50 50)`}>
            <line x1="50" y1="26" x2="50" y2="8" stroke={colors[i % colors.length]} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

// 6. Right Small Firework Burst
function RightFireworkBurstSVG() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const colors = ['#ffd54f', '#e91e63', '#76ff03', '#00e5ff'];
        return (
          <g key={i} transform={`rotate(${angle} 50 50)`}>
            <line x1="50" y1="28" x2="50" y2="10" stroke={colors[i % colors.length]} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

// 7. Four-point Sparkle SVG
function SparkleSVG({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current">
      <path d="M12,0 C12,7 17,12 24,12 C17,12 12,17 12,24 C12,17 7,12 0,12 C7,12 12,7 12,0 Z" />
    </svg>
  );
}

// 8. Five-point Star SVG
function StarSVG({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current">
      <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
    </svg>
  );
}

