'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface Sign {
  id: number;
  title: string;
  description: string;
  reference: string;
  status: 'past' | 'present' | 'future';
}

const signs: Sign[] = [
  {
    id: 1,
    title: "The Barefoot Shepherds",
    description: "You will see barefoot, naked, destitute shepherds competing in constructing tall buildings.",
    reference: "Sahih Muslim 8",
    status: 'past'
  },
  {
    id: 2,
    title: "Knowledge Diminishes",
    description: "Religious knowledge will be taken away and ignorance will prevail.",
    reference: "Sahih al-Bukhari 80",
    status: 'present'
  },
  // Add more signs...
];

export default function SignsTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create the main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
        },
      });

      // Animate each sign along the path
      signs.forEach((_, index) => {
        const signEl = `.sign-${index}`;
        const progress = index / (signs.length - 1);

        tl.from(signEl, {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start: progress,
            end: progress,
          },
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        }, index ? "-=0.5" : 0);
      });

      // Floating animation for background elements
      gsap.to(".floating-bg", {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        rotation: "random(-20, 20)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0A0A0F] overflow-hidden">
      {/* SVG Path for animation */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1000 1000"
        style={{ opacity: 0.1 }}
      >
        <path
          ref={pathRef}
          d="M100,500 C100,300 300,100 500,100 C700,100 900,300 900,500 C900,700 700,900 500,900 C300,900 100,700 100,500"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Signs */}
      {signs.map((sign, index) => (
        <div
          key={sign.id}
          className={`sign-${index} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >
          <div className="relative group">
            {/* Glowing orb */}
            <div
              className="absolute inset-0 rounded-full blur-lg"
              style={{
                background: `radial-gradient(circle at center,
                  ${sign.status === 'past' ? 'var(--primary)' : 
                    sign.status === 'present' ? 'var(--secondary)' : 
                    'white'} 0%,
                  transparent 70%)`,
                opacity: 0.3,
              }}
            />

            {/* Sign content */}
            <div className="relative p-6 w-80 bg-white/5 backdrop-blur-lg rounded-xl
              border border-white/10 transform transition-all duration-300
              group-hover:scale-105 group-hover:border-primary/30"
            >
              <h3 className="text-2xl font-bold mb-3 text-gradient">{sign.title}</h3>
              <p className="text-gray-300 mb-2">{sign.description}</p>
              <span className="text-sm text-gray-400 italic">{sign.reference}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Floating background elements */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="floating-bg absolute opacity-5"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            className="text-primary"
          >
            <path
              d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
