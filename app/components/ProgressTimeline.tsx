'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const signs = [
  {
    id: 7,
    year: 1400,
    title: "Early Signs",
    description: "The beginning of moral decay and the loss of religious knowledge."
  },
  {
    id: 6,
    year: 1800,
    title: "Industrial Revolution",
    description: "Rapid technological advancement and global changes in society."
  },
  {
    id: 5,
    year: 1950,
    title: "Modern Era",
    description: "Widespread materialism and the building of tall structures."
  },
  {
    id: 4,
    year: 2000,
    title: "Digital Age",
    description: "Knowledge becomes abundant but wisdom becomes rare."
  },
  {
    id: 3,
    year: "Present",
    title: "Current Times",
    description: "Time accelerates and natural disasters increase."
  },
  {
    id: 2,
    year: "Near Future",
    title: "Coming Events",
    description: "Major conflicts and significant global changes."
  },
  {
    id: 1,
    year: "Final Era",
    title: "Major Signs",
    description: "The sun rises from the west, marking the beginning of the end."
  }
];

export default function ProgressTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSign, setActiveSign] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate which sign to show based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const signIndex = Math.floor(value * (signs.length - 0.1));
      setActiveSign(Math.min(signIndex, signs.length - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const contentOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[300vh]">
      {/* Fixed timeline container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
        className="fixed top-0 right-0 w-24 h-screen flex items-center justify-center pointer-events-none"
      >
        <div className="relative h-[80vh] w-2">
          {/* Background track */}
          <div className="absolute inset-0 bg-white/10 rounded-full" />
          
          {/* Progress bar */}
          <motion.div 
            className="absolute top-0 w-full bg-gradient-to-b from-primary to-secondary rounded-full origin-top"
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />

          {/* Year markers */}
          {signs.map((sign, index) => {
            const markerProgress = index / (signs.length - 1);
            return (
              <div
                key={sign.id}
                className="absolute flex items-center"
                style={{ 
                  top: `${(index / (signs.length - 1)) * 100}%`,
                  right: 0,
                  width: '100%'
                }}
              >
                <motion.div 
                  className="absolute right-[calc(100%+1rem)] text-sm font-medium whitespace-nowrap"
                  style={{
                    color: useTransform(
                      scrollYProgress,
                      [markerProgress - 0.1, markerProgress],
                      ['rgba(255,255,255,0.4)', 'var(--primary)']
                    )
                  }}
                >
                  {sign.year}
                </motion.div>
                <motion.div 
                  className="absolute w-3 h-3 rounded-full -translate-y-1/2"
                  style={{
                    backgroundColor: useTransform(
                      scrollYProgress,
                      [markerProgress - 0.1, markerProgress],
                      ['rgba(255,255,255,0.4)', 'var(--primary)']
                    ),
                    left: '-2px'
                  }}
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Current sign display */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
      >
        <div className="max-w-2xl w-full px-4">
          <motion.div
            key={signs[activeSign].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              {signs[activeSign].title}
            </h2>
            <p className="text-2xl text-gray-300">
              {signs[activeSign].description}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
