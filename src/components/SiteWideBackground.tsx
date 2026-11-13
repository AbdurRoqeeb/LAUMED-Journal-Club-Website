import React, { useEffect, useRef } from 'react';
import { sharedAnimationLoop } from '../utils/animationLoop';

/**
 * Tunable configuration for the calm, ultra-dark site-wide medical background.
 */
export const SITE_WIDE_BG_CONFIG = {
  enabled: true,
  elementCount: {
    cellsAndMolecules: 10, // 8 to 12 on desktop (automatically reduced under 700px)
    crosses: 8, // subtle medical plus-signs on desktop
    ecgLines: 2 // 1 or 2 very faint ECG baselines
  },
  speed: 1, // global motion speed multiplier
  brightness: 1, // global ember opacity multiplier (kept very subtle)
  maxFps: 30, // capped at 30fps for low CPU/battery impact
  colors: {
    bgDeep: '#0A0302',
    bgDeep2: '#160805',
    lineDim: 'rgba(242, 106, 33, 0.10)',
    lineFaint: 'rgba(122, 46, 18, 0.18)',
    glowDim: 'rgba(242, 106, 33, 0.06)',
    orangeRgb: '242, 106, 33',
    rustRgb: '122, 46, 18'
  }
};

interface DriftParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  phase: number;
  rotation: number;
  rotSpeed: number;
  kind: 'cell' | 'molecule';
  opacity: number;
}

interface MedicalCross {
  x: number;
  y: number;
  size: number;
  phase: number; // 0..2*PI fade envelope
  cycleDuration: number; // seconds per fade-in / fade-out cycle
  peakOpacity: number; // strictly < 0.08
  useRust: boolean;
}

interface CalmEcgTrack {
  yRatio: number;
  baselineOpacity: number; // 0.06..0.10
  pulseOpacity: number; // 0.08..0.10
  amplitude: number;
  pulsePeriod: number; // 8 to 12 seconds between gentle pulses
  sweepDuration: number; // seconds for pulse to glide across screen
  timer: number;
}

/**
 * Evaluates a gentle P-QRS-T heartbeat pulse at normalized progress u in [0, 1].
 */
function sampleGentlePulse(u: number): number {
  if (u < 0 || u > 1) return 0;
  // P wave
  if (u >= 0.12 && u < 0.24) {
    return 0.18 * Math.sin(((u - 0.12) / 0.12) * Math.PI);
  }
  // Q dip
  if (u >= 0.32 && u < 0.37) {
    return -0.20 * Math.sin(((u - 0.32) / 0.05) * Math.PI);
  }
  // R peak
  if (u >= 0.37 && u < 0.44) {
    return 0.95 * Math.sin(((u - 0.37) / 0.07) * Math.PI);
  }
  // S dip
  if (u >= 0.44 && u < 0.50) {
    return -0.28 * Math.sin(((u - 0.44) / 0.06) * Math.PI);
  }
  // T wave
  if (u >= 0.62 && u < 0.82) {
    return 0.26 * Math.sin(((u - 0.62) / 0.20) * Math.PI);
  }
  return 0;
}

export const SiteWideBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!SITE_WIDE_BG_CONFIG.enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isMobile = width < 700;
    let elapsed = 0;

    const clampedBrightness = Math.max(0, Math.min(1.5, SITE_WIDE_BG_CONFIG.brightness));
    const speedMult = SITE_WIDE_BG_CONFIG.speed;

    let particles: DriftParticle[] = [];
    let crosses: MedicalCross[] = [];
    let ecgTracks: CalmEcgTrack[] = [];

    const buildSceneElements = () => {
      const targetParticles = isMobile
        ? Math.max(4, Math.round(SITE_WIDE_BG_CONFIG.elementCount.cellsAndMolecules * 0.5))
        : Math.max(8, Math.min(12, SITE_WIDE_BG_CONFIG.elementCount.cellsAndMolecules));

      particles = Array.from({ length: targetParticles }, (_, idx) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 7 + Math.random() * 8,
        speedY: (3.0 + Math.random() * 2.8) * speedMult,
        speedX: (Math.random() - 0.5) * 2.0 * speedMult,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1 * speedMult,
        kind: idx % 2 === 0 ? 'cell' : 'molecule',
        opacity: (0.14 + Math.random() * 0.08) * clampedBrightness
      }));

      const targetCrosses = isMobile
        ? Math.max(4, Math.round(SITE_WIDE_BG_CONFIG.elementCount.crosses * 0.5))
        : SITE_WIDE_BG_CONFIG.elementCount.crosses;

      crosses = Array.from({ length: targetCrosses }, (_, idx) => ({
        x: (0.08 + Math.random() * 0.84) * width,
        y: (0.08 + Math.random() * 0.84) * height,
        size: 7 + Math.random() * 5,
        phase: (idx / Math.max(1, targetCrosses)) * Math.PI * 2,
        cycleDuration: 11 + Math.random() * 5,
        peakOpacity: Math.min(0.18, (0.11 + Math.random() * 0.06) * clampedBrightness),
        useRust: idx % 2 === 1
      }));

      const desiredEcg = isMobile
        ? 1
        : Math.max(1, Math.min(2, SITE_WIDE_BG_CONFIG.elementCount.ecgLines));

      const trackSpecs: CalmEcgTrack[] = [
        {
          yRatio: 0.36,
          baselineOpacity: 0.11 * clampedBrightness,
          pulseOpacity: 0.25 * clampedBrightness,
          amplitude: 20,
          pulsePeriod: 9.0, // gentle pulse every ~9s
          sweepDuration: 4.0,
          timer: 2.2
        },
        {
          yRatio: 0.74,
          baselineOpacity: 0.095 * clampedBrightness,
          pulseOpacity: 0.22 * clampedBrightness,
          amplitude: 17,
          pulsePeriod: 11.0, // staggered gentle pulse every ~11s
          sweepDuration: 4.4,
          timer: 6.8
        }
      ];

      ecgTracks = trackSpecs.slice(0, desiredEcg);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      isMobile = width < 700;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildSceneElements();
    };

    const drawBackgroundAndGlows = (timeSec: number, isStaticFrame: boolean) => {
      // Base subtle deep ember gradient (#0A0302 -> #160805)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, SITE_WIDE_BG_CONFIG.colors.bgDeep);
      bgGrad.addColorStop(0.55, '#0F0403');
      bgGrad.addColorStop(1, SITE_WIDE_BG_CONFIG.colors.bgDeep2);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Two large, slow-moving radial glows (orange and rust)
      const t = isStaticFrame ? 0 : timeSec * speedMult;
      const maxDim = Math.max(width, height);

      // Glow 1: Warm orange ember
      const g1X = width * (0.28 + Math.sin(t * 0.075) * 0.14);
      const g1Y = height * (0.35 + Math.cos(t * 0.055) * 0.16);
      const g1R = maxDim * 0.55;
      const glow1 = ctx.createRadialGradient(g1X, g1Y, 0, g1X, g1Y, g1R);
      glow1.addColorStop(
        0,
        `rgba(${SITE_WIDE_BG_CONFIG.colors.orangeRgb}, ${(0.11 * clampedBrightness).toFixed(4)})`
      );
      glow1.addColorStop(
        0.45,
        `rgba(${SITE_WIDE_BG_CONFIG.colors.orangeRgb}, ${(0.045 * clampedBrightness).toFixed(4)})`
      );
      glow1.addColorStop(1, 'rgba(10, 3, 2, 0)');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, width, height);

      // Glow 2: Deep rust warmth
      const g2X = width * (0.74 + Math.cos(t * 0.06) * 0.15);
      const g2Y = height * (0.68 + Math.sin(t * 0.048) * 0.14);
      const g2R = maxDim * 0.62;
      const glow2 = ctx.createRadialGradient(g2X, g2Y, 0, g2X, g2Y, g2R);
      glow2.addColorStop(
        0,
        `rgba(${SITE_WIDE_BG_CONFIG.colors.rustRgb}, ${(0.24 * clampedBrightness).toFixed(4)})`
      );
      glow2.addColorStop(
        0.5,
        `rgba(${SITE_WIDE_BG_CONFIG.colors.rustRgb}, ${(0.09 * clampedBrightness).toFixed(4)})`
      );
      glow2.addColorStop(1, 'rgba(10, 3, 2, 0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);
    };

    const drawMedicalCrosses = () => {
      ctx.save();
      ctx.lineCap = 'round';

      for (const cross of crosses) {
        // Smooth [0..1..0] envelope using sine curve (zero flash/flicker)
        const envelope = Math.max(0, Math.sin(cross.phase));
        const alpha = envelope * cross.peakOpacity;
        if (alpha <= 0.002) continue;

        const rgb = cross.useRust
          ? SITE_WIDE_BG_CONFIG.colors.rustRgb
          : SITE_WIDE_BG_CONFIG.colors.orangeRgb;

        ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(4)})`;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = `rgba(${rgb}, ${(alpha * 1.1).toFixed(4)})`;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        // Horizontal bar
        ctx.moveTo(cross.x - cross.size, cross.y);
        ctx.lineTo(cross.x + cross.size, cross.y);
        // Vertical bar
        ctx.moveTo(cross.x, cross.y - cross.size);
        ctx.lineTo(cross.x, cross.y + cross.size);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawBlurredParticles = () => {
      ctx.save();
      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Slight soft blur via shadowBlur and low-alpha double stroke
        ctx.shadowColor = `rgba(${SITE_WIDE_BG_CONFIG.colors.orangeRgb}, ${(p.opacity * 1.1).toFixed(
          4
        )})`;
        ctx.shadowBlur = 10;

        if (p.kind === 'cell') {
          // Soft biological cell halo
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${SITE_WIDE_BG_CONFIG.colors.orangeRgb}, ${p.opacity.toFixed(4)})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();

          ctx.fillStyle = `rgba(${SITE_WIDE_BG_CONFIG.colors.rustRgb}, ${(p.opacity * 0.65).toFixed(
            4
          )})`;
          ctx.fill();

          // Soft nucleus
          ctx.beginPath();
          ctx.arc(p.size * 0.14, -p.size * 0.1, p.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${SITE_WIDE_BG_CONFIG.colors.orangeRgb}, ${(
            p.opacity * 0.75
          ).toFixed(4)})`;
          ctx.fill();
        } else {
          // Minimal hexagon + bond molecule silhouette
          const r = p.size * 0.65;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const vx = Math.cos(angle) * r;
            const vy = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(${SITE_WIDE_BG_CONFIG.colors.rustRgb}, ${(
            p.opacity * 1.45
          ).toFixed(4)})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          for (let b = 0; b < 3; b++) {
            const angle = (b * Math.PI * 2) / 3;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
            ctx.lineTo(Math.cos(angle) * (r * 1.65), Math.sin(angle) * (r * 1.65));
            ctx.strokeStyle = `rgba(${SITE_WIDE_BG_CONFIG.colors.orangeRgb}, ${(
              p.opacity * 0.85
            ).toFixed(4)})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        ctx.restore();
      }
      ctx.restore();
    };

    const drawCalmEcgTracks = (isStaticFrame: boolean) => {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const segSteps = isMobile ? 96 : 160;
      const pulseWindowWidth = 0.24; // fraction of viewport width occupied by single heartbeat packet

      for (const track of ecgTracks) {
        const baseY = height * track.yRatio;
        const tCycle = track.timer % track.pulsePeriod;
        const isPulsing = !isStaticFrame && tCycle <= track.sweepDuration;
        const sweepCenterNorm = isStaticFrame
          ? 0.55
          : (tCycle / track.sweepDuration) * 1.24 - 0.12;

        // Draw continuous subtle baseline across the screen
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        ctx.lineTo(width, baseY);
        ctx.strokeStyle = `rgba(${SITE_WIDE_BG_CONFIG.colors.orangeRgb}, ${Math.min(
          0.16,
          track.baselineOpacity
        ).toFixed(4)})`;
        ctx.lineWidth = 1.25;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // Draw single occasional heartbeat pulse packet if active (or soft static reference on reduced-motion)
        if (isPulsing || isStaticFrame) {
          const halfWin = pulseWindowWidth * 0.5;
          const startNorm = Math.max(0, sweepCenterNorm - halfWin);
          const endNorm = Math.min(1, sweepCenterNorm + halfWin);

          if (endNorm > startNorm) {
            ctx.beginPath();
            for (let i = 0; i <= segSteps; i++) {
              const frac = i / segSteps;
              const normX = startNorm + frac * (endNorm - startNorm);
              const localU = (normX - (sweepCenterNorm - halfWin)) / pulseWindowWidth;
              const wave = sampleGentlePulse(localU);
              const px = normX * width;
              const py = baseY - wave * track.amplitude;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }

            // Fade smoothly at edges of the pulse packet
            const edgeFade = isStaticFrame
              ? 0.85
              : Math.sin(Math.min(1, Math.max(0, tCycle / track.sweepDuration)) * Math.PI);
            const alpha = Math.min(0.28, track.pulseOpacity * (0.45 + 0.55 * edgeFade));

            ctx.strokeStyle = `rgba(${SITE_WIDE_BG_CONFIG.colors.orangeRgb}, ${alpha.toFixed(4)})`;
            ctx.lineWidth = 1.8;
            ctx.shadowColor = `rgba(${SITE_WIDE_BG_CONFIG.colors.orangeRgb}, ${(
              alpha * 1.15
            ).toFixed(4)})`;
            ctx.shadowBlur = 10;
            ctx.stroke();

            // Subtle glowing ember dot leading the occasional pulse
            if (!isStaticFrame && endNorm > 0 && endNorm < 1) {
              const tipU = (endNorm - (sweepCenterNorm - halfWin)) / pulseWindowWidth;
              const leadY = baseY - sampleGentlePulse(tipU) * track.amplitude;
              ctx.beginPath();
              ctx.arc(endNorm * width, leadY, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 178, 122, ${(alpha * 1.25).toFixed(4)})`;
              ctx.fill();
            }
          }
        }
      }

      ctx.restore();
    };

    const renderFrame = (dt: number, isStaticFrame: boolean) => {
      if (!isStaticFrame) {
        elapsed += dt;

        // Drift particles slowly upward
        for (const p of particles) {
          p.y -= p.speedY * dt;
          p.x += (p.speedX + Math.sin(elapsed * 0.25 + p.phase) * 2.2 * speedMult) * dt;
          p.rotation += p.rotSpeed * dt;

          if (p.y < -p.size * 2.5) {
            p.y = height + p.size * 2.5;
            p.x = Math.random() * width;
          }
          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
        }

        // Slowly fade medical crosses in and out; reposition when invisible
        for (const cross of crosses) {
          const prevSin = Math.sin(cross.phase);
          cross.phase += ((Math.PI * 2) / cross.cycleDuration) * speedMult * dt;
          const nextSin = Math.sin(cross.phase);

          // Re-pick random coordinates as cross crosses bottom of visibility
          if (prevSin <= 0 && nextSin > 0) {
            cross.x = (0.06 + Math.random() * 0.88) * width;
            cross.y = (0.06 + Math.random() * 0.88) * height;
          }
        }

        // Advance occasional ECG pulse timers
        for (const track of ecgTracks) {
          track.timer += dt * speedMult;
        }
      }

      drawBackgroundAndGlows(elapsed, isStaticFrame);
      drawBlurredParticles();
      drawMedicalCrosses();
      drawCalmEcgTracks(isStaticFrame);
    };

    let unsubscribe: (() => void) | null = null;

    const startOrRenderStatic = () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }

      if (motionQuery.matches) {
        renderFrame(0, true);
      } else {
        renderFrame(0, false);
        unsubscribe = sharedAnimationLoop.subscribe({
          id: 'site-wide-background',
          targetFps: SITE_WIDE_BG_CONFIG.maxFps,
          onFrame: (_ts, dt) => renderFrame(dt, false)
        });
      }
    };

    const handleResize = () => {
      resize();
      if (motionQuery.matches) {
        renderFrame(0, true);
      }
    };

    const handleMotionChange = () => {
      startOrRenderStatic();
    };

    resize();
    startOrRenderStatic();

    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  if (!SITE_WIDE_BG_CONFIG.enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};
