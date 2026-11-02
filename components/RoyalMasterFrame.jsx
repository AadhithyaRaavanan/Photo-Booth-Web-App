'use client';

import React from 'react';

/**
 * 8 Authentic Indian Festive Frames
 * Transparent center cutout for live camera preview & photo composition
 */
export const ROYAL_FRAMES = [
  {
    id: 'frame-1',
    name: 'Twin Royal Peacocks',
    image: '/frames/frame_1_peacocks.png',
    thumb: '/frames/thumb_frame_1.png',
    theme: 'teal-cyan',
    badge: '🦚 Peacocks',
    description: 'Teal backdrop with twin royal peacocks, lotus blossoms, and central glowing diya',
  },
  {
    id: 'frame-2',
    name: 'Festive Marigold & Lanterns',
    image: '/frames/frame_2_lanterns.png',
    thumb: '/frames/thumb_frame_2.png',
    theme: 'magenta-pink',
    badge: '🏮 Lanterns',
    description: 'Vibrant magenta with hanging Diwali lanterns, fresh marigolds, and blooming lotus',
  },
  {
    id: 'frame-3',
    name: 'Emerald Diya & Garlands',
    image: '/frames/frame_3_emerald_diyas.png',
    thumb: '/frames/thumb_frame_3.png',
    theme: 'emerald-teal',
    badge: '🪔 Diyas',
    description: 'Emerald arch with hanging brass diyas, rich marigold garlands, and delicate lotus vines',
  },
  {
    id: 'frame-4',
    name: 'Golden Temple Lotus',
    image: '/frames/frame_4_golden_lotus.png',
    thumb: '/frames/thumb_frame_4.png',
    theme: 'golden-yellow',
    badge: '🪷 Lotus',
    description: 'Sunburst golden yellow temple arch with marigold clusters, side creepers, and central pink lotus',
  },
  {
    id: 'frame-5',
    name: 'Sparkling Fireworks & Diyas',
    image: '/frames/frame_5_fireworks_diyas.png',
    thumb: '/frames/thumb_frame_5.png',
    theme: 'royal-magenta',
    badge: '🎆 Fireworks',
    description: 'Deep royal magenta sky with radiant Diwali sparklers, hanging kandils, and five burning clay deepams',
  },
  {
    id: 'frame-6',
    name: 'Palace Lotus & Peacocks',
    image: '/frames/frame_6_palace_peacocks.png',
    thumb: '/frames/thumb_frame_6.png',
    theme: 'deep-teal',
    badge: '🦚 Palace',
    description: 'Deep teal sanctuary with ornate lotus arch, marigold columns, and twin regal peacocks at base',
  },
  {
    id: 'frame-7',
    name: 'Ivory Mughal Bells',
    image: '/frames/frame_7_ivory_bells.png',
    thumb: '/frames/thumb_frame_7.png',
    theme: 'ivory-gold',
    badge: '🔔 Bells',
    description: 'Opulent ivory and gold Mughal arch with auspicious temple bells, floral vines, and lotus diya',
  },
  {
    id: 'frame-8',
    name: 'Shubh Diwali Ribbon',
    image: '/frames/frame_8_shubh_ribbon.png',
    thumb: '/frames/thumb_frame_8.png',
    theme: 'radiant-gold',
    badge: '🎀 Ribbon',
    description: 'Golden yellow palace entrance with hanging lamps, lush floral creepers, and royal celebratory ribbon',
  },
];

// Reusable SVG path for the Indian Cusped Jharokha Cartouche (200x200 viewBox)
const JHAROKHA_SEAL_PATH = `
  M 100 12
  C 110 23, 120 27, 130 27
  C 148 27, 164 43, 164 61
  C 164 71, 174 81, 188 100
  C 174 119, 164 129, 164 139
  C 164 157, 148 173, 130 173
  C 120 173, 110 177, 100 188
  C 90 177, 80 173, 70 173
  C 52 173, 36 157, 36 139
  C 36 129, 26 119, 12 100
  C 26 81, 36 71, 36 61
  C 36 43, 52 27, 70 27
  C 80 27, 90 23, 100 12
  Z
`.replace(/\s+/g, ' ').trim();

/**
 * Format discount string cleanly for the seal
 */
function extractDiscountParts(discount) {
  if (!discount) return { pct: '30%', label: 'OFF', header: 'DIWALI OFFER' };
  let str = String(discount).toUpperCase().trim();
  let match = str.match(/(\d+%?)/);
  let pct = match ? match[1] : '30%';
  if (!pct.includes('%')) pct += '%';
  return {
    pct,
    label: 'OFF',
    header: 'DIWALI OFFER',
  };
}

/**
 * High-Contrast, Large Indian Jharokha 30% Icon Component
 * Designed with Deep Royal Ruby Velvet + 24K Gold Bezel so it NEVER blends with yellow or any frame!
 */
export function DiwaliOfferSeal({ discount = '30% OFF', className = '' }) {
  const { pct, label, header } = extractDiscountParts(discount);

  return (
    <div className={`relative flex items-center justify-center filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] ${className}`}>
      {/* Decorative hanging chain beads */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm" />
        <span className="w-1 h-1 rounded-full bg-amber-300" />
        <span className="w-1 h-1.5 bg-amber-500/80 rounded-full" />
      </div>

      <svg viewBox="0 0 200 200" className="w-full h-full select-none">
        <defs>
          {/* Deep Royal Ruby / Crimson Velvet Gradient (High contrast against Yellow, Ivory & Teal) */}
          <radialGradient id="rubyVelvetGrad" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#a80d3d" />
            <stop offset="45%" stopColor="#7a0528" />
            <stop offset="85%" stopColor="#420214" />
            <stop offset="100%" stopColor="#22010a" />
          </radialGradient>

          {/* 24-Karat Gleaming Polished Gold Bezel */}
          <linearGradient id="goldBezelBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffde7" />
            <stop offset="25%" stopColor="#ffd54f" />
            <stop offset="60%" stopColor="#ffb300" />
            <stop offset="85%" stopColor="#ff8f00" />
            <stop offset="100%" stopColor="#ffd54f" />
          </linearGradient>

          {/* Golden Typography Gradient */}
          <linearGradient id="goldHeroText" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fff176" />
            <stop offset="75%" stopColor="#ffd54f" />
            <stop offset="100%" stopColor="#ffb300" />
          </linearGradient>
        </defs>

        {/* 1. Deep Royal Ruby Cartouche Body */}
        <path
          d={JHAROKHA_SEAL_PATH}
          fill="url(#rubyVelvetGrad)"
          stroke="url(#goldBezelBorder)"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* 2. Concentric Gold Inset Line */}
        <path
          d={JHAROKHA_SEAL_PATH}
          transform="translate(100, 100) scale(0.92) translate(-100, -100)"
          fill="none"
          stroke="#ffd54f"
          strokeWidth="1.2"
          opacity="0.8"
        />

        {/* 3. Auspicious 24K Golden Beaded Chain Ring */}
        <path
          d={JHAROKHA_SEAL_PATH}
          transform="translate(100, 100) scale(0.85) translate(-100, -100)"
          fill="none"
          stroke="#ffd54f"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray="0.1 7.2"
        />

        {/* 4. Fine Golden Inner Border */}
        <path
          d={JHAROKHA_SEAL_PATH}
          transform="translate(100, 100) scale(0.77) translate(-100, -100)"
          fill="none"
          stroke="#ffb300"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* 5. High-Impact Typography (Large 30% Icon Hero) */}
        {/* Top: DIWALI OFFER */}
        <text
          x="100"
          y="58"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="900"
          fontSize="11.5"
          letterSpacing="2"
          fill="#ffe082"
        >
          {header}
        </text>

        {/* Divider with Diamond */}
        <line x1="56" y1="65" x2="144" y2="65" stroke="#ffd54f" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
        <polygon points="100,62 103,65 100,68 97,65" fill="#ffd54f" />

        {/* Center: BIG 30% HERO */}
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fontFamily="'Cinzel', 'Playfair Display', serif"
          fontWeight="900"
          fontSize="44"
          letterSpacing="1"
          fill="url(#goldHeroText)"
        >
          {pct}
        </text>

        {/* Divider with Diamond */}
        <line x1="60" y1="123" x2="140" y2="123" stroke="#ffd54f" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
        <polygon points="100,120 103,123 100,126 97,123" fill="#ffd54f" />

        {/* Bottom: OFF */}
        <text
          x="100"
          y="142"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="900"
          fontSize="16"
          letterSpacing="4"
          fill="#ffffff"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

/**
 * Royal Authentic Indian Festive Frame Component
 * Displays selected festive frame overlay with transparent opening,
 * unified top background holder block fitting the whole frame (100% text visibility),
 * and the large high-contrast 30% jharokha seal at the top corner.
 */
export default function RoyalMasterFrame({
  shopConfig = {},
  customerName = '',
  discount = 'FLAT 30% OFF',
  selectedFrameId = 'frame-1',
}) {
  const shopName = shopConfig.shopName || 'Dream Salon';
  const shopTagline = shopConfig.shopTagline || 'BEAUTY · STYLE · CONFIDENCE';
  const currentFrame = ROYAL_FRAMES.find((f) => f.id === selectedFrameId) || ROYAL_FRAMES[0];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. THE AUTHENTIC USER FESTIVE FRAME OVERLAY (Transparent Center Opening) */}
      <img
        key={currentFrame.id}
        src={`${currentFrame.image}?v=8`}
        alt={currentFrame.name}
        onError={(e) => {
          if (!e.currentTarget.dataset.retried) {
            e.currentTarget.dataset.retried = 'true';
            e.currentTarget.src = `${currentFrame.image}?t=${Date.now()}`;
          }
        }}
        className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 transition-opacity duration-300"
      />

      {/* 2. TOP RIGHT CORNER: Offer Seal ONLY (no text box at top) */}
      <div className="relative z-30 w-full flex justify-end pointer-events-none pt-2 pr-2.5 sm:pr-3">
        <div className="shrink-0 pointer-events-auto">
          <DiwaliOfferSeal
            discount={discount}
            className="w-20 h-20 sm:w-24 sm:h-24 hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>

      {/* 3. BOTTOM BRAND BOX: Dream Salon + tagline + greeting, placed in the circled bottom area */}
      <div className="relative z-30 w-full pointer-events-none" style={{ paddingBottom: '5.5rem' }}>
        {/* Outer glowing border wrap */}
        <div className="mx-2 sm:mx-3 rounded-2xl overflow-hidden shadow-[0_6px_32px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.25)] border border-amber-400/70">
          {/* Top golden accent line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          {/* Main brand block */}
          <div className="w-full bg-gradient-to-b from-[#240110]/97 via-[#1a0009]/96 to-[#0e0005]/97 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
            {/* Left: Brand Name + Tagline + Greeting stacked */}
            <div className="flex-1 flex flex-col items-start min-w-0">
              {/* Brand Name Row */}
              <div className="flex items-center gap-1.5 max-w-full">
                <span className="text-amber-300 text-sm sm:text-base shrink-0 filter drop-shadow-[0_1px_4px_rgba(255,180,0,0.9)]">
                  🪔
                </span>
                <h2 className="font-serif text-sm sm:text-lg md:text-xl font-black gold-gradient-text tracking-[0.16em] uppercase truncate drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  {shopName}
                </h2>
              </div>

              {/* Tagline */}
              <span className="text-[7px] sm:text-[9px] font-sans tracking-[0.25em] text-[#fae7b4] uppercase font-bold mt-0.5 truncate max-w-full drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {shopTagline}
              </span>

              {/* Greeting */}
              {customerName && (
                <div className="mt-1 flex items-center gap-1 text-[9px] sm:text-[11px] text-amber-200 font-serif italic font-semibold truncate max-w-full">
                  <span className="text-amber-400 text-[10px] shrink-0">✨</span>
                  <span className="truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    Happy Diwali,{' '}
                    <strong className="text-white font-bold">{customerName}</strong>!
                  </span>
                </div>
              )}
            </div>

            {/* Right: Decorative Diya + small brand flourish */}
            <div className="shrink-0 flex flex-col items-center justify-center gap-0.5 pl-1.5">
              <span className="text-xl sm:text-2xl filter drop-shadow-[0_2px_8px_rgba(255,120,0,0.9)]">🪔</span>
              <span className="text-[7px] text-amber-400/80 font-serif italic font-bold tracking-widest">Diwali</span>
            </div>
          </div>

          {/* Bottom golden accent line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>
      </div>
    </div>
  );
}

/**
 * 1:1 High-Resolution Canvas Photo Composition (1080x1440 Portrait)
 * Combines Customer Photo + Frame Overlay PNG + Full-Width Top Holder Block + Large High-Contrast 30% Seal
 */
export async function composeRoyalMasterPhoto({
  imageElement,
  customerName = 'Guest',
  shopConfig = {},
  discount = 'FLAT 30% OFF',
  selectedFrameId = 'frame-1',
}) {
  const currentFrame = ROYAL_FRAMES.find((f) => f.id === selectedFrameId) || ROYAL_FRAMES[0];
  const canvas = document.createElement('canvas');
  const width = 1080;
  const height = 1440; // 3:4 portrait aspect ratio
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 1. Draw customer photograph (scaled & centered to fill 1080x1440)
  if (imageElement) {
    const imgRatio = imageElement.videoWidth
      ? imageElement.videoWidth / imageElement.videoHeight
      : imageElement.width / imageElement.height;
    const canvasRatio = width / height;

    let sx = 0,
      sy = 0,
      sw = imageElement.videoWidth || imageElement.width,
      sh = imageElement.videoHeight || imageElement.height;

    if (imgRatio > canvasRatio) {
      const newWidth = sh * canvasRatio;
      sx = (sw - newWidth) / 2;
      sw = newWidth;
    } else {
      const newHeight = sw / canvasRatio;
      sy = (sh - newHeight) / 2;
      sh = newHeight;
    }

    ctx.drawImage(imageElement, sx, sy, sw, sh, 0, 0, width, height);
  } else {
    // Fallback gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#2e0417');
    grad.addColorStop(0.5, '#1e0210');
    grad.addColorStop(1, '#0e0108');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Load and draw the transparent festive frame PNG overlay
  await new Promise((resolve) => {
    const frameImg = new Image();
    frameImg.onload = () => {
      ctx.drawImage(frameImg, 0, 0, width, height);
      resolve();
    };
    frameImg.onerror = () => {
      console.warn('Could not load frame overlay image:', currentFrame.image);
      resolve();
    };
    frameImg.src = `${currentFrame.image}?v=8`;
  });

  // 3. Draw Bottom Brand Box (where user circled with red pen)
  const shopName = shopConfig.shopName || 'Dream Salon';
  const shopTagline = shopConfig.shopTagline || 'BEAUTY · STYLE · CONFIDENCE';

  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Font ready fallback
    }
  }

  ctx.save();
  // Bottom brand block positioned just above the control buttons area
  // Canvas is 1080x1440; bottom controls take ~190px; brand block sits above them
  const boxH = 170;
  const boxMargin = 28;
  const boxY = height - 190 - boxH - 10; // sits just above watermark zone

  // Rounded rectangle with deep palace velvet gradient
  const boxGrad = ctx.createLinearGradient(0, boxY, 0, boxY + boxH);
  boxGrad.addColorStop(0, 'rgba(36, 1, 16, 0.97)');
  boxGrad.addColorStop(0.5, 'rgba(26, 0, 9, 0.96)');
  boxGrad.addColorStop(1, 'rgba(14, 0, 5, 0.97)');
  ctx.fillStyle = boxGrad;
  ctx.beginPath();
  ctx.roundRect(boxMargin, boxY, width - boxMargin * 2, boxH, 22);
  ctx.fill();

  // Gold border
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#d4af37';
  ctx.stroke();

  // Top glowing accent line inside box
  ctx.beginPath();
  ctx.moveTo(boxMargin + 50, boxY + 3);
  ctx.lineTo(width - boxMargin - 50, boxY + 3);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffd700';
  ctx.stroke();

  // Bottom glowing accent line inside box
  ctx.beginPath();
  ctx.moveTo(boxMargin + 50, boxY + boxH - 3);
  ctx.lineTo(width - boxMargin - 50, boxY + boxH - 3);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffd700';
  ctx.stroke();

  // Brand Name (center-aligned in box)
  const textCenterX = (width - boxMargin * 2) / 2 + boxMargin - 40; // shift left of diya icon
  ctx.textAlign = 'left';
  const goldGrad = ctx.createLinearGradient(boxMargin + 40, boxY + 30, boxMargin + 40, boxY + 85);
  goldGrad.addColorStop(0, '#fffbe6');
  goldGrad.addColorStop(0.3, '#ffd700');
  goldGrad.addColorStop(0.7, '#ffb300');
  goldGrad.addColorStop(1, '#c59a1f');

  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 12;
  ctx.fillStyle = goldGrad;
  ctx.font = "900 50px 'Cinzel', 'Playfair Display', serif";
  ctx.fillText(`\u{1F54E} ${shopName}`, boxMargin + 40, boxY + 72);

  // Tagline
  ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = '#fae7b4';
  ctx.shadowBlur = 8;
  ctx.fillText(shopTagline, boxMargin + 52, boxY + 108);

  // Greeting
  if (customerName) {
    ctx.font = "italic bold 24px 'Playfair Display', serif";
    ctx.fillStyle = '#ffd54f';
    ctx.shadowBlur = 10;
    ctx.fillText(`\u2728 Happy Diwali, ${customerName}!`, boxMargin + 52, boxY + 148);
  }
  ctx.restore();

  // 4. Draw Large High-Contrast 30% Icon in Top Right
  const { pct } = extractDiscountParts(discount);
  const sealSvgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="220" height="220">
      <defs>
        <radialGradient id="rubyVelvetGrad" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#a80d3d" />
          <stop offset="45%" stop-color="#7a0528" />
          <stop offset="85%" stop-color="#420214" />
          <stop offset="100%" stop-color="#22010a" />
        </radialGradient>
        <linearGradient id="goldBezelBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fffde7" />
          <stop offset="25%" stop-color="#ffd54f" />
          <stop offset="60%" stop-color="#ffb300" />
          <stop offset="85%" stop-color="#ff8f00" />
          <stop offset="100%" stop-color="#ffd54f" />
        </linearGradient>
        <linearGradient id="goldHeroText" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="35%" stop-color="#fff176" />
          <stop offset="75%" stop-color="#ffd54f" />
          <stop offset="100%" stop-color="#ffb300" />
        </linearGradient>
        <filter id="sealShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.8" />
        </filter>
      </defs>
      <g filter="url(#sealShadow)">
        <path d="${JHAROKHA_SEAL_PATH}" fill="url(#rubyVelvetGrad)" stroke="url(#goldBezelBorder)" stroke-width="4.5" stroke-linejoin="round" />
        <path d="${JHAROKHA_SEAL_PATH}" transform="translate(100, 100) scale(0.92) translate(-100, -100)" fill="none" stroke="#ffd54f" stroke-width="1.2" opacity="0.8" />
        <path d="${JHAROKHA_SEAL_PATH}" transform="translate(100, 100) scale(0.85) translate(-100, -100)" fill="none" stroke="#ffd54f" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="0.1 7.2" />
        <path d="${JHAROKHA_SEAL_PATH}" transform="translate(100, 100) scale(0.77) translate(-100, -100)" fill="none" stroke="#ffb300" stroke-width="0.8" opacity="0.6" />
        <text x="100" y="58" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="11.5" letter-spacing="2" fill="#ffe082">DIWALI OFFER</text>
        <line x1="56" y1="65" x2="144" y2="65" stroke="#ffd54f" stroke-width="1.4" stroke-linecap="round" opacity="0.85" />
        <polygon points="100,62 103,65 100,68 97,65" fill="#ffd54f" />
        <text x="100" y="112" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', serif" font-weight="900" font-size="44" letter-spacing="1" fill="url(#goldHeroText)">${pct}</text>
        <line x1="60" y1="123" x2="140" y2="123" stroke="#ffd54f" stroke-width="1.4" stroke-linecap="round" opacity="0.85" />
        <polygon points="100,120 103,123 100,126 97,123" fill="#ffd54f" />
        <text x="100" y="142" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="16" letter-spacing="4" fill="#ffffff">OFF</text>
      </g>
    </svg>
  `)}`;

  await new Promise((resolve) => {
    const sealImg = new Image();
    sealImg.onload = () => {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 16;
      ctx.drawImage(sealImg, width - 235, 10, 215, 215);
      ctx.restore();
      resolve();
    };
    sealImg.onerror = (err) => {
      console.warn('Could not draw seal SVG onto canvas:', err);
      resolve();
    };
    sealImg.src = sealSvgDataUri;
  });

  // 5. Draw Bottom Watermark (small pill, just below the brand box)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(10, 0, 3, 0.75)';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 200, height - 90, 400, 38, 19);
  ctx.fill();
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.stroke();

  ctx.fillStyle = '#fae3b3';
  ctx.font = "italic bold 16px 'Playfair Display', serif";
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 5;
  ctx.fillText(`Diwali Moments \u2022 ${shopName}`, width / 2, height - 65);
  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.95);
}
