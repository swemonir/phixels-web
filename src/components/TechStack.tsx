import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
const technologies = ['React', 'Node.js', 'Python', 'Swift', 'Kotlin', 'Flutter', 'Next.js', 'Laravel', 'Django', 'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'PyTorch', 'Solidity', 'Web3', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'TypeScript', 'Vue.js', 'Angular', 'Rust', 'Go', 'Figma'];
export function TechStack() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  return <section className="py-32 relative overflow-hidden">
    {/* Hero-like Background Effects */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[color:var(--deep-navy)] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[color:var(--deep-red)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" style={{
        animationDelay: '1s'
      }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-20">
        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--bright-red)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--bright-red)]"></span>
          </span>
          <span className="text-sm text-gray-300">Our Tech Arsenal</span>
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          Technologies We{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)]">
            Master
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Cutting-edge tools and frameworks that power our solutions. Drag to
          explore or hover to pause.
        </p>
      </motion.div>

      {/* Full-width container with edge shadows */}
      <div className="relative -mx-4 md:-mx-8 lg:-mx-12 flex flex-col gap-4">
        {/* Left shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Right shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Horizontal Scrolling Row 1 - Left to Right */}
        <div className="overflow-hidden py-2" ref={constraintsRef} onMouseEnter={() => setHoveredRow(1)} onMouseLeave={() => setHoveredRow(null)}>
          <motion.div className="flex gap-4 cursor-grab active:cursor-grabbing" drag="x" dragConstraints={constraintsRef} onDragStart={() => setIsDragging(true)} onDragEnd={() => setIsDragging(false)} animate={hoveredRow !== 1 && !isDragging ? {
            x: [0, -2000]
          } : {}} transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear'
            }
          }} style={{
            width: 'max-content'
          }}>
            {[...technologies, ...technologies, ...technologies].map((tech, index) => <motion.div key={`row1-${index}`} whileHover={{
              scale: 1.05,
              y: -5,
              zIndex: 10
            }} className="px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold text-lg whitespace-nowrap hover:border-[color:var(--bright-red)] hover:bg-white/10 transition-all select-none">
              {tech}
            </motion.div>)}
          </motion.div>
        </div>

        {/* Horizontal Scrolling Row 2 - Right to Left */}
        <div className="overflow-hidden py-2" onMouseEnter={() => setHoveredRow(2)} onMouseLeave={() => setHoveredRow(null)}>
          <motion.div className="flex gap-4 cursor-grab active:cursor-grabbing" drag="x" dragConstraints={constraintsRef} onDragStart={() => setIsDragging(true)} onDragEnd={() => setIsDragging(false)} animate={hoveredRow !== 2 && !isDragging ? {
            x: [-2000, 0]
          } : {}} transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear'
            }
          }} style={{
            width: 'max-content'
          }}>
            {[...technologies, ...technologies, ...technologies].map((tech, index) => <motion.div key={`row2-${index}`} whileHover={{
              scale: 1.05,
              y: -5,
              zIndex: 10
            }} className="px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold text-lg whitespace-nowrap hover:border-[color:var(--neon-yellow)] hover:bg-white/10 transition-all select-none">
              {tech}
            </motion.div>)}
          </motion.div>
        </div>
      </div>

      {/* Bottom decoration */}
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="mt-20 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
          <span className="text-sm text-gray-400">
            Hover to pause • Drag to explore
          </span>
        </div>
      </motion.div>
    </div>
  </section>;
}