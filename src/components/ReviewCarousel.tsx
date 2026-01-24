import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { reviews } from '../constants/common';

export function ReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoplay]);
  const next = () => {
    setAutoplay(false);
    setCurrent(prev => (prev + 1) % reviews.length);
  };
  const prev = () => {
    setAutoplay(false);
    setCurrent(prev => (prev - 1 + reviews.length) % reviews.length);
  };
  return <div className="relative bg-white/5 rounded-2xl p-6 border border-white/10">
    <div className="absolute top-4 right-4 text-white/10">
      <Quote size={40} />
    </div>

    <div className="relative h-[220px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} transition={{
          duration: 0.3
        }} className="h-full flex flex-col justify-between">
          <div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed italic mb-6">
              "{reviews[current].text}"
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--deep-navy)]">
                <img src={reviews[current].image} alt={reviews[current].name} className="w-full h-full rounded-full object-cover border-2 border-black" />
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-sm">
                {reviews[current].name}
              </div>
              <div className="text-[color:var(--bright-red)] text-xs font-medium">
                {reviews[current].role}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>

    {/* Controls */}
    <div className="flex justify-end gap-2 mt-4">
      <button onClick={prev} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
        <ChevronLeft size={16} />
      </button>
      <button onClick={next} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
        <ChevronRight size={16} />
      </button>
    </div>
  </div>;
}