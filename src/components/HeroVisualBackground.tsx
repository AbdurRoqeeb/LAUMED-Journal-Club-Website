import React, { useEffect, useRef, useState } from 'react';
import { LAUMED_LOGO_SRC } from '../data/logoConfig';
import { sharedAnimationLoop } from '../utils/animationLoop';

/**
 * Tweakable settings for the Medical-Tech Hero Canvas & Watermark
 */
export const HERO_BG_CONFIG = {
  colors: {
    bg: '#120605',
    orange: '#F26A21',
    orangeBright: '#FF7A2F',
    amber: '#FFB27A',
    rust: '#7A2E12'
  },
  ecgLineCount: 3, // 2-3 horizontal ECG waveforms
  speed: 1, // global animation speed multiplier
  particleCount: 22, // 15-25 floating cells and molecules on desktop
  helixEnabled: true,
  watermarkOpacity: 0.095, // 0.06 to 0.12
  watermarkPosition: 'right' as 'right' | 'center' // 'right' places DNA helix on left; 'center' places helix on right
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  phase: number;
  rotation: number;
  rotSpeed: number;
  kind: 'cell' | 'molecule';
  depth: number; // 0 = far/small, 1 = near/large+soft blur
  opacity: number;
}

interface EcgTrack {
  yRatio: number;
  speed: number;
  amplitude: number;
  opacity: number;
  headX: number; // 0..1 normalized progress across width
  tailRatio: number;
  beatPhaseOffset: number;
  crossesWatermark: boolean;
}

/**
 * Evaluates a realistic single-cycle P-QRS-T ECG waveform value in [-1, 1]
 * for a normalized phase t in [0, 1).
 */
function sampleEcgWaveform(t: number): number {
  const p = ((t % 1) + 1) % 1;
  // P wave (small upward bump around 0.15)
  if (p >= 0.10 && p < 0.20) {
    const u = (p - 0.10) / 0.10;
    return 0.16 * Math.sin(u * Math.PI);
  }
  // Q dip (around 0.28)
  if (p >= 0.26 && p < 0.295) {
    const u = (p - 0.26) / 0.035;
    return -0.20 * Math.sin(u * Math.PI);
  }
  // R sharp peak (around 0.31)
  if (p >= 0.295 && p < 0.335) {
    const u = (p - 0.295) / 0.04;
    return 1.0 * Math.sin(u * Math.PI);
  }
  // S dip (around 0.35)
  if (p >= 0.335 && p < 0.37) {
    const u = (p - 0.335) / 0.035;
    return -0.32 * Math.sin(u * Math.PI);
  }
  // T wave (rounded upward wave around 0.50)
  if (p >= 0.44 && p < 0.58) {
    const u = (p - 0.44) / 0.14;
    return 0.28 * Math.sin(u * Math.PI);
  }
  return 0;
}

export const HeroVisualBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const watermarkRef = useRef<HTMLImageElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', onMotionChange);

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return () => motionQuery.removeEventListener('change', onMotionChange);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return () => motionQuery.removeEventListener('change', onMotionChange);
    }

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 520;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isMobile = width < 700;

    let unsubscribeLoop: (() => void) | null = null;
    let isHeroVisible = true;
    let elapsed = 0;
    let watermarkPulseBoost = 0;

    // Initialize ECG lines (staggered heights, speeds, opacities)
    const baseTracks: EcgTrack[] = [
      {
        yRatio: 0.26,
        speed: 0.135,
        amplitude: 26,
        opacity: 0.38,
        headX: 0.15,
        tailRatio: 0.34,
        beatPhaseOffset: 0.0,
        crossesWatermark: false
      },
      {
        yRatio: 0.52,
        speed: 0.165,
        amplitude: 38,
        opacity: 0.62,
        headX: 0.55,
        tailRatio: 0.40,
        beatPhaseOffset: 0.33,
        crossesWatermark: true
      },
      {
        yRatio: 0.78,
        speed: 0.115,
        amplitude: 24,
        opacity: 0.32,
        headX: 0.82,
        tailRatio: 0.32,
        beatPhaseOffset: 0.68,
        crossesWatermark: false
      }
    ].slice(0, Math.max(1, Math.min(3, HERO_BG_CONFIG.ecgLineCount)));

    let particles: Particle[] = [];
    const buildParticles = () => {
      const targetCount = isMobile
        ? Math.max(10, Math.round(HERO_BG_CONFIG.particleCount * 0.5))
        : HERO_BG_CONFIG.particleCount;

      particles = Array.from({ length: targetCount }, (_, idx) => {
        const depth = Math.random();
        const isLarge = depth > 0.68;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: isLarge ? 14 + Math.random() * 14 : 6 + Math.random() * 9,
          speedY: (8 + depth * 16) * HERO_BG_CONFIG.speed,
          speedX: (Math.random() - 0.5) * 6,
          phase: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.25,
          kind: idx % 2 === 0 ? 'cell' : 'molecule',
          depth,
          opacity: isLarge ? 0.12 + Math.random() * 0.10 : 0.18 + Math.random() * 0.16
        };
      });
    };

    const resize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 520;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      isMobile = width < 700;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const drawHexMolecule = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      if (p.depth > 0.68) {
        ctx.shadowColor = HERO_BG_CONFIG.colors.orange;
        ctx.shadowBlur = 12;
      }

      const r = p.size * 0.62;
      ctx.strokeStyle = p.depth > 0.5 ? HERO_BG_CONFIG.colors.orange : HERO_BG_CONFIG.colors.rust;
      ctx.lineWidth = p.depth > 0.68 ? 1.5 : 1.1;

      // Hexagon ring
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const vx = Math.cos(angle) * r;
        const vy = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.stroke();

      // Inner aromatic ring hint
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
      ctx.strokeStyle = HERO_BG_CONFIG.colors.amber;
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // Protruding molecular bond arms + atom nodes
      const bondAngles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
      for (const a of bondAngles) {
        const x1 = Math.cos(a) * r;
        const y1 = Math.sin(a) * r;
        const x2 = Math.cos(a) * (r * 1.75);
        const y2 = Math.sin(a) * (r * 1.75);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = HERO_BG_CONFIG.colors.rust;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x2, y2, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = HERO_BG_CONFIG.colors.amber;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawBiologicalCell = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity;

      if (p.depth > 0.68) {
        ctx.shadowColor = HERO_BG_CONFIG.colors.orange;
        ctx.shadowBlur = 14;
      }

      // Outer cell membrane
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.strokeStyle = p.depth > 0.5 ? HERO_BG_CONFIG.colors.orange : HERO_BG_CONFIG.colors.rust;
      ctx.lineWidth = p.depth > 0.68 ? 1.6 : 1.1;
      ctx.stroke();

      // Subtle translucent cytoplasm fill
      ctx.fillStyle = 'rgba(122, 46, 18, 0.12)';
      ctx.fill();

      // Nucleus
      ctx.beginPath();
      ctx.arc(p.size * 0.12, -p.size * 0.08, p.size * 0.34, 0, Math.PI * 2);
      ctx.fillStyle = HERO_BG_CONFIG.colors.amber;
      ctx.globalAlpha = p.opacity * 0.7;
      ctx.fill();

      ctx.restore();
    };

    const drawDnaHelix = (timeSec: number) => {
      if (!HERO_BG_CONFIG.helixEnabled) return;

      // Place DNA helix opposite the watermark
      const helixCenterX =
        HERO_BG_CONFIG.watermarkPosition === 'right'
          ? isMobile
            ? width * 0.14
            : width * 0.16
          : isMobile
          ? width * 0.86
          : width * 0.84;

      const helixWidth = isMobile ? 26 : 42;
      const topY = height * 0.06;
      const bottomY = height * 0.94;
      const spanY = bottomY - topY;
      const turns = 2.6;
      const steps = 64;
      const spin = timeSec * 0.75 * HERO_BG_CONFIG.speed;

      ctx.save();

      // Draw base-pair rungs first (subtle rust tone)
      const rungEvery = 4;
      for (let i = 0; i <= steps; i += rungEvery) {
        const frac = i / steps;
        const y = topY + frac * spanY;
        const angle = frac * Math.PI * 2 * turns + spin;
        const x1 = helixCenterX + Math.sin(angle) * helixWidth;
        const x2 = helixCenterX + Math.sin(angle + Math.PI) * helixWidth;
        const depthFactor = Math.abs(Math.cos(angle));

        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = HERO_BG_CONFIG.colors.rust;
        ctx.globalAlpha = 0.11 + depthFactor * 0.08;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Base-pair node dots
        ctx.beginPath();
        ctx.arc(x1, y, 2, 0, Math.PI * 2);
        ctx.arc(x2, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = HERO_BG_CONFIG.colors.amber;
        ctx.globalAlpha = 0.16;
        ctx.fill();
      }

      // Draw two sine-wave backbone strands
      for (let strand = 0; strand < 2; strand++) {
        const phaseOffset = strand === 0 ? 0 : Math.PI;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const frac = i / steps;
          const y = topY + frac * spanY;
          const angle = frac * Math.PI * 2 * turns + spin + phaseOffset;
          const x = helixCenterX + Math.sin(angle) * helixWidth;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle =
          strand === 0 ? HERO_BG_CONFIG.colors.orange : HERO_BG_CONFIG.colors.amber;
        ctx.globalAlpha = strand === 0 ? 0.19 : 0.14;
        ctx.lineWidth = 2;
        ctx.shadowColor = HERO_BG_CONFIG.colors.orange;
        ctx.shadowBlur = 10;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawEcgTracks = (isStaticFrame: boolean) => {
      const cyclesAcrossScreen = isMobile ? 2.2 : 3.6;

      // Subtle radial glow behind central ECG corridor
      ctx.save();
      const ecgGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.52,
        10,
        width * 0.5,
        height * 0.52,
        width * 0.55
      );
      ecgGlow.addColorStop(0, 'rgba(242, 106, 33, 0.12)');
      ecgGlow.addColorStop(0.55, 'rgba(122, 46, 18, 0.07)');
      ecgGlow.addColorStop(1, 'rgba(18, 6, 5, 0)');
      ctx.fillStyle = ecgGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      const watermarkCenterNormX =
        HERO_BG_CONFIG.watermarkPosition === 'right' ? (isMobile ? 0.78 : 0.80) : 0.50;

      for (const track of baseTracks) {
        const baseY = height * track.yRatio;
        const headNorm = isStaticFrame ? 0.85 : track.headX;
        const tailNorm = headNorm - track.tailRatio;
        const headPx = headNorm * width;
        const tailPx = tailNorm * width;
        const segSteps = isMobile ? 110 : 180;

        // Check if crossing watermark logo
        if (track.crossesWatermark && !isStaticFrame) {
          const distToWatermark = Math.abs(headNorm - watermarkCenterNormX);
          if (distToWatermark < 0.065) {
            watermarkPulseBoost = Math.max(watermarkPulseBoost, 1 - distToWatermark / 0.065);
          }
        }

        // Draw segmented glowing trace with tail fade
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = HERO_BG_CONFIG.colors.orange;
        ctx.shadowBlur = 10;

        for (let i = 0; i < segSteps; i++) {
          const f0 = i / segSteps;
          const f1 = (i + 1) / segSteps;
          const x0 = tailPx + f0 * (headPx - tailPx);
          const x1 = tailPx + f1 * (headPx - tailPx);

          if (x1 < 0 || x0 > width) continue;

          const norm0 = x0 / width;
          const norm1 = x1 / width;
          const y0 =
            baseY -
            sampleEcgWaveform(norm0 * cyclesAcrossScreen + track.beatPhaseOffset) *
              track.amplitude;
          const y1 =
            baseY -
            sampleEcgWaveform(norm1 * cyclesAcrossScreen + track.beatPhaseOffset) *
              track.amplitude;

          // Fade from 0 at tail (f0=0) to full track opacity near head (f0=1)
          const alpha = Math.pow(f1, 1.8) * track.opacity;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.strokeStyle =
            f1 > 0.88 ? HERO_BG_CONFIG.colors.orangeBright : HERO_BG_CONFIG.colors.orange;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = f1 > 0.88 ? 2.4 : 1.7;
          ctx.stroke();
        }

        // Glowing leading pulse dot
        if (headPx >= 0 && headPx <= width) {
          const headY =
            baseY -
            sampleEcgWaveform(headNorm * cyclesAcrossScreen + track.beatPhaseOffset) *
              track.amplitude;

          ctx.beginPath();
          ctx.arc(headPx, headY, 3.6, 0, Math.PI * 2);
          ctx.fillStyle = HERO_BG_CONFIG.colors.amber;
          ctx.globalAlpha = Math.min(1, track.opacity + 0.35);
          ctx.shadowColor = HERO_BG_CONFIG.colors.orangeBright;
          ctx.shadowBlur = 16;
          ctx.fill();

          // Outer halo on dot
          ctx.beginPath();
          ctx.arc(headPx, headY, 8, 0, Math.PI * 2);
          ctx.fillStyle = HERO_BG_CONFIG.colors.orangeBright;
          ctx.globalAlpha = track.opacity * 0.35;
          ctx.fill();
        }

        ctx.restore();
      }
    };

    const renderFrame = (dt: number, isStaticFrame: boolean) => {
      // Clear using exact #120605 base
      ctx.fillStyle = HERO_BG_CONFIG.colors.bg;
      ctx.fillRect(0, 0, width, height);

      // Update motion state if animating
      if (!isStaticFrame) {
        elapsed += dt;
        watermarkPulseBoost = Math.max(0, watermarkPulseBoost - dt * 1.4);

        for (const p of particles) {
          p.y -= p.speedY * dt;
          p.x += (p.speedX + Math.sin(elapsed * 0.7 + p.phase) * 7) * dt;
          p.rotation += p.rotSpeed * dt;

          if (p.y < -p.size * 2) {
            p.y = height + p.size * 2;
            p.x = Math.random() * width;
          }
          if (p.x < -40) p.x = width + 40;
          if (p.x > width + 40) p.x = -40;
        }

        for (const track of baseTracks) {
          track.headX += track.speed * HERO_BG_CONFIG.speed * dt;
          if (track.headX - track.tailRatio > 1.05) {
            track.headX = -0.02;
          }
        }
      }

      // Layer 3 (back): Floating cells & molecules
      for (const p of particles) {
        if (p.kind === 'cell') drawBiologicalCell(p);
        else drawHexMolecule(p);
      }

      // Layer 2 (mid): Slowly rotating DNA double helix
      drawDnaHelix(elapsed);

      // Layer 1 (front of canvas, behind watermark & text): ECG heartbeat lines
      drawEcgTracks(isStaticFrame);

      // Update watermark breathing + ECG crossing pulse glow
      if (watermarkRef.current) {
        const breathing = isStaticFrame ? 0.5 : (Math.sin(elapsed * 1.35) + 1) * 0.5;
        const glowRadius = 18 + breathing * 18 + watermarkPulseBoost * 28;
        const glowAlpha = 0.25 + breathing * 0.22 + watermarkPulseBoost * 0.45;
        const effectiveOpacity = Math.min(
          0.14,
          HERO_BG_CONFIG.watermarkOpacity + watermarkPulseBoost * 0.045
        );

        watermarkRef.current.style.opacity = effectiveOpacity.toFixed(3);
        watermarkRef.current.style.filter = `drop-shadow(0 0 ${glowRadius.toFixed(
          1
        )}px rgba(242, 106, 33, ${glowAlpha.toFixed(2)}))`;
      }
    };

    const startLoop = () => {
      if (motionQuery.matches) {
        renderFrame(0, true);
        return;
      }
      if (!unsubscribeLoop && isHeroVisible) {
        unsubscribeLoop = sharedAnimationLoop.subscribe({
          id: 'hero-visual-background',
          targetFps: 60,
          onFrame: (_ts, dt) => renderFrame(dt, false)
        });
      }
    };

    const stopLoop = () => {
      if (unsubscribeLoop) {
        unsubscribeLoop();
        unsubscribeLoop = null;
      }
    };

    const handleMotionPreferenceChange = () => {
      if (motionQuery.matches) {
        stopLoop();
        renderFrame(0, true);
      } else {
        startLoop();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isHeroVisible = !!entry?.isIntersecting;
        if (isHeroVisible) startLoop();
        else stopLoop();
      },
      { threshold: 0.02 }
    );

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (motionQuery.matches) renderFrame(0, true);
    });

    resize();
    intersectionObserver.observe(container);
    resizeObserver.observe(container);
    motionQuery.addEventListener('change', handleMotionPreferenceChange);

    if (motionQuery.matches) {
      renderFrame(0, true);
    } else {
      startLoop();
    }

    return () => {
      stopLoop();
      motionQuery.removeEventListener('change', onMotionChange);
      motionQuery.removeEventListener('change', handleMotionPreferenceChange);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  const watermarkPositionClasses =
    HERO_BG_CONFIG.watermarkPosition === 'right'
      ? 'right-4 sm:right-12 lg:right-20 top-1/2 -translate-y-1/2'
      : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      style={{
        maskImage:
          'linear-gradient(to bottom, #000000 0%, #000000 72%, rgba(0, 0, 0, 0.55) 86%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, #000000 0%, #000000 72%, rgba(0, 0, 0, 0.55) 86%, transparent 100%)'
      }}
    >
      {/* Layer 0: Canvas (ECG waveforms, DNA helix, floating cells & molecules) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Layer 1: Faint breathing logo watermark (above ECG canvas, below hero text) */}
      <img
        ref={watermarkRef}
        src={LAUMED_LOGO_SRC}
        alt=""
        aria-hidden="true"
        style={{ opacity: HERO_BG_CONFIG.watermarkOpacity }}
        className={`absolute z-[1] w-36 h-36 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl object-contain transition-opacity ${
          reducedMotion ? '' : 'duration-150'
        } ${watermarkPositionClasses}`}
      />
    </div>
  );
};
