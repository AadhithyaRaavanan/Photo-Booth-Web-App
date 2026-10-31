'use client';

import React from 'react';
import LanternGraphic from './LanternGraphic';
import DiyaGraphic from './DiyaGraphic';
import MarigoldGarland from './MarigoldGarland';

export const FRAMES_LIST = [
  {
    id: "frame-1",
    name: "Royal Palace Burgundy",
    discount: "FLAT 30% OFF",
    theme: "burgundy-gold",
    accentColor: "#d4af37",
    bgClass: "from-[#4a0a25] via-transparent to-[#280413]",
    thumbBg: "linear-gradient(135deg, #4a0a25 0%, #d4af37 50%, #280413 100%)",
  },
  {
    id: "frame-2",
    name: "Imperial Maroon & Arch",
    discount: "FLAT 30% OFF",
    theme: "maroon-arch",
    accentColor: "#fae7b4",
    bgClass: "from-[#38061c] via-transparent to-[#1c020d]",
    thumbBg: "linear-gradient(135deg, #38061c 0%, #fae7b4 50%, #1c020d 100%)",
  },
  {
    id: "frame-3",
    name: "Traditional Marigold Urli",
    discount: "FLAT 30% OFF",
    theme: "marigold-orange",
    accentColor: "#ff9800",
    bgClass: "from-[#471200] via-transparent to-[#290800]",
    thumbBg: "linear-gradient(135deg, #ff9800 0%, #ff5722 50%, #3e072b 100%)",
  },
  {
    id: "frame-4",
    name: "Champagne Ivory Luxury",
    discount: "FLAT 30% OFF",
    theme: "ivory-gold",
    accentColor: "#e6c687",
    bgClass: "from-[#30261f] via-transparent to-[#1a140f]",
    thumbBg: "linear-gradient(135deg, #f7ebd2 0%, #d4af37 50%, #30261f 100%)",
  },
  {
    id: "frame-5",
    name: "Midnight Noir & 24K Gold",
    discount: "FLAT 30% OFF",
    theme: "black-gold",
    accentColor: "#ffd700",
    bgClass: "from-[#111111] via-transparent to-[#050505]",
    thumbBg: "linear-gradient(135deg, #111111 0%, #ffd700 50%, #000000 100%)",
  },
  {
    id: "frame-6",
    name: "Palace Lotus & Magenta",
    discount: "FLAT 30% OFF",
    theme: "magenta-floral",
    accentColor: "#f06292",
    bgClass: "from-[#4d0831] via-transparent to-[#28021a]",
    thumbBg: "linear-gradient(135deg, #ec407a 0%, #ffd54f 50%, #4d0831 100%)",
  },
  {
    id: "frame-7",
    name: "Golden Starlight Glamour",
    discount: "FLAT 30% OFF",
    theme: "glamour-purple",
    accentColor: "#ffd54f",
    bgClass: "from-[#2b083d] via-transparent to-[#12021c]",
    thumbBg: "linear-gradient(135deg, #7b1fa2 0%, #ffd54f 50%, #2b083d 100%)",
  },
  {
    id: "frame-8",
    name: "Festive Amber Celebration",
    discount: "FLAT 30% OFF",
    theme: "warm-amber",
    accentColor: "#ffb300",
    bgClass: "from-[#421d00] via-transparent to-[#210c00]",
    thumbBg: "linear-gradient(135deg, #ff8f00 0%, #ffe082 50%, #421d00 100%)",
  },
];

// Reusable Medallion component matching reference
export function DiscountMedallion({ discount = "FLAT 30% OFF", size = "normal" }) {
  const parts = discount.split(' ');
  const flatText = parts[0] || 'FLAT';
  const percentText = parts[1] || '30%';
  const offText = parts[2] || 'OFF';

  return (
    <div className={`relative flex items-center justify-center filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.7)] select-none pointer-events-none ${
      size === "small" ? "scale-75" : size === "large" ? "scale-110" : ""
    }`}>
      <svg viewBox="0 0 120 120" className="w-24 h-24 animate-pulse-slow">
        <defs>
          <radialGradient id="medallionGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff7d6" />
            <stop offset="40%" stopColor="#f5c518" />
            <stop offset="75%" stopColor="#b8860b" />
            <stop offset="100%" stopColor="#634503" />
          </radialGradient>
          <linearGradient id="medallionRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#8f6a19" />
          </linearGradient>
        </defs>

        {/* 16 scalloped petals */}
        <g transform="translate(60,60)">
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
            <path
              key={angle}
              d="M 0 -54 Q 6 -46 0 -38 Q -6 -46 0 -54 Z"
              fill="url(#medallionGold)"
              stroke="#ffd700"
              strokeWidth="0.8"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>

        {/* Outer Circular Ring with Beaded Dots */}
        <circle cx="60" cy="60" r="44" fill="#3b081e" stroke="url(#medallionRim)" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#ffd700" strokeWidth="1" strokeDasharray="2,3" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
        <span className="text-[9px] font-bold tracking-widest text-[#fae7b4] uppercase font-sans">
          {flatText}
        </span>
        <span className="text-[20px] font-black tracking-tight text-white font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {percentText}
        </span>
        <span className="text-[9px] font-bold tracking-widest text-[#ffd700] uppercase font-sans">
          {offText}
        </span>
      </div>
    </div>
  );
}

// Interactive Live Camera Frame Overlay
export default function FrameOverlay({
  frameId = "frame-1",
  shopConfig = {},
  customerName = "",
  discount = "FLAT 30% OFF",
}) {
  const currentFrame = FRAMES_LIST.find((f) => f.id === frameId) || FRAMES_LIST[0];
  const shopName = shopConfig.shopName || "Dream Salon";
  const shopTagline = shopConfig.shopTagline || "BEAUTY · STYLE · CONFIDENCE";

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between overflow-hidden z-20">
      {/* Top Cusped Arch Silhouette Overlay */}
      <div className="absolute inset-x-2 top-2 h-28 pointer-events-none opacity-90">
        <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M 10 120 L 10 70 C 10 30, 60 10, 110 10 C 145 10, 165 24, 180 36 C 190 26, 195 18, 200 8 C 205 18, 210 26, 220 36 C 235 24, 255 10, 290 10 C 340 10, 390 30, 390 70 L 390 120"
            fill="none"
            stroke="#d4af37"
            strokeWidth="2.5"
            strokeDasharray="6,4"
          />
        </svg>
      </div>

      {/* TOP HEADER: Store branding & Discount Medallion */}
      <div className="relative pt-6 px-4 flex items-start justify-between">
        {/* Top-Left Hanging Lantern */}
        <div className="flex-shrink-0 -mt-2 -ml-1">
          <LanternGraphic size={44} />
        </div>

        {/* Top-Center Store Brand Header */}
        <div className="flex-1 flex flex-col items-center justify-center px-2 text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-1.5 mb-0.5">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-400 fill-current">
              <path d="M12 2C8 6 4 10 4 15C4 18.5 7 21 12 21C17 21 20 18.5 20 15C20 10 16 6 12 2ZM12 19C8.5 19 6 16.5 6 14C6 11 9 8 12 4.5C15 8 18 11 18 14C18 16.5 15.5 19 12 19Z" />
              <path d="M12 5V18" stroke="#0e0217" strokeWidth="1" />
            </svg>
            <h1 className="font-serif text-lg md:text-xl font-bold tracking-wider gold-gradient-text">
              {shopName}
            </h1>
          </div>
          <p className="text-[8px] md:text-[9px] font-sans tracking-[0.25em] text-[#fae7b4]/90 uppercase font-medium">
            {shopTagline}
          </p>

          {/* Customer Personalization Greeting */}
          {customerName && (
            <div className="mt-1 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-gold-500/40">
              <span className="text-[10px] text-champagne font-medium">
                Festive greeting for <strong className="text-gold-300">{customerName}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Top-Right Discount Rosette Medallion */}
        <div className="flex-shrink-0 -mt-2 -mr-1">
          <DiscountMedallion discount={discount} />
        </div>
      </div>

      {/* FRAME-SPECIFIC CORNERS & BORDERS */}
      {/* 1. Frame: Royal Palace Burgundy */}
      {currentFrame.id === "frame-1" && (
        <>
          <div className="px-6 -mt-3">
            <MarigoldGarland count={7} orientation="horizontal" />
          </div>
          <div className="absolute left-1 top-24 bottom-24 flex flex-col justify-around">
            <MarigoldGarland count={6} orientation="vertical" />
          </div>
          <div className="absolute right-1 top-24 bottom-24 flex flex-col justify-around">
            <MarigoldGarland count={6} orientation="vertical" />
          </div>
        </>
      )}

      {/* 2. Frame: Imperial Maroon & Arch */}
      {currentFrame.id === "frame-2" && (
        <>
          <div className="absolute inset-x-3 top-20 border-t-2 border-gold-400/60 flex items-center justify-center">
            <div className="w-16 h-4 -top-2 relative border-b-2 border-gold-400/80 rounded-b-full"></div>
          </div>
          <div className="absolute left-2 top-1/3">
            <LanternGraphic size={36} />
          </div>
          <div className="absolute right-2 top-1/3">
            <LanternGraphic size={36} />
          </div>
        </>
      )}

      {/* 3. Frame: Traditional Marigold Urli */}
      {currentFrame.id === "frame-3" && (
        <>
          <div className="absolute inset-x-2 top-16">
            <MarigoldGarland count={8} orientation="horizontal" />
          </div>
          <div className="absolute left-1 top-28 bottom-20">
            <MarigoldGarland count={6} orientation="vertical" />
          </div>
          <div className="absolute right-1 top-28 bottom-20">
            <MarigoldGarland count={6} orientation="vertical" />
          </div>
        </>
      )}

      {/* 4. Frame: Champagne Ivory Luxury */}
      {currentFrame.id === "frame-4" && (
        <div className="absolute inset-3 border border-gold-400/50 rounded-2xl pointer-events-none">
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-gold-300"></div>
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-gold-300"></div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-gold-300"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-gold-300"></div>
        </div>
      )}

      {/* 5. Frame: Midnight Noir & 24K Gold */}
      {currentFrame.id === "frame-5" && (
        <div className="absolute inset-2 border-2 border-gold-500/70 rounded-xl shadow-[inset_0_0_20px_rgba(212,175,55,0.4)]">
          <div className="absolute top-2 left-2 text-gold-400 text-xs">✦</div>
          <div className="absolute top-2 right-2 text-gold-400 text-xs">✦</div>
          <div className="absolute bottom-2 left-2 text-gold-400 text-xs">✦</div>
          <div className="absolute bottom-2 right-2 text-gold-400 text-xs">✦</div>
        </div>
      )}

      {/* 6. Frame: Palace Lotus & Magenta */}
      {currentFrame.id === "frame-6" && (
        <>
          <div className="absolute inset-x-4 top-16">
            <MarigoldGarland count={7} orientation="horizontal" />
          </div>
          <div className="absolute left-2 bottom-20">
            <div className="text-pink-300 text-2xl filter drop-shadow">🌸</div>
          </div>
          <div className="absolute right-2 bottom-20">
            <div className="text-pink-300 text-2xl filter drop-shadow">🌸</div>
          </div>
        </>
      )}

      {/* 7. Frame: Golden Starlight Glamour */}
      {currentFrame.id === "frame-7" && (
        <div className="absolute inset-x-0 top-16 flex justify-around opacity-90">
          <span className="text-gold-200 animate-pulse text-sm">✨</span>
          <span className="text-gold-300 animate-pulse text-base delay-75">✨</span>
          <span className="text-gold-200 animate-pulse text-sm delay-150">✨</span>
          <span className="text-gold-300 animate-pulse text-base delay-300">✨</span>
        </div>
      )}

      {/* 8. Frame: Festive Amber Celebration */}
      {currentFrame.id === "frame-8" && (
        <div className="absolute inset-x-4 bottom-24 flex justify-between px-2">
          <DiyaGraphic size={36} />
          <DiyaGraphic size={36} />
        </div>
      )}

      {/* CENTER WATERMARK: Delicate cursive "Capture your moment" flourish */}
      <div className="flex flex-col items-center justify-center my-auto opacity-80">
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-gold-400/80 to-transparent" />
          <span className="font-festive italic text-xs tracking-wider text-gold-200/90 font-serif drop-shadow-md">
            Capture your moment
          </span>
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-gold-400/80 to-transparent" />
        </div>
      </div>

      {/* BOTTOM BASE: Ornate Diyas & Glow */}
      <div className="relative pb-24 px-4 flex items-end justify-between">
        <div className="flex-shrink-0 -mb-2">
          <DiyaGraphic size={44} />
        </div>

        <div className="flex-1 px-2 mb-1">
          <MarigoldGarland count={5} orientation="horizontal" />
        </div>

        <div className="flex-shrink-0 -mb-2">
          <DiyaGraphic size={44} />
        </div>
      </div>
    </div>
  );
}

// Canvas Photo Composition: Combines Camera Photo + Selected Frame + Branding + Customer Name + Discount Medallion
export async function composeBrandedPhoto({
  imageElement,
  frameId = "frame-1",
  customerName = "Guest",
  shopConfig = {},
  discount = "FLAT 30% OFF",
}) {
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1440; // 3:4 portrait aspect ratio
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // 1. Draw customer photo
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
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, "#4a0b25");
    grad.addColorStop(0.5, "#300618");
    grad.addColorStop(1, "#1c030d");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Draw Frame Vignette in Royal Burgundy
  const frameGradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    width * 0.35,
    width / 2,
    height / 2,
    width * 0.75
  );
  frameGradient.addColorStop(0, "rgba(0,0,0,0)");
  frameGradient.addColorStop(0.7, "rgba(40, 5, 20, 0.45)");
  frameGradient.addColorStop(1, "rgba(25, 2, 12, 0.96)");
  ctx.fillStyle = frameGradient;
  ctx.fillRect(0, 0, width, height);

  // 3. Draw Ornate Outer Gold Border with Corner Arches
  ctx.save();
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  ctx.strokeStyle = "rgba(255, 247, 214, 0.85)";
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // Corner Ornaments
  const cornerSize = 85;
  ctx.beginPath();
  ctx.moveTo(30, 30 + cornerSize);
  ctx.lineTo(30 + cornerSize, 30);
  ctx.moveTo(width - 30 - cornerSize, 30);
  ctx.lineTo(width - 30, 30 + cornerSize);
  ctx.moveTo(30, height - 30 - cornerSize);
  ctx.lineTo(30 + cornerSize, height - 30);
  ctx.moveTo(width - 30 - cornerSize, height - 30);
  ctx.lineTo(width - 30, height - 30 - cornerSize);
  ctx.stroke();
  ctx.restore();

  // 4. Draw Header Store Branding
  const shopName = shopConfig.shopName || "Dream Salon";
  const shopTagline = shopConfig.shopTagline || "BEAUTY · STYLE · CONFIDENCE";

  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = 14;

  ctx.font = "bold 46px 'Cinzel', serif";
  ctx.fillStyle = "#fae3b3";
  ctx.fillText(shopName, width / 2, 110);

  ctx.font = "600 18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#f5c518";
  ctx.fillText(shopTagline, width / 2, 145);

  ctx.font = "italic 32px 'Playfair Display', serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`Happy Diwali, ${customerName || "Valued Guest"}!`, width / 2, 195);
  ctx.restore();

  // 5. Draw Top-Right Rosette Medallion
  const medX = width - 160;
  const medY = 140;
  const medRadius = 85;

  ctx.save();
  ctx.shadowColor = "rgba(212, 175, 55, 0.85)";
  ctx.shadowBlur = 25;

  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    ctx.beginPath();
    ctx.arc(
      medX + Math.cos(angle) * (medRadius - 10),
      medY + Math.sin(angle) * (medRadius - 10),
      22,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "#d4af37";
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(medX, medY, medRadius - 15, 0, Math.PI * 2);
  ctx.fillStyle = "#38061c";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ffd700";
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#fae7b4";
  ctx.font = "bold 16px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("FLAT", medX, medY - 26);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 42px 'Cinzel', serif";
  ctx.fillText("30%", medX, medY + 12);

  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("OFF", medX, medY + 36);
  ctx.restore();

  // 6. Draw Bottom Watermark & Verification Seal
  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 235, 170, 0.95)";
  ctx.font = "italic 26px 'Playfair Display', serif";
  ctx.fillText("~ Capture your moment ~", width / 2, height - 90);

  ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText("Official Diwali Campaign • Share on Story to unlock discount pass", width / 2, height - 60);
  ctx.restore();

  return canvas.toDataURL("image/jpeg", 0.93);
}
