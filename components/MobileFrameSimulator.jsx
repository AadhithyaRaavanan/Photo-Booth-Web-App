'use client';

import React from 'react';

/**
 * Responsive Palace Container
 * Seamlessly adapts: full-bleed mobile on smartphones,
 * and a spacious, luxurious, grand presentation on PC and tablets.
 */
export default function MobileFrameSimulator({ children, currentStep = 'landing' }) {
  return (
    <div className="min-h-screen w-full bg-[#14020a] palace-burgundy-bg text-champagne flex flex-col items-center justify-start relative overflow-x-hidden selection:bg-gold-500 selection:text-black">
      {/* Background Decorative Mandala Watermarks in corners */}
      <div className="fixed -top-10 -left-10 w-96 h-96 opacity-10 pointer-events-none select-none z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full text-gold-400 fill-current">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
          <polygon points="100,10 125,75 190,100 125,125 100,190 75,125 10,100 75,75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="fixed -bottom-10 -right-10 w-96 h-96 opacity-10 pointer-events-none select-none rotate-180 z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full text-gold-400 fill-current">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
          <polygon points="100,10 125,75 190,100 125,125 100,190 75,125 10,100 75,75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Main Responsive Content Stage */}
      <main className="w-full flex-1 flex flex-col items-center justify-start pt-16 md:pt-20 pb-8 px-3 sm:px-6 md:px-8 relative z-10">
        <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
