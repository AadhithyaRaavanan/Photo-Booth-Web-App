import React from 'react';

export default function LanternGraphic({ size = 56, className = "" }) {
  return (
    <div className={`relative inline-block animate-sway-slow ${className}`} style={{ width: size, height: size * 1.6 }}>
      <svg
        viewBox="0 0 100 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(255,140,0,0.6)]"
      >
        <defs>
          <radialGradient id="lanternGlow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#fff2a1" />
            <stop offset="40%" stopColor="#ffaa00" />
            <stop offset="85%" stopColor="#ff5500" />
            <stop offset="100%" stopColor="#8a1f00" />
          </radialGradient>

          <linearGradient id="goldHanger" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f5c518" />
            <stop offset="50%" stopColor="#fff3bf" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>

          <linearGradient id="tasselGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5c518" />
            <stop offset="100%" stopColor="#ff9800" />
          </linearGradient>
        </defs>

        {/* Top Hanging String */}
        <line x1="50" y1="0" x2="50" y2="20" stroke="url(#goldHanger)" strokeWidth="1.5" />
        <circle cx="50" cy="20" r="3" fill="#ffd700" />

        {/* Top Cap */}
        <path d="M 30 25 L 70 25 L 62 34 L 38 34 Z" fill="url(#goldHanger)" />

        {/* Main Lantern Diamond Body */}
        <polygon points="50,28 85,68 50,108 15,68" fill="url(#lanternGlow)" stroke="#ffd700" strokeWidth="1.5" />

        {/* Inner geometric facets */}
        <polygon points="50,38 74,68 50,98 26,68" fill="none" stroke="#fff194" strokeWidth="0.8" opacity="0.6" />
        <line x1="15" y1="68" x2="85" y2="68" stroke="#ffe678" strokeWidth="0.8" opacity="0.7" />
        <line x1="50" y1="28" x2="50" y2="108" stroke="#ffe678" strokeWidth="0.8" opacity="0.7" />

        {/* Center glowing core */}
        <circle cx="50" cy="68" r="14" fill="#ffffff" opacity="0.3" filter="blur(3px)" />

        {/* Bottom Cap */}
        <path d="M 38 102 L 62 102 L 56 112 L 44 112 Z" fill="url(#goldHanger)" />

        {/* Hanging Festive Tassels */}
        <g stroke="url(#tasselGold)" strokeWidth="1.2">
          <path d="M 46 112 Q 44 135 42 155" />
          <path d="M 50 112 L 50 158" strokeWidth="1.5" stroke="#ffe066" />
          <path d="M 54 112 Q 56 135 58 155" />
        </g>
        {/* Tassel bells */}
        <circle cx="42" cy="155" r="2" fill="#ffd700" />
        <circle cx="50" cy="158" r="2.5" fill="#ffe066" />
        <circle cx="58" cy="155" r="2" fill="#ffd700" />
      </svg>
    </div>
  );
}

