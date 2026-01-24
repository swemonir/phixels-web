import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { reviews3 } from '../constants/common';
export function CaseStudyReviews() {
  return <section className="py-24 bg-[#050505] overflow-hidden relative">
    {/* Background Elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[color:var(--deep-navy)]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[color:var(--deep-red)]/10 rounded-full blur-[120px]" />
    </div>

    <div className="container mx-auto px-4 mb-16 relative z-10">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Trusted by Visionaries
        </h2>
        <p className="text-gray-400 text-lg">
          Don't just take our word for it. Here's what our partners have to
          say about their journey with us.
        </p>
      </div>
    </div>

    {/* Auto-scrolling Carousel - Right to Left */}
    <div className="relative w-full overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

      <motion.div className="flex gap-6 py-4" animate={{
        x: ['0%', '-50%']
      }} transition={{
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 40,
          ease: 'linear'
        }
      }}>
        {[...reviews3, ...reviews3, ...reviews3].map((review, index) => <motion.div key={`${review.id}-${index}`} className="flex-shrink-0 w-[380px] md:w-[420px] p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 backdrop-blur-sm relative group cursor-pointer" whileHover={{
          scale: 1.02,
          y: -4
        }} transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}>
          {/* Gradient Border on Hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />

          {/* Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(review.rating)].map((_, i) => <motion.div key={i} initial={{
              opacity: 0,
              scale: 0
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: i * 0.1
            }}>
              <Star size={18} className="fill-[color:var(--neon-yellow)] text-[color:var(--neon-yellow)]" />
            </motion.div>)}
          </div>

          {/* Review Content */}
          <p className="text-gray-300 mb-8 leading-relaxed text-base">
            "{review.content}"
          </p>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            {/* Profile Image with Gradient Border */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#0A0A0A]" />
              </div>
              <img src={review.image} alt={review.name} className="relative w-14 h-14 rounded-full object-cover border-2 border-transparent" style={{
                background: 'linear-gradient(135deg, var(--bright-red), var(--neon-yellow), var(--vibrant-green))',
                padding: '2px'
              }} />
            </div>

            <div>
              <div className="text-white font-bold text-base">
                {review.name}
              </div>
              <div className="text-sm text-[color:var(--bright-red)] font-medium">
                {review.role}
              </div>
            </div>
          </div>
        </motion.div>)}
      </motion.div>
    </div>
  </section>;
}