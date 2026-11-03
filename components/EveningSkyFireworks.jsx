'use client';

import React, { useEffect, useRef } from 'react';

/**
 * EveningSkyFireworks Component
 *
 * Implements a high-performance, non-intrusive full-screen background:
 * 1. Deep dusk/evening sky gradient with warm festive horizon glow.
 * 2. Subtle distant festival/city skyline silhouette at the horizon.
 * 3. 90+ naturally twinkling/blinking stars across the upper sky.
 * 4. Realistic bursting fireworks with rising rockets, spherical spark explosions,
 *    trailing ember physics, gravity, and vibrant celebratory colors (Cyan, Gold, Rose, Amber, Emerald).
 * 5. Uses requestAnimationFrame with tab visibility pausing to conserve CPU and battery.
 * 6. Completely non-intrusive: pointer-events-none, fixed inset-0, -z-10.
 */
export default function EveningSkyFireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Responsive canvas resize with devicePixelRatio support
    const resize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Pause animation when tab is not active to conserve battery & CPU
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // -------------------------------------------------------------
    // 1. BLINKING / TWINKLING STARS
    // -------------------------------------------------------------
    const starCount = 95;
    const stars = [];
    const starColors = ['#ffffff', '#e0f2fe', '#fef08a', '#e9d5ff', '#38bdf8'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.75), // concentrated in upper 75% of sky
        radius: Math.random() * 1.6 + 0.6,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.035 + 0.015,
        phase: Math.random() * Math.PI * 2,
        hasRay: Math.random() > 0.85,
      });
    }

    // -------------------------------------------------------------
    // 2. FIREWORKS PARTICLES & ROCKETS
    // -------------------------------------------------------------
    const rockets = [];
    const particles = [];

    const PALETTES = [
      // Cyan / Electric Blue (matches user reference image)
      ['#00f0ff', '#38bdf8', '#7dd3fc', '#ffffff', '#0284c7'],
      // Royal 24K Gold & Champagne
      ['#ffd700', '#ffe082', '#ffb300', '#fff8e1', '#ffffff'],
      // Radiant Ruby / Magenta Party
      ['#ff1493', '#f43f5e', '#fb7185', '#fda4af', '#ffffff'],
      // Festive Emerald & Mint
      ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#ffffff'],
      // Golden Amber & Sunset Coral
      ['#ff7a00', '#fbbf24', '#f59e0b', '#fed7aa', '#ffffff'],
      // Amethyst Violet & Electric Pink
      ['#c084fc', '#e879f9', '#f472b6', '#ffffff'],
    ];

    class Rocket {
      constructor() {
        this.x = width * 0.15 + Math.random() * (width * 0.7);
        this.y = height + 10;
        // Apex height: burst in upper 18% to 50% of screen
        this.targetY = height * (0.15 + Math.random() * 0.35);
        this.speed = 10 + Math.random() * 5;
        this.angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.25;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
        this.trail = [];
        this.dead = false;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: 0.8 });
        if (this.trail.length > 6) this.trail.shift();

        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.08; // slight gravity deceleration

        if (this.y <= this.targetY || this.vy >= -1) {
          this.explode();
          this.dead = true;
        }
      }

      explode() {
        const count = 48 + Math.floor(Math.random() * 28);
        const burstSpeed = 3.5 + Math.random() * 3.5;
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(this.x, this.y, this.palette, burstSpeed));
        }
      }

      draw() {
        ctx.save();
        ctx.strokeStyle = '#fff7ed';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
          const t = this.trail[i];
          ctx.globalAlpha = (i / this.trail.length) * 0.8;
          if (i === 0) ctx.moveTo(t.x, t.y);
          else ctx.lineTo(t.x, t.y);
        }
        ctx.stroke();

        // Rocket head glow
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Particle {
      constructor(x, y, palette, maxSpeed) {
        this.x = x;
        this.y = y;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * maxSpeed + 0.6;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.friction = 0.96;
        this.gravity = 0.07;
        this.alpha = 1;
        this.decay = Math.random() * 0.016 + 0.012;
        this.radius = Math.random() * 2.2 + 1.2;
        this.flicker = Math.random() > 0.5;
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        let a = this.alpha;
        if (this.flicker) {
          a *= 0.65 + Math.random() * 0.35;
        }
        ctx.globalAlpha = Math.max(0, Math.min(1, a));
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.radius * 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Launch interval controller
    let lastLaunch = Date.now();
    let nextInterval = 800; // start quickly

    // -------------------------------------------------------------
    // 3. MAIN ANIMATION LOOP
    // -------------------------------------------------------------
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // skip processing when tab hidden

      const now = Date.now();
      if (now - lastLaunch > nextInterval) {
        rockets.push(new Rocket());
        // Occasional twin launch
        if (Math.random() > 0.65) {
          setTimeout(() => {
            if (isVisible) rockets.push(new Rocket());
          }, 350);
        }
        lastLaunch = now;
        nextInterval = 1400 + Math.random() * 1200; // random delay between 1.4s and 2.6s
      }

      // 1. Draw Dusk/Evening Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#06030e'); // Deep midnight dusk
      skyGrad.addColorStop(0.35, '#0e0622'); // Twilight indigo
      skyGrad.addColorStop(0.7, '#1b0933'); // Dusk plum
      skyGrad.addColorStop(0.9, '#2a093a'); // Horizon wine
      skyGrad.addColorStop(1, '#3b0d45'); // Warm sunset magenta glow at horizon
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Distant Horizon Festive Glow
      const horizonGlow = ctx.createRadialGradient(
        width * 0.5,
        height,
        height * 0.05,
        width * 0.5,
        height,
        width * 0.8
      );
      horizonGlow.addColorStop(0, 'rgba(233, 30, 99, 0.16)');
      horizonGlow.addColorStop(0.4, 'rgba(156, 39, 176, 0.1)');
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, height * 0.6, width, height * 0.4);

      // 3. Draw Blinking Stars
      const time = now * 0.002;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const alpha = s.baseAlpha + Math.sin(time * s.twinkleSpeed * 50 + s.phase) * 0.35;
        const clampedAlpha = Math.max(0.1, Math.min(1, alpha));

        ctx.save();
        ctx.globalAlpha = clampedAlpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.radius * 3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();

        // 4-point ray for bright stars
        if (s.hasRay && clampedAlpha > 0.6) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(s.x - s.radius * 2.8, s.y);
          ctx.lineTo(s.x + s.radius * 2.8, s.y);
          ctx.moveTo(s.x, s.y - s.radius * 2.8);
          ctx.lineTo(s.x, s.y + s.radius * 2.8);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 4. Update & Draw Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw();
        if (r.dead) {
          rockets.splice(i, 1);
        }
      }

      // 5. Update & Draw Exploding Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      // 6. Draw Subtle Distant City / Festival Skyline Silhouette (like reference image)
      drawSkylineSilhouette(ctx, width, height);
    };

    // Helper: Draw subtle festival skyline / ferris wheel silhouette at the bottom
    const drawSkylineSilhouette = (ctx, w, h) => {
      ctx.save();
      ctx.fillStyle = 'rgba(10, 3, 20, 0.75)';

      // Baseline ground
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, h - 35);

      // Low silhouette hill/city profile
      ctx.quadraticCurveTo(w * 0.25, h - 50, w * 0.5, h - 38);
      ctx.quadraticCurveTo(w * 0.75, h - 55, w, h - 42);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Subtle ferris wheel outline on right horizon (like reference image!)
      const fwX = w * 0.68;
      const fwY = h - 55;
      const fwR = 26;
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(fwX, fwY, fwR, 0, Math.PI * 2);
      ctx.stroke();

      // Ferris wheel spokes
      for (let a = 0; a < Math.PI; a += Math.PI / 4) {
        ctx.beginPath();
        ctx.moveTo(fwX - Math.cos(a) * fwR, fwY - Math.sin(a) * fwR);
        ctx.lineTo(fwX + Math.cos(a) * fwR, fwY + Math.sin(a) * fwR);
        ctx.stroke();
      }

      // Support legs
      ctx.beginPath();
      ctx.moveTo(fwX, fwY);
      ctx.lineTo(fwX - 16, h);
      ctx.moveTo(fwX, fwY);
      ctx.lineTo(fwX + 16, h);
      ctx.stroke();

      ctx.restore();
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 w-full h-full overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}

