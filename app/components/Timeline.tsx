'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Sign {
  id: number;
  title: string;
  description: string;
  year: string;
}

const signs: Sign[] = [
  {
    id: 1,
    title: "The Minor Signs",
    description: "The emergence of widespread moral decay, increased materialism, and the loss of religious values mark the beginning of the minor signs.",
    year: "Present Day"
  },
  {
    id: 2,
    title: "The False Prophets",
    description: "The appearance of thirty false prophets, each claiming to be a messenger of Allah, will mislead many from the true path.",
    year: "Near Future"
  },
  {
    id: 3,
    title: "Global Upheaval",
    description: "Natural disasters will increase, time will pass more quickly, and chaos will spread throughout the world.",
    year: "Approaching"
  },
  {
    id: 4,
    title: "The Major Signs",
    description: "The sun will rise from the west, marking the beginning of the major signs and the final chapter of human history.",
    year: "Final Era"
  }
];

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => {
      timelineItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <section ref={timelineRef} className="timeline-container">
      <div className="timeline-track" />
      
      {signs.map((sign) => (
        <div key={sign.id} className="timeline-item">
          <div className="timeline-content">
            <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              {sign.title}
            </h3>
            <div className="text-sm text-gray-400 mb-2">{sign.year}</div>
            <p className="text-gray-200">{sign.description}</p>
          </div>
          
          <div className="timeline-dot" />
          <div className="timeline-line" />
        </div>
      ))}
    </section>
  );
}
