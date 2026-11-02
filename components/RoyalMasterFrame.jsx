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
  M 100 14
  C 108 24, 118 28, 128 28
  C 146 28, 162 44, 162 62
  C 162 72, 172 82, 186 100
  C 172 118, 162 128, 162 138
  C 162 156, 146 172, 128 172
  C 118 172, 108 176, 100 186
  C 92 176, 82 172, 72 172
  C 54 172, 38 156, 38 138
  C 38 128, 28 118, 14 100
  C 28 82, 38 72, 38 62
  C 38 44, 54 28, 72 28
  C 82 28, 92 24, 100 14
  Z
`.replace(/\s+/g, ' ').trim();

/**
 * Format discount string cleanly for the seal top line
 */
function formatDiscountLabel(discount) {
  if (!discount) return '30% OFF';
  let str = String(discount).toUpperCase().trim();
  if (str.includes('FLAT')) {
    str = str.replace('FLAT', '').trim();
  }
  if (!str.includes('OFF') && !str.includes('%')) {
    str = `${str}% OFF`;
  } else if (!str.includes('OFF')) {
    str = `${str} OFF`;
  }
  return str;
}

/**
 * Indian Jharokha Seal Component
 * Based precisely on user-provided design reference (media_1793643951931_27d54928.jpg)
 */
export function DiwaliOfferSeal({ discount = '30% OFF', className = '' }) {
  const discountText = formatDiscountLabel(discount);

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
          {/* Festive Saffron Gold Surface */}
          <linearGradient id="sealGoldSurface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff275" />
            <stop offset="30%" stopColor="#ffca28" />
            <stop offset="70%" stopColor="#ffb300" />
            <stop offset="100%" stopColor="#ffa000" />
          </linearGradient>

          {/* Polished Gold Rim */}
          <linearGradient id="sealGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#ffd54f" />
            <stop offset="70%" stopColor="#ff8f00" />
            <stop offset="100%" stopColor="#a86200" />
          </linearGradient>
        </defs>

        {/* 1. Outer Cartouche Body */}
        <path
          d={JHAROKHA_SEAL_PATH}
          fill="url(#sealGoldSurface)"
          stroke="url(#sealGoldBorder)"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* 2. Concentric Inner Border Line */}
        <path
          d={JHAROKHA_SEAL_PATH}
          transform="translate(100, 100) scale(0.92) translate(-100, -100)"
          fill="none"
          stroke="#330419"
          strokeWidth="1.2"
          opacity="0.65"
        />

        {/* 3. Traditional Auspicious Dotted Beaded Chain */}
        <path
          d={JHAROKHA_SEAL_PATH}
          transform="translate(100, 100) scale(0.85) translate(-100, -100)"
          fill="none"
          stroke="#330419"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.1 7"
        />

        {/* 4. Fine Inner Golden Trim */}
        <path
          d={JHAROKHA_SEAL_PATH}
          transform="translate(100, 100) scale(0.78) translate(-100, -100)"
          fill="none"
          stroke="#fff9c4"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* 5. Typography Matching User Reference */}
        {/* Top: 30% OFF */}
        <text
          x="100"
          y="68"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="900"
          fontSize="15"
          letterSpacing="1.5"
          fill="#260212"
        >
          {discountText}
        </text>

        {/* Divider 1 with center diamond */}
        <line x1="56" y1="76" x2="144" y2="76" stroke="#260212" strokeWidth="1.8" strokeLinecap="round" />
        <polygon points="100,72.5 103.5,76 100,79.5 96.5,76" fill="#260212" />

        {/* Center: DIWALI */}
        <g>
          <text
            x="100"
            y="112"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Playfair Display', serif"
            fontWeight="900"
            fontSize="32"
            letterSpacing="2.5"
            fill="#260212"
          >
            DIWALI
          </text>
          {/* Flame swirl ornament above the A */}
          <circle cx="98" cy="91" r="2.2" fill="#260212" />
          <path d="M 98 90 Q 102 85 100 82 Q 95 86 98 90 Z" fill="#260212" />
        </g>

        {/* Divider 2 with center diamond */}
        <line x1="56" y1="122" x2="144" y2="122" stroke="#260212" strokeWidth="1.8" strokeLinecap="round" />
        <polygon points="100,118.5 103.5,122 100,125.5 96.5,122" fill="#260212" />

        {/* Bottom: OFFER */}
        <text
          x="100"
          y="141"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="900"
          fontSize="14.5"
          letterSpacing="3.5"
          fill="#260212"
        >
          OFFER
        </text>
      </svg>
    </div>
  );
}

/**
 * Royal Authentic Indian Festive Frame Component
 * Displays selected festive frame overlay with transparent opening,
 * floating luxury typography for Dream Salon & personalized greeting,
 * and the traditional jharokha Diwali offer seal at the top corner.
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
        src={`${currentFrame.image}?v=6`}
        alt={currentFrame.name}
        onError={(e) => {
          if (!e.currentTarget.dataset.retried) {
            e.currentTarget.dataset.retried = 'true';
            e.currentTarget.src = `${currentFrame.image}?t=${Date.now()}`;
          }
        }}
        className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 transition-opacity duration-300"
      />

      {/* 2. TOP FLOATING BRAND & CORNER JHAROKHA SEAL (NO CLUNKY BOX!) */}
      <div className="relative z-30 w-full pt-2.5 sm:pt-4 px-3 sm:px-4 flex items-start justify-between gap-2 pointer-events-none">
        {/* Left: Refined Floating Brand Typography & Greeting */}
        <div className="flex-1 flex flex-col items-start min-w-0 pr-1 pointer-events-auto">
          {/* Brand Name */}
          <div className="flex items-center gap-1.5 sm:gap-2 max-w-full">
            <span className="text-amber-300 text-sm sm:text-lg shrink-0 filter drop-shadow-[0_2px_6px_rgba(255,180,0,0.8)]">
              🪔
            </span>
            <h2 className="font-serif text-base sm:text-xl md:text-2xl font-black gold-gradient-text tracking-[0.14em] uppercase truncate drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {shopName}
            </h2>
          </div>

          {/* Subtitle / Tagline */}
          <span className="text-[7.5px] sm:text-[9.5px] font-sans tracking-[0.22em] text-[#fae7b4] uppercase font-bold mt-0.5 truncate max-w-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            {shopTagline}
          </span>

          {/* Customer Greeting */}
          {customerName && (
            <div className="mt-1 flex items-center gap-1 text-[9.5px] sm:text-xs text-amber-200 font-serif italic font-semibold truncate max-w-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              <span className="text-amber-400 text-xs shrink-0">✨</span>
              <span className="truncate">
                Happy Diwali,{' '}
                <strong className="text-white font-bold underline decoration-amber-400/60 underline-offset-2">
                  {customerName}
                </strong>
                !
              </span>
            </div>
          )}
        </div>

        {/* Right: Traditional Jharokha Diwali Offer Seal in Corner */}
        <div className="shrink-0 pointer-events-auto transition-transform hover:scale-105">
          <DiwaliOfferSeal
            discount={discount}
            className="w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24"
          />
        </div>
      </div>

      {/* 3. BOTTOM WATERMARK PILL */}
      <div className="relative pb-24 text-center z-30 pointer-events-none">
        <div className="inline-block px-3.5 py-1 rounded-full bg-black/55 backdrop-blur-sm border border-amber-400/40 shadow-sm">
          <span className="text-[9px] sm:text-[10px] font-serif font-bold text-amber-200 tracking-wider uppercase drop-shadow">
            Diwali Moments • {shopName}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 1:1 High-Resolution Canvas Photo Composition (1080x1440 Portrait)
 * Combines Customer Photo + Frame Overlay PNG + Corner Jharokha Seal + Floating Luxury Typography
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
    frameImg.src = `${currentFrame.image}?v=6`;
  });

  // 3. Draw Floating Luxury Brand Typography (Top Left, No Box!)
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
  ctx.textAlign = 'left';

  // Gold gradient for brand title
  const goldGrad = ctx.createLinearGradient(60, 50, 60, 95);
  goldGrad.addColorStop(0, '#fffbe6');
  goldGrad.addColorStop(0.3, '#ffd700');
  goldGrad.addColorStop(0.7, '#ffb300');
  goldGrad.addColorStop(1, '#c59a1f');

  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 14;
  ctx.fillStyle = goldGrad;
  ctx.font = "900 46px 'Cinzel', 'Playfair Display', serif";
  ctx.fillText(`🪔 ${shopName}`, 60, 84);

  // Brand tagline
  ctx.font = "bold 16px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = '#fae7b4';
  ctx.shadowBlur = 10;
  ctx.fillText(shopTagline, 70, 116);

  // Personalized Greeting
  if (customerName) {
    ctx.font = "italic bold 22px 'Playfair Display', serif";
    ctx.fillStyle = '#ffd54f';
    ctx.shadowBlur = 12;
    ctx.fillText(`✨ Happy Diwali, ${customerName}!`, 70, 150);
  }
  ctx.restore();

  // 4. Draw Traditional Indian Jharokha Seal in Top Right Corner
  const discountLabel = formatDiscountLabel(discount);
  const sealSvgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="220" height="220">
      <defs>
        <linearGradient id="sealGoldSurface" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff275" />
          <stop offset="30%" stop-color="#ffca28" />
          <stop offset="70%" stop-color="#ffb300" />
          <stop offset="100%" stop-color="#ffa000" />
        </linearGradient>
        <linearGradient id="sealGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="35%" stop-color="#ffd54f" />
          <stop offset="70%" stop-color="#ff8f00" />
          <stop offset="100%" stop-color="#a86200" />
        </linearGradient>
        <filter id="sealShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.8" />
        </filter>
      </defs>
      <g filter="url(#sealShadow)">
        <path d="${JHAROKHA_SEAL_PATH}" fill="url(#sealGoldSurface)" stroke="url(#sealGoldBorder)" stroke-width="4" stroke-linejoin="round" />
        <path d="${JHAROKHA_SEAL_PATH}" transform="translate(100, 100) scale(0.92) translate(-100, -100)" fill="none" stroke="#330419" stroke-width="1.2" opacity="0.65" />
        <path d="${JHAROKHA_SEAL_PATH}" transform="translate(100, 100) scale(0.85) translate(-100, -100)" fill="none" stroke="#330419" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 7" />
        <path d="${JHAROKHA_SEAL_PATH}" transform="translate(100, 100) scale(0.78) translate(-100, -100)" fill="none" stroke="#fff9c4" stroke-width="1" opacity="0.8" />
        <text x="100" y="68" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="15" letter-spacing="1.5" fill="#260212">${discountLabel}</text>
        <line x1="56" y1="76" x2="144" y2="76" stroke="#260212" stroke-width="1.8" stroke-linecap="round" />
        <polygon points="100,72.5 103.5,76 100,79.5 96.5,76" fill="#260212" />
        <text x="100" y="112" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', serif" font-weight="900" font-size="32" letter-spacing="2.5" fill="#260212">DIWALI</text>
        <circle cx="98" cy="91" r="2.2" fill="#260212" />
        <path d="M 98 90 Q 102 85 100 82 Q 95 86 98 90 Z" fill="#260212" />
        <line x1="56" y1="122" x2="144" y2="122" stroke="#260212" stroke-width="1.8" stroke-linecap="round" />
        <polygon points="100,118.5 103.5,122 100,125.5 96.5,122" fill="#260212" />
        <text x="100" y="141" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14.5" letter-spacing="3.5" fill="#260212">OFFER</text>
      </g>
    </svg>
  `)}`;

  await new Promise((resolve) => {
    const sealImg = new Image();
    sealImg.onload = () => {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 16;
      ctx.drawImage(sealImg, width - 235, 32, 195, 195);
      ctx.restore();
      resolve();
    };
    sealImg.onerror = (err) => {
      console.warn('Could not draw seal SVG onto canvas:', err);
      resolve();
    };
    sealImg.src = sealSvgDataUri;
  });

  // 5. Draw Bottom Watermark Footer Pill
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(26, 3, 15, 0.82)';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 240, height - 68, 480, 44, 22);
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.stroke();

  ctx.fillStyle = '#fae3b3';
  ctx.font = "italic bold 18px 'Playfair Display', serif";
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 6;
  ctx.fillText(`Diwali Moments • ${shopName}`, width / 2, height - 39);
  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.95);
}
