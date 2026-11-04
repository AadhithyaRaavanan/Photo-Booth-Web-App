'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  RotateCcw,
  Sparkles,
  Share2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Gift,
  RefreshCw,
  Image as ImageIcon,
  Layers,
  Check,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import ExactDiwaliLanding from '@/components/ExactDiwaliLanding';
import EveningSkyFireworks from '@/components/EveningSkyFireworks';
import DiyaGraphic from '@/components/DiyaGraphic';
import RoyalMasterFrame, { composeRoyalMasterPhoto, ROYAL_FRAMES } from '@/components/RoyalMasterFrame';
import { playChimeSound } from '@/components/AudioChime';

// Code-splitting & Lazy Loading for heavy share/reward modals
const CouponModal = dynamic(() => import('@/components/CouponModal'), { ssr: false });
const OtherMediaModal = dynamic(() => import('@/components/OtherMediaModal'), { ssr: false });

export default function PhotoBoothApp() {
  // App navigation: 'landing' (Page 1) or 'camera' | 'preview' (Page 2: Photo Booth)
  const [step, setStep] = useState('landing');

  // Customer & Store info
  const [customerName, setCustomerName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [showOtherMediaModal, setShowOtherMediaModal] = useState(false);

  const [shopConfig, setShopConfig] = useState({
    shopName: process.env.NEXT_PUBLIC_SHOP_NAME || 'Dream Salon',
    shopTagline: process.env.NEXT_PUBLIC_SHOP_TAGLINE || 'BEAUTY · STYLE · CONFIDENCE',
    campaignHeadline: process.env.NEXT_PUBLIC_CAMPAIGN_HEADLINE || 'DIWALI PARTY',
    campaignSubtext:
      process.env.NEXT_PUBLIC_CAMPAIGN_SUBTEXT ||
      'Capture your festive moments and unlock an exclusive surprise.',
    defaultDiscount: process.env.NEXT_PUBLIC_DEFAULT_DISCOUNT || '30%',
    discountLabel: process.env.NEXT_PUBLIC_DISCOUNT_LABEL || 'FLAT 30% OFF',
    instagramTag: process.env.NEXT_PUBLIC_INSTAGRAM_TAG || '@DreamSalon',
    partnerTag: process.env.NEXT_PUBLIC_PARTNER_TAG || '@ZenXea',
    validityDate: process.env.NEXT_PUBLIC_VALIDITY_DATE || 'Nov 25, 2026',
    phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 98765 43210',
  });

  // Camera state
  const [facingMode, setFacingMode] = useState('user');
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isInitializingCamera, setIsInitializingCamera] = useState(false);
  const [isShutterActive, setIsShutterActive] = useState(false);
  const [hasVideoFrames, setHasVideoFrames] = useState(false);

  // Photos & Frame state
  const [selectedFrameId, setSelectedFrameId] = useState('frame-1');
  const [capturedRawPhoto, setCapturedRawPhoto] = useState(null);
  const [brandedPhotoUrl, setBrandedPhotoUrl] = useState(null);
  const [storyPhotoUrl, setStoryPhotoUrl] = useState(null);
  const [isComposing, setIsComposing] = useState(false);

  // Rewards & Modals state
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [showCouponModal, setShowCouponModal] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const nativeCameraInputRef = useRef(null);
  const hasTrackedVisitRef = useRef(false);

  // Fetch campaign config & track initial visitor on mount
  useEffect(() => {
    // 1. Automatically track QR code scan / page visit in Supabase
    if (!hasTrackedVisitRef.current) {
      hasTrackedVisitRef.current = true;
      fetch('/api/track-visit', { method: 'POST' }).catch((err) =>
        console.log('Visit tracking fallback', err)
      );
    }

    // 2. Fetch campaign config
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.config) {
          setShopConfig(data.config);
        }
      })
      .catch((err) => console.log('Using default shop config', err));

    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
      setHasVideoFrames(false);
    }
  };

  // Robust Camera Starter with Device Fallbacks
  const startCamera = async (mode = facingMode) => {
    setCameraError(null);
    setIsInitializingCamera(true);
    setHasVideoFrames(false);

    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera is not supported on this browser or requires HTTPS / localhost.');
      }

      // Stop previous stream
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }

      let stream = null;

      // 1. Optimized 720p 30fps camera preview for zero thermal lag on mobile devices
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: mode ? { ideal: mode } : 'user',
            width: { ideal: 1280, max: 1280 },
            height: { ideal: 720, max: 720 },
            frameRate: { ideal: 30, max: 30 },
          },
          audio: false,
        });
      } catch (e1) {
        console.warn('Resolution constraints failed, trying basic video:', e1);
        // 2. Try generic video
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      setCameraStream(stream);
      setIsCameraActive(true);
      setIsInitializingCamera(false);

      // Bind directly to video element if ready
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        video.setAttribute('autoplay', '');

        video.onloadeddata = () => {
          setHasVideoFrames(true);
        };
        video.onplaying = () => {
          setHasVideoFrames(true);
        };

        try {
          await video.play();
        } catch (playErr) {
          console.warn('Video auto-play error:', playErr);
        }
      }
    } catch (err) {
      console.warn('Camera startup warning:', err);
      let msg = 'Camera permission was denied or camera is unavailable.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = 'Camera access was blocked by the browser. Look for the camera icon in your address bar to Allow Camera access.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = 'No physical webcam detected on this device. You can use your phone camera or select a photo from your gallery.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        msg = 'Camera is currently in use by another application (Zoom, Teams, or another tab). Close it and tap Retry.';
      }
      setCameraError(msg);
      setIsCameraActive(false);
      setIsInitializingCamera(false);
      setHasVideoFrames(false);
    }
  };

  // Ensure video element always binds to cameraStream whenever either becomes available
  useEffect(() => {
    if (step === 'camera' && videoRef.current && cameraStream) {
      const video = videoRef.current;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');

      if (video.srcObject !== cameraStream) {
        video.srcObject = cameraStream;
      }

      video.onloadeddata = () => setHasVideoFrames(true);
      video.onplaying = () => setHasVideoFrames(true);

      video.play().catch((err) => {
        console.warn('Awaiting user gesture for video playback:', err);
      });
    }
  }, [step, cameraStream]);

  // When step changes to camera, automatically initialize stream if not already active
  useEffect(() => {
    if (step === 'camera' && !cameraStream && !isInitializingCamera) {
      startCamera(facingMode);
    }
  }, [step]);

  // Switch Camera (Front / Rear)
  const handleToggleCamera = () => {
    playChimeSound('click');
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  // Transition to Photo Booth (Page 2)
  const handleStartPhotoBooth = () => {
    playChimeSound('click');
    setNameInput(customerName || '');
    setShowNameModal(true);
  };

  const handleSaveNameAndProceed = (e) => {
    e?.preventDefault();
    const finalName = nameInput.trim() || 'Valued Guest';
    setCustomerName(finalName);
    setShowNameModal(false);
    setStep('camera');
    startCamera();
  };

  const handleSkipName = () => {
    setCustomerName('Valued Guest');
    setShowNameModal(false);
    setStep('camera');
    startCamera();
  };

  // Counting System: Record Photo Capture in Supabase & local store
  const trackPhotoCapture = (frameId = selectedFrameId) => {
    const frameName = ROYAL_FRAMES.find((f) => f.id === frameId)?.name || 'Twin Royal Peacocks';
    fetch('/api/track-photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: customerName || 'Valued Guest',
        frameId,
        frameName,
      }),
    }).catch((err) => console.log('Photo track network fallback', err));
  };

  // Counting System: Record Coupon Claim in Supabase & local store
  const trackCouponClaim = (platform = 'Instagram_Story') => {
    const cleanCustomer = (customerName || '').trim() || 'Valued Guest';
    const code =
      activeCoupon?.couponCode ||
      `DIWALI-${cleanCustomer.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase() || 'VIP'}-30`;

    fetch('/api/track-coupon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: cleanCustomer,
        couponCode: code,
        discount: shopConfig.discountLabel || 'FLAT 30% OFF',
        platform,
      }),
    }).catch((err) => console.log('Coupon track network fallback', err));
  };

  // Capture Photo
  const handleCapturePhoto = async () => {
    playChimeSound('shutter');
    setIsShutterActive(true);
    setTimeout(() => setIsShutterActive(false), 200);

    const video = videoRef.current;
    if (!video || !isCameraActive || video.readyState < 2) {
      if (!isCameraActive || !hasVideoFrames) {
        // Trigger native device camera or file picker if stream isn't ready
        nativeCameraInputRef.current?.click();
        return;
      }
      return;
    }

    setIsComposing(true);
    try {
      const capCanvas = document.createElement('canvas');
      capCanvas.width = video.videoWidth || 1280;
      capCanvas.height = video.videoHeight || 720;
      const ctx = capCanvas.getContext('2d');

      if (facingMode === 'user') {
        ctx.translate(capCanvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, capCanvas.width, capCanvas.height);
      const rawData = capCanvas.toDataURL('image/jpeg', 0.92);
      setCapturedRawPhoto(rawData);

      // Compose primary festive photo portrait
      const finalComposedUrl = await composeRoyalMasterPhoto({
        imageElement: capCanvas,
        customerName: customerName || 'Valued Guest',
        shopConfig: shopConfig,
        discount: 'FLAT 30% OFF',
        selectedFrameId: selectedFrameId,
        targetWidth: 1080,
        targetHeight: 1440,
      });

      // Story format (1080x1920) is lazily composed on-demand when user shares
      setBrandedPhotoUrl(finalComposedUrl);
      setStoryPhotoUrl(null);
      stopCameraStream();
      setStep('preview');
      trackPhotoCapture(selectedFrameId);
    } catch (e) {
      console.error('Error during photo capture composition', e);
    } finally {
      setIsComposing(false);
    }
  };

  // Fallback Gallery Photo Upload
  const handleFallbackPhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const img = new Image();
      img.onload = async () => {
        setIsComposing(true);
        const finalUrl = await composeRoyalMasterPhoto({
          imageElement: img,
          customerName: customerName || 'Valued Guest',
          shopConfig: shopConfig,
          discount: 'FLAT 30% OFF',
          selectedFrameId: selectedFrameId,
          targetWidth: 1080,
          targetHeight: 1440,
        });

        setCapturedRawPhoto(event.target.result);
        setBrandedPhotoUrl(finalUrl);
        setStoryPhotoUrl(null);
        stopCameraStream();
        setIsComposing(false);
        setStep('preview');
        trackPhotoCapture(selectedFrameId);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Instant Festive Demo Portrait Generator
  const handleUseDemoSelfie = async () => {
    playChimeSound('click');
    setIsComposing(true);

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1440;
    const ctx = canvas.getContext('2d');

    // Warm festive background
    const bgGrad = ctx.createRadialGradient(540, 600, 50, 540, 600, 700);
    bgGrad.addColorStop(0, '#75143a');
    bgGrad.addColorStop(0.5, '#4a0a24');
    bgGrad.addColorStop(1, '#230210');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1440);

    // Festive bokeh sparkles
    for (let i = 0; i < 40; i++) {
      const x = (i * 97) % 1080;
      const y = (i * 137) % 1440;
      const r = ((i % 5) + 3) * 6;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 215, 0, 0.18)' : 'rgba(255, 140, 0, 0.14)';
      ctx.fill();
    }

    // Traditional Silk Attire
    ctx.fillStyle = '#800020';
    ctx.beginPath();
    ctx.moveTo(250, 1440);
    ctx.quadraticCurveTo(540, 850, 830, 1440);
    ctx.fill();

    // Golden Zari border
    ctx.lineWidth = 18;
    ctx.strokeStyle = '#d4af37';
    ctx.stroke();

    // Neck
    ctx.fillStyle = '#dca67d';
    ctx.fillRect(490, 740, 100, 150);

    // Golden Royal Necklace
    ctx.beginPath();
    ctx.arc(540, 840, 90, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#ffd700';
    ctx.stroke();

    // Head/Face
    ctx.beginPath();
    ctx.ellipse(540, 620, 150, 190, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#e8b58d';
    ctx.fill();

    // Hair
    ctx.fillStyle = '#1a0d08';
    ctx.beginPath();
    ctx.arc(540, 580, 170, Math.PI, 0);
    ctx.fill();

    // Red Bindi
    ctx.beginPath();
    ctx.arc(540, 580, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#c62828';
    ctx.fill();

    // Smiling Eyes
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#2b1d16';
    ctx.beginPath();
    ctx.arc(480, 620, 24, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(600, 620, 24, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();

    // Warm Smile
    ctx.beginPath();
    ctx.arc(540, 690, 36, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#b71c1c';
    ctx.stroke();

    // Golden Jhumka Earrings
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(370, 670, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(710, 670, 14, 0, Math.PI * 2);
    ctx.fill();

    const sampleDataUrl = canvas.toDataURL('image/jpeg', 0.95);

    const finalUrl = await composeRoyalMasterPhoto({
      imageElement: canvas,
      customerName: customerName || 'Valued Guest',
      shopConfig: shopConfig,
      discount: 'FLAT 30% OFF',
      selectedFrameId: selectedFrameId,
      targetWidth: 1080,
      targetHeight: 1440,
    });

    const storyUrl = await composeRoyalMasterPhoto({
      imageElement: canvas,
      customerName: customerName || 'Valued Guest',
      shopConfig: shopConfig,
      discount: 'FLAT 30% OFF',
      selectedFrameId: selectedFrameId,
      targetWidth: 1080,
      targetHeight: 1920,
      formatId: 'instagram-story',
    });

    setCapturedRawPhoto(sampleDataUrl);
    setBrandedPhotoUrl(finalUrl);
    setStoryPhotoUrl(storyUrl);
    stopCameraStream();
    setIsComposing(false);
    setStep('preview');
    trackPhotoCapture(selectedFrameId);
  };

  // Download composed photo in standard portrait format (1080x1440)
  const handleDownloadPhoto = () => {
    if (!brandedPhotoUrl) return;
    playChimeSound('click');
    const cleanShop = (shopConfig.shopName || 'Dream_Salon').replace(/\s+/g, '_');
    const cleanCustomer = (customerName || 'Diwali').replace(/\s+/g, '_');
    const a = document.createElement('a');
    a.href = brandedPhotoUrl;
    a.download = `${cleanShop}_Festive_Photo_${cleanCustomer}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Ensure Story Photo URL (1080x1920) exists or generate on demand
  const getOrGenerateStoryPhoto = async () => {
    if (storyPhotoUrl) return storyPhotoUrl;
    if (capturedRawPhoto) {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          img.src = capturedRawPhoto;
        });
        const url = await composeRoyalMasterPhoto({
          imageElement: img,
          customerName: customerName || 'Valued Guest',
          shopConfig: shopConfig,
          discount: 'FLAT 30% OFF',
          selectedFrameId: selectedFrameId,
          targetWidth: 1080,
          targetHeight: 1920,
          formatId: 'instagram-story',
        });
        setStoryPhotoUrl(url);
        return url;
      } catch (e) {
        console.warn('Failed to generate story photo on demand:', e);
      }
    }
    return brandedPhotoUrl;
  };

  // Download exact 1080x1920 Story format matching the master guide
  const handleDownloadStoryFormat = async (platformLabel = 'Instagram_Story') => {
    const url = await getOrGenerateStoryPhoto();
    if (!url) return null;
    const cleanShop = (shopConfig.shopName || 'Dream_Salon').replace(/\s+/g, '_');
    const cleanCustomer = (customerName || 'Diwali').replace(/\s+/g, '_');
    const filename = `${cleanShop}_${platformLabel}_1080x1920_${cleanCustomer}.jpg`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    return { url, filename };
  };

  // Synchronously convert base64 Data URL to a File object
  // Crucial for iOS Safari & Android Chrome so user gesture activation is preserved for navigator.share()
  const convertPhotoToFile = (photoUrl, filename = 'Dream_Salon_Diwali_Story.jpg') => {
    if (!photoUrl) return null;
    if (typeof photoUrl === 'string' && photoUrl.startsWith('data:')) {
      try {
        const arr = photoUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        return new File([blob], filename, { type: mime, lastModified: Date.now() });
      } catch (err) {
        console.error('Synchronous convertPhotoToFile error:', err);
        return null;
      }
    }
    return null;
  };

  // Sharing Actions - Instagram (Exact 1080x1920 9:16 Story format)
  const handleShareInstagram = async () => {
    playChimeSound('click');

    if (!brandedPhotoUrl && !capturedRawPhoto) {
      alert('Please capture or choose a photo first!');
      return;
    }

    // 1. Download the exact 1080x1920 Story format file to device
    const downloadResult = await handleDownloadStoryFormat('Instagram_Story');
    const storyUrlToShare = downloadResult?.url || storyPhotoUrl || brandedPhotoUrl;
    const storyFilename = downloadResult?.filename || `${(shopConfig.shopName || 'Dream_Salon').replace(/\s+/g, '_')}_Instagram_Story_1080x1920.jpg`;

    const isMobile =
      typeof window !== 'undefined' &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 1 && window.innerWidth <= 1024));

    if (isMobile) {
      // 1. ON MOBILE: Convert 1080x1920 image to File object and invoke native Web Share API
      let file = convertPhotoToFile(storyUrlToShare, storyFilename);

      if (!file && storyUrlToShare) {
        try {
          const response = await fetch(storyUrlToShare);
          const blob = await response.blob();
          file = new File([blob], storyFilename, { type: 'image/jpeg', lastModified: Date.now() });
        } catch (fetchErr) {
          console.warn('File conversion fallback failed:', fetchErr);
        }
      }

      // Verify support using navigator.canShare()
      if (file && typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `Diwali with ${shopConfig.shopName}`,
            text: `Celebrating Diwali in style with ${shopConfig.shopName}! Tagging ${shopConfig.instagramTag} and ${shopConfig.partnerTag} to unlock an exclusive festive discount. 🪔✨`,
            files: [file],
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.warn('Native mobile share sheet error:', err);
          }
        }
      } else {
        // Fallback for older mobile browsers without Web Share Files support:
        window.location.href = 'instagram://camera';
        setTimeout(() => {
          window.location.href = 'instagram://app';
        }, 1200);
      }
    } else {
      // 2. ON PC: 1080x1920 Story format downloaded, redirect to instagram.com
      window.open('https://www.instagram.com', '_blank');
    }

    // Automatically trigger the 30% OFF Coupon Pass event right after download & share
    playChimeSound('celebrate');
    setShowCouponModal(true);
    trackCouponClaim('Instagram_Story');
  };

  // Sharing Actions - WhatsApp (Exact 1080x1920 9:16 Status format)
  const handleShareWhatsApp = async () => {
    playChimeSound('click');

    if (!brandedPhotoUrl && !capturedRawPhoto) {
      alert('Please capture or choose a photo first!');
      return;
    }

    // 1. Download the exact 1080x1920 Status format file to device
    const downloadResult = await handleDownloadStoryFormat('WhatsApp_Status');
    const statusUrlToShare = downloadResult?.url || storyPhotoUrl || brandedPhotoUrl;
    const statusFilename = downloadResult?.filename || `${(shopConfig.shopName || 'Dream_Salon').replace(/\s+/g, '_')}_WhatsApp_Status_1080x1920.jpg`;

    const isMobile =
      typeof window !== 'undefined' &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 1 && window.innerWidth <= 1024));

    const shareCaption = `Celebrating Diwali in style with ${shopConfig.shopName}! Tagging ${shopConfig.instagramTag} and ${shopConfig.partnerTag} to unlock an exclusive festive discount. 🪔✨`;
    const text = encodeURIComponent(shareCaption);

    if (isMobile) {
      let file = convertPhotoToFile(statusUrlToShare, statusFilename);

      if (!file && statusUrlToShare) {
        try {
          const response = await fetch(statusUrlToShare);
          const blob = await response.blob();
          file = new File([blob], statusFilename, { type: 'image/jpeg', lastModified: Date.now() });
        } catch (fetchErr) {
          console.warn('File conversion fallback failed:', fetchErr);
        }
      }

      if (file && typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `Diwali with ${shopConfig.shopName}`,
            text: shareCaption,
            files: [file],
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.warn('Native mobile share sheet error:', err);
          }
        }
      } else {
        // WhatsApp deep link fallback
        window.location.href = `whatsapp://send?text=${text}`;
        setTimeout(() => {
          window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
        }, 1000);
      }
    } else {
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    }

    // Automatically trigger the 30% OFF Coupon Pass event right after download & share
    playChimeSound('celebrate');
    setShowCouponModal(true);
    trackCouponClaim('WhatsApp_Status');
  };

  return (
    <>
      {/* =========================================================================
          GLOBAL EVENING SKY WITH BLINKING STARS & BURSTING FIREWORKS ANIMATION
          Applies seamlessly across the landing page and all photo booth stages
         ========================================================================= */}
      <EveningSkyFireworks />

      {/* =========================================================================
          PAGE 1: MODERN FESTIVE EVENING SKY LANDING PAGE
          Inspired directly by the user's reference illustration
         ========================================================================= */}
      {step === 'landing' ? (
        <ExactDiwaliLanding
          shopName={shopConfig.shopName}
          shopConfig={shopConfig}
          customerName={customerName}
          onEnterPhotoBooth={handleStartPhotoBooth}
          onOpenNameModal={() => {
            setNameInput(customerName || '');
            setShowNameModal(true);
          }}
        />
      ) : (
        /* =========================================================================
           PAGE 2: ROYAL FESTIVE PHOTO BOOTH & REWARDS FLOW (NO NAV BAR)
           Clean, focused camera & sharing experience with back-to-home navigation
           ========================================================================= */
        <div className="min-h-screen w-full bg-transparent text-[#f6ebdd] flex flex-col items-center justify-start relative overflow-x-hidden selection:bg-[#e8a33d]/30 selection:text-[#f6ebdd]">
          {/* Clean Top Header with Refined Boutique Back to Home */}
          <header className="w-full max-w-4xl mx-auto pt-4 sm:pt-6 pb-2 px-4 flex items-center justify-between relative z-30">
            <button
              onClick={() => {
                stopCameraStream();
                setStep('landing');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-[#e8a33d]/40 text-xs font-medium text-[#b5a8be] hover:text-[#f6ebdd] transition shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 text-[#e8a33d]" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center text-[#e8a33d]">
                <DiyaGraphic size={18} />
              </span>
              <span className="font-serif text-sm sm:text-base font-normal text-[#f6ebdd] tracking-wider">
                {shopConfig.shopName}
              </span>
              <span className="hidden sm:inline text-xs text-[#b5a8be] font-sans">
                Photo Booth
              </span>
            </div>

            {step === 'camera' ? (
              <button
                onClick={handleToggleCamera}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#e8a33d]/30 text-xs font-medium text-[#f6ebdd] transition"
                title="Switch Camera"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#e8a33d]" />
                <span className="hidden sm:inline">Flip Camera</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  playChimeSound('celebrate');
                  setShowCouponModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1a0828] border border-[#e8a33d]/50 text-xs font-medium text-[#e8a33d] hover:bg-[#e8a33d]/15 transition shadow-sm"
              >
                <Gift className="w-3.5 h-3.5 text-[#e8a33d]" />
                <span>30% OFF Pass</span>
              </button>
            )}
          </header>

          {/* Main Photo Booth Stage */}
          <main className="w-full flex-1 flex flex-col items-center justify-center py-2 px-3 sm:px-6 relative z-20">
            <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center">

              {/* ---------------------------------------------------------------
                  STAGE 2A: CAMERA CAPTURE (Live stream with transparent frame)
                 --------------------------------------------------------------- */}
              {step === 'camera' && (
                <div className="w-full flex flex-col items-center justify-center relative select-none py-1">
                  <AnimatePresence>
                    {isShutterActive && (
                      <motion.div
                        initial={{ opacity: 0.95 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-white z-50 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  {/* Mobile Quick Frame Switcher (Hidden on desktop) */}
                  <div className="md:hidden flex items-center justify-between w-full max-w-[380px] sm:max-w-[450px] mb-2 px-1">
                    <button
                      onClick={() => {
                        playChimeSound('click');
                        const currIdx = ROYAL_FRAMES.findIndex((f) => f.id === selectedFrameId);
                        const prevIdx = (currIdx - 1 + ROYAL_FRAMES.length) % ROYAL_FRAMES.length;
                        setSelectedFrameId(ROYAL_FRAMES[prevIdx].id);
                      }}
                      className="py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-[#b5a8be] hover:text-[#f6ebdd] hover:bg-white/10 flex items-center gap-1 text-[11px] font-medium transition"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Prev</span>
                    </button>

                    <button
                      onClick={() => {
                        playChimeSound('click');
                        const currIdx = ROYAL_FRAMES.findIndex((f) => f.id === selectedFrameId);
                        const nextIdx = (currIdx + 1) % ROYAL_FRAMES.length;
                        setSelectedFrameId(ROYAL_FRAMES[nextIdx].id);
                      }}
                      title="Tap to switch frame"
                      className="px-3.5 py-1.5 rounded-full bg-[#14051f]/90 border border-[#e8a33d]/40 shadow-sm text-[#f6ebdd] hover:border-[#e8a33d] flex items-center gap-2 text-xs font-serif transition active:scale-95"
                    >
                      <span className="truncate max-w-[130px]">
                        {ROYAL_FRAMES.find((f) => f.id === selectedFrameId)?.name}
                      </span>
                      <span className="text-[10px] text-[#e8a33d] font-mono">
                        {String(ROYAL_FRAMES.findIndex((f) => f.id === selectedFrameId) + 1).padStart(2, '0')} / 08
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        playChimeSound('click');
                        const currIdx = ROYAL_FRAMES.findIndex((f) => f.id === selectedFrameId);
                        const nextIdx = (currIdx + 1) % ROYAL_FRAMES.length;
                        setSelectedFrameId(ROYAL_FRAMES[nextIdx].id);
                      }}
                      className="py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-[#b5a8be] hover:text-[#f6ebdd] hover:bg-white/10 flex items-center gap-1 text-[11px] font-medium transition"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Main Studio Area: Camera Phone Card + Side Frames Panel */}
                  <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-6 lg:gap-8 relative select-none">
                    {/* Left Column: The Spacious, Wide Camera Card (Identical width & scaling to after-photo preview) */}
                    <div className="flex-1 max-w-[380px] sm:max-w-[450px] md:max-w-[470px] w-full flex flex-col items-center">
                      <div className="w-full rounded-3xl overflow-hidden relative shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-[#e8a33d]/40 bg-[#0d0414] flex flex-col justify-between">
                        {/* Camera Feed & Transparent Royal Festive Frame with Authentic 3:4 Aspect Ratio */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-950">
                          {/* 1. Live Video Element: ABSOLUTE INSET-0 to fill the frame completely */}
                          <video
                            ref={(el) => {
                              videoRef.current = el;
                              if (el && cameraStream && el.srcObject !== cameraStream) {
                                el.srcObject = cameraStream;
                                el.muted = true;
                                el.playsInline = true;
                                el.play().catch((err) => console.log('Callback ref play error:', err));
                              }
                            }}
                            autoPlay
                            playsInline
                            muted
                            onLoadedData={() => setHasVideoFrames(true)}
                            onPlaying={() => setHasVideoFrames(true)}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-0 ${
                              facingMode === 'user' ? 'scale-x-[-1]' : ''
                            } ${isCameraActive && hasVideoFrames ? 'opacity-100' : 'opacity-0'}`}
                          />

                          {/* 2. Loading State indicator */}
                          {isInitializingCamera && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 z-20 space-y-3">
                              <div className="w-10 h-10 rounded-full border-2 border-[#e8a33d] border-t-transparent animate-spin" />
                              <p className="text-xs text-[#f6ebdd] font-serif tracking-wider">
                                Starting Camera...
                              </p>
                            </div>
                          )}

                          {/* 3. Camera Access Card (Shown if camera is blocked/denied/busy/no frames) */}
                          {!isInitializingCamera && (!isCameraActive || !hasVideoFrames) && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-15 bg-[#14051f]/95 backdrop-blur-sm">
                              <div className="w-14 h-14 rounded-full bg-[#e8a33d]/10 border border-[#e8a33d]/35 flex items-center justify-center text-[#e8a33d] mb-3 shadow-lg">
                                <Camera className="w-7 h-7" />
                              </div>
                              <h3 className="font-serif text-lg font-normal text-[#f6ebdd] mb-1">
                                Camera Preview
                              </h3>
                              <p className="text-xs text-[#b5a8be] max-w-xs mb-4 leading-relaxed">
                                {cameraError || 'Allow camera access in your browser, or select an option below to snap your portrait:'}
                              </p>

                              <div className="flex flex-col gap-2.5 w-full max-w-[260px]">
                                <button
                                  onClick={() => nativeCameraInputRef.current?.click()}
                                  className="btn-primary-marigold w-full py-2.5 px-3 rounded-xl font-semibold text-xs tracking-wide shadow-md transition flex items-center justify-center gap-2"
                                >
                                  <Camera className="w-4 h-4" />
                                  <span>Take Photo With Camera</span>
                                </button>

                                <button
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#f6ebdd] font-medium text-xs transition border border-white/15 flex items-center justify-center gap-2"
                                >
                                  <ImageIcon className="w-4 h-4 text-[#e8a33d]" />
                                  <span>Choose From Gallery</span>
                                </button>

                                <button
                                  onClick={handleUseDemoSelfie}
                                  className="w-full py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#b5a8be] hover:text-[#f6ebdd] font-medium text-[11px] transition border border-white/10 flex items-center justify-center gap-1.5"
                                >
                                  <span>Sample Photo</span>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Hidden Native Camera & Gallery file inputs */}
                          <input
                            ref={nativeCameraInputRef}
                            type="file"
                            accept="image/*"
                            capture="user"
                            onChange={handleFallbackPhotoSelect}
                            className="hidden"
                          />
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFallbackPhotoSelect}
                            className="hidden"
                          />

                          {/* The Authentic Transparent Royal Scalloped Frame Overlay (Zero Text Collision) */}
                          <RoyalMasterFrame
                            shopConfig={shopConfig}
                            customerName={customerName}
                            discount="FLAT 30% OFF"
                            selectedFrameId={selectedFrameId}
                          />
                        </div>

                        {/* Bottom Control Deck (Minimal, Non-Overlapping Shutter) */}
                        <div className="relative z-30 pt-3 pb-5 px-6 bg-gradient-to-t from-black via-black/85 to-transparent flex items-center justify-between">
                          {/* Left: Gallery Picker */}
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md border border-[#e8a33d]/25 flex flex-col items-center justify-center text-[#f6ebdd] hover:bg-white/10 hover:border-[#e8a33d]/50 transition group"
                            title="Upload from Photo Gallery"
                          >
                            <ImageIcon className="w-5 h-5 text-[#e8a33d] group-hover:scale-105 transition" />
                            <span className="text-[8px] font-medium text-[#b5a8be] mt-0.5">Gallery</span>
                          </button>

                          {/* Center: Refined Gold Shutter Button */}
                          <motion.button
                            whileTap={{ scale: 0.94 }}
                            onClick={handleCapturePhoto}
                            disabled={isComposing}
                            className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-1.5 flex items-center justify-center ring-2 ring-[#f6ebdd]/40 bg-transparent focus:outline-none transition active:scale-95"
                            aria-label="Capture photo"
                          >
                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#e8a33d] to-[#f2c14e] shadow-[0_4px_16px_rgba(232,163,61,0.4)] flex items-center justify-center transition hover:brightness-105">
                              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-black/15" />
                            </div>
                          </motion.button>

                          {/* Right: Camera Flip */}
                          <button
                            onClick={handleToggleCamera}
                            className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md border border-[#e8a33d]/25 flex flex-col items-center justify-center text-[#f6ebdd] hover:bg-white/10 hover:border-[#e8a33d]/50 transition group"
                            title="Flip Camera"
                          >
                            <RotateCcw className="w-5 h-5 text-[#e8a33d] group-hover:rotate-180 transition duration-300" />
                            <span className="text-[8px] font-medium text-[#b5a8be] mt-0.5">Flip</span>
                          </button>
                        </div>
                      </div>

                      {/* Friendly Action Bar Under the Card */}
                      <div className="mt-3 flex items-center justify-center gap-2 w-full flex-wrap text-center">
                        <button
                          onClick={() => nativeCameraInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-[#b5a8be] hover:text-[#f6ebdd] hover:bg-white/10 flex items-center gap-1.5 transition"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#e8a33d]" />
                          <span>Camera</span>
                        </button>

                        <button
                          onClick={handleUseDemoSelfie}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-[#b5a8be] hover:text-[#f6ebdd] hover:bg-white/10 flex items-center gap-1.5 transition"
                        >
                          <span>Sample Photo</span>
                        </button>

                        <button
                          onClick={() => startCamera(facingMode)}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-[#b5a8be] hover:text-[#f6ebdd] hover:bg-white/10 flex items-center gap-1.5 transition"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-[#e8a33d]" />
                          <span>Reconnect</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Royal Frame Studio Side Panel (Desktop / Tablet) */}
                    <div className="hidden md:flex flex-col w-72 lg:w-80 h-[560px] sm:h-[600px] lg:h-[640px] max-h-[calc(100vh-140px)] rounded-3xl bg-[#14051f]/90 border border-[#e8a33d]/30 shadow-2xl p-4 overflow-hidden backdrop-blur-sm">
                      <div className="flex items-center justify-between pb-3 border-b border-[#e8a33d]/20 shrink-0">
                        <div>
                          <h3 className="font-serif text-sm sm:text-base font-semibold text-[#f6ebdd]">
                            Royal Frame Studio
                          </h3>
                          <p className="text-[10px] text-[#b5a8be] mt-0.5">
                            Select a handcrafted frame
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#e8a33d]/15 border border-[#e8a33d]/30 text-[10px] font-mono text-[#e8a33d]">
                          {String(ROYAL_FRAMES.findIndex((f) => f.id === selectedFrameId) + 1).padStart(2, '0')} / 08
                        </span>
                      </div>

                      {/* Scrollable Frame Cards List (Curated Catalogue Aesthetic) */}
                      <div className="flex-1 overflow-y-auto min-h-0 pr-1.5 py-3 space-y-2 boutique-scrollbar">
                        {ROYAL_FRAMES.map((f) => {
                          const isSelected = selectedFrameId === f.id;
                          return (
                            <button
                              key={f.id}
                              onClick={() => {
                                playChimeSound('click');
                                setSelectedFrameId(f.id);
                              }}
                              className={`w-full flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-200 text-left group ${
                                isSelected
                                  ? 'bg-[#e8a33d]/15 border border-[#e8a33d] shadow-[0_4px_16px_rgba(232,163,61,0.2)]'
                                  : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#e8a33d]/30'
                              }`}
                            >
                              {/* Lightweight WebP Thumbnail */}
                              <div className="relative w-12 h-16 rounded-xl overflow-hidden shrink-0 border border-[#e8a33d]/30 shadow-sm bg-black/40">
                                <picture className="w-full h-full">
                                  <source srcSet={f.thumb} type="image/webp" />
                                  <img
                                    src={f.thumbPng || f.thumb}
                                    alt={f.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                  />
                                </picture>
                                {isSelected && (
                                  <div className="absolute inset-0 bg-[#e8a33d]/20 flex items-center justify-center">
                                    <span className="w-4 h-4 rounded-full bg-[#e8a33d] text-[#14051f] flex items-center justify-center text-[9px] font-bold shadow-md">
                                      ✓
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <h4
                                  className={`text-xs font-serif font-medium truncate ${
                                    isSelected ? 'text-[#e8a33d]' : 'text-[#f6ebdd] group-hover:text-[#e8a33d]'
                                  }`}
                                >
                                  {f.name}
                                </h4>
                                <p className="text-[10px] text-[#b5a8be] line-clamp-1 mt-0.5 leading-snug">
                                  {f.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------------
                  STAGE 2B: FINAL FESTIVE PORTRAIT (SHARING & DOWNLOAD OPTIONS)
                  The app seamlessly culminates here with instant sharing & saving
                 --------------------------------------------------------------- */}
              {(step === 'preview' || step === 'share') && (
                <div className="w-full flex-1 flex flex-col justify-center py-2 sm:py-4">
                  <div className="text-center pb-4 max-w-2xl mx-auto px-3">
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#f6ebdd] tracking-tight">
                      Your Festive Portrait
                    </h2>

                    {/* Refined Gold-Underlined Tagging Instruction */}
                    <p className="text-xs sm:text-sm text-[#b5a8be] mt-2 leading-relaxed">
                      Tag <span className="text-[#f6ebdd] font-semibold underline decoration-[#e8a33d] underline-offset-4">{shopConfig.instagramTag}</span> and <span className="text-[#f6ebdd] font-semibold underline decoration-[#e8a33d] underline-offset-4">{shopConfig.partnerTag}</span> in your story to unlock your 30% OFF pass.
                    </p>
                  </div>

                  <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-6 lg:gap-8 my-auto">
                    {/* Left: The Framed Photo & Quick Action Bar */}
                    <div className="flex-1 max-w-[380px] sm:max-w-[450px] md:max-w-[470px] w-full flex flex-col items-center">
                      {brandedPhotoUrl ? (
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-full rounded-2xl overflow-hidden border border-[#e8a33d]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-1 bg-[#1a0828] relative group"
                        >
                          <img
                            src={brandedPhotoUrl}
                            alt="Festive Portrait"
                            className="w-full h-auto object-cover rounded-xl"
                          />
                        </motion.div>
                      ) : (
                        <div className="p-12 text-center text-xs text-[#b5a8be]">
                          Generating composition...
                        </div>
                      )}

                      {/* Instant Save & Retake Buttons right below the photo */}
                      <div className="grid grid-cols-2 gap-2.5 w-full mt-3">
                        <button
                          onClick={() => {
                            playChimeSound('click');
                            setStep('camera');
                            startCamera();
                          }}
                          className="py-3 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#f6ebdd] font-medium text-xs flex items-center justify-center gap-2 border border-white/15 transition active:scale-95 shadow-sm"
                        >
                          <RotateCcw className="w-4 h-4 text-[#e8a33d]" />
                          <span>RETAKE</span>
                        </button>

                        <button
                          onClick={handleDownloadPhoto}
                          className="btn-primary-marigold py-3 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
                        >
                          <Download className="w-4 h-4 stroke-[2.5]" />
                          <span>SAVE PHOTO</span>
                        </button>
                      </div>
                    </div>

                    {/* Right: Sharing, More Media Sizes & Bonus Pass */}
                    <div className="w-full md:max-w-md flex flex-col space-y-3">
                      {/* Sharing Section: Tonal Refined Buttons */}
                      <div className="space-y-2.5">
                        <button
                          onClick={handleShareInstagram}
                          className="w-full py-3.5 px-4 rounded-2xl bg-[#1c0828] hover:bg-[#250b36] border border-[#e8a33d]/25 text-[#f6ebdd] shadow-md flex items-center justify-between transition active:scale-[0.98] group"
                        >
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-8 h-8 rounded-xl bg-white/5 border border-[#e8a33d]/30 flex items-center justify-center shrink-0 group-hover:border-[#e8a33d]/60 transition">
                              <div className="w-4 h-4 rounded-md border border-[#e8a33d] flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#e8a33d]" />
                              </div>
                            </div>
                            <div>
                              <span className="block font-medium text-xs sm:text-sm text-[#f6ebdd]">
                                Share on Instagram Story
                              </span>
                              <span className="block text-[10px] text-[#b5a8be]">
                                Downloads 9:16 Story · Opens Instagram &amp; unlocks {shopConfig.discountLabel || '30% OFF'}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#b5a8be] group-hover:text-[#f6ebdd] transition shrink-0" />
                        </button>

                        <button
                          onClick={handleShareWhatsApp}
                          className="w-full py-3.5 px-4 rounded-2xl bg-[#0c1a14] hover:bg-[#12241c] border border-[#25d366]/30 text-[#f6ebdd] shadow-md flex items-center justify-between transition active:scale-[0.98] group"
                        >
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-8 h-8 rounded-xl bg-[#25d366]/10 border border-[#25d366]/40 flex items-center justify-center shrink-0 group-hover:border-[#25d366]/70 transition">
                              <Share2 className="w-4 h-4 text-[#25d366]" />
                            </div>
                            <div>
                              <span className="block font-medium text-xs sm:text-sm text-[#f6ebdd]">
                                Post to WhatsApp Status
                              </span>
                              <span className="block text-[10px] text-[#b5a8be]">
                                Downloads 9:16 Status · Opens WhatsApp &amp; unlocks {shopConfig.discountLabel || '30% OFF'}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#b5a8be] group-hover:text-[#f6ebdd] transition shrink-0" />
                        </button>
                      </div>

                      {/* Other Media Sizes Trigger */}
                      <button
                        onClick={() => {
                          playChimeSound('click');
                          setShowOtherMediaModal(true);
                        }}
                        className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-[#b5a8be] hover:text-[#f6ebdd] font-medium text-xs flex items-center justify-between border border-white/10 transition active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-2.5">
                          <Layers className="w-4 h-4 text-[#e8a33d]" />
                          <span>Other Media Formats (Reels, Square, Feed)</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#b5a8be]" />
                      </button>

                      {/* Back to Home Navigation */}
                      <div className="text-center pt-2">
                        <button
                          onClick={() => {
                            stopCameraStream();
                            setStep('landing');
                          }}
                          className="text-xs text-[#b5a8be] hover:text-[#f6ebdd] transition underline underline-offset-4"
                        >
                          ← Back to Home
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* =========================================================================
          NAME PERSONALIZATION MODAL (Refined Boutique Card)
         ========================================================================= */}
      <AnimatePresence>
        {showNameModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-[#14051f]/95 border border-[#e8a33d]/35 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden backdrop-blur-md"
            >
              <div className="flex justify-center mb-3 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#e8a33d]/10 border border-[#e8a33d]/30 flex items-center justify-center text-[#e8a33d] shadow-sm">
                  <DiyaGraphic size={28} />
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#f6ebdd] tracking-tight mb-1 relative z-10">
                Personalize Your Portrait
              </h3>
              <p className="text-xs text-[#b5a8be] mb-5 relative z-10 leading-relaxed">
                Enter your name to appear on your royal festive frame and discount voucher.
              </p>

              <form onSubmit={handleSaveNameAndProceed} className="space-y-4 relative z-10">
                <input
                  type="text"
                  placeholder="Enter your name (e.g. Priya)"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full py-3.5 px-4 rounded-xl bg-black/60 border border-[#e8a33d]/30 text-[#f6ebdd] placeholder:text-[#b5a8be]/50 text-sm focus:outline-none focus:border-[#e8a33d] focus:ring-1 focus:ring-[#e8a33d]/40 transition shadow-inner"
                  autoFocus
                />

                <button
                  type="submit"
                  disabled={!nameInput.trim()}
                  className="btn-primary-marigold w-full py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider disabled:opacity-40 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Continue to Photo Booth</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={handleSkipName}
                  className="w-full py-2 text-xs text-[#b5a8be] hover:text-[#f6ebdd] font-medium tracking-wide transition hover:underline underline-offset-4"
                >
                  Skip &amp; continue as guest
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          COUPON MODAL (VIP GOLDEN PASS WITH CONFETTI & DOWNLOAD)
         ========================================================================= */}
      <CouponModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        coupon={
          activeCoupon || {
            customerName: customerName || 'Valued Guest',
            discount: 'FLAT 30% OFF',
            couponCode: `DIWALI-${(customerName || 'VIP').replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase() || 'VIP'}-30`,
          }
        }
        shopConfig={shopConfig}
      />

      {/* =========================================================================
          OTHER SOCIAL MEDIA SIZES MODAL (AUTO RESIZE & DOWNLOAD FOR FACEBOOK, REELS, ETC.)
         ========================================================================= */}
      <OtherMediaModal
        isOpen={showOtherMediaModal}
        onClose={() => setShowOtherMediaModal(false)}
        rawPhoto={capturedRawPhoto}
        customerName={customerName || 'Valued Guest'}
        shopConfig={shopConfig}
        selectedFrameId={selectedFrameId}
        discount="FLAT 30% OFF"
      />
    </>
  );
}
