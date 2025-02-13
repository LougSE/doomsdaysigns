'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const signs = [
  {
    id: 1,
    title: "The Barefoot Shepherds",
    description: "You will see barefoot, naked, destitute shepherds competing in constructing tall buildings.",
    reference: "Sahih Muslim 8",
    status: 'past',
    year: "Past"
  },
  {
    id: 2,
    title: "Knowledge Diminishes",
    description: "Religious knowledge will be taken away and ignorance will prevail.",
    reference: "Sahih al-Bukhari 80",
    status: 'present',
    year: "Present"
  },
  {
    id: 3,
    title: "Time Accelerates",
    description: "Time will pass rapidly, good deeds will decrease, and miserliness will be thrown into people's hearts.",
    reference: "Sahih al-Bukhari 7061",
    status: 'present',
    year: "Present"
  },
  {
    id: 4,
    title: "The Euphrates Uncovers Gold",
    description: "The Hour will not come to pass before the River Euphrates uncovers a mountain of gold.",
    reference: "Sahih Muslim 2894",
    status: 'future',
    year: "Future"
  },
  {
    id: 5,
    title: "The Coming of Dajjal",
    description: "The false messiah will appear and will remain on Earth for forty days.",
    reference: "Sahih Muslim 2937",
    status: 'future',
    year: "Future"
  }
];

export default function Signs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress into timeline progress
  const timelineProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  
  useEffect(() => {
    const updateTimeline = () => {
      if (!timelineRef.current) return;
      const progress = timelineProgress.get();
      timelineRef.current.style.width = `${progress * 100}%`;
    };

    const unsubscribe = timelineProgress.on('change', updateTimeline);
    return () => unsubscribe();
  }, [timelineProgress]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#0A0A0F] py-20">
      {/* Fixed timeline header */}
      <div className="sticky top-0 z-30 bg-[#0A0A0F]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-8"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              The Signs Unfold
            </span>
          </motion.h2>

          {/* Timeline progress bar */}
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              ref={timelineRef}
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Signs content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 w-full h-1 top-32 bg-white/10" />

          {/* Signs */}
          <div className="pt-16 space-y-48">
            {signs.map((sign, index) => (
              <motion.div
                key={sign.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-16">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary p-1">
                    <div className="w-full h-full rounded-full bg-[#0A0A0F]" />
                  </div>
                  <div className="mt-2 text-sm text-gray-400 text-center">
                    {sign.year}
                  </div>
                </div>

                {/* Card */}
                <div className={`w-[90%] md:w-[45%] ${
                  index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                }`}>
                  <div className="p-6 rounded-xl backdrop-blur-lg
                    bg-gradient-to-b from-white/10 to-white/5
                    border border-white/10 hover:border-primary/30
                    transform hover:scale-[1.02] transition-all duration-300
                    hover:shadow-2xl shadow-xl"
                  >
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent 
                      bg-gradient-to-r from-primary to-secondary mb-4"
                    >
                      {sign.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {sign.description}
                    </p>
                    <div className="text-sm text-gray-400 italic">
                      Reference: {sign.reference}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
