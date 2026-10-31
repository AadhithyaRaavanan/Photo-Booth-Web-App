'use client';

import React from 'react';

/**
 * Royal Mughal / Rajasthani Palace Cusped Archway
 * Directly matching the architectural silhouette in the reference image
 */
export default function RoyalPalaceArch({ children, className = "", innerClassName = "" }) {
  return (
    <div className={`relative w-full rounded-[32px] overflow-hidden ${className}`}>
      {/* Background Arch SVG Mask / Graphic */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 400 600"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="palaceGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fae7b4" />
            <stop offset="25%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#fff3bf" />
            <stop offset="75%" stopColor="#b8860b" />
            <stop offset="100%" stopColor="#8f6a19" />
          </linearGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Palace Border */}
        <rect
          x="6"
          y="6"
          width="388"
          height="588"
          rx="26"
          stroke="url(#palaceGoldBorder)"
          strokeWidth="2.5"
          filter="url(#goldGlow)"
        />

        {/* Top Cusped Mughal Arch Outline (scalloped curves like reference) */}
        <path
          d="M 24 160 
             L 24 90
             C 24 50, 60 20, 110 20
             C 140 20, 160 35, 175 48
             C 185 36, 195 24, 200 12
             C 205 24, 215 36, 225 48
             C 240 35, 260 20, 290 20
             C 340 20, 376 50, 376 90
             L 376 160"
          stroke="url(#palaceGoldBorder)"
          strokeWidth="1.8"
          strokeDasharray="4,3"
          opacity="0.85"
        />

        {/* Corner Filigree Flourishes */}
        {/* Top-Left */}
        <circle cx="24" cy="24" r="5" fill="#d4af37" />
        <path d="M 14 36 Q 24 24 36 14" stroke="#d4af37" strokeWidth="1.5" />
        {/* Top-Right */}
        <circle cx="376" cy="24" r="5" fill="#d4af37" />
        <path d="M 386 36 Q 376 24 364 14" stroke="#d4af37" strokeWidth="1.5" />
        {/* Bottom-Left */}
        <circle cx="24" cy="576" r="5" fill="#d4af37" />
        <path d="M 14 564 Q 24 576 36 586" stroke="#d4af37" strokeWidth="1.5" />
        {/* Bottom-Right */}
        <circle cx="376" cy="576" r="5" fill="#d4af37" />
        <path d="M 386 564 Q 376 576 364 586" stroke="#d4af37" strokeWidth="1.5" />
      </svg>

      {/* Content wrapper */}
      <div className={`relative z-20 ${innerClassName}`}>{children}</div>
    </div>
  );
}

