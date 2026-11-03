'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Check,
  Loader2,
  Smartphone,
  Square,
  Maximize2,
  Camera,
  Monitor,
  Pin,
  Sparkles,
  Layers,
  Share2
} from 'lucide-react';
import { SOCIAL_PRESETS } from './socialMediaFormats';
import { composeRoyalMasterPhoto } from './RoyalMasterFrame';

const ICON_MAP = {
  'instagram-story': Smartphone,
  'whatsapp-status': Smartphone,
  'instagram-portrait': Maximize2,
  'facebook-square': Square,
  'photobooth-classic': Camera,
  'facebook-landscape': Monitor,
  'pinterest-pin': Pin,
};

const PLATFORM_COLORS = {
  'instagram-story': 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
  'whatsapp-status': 'from-[#25d366] to-[#128c7e]',
  'instagram-portrait': 'from-[#e1306c] to-[#fd1d1d]',
  'facebook-square': 'from-[#1877f2] to-[#0d59c4]',
  'photobooth-classic': 'from-[#e60067] via-[#ff3b30] to-[#ff9500]',
  'facebook-landscape': 'from-[#1877f2] via-[#00c6ff] to-[#0072ff]',
  'pinterest-pin': 'from-[#e60023] to-[#bd081c]',
};

export default function OtherMediaModal({
  isOpen,
  onClose,
  rawPhoto,
  customerName = 'Valued Guest',
  shopConfig = {},
  selectedFrameId = 'frame-1',
  discount = 'FLAT 30% OFF',
}) {
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadedId, setDownloadedId] = useState(null);
  const [previewPreset, setPreviewPreset] = useState(SOCIAL_PRESETS[0]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // Generate and download image in the chosen format
  const handleDownloadFormat = async (preset) => {
    if (!rawPhoto) {
      alert('Photo is missing. Please capture a photo first.');
      return;
    }

    try {
      setDownloadingId(preset.id);

      // Create an image element from rawPhoto
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = rawPhoto;
      });

      // Compose in target dimensions
      const finalUrl = await composeRoyalMasterPhoto({
        imageElement: img,
        customerName: customerName || 'Valued Guest',
        shopConfig: shopConfig,
        discount: discount,
        selectedFrameId: selectedFrameId,
        targetWidth: preset.width,
        targetHeight: preset.height,
        formatId: preset.id,
      });

      // Trigger download
      const cleanShop = (shopConfig.shopName || 'Dream_Salon').replace(/\s+/g, '_');
      const cleanCustomer = (customerName || 'Diwali').replace(/\s+/g, '_');
      const filename = `${cleanShop}_${preset.name.replace(/[^a-zA-Z0-9]/g, '_')}_${cleanCustomer}.jpg`;

      const link = document.createElement('a');
      link.href = finalUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadedId(preset.id);
      setTimeout(() => setDownloadedId(null), 3000);
    } catch (err) {
      console.error('Error generating format:', err);
      alert('Could not generate this format. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  // Preview chosen format inside modal
  const handlePreviewFormat = async (preset) => {
    setPreviewPreset(preset);
    if (!rawPhoto) return;

    try {
      setIsPreviewLoading(true);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = rawPhoto;
      });

      const url = await composeRoyalMasterPhoto({
        imageElement: img,
        customerName: customerName || 'Valued Guest',
        shopConfig: shopConfig,
        discount: discount,
        selectedFrameId: selectedFrameId,
        targetWidth: preset.width,
        targetHeight: preset.height,
        formatId: preset.id,
      });
      setPreviewUrl(url);
    } catch (e) {
      console.warn('Preview generation error:', e);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="relative w-full max-w-4xl bg-gradient-to-b from-[#240217] via-[#1a0110] to-[#0d0008] border-2 border-amber-400/60 rounded-3xl shadow-[0_0_60px_rgba(255,215,0,0.35)] overflow-hidden flex flex-col my-auto max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-amber-400/20 bg-black/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#e60067] via-[#ff3b30] to-[#ff9500] flex items-center justify-center shadow-md">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>Other Media Formats</span>
                  <span className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    Social Master Guide
                  </span>
                </h3>
                <p className="text-xs text-champagne/70">
                  Auto-resize and download your festive portrait for Instagram, WhatsApp, Facebook, and more!
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-champagne/80 hover:text-white transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {SOCIAL_PRESETS.map((preset) => {
                const IconComponent = ICON_MAP[preset.id] || Share2;
                const gradientClass = PLATFORM_COLORS[preset.id] || 'from-[#e60067] to-[#ff9500]';
                const isDownloading = downloadingId === preset.id;
                const isDownloaded = downloadedId === preset.id;
                const isSelected = previewPreset?.id === preset.id;

                return (
                  <div
                    key={preset.id}
                    className={`relative p-4 rounded-2xl border transition flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#3d0628]/80 border-amber-400 shadow-[0_0_20px_rgba(255,215,0,0.25)]'
                        : 'bg-[#2a041c]/60 hover:bg-[#320522]/70 border-amber-400/25'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${gradientClass} flex items-center justify-center text-white shrink-0 shadow-md`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-sans font-bold text-sm text-white">{preset.name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-400/15 text-amber-300 border border-amber-400/30">
                              {preset.aspect}
                            </span>
                          </div>
                          <span className="text-[11px] text-champagne/70 font-medium block">
                            {preset.platform}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-bold text-amber-300/80 bg-black/40 px-2 py-1 rounded-md border border-white/10 shrink-0">
                        {preset.width} × {preset.height} px
                      </span>
                    </div>

                    <p className="text-xs text-champagne/60 leading-relaxed">{preset.desc}</p>

                    <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                      <button
                        onClick={() => handleDownloadFormat(preset)}
                        disabled={isDownloading}
                        className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-md active:scale-[0.98] ${
                          isDownloaded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gradient-to-r from-[#e60067] via-[#ff3b30] to-[#ff9500] hover:brightness-110 text-white'
                        }`}
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Resizing &amp; Downloading...</span>
                          </>
                        ) : isDownloaded ? (
                          <>
                            <Check className="w-4 h-4 text-white stroke-[3]" />
                            <span>Downloaded!</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Download ({preset.aspect})</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handlePreviewFormat(preset)}
                        className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-champagne/80 hover:text-white text-xs font-semibold border border-white/10 transition"
                        title="Preview format layout"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Optional Interactive Preview Strip */}
            {previewUrl && (
              <div className="mt-4 p-4 rounded-2xl bg-black/50 border border-amber-400/40 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-28 h-36 rounded-xl overflow-hidden border border-amber-400/60 shrink-0 bg-black flex items-center justify-center">
                  {isPreviewLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Format Preview"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-amber-300 block">
                    Current Preview: {previewPreset?.name} ({previewPreset?.aspect})
                  </span>
                  <p className="text-xs text-champagne/70 mt-0.5">
                    Rendered at exact {previewPreset?.width} × {previewPreset?.height} px resolution with festive Diwali framing, top-right 30% seal, and "Share &amp; Get Offer" callout!
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadFormat(previewPreset)}
                  className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center gap-2 shadow-lg shrink-0 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Preview</span>
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3.5 border-t border-amber-400/20 bg-black/40">
            <span className="text-[11px] text-champagne/60">
              💡 Tip: Instagram Stories &amp; WhatsApp Status use 9:16 (1080×1920) for full-screen impact.
            </span>
            <button
              onClick={onClose}
              className="py-1.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
