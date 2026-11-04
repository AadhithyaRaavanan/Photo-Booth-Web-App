'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  RotateCcw,
  Sparkles,
  Share2,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Gift,
  RefreshCw,
  Image as ImageIcon,
  ShieldCheck,
  Smartphone,
  AlertTriangle,
  X,
  Layers,
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
  // App navigation: 'landing' (Page 1) or 'camera' | 'preview' | 'share' | 'verification' (Page 2: Photo Booth)
  const [step, setStep] = useState('landing');

  // Customer & Store info
  const [customerName, setCustomerName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [showOtherMediaModal, setShowOtherMediaModal] = useState(false);

  const [shopConfig, setShopConfig] = useState({
    shopName: 'Dream Salon',
    shopTagline: 'BEAUTY · STYLE · CONFIDENCE',
    campaignHeadline: 'Diwali Celebration',
    campaignSubtext: 'Capture your festive moments and unlock an exclusive 30% OFF surprise.',
    defaultDiscount: '30%',
    instagramTag: '@DreamSalon',
    partnerTag: '@ZenXea',
    validityDate: 'Nov 25, 2026',
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

  // Verification & Submission state
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'PENDING' | 'APPROVED'
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const nativeCameraInputRef = useRef(null);
  const screenshotInputRef = useRef(null);

  // Fetch campaign config on mount
  useEffect(() => {
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
          return;
        } catch (err) {
          if (err.name === 'AbortError') return;
          console.warn('Native mobile share sheet error:', err);
        }
      }

      // Fallback for older mobile browsers without Web Share Files support:
      window.location.href = 'instagram://camera';
      setTimeout(() => {
        window.location.href = 'instagram://app';
      }, 1200);
    } else {
      // 2. ON PC: 1080x1920 Story format downloaded, redirect to instagram.com
      window.open('https://www.instagram.com', '_blank');
    }
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
          return;
        } catch (err) {
          if (err.name === 'AbortError') return;
          console.warn('Native mobile share sheet error:', err);
        }
      }

      // WhatsApp deep link fallback
      window.location.href = `whatsapp://send?text=${text}`;
      setTimeout(() => {
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
      }, 1000);
    } else {
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    }
  };

  // Screenshot Selection & Upload
  const handleScreenshotChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setScreenshotPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit Screenshot for Verification with Automatic Coupon Unlock
  const handleSubmitVerification = async () => {
    if (!screenshotPreview) {
      alert('Please select or upload your screenshot first.');
      return;
    }

    setIsSubmitting(true);
    playChimeSound('click');

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName || 'Valued Guest',
          phone: phoneInput || '',
          frameId: selectedFrameId,
          discount: 'FLAT 30% OFF',
        }),
      });

      const data = await res.json();
      if (data.success && data.submission) {
        setSubmissionId(data.submission.id);
        setSubmissionStatus('PENDING');
        setStep('verification');

        // Automatic instant verification after 3s for seamless customer delight!
        setTimeout(async () => {
          try {
            const approveRes = await fetch(`/api/submissions/${data.submission.id}/status`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: 'APPROVED' }),
            });
            const approveData = await approveRes.json();
            if (approveData.success && approveData.submission) {
              setSubmissionStatus('APPROVED');
              setActiveCoupon(approveData.submission);
              setShowCouponModal(true);
            }
          } catch (e) {
            console.error('Auto verify error', e);
          }
        }, 3000);
      } else {
        alert(data.message || 'Submission error');
      }
    } catch (e) {
      console.error('Submission failed', e);
      alert('Submission failed. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="min-h-screen w-full bg-transparent text-champagne flex flex-col items-center justify-start relative overflow-x-hidden selection:bg-cyan-400 selection:text-black">
          {/* Clean Top Header (No Navbar) with Simple Back to Home */}
          <header className="w-full max-w-4xl mx-auto pt-4 sm:pt-6 pb-2 px-4 flex items-center justify-between relative z-30">
            <button
              onClick={() => {
                stopCameraStream();
                setStep('landing');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a0418]/80 backdrop-blur-md border border-cyan-400/40 text-xs font-semibold text-cyan-200 hover:bg-[#12082b] hover:text-white transition shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-base">🪔</span>
              <span className="font-serif text-sm sm:text-base font-bold text-cyan-200 tracking-wide drop-shadow">
                {shopConfig.shopName} Photo Booth
              </span>
            </div>

            {submissionStatus === 'APPROVED' ? (
              <button
                onClick={() => setShowCouponModal(true)}
                className="px-3.5 py-1.5 rounded-full bg-emerald-600/90 border border-emerald-400 text-xs font-bold text-white shadow-lg animate-pulse"
              >
                30% OFF Pass
              </button>
            ) : (
              <button
                onClick={handleToggleCamera}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-amber-400/40 text-xs font-medium text-amber-200 hover:bg-black/80 transition"
                title="Switch Camera"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Flip Camera</span>
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
                  <div className="md:hidden flex items-center justify-between w-full max-w-[340px] sm:max-w-[400px] mb-2 px-1">
                    <button
                      onClick={() => {
                        playChimeSound('click');
                        const currIdx = ROYAL_FRAMES.findIndex((f) => f.id === selectedFrameId);
                        const prevIdx = (currIdx - 1 + ROYAL_FRAMES.length) % ROYAL_FRAMES.length;
                        setSelectedFrameId(ROYAL_FRAMES[prevIdx].id);
                      }}
                      className="py-1.5 px-3 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 hover:bg-black/80 flex items-center gap-1 text-[11px] font-semibold transition shadow-md"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Prev Frame</span>
                    </button>

                    <button
                      onClick={() => {
                        playChimeSound('click');
                        const currIdx = ROYAL_FRAMES.findIndex((f) => f.id === selectedFrameId);
                        const nextIdx = (currIdx + 1) % ROYAL_FRAMES.length;
                        setSelectedFrameId(ROYAL_FRAMES[nextIdx].id);
                      }}
                      title="Tap to switch frame"
                      className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/25 to-pink-500/25 border border-amber-400/60 shadow-md text-amber-200 hover:text-white flex items-center gap-1.5 text-xs font-bold transition active:scale-95"
                    >
                      <span>✨</span>
                      <span className="truncate max-w-[130px]">
                        {ROYAL_FRAMES.find((f) => f.id === selectedFrameId)?.name}
                      </span>
                      <span className="text-[10px] text-amber-400">
                        ({ROYAL_FRAMES.findIndex((f) => f.id === selectedFrameId) + 1}/8)
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        playChimeSound('click');
                        const currIdx = ROYAL_FRAMES.findIndex((f) => f.id === selectedFrameId);
                        const nextIdx = (currIdx + 1) % ROYAL_FRAMES.length;
                        setSelectedFrameId(ROYAL_FRAMES[nextIdx].id);
                      }}
                      className="py-1.5 px-3 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 hover:bg-black/80 flex items-center gap-1 text-[11px] font-semibold transition shadow-md"
                    >
                      <span>Next Frame</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Main Studio Area: Camera Phone Card + Side Frames Panel */}
                  <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-6 lg:gap-8 relative select-none">
                    {/* Left Column: The Spacious, Decongested Camera Card */}
                    <div className="flex flex-col items-center">
                      <div className="w-full max-w-[340px] sm:max-w-[400px] h-[520px] sm:h-[580px] rounded-3xl overflow-hidden relative shadow-[0_16px_50px_rgba(0,0,0,0.85)] border-2 border-amber-400/70 bg-neutral-950 flex flex-col justify-between">
                        {/* Camera Feed & Transparent Royal Festive Frame */}
                        <div className="relative w-full h-full flex-1 overflow-hidden bg-neutral-950">
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
                              <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
                              <p className="text-xs text-amber-200 font-semibold tracking-wider uppercase">
                                Starting Camera...
                              </p>
                            </div>
                          )}

                          {/* 3. Camera Access Card (Shown if camera is blocked/denied/busy/no frames) */}
                          {!isInitializingCamera && (!isCameraActive || !hasVideoFrames) && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-15 bg-[#250438]/90 backdrop-blur-sm">
                              <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 mb-2 shadow-lg">
                                <Camera className="w-7 h-7" />
                              </div>
                              <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">
                                Camera Preview
                              </h3>
                              <p className="text-[11px] text-violet-200/80 max-w-xs mb-3.5 leading-relaxed">
                                {cameraError || 'Allow camera access in your browser, or tap an option below to take your photo:'}
                              </p>

                              <div className="flex flex-col gap-2 w-full max-w-[260px]">
                                <button
                                  onClick={() => nativeCameraInputRef.current?.click()}
                                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-black font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-98 transition flex items-center justify-center gap-2"
                                >
                                  <Camera className="w-4 h-4" />
                                  <span>Take Photo With Camera</span>
                                </button>

                                <button
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full py-2 px-3 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs transition border border-white/20 flex items-center justify-center gap-2"
                                >
                                  <ImageIcon className="w-4 h-4 text-amber-300" />
                                  <span>Choose From Gallery</span>
                                </button>

                                <button
                                  onClick={handleUseDemoSelfie}
                                  className="w-full py-1.5 px-3 rounded-xl bg-violet-800/60 hover:bg-violet-800 text-amber-200 font-medium text-[11px] transition border border-violet-400/30 flex items-center justify-center gap-1.5"
                                >
                                  <span>✨ Instant Demo Selfie</span>
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

                        {/* Bottom Control Deck (Clean, Non-Overlapping) */}
                        <div className="relative z-30 pt-3 pb-5 px-6 bg-gradient-to-t from-black via-black/90 to-transparent flex items-center justify-between">
                          {/* Left: Gallery Picker */}
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-champagne hover:bg-white/20 hover:text-white transition group"
                            title="Upload from Photo Gallery"
                          >
                            <ImageIcon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition" />
                            <span className="text-[8px] font-semibold text-champagne/70 mt-0.5">Gallery</span>
                          </button>

                          {/* Center: Gold Shutter Button */}
                          <motion.button
                            whileTap={{ scale: 0.92 }}
                            onClick={handleCapturePhoto}
                            disabled={isComposing}
                            className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white p-1.5 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.7)] focus:outline-none"
                            aria-label="Capture photo"
                          >
                            <div className="w-full h-full rounded-full border-4 border-amber-400 flex items-center justify-center bg-white transition hover:bg-amber-50">
                              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-inner" />
                            </div>
                          </motion.button>

                          {/* Right: Camera Flip */}
                          <button
                            onClick={handleToggleCamera}
                            className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-champagne hover:bg-white/20 hover:text-white transition group"
                            title="Flip Camera"
                          >
                            <RotateCcw className="w-5 h-5 text-amber-400 group-hover:rotate-180 transition duration-300" />
                            <span className="text-[8px] font-semibold text-champagne/70 mt-0.5">Flip</span>
                          </button>
                        </div>
                      </div>

                      {/* Fallback Action Bar Under the Card */}
                      <div className="mt-3 flex items-center justify-center gap-2 max-w-sm flex-wrap text-center">
                        <button
                          onClick={() => nativeCameraInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-full bg-black/50 border border-amber-400/30 text-[11px] font-medium text-amber-200 hover:bg-black/70 flex items-center gap-1.5 transition"
                        >
                          <Camera className="w-3.5 h-3.5 text-amber-300" />
                          <span>Device Camera</span>
                        </button>

                        <button
                          onClick={handleUseDemoSelfie}
                          className="px-3 py-1.5 rounded-full bg-violet-900/60 border border-violet-400/40 text-[11px] font-medium text-violet-200 hover:bg-violet-800 flex items-center gap-1.5 transition"
                        >
                          <span>✨ Demo Selfie</span>
                        </button>

                        <button
                          onClick={() => startCamera(facingMode)}
                          className="px-3 py-1.5 rounded-full bg-black/50 border border-white/20 text-[11px] font-medium text-white/70 hover:text-white flex items-center gap-1.5 transition"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Refresh Stream</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Royal Frame Studio Side Panel (Desktop / Tablet) */}
                    <div className="hidden md:flex flex-col w-72 lg:w-80 h-[520px] sm:h-[580px] rounded-3xl bg-[#1a0210] border border-amber-400/50 shadow-2xl p-4 overflow-hidden">
                      <div className="flex items-center justify-between pb-3 border-b border-amber-400/20 shrink-0">
                        <div>
                          <h3 className="font-serif text-sm sm:text-base font-bold text-amber-300 flex items-center gap-1.5">
                            <span>✨</span>
                            <span>ROYAL FRAME STUDIO</span>
                          </h3>
                          <p className="text-[10px] text-champagne/70 mt-0.5">
                            Click any frame to preview live
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-[10px] font-bold text-amber-200">
                          {ROYAL_FRAMES.findIndex((f) => f.id === selectedFrameId) + 1} / {ROYAL_FRAMES.length}
                        </span>
                      </div>

                      {/* Scrollable Frame Cards List */}
                      <div className="flex-1 overflow-y-auto pr-1 py-3 space-y-2.5">
                        {ROYAL_FRAMES.map((f) => {
                          const isSelected = selectedFrameId === f.id;
                          return (
                            <button
                              key={f.id}
                              onClick={() => {
                                playChimeSound('click');
                                setSelectedFrameId(f.id);
                              }}
                              className={`w-full flex items-center gap-3 p-2 rounded-2xl transition-all duration-200 text-left group ${
                                isSelected
                                  ? 'bg-gradient-to-r from-amber-500/30 to-amber-500/10 border-2 border-amber-400 shadow-[0_0_18px_rgba(255,215,0,0.35)] scale-[1.02]'
                                  : 'bg-black/40 hover:bg-white/10 border border-white/15 hover:border-amber-400/40'
                              }`}
                            >
                              {/* Lightweight WebP Thumbnail */}
                              <div className="relative w-12 h-16 rounded-xl overflow-hidden shrink-0 border border-amber-400/30 shadow-md">
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
                                  <div className="absolute inset-0 bg-amber-400/20 flex items-center justify-center">
                                    <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] font-black shadow-md">
                                      ✓
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs">{f.badge.split(' ')[0]}</span>
                                  <h4
                                    className={`text-xs font-bold truncate ${
                                      isSelected ? 'text-amber-300' : 'text-white group-hover:text-amber-200'
                                    }`}
                                  >
                                    {f.name}
                                  </h4>
                                </div>
                                <p className="text-[10px] text-champagne/60 line-clamp-2 mt-0.5 leading-snug">
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
                  STAGE 2B: CAPTURED PHOTO PREVIEW
                 --------------------------------------------------------------- */}
              {step === 'preview' && (
                <div className="w-full flex-1 flex flex-col justify-center py-2 sm:py-4">
                  <div className="text-center pb-4">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Your Festive Portrait
                    </h2>
                    <p className="text-xs sm:text-sm text-champagne/75 mt-1">
                      Framed with Dream Salon royal Diwali honors.
                    </p>
                  </div>

                  <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 my-auto">
                    <div className="flex-1 max-w-xs sm:max-w-sm w-full">
                      {brandedPhotoUrl ? (
                        <motion.div
                          initial={{ scale: 0.92, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_40px_rgba(255,215,0,0.35)]"
                        >
                          <img
                            src={brandedPhotoUrl}
                            alt="Branded Festive Moment"
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      ) : (
                        <div className="p-12 text-center text-xs text-champagne/60">
                          Generating composition...
                        </div>
                      )}
                    </div>

                    <div className="w-full md:max-w-xs flex flex-col space-y-3">
                      <div className="p-5 rounded-2xl bg-[#0b041c]/80 backdrop-blur-md border border-cyan-400/35 text-xs text-cyan-100/90 space-y-2 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                        <span className="font-serif font-bold text-cyan-300 text-sm block">
                          ✨ Ready to Unlock 30% OFF
                        </span>
                        <p>
                          Share your portrait to your Instagram Story or WhatsApp Status to unlock your exclusive voucher.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            playChimeSound('click');
                            setStep('camera');
                            startCamera();
                          }}
                          className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center justify-center gap-2 border border-white/10 transition"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>RETAKE</span>
                        </button>

                        <button
                          onClick={handleDownloadPhoto}
                          className="py-3 px-4 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-200 font-semibold text-xs flex items-center justify-center gap-2 border border-cyan-400/40 transition shadow-sm"
                        >
                          <Download className="w-4 h-4" />
                          <span>SAVE PHOTO</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          playChimeSound('click');
                          setStep('share');
                        }}
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-sans font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 transition active:scale-[0.98]"
                      >
                        <span>CONTINUE TO SHARE & REWARDS</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------------
                  STAGE 2C: SOCIAL MEDIA SHARING
                 --------------------------------------------------------------- */}
              {step === 'share' && (
                <div className="w-full flex-1 flex flex-col justify-center py-2 sm:py-4">
                  <div className="text-center pb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold mb-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Step 2 of 3</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                      Share & Unlock Offer
                    </h2>
                    <p className="text-xs sm:text-sm text-cyan-100/80 max-w-md mx-auto mt-1">
                      Share it on Instagram Story or WhatsApp Status and unlock your exclusive 30% OFF festive pass.
                    </p>
                  </div>

                  <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 my-auto">
                    <div className="max-w-[200px] md:max-w-xs w-full">
                      {brandedPhotoUrl && (
                        <div className="rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative group">
                          <img src={brandedPhotoUrl} alt="Thumbnail" className="w-full h-auto object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                            <button
                              onClick={handleDownloadPhoto}
                              className="p-2.5 rounded-full bg-cyan-400 text-slate-950 shadow-lg hover:scale-110 transition"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full md:max-w-md flex flex-col space-y-3">
                      <button
                        onClick={handleShareInstagram}
                        className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#e1306c] via-[#fd1d1d] to-[#f77737] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-between transition hover:opacity-95 active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-6 h-6 rounded-lg border-2 border-white flex items-center justify-center shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full border-2 border-white" />
                          </div>
                          <div>
                            <span className="block font-bold">SHARE ON INSTAGRAM STORY</span>
                            <span className="block text-[10px] text-white/80 font-normal">
                              Downloads 1080×1920 (9:16) Story · Opens Instagram
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/90 shrink-0" />
                      </button>

                      <button
                        onClick={handleShareWhatsApp}
                        className="w-full py-3.5 px-5 rounded-2xl bg-[#25d366] text-black font-bold text-xs sm:text-sm flex items-center justify-between transition hover:brightness-105 active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-2.5 text-left">
                          <Share2 className="w-4 h-4 shrink-0" />
                          <div>
                            <span className="block font-bold">POST TO WHATSAPP STATUS</span>
                            <span className="block text-[10px] text-black/75 font-normal">
                              Downloads 1080×1920 (9:16) Status · Opens WhatsApp
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 shrink-0" />
                      </button>

                      {/* OTHER MEDIA FORMATS BUTTON */}
                      <button
                        onClick={() => {
                          playChimeSound('click');
                          setShowOtherMediaModal(true);
                        }}
                        className="w-full py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-cyan-200 font-bold text-xs sm:text-sm flex items-center justify-between border border-cyan-400/35 transition hover:border-cyan-400/60 active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-2.5">
                          <Layers className="w-4 h-4 text-cyan-400" />
                          <span>OTHER MEDIA SIZES (FACEBOOK, SQUARE, REELS...)</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-cyan-400/80" />
                      </button>

                      <div className="p-3.5 rounded-xl bg-[#0b041c]/85 border border-cyan-400/30 text-xs text-cyan-100/90 text-center shadow-sm">
                        Tag <strong className="text-cyan-300">{shopConfig.instagramTag}</strong>{' '}
                        and <strong className="text-cyan-300">{shopConfig.partnerTag}</strong> in your story!
                      </div>

                      <button
                        onClick={() => {
                          playChimeSound('click');
                          setStep('verification');
                        }}
                        className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-between transition active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-2.5">
                          <UploadCloud className="w-5 h-5 text-white" />
                          <span>I've Shared (Upload Screenshot)</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>

                      <div className="text-center pt-1">
                        <button
                          onClick={() => setStep('landing')}
                          className="text-xs text-champagne/50 hover:text-champagne underline"
                        >
                          Back to Home
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------------
                  STAGE 2D: SCREENSHOT UPLOAD & AUTOMATIC VERIFICATION
                 --------------------------------------------------------------- */}
              {step === 'verification' && (
                <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-center py-2 sm:py-4">
                  {!submissionStatus && (
                    <>
                      <div className="text-center pb-3">
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                          Verify Your Story
                        </h2>
                        <p className="text-xs sm:text-sm text-champagne/75 max-w-md mx-auto mt-1">
                          Upload a screenshot of your posted story to claim your {shopConfig.defaultDiscount}{' '}
                          OFF discount pass.
                        </p>
                      </div>

                      <div className="my-auto py-4">
                        <div
                          onClick={() => screenshotInputRef.current?.click()}
                          className={`w-full p-6 sm:p-8 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition ${
                            screenshotPreview
                              ? 'border-cyan-400 bg-[#0b041c]/85 shadow-[0_0_25px_rgba(6,182,212,0.3)]'
                              : 'border-cyan-400/35 hover:border-cyan-300 bg-[#070314]/75 backdrop-blur-md'
                          }`}
                        >
                          <input
                            ref={screenshotInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleScreenshotChange}
                            className="hidden"
                          />

                          {screenshotPreview ? (
                            <div className="space-y-3">
                              <div className="w-36 h-48 mx-auto rounded-xl overflow-hidden border border-cyan-400/60 shadow-md">
                                <img
                                  src={screenshotPreview}
                                  alt="Screenshot preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="text-xs text-cyan-300 font-semibold flex items-center justify-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>Screenshot Selected</span>
                              </div>
                              <span className="text-[10px] text-cyan-200/70 underline">
                                Tap to change screenshot
                              </span>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                                <UploadCloud className="w-8 h-8" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white mb-0.5">
                                  Upload screenshot of your Story
                                </p>
                                <p className="text-xs text-slate-300/80">
                                  Tap here or select from photo gallery
                                </p>
                              </div>
                              <button
                                type="button"
                                className="py-2.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                              >
                                CHOOSE PHOTO
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="mt-4">
                          <label className="block text-xs font-semibold text-cyan-100/90 mb-1">
                            Phone Number (Optional - for SMS Coupon backup)
                          </label>
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={phoneInput}
                            onChange={(e) => setPhoneInput(e.target.value)}
                            className="w-full py-3 px-4 rounded-xl bg-[#0b041c]/80 border border-cyan-400/30 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={handleSubmitVerification}
                          disabled={!screenshotPreview || isSubmitting}
                          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-sans font-black text-sm tracking-wide disabled:opacity-50 shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 transition"
                        >
                          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                          <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT FOR VERIFICATION'}</span>
                        </button>

                        <button
                          onClick={() => setStep('share')}
                          className="w-full py-2 text-center text-xs text-champagne/60 hover:text-white"
                        >
                          Back to Sharing
                        </button>
                      </div>
                    </>
                  )}

                  {submissionStatus === 'PENDING' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6 my-auto">
                      <motion.div
                        animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-[#520970] to-[#8013ac] border-2 border-amber-400/80 p-6 flex items-center justify-center shadow-lg"
                      >
                        <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping opacity-30" />
                        <DiyaGraphic size={64} />
                      </motion.div>

                      <div>
                        <p className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-1">
                          SUBMISSION RECEIVED
                        </p>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                          Verifying Your Story...
                        </h3>
                        <p className="text-xs sm:text-sm text-champagne/80 max-w-sm mx-auto leading-relaxed">
                          Checking your shared festive story tags. Your exclusive 30% OFF coupon pass will unlock automatically!
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3c0859]/90 border border-amber-400/50 shadow-inner">
                        <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                        <span className="text-xs font-semibold text-amber-300">Verifying...</span>
                      </div>
                    </div>
                  )}

                  {submissionStatus === 'APPROVED' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                      <div className="w-24 h-24 rounded-full bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-xl">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>

                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-300 mb-1">
                          Reward Unlocked!
                        </h3>
                        <p className="text-xs sm:text-sm text-champagne/80">
                          Your story has been verified. Your exclusive coupon is ready.
                        </p>
                      </div>

                      <button
                        onClick={() => setShowCouponModal(true)}
                        className="py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-black font-bold text-sm shadow-lg flex items-center gap-2"
                      >
                        <Gift className="w-4 h-4" />
                        <span>VIEW MY COUPON</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* =========================================================================
          NAME PERSONALIZATION MODAL
         ========================================================================= */}
      <AnimatePresence>
        {showNameModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-[#090317] border-2 border-cyan-400/50 text-center shadow-[0_0_60px_rgba(6,182,212,0.45)] relative overflow-hidden"
            >
              {/* Ambient Glows */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-center mb-3 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  <DiyaGraphic size={40} />
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-black text-white tracking-wide uppercase drop-shadow mb-1 relative z-10">
                Personalize Your Portrait
              </h3>
              <p className="text-xs text-cyan-100/80 mb-5 relative z-10">
                Enter your name to appear on your royal festive frame and discount voucher.
              </p>

              <form onSubmit={handleSaveNameAndProceed} className="space-y-4 relative z-10">
                <input
                  type="text"
                  placeholder="Enter your name (e.g. Priya)"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full py-3.5 px-4 rounded-xl bg-black/70 border border-cyan-400/40 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30 transition shadow-inner"
                  autoFocus
                />

                <button
                  type="submit"
                  disabled={!nameInput.trim()}
                  className="w-full py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-widest disabled:opacity-40 transition shadow-[0_0_25px_rgba(6,182,212,0.6)] active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>CONTINUE TO PHOTO BOOTH</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <button
                  type="button"
                  onClick={handleSkipName}
                  className="w-full py-2 text-xs text-cyan-200/75 hover:text-white font-medium tracking-wide transition hover:underline underline-offset-4"
                >
                  Skip &amp; Continue as Guest
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
        coupon={activeCoupon || { customerName: customerName || 'Valued Guest', discount: 'FLAT 30% OFF' }}
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
