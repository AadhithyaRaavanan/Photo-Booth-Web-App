import React from 'react';

export default function MarigoldGarland({ className = "", count = 6, orientation = "horizontal" }) {
  const flowerItems = Array.from({ length: count });

  return (
    <div
      className={`flex ${
        orientation === "horizontal" ? "flex-row items-center justify-around" : "flex-col items-center justify-around"
      } pointer-events-none ${className}`}
    >
      {flowerItems.map((_, i) => (
        <div key={i} className="relative transition-transform duration-300 hover:scale-110">
          <svg
            viewBox="0 0 60 60"
            className="w-8 h-8 filter drop-shadow-[0_2px_6px_rgba(255,140,0,0.5)]"
          >
            <defs>
              <radialGradient id={`marigold-grad-${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff385" />
                <stop offset="40%" stopColor="#ffb300" />
                <stop offset="75%" stopColor={i % 2 === 0 ? "#ff6f00" : "#e65100"} />
                <stop offset="100%" stopColor="#b72c00" />
              </radialGradient>
            </defs>

            {/* Outer Petals */}
            <circle cx="30" cy="30" r="26" fill={i % 2 === 0 ? "#ff9800" : "#ff5722"} opacity="0.9" />
            
            {/* Petal layers rotating */}
            <g transform="translate(30,30)">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <ellipse
                  key={deg}
                  cx="0"
                  cy="-16"
                  rx="6.5"
                  ry="9"
                  fill={`url(#marigold-grad-${i})`}
                  transform={`rotate(${deg})`}
                />
              ))}

              {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
                <ellipse
                  key={deg}
                  cx="0"
                  cy="-10"
                  rx="4.5"
                  ry="6.5"
                  fill="#ffc107"
                  transform={`rotate(${deg})`}
                />
              ))}

              {/* Center Core */}
              <circle cx="0" cy="0" r="6" fill="#bf360c" />
              <circle cx="0" cy="0" r="3.5" fill="#ffd54f" />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}

