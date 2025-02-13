'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const IslamicPattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Pattern parameters
    const gridSize = 50;
    const patternSize = 100;
    const time = { value: 0 };

    // Animation function
    const drawPattern = () => {
      ctx.fillStyle = '#0A0A0F';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each cell
      for (let x = 0; x < canvas.width + patternSize; x += patternSize) {
        for (let y = 0; y < canvas.height + patternSize; y += patternSize) {
          ctx.save();
          ctx.translate(x, y);

          // Create Islamic star pattern
          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI / 4) * i + time.value;
            const radius = patternSize * 0.4;
            const innerRadius = radius * 0.4;

            ctx.moveTo(
              Math.cos(angle) * radius,
              Math.sin(angle) * radius
            );

            const controlAngle1 = angle + Math.PI / 8;
            const controlAngle2 = angle - Math.PI / 8;

            ctx.quadraticCurveTo(
              Math.cos(controlAngle1) * innerRadius,
              Math.sin(controlAngle1) * innerRadius,
              Math.cos(angle + Math.PI / 4) * radius,
              Math.sin(angle + Math.PI / 4) * radius
            );
          }
          ctx.closePath();

          // Create gradient
          const gradient = ctx.createLinearGradient(
            -patternSize/2, -patternSize/2,
            patternSize/2, patternSize/2
          );
          gradient.addColorStop(0, `rgba(255, 215, 0, ${0.1 + Math.sin(time.value) * 0.05})`);
          gradient.addColorStop(1, `rgba(255, 69, 0, ${0.1 + Math.cos(time.value) * 0.05})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.restore();
        }
      }
    };

    // Animation loop
    gsap.to(time, {
      value: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: "none",
      onUpdate: drawPattern
    });

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30"
    />
  );
};

export default IslamicPattern;
