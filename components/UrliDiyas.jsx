'use client';

import React from 'react';
import DiyaGraphic from './DiyaGraphic';

export default function UrliDiyas({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}>
      {/* Decorative brass urli bowl graphic */}
      <div className="relative flex items-center justify-center">
        {/* Glow behind urli */}
        <div className="absolute w-44 h-20 bg-amber-500/25 rounded-full blur-2xl pointer-events-none" />

        {/* Brass Urli SVG */}
        <svg viewBox="0 0 240 70" className="w-56 sm:w-64 filter drop-shadow-[0_4px_16px_rgba(255,140,0,0.4)]">
          <defs>
            <linearGradient id="brassUrli" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fae7b4" />
              <stop offset="35%" stopColor="#d4af37" />
              <stop offset="70%" stopColor="#9e741a" />
              <stop offset="100%" stopColor="#5c3f0b" />
            </linearGradient>
            <radialGradient id="waterSurface" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3d1525" />
              <stop offset="60%" stopColor="#240714" />
              <stop offset="100%" stopColor="#14020a" />
            </radialGradient>
          </defs>

          {/* Urli Handles */}
          <path d="M 15 28 C 5 28, 5 44, 25 44" fill="none" stroke="url(#brassUrli)" strokeWidth="3.5" />
          <path d="M 225 28 C 235 28, 235 44, 215 44" fill="none" stroke="url(#brassUrli)" strokeWidth="3.5" />

          {/* Main Urli Bowl */}
          <ellipse cx="120" cy="38" rx="100" ry="24" fill="url(#brassUrli)" />
          {/* Water pool */}
          <ellipse cx="120" cy="34" rx="92" ry="18" fill="url(#waterSurface)" />

          {/* Rim highlights */}
          <ellipse cx="120" cy="34" rx="94" ry="19" fill="none" stroke="#fae7b4" strokeWidth="1.2" opacity="0.8" />

          {/* Floating marigold petals */}
          <circle cx="70" cy="34" r="5" fill="#ff9800" />
          <circle cx="85" cy="38" r="4" fill="#ffc107" />
          <circle cx="155" cy="34" r="5" fill="#ff9800" />
          <circle cx="170" cy="38" r="4" fill="#ffc107" />
          <circle cx="120" cy="42" r="4.5" fill="#ff5722" />
        </svg>

        {/* Center Floating Glowing Diya */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-4">
          <DiyaGraphic size={52} />
        </div>
      </div>
    </div>
  );
}

