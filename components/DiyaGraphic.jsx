'use client';

import React from 'react';

export default function DiyaGraphic({ size = 48, className = "" }) {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_2px_8px_rgba(255,140,0,0.5)]"
      >
        <defs>
          <radialGradient id="flameInner" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#ffe600" />
            <stop offset="70%" stopColor="#ff7700" />
            <stop offset="100%" stopColor="#ff2200" stopOpacity="0.8" />
          </radialGradient>

          <linearGradient id="diyaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5c518" />
            <stop offset="30%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#8f6a19" />
            <stop offset="100%" stopColor="#573e0d" />
          </linearGradient>

          <linearGradient id="diyaRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fae7b4" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#fae7b4" />
          </linearGradient>
        </defs>

        {/* Flickering Flame Group */}
        <g className="animate-diya-flame" style={{ transformOrigin: "50px 48px" }}>
          <ellipse cx="50" cy="30" rx="14" ry="24" fill="#ff9900" opacity="0.3" filter="blur(4px)" />
          <path
            d="M 50 12 C 55 24 62 36 50 48 C 38 36 45 24 50 12 Z"
            fill="url(#flameInner)"
            filter="drop-shadow(0 0 8px #ffaa00)"
          />
          <path
            d="M 50 24 C 52 30 55 38 50 45 C 45 38 48 30 50 24 Z"
            fill="#ffffff"
            opacity="0.85"
          />
        </g>

        {/* Diya Base / Clay Bowl */}
        <path
          d="M 18 52 C 22 76 78 76 82 52 C 86 48 84 46 80 47 C 68 50 32 50 20 47 C 16 46 14 48 18 52 Z"
          fill="url(#diyaGold)"
        />

        <ellipse cx="50" cy="50" rx="32" ry="5" fill="none" stroke="url(#diyaRim)" strokeWidth="1.5" />

        <path
          d="M 38 72 C 38 77 62 77 62 72 Z"
          fill="#8f6a19"
        />

        <circle cx="50" cy="62" r="1.8" fill="#ffe7a0" />
        <circle cx="40" cy="60" r="1.5" fill="#ffe7a0" />
        <circle cx="60" cy="60" r="1.5" fill="#ffe7a0" />
      </svg>
    </div>
  );
}

