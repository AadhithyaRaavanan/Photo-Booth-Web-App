'use client';

import React from 'react';

/**
 * Royal Authentic Indian Festive Frame
 * Uses the exact royal artwork frame with transparent center arch opening
 * for live camera preview and high-resolution Canvas composition.
 */
export default function RoyalMasterFrame({
  shopConfig = {},
  customerName = "",
  discount = "FLAT 30% OFF",
}) {
  const shopName = shopConfig.shopName || "Dream Salon";
  const shopTagline = shopConfig.shopTagline || "BEAUTY · STYLE · CONFIDENCE";

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. THE USER'S AUTHENTIC ROYAL FRAME IMAGE OVERLAY (Transparent Center) */}
      <img
        src="/frames/royal_festive_frame.png?v=3"
        alt="Festive Royal Frame"
        onError={(e) => {
          if (!e.currentTarget.dataset.retried) {
            e.currentTarget.dataset.retried = 'true';
            e.currentTarget.src = `/frames/royal_festive_frame.png?t=${Date.now()}`;
          }
        }}
        className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
      />

      {/* 2. TOP BRAND HEADER: Clean, non-colliding typography on the upper purple arch */}
      <div className="relative pt-2.5 sm:pt-3 px-3 text-center z-30 flex flex-col items-center">
        <div className="inline-flex flex-col items-center justify-center px-3.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-amber-400/50 shadow-md max-w-[70%]">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-300 text-[11px]">🪔</span>
            <h2 className="font-serif text-xs sm:text-sm font-black gold-gradient-text tracking-widest uppercase truncate">
              {shopName}
            </h2>
          </div>
          <span className="text-[7px] sm:text-[7.5px] font-sans tracking-[0.2em] text-[#fae7b4]/80 uppercase font-medium">
            {shopTagline}
          </span>

          {customerName && (
            <div className="mt-0.5 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30">
              <span className="text-[8.5px] text-amber-200 font-semibold truncate block max-w-[180px]">
                Happy Diwali, {customerName}! ✨
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3. TOP-RIGHT SCALLOPED GOLD ROSETTE MEDALLION ("FLAT 30% OFF") */}
      <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-30 pointer-events-none">
        <div className="relative flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(255,215,0,0.7)] scale-75 sm:scale-85 origin-top-right">
          <svg viewBox="0 0 100 100" className="w-16 h-16 animate-pulse-slow">
            <defs>
              <radialGradient id="royalFestiveMed" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff7d6" />
                <stop offset="40%" stopColor="#f5c518" />
                <stop offset="75%" stopColor="#b8860b" />
                <stop offset="100%" stopColor="#634503" />
              </radialGradient>
            </defs>

            {/* 16 scalloped petals */}
            <g transform="translate(50,50)">
              {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
                <path
                  key={angle}
                  d="M 0 -45 Q 5 -38 0 -30 Q -5 -38 0 -45 Z"
                  fill="url(#royalFestiveMed)"
                  stroke="#ffd700"
                  strokeWidth="0.8"
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>

            <circle cx="50" cy="50" r="34" fill="#3b081e" stroke="#d4af37" strokeWidth="2" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#ffd700" strokeWidth="0.8" strokeDasharray="2,2" />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
            <span className="text-[7px] font-bold tracking-widest text-[#fae7b4] uppercase">FLAT</span>
            <span className="text-[14px] font-black font-serif text-white drop-shadow">30%</span>
            <span className="text-[7px] font-bold tracking-widest text-[#ffd700] uppercase">OFF</span>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM WATERMARK BADGE */}
      <div className="relative pb-24 text-center z-30">
        <div className="inline-block px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-amber-400/40 shadow-sm">
          <span className="text-[9px] font-serif font-bold text-amber-200 tracking-wider uppercase">
            Diwali Moments • {shopName}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 1:1 High-Resolution Canvas Photo Composition
 * Combines Customer Photo + The User's Transparent Royal Frame + Store Branding + 30% OFF Medallion
 */
export async function composeRoyalMasterPhoto({
  imageElement,
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

  // 2. Load and overlay the transparent royal frame PNG
  await new Promise((resolve) => {
    const frameImg = new Image();
    frameImg.onload = () => {
      ctx.drawImage(frameImg, 0, 0, width, height);
      resolve();
    };
    frameImg.onerror = () => {
      console.warn("Could not load frame overlay image, skipping overlay");
      resolve();
    };
    frameImg.src = "/frames/royal_festive_frame.png?v=3";
  });

  // 3. Draw Store Branding Banner at Top Center
  const shopName = shopConfig.shopName || "Dream Salon";
  const shopTagline = shopConfig.shopTagline || "BEAUTY · STYLE · CONFIDENCE";

  ctx.save();
  ctx.textAlign = "center";

  // Banner background pill
  ctx.fillStyle = "rgba(42, 5, 21, 0.9)";
  ctx.beginPath();
  ctx.roundRect(width / 2 - 280, 35, 560, 115, 24);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#d4af37";
  ctx.stroke();

  // Store Title
  ctx.font = "bold 44px 'Cinzel', serif";
  ctx.fillStyle = "#fae3b3";
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = 12;
  ctx.fillText(shopName, width / 2, 88);

  // Store Tagline
  ctx.font = "600 16px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#f5c518";
  ctx.letterSpacing = "3px";
  ctx.fillText(shopTagline, width / 2, 122);

  // Personalized Greeting
  ctx.font = "italic 30px 'Playfair Display', serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`Happy Diwali, ${customerName || "Valued Guest"}!`, width / 2, 195);
  ctx.restore();

  // 4. Draw Top-Right Rosette Medallion ("FLAT 30% OFF")
  const medX = width - 145;
  const medY = 135;
  const medRadius = 80;

  ctx.save();
  ctx.shadowColor = "rgba(212, 175, 55, 0.85)";
  ctx.shadowBlur = 24;

  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    ctx.beginPath();
    ctx.arc(
      medX + Math.cos(angle) * (medRadius - 10),
      medY + Math.sin(angle) * (medRadius - 10),
      20,
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
  ctx.font = "bold 15px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("FLAT", medX, medY - 24);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 40px 'Cinzel', serif";
  ctx.fillText("30%", medX, medY + 12);

  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 16px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("OFF", medX, medY + 34);
  ctx.restore();

  // 5. Draw Bottom Watermark Footer
  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(42, 5, 21, 0.85)";
  ctx.beginPath();
  ctx.roundRect(width / 2 - 240, height - 70, 480, 44, 22);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#d4af37";
  ctx.stroke();

  ctx.fillStyle = "#fae3b3";
  ctx.font = "italic 18px 'Playfair Display', serif";
  ctx.fillText(`Diwali Celebration • ${shopName}`, width / 2, height - 42);
  ctx.restore();

  return canvas.toDataURL("image/jpeg", 0.95);
}
