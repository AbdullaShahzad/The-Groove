import React, { useState, useEffect, useRef } from 'react';

interface GoldenSnitchProps {
  onCatch?: (points: number) => void;
}

export const GoldenSnitch: React.FC<GoldenSnitchProps> = ({ onCatch }) => {
  const snitchRef = useRef<HTMLDivElement>(null);
  const [isDarting, setIsDarting] = useState(false);
  const [isEvading, setIsEvading] = useState(false);
  const [evadeOffset, setEvadeOffset] = useState({ x: 0, y: 0 });
  const [showToast, setShowToast] = useState(false);

  // Active cursor evasion: snitch detects user's cursor within 140px and runs away
  useEffect(() => {
    let lastEvadeTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!snitchRef.current || isDarting) return;
      const rect = snitchRef.current.getBoundingClientRect();
      const snitchCenterX = rect.left + rect.width / 2;
      const snitchCenterY = rect.top + rect.height / 2;

      const distX = e.clientX - snitchCenterX;
      const distY = e.clientY - snitchCenterY;
      const distance = Math.hypot(distX, distY);

      const now = Date.now();
      // If cursor gets close (< 140px), snitch detects user's hand and actively darts away in opposite direction
      if (distance < 140 && now - lastEvadeTime > 320) {
        lastEvadeTime = now;
        const angle = Math.atan2(distY, distX);
        const pushDistance = 95;
        const pushX = -Math.cos(angle) * pushDistance;
        const pushY = -Math.sin(angle) * pushDistance;

        setEvadeOffset({ x: pushX, y: pushY });
        setIsEvading(true);

        setTimeout(() => {
          setEvadeOffset({ x: 0, y: 0 });
          setIsEvading(false);
        }, 550);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDarting]);

  // Subtle magical chime and whoosh sound synthesized via Web Audio API
  const playSnitchSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Magical pentatonic high chimes: E6 (1318Hz), G#6 (1661Hz), B6 (1975Hz), D#7 (2489Hz), E7 (2637Hz)
      const frequencies = [1318.5, 1661.2, 1975.5, 2489.0, 2637.0];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.6);
      });

      // Air flutter & whoosh sound
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.frequency.exponentialRampToValueAtTime(4800, now + 0.3);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
    } catch (e) {
      console.debug('Snitch audio context init:', e);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 1. Play subtle chime & whoosh sound effect
    playSnitchSound();

    // 2. Trigger quick dart across the screen
    setIsDarting(true);
    setShowToast(true);
    
    // 3. Award 5 house points!
    if (onCatch) {
      onCatch(5);
    }

    // 4. Return to normal flight path after darting
    setTimeout(() => {
      setIsDarting(false);
    }, 1250);

    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  return (
    <>
      {/* Subtle Toast Banner when clicked and darting */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#16120E]/95 backdrop-blur-md border border-[#A88A45] text-[#FAF8F5] px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center gap-2.5 animate-fadeIn select-none pointer-events-none">
          <span className="text-sm font-serif text-[#A88A45]">✦</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#A88A45] uppercase tracking-wider">
              +5 HOUSE POINTS
            </span>
            <span className="text-xs text-[#FAF8F5] font-serif italic">
              · Golden Snitch Captured!
            </span>
          </div>
          <span className="text-xs text-[#A88A45]">✦</span>
        </div>
      )}

      {/* 
        SCREEN-WIDE BIOLOGICAL FLYING CONTAINER
        - Flies everywhere across the screen with irregular speed variations
        - Actively dodges & runs away from cursor when approached
        - Subtle hover-wobble gives organic insect/hummingbird movement
      */}
      <div
        ref={snitchRef}
        className="fixed z-40 select-none cursor-pointer pointer-events-auto"
        style={{
          animation: isDarting
            ? 'snitch-dart 1.25s cubic-bezier(0.2, 0.9, 0.3, 1.2) forwards'
            : 'snitch-flight 24s ease-in-out infinite',
        }}
        onClick={handleClick}
        title="Catch the Golden Snitch!"
      >
        {/* Evasive Juke Layer & Biological Hover-Flight Wobble */}
        <div
          className="relative transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${evadeOffset.x}px, ${evadeOffset.y}px, 0)`,
          }}
        >
          <div
            className="relative group"
            style={{
              animation: 'snitch-wobble 1.6s ease-in-out infinite',
            }}
          >
            {/* Subtle Golden Lumos Glow Aura */}
            <div className="absolute inset-0 bg-[#D4AF37]/25 rounded-full blur-sm animate-pulse pointer-events-none -m-1" />

            {/* Golden Sparkles Trail when darting or evading */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-none opacity-75">
              <span className={`w-1 h-1 rounded-full bg-[#FFF3B0] blur-[0.3px] ${isEvading || isDarting ? 'animate-ping' : ''}`} />
              <span className="w-0.5 h-0.5 rounded-full bg-[#E2C26E] animate-pulse" />
            </div>

            {/* Decreased Size SVG: w-14 sm:w-16 md:w-20 */}
            <svg
              viewBox="0 0 240 140"
              className={`w-14 sm:w-16 md:w-20 h-auto drop-shadow-[0_2px_8px_rgba(212,175,55,0.45)] transition-transform duration-200 group-hover:scale-110 active:scale-95 ${
                isEvading ? 'scale-115 rotate-12' : ''
              }`}
              fill="none"
            >
              {/* DEFINITIONS FOR GRADIENTS & FILIGREE */}
              <defs>
                <radialGradient id="snitchBallGradSmall" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#FFF7D6" />
                  <stop offset="30%" stopColor="#F5D77F" />
                  <stop offset="70%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8A5A12" />
                </radialGradient>

                <linearGradient id="snitchWingGradSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF9E0" />
                  <stop offset="40%" stopColor="#F5D77F" />
                  <stop offset="80%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#9C6B19" />
                </linearGradient>

                <filter id="goldShineSmall">
                  <feGaussianBlur stdDeviation="0.6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* LEFT WING with rapid high-speed flutter */}
              <g
                className="origin-[105px_70px]"
                style={{
                  animation: isDarting || isEvading
                    ? 'snitch-wing-left 0.08s ease-in-out infinite alternate'
                    : 'snitch-wing-left 0.15s ease-in-out infinite alternate',
                }}
              >
                <path
                  d="M 105,68 C 90,45 60,18 20,24 C 42,32 68,52 102,73"
                  stroke="url(#snitchWingGradSmall)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="
                    M 23,26 L 27,42
                    M 29,27 L 34,48
                    M 36,29 L 42,54
                    M 44,31 L 50,59
                    M 52,34 L 59,64
                    M 61,37 L 69,68
                    M 71,41 L 79,71
                    M 81,46 L 89,73
                    M 92,52 L 98,74
                  "
                  stroke="url(#snitchWingGradSmall)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 105,68 C 90,45 60,18 20,24 C 42,32 68,52 102,73 Z"
                  fill="rgba(245, 215, 127, 0.12)"
                />
              </g>

              {/* RIGHT WING with rapid high-speed flutter */}
              <g
                className="origin-[135px_70px]"
                style={{
                  animation: isDarting || isEvading
                    ? 'snitch-wing-right 0.08s ease-in-out infinite alternate'
                    : 'snitch-wing-right 0.15s ease-in-out infinite alternate',
                }}
              >
                <path
                  d="M 135,68 C 150,45 180,35 225,50 C 200,60 170,72 138,73"
                  stroke="url(#snitchWingGradSmall)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="
                    M 142,72 L 148,56
                    M 152,70 L 159,52
                    M 163,68 L 171,49
                    M 174,65 L 183,46
                    M 186,62 L 195,44
                    M 198,59 L 206,44
                    M 210,55 L 216,46
                  "
                  stroke="url(#snitchWingGradSmall)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 135,68 C 150,45 180,35 225,50 C 200,60 170,72 138,73 Z"
                  fill="rgba(245, 215, 127, 0.12)"
                />
              </g>

              {/* CENTRAL GOLDEN SNITCH BALL */}
              <g>
                <circle
                  cx="120"
                  cy="75"
                  r="22"
                  fill="url(#snitchBallGradSmall)"
                  stroke="#B8860B"
                  strokeWidth="0.8"
                  filter="url(#goldShineSmall)"
                />

                {/* Upper Filigree Arcs */}
                <path
                  d="M 103,66 C 112,60 128,60 137,66"
                  stroke="#8A5A12"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.85"
                />
                <path
                  d="M 101,72 C 112,66 128,66 139,72"
                  stroke="#8A5A12"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.85"
                />

                {/* Equatorial Seam */}
                <path
                  d="M 99,78 C 112,74 128,74 141,78"
                  stroke="#734A0D"
                  strokeWidth="1.2"
                  fill="none"
                />

                {/* Lower Runic Swirls */}
                <path
                  d="M 102,83 C 110,88 120,92 120,96"
                  stroke="#8A5A12"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.9"
                />
                <path
                  d="M 138,83 C 130,88 120,92 120,96"
                  stroke="#8A5A12"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.9"
                />

                {/* Sunburst Center Bottom */}
                <circle cx="120" cy="92" r="1.5" fill="#5E3B08" />

                {/* Specular 3D Highlight Reflection */}
                <ellipse
                  cx="113"
                  cy="66"
                  rx="6"
                  ry="3.5"
                  transform="rotate(-25 113 66)"
                  fill="#FFFFFF"
                  opacity="0.65"
                />
                <circle cx="110" cy="64" r="1.8" fill="#FFFFFF" opacity="0.9" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
