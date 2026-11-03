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
 * Generates the 30% Offer Seal SVG string (Enlarged Offer Typography)
 * 100% shared between DOM and Canvas for pixel-perfect identical rendering
 */
export function getHighContrastDiwaliSealSvg({ discount = '30% OFF', size = 220 } = {}) {
  const { pct, label, header } = extractDiscountParts(discount);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${size}" height="${size}">
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@900&amp;family=Plus+Jakarta+Sans:wght@900&amp;display=swap');
        .seal-header { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 900; letter-spacing: 2px; }
        .seal-pct { font-family: 'Cinzel', 'Playfair Display', Georgia, serif; font-weight: 900; }
        .seal-off { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 900; letter-spacing: 4px; }
      </style>
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
        <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#000000" flood-opacity="0.85" />
      </filter>
    </defs>
    <g filter="url(#sealShadow)">
      <path d="${JHAROKHA_SEAL_PATH}" fill="url(#rubyVelvetGrad)" stroke="url(#goldBezelBorder)" stroke-width="4.5" stroke-linejoin="round" />
      <path d="${JHAROKHA_SEAL_PATH}" transform="translate(100, 100) scale(0.92) translate(-100, -100)" fill="none" stroke="#ffd54f" stroke-width="1.2" opacity="0.8" />
      <path d="${JHAROKHA_SEAL_PATH}" transform="translate(100, 100) scale(0.85) translate(-100, -100)" fill="none" stroke="#ffd54f" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="0.1 7.2" />
      <path d="${JHAROKHA_SEAL_PATH}" transform="translate(100, 100) scale(0.77) translate(-100, -100)" fill="none" stroke="#ffb300" stroke-width="0.8" opacity="0.6" />
      <text x="100" y="56" text-anchor="middle" class="seal-header" font-size="12.5" fill="#ffe082">${header}</text>
      <line x1="52" y1="63" x2="148" y2="63" stroke="#ffd54f" stroke-width="1.5" stroke-linecap="round" opacity="0.85" />
      <polygon points="100,60 103.5,63 100,66 96.5,63" fill="#ffd54f" />
      <!-- Extra Large 30% Hero -->
      <text x="100" y="114" text-anchor="middle" class="seal-pct" font-size="50" fill="url(#goldHeroText)">${pct}</text>
      <line x1="56" y1="125" x2="144" y2="125" stroke="#ffd54f" stroke-width="1.5" stroke-linecap="round" opacity="0.85" />
      <polygon points="100,122 103.5,125 100,128 96.5,125" fill="#ffd54f" />
      <text x="100" y="145" text-anchor="middle" class="seal-off" font-size="18" fill="#ffffff">${label}</text>
    </g>
  </svg>`;
}

/**
 * Generates the Unified Diwali Brand Box SVG string (Larger Text Profile)
 * Features authentic vector Diya icons, enlarged gold foil typography, and festive flourish.
 * 100% shared between DOM and Canvas for pixel-perfect identical rendering.
 */
export function getDiwaliBrandBoxSvg({
  shopName = 'Dream Salon',
  shopTagline = 'BEAUTY · STYLE · CONFIDENCE',
  customerName = '',
  width = '100%',
  height = '100%',
} = {}) {
  const cleanName = (shopName || 'Dream Salon').toUpperCase();
  const cleanTagline = (shopTagline || 'BEAUTY · STYLE · CONFIDENCE').toUpperCase();
  const cleanCustomer = customerName ? customerName.trim() : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 85" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@900&amp;family=Playfair+Display:ital,wght@1,700&amp;family=Plus+Jakarta+Sans:wght@700&amp;display=swap');
      .gold-title { font-family: 'Cinzel', 'Playfair Display', Georgia, serif; font-weight: 900; letter-spacing: 2.5px; }
      .gold-tagline { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 700; letter-spacing: 3.2px; }
      .gold-greeting { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 700; }
    </style>
    <linearGradient id="brandBoxBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#240110" stop-opacity="0.98" />
      <stop offset="50%" stop-color="#180009" stop-opacity="0.97" />
      <stop offset="100%" stop-color="#0c0004" stop-opacity="0.98" />
    </linearGradient>
    <linearGradient id="brandGoldBorder" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37" />
      <stop offset="50%" stop-color="#ffd700" />
      <stop offset="100%" stop-color="#d4af37" />
    </linearGradient>
    <linearGradient id="brandGoldText" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fffbe6" />
      <stop offset="35%" stop-color="#ffd700" />
      <stop offset="75%" stop-color="#ffb300" />
      <stop offset="100%" stop-color="#c59a1f" />
    </linearGradient>
    <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#e11d48" />
      <stop offset="30%" stop-color="#f97316" />
      <stop offset="70%" stop-color="#facc15" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
    <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="50%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#92400e" />
    </linearGradient>
    <linearGradient id="ctaBtnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e60067" />
      <stop offset="50%" stop-color="#ff3b30" />
      <stop offset="100%" stop-color="#ff9500" />
    </linearGradient>
    <filter id="boxShadow">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000000" flood-opacity="0.9" />
    </filter>
  </defs>

  <g filter="url(#boxShadow)">
    <rect x="2" y="2" width="596" height="81" rx="16" ry="16" fill="url(#brandBoxBg)" stroke="url(#brandGoldBorder)" stroke-width="2" />
    <line x1="28" y1="5" x2="572" y2="5" stroke="#ffd700" stroke-width="1.3" stroke-linecap="round" opacity="0.85" />
    <line x1="28" y1="80" x2="572" y2="80" stroke="#ffd700" stroke-width="1.3" stroke-linecap="round" opacity="0.85" />

    <!-- Left Authentic Vector Diya Icon (Enlarged) -->
    <g transform="translate(18, 17) scale(1.15)">
      <path d="M 4 24 Q 18 36 32 24 Q 28 32 18 34 Q 8 32 4 24 Z" fill="url(#bowlGrad)" stroke="#fef08a" stroke-width="0.8" />
      <ellipse cx="18" cy="24" rx="14" ry="3.5" fill="#f59e0b" stroke="#fde047" stroke-width="0.8" />
      <path d="M 18 22 C 14 18 13 11 18 2 C 23 11 22 18 18 22 Z" fill="url(#flameGrad)" />
      <ellipse cx="18" cy="16" rx="2" ry="4" fill="#ffffff" opacity="0.9" />
    </g>

    <!-- Brand Name (24px Cinzel Gold) -->
    <text x="64" y="32" class="gold-title" font-size="24" fill="url(#brandGoldText)">${cleanName}</text>

    <!-- Tagline (10px Plus Jakarta Sans) -->
    <text x="66" y="49" class="gold-tagline" font-size="10" fill="#fae7b4">${cleanTagline}</text>

    <!-- Customer Greeting or Celebration -->
    <text x="66" y="68" class="gold-greeting" font-size="13" fill="#ffd54f">
      ✨ Happy Diwali${cleanCustomer ? `, <tspan fill="#ffffff" font-weight="900">${cleanCustomer}</tspan>!` : ' Celebration!'}
    </text>

    <!-- Eye-Catchy Radiant Call-To-Action Pill: Share & Get Offer -->
    <g transform="translate(370, 16)">
      <rect x="0" y="0" width="216" height="52" rx="26" ry="26" fill="url(#ctaBtnGrad)" stroke="#ffd700" stroke-width="2" />
      <rect x="3" y="3" width="210" height="46" rx="23" ry="23" fill="none" stroke="#fff3cd" stroke-width="1" stroke-dasharray="3 3" opacity="0.8" />
      <text x="108" y="32" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="13.5" letter-spacing="1.5" fill="#ffffff">SHARE &amp; GET OFFER</text>
    </g>
  </g>
</svg>`;
}

/**
 * High-Contrast, Large Indian Jharokha 30% Icon Component
 */
export function DiwaliOfferSeal({ discount = '30% OFF', className = '' }) {
  const svgHtml = getHighContrastDiwaliSealSvg({ discount, size: '100%' });

  return (
    <div
      className={`relative flex items-center justify-center filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] ${className}`}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}

/**
 * Diwali Brand Box Component
 */
export function DiwaliBrandBox({ shopName, shopTagline, customerName, className = '' }) {
  const svgHtml = getDiwaliBrandBoxSvg({ shopName, shopTagline, customerName, width: '100%', height: '100%' });

  return (
    <div
      className={`w-full select-none ${className}`}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}

/**
 * Royal Authentic Indian Festive Frame Component
 * Displays selected festive frame overlay with transparent opening,
 * unified top-right enlarged 30% seal, and bottom enlarged-text brand box.
 * 100% VISUALLY IDENTICAL to the captured Canvas photo!
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
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none">
      {/* 1. THE AUTHENTIC USER FESTIVE FRAME OVERLAY (Transparent Center Opening) */}
      <img
        key={currentFrame.id}
        src={`${currentFrame.image}?v=12`}
        alt={currentFrame.name}
        onError={(e) => {
          if (!e.currentTarget.dataset.retried) {
            e.currentTarget.dataset.retried = 'true';
            e.currentTarget.src = `${currentFrame.image}?t=${Date.now()}`;
          }
        }}
        className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 transition-opacity duration-300"
      />

      {/* 2. TOP RIGHT CORNER: Enlarged Offer Seal (Positioned at top 1.5%, right 2%, width 25% max 125px) */}
      <div className="absolute top-[1.5%] right-[2%] w-[25%] max-w-[125px] z-30 pointer-events-auto">
        <DiwaliOfferSeal
          discount={discount}
          className="w-full h-auto hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* 3. BOTTOM BRAND BOX: Placed at the VERY BOTTOM of the frame with enlarged typography */}
      <div className="absolute left-[2.5%] right-[2.5%] bottom-[1.8%] z-30 pointer-events-auto">
        <DiwaliBrandBox
          shopName={shopName}
          shopTagline={shopTagline}
          customerName={customerName}
        />
      </div>
    </div>
  );
}

/**
 * 1:1 High-Resolution Canvas Photo Composition (1080x1440 Portrait)
 * Combines Customer Photo + Frame Overlay PNG + Identical Enlarged 30% Seal SVG + Identical Enlarged Brand Box SVG
 * 100% VISUALLY IDENTICAL to the live preview!
 */
export async function composeRoyalMasterPhoto({
  imageElement,
  customerName = 'Guest',
  shopConfig = {},
  discount = 'FLAT 30% OFF',
  selectedFrameId = 'frame-1',
  targetWidth = 1080,
  targetHeight = 1440,
  formatId = 'photobooth-classic',
}) {
  const currentFrame = ROYAL_FRAMES.find((f) => f.id === selectedFrameId) || ROYAL_FRAMES[0];
  const canvas = document.createElement('canvas');
  const width = targetWidth;
  const height = targetHeight;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const isLandscape = width > height * 1.15;
  const isStory = Math.abs(height / width - 16 / 9) < 0.08 || formatId === 'instagram-story' || formatId === 'whatsapp-status';

  let portraitW, portraitH, portraitX, portraitY;

  if (isLandscape) {
    portraitH = Math.round(height * 0.94);
    portraitW = Math.round(portraitH * 0.75);
    portraitX = Math.round((width - portraitW) / 2);
    portraitY = Math.round((height - portraitH) / 2);
  } else if (isStory) {
    portraitW = width;
    portraitH = Math.round(width * (4 / 3)); // 1440 for width=1080
    portraitX = 0;
    portraitY = Math.round((height - portraitH) / 2); // 240 for height=1920
  } else {
    portraitW = width;
    portraitH = height;
    portraitX = 0;
    portraitY = 0;
  }

  // 1. Draw Background (Velvet gradient for Story and Landscape compositions)
  if (isLandscape || isStory) {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#260214');
    bgGrad.addColorStop(0.3, '#16010c');
    bgGrad.addColorStop(0.7, '#16010c');
    bgGrad.addColorStop(1, '#080004');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    if (isStory) {
      // Subtle elegant festive sparkles in top & bottom safe zones
      const sparkles = [
        { x: 180, y: 110, r: 4, a: 0.6 },
        { x: 380, y: 140, r: 3, a: 0.4 },
        { x: 540, y: 80, r: 5, a: 0.7 },
        { x: 720, y: 130, r: 3, a: 0.4 },
        { x: 900, y: 100, r: 4, a: 0.6 },
        { x: 160, y: 1810, r: 3, a: 0.5 },
        { x: 340, y: 1840, r: 4, a: 0.6 },
        { x: 540, y: 1860, r: 5, a: 0.7 },
        { x: 740, y: 1830, r: 3, a: 0.5 },
        { x: 920, y: 1820, r: 4, a: 0.6 },
      ];
      sparkles.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${s.a})`;
        ctx.fill();
      });
    }
  }

  // 2. Draw Customer Photo fitted inside the portrait bounds
  if (imageElement) {
    const imgW = imageElement.videoWidth || imageElement.width || 1080;
    const imgH = imageElement.videoHeight || imageElement.height || 1440;
    const imgRatio = imgW / imgH;
    const portRatio = portraitW / portraitH;

    let sx = 0, sy = 0, sw = imgW, sh = imgH;
    if (imgRatio > portRatio) {
      sw = imgH * portRatio;
      sx = (imgW - sw) / 2;
    } else {
      sh = imgW / portRatio;
      sy = (imgH - sh) / 2;
    }

    ctx.drawImage(imageElement, sx, sy, sw, sh, portraitX, portraitY, portraitW, portraitH);
  } else {
    const grad = ctx.createLinearGradient(portraitX, portraitY, portraitX, portraitY + portraitH);
    grad.addColorStop(0, '#2e0417');
    grad.addColorStop(0.5, '#1e0210');
    grad.addColorStop(1, '#0e0108');
    ctx.fillStyle = grad;
    ctx.fillRect(portraitX, portraitY, portraitW, portraitH);
  }

  // 3. Load and draw the transparent festive frame PNG overlay
  await new Promise((resolve) => {
    const frameImg = new Image();
    frameImg.crossOrigin = 'anonymous';
    frameImg.onload = () => {
      ctx.drawImage(frameImg, portraitX, portraitY, portraitW, portraitH);
      resolve();
    };
    frameImg.onerror = () => {
      console.warn('Could not load frame overlay image:', currentFrame.image);
      resolve();
    };
    frameImg.src = `${currentFrame.image}?v=12`;
  });

  // 4. Draw Identical Enlarged Top-Right 30% Offer Seal SVG
  const sealWidth = Math.round(portraitW * 0.25);
  const sealHeight = sealWidth;
  const sealX = portraitX + Math.round(portraitW * 0.98 - sealWidth);
  const sealY = portraitY + Math.round(portraitH * 0.015);

  const sealSvgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(
    getHighContrastDiwaliSealSvg({ discount, size: sealWidth })
  )}`;

  await new Promise((resolve) => {
    const sealImg = new Image();
    sealImg.onload = () => {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 18;
      ctx.drawImage(sealImg, sealX, sealY, sealWidth, sealHeight);
      ctx.restore();
      resolve();
    };
    sealImg.onerror = (err) => {
      console.warn('Could not draw seal SVG onto canvas:', err);
      resolve();
    };
    sealImg.src = sealSvgDataUri;
  });

  // 5. Draw Identical Enlarged Bottom Brand Box SVG
  const shopName = shopConfig.shopName || 'Dream Salon';
  const shopTagline = shopConfig.shopTagline || 'BEAUTY · STYLE · CONFIDENCE';

  const boxWidth = Math.round(portraitW * 0.95);
  const boxHeight = Math.round(boxWidth * (85 / 600));
  const boxX = portraitX + Math.round((portraitW - boxWidth) / 2);
  const boxY = portraitY + Math.round(portraitH * (1 - 0.018) - boxHeight);

  const brandBoxSvgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(
    getDiwaliBrandBoxSvg({
      shopName,
      shopTagline,
      customerName,
      width: boxWidth,
      height: boxHeight,
    })
  )}`;

  await new Promise((resolve) => {
    const boxImg = new Image();
    boxImg.onload = () => {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = 18;
      ctx.drawImage(boxImg, boxX, boxY, boxWidth, boxHeight);
      ctx.restore();
      resolve();
    };
    boxImg.onerror = (err) => {
      console.warn('Could not draw brand box SVG onto canvas:', err);
      resolve();
    };
    boxImg.src = brandBoxSvgDataUri;
  });

  // 6. Finalize canvas
  return canvas.toDataURL('image/jpeg', 0.95);
}
