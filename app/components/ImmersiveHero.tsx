'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImmersiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial loading animation
      const tl = gsap.timeline();
      
      // Create a dramatic entrance
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 2,
        ease: "power4.inOut"
      })
      .from(".arabic-pattern", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "back.out(1.7)",
      }, "-=1.5")
      .from(".glow-orb", {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "elastic.out(1, 0.3)",
      }, "-=1");

      // Animate title letters
      const titleChars = titleRef.current?.querySelectorAll('.char');
      tl.from(titleChars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "back.out(1.7)",
      }, "-=0.5");

      // Animate subtitle words
      const subtitleWords = subtitleRef.current?.querySelectorAll('.word');
      tl.from(subtitleWords, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      }, "-=0.5");

      // Floating animation for patterns
      gsap.to(".arabic-pattern", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random",
        },
      });

      // Glowing orbs animation
      gsap.to(".glow-orb", {
        scale: "random(0.8, 1.2)",
        opacity: "random(0.4, 1)",
        duration: "random(1, 2)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 1,
          from: "random",
        },
      });

      // Parallax scrolling effect
      gsap.to(".parallax-bg", {
        y: (i, el) => -ScrollTrigger.maxScroll(window) * Number(el.dataset.speed),
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split text into spans for animation
  const titleText = "Signs of The Hour";
  const subtitleText = "Witness the prophesied signs of the Day of Judgment through an immersive journey that transcends time";

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-[#0A0A0F]">
      {/* Loading overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-black z-50" />

      {/* Parallax background layers */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="parallax-bg absolute inset-0"
            data-speed={0.1 * (i + 1)}
          >
            {/* Arabic patterns */}
            {[...Array(3)].map((_, j) => (
              <div
                key={j}
                className="arabic-pattern absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.1,
                }}
              >
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  className="text-primary opacity-20"
                >
                  <path
                    d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Glowing orbs */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="glow-orb absolute w-4 h-4 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle at center, 
              ${i % 2 ? 'var(--primary)' : 'var(--secondary)'} 0%,
              transparent 70%)`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1
          ref={titleRef}
          className="text-8xl md:text-9xl font-bold mb-8 leading-none"
        >
          {titleText.split('').map((char, i) => (
            <span key={i} className="char inline-block text-gradient">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          {subtitleText.split(' ').map((word, i) => (
            <span key={i} className="word inline-block">
              {word}&nbsp;
            </span>
          ))}
        </p>

        <button
          className="mt-12 px-8 py-4 bg-gradient-to-r from-primary to-secondary
            rounded-full text-white font-bold text-lg relative overflow-hidden
            group transition-transform duration-300 hover:scale-105"
        >
          <span className="relative z-10">Begin the Journey</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
}
