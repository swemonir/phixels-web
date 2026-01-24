import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';
import { sitemapData } from '../constants/common';
export function SitemapPage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  return <main className="bg-[#050505] min-h-screen pt-40 pb-20 overflow-hidden">
    {/* Animated Background */}
    <div className="fixed inset-0 pointer-events-none">
      <motion.div animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }} className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[color:var(--bright-red)] rounded-full blur-[150px]" />
      <motion.div animate={{
        scale: [1, 1.3, 1],
        opacity: [0.15, 0.25, 0.15]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1
      }} className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[color:var(--neon-yellow)] rounded-full blur-[150px]" />
      <motion.div animate={{
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.3, 0.2]
      }} transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 2
      }} className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[color:var(--vibrant-green)] rounded-full blur-[150px]" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      {/* Hero Section */}
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <Sparkles className="w-4 h-4 text-[color:var(--neon-yellow)]" />
          <span className="text-sm text-gray-300">Site Navigation</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Explore{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] animate-gradient bg-300%">
            Phixels
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Your complete guide to navigating our website. Discover all our
          pages and services in one place.
        </p>
      </motion.div>

      {/* Interactive Sitemap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {sitemapData.map((section, index) => <motion.div key={section.category} initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} onHoverStart={() => setHoveredCategory(section.category)} onHoverEnd={() => setHoveredCategory(null)} className="group relative">
          {/* Card */}
          <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden">
            {/* Animated gradient background */}
            <motion.div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} animate={hoveredCategory === section.category ? {
              scale: [1, 1.2, 1]
            } : {}} transition={{
              duration: 2,
              repeat: Infinity
            }} />

            {/* Icon */}
            <motion.div animate={hoveredCategory === section.category ? {
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            } : {}} transition={{
              duration: 0.5
            }} className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-6 relative z-10`}>
              <section.icon className="w-8 h-8 text-white" />
            </motion.div>

            {/* Category Title */}
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">
              {section.category}
            </h2>

            {/* Links */}
            <div className="space-y-2 relative z-10">
              <AnimatePresence>
                {section.links.map((link, linkIndex) => <motion.div key={link.name} initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: linkIndex * 0.05
                }}>
                  {link.external ? <a href={link.path} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all group/link">
                    <span className="text-sm">{link.name}</span>
                    <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a> : <Link to={link.path} className="flex items-center justify-between p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all group/link">
                    <span className="text-sm">{link.name}</span>
                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                  </Link>}
                </motion.div>)}
              </AnimatePresence>
            </div>

            {/* Hover indicator */}
            <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50" animate={hoveredCategory === section.category ? {
              x: ['-100%', '100%']
            } : {}} transition={{
              duration: 1.5,
              repeat: Infinity
            }} />
          </div>
        </motion.div>)}
      </div>

      {/* Quick Stats */}
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {[{
          label: 'Total Pages',
          value: '20+'
        }, {
          label: 'Service Categories',
          value: '7'
        }, {
          label: 'Products',
          value: '12'
        }, {
          label: 'Case Studies',
          value: '10+'
        }].map((stat, i) => <motion.div key={i} initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: i * 0.1
        }} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[color:var(--bright-red)] transition-colors">
          <div className="text-3xl font-bold text-white mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </motion.div>)}
      </motion.div>

      {/* CTA */}
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center p-12 rounded-3xl bg-white/5 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-4">
          Can't Find What You're Looking For?
        </h2>
        <p className="text-gray-400 mb-8">
          Our team is here to help you navigate and find exactly what you
          need.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[color:var(--bright-red)] text-white font-bold hover:bg-[color:var(--bright-red)]/90 transition-colors">
          Contact Us <Mail size={18} />
        </Link>
      </motion.div>
    </div>
  </main>;
}