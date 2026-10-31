'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, ArrowRight, Calendar, Gift, Star, Tag } from 'lucide-react';
import { playChimeSound } from './AudioChime';

/**
 * VioletDiwaliLanding Component
 * Inspired directly by the user's uploaded reference:
 * - Royal violet/purple theme with radial ambient glows
 * - Rangoli/mandala art in corners
 * - Painted Indian diyas with animated flickering flames
 * - Colorful paisley (kalka) motifs with festive patterns
 * - Multi-colored firework rays (cyan, pink, yellow, lime)
 * - Central "Happy Diwali - Festival of Lights" medallion
 * - Prominent CTA button: "ENTER PHOTO BOOTH"
 */
export default function VioletDiwaliLanding({
  shopName = 'Dream Salon',
  shopTagline = 'BEAUTY · STYLE · CONFIDENCE',
  customerName = '',
  onEnterPhotoBooth = () => {},
  onOpenNameModal = () => {},
}) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#24043b] text-white flex flex-col justify-between select-none">
      {/* 1. VIBRANT VIOLET & AMBIENT RADIAL GLOWS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Core Center Violet Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#65108f]/50 via-[#891fb8]/40 to-[#c236f0]/25 blur-[120px]" />
        
        {/* Secondary ambient highlight */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#4a0b6d]/60 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#3d0859]/70 blur-[100px]" />
      </div>

      {/* 2. RANGOLI / MANDALA CORNER MOTIFS */}
      <div className="absolute top-0 left-0 w-44 sm:w-64 h-44 sm:h-64 pointer-events-none opacity-20 -translate-x-8 -translate-y-8 z-0">
        <MandalaSVG />
      </div>
      <div className="absolute top-0 right-0 w-44 sm:w-64 h-44 sm:h-64 pointer-events-none opacity-20 translate-x-8 -translate-y-8 z-0">
        <MandalaSVG />
      </div>
      <div className="absolute bottom-0 left-0 w-44 sm:w-64 h-44 sm:h-64 pointer-events-none opacity-20 -translate-x-8 translate-y-8 z-0">
        <MandalaSVG />
      </div>
      <div className="absolute bottom-0 right-0 w-44 sm:w-64 h-44 sm:h-64 pointer-events-none opacity-20 translate-x-8 translate-y-8 z-0">
        <MandalaSVG />
      </div>

      {/* 3. TWINKLING STARS & SPARKLES */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <SparkleStar className="top-[12%] left-[18%] text-amber-300 w-4 h-4 animate-pulse" />
        <SparkleStar className="top-[25%] left-[8%] text-pink-300 w-3 h-3 animate-ping" />
        <SparkleStar className="top-[18%] right-[15%] text-cyan-200 w-5 h-5 animate-pulse" />
        <SparkleStar className="top-[35%] right-[8%] text-yellow-300 w-4 h-4" />
        <SparkleStar className="bottom-[22%] left-[14%] text-amber-200 w-3.5 h-3.5 animate-pulse" />
        <SparkleStar className="bottom-[18%] right-[20%] text-pink-300 w-4 h-4" />
        <SparkleStar className="top-[45%] left-[22%] text-white w-2.5 h-2.5 opacity-60" />
        <SparkleStar className="bottom-[35%] right-[12%] text-yellow-200 w-3 h-3 opacity-70 animate-pulse" />
      </div>

      {/* TOP HEADER / LOGO BAR (NO NAV BAR - JUST CLEAN BRAND HEADING) */}
      <header className="relative z-10 w-full pt-6 sm:pt-8 px-4 sm:px-8 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-violet-500 p-0.5 shadow-lg shadow-pink-500/20">
            <div className="w-full h-full bg-[#2a0445] rounded-[14px] flex items-center justify-center">
              <span className="text-xl">🪔</span>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-amber-200">
              {shopName}
            </h2>
            <p className="text-[10px] tracking-[0.22em] uppercase text-violet-200/80 font-sans font-semibold">
              {shopTagline}
            </p>
          </div>
        </div>

        {/* Festive Badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-900/60 border border-violet-400/40 text-xs font-semibold text-amber-300 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>FESTIVE CAMPAIGN</span>
        </div>
      </header>

      {/* MAIN HERO CONTENT STAGE (RESPONSIVE PC & MOBILE) */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 md:py-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
        
        {/* LEFT COLUMN: GREETING, EVENT DETAILS & STANDOUT CTA */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5"
        >
          {/* Top category label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#410961] border border-violet-400/50 text-xs font-bold text-amber-300 uppercase tracking-widest shadow-md">
            <span>✨ DIWALI SPECIAL CELEBRATION</span>
          </div>

          {/* Personalized Customer Welcome */}
          {customerName ? (
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-xl bg-gradient-to-r from-pink-600/30 to-amber-500/20 border border-pink-400/40 text-sm font-semibold text-pink-200"
            >
              <span>Welcome, <strong className="text-amber-300 font-bold">{customerName}</strong>!</span>
              <button 
                onClick={onOpenNameModal}
                className="text-xs text-amber-400/80 hover:text-amber-300 underline ml-1"
              >
                (Change)
              </button>
            </motion.div>
          ) : (
            <p className="text-xs sm:text-sm text-violet-200/90 font-medium tracking-wide">
              You are cordially invited to celebrate the Festival of Lights with us.
            </p>
          )}

          {/* Catchy headline */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-md">
            Capture Your Festive Glow & Win <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">FLAT 30% OFF</span>
          </h1>

          <p className="text-sm sm:text-base text-violet-100/85 max-w-lg leading-relaxed">
            Step into our Royal Festive Photo Booth, create your personalized Diwali portrait with our exclusive temple frame, and instantly unlock your exclusive salon discount pass!
          </p>

          {/* Quick Perks / Features */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-md pt-2">
            <div className="p-3 rounded-2xl bg-[#390857]/80 border border-violet-400/30 flex flex-col items-center text-center shadow-sm">
              <Camera className="w-5 h-5 text-amber-400 mb-1.5" />
              <span className="text-[11px] font-bold text-white">Royal Frame</span>
              <span className="text-[9px] text-violet-200/70">Custom Artwork</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#390857]/80 border border-violet-400/30 flex flex-col items-center text-center shadow-sm">
              <Gift className="w-5 h-5 text-pink-400 mb-1.5" />
              <span className="text-[11px] font-bold text-white">FLAT 30% OFF</span>
              <span className="text-[9px] text-violet-200/70">Instant Reward</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#390857]/80 border border-violet-400/30 flex flex-col items-center text-center shadow-sm">
              <Sparkles className="w-5 h-5 text-cyan-400 mb-1.5" />
              <span className="text-[11px] font-bold text-white">Instant Pass</span>
              <span className="text-[9px] text-violet-200/70">Download & Save</span>
            </div>
          </div>

          {/* PRIMARY CTA BUTTON (The exact key requirement: button that takes user to photo booth) */}
          <div className="w-full max-w-md pt-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                playChimeSound('click');
                onEnterPhotoBooth();
              }}
              className="w-full py-4 sm:py-5 px-8 rounded-2xl bg-gradient-to-r from-[#e60067] via-[#ff3b30] to-[#ff9500] hover:from-[#f00070] hover:to-[#ffa726] text-white font-sans font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_10px_35px_rgba(230,0,103,0.55),0_0_20px_rgba(255,149,0,0.4)] flex items-center justify-center gap-3 border-2 border-amber-300/60 transition group relative overflow-hidden"
            >
              {/* Shimmer light effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              
              <Camera className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
              <span>ENTER PHOTO BOOTH</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300 stroke-[3]" />
            </motion.button>
            <p className="text-[11px] text-center text-violet-200/70 mt-2 font-medium">
              Free & instant in browser • No app download required
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: THE ICONIC VIOLET DIWALI MEDALLION ARTWORK (Matching the Reference Image) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-1/2 flex items-center justify-center relative select-none"
        >
          {/* Main Visual Medallion Container */}
          <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px] flex items-center justify-center">
            
            {/* 1. Colorful Fireworks / Sparkler Burst Rays */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <FireworksRayGroup />
            </div>

            {/* 2. Top Diya (Resting on top border of medallion) */}
            <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 z-20">
              <PaintedDiyaSVG size={72} />
            </div>

            {/* 3. Lower Right Diya */}
            <div className="absolute -bottom-3 sm:-bottom-4 right-6 sm:right-10 z-20">
              <PaintedDiyaSVG size={76} flip />
            </div>

            {/* 4. Upper Right Paisley (Kalka) Motif */}
            <div className="absolute -top-3 sm:-top-4 -right-2 sm:right-2 z-10 rotate-[25deg] w-20 sm:w-24">
              <PaisleyKalkaSVG />
            </div>

            {/* 5. Lower Left Paisley (Kalka) Motif */}
            <div className="absolute -bottom-3 sm:-bottom-4 -left-2 sm:left-2 z-10 rotate-[-150deg] w-20 sm:w-24">
              <PaisleyKalkaSVG />
            </div>

            {/* 6. Central Purple Medallion Disc */}
            <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[380px] md:h-[380px] rounded-full bg-gradient-to-b from-[#4e0c70] via-[#3a0756] to-[#250338] border-4 border-[#761899] shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_0_40px_rgba(118,24,153,0.5)] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
              
              {/* Subtle inner concentric ring */}
              <div className="absolute inset-4 rounded-full border border-violet-400/20 pointer-events-none" />

              {/* Decorative small stars inside */}
              <div className="text-amber-300 text-xs mb-1 font-serif tracking-widest flex items-center gap-1.5 opacity-90">
                <span>✦</span>
                <span className="uppercase text-[11px] sm:text-xs tracking-[0.25em] font-sans font-bold">Dream Salon</span>
                <span>✦</span>
              </div>

              {/* "Happy" */}
              <span className="font-serif italic text-2xl sm:text-3xl text-amber-200/95 font-semibold drop-shadow-sm">
                Happy
              </span>

              {/* "Diwali" in massive bold letters */}
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-wide uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] my-0.5">
                Diwali
              </h2>

              {/* "Festival of Lights" in glowing golden yellow */}
              <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-amber-300 tracking-wider drop-shadow-md">
                Festival of Lights
              </span>

              {/* Offer pill */}
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-amber-400/40 text-[10px] sm:text-xs font-bold text-amber-200 uppercase">
                <span>✨ FLAT 30% OFF REWARD ✨</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* FOOTER BAR (CLEAN, MINIMAL, FESTIVE) */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-violet-300/70 border-t border-violet-900/40">
        <p className="flex items-center justify-center gap-2">
          <span>🪔</span>
          <span>Diwali Photo Booth & Rewards Campaign • {shopName}</span>
          <span>🪔</span>
        </p>
      </footer>
    </div>
  );
}

/* =========================================================================
   VECTOR / SVG ASSETS INSPIRED DIRECTLY BY THE REFERENCE IMAGE
   ========================================================================= */

// 1. Traditional Indian Rangoli Mandala
function MandalaSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-violet-200 fill-none stroke-current" strokeWidth="1.2">
      <circle cx="100" cy="100" r="90" strokeDasharray="3,3" />
      <circle cx="100" cy="100" r="75" />
      <circle cx="100" cy="100" r="55" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="30" />
      {/* 8-Petal Rosette */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle} 100 100)`}>
          <path d="M 100,25 C 115,50 115,75 100,100 C 85,75 85,50 100,25 Z" />
          <circle cx="100" cy="15" r="3" fill="currentColor" />
        </g>
      ))}
      <circle cx="100" cy="100" r="10" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

// 2. Multi-Color Fireworks / Sparkler Rays
function FireworksRayGroup() {
  return (
    <svg viewBox="0 0 460 460" className="w-full h-full pointer-events-none select-none">
      {/* Upper-left cyan bursts */}
      <g transform="translate(100, 100)">
        <line x1="0" y1="0" x2="-25" y2="-25" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" />
        <line x1="0" y1="0" x2="-35" y2="-10" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="-10" y2="-35" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="-38" cy="-38" r="3" fill="#00e5ff" />
      </g>

      {/* Upper-right yellow and pink bursts */}
      <g transform="translate(360, 100)">
        <line x1="0" y1="0" x2="25" y2="-25" stroke="#ffd600" strokeWidth="3" strokeLinecap="round" />
        <line x1="0" y1="0" x2="35" y2="-10" stroke="#ff4081" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="10" y2="-35" stroke="#ffd600" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="38" cy="-38" r="3" fill="#ffd600" />
      </g>

      {/* Lower-left pink and lime bursts */}
      <g transform="translate(90, 360)">
        <line x1="0" y1="0" x2="-25" y2="25" stroke="#ff1744" strokeWidth="3" strokeLinecap="round" />
        <line x1="0" y1="0" x2="-35" y2="10" stroke="#76ff03" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="-10" y2="35" stroke="#ff1744" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="-38" cy="38" r="3" fill="#76ff03" />
      </g>

      {/* Multi-colored firework sparks radiating around circle */}
      {[20, 70, 110, 160, 200, 250, 290, 340].map((deg, i) => {
        const colors = ['#00e5ff', '#ffd600', '#ff4081', '#76ff03'];
        const color = colors[i % colors.length];
        return (
          <g key={i} transform={`rotate(${deg} 230 230)`}>
            <line x1="230" y1="18" x2="230" y2="2" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <circle cx="230" cy="-3" r="2.5" fill={color} />
          </g>
        );
      })}
    </svg>
  );
}

// 3. Decorated Festive Diya with Glowing Animated Flame
function PaintedDiyaSVG({ size = 70, flip = false }) {
  return (
    <div className={`relative flex flex-col items-center select-none ${flip ? '-scale-x-100' : ''}`} style={{ width: size }}>
      {/* Animated Flickering Diya Flame */}
      <div className="relative -mb-1 z-10">
        <svg viewBox="0 0 40 60" className="w-6 h-9 animate-diya-flame overflow-visible">
          <defs>
            <radialGradient id="flameInner" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#ffe600" />
              <stop offset="70%" stopColor="#ff7b00" />
              <stop offset="100%" stopColor="#ff1100" stopOpacity="0.8" />
            </radialGradient>
          </defs>
          <path
            d="M 20,4 C 27,24 36,36 36,46 C 36,54 29,58 20,58 C 11,58 4,54 4,46 C 4,36 13,24 20,4 Z"
            fill="url(#flameInner)"
            filter="drop-shadow(0 0 10px #ff9100)"
          />
        </svg>
      </div>

      {/* Painted Decorative Clay Base */}
      <svg viewBox="0 0 100 50" className="w-full drop-shadow-lg">
        <defs>
          <linearGradient id="diyaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e91e63" />
            <stop offset="30%" stopColor="#ff9800" />
            <stop offset="70%" stopColor="#00bcd4" />
            <stop offset="100%" stopColor="#4caf50" />
          </linearGradient>
        </defs>
        {/* Diya Clay Bowl */}
        <path
          d="M 5,12 C 15,44 85,44 95,12 C 90,8 80,14 50,14 C 20,14 10,8 5,12 Z"
          fill="url(#diyaGrad)"
          stroke="#ffd54f"
          strokeWidth="2"
        />
        {/* Painted Ornamental Dots */}
        <circle cx="25" cy="24" r="3" fill="#ffffff" />
        <circle cx="40" cy="28" r="3" fill="#ffffff" />
        <circle cx="50" cy="29" r="3.5" fill="#ffd600" />
        <circle cx="60" cy="28" r="3" fill="#ffffff" />
        <circle cx="75" cy="24" r="3" fill="#ffffff" />
        {/* Diya Base Stand */}
        <path d="M 38,42 L 62,42 L 58,48 L 42,48 Z" fill="#b71c1c" />
      </svg>
    </div>
  );
}

// 4. Colorful Folkloric Paisley (Kalka / Mango) Indian Motif
function PaisleyKalkaSVG() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-auto drop-shadow-lg pointer-events-none">
      <defs>
        <linearGradient id="paisleyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff1744" />
          <stop offset="40%" stopColor="#ffea00" />
          <stop offset="70%" stopColor="#00e676" />
          <stop offset="100%" stopColor="#00e5ff" />
        </linearGradient>
      </defs>
      {/* Outer Paisley Outline */}
      <path
        d="M 60,10 C 100,20 115,70 100,110 C 85,150 30,155 15,120 C 0,85 20,50 60,10 Z"
        fill="url(#paisleyGrad)"
        stroke="#ffffff"
        strokeWidth="3"
      />
      {/* Inner teardrop decorative pattern */}
      <path
        d="M 58,35 C 80,45 88,75 80,100 C 70,125 35,125 28,105 C 20,85 32,60 58,35 Z"
        fill="#9c27b0"
        stroke="#ffd600"
        strokeWidth="2"
      />
      {/* Striped colorful accents */}
      <line x1="40" y1="75" x2="70" y2="75" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="88" x2="68" y2="88" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="45" y1="100" x2="62" y2="100" stroke="#ffea00" strokeWidth="2.5" strokeLinecap="round" />
      {/* Golden top curl dot */}
      <circle cx="60" cy="10" r="4" fill="#ffd600" />
    </svg>
  );
}

// 5. Four-point Sparkle Star
function SparkleStar({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={`absolute fill-current ${className}`}>
      <path d="M12,0 C12,7 17,12 24,12 C17,12 12,17 12,24 C12,17 7,12 0,12 C7,12 12,7 12,0 Z" />
    </svg>
  );
}

