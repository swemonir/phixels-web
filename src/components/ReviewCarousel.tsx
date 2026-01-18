import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
const reviews = [{
  id: 1,
  name: 'Sarah Jenkins',
  role: 'CTO, FinTech Global',
  image: "/sarah-mitchell.webp",
  text: 'Phixels transformed our legacy system into a modern powerhouse. Revenue increased by 40% in just 3 months after launch. Their engineering team is world-class.',
  rating: 5
}, {
  id: 2,
  name: 'Michael Chang',
  role: 'Founder, HealthAI',
  image: "/michael-chen.webp",
  text: 'The AI integration they built for our diagnostic tool is revolutionary. We secured Series A funding solely based on the MVP Phixels delivered.',
  rating: 5
}, {
  id: 3,
  name: 'Elena Rodriguez',
  role: 'VP of Product, E-Comm Giant',
  image: "/elena-rodiguezr.webp",
  text: 'Scalability was our biggest issue. Phixels re-architected our backend to handle 10M+ concurrent users without a glitch during Black Friday.',
  rating: 5
}, {
  id: 4,
  name: 'David Wright',
  role: 'Director, BlockChain Solutions',
  image: "/david-park.webp",
  text: 'Their understanding of Smart Contracts and DeFi protocols is unmatched. They delivered a secure, audited platform ahead of schedule.',
  rating: 5
}, {
  id: 5,
  name: 'Jessica Lee',
  role: 'CEO, OnDemand App',
  image: "/jessica.webp",
  text: 'From concept to app store in 12 weeks. The UI/UX is stunning, and user retention is up 200% compared to our old app.',
  rating: 5
}, {
  id: 6,
  name: 'Robert Fox',
  role: 'Head of Innovation, AutoTech',
  image: "/robert-anderson.webp",
  text: 'We needed a partner who could understand complex IoT requirements. Phixels delivered a robust solution that connects thousands of devices seamlessly.',
  rating: 5
}, {
  id: 7,
  name: 'Amanda Chen',
  role: 'Marketing Director, SaaS Co',
  image: "/amanda-foster.webp",
  text: 'Their web development team is incredible. Our new site is blazing fast, SEO optimized, and conversion rates have doubled.',
  rating: 5
}];
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