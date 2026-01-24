import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';
import { Review } from '../constants/common';


export function ProfessionalReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Review.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-24 bg-[#050505] text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Empowered by Our Clients' Stories
          </h2>
          <p className="text-gray-400 text-lg">
            Discover the impact of our expertise through their words.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full max-w-7xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[600px] md:min-h-[450px] bg-[#0A0A0A] rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}

                // --- FAST DRAG LOGIC ---
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.02}
                onDragEnd={(e, { offset }) => {
                  const swipeThreshold = 10;
                  if (offset.x < -swipeThreshold) {
                    setCurrentIndex((prev) => (prev + 1) % Review.length);
                  } else if (offset.x > swipeThreshold) {
                    setCurrentIndex((prev) => (prev - 1 + Review.length) % Review.length);
                  }
                }}

                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}

                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-full items-center cursor-grab active:cursor-grabbing"
              >
                <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 select-none">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl font-bold text-white leading-none">
                      {Review[currentIndex].rating}
                    </span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-[color:var(--bright-red)] text-sm font-bold tracking-wider uppercase">
                      The Review
                    </span>
                  </div>

                  <blockquote className="mb-8 relative">
                    <p className="text-gray-300 text-lg italic leading-relaxed font-light">
                      "{Review[currentIndex].review}"
                    </p>
                  </blockquote>

                  <div className="mt-auto border-t border-white/10 pt-6">
                    <h4 className="text-white font-bold text-lg">
                      {Review[currentIndex].name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {Review[currentIndex].role}
                    </p>
                  </div>
                </div>

                {/* Center Column: Image */}
                <div className="lg:col-span-3 flex justify-center items-center order-1 lg:order-2 select-none">
                  <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group ring-4 ring-white pointer-events-none">
                    <img src={Review[currentIndex].image} alt={Review[currentIndex].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                  </div>
                </div>

                {/* Right Column: Project Info */}
                <div className="lg:col-span-4 flex flex-col justify-center order-3 select-none">
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    {Review[currentIndex].project}
                  </h3>

                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full">
                      <CheckCircle size={14} className="text-blue-400" />
                      <span className="text-blue-400 text-xs font-semibold uppercase tracking-wide">
                        Verified Review
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-[color:var(--bright-red)] text-xs font-bold uppercase tracking-wider mb-2">
                        Project Summary
                      </h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {Review[currentIndex].summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-[color:var(--bright-red)] text-xs font-bold uppercase tracking-wider mb-1">
                          Budget
                        </h5>
                        <p className="text-white font-medium text-sm">
                          {Review[currentIndex].budget}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-[color:var(--bright-red)] text-xs font-bold uppercase tracking-wider mb-1">
                          Duration
                        </h5>
                        <p className="text-white font-medium text-sm">
                          {Review[currentIndex].duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {Review.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-[color:var(--bright-red)]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}