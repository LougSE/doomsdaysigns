'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useSpring, animated } from '@react-spring/web';

interface TimelineItem {
  id: number;
  title: string;
  description: string;
  status: 'past' | 'present' | 'future';
  angle: number;
}

const signs: TimelineItem[] = [
  {
    id: 1,
    title: "Barefoot Shepherds",
    description: "Competing in building tall buildings",
    status: 'past',
    angle: 0
  },
  {
    id: 2,
    title: "Knowledge",
    description: "Decrease of knowledge and increase of ignorance",
    status: 'present',
    angle: Math.PI * 0.2
  },
  // Add more signs here
];

const SpiralTimeline = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSign, setActiveSign] = useState<TimelineItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const springProps = useSpring({
    scale: activeSign ? 1 : 0,
    opacity: activeSign ? 1 : 0,
    transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
    config: { tension: 300, friction: 20 }
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharp rendering
    const pixelRatio = window.devicePixelRatio || 1;
    const setCanvasSize = () => {
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Animation state
    const state = {
      rotation: 0,
      mouseX: 0,
      mouseY: 0
    };

    // Draw spiral function
    const drawSpiral = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / (2 * pixelRatio);
      const centerY = canvas.height / (2 * pixelRatio);

      // Draw main spiral
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      
      for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
        const radius = 50 + angle * 30;
        const x = centerX + Math.cos(angle + state.rotation) * radius;
        const y = centerY + Math.sin(angle + state.rotation) * radius;
        
        ctx.lineTo(x, y);
      }

      // Create gradient for spiral
      const gradient = ctx.createLinearGradient(
        centerX - 200, centerY - 200,
        centerX + 200, centerY + 200
      );
      gradient.addColorStop(0, '#FFD700');
      gradient.addColorStop(1, '#FF4500');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw signs along the spiral
      signs.forEach((sign, index) => {
        const angle = Math.PI * 0.5 * index + state.rotation;
        const radius = 100 + index * 50;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Draw glowing orb
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 30);
        glow.addColorStop(0, sign.status === 'past' ? 'rgba(255, 215, 0, 0.8)' : 
                            sign.status === 'present' ? 'rgba(255, 69, 0, 0.8)' : 
                            'rgba(255, 255, 255, 0.5)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();

        // Check if mouse is near this point
        const dx = state.mouseX - x;
        const dy = state.mouseY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 50) {
          setActiveSign(sign);
          setMousePos({ x: x + 20, y: y - 20 });
        }
      });
    };

    // Animation loop
    gsap.to(state, {
      rotation: Math.PI * 2,
      duration: 30,
      repeat: -1,
      ease: "none",
      onUpdate: drawSpiral
    });

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.mouseX = e.clientX - rect.left;
      state.mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
      />
      
      {/* Floating info card */}
      <animated.div
        style={springProps}
        className="absolute pointer-events-none"
      >
        {activeSign && (
          <div className="bg-black/80 backdrop-blur-lg p-4 rounded-lg border border-primary/30 w-64">
            <h3 className="text-xl font-bold text-gradient mb-2">{activeSign.title}</h3>
            <p className="text-sm text-gray-200">{activeSign.description}</p>
          </div>
        )}
      </animated.div>
    </div>
  );
};

export default SpiralTimeline;
