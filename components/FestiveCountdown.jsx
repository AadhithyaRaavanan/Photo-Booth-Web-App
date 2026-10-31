'use client';

import React, { useState, useEffect } from 'react';

export default function FestiveCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 16,
    hours: 8,
    mins: 24,
    secs: 56,
  });

  useEffect(() => {
    // Target date: Nov 25, 2026
    const target = new Date(Date.now() + 16 * 86400000 + 8 * 3600000 + 24 * 60000).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 select-none">
      {[
        { label: 'DAYS', value: formatNumber(timeLeft.days) },
        { label: 'HOURS', value: formatNumber(timeLeft.hours) },
        { label: 'MINS', value: formatNumber(timeLeft.mins) },
        { label: 'SECS', value: formatNumber(timeLeft.secs) },
      ].map((item, idx) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-[#1c0410]/80 border border-gold-400/60 shadow-[inset_0_1px_8px_rgba(212,175,55,0.3)] flex items-center justify-center">
            <span className="font-serif text-lg sm:text-xl font-black text-white gold-gradient-text">
              {item.value}
            </span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-sans font-semibold tracking-widest text-[#fae7b4]/75 uppercase mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

