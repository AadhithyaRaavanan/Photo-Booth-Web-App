'use client';

import React from 'react';

export const ROYAL_FRAMES = [
  {
    id: 'frame-1',
    name: 'Royal Temple Arch',
    image: '/frames/frame_1_royal_temple.png',
    thumb: '/frames/thumb_frame_1.png',
    theme: 'royal-purple',
    badge: '👑 Royal',
    description: 'Royal purple temple mandapam with elephant, peacock, bells, and burning diyas',
  },
  {
    id: 'frame-2',
    name: 'Peacock & Jharokha Palace',
    image: '/frames/frame_2_peacock_palace.png',
    thumb: '/frames/thumb_frame_2.png',
    theme: 'emerald-teal',
    badge: '🦚 Peacock',
    description: 'Emerald and teal palace jharokha arch with cascading peacock plumage',
  },
  {
    id: 'frame-3',
    name: 'Traditional Marigold & Diya',
    image: '/frames/frame_3_traditional_marigold.png',
    thumb: '/frames/thumb_frame_3.png',
    theme: 'saffron-orange',
    badge: '🌼 Marigold',
    description: 'Vibrant saffron and yellow marigolds, mango leaf toran, and hanging brass lamps',
  },
  {
    id: 'frame-4',
    name: 'Imperial Lotus & Urli Pond',
    image: '/frames/frame_4_imperial_lotus.png',
    thumb: '/frames/thumb_frame_4.png',
    theme: 'magenta-lotus',
    badge: '🪷 Lotus',
    description: 'Imperial magenta velvet, blooming lotus blossoms, and antique urli water bowls',
  },
  {
    id: 'frame-5',
    name: 'Midnight Sky & Fireworks',
    image: '/frames/frame_5_midnight_fireworks.png',
    thumb: '/frames/thumb_frame_5.png',
    theme: 'midnight-sapphire',
    badge: '🎆 Fireworks',
    description: 'Midnight sapphire starry sky with dazzling Diwali fireworks and lanterns',
  },
  {
    id: 'frame-6',
    name: 'Sacred Deepavali Rangoli',
    image: '/frames/frame_6_sacred_diya.png',
    thumb: '/frames/thumb_frame_6.png',
    theme: 'crimson-ruby',
    badge: '🪔 Rangoli',
    description: 'Crimson ruby with sacred Kalash, glowing clay deepams, and kolam rangoli',
  },
  {
    id: 'frame-7',
    name: 'Shubh Toran & Golden Bells',
    image: '/frames/frame_7_shubh_toran.png',
    thumb: '/frames/thumb_frame_7.png',
    theme: 'vermilion-toran',
    badge: '🔔 Toran',
    description: 'Vermilion red entrance toran with mango leaves, marigolds, and ringing temple bells',
  },
  {
    id: 'frame-8',
    name: 'Royal Mughal Darbar',
    image: '/frames/frame_8_mughal_darbar.png',
    thumb: '/frames/thumb_frame_8.png',
    theme: 'imperial-darbar',
    badge: '🏛️ Darbar',
    description: 'Opulent 24K fluted golden palace pillars, cusped Mughal arch, and burgundy velvet drapes',
  },
];

/**
 * Royal Authentic Indian Festive Frame
 * Supports 8 authentic royal festive frame designs with transparent center arch opening
 * for live camera preview and high-resolution Canvas composition.
 */
export default function RoyalMasterFrame({
  shopConfig = {},
  customerName = "",
  discount = "FLAT 30% OFF",
  selectedFrameId = "frame-1",
}) {
  const shopName = shopConfig.shopName || "Dream Salon";
  const shopTagline = shopConfig.shopTagline || "BEAUTY · STYLE · CONFIDENCE";
  const currentFrame = ROYAL_FRAMES.find((f) => f.id === selectedFrameId) || ROYAL_FRAMES[0];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. THE USER'S AUTHENTIC ROYAL FRAME IMAGE OVERLAY (Transparent Center) */}
      <img
        key={currentFrame.id}
        src={`${currentFrame.image}?v=5`}
        alt={currentFrame.name}
        onError={(e) => {
          if (!e.currentTarget.dataset.retried) {
            e.currentTarget.dataset.retried = 'true';
            e.currentTarget.src = `${currentFrame.image}?t=${Date.now()}`;
          }
        }}
        className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 transition-opacity duration-300"
      />

      {/* 2. TOP UNIFIED LUXURY BRAND & OFFER HEADER: Spacious, Coordinated, Zero Collision */}
      <div className="relative z-30 w-full pt-2 sm:pt-3 px-2.5 sm:px-3.5">
        <div className="w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-[#200312]/95 via-[#30051d]/90 to-[#1e0210]/95 backdrop-blur-md border border-amber-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.85),0_0_15px_rgba(255,215,0,0.25)]">
          {/* Left Column: Brand Identity */}
          <div className="flex-1 flex flex-col items-start min-w-0 pr-1">
            <div className="flex items-center gap-1.5 sm:gap-2 max-w-full">
              <span className="text-amber-300 text-sm sm:text-base shrink-0 filter drop-shadow">🪔</span>
              <h2 className="font-serif text-sm sm:text-lg md:text-xl font-black gold-gradient-text tracking-[0.16em] uppercase truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {shopName}
              </h2>
            </div>
            <span className="text-[7.5px] sm:text-[9px] font-sans tracking-[0.22em] text-[#fae7b4]/90 uppercase font-semibold mt-0.5 truncate max-w-full">
              {shopTagline}
            </span>

            {customerName && (
              <div className="mt-1 flex items-center gap-1 text-[8.5px] sm:text-[10px] text-amber-200 font-medium italic truncate max-w-full">
                <span className="text-amber-400 text-[10px]">✨</span>
                <span className="truncate">Happy Diwali, <strong className="text-white font-bold">{customerName}</strong>!</span>
              </div>
            )}
          </div>

          {/* Right Column: Royal Scalloped FLAT 30% OFF Medallion */}
          <div className="shrink-0 flex items-center justify-center pl-1">
            <div className="relative flex items-center justify-center filter drop-shadow-[0_4px_14px_rgba(255,215,0,0.7)]">
              <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-19 sm:h-19 animate-pulse-slow">
                <defs>
                  <radialGradient id="royalFestiveMed" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff9e6" />
                    <stop offset="35%" stopColor="#f5c518" />
                    <stop offset="70%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#7a5405" />
                  </radialGradient>
                  <linearGradient id="medallionRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#ffd700" />
                    <stop offset="100%" stopColor="#8a5e0b" />
                  </linearGradient>
                </defs>

                {/* 16 scalloped 24K gold petals */}
                <g transform="translate(50,50)">
                  {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
                    <path
                      key={angle}
                      d="M 0 -48 Q 5.5 -41 0 -33 Q -5.5 -41 0 -48 Z"
                      fill="url(#royalFestiveMed)"
                      stroke="#ffd700"
                      strokeWidth="0.8"
                      transform={`rotate(${angle})`}
                    />
                  ))}
                </g>

                {/* Central deep royal maroon disc */}
                <circle cx="50" cy="50" r="35" fill="#36041b" stroke="url(#medallionRimGrad)" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#ffd700" strokeWidth="1" strokeDasharray="3,2" />
              </svg>

              {/* Bold, prominent offer text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
                <span className="text-[7.5px] sm:text-[8.5px] font-black tracking-[0.16em] text-[#fae7b4] uppercase drop-shadow-sm">
                  FLAT
                </span>
                <span className="text-[17px] sm:text-[20px] font-black font-serif text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] my-0.5">
                  30%
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] font-black tracking-[0.16em] text-[#ffd700] uppercase drop-shadow-sm">
                  OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM WATERMARK BADGE */}
      <div className="relative pb-24 text-center z-30">
        <div className="inline-block px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-amber-400/50 shadow-sm">
          <span className="text-[9.5px] sm:text-[10px] font-serif font-bold text-amber-200 tracking-wider uppercase">
            Diwali Moments • {shopName}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 1:1 High-Resolution Canvas Photo Composition
 * Combines Customer Photo + Transparent Royal Frame + Extra Bold Store Branding + 30% OFF Medallion
 */
export async function composeRoyalMasterPhoto({
  imageElement,
  customerName = "Guest",
  shopConfig = {},
  discount = "FLAT 30% OFF",
  selectedFrameId = "frame-1",
}) {
  const currentFrame = ROYAL_FRAMES.find((f) => f.id === selectedFrameId) || ROYAL_FRAMES[0];
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1440; // 3:4 portrait aspect ratio
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // 1. Draw customer photograph (scaled & centered to fill canvas)
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
    grad.addColorStop(0, "#4a0b25");
    grad.addColorStop(0.5, "#300618");
    grad.addColorStop(1, "#1c030d");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Load and overlay the transparent royal frame PNG corresponding to selected frame
  await new Promise((resolve) => {
    const frameImg = new Image();
    frameImg.onload = () => {
      ctx.drawImage(frameImg, 0, 0, width, height);
      resolve();
    };
    frameImg.onerror = () => {
      console.warn("Could not load frame overlay image:", currentFrame.image);
      resolve();
    };
    frameImg.src = `${currentFrame.image}?v=5`;
  });

  // 3. Draw Unified Store Branding & 30% OFF Header across top (Spacious, Zero Overlap)
  const shopName = shopConfig.shopName || "Dream Salon";
  const shopTagline = shopConfig.shopTagline || "BEAUTY · STYLE · CONFIDENCE";

  ctx.save();

  // Unified Header Banner Background Bar
  ctx.fillStyle = "rgba(32, 3, 18, 0.94)";
  ctx.beginPath();
  ctx.roundRect(40, 28, width - 80, 150, 24);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#d4af37";
  ctx.stroke();

  // Left Column: Brand Identity
  ctx.textAlign = "left";
  
  // Gold gradient for Store Title
  const goldGrad = ctx.createLinearGradient(90, 45, 90, 85);
  goldGrad.addColorStop(0, "#fff5d6");
  goldGrad.addColorStop(0.5, "#ffd700");
  goldGrad.addColorStop(1, "#c59a1f");
  ctx.fillStyle = goldGrad;
  ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
  ctx.shadowBlur = 12;
  ctx.font = "900 48px 'Cinzel', serif";
  ctx.fillText(`🪔 ${shopName}`, 80, 86);

  // Store Tagline
  ctx.font = "bold 17px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#fae7b4";
  ctx.fillText(shopTagline, 90, 122);

  // Customer Personalized Greeting (neatly inside the bar)
  if (customerName) {
    ctx.font = "italic bold 21px 'Playfair Display', serif";
    ctx.fillStyle = "#ffd54f";
    ctx.fillText(`✨ Happy Diwali, ${customerName}!`, 90, 155);
  }
  ctx.restore();

  // 4. Draw Right Column: Royal Scalloped Rosette Medallion ("FLAT 30% OFF")
  const medX = width - 150;
  const medY = 103;
  const medRadius = 66;

  ctx.save();
  ctx.shadowColor = "rgba(255, 215, 0, 0.85)";
  ctx.shadowBlur = 24;

  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    ctx.beginPath();
    ctx.arc(
      medX + Math.cos(angle) * (medRadius - 8),
      medY + Math.sin(angle) * (medRadius - 8),
      16,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "#ffd700";
    ctx.fill();
  }

  // Inner maroon disc
  ctx.beginPath();
  ctx.arc(medX, medY, medRadius - 12, 0, Math.PI * 2);
  ctx.fillStyle = "#36041b";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ffd700";
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#fae7b4";
  ctx.font = "900 13px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("FLAT", medX, medY - 18);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 36px 'Cinzel', serif";
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = 8;
  ctx.fillText("30%", medX, medY + 14);

  ctx.fillStyle = "#ffd700";
  ctx.font = "900 13px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("OFF", medX, medY + 34);
  ctx.restore();

  // 5. Draw Bottom Watermark Footer
  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(42, 5, 21, 0.88)";
  ctx.beginPath();
  ctx.roundRect(width / 2 - 250, height - 72, 500, 46, 23);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#d4af37";
  ctx.stroke();

  ctx.fillStyle = "#fae3b3";
  ctx.font = "italic bold 19px 'Playfair Display', serif";
  ctx.fillText(`Diwali Celebration • ${shopName}`, width / 2, height - 42);
  ctx.restore();

  return canvas.toDataURL("image/jpeg", 0.95);
}
