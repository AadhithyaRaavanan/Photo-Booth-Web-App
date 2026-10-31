'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Download, X, Gift, Sparkles, Check } from 'lucide-react';
import { playChimeSound } from './AudioChime';

export default function CouponModal({
  isOpen,
  onClose,
  coupon = {},
  shopConfig = {},
}) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const shopName = shopConfig.shopName || "Dream Salon";
  const customerName = coupon.customerName || "Valued Guest";
  const discount = coupon.discount || "FLAT 30% OFF";
  const couponCode = coupon.couponCode || "DIWALI-VIP-9021";
  const validityDate = shopConfig.validityDate || "Nov 25, 2026";

  // Trigger celebration confetti & celebratory chime on modal open
  useEffect(() => {
    if (isOpen) {
      playChimeSound('celebrate');

      // Golden and festive color palette for confetti
      const goldColors = ['#f5c518', '#ffd700', '#d4af37', '#ff8c00', '#ffffff', '#fae3b3'];

      // Left blast
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.7 },
        colors: goldColors,
        zIndex: 9999,
      });

      // Right blast
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.7 },
        colors: goldColors,
        zIndex: 9999,
      });

      // Center shower after 250ms
      const timer = setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.5 },
          colors: goldColors,
          zIndex: 9999,
        });
      }, 250);

      // Prevent background scroll
      document.body.style.overflow = 'hidden';

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    playChimeSound('click');
    setTimeout(() => setCopied(false), 2500);
  };

  // Generate downloadable VIP Golden Coupon Card image via Canvas
  const handleDownloadCoupon = () => {
    setDownloading(true);
    playChimeSound('click');

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');

      // Luxury Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1000);
      bgGrad.addColorStop(0, '#200530');
      bgGrad.addColorStop(0.5, '#350a47');
      bgGrad.addColorStop(1, '#11021b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 800, 1000);

      // Gold Ornate Borders
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 8;
      ctx.strokeRect(30, 30, 740, 940);

      ctx.strokeStyle = '#fae3b3';
      ctx.lineWidth = 2;
      ctx.strokeRect(45, 45, 710, 910);

      // Store Title
      ctx.textAlign = 'center';
      ctx.font = 'bold 36px "Cinzel", serif';
      ctx.fillStyle = '#fae3b3';
      ctx.fillText(shopName.toUpperCase(), 400, 120);

      ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#f5c518';
      ctx.fillText('EXCLUSIVE FESTIVE REWARD PASS', 400, 155);

      // Verified Badge Pill
      ctx.fillStyle = '#1b5e20';
      ctx.beginPath();
      ctx.roundRect(280, 185, 240, 42, 21);
      ctx.fill();
      ctx.fillStyle = '#a7f3d0';
      ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('✓ VERIFIED STORY REWARD', 400, 212);

      // Discount Banner Card
      const cardGrad = ctx.createLinearGradient(100, 260, 700, 480);
      cardGrad.addColorStop(0, '#530e66');
      cardGrad.addColorStop(1, '#2c0738');
      ctx.fillStyle = cardGrad;
      ctx.beginPath();
      ctx.roundRect(80, 260, 640, 230, 24);
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#d4af37';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('OFFER UNLOCKED', 400, 315);

      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 64px "Cinzel", serif';
      ctx.shadowColor = 'rgba(255, 215, 0, 0.7)';
      ctx.shadowBlur = 18;
      ctx.fillText(discount, 400, 400);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#fae3b3';
      ctx.font = 'italic 18px "Playfair Display", serif';
      ctx.fillText(`Honoring our festive guest: ${customerName}`, 400, 445);

      // Coupon Code Box
      ctx.fillStyle = '#0f0217';
      ctx.beginPath();
      ctx.roundRect(140, 530, 520, 110, 16);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.strokeStyle = '#f5c518';
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#d4af37';
      ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('COUPON CODE (SHOW AT BILLING)', 400, 565);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px monospace';
      ctx.letterSpacing = '6px';
      ctx.fillText(couponCode, 400, 612);

      // Validity & Instructions
      ctx.fillStyle = '#fae3b3';
      ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`Valid through: ${validityDate}`, 400, 690);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.font = '15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`Present this pass at ${shopName} checkout to redeem.`, 400, 735);
      ctx.fillText('Single-use promotional campaign pass. Cannot be duplicated.', 400, 765);

      // Footer seal
      ctx.fillStyle = '#d4af37';
      ctx.font = 'italic 20px "Playfair Display", serif';
      ctx.fillText('✨ Thank You for Celebrating With Us ✨', 400, 860);

      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${shopName.replace(/\s+/g, '_')}_Coupon_${couponCode}.png`;
      a.click();
    } catch (e) {
      console.error('Download coupon error', e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* 1. Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* 2. Main Coupon Modal Card */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm sm:max-w-md mx-auto my-auto rounded-3xl overflow-hidden card-festive border-2 border-gold-500/80 shadow-[0_0_50px_rgba(212,175,55,0.45)] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 border border-gold-500/30 flex items-center justify-center text-champagne hover:text-white hover:bg-black/60 transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Accent Header Ribbon */}
            <div className="relative pt-8 pb-4 px-6 text-center overflow-hidden">
              {/* Background radial gold glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* 3D Animated Gift Box Illustration */}
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: [ -5, 5, -5 ], scale: [ 1, 1.05, 1 ] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative mx-auto w-20 h-20 mb-3 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-2xl filter blur-md opacity-40 animate-pulse" />
                <div className="relative w-18 h-18 p-3 rounded-2xl bg-gradient-to-b from-[#ffcf40] via-[#d4af37] to-[#8f6a19] shadow-lg flex items-center justify-center border border-gold-200">
                  <Gift className="w-10 h-10 text-festive-darkest fill-festive-darkest/10 drop-shadow" />
                </div>
                {/* Sparkle badge */}
                <div className="absolute -top-1 -right-1 text-gold-300 animate-bounce">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
              </motion.div>

              {/* Small Heading */}
              <p className="text-[11px] font-bold tracking-[0.25em] text-gold-400 uppercase font-sans mb-1">
                CONGRATULATIONS!
              </p>

              {/* Main Heading */}
              <h2 className="text-xl sm:text-2xl font-bold font-serif gold-gradient-text tracking-wide">
                YOUR FESTIVE GIFT IS UNLOCKED!
              </h2>

              {/* Verified Story Pill */}
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">
                  Verified Instagram Story
                </span>
              </div>
            </div>

            {/* Main Discount Display Box */}
            <div className="px-6 py-2">
              <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#3b0954]/90 to-[#1e032e]/90 border border-gold-400/50 text-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#fae3b3]">
                  EXCLUSIVE OFFER UNLOCKED
                </span>

                {/* Big Radiant Discount */}
                <div className="my-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]">
                    {discount}
                  </span>
                </div>

                <p className="text-xs text-champagne/80 font-medium">
                  Prepared with love for <strong className="text-gold-300">{customerName}</strong>
                </p>
              </div>
            </div>

            {/* Unique Coupon Code Ticket */}
            <div className="px-6 py-3">
              <div className="relative p-3.5 rounded-xl bg-black/50 border border-dashed border-gold-400/60 flex items-center justify-between gap-2">
                <div className="flex-1 text-left overflow-hidden">
                  <span className="block text-[9px] uppercase tracking-wider text-gold-400/80 font-semibold">
                    YOUR EXCLUSIVE COUPON CODE
                  </span>
                  <span className="block text-base sm:text-lg font-mono font-bold text-white tracking-widest truncate">
                    {couponCode}
                  </span>
                </div>

                {/* Copy button */}
                <button
                  onClick={handleCopyCode}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-gold-500 to-amber-500 text-black text-xs font-bold hover:brightness-110 active:scale-95 transition shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Redemption instructions */}
              <p className="mt-2 text-center text-[11px] text-champagne/70 leading-relaxed">
                Show this coupon code at <strong className="text-gold-300">{shopName}</strong> billing counter to redeem your discount.
              </p>
              <p className="text-center text-[10px] text-gold-400/80 mt-0.5">
                Valid until {validityDate}
              </p>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-6 pt-2 space-y-2.5">
              {/* Action 1: Download pass */}
              <button
                onClick={handleDownloadCoupon}
                disabled={downloading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 text-festive-darkest font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? "GENERATING PASS..." : "DOWNLOAD COUPON PASS"}</span>
              </button>

              {/* Action 2: Done */}
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-champagne text-xs font-semibold border border-white/10 transition"
              >
                DONE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

