'use client';
import { useEffect, useRef } from 'react';
// Effects
export default function WeatherEffects({ theme, color }: { theme: string; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;
    const isRainy = theme.includes('rain') || theme.includes('drizzle') || theme.includes('thunder');
    
    // Particle Generator
    class Particle {
      x: number; y: number; speed: number; size: number; length: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.speed = isRainy ? Math.random() * 5 + 4 : Math.random() * 0.5 + 0.2;
        this.size = isRainy ? Math.random() * 1 + 1 : Math.random() * 2 + 1;
        this.length = isRainy ? Math.random() * 20 + 10 : 0;
      }

      update() {
        this.y += this.speed;
        if (!isRainy) this.x += Math.sin(this.y / 50) * 0.5;
        if (this.y > canvas!.height) {
          this.y = -20;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();

        if (isRainy) {
          ctx.strokeStyle = color;
          ctx.lineWidth = this.size;
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y + this.length);
          ctx.stroke();
        } else {
          ctx.fillStyle = color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = color;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    const init = () => {
      particles = [];
      const count = isRainy ? 150 : 60;
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [theme, color]); 

  // Canvas
  return (
    <canvas
  ref={canvasRef}
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: -1,
  }}
/>
  );
}