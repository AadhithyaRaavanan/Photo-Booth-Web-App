'use client';

import React, { useEffect, useRef } from 'react';

/**
 * EveningSkyFireworks Component
 *
 * Spectacular, eye-catching, professional evening sky with:
 * - Rich dusk/evening sky gradient with warm festive horizon glow.
 * - 120 twinkling/blinking stars with smooth twinkle phases & 4-point diffraction rays.
 * - Fireworks particle physics engine:
 *   * Rocket launches with sparkling ascent trails.
 *   * Flash bloom illuminating the dusk sky upon detonation.
 *   * 5 Firework types: Chrysanthemum, Golden Willow, Cyan Ring, Ruby Bloom, Crackle Strobe.
 *   * 60-90 glowing sparks per burst with drag, gravity, and luminous color decay.
 *   * Interactive: Tapping/clicking anywhere in empty sky launches a firework!
 * - z-0 with pointer-events-none: never interferes with buttons, inputs, or text.
 * - Tab visibility listener to pause loop when inactive and conserve CPU.
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
    let isVisible = true;

    // Responsive canvas resize
    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    // Pause animation when tab is inactive to preserve battery & CPU
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // -------------------------------------------------------------
    // 1. BLINKING / TWINKLING STARS (Normalized coordinates)
    // -------------------------------------------------------------
    const starCount = 135;
    const stars = [];
    const starColors = [
      '#ffffff',
      '#e0f2fe',
      '#fef08a',
      '#38bdf8',
      '#fbcfe8',
      '#fef9c3',
      '#a5f3fc',
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        xRatio: Math.random(),
        yRatio: Math.random() * 0.78, // upper 78% of sky
        radius: Math.random() * 1.8 + 0.6,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: Math.random() * 0.45 + 0.25,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        phase: Math.random() * Math.PI * 2,
        hasCross: Math.random() > 0.78,
      });
    }

    // -------------------------------------------------------------
    // 2. FIREWORKS ENGINE
    // -------------------------------------------------------------
    const rockets = [];
    const particles = [];
    const flashes = [];

    // Color Palettes
    const PALETTES = [
      // 1. Electric Cyan & Aqua (Matching modern UI)
      {
        name: 'cyan',
        colors: ['#00f5ff', '#00c8ff', '#38bdf8', '#7dd3fc', '#ffffff'],
        glow: '#00f5ff',
      },
      // 2. 24K Royal Gold & Champagne
      {
        name: 'gold',
        colors: ['#ffe066', '#ffd700', '#ffb700', '#fff3b0', '#ffffff'],
        glow: '#ffd700',
      },
      // 3. Radiant Magenta & Ruby Rose
      {
        name: 'ruby',
        colors: ['#ff007f', '#ff1493', '#ff4d94', '#fda4af', '#ffffff'],
        glow: '#ff1493',
      },
      // 4. Sunset Coral & Amber Gold
      {
        name: 'amber',
        colors: ['#ff5722', '#ff9100', '#ffab40', '#ffe082', '#ffffff'],
        glow: '#ff9100',
      },
      // 5. Emerald Green & Mint
      {
        name: 'emerald',
        colors: ['#00e676', '#69f0ae', '#b9f6ca', '#ffffff'],
        glow: '#00e676',
      },
      // 6. Amethyst Purple & Neon Cyan Duo
      {
        name: 'duo',
        colors: ['#c084fc', '#e879f9', '#00f5ff', '#38bdf8', '#ffffff'],
        glow: '#c084fc',
      },
    ];

    // Rocket Class
    class Rocket {
      constructor(targetX = null, targetY = null) {
        this.x = targetX !== null ? targetX : width * 0.15 + Math.random() * (width * 0.7);
        this.y = height + 10;
        this.targetY = targetY !== null ? targetY : height * (0.12 + Math.random() * 0.38);
        const distance = this.y - this.targetY;
        this.speed = Math.sqrt(distance * 0.55) + Math.random() * 2;
        const drift = (Math.random() - 0.5) * 1.5;
        this.vx = drift;
        this.vy = -this.speed;
        this.palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
        this.type = Math.floor(Math.random() * 5); // 0: Peony, 1: Willow, 2: Ring, 3: Duo, 4: Strobe
        this.trail = [];
        this.dead = false;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: 1 });
        if (this.trail.length > 8) this.trail.shift();

        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.22; // smooth gravity deceleration

        if (this.vy >= -1 || this.y <= this.targetY) {
          this.explode();
          this.dead = true;
        }
      }

      explode() {
        // Flash in the sky
        flashes.push({
          x: this.x,
          y: this.y,
          radius: 90 + Math.random() * 60,
          color: this.palette.glow,
          alpha: 0.35,
        });

        const sparkCount = this.type === 1 ? 75 : 60 + Math.floor(Math.random() * 25);

        for (let i = 0; i < sparkCount; i++) {
          particles.push(new Spark(this.x, this.y, this.palette, this.type, i, sparkCount));
        }
      }

      draw() {
        ctx.save();
        ctx.strokeStyle = '#fff7ed';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
          const pt = this.trail[i];
          ctx.globalAlpha = (i / this.trail.length) * 0.9;
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Glowing rocket head
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = this.palette.glow;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Spark Particle Class
    class Spark {
      constructor(x, y, palette, type, index, total) {
        this.x = x;
        this.y = y;
        this.palette = palette;
        this.type = type;
        this.color = palette.colors[Math.floor(Math.random() * palette.colors.length)];

        // Angle and speed distribution
        let angle, speed;
        if (type === 2) {
          // Ring burst: uniform circle
          angle = (index / total) * Math.PI * 2;
          speed = 4.2 + (Math.random() - 0.5) * 0.6;
        } else {
          angle = Math.random() * Math.PI * 2;
          speed = Math.random() * 5.2 + 1.2;
        }

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // Willow has low friction & higher gravity; Strobe has high flicker
        this.friction = type === 1 ? 0.98 : 0.955;
        this.gravity = type === 1 ? 0.08 : 0.055;
        this.decay = type === 1 ? 0.01 : Math.random() * 0.016 + 0.012;
        this.alpha = 1;
        this.radius = type === 1 ? Math.random() * 2.5 + 1.2 : Math.random() * 2.2 + 1.0;
        this.isStrobe = type === 4 || Math.random() > 0.6;
        this.history = [];
      }

      update() {
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > 4) this.history.shift();

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
        if (this.isStrobe) {
          a *= 0.5 + Math.random() * 0.5;
        }

        // Draw spark trail
        if (this.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(this.history[0].x, this.history[0].y);
          for (let i = 1; i < this.history.length; i++) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
          }
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.radius * 0.7;
          ctx.globalAlpha = Math.max(0, a * 0.5);
          ctx.stroke();
        }

        // Draw spark head with glow
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

    // Launch scheduling
    let lastLaunchTime = Date.now();
    let nextLaunchDelay = 600;

    // Launch initial opening burst sequence
    if (isVisible) {
      rockets.push(new Rocket(width * 0.35 || 400, height * 0.28 || 220));
      setTimeout(() => {
        if (isVisible) rockets.push(new Rocket(width * 0.65 || 800, height * 0.24 || 200));
      }, 250);
      setTimeout(() => {
        if (isVisible) rockets.push(new Rocket(width * 0.5 || 600, height * 0.32 || 250));
      }, 550);
    }

    // Interactive sky click listener: tap to burst firework!
    const handleSkyClick = (e) => {
      // Ignore clicks on interactive buttons, inputs, or cards
      if (e.target && (e.target.closest('button') || e.target.closest('input') || e.target.closest('form') || e.target.closest('a'))) {
        return;
      }
      rockets.push(new Rocket(e.clientX, e.clientY));
    };
    window.addEventListener('click', handleSkyClick);

    // -------------------------------------------------------------
    // 3. MAIN RENDER LOOP
    // -------------------------------------------------------------
    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      const now = Date.now();

      // Automatic rocket launcher
      if (now - lastLaunchTime > nextLaunchDelay) {
        rockets.push(new Rocket());
        // Occasional double launch for grandeur
        if (Math.random() > 0.55) {
          setTimeout(() => {
            if (isVisible) rockets.push(new Rocket());
          }, 320);
        }
        lastLaunchTime = now;
        nextLaunchDelay = 1100 + Math.random() * 1100; // launches every 1.1s - 2.2s
      }

      // 1. Draw Deep Dusk/Evening Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#030208'); // Midnight deep dusk
      skyGrad.addColorStop(0.3, '#080318'); // Twilight indigo
      skyGrad.addColorStop(0.65, '#130628'); // Dusk purple
      skyGrad.addColorStop(0.85, '#240838'); // Horizon plum
      skyGrad.addColorStop(1, '#3d0a46'); // Warm festive magenta sunset glow
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Horizon Ambient Festival Glow
      const horizonGlow = ctx.createRadialGradient(
        width * 0.5,
        height,
        height * 0.05,
        width * 0.5,
        height,
        width * 0.75
      );
      horizonGlow.addColorStop(0, 'rgba(233, 30, 99, 0.22)');
      horizonGlow.addColorStop(0.4, 'rgba(124, 58, 237, 0.14)');
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, height * 0.55, width, height * 0.45);

      // 3. Draw Blinking / Twinkling Stars
      const t = now * 0.0025;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const sx = s.xRatio * width;
        const sy = s.yRatio * height;
        const alpha = s.baseAlpha + Math.sin(t * s.twinkleSpeed * 50 + s.phase) * 0.45;
        const clampedAlpha = Math.max(0.15, Math.min(1, alpha));

        ctx.save();
        ctx.globalAlpha = clampedAlpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.radius * 4;
        ctx.beginPath();
        ctx.arc(sx, sy, s.radius, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point cross rays for luminous stars
        if (s.hasCross && clampedAlpha > 0.52) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(sx - s.radius * 3.2, sy);
          ctx.lineTo(sx + s.radius * 3.2, sy);
          ctx.moveTo(sx, sy - s.radius * 3.2);
          ctx.lineTo(sx, sy + s.radius * 3.2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 4. Draw Atmospheric Flash Blooms
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = Math.max(0, f.alpha);
        const flashGrad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        flashGrad.addColorStop(0, f.color);
        flashGrad.addColorStop(0.4, f.color);
        flashGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = flashGrad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        f.alpha -= 0.04;
        f.radius += 2.5;
        if (f.alpha <= 0) {
          flashes.splice(i, 1);
        }
      }

      // 5. Update & Draw Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw();
        if (r.dead) {
          rockets.splice(i, 1);
        }
      }

      // 6. Update & Draw Exploding Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      // 7. Draw Distant Skyline / Ferris Wheel Silhouette along horizon
      drawSkyline(ctx, width, height);
    };

    // Helper: Skyline silhouette
    const drawSkyline = (ctx, w, h) => {
      ctx.save();
      ctx.fillStyle = 'rgba(8, 2, 16, 0.8)';

      // Low rolling city skyline silhouette
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, h - 38);
      ctx.quadraticCurveTo(w * 0.22, h - 52, w * 0.48, h - 40);
      ctx.quadraticCurveTo(w * 0.72, h - 58, w, h - 44);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Ferris Wheel on right horizon
      const fwX = w * 0.76;
      const fwY = h - 62;
      const fwR = 28;

      ctx.strokeStyle = 'rgba(255, 215, 0, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(fwX, fwY, fwR, 0, Math.PI * 2);
      ctx.stroke();

      // Spokes
      for (let a = 0; a < Math.PI; a += Math.PI / 4) {
        ctx.beginPath();
        ctx.moveTo(fwX - Math.cos(a) * fwR, fwY - Math.sin(a) * fwR);
        ctx.lineTo(fwX + Math.cos(a) * fwR, fwY + Math.sin(a) * fwR);
        ctx.stroke();
      }

      // Support legs
      ctx.beginPath();
      ctx.moveTo(fwX, fwY);
      ctx.lineTo(fwX - 18, h);
      ctx.moveTo(fwX, fwY);
      ctx.lineTo(fwX + 18, h);
      ctx.stroke();

      ctx.restore();
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
      className="pointer-events-none fixed inset-0 z-0 w-full h-full overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
