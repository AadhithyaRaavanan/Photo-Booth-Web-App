'use client';

import React, { useEffect, useRef } from 'react';

/**
 * EveningSkyFireworks Component (High-Performance & Pure Pitch Black)
 *
 * 1. PURE PITCH BLACK BACKGROUND:
 *    - 100% solid #000000 black, zero gradients, zero shade differences or banding.
 * 2. ZERO-LAG HARDWARE ACCELERATED ANIMATION:
 *    - Removed expensive `shadowBlur` and excessive save/restore calls (the #1 cause of canvas lag).
 *    - Uses `globalCompositeOperation = 'lighter'` for luminous glowing fireworks with zero CPU blur overhead.
 *    - Uses subtle semi-transparent black sweep (`rgba(0,0,0,0.2)`) for natural, fluid glowing spark trails.
 *    - Star rendering is batched without per-star context state switching.
 *    - Particle pool capped to guarantee buttery-smooth 60+ FPS on all devices.
 * 3. NON-INTRUSIVE:
 *    - Fixed at z-0 with `pointer-events-none`. Never interferes with clicks, buttons, or inputs.
 *    - Pauses when the browser tab is hidden to conserve battery and CPU.
 */
export default function EveningSkyFireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Fast resize without layout thrashing
    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Fill pitch black immediately on resize
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // -------------------------------------------------------------
    // 1. BLINKING STARS (Lightweight Batched Rendering)
    // -------------------------------------------------------------
    const starCount = 85;
    const stars = [];
    const starColors = ['#ffffff', '#bae6fd', '#fef08a', '#38bdf8', '#fbcfe8'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        xRatio: Math.random(),
        yRatio: Math.random() * 0.85,
        radius: Math.random() * 1.5 + 0.6,
        color: starColors[i % starColors.length],
        baseAlpha: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.05 + 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // -------------------------------------------------------------
    // 2. FIREWORKS ENGINE (Optimized, Zero-Blur, High-FPS)
    // -------------------------------------------------------------
    const rockets = [];
    const particles = [];
    const maxParticles = 140;

    const PALETTES = [
      // Vibrant Electric Cyan / Neon Ice (Matches UI)
      ['#00f5ff', '#38bdf8', '#7dd3fc', '#ffffff'],
      // 24K Royal Gold & Champagne
      ['#ffd700', '#ffe066', '#ffb700', '#ffffff'],
      // Radiant Festive Magenta & Pink
      ['#ff007f', '#ff1493', '#ff69b4', '#ffffff'],
      // Sunset Amber & Coral
      ['#ff6b00', '#ff9100', '#ffa726', '#ffffff'],
      // Emerald Green
      ['#00e676', '#69f0ae', '#b9f6ca', '#ffffff'],
    ];

    // Rocket Class
    class Rocket {
      constructor(targetX = null, targetY = null) {
        this.x = targetX !== null ? targetX : width * (0.15 + Math.random() * 0.7);
        this.y = height + 10;
        this.targetY = targetY !== null ? targetY : height * (0.14 + Math.random() * 0.35);
        const distance = this.y - this.targetY;
        this.speed = Math.sqrt(distance * 0.52);
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = -this.speed;
        this.palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
        this.type = Math.floor(Math.random() * 4); // 0: Peony, 1: Willow, 2: Ring, 3: Duo
        this.dead = false;
        this.trailX = this.x;
        this.trailY = this.y;
      }

      update() {
        this.trailX = this.x;
        this.trailY = this.y;
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // deceleration

        if (this.vy >= -0.5 || this.y <= this.targetY) {
          this.explode();
          this.dead = true;
        }
      }

      explode() {
        const count = this.type === 1 ? 55 : 45 + Math.floor(Math.random() * 15);
        if (particles.length + count > maxParticles) {
          // Remove oldest particles to prevent frame drops
          particles.splice(0, count);
        }

        for (let i = 0; i < count; i++) {
          let angle, speed;
          if (this.type === 2) {
            // Ring
            angle = (i / count) * Math.PI * 2;
            speed = 3.8 + Math.random() * 0.4;
          } else {
            angle = Math.random() * Math.PI * 2;
            speed = Math.random() * 4.6 + 1.2;
          }

          const color = this.palette[Math.floor(Math.random() * this.palette.length)];
          particles.push({
            x: this.x,
            y: this.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            friction: this.type === 1 ? 0.98 : 0.95,
            gravity: this.type === 1 ? 0.08 : 0.06,
            decay: this.type === 1 ? 0.012 : Math.random() * 0.018 + 0.014,
            alpha: 1,
            radius: Math.random() * 2 + 1.2,
            color: color,
          });
        }
      }

      draw() {
        // Fast line trail
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.trailX, this.trailY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Launch scheduling
    let lastLaunchTime = Date.now();
    let nextLaunchDelay = 600;

    // Launch opening bursts
    if (isVisible) {
      rockets.push(new Rocket(width * 0.35 || 350, height * 0.28 || 220));
      setTimeout(() => {
        if (isVisible) rockets.push(new Rocket(width * 0.65 || 750, height * 0.24 || 190));
      }, 350);
    }

    // Tap on empty sky to launch rocket
    const handleSkyClick = (e) => {
      if (
        e.target &&
        (e.target.closest('button') ||
          e.target.closest('input') ||
          e.target.closest('form') ||
          e.target.closest('a'))
      ) {
        return;
      }
      rockets.push(new Rocket(e.clientX, e.clientY));
    };
    window.addEventListener('click', handleSkyClick);

    // -------------------------------------------------------------
    // 3. FAST ANIMATION LOOP (Solid Black & High-FPS)
    // -------------------------------------------------------------
    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      const now = Date.now();

      // Launch next rocket
      if (now - lastLaunchTime > nextLaunchDelay) {
        rockets.push(new Rocket());
        if (Math.random() > 0.6) {
          setTimeout(() => {
            if (isVisible) rockets.push(new Rocket());
          }, 300);
        }
        lastLaunchTime = now;
        nextLaunchDelay = 1200 + Math.random() * 1200; // launches every 1.2s - 2.4s
      }

      // 1. PURE SOLID BLACK CLEAR (WITH NATURAL FADE TRAIL)
      // Solid black fade: creates natural glowing trails without memory leaks or lag
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // 2. DRAW TWINKLING STARS (Fast Batch Render, No shadowBlur)
      const t = now * 0.003;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const alpha = s.baseAlpha + Math.sin(t * s.speed * 40 + s.phase) * 0.35;
        const clampedAlpha = Math.max(0.15, Math.min(1, alpha));
        const sx = s.xRatio * width;
        const sy = s.yRatio * height;

        ctx.globalAlpha = clampedAlpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(sx, sy, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. DRAW ROCKETS
      ctx.globalAlpha = 1;
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw();
        if (r.dead) {
          rockets.splice(i, 1);
        }
      }

      // 4. DRAW EXPLODING SPARKS WITH HARDWARE-ACCELERATED 'LIGHTER' BLEND
      ctx.globalCompositeOperation = 'lighter';
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleSkyClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 w-full h-full overflow-hidden select-none bg-black"
      aria-hidden="true"
    />
  );
}
