'use client';

import React from 'react';

/**
 * Royal Authentic Indian Festive Frame
 * Uses the exact royal artwork frame with transparent center arch opening
 * for live camera preview and high-resolution Canvas composition.
 * 
 * Brand Name and FLAT 30% OFF Medallion are styled extra bold and prominent
 * to immediately command attention as the primary focal points.
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

      {/* 2. TOP BRAND HEADER: Prominent, Grand Store Branding Pill */}
      <div className="relative pt-2 sm:pt-3 px-2 sm:px-3 text-center z-30 flex flex-col items-center">
        <div className="inline-flex flex-col items-center justify-center px-4 sm:px-6 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-b from-[#2e051a]/95 via-[#1a020e]/95 to-[#2e051a]/95 backdrop-blur-md border-2 border-amber-400/80 shadow-[0_8px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(255,215,0,0.4)] max-w-[76%] sm:max-w-[80%]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-amber-300 text-sm sm:text-base animate-pulse">🪔</span>
            <h2 className="font-serif text-sm sm:text-lg md:text-xl font-black gold-gradient-text tracking-[0.22em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] truncate">
              {shopName}
            </h2>
          </div>
          <span className="text-[7.5px] sm:text-[9.5px] font-sans tracking-[0.25em] text-[#fae7b4] uppercase font-bold mt-0.5">
            {shopTagline}
          </span>

          {customerName && (
            <div className="mt-1 px-3 py-0.5 rounded-full bg-amber-500/25 border border-amber-400/50 shadow-inner">
              <span className="text-[9.5px] sm:text-[11px] text-amber-200 font-bold truncate block max-w-[200px]">
                Happy Diwali, {customerName}! ✨
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3. TOP-RIGHT SCALLOPED GOLD ROSETTE MEDALLION: Extra Large & Commanding */}
      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-30 pointer-events-none">
        <div className="relative flex items-center justify-center filter drop-shadow-[0_6px_18px_rgba(255,215,0,0.85)] scale-95 sm:scale-115 origin-top-right">
          <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-22 sm:h-22 animate-pulse-slow">
            <defs>
              <radialGradient id="royalFestiveMed" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff9e6" />
                <stop offset="35%" stopColor="#f5c518" />
                <stop offset="70%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#7a5405" />
              </radialGradient>
            </defs>

            {/* 16 scalloped 24K gold petals */}
            <g transform="translate(50,50)">
              {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
                <path
                  key={angle}
                  d="M 0 -47 Q 6 -40 0 -31 Q -6 -40 0 -47 Z"
                  fill="url(#royalFestiveMed)"
                  stroke="#ffd700"
                  strokeWidth="1"
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>

            {/* Central deep royal maroon medallion disc */}
            <circle cx="50" cy="50" r="35" fill="#3b081e" stroke="#d4af37" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="31" fill="none" stroke="#ffd700" strokeWidth="1" strokeDasharray="3,2" />
          </svg>

          {/* Bold, prominent offer text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
            <span className="text-[8px] sm:text-[9px] font-black tracking-[0.18em] text-[#fae7b4] uppercase drop-shadow">
              FLAT
            </span>
            <span className="text-[19px] sm:text-[22px] font-black font-serif text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] my-0.5">
              30%
            </span>
            <span className="text-[8px] sm:text-[9px] font-black tracking-[0.18em] text-[#ffd700] uppercase drop-shadow">
              OFF
            </span>
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

  // 3. Draw Store Branding Banner at Top Center (Large & Prominent)
  const shopName = shopConfig.shopName || "Dream Salon";
  const shopTagline = shopConfig.shopTagline || "BEAUTY · STYLE · CONFIDENCE";

  ctx.save();
  ctx.textAlign = "center";

  // Banner background pill
  ctx.fillStyle = "rgba(42, 5, 21, 0.95)";
  ctx.beginPath();
  ctx.roundRect(width / 2 - 320, 32, 640, 130, 26);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ffd700";
  ctx.stroke();

  // Store Title (Extra Large & Bold)
  ctx.font = "900 54px 'Cinzel', serif";
  ctx.fillStyle = "#fff4d4";
  ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
  ctx.shadowBlur = 16;
  ctx.fillText(shopName, width / 2, 92);

  // Store Tagline
  ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#ffd54f";
  ctx.letterSpacing = "4px";
  ctx.fillText(shopTagline, width / 2, 132);

  // Personalized Greeting
  ctx.font = "italic bold 32px 'Playfair Display', serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`Happy Diwali, ${customerName || "Valued Guest"}! ✨`, width / 2, 210);
  ctx.restore();

  // 4. Draw Top-Right Scalloped Rosette Medallion ("FLAT 30% OFF" - Extra Large)
  const medX = width - 150;
  const medY = 145;
  const medRadius = 96;

  ctx.save();
  ctx.shadowColor = "rgba(255, 215, 0, 0.95)";
  ctx.shadowBlur = 30;

  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    ctx.beginPath();
    ctx.arc(
      medX + Math.cos(angle) * (medRadius - 10),
      medY + Math.sin(angle) * (medRadius - 10),
      24,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "#ffd700";
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(medX, medY, medRadius - 16, 0, Math.PI * 2);
  ctx.fillStyle = "#38061c";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#ffd700";
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#fae7b4";
  ctx.font = "900 18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("FLAT", medX, medY - 30);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 50px 'Cinzel', serif";
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = 10;
  ctx.fillText("30%", medX, medY + 16);

  ctx.fillStyle = "#ffd700";
  ctx.font = "900 18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("OFF", medX, medY + 44);
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
