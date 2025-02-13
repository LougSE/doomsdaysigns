'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create stars
    const starCount = 100;
    const stars: HTMLDivElement[] = [];

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      stars.push(star);
      container.appendChild(star);
    }

    // Handle scroll effect
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollingDown = window.scrollY > lastScrollY;
      lastScrollY = window.scrollY;

      // Add appropriate scrolling class to create trail effect
      stars.forEach(star => {
        star.classList.remove('scrolling-up', 'scrolling-down');
        star.classList.add(scrollingDown ? 'scrolling-down' : 'scrolling-up');
      });

      // Clear the timeout if it exists
      if (scrollTimeout) clearTimeout(scrollTimeout);

      // Set new timeout to remove scrolling classes
      scrollTimeout = setTimeout(() => {
        stars.forEach(star => {
          star.classList.remove('scrolling-up', 'scrolling-down');
        });
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      stars.forEach(star => star.remove());
    };
  }, []);

  const handleExploreClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div 
      ref={containerRef} 
      style={{ opacity }}
      className="relative h-screen flex flex-col items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary">
            Signs of
          </span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary/80 to-primary mt-2">
            The Hour
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Journey through time to witness the prophesied signs of the Day of Judgment
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            onClick={handleExploreClick}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold text-lg hover:scale-105 transition-transform"
          >
            Explore the Signs
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={handleExploreClick}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-primary/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-primary/50 rounded-full mt-1"
          />
        </motion.div>
        <span className="mt-2 text-sm text-gray-400">Scroll to Explore</span>
      </motion.div>
    </motion.div>
  );
}
