'use client';

import Hero from './components/Hero';
import ProgressTimeline from './components/ProgressTimeline';

export default function Home() {
  return (
    <main className="relative min-h-screen space-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="star-field" />
      </div>
      
      <div className="relative z-10">
        <Hero />
        <ProgressTimeline />
      </div>
    </main>
  );
}