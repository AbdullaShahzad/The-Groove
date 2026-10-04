import React, { useEffect, useRef } from 'react';

interface AtmosphericLumosProps {
  active: boolean;
}

export const AtmosphericLumos: React.FC<AtmosphericLumosProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Refined, subtle golden floating embers (Lumos motes)
    const particleCount = Math.min(36, Math.floor(width / 45));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * -0.45 - 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.phase) * 0.35 + p.speedX;
        p.phase += p.pulseSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = Math.max(0.05, p.opacity + Math.sin(p.phase) * 0.2);

        // Soft radial glow for ember
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
        grad.addColorStop(0, `rgba(255, 235, 170, ${currentOpacity})`);
        grad.addColorStop(0.4, `rgba(212, 175, 55, ${currentOpacity * 0.6})`);
        grad.addColorStop(1, 'rgba(116, 0, 1, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Core bright point
        ctx.fillStyle = `rgba(255, 250, 230, ${currentOpacity * 0.85})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.75, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none transition-opacity duration-1000 ease-out">
      {/* Warm atmospheric vignette for cinematic Great Hall depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45 mix-blend-multiply"
        style={{
          background:
            'radial-gradient(circle at 50% 25%, transparent 35%, rgba(60, 8, 12, 0.4) 75%, rgba(20, 0, 2, 0.75) 100%)',
        }}
      />
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
    </div>
  );
};
