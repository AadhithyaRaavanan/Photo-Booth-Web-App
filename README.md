# Photo-Booth-Web-App

A premium, mobile-first festive QR photo booth and discount coupon web application built for retail store promotional campaigns. Customers scan an in-store QR code, create personalized festive photographs inside an authentic royal temple frame, share to social media (Instagram Story & WhatsApp Status), and unlock an exclusive 30% OFF discount coupon pass.

## 🌟 Key Features

- **Exact 1:1 Festive Landing Page**: Deep purple aesthetic featuring hanging yellow fairy string lights garland, "Happy Diwali", "FESTIVAL OF LIGHTS", multi-layered colorful lotus flower, painted clay diya with warm glowing halo, decorated paisley pillar candle, and celebratory sparkler bursts.
- **Interactive Mobile-First Photo Booth**:
  - Live video stream using the browser MediaDevices API with transparent scalloped arch royal festive frame (`royal_festive_frame.png`).
  - Native Device Camera API fallback (`capture="user"`) for smartphones and desktop cameras.
  - One-tap "✨ Instant Demo Selfie" generator for rapid testing.
  - Photo Gallery file picker.
- **High-Resolution Canvas Composition**: Merges customer photo under the transparent archway with store branding (*Dream Salon*), personalized customer greetings, and "FLAT 30% OFF" medallion at 1080x1440 portrait resolution.
- **Smart Social Media Sharing**:
  - **On Phone**: Directly opens Instagram Stories with the photo attached via the Web Share API.
  - **On PC**: Automatically downloads the high-res photo to the computer and redirects to `https://www.instagram.com`.
  - WhatsApp Status direct sharing.
- **Verification & VIP Golden Pass**: Automated story verification with golden confetti celebration, discount code copy, and VIP Golden Pass card download.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion & CSS Keyframe animations
- **Effects**: `canvas-confetti`, Web Audio API synthesized chimes
- **Icons**: Lucide React
- **Graphics**: Pure Vector SVGs & 100% transparent PNG overlays

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build & Run for Production
```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

