'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('./components/Globe'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-transparent to-[#0A0A0F] z-10" />
          <Image
            src="/mosque-bg.jpg"
            alt="Islamic Architecture"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF4500] bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
          >
            The Final Signs
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Witness where we stand in the prophesied signs of the Last Day
          </motion.p>
          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="#timeline"
              className="inline-block bg-gradient-to-r from-[#FFD700] to-[#FF4500] text-black font-bold px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              View Timeline
            </motion.a>
            <motion.a
              href="#current-signs"
              className="inline-block border-2 border-[#FFD700] text-[#FFD700] font-bold px-8 py-4 rounded-lg hover:bg-[#FFD700] hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Current Signs
            </motion.a>
          </motion.div>
        </motion.div>
      </header>

      {/* Globe Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#FFD700] to-[#FF4500] bg-clip-text text-transparent">
            Signs Around the World
          </h2>
          <Globe />
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="relative py-20 bg-[#0A0A0F]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#FFD700] to-[#FF4500] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Timeline of Signs
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FFD700] to-[#FF4500]" />
            
            <div className="space-y-24">
              {/* Past Signs */}
              <motion.div 
                className="relative flex items-center justify-between"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-2xl font-bold text-[#FFD700] mb-2">Past Signs</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="line-through opacity-70">✓ Barefoot shepherds competing in building tall buildings</li>
                    <li className="line-through opacity-70">✓ Spread of usury and interest</li>
                    <li className="line-through opacity-70">✓ Increase in literacy</li>
                  </ul>
                </div>
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#FFD700] rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <div className="w-5/12 pl-8" />
              </motion.div>

              {/* Current Signs */}
              <motion.div 
                id="current-signs" 
                className="relative flex items-center justify-between"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-5/12" />
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#FF4500] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <div className="w-5/12 pl-8">
                  <h3 className="text-2xl font-bold text-[#FF4500] mb-2">Current Signs</h3>
                  <ul className="space-y-2 text-gray-300">
                    {["Widespread earthquakes", "Time passing quickly", "Knowledge being taken away"].map((sign, index) => (
                      <motion.li 
                        key={sign}
                        className="flex items-center"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <motion.span 
                          className="inline-block w-2 h-2 bg-[#FF4500] rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                        />
                        {sign}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Future Signs */}
              <motion.div 
                className="relative flex items-center justify-between opacity-60"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 0.6, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-2xl font-bold text-gray-500 mb-2">Major Signs</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>The coming of Dajjal</li>
                    <li>The descent of Prophet Isa (AS)</li>
                    <li>The emergence of Yajuj and Majuj</li>
                    <li>Rising of the sun from the West</li>
                  </ul>
                </div>
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-500 rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <div className="w-5/12 pl-8" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Prophetic Guidance Section */}
      <motion.section 
        className="py-20 bg-gradient-to-b from-[#0A0A0F] to-[#1A1A1F]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-[#FFD700] to-[#FF4500] bg-clip-text text-transparent"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Prophetic Wisdom
          </motion.h2>
          <motion.blockquote 
            className="text-xl text-gray-300 italic"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            "When you see these signs, increase in worship and seek forgiveness, for these are among the signs that the Hour is near."
          </motion.blockquote>
          <motion.p 
            className="mt-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Based on various authentic hadiths
          </motion.p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#0A0A0F] text-center py-8 border-t border-[#FFD700]/20">
        <p className="text-gray-400">
          {new Date().getFullYear()} Islamic Eschatology | Developed with 
        </p>
      </footer>
    </div>
  );
}
