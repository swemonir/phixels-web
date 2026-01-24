import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Services } from '../constants/common';
export function ServicesGrid() {
  return <section className="py-24 bg-[#050505] relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[color:var(--deep-navy)] rounded-full mix-blend-screen filter blur-[100px] opacity-20" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-[color:var(--deep-red)] rounded-full mix-blend-screen filter blur-[100px] opacity-10" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-[color:var(--neon-yellow)]">
          End-to-End Solutions
        </motion.div>
        <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.1
        }} className="text-4xl md:text-5xl font-bold mb-4">
          Our Expertise
        </motion.h2>
        <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2
        }} className="text-gray-400 max-w-2xl mx-auto">
          We deliver end-to-end digital solutions across the entire technology
          stack, tailored to your business goals.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Services.map((service, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.05
        }} viewport={{
          once: true
        }}>
          <Link to={`/services/${service.id}`} className="group relative block h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[color:var(--neon-yellow)] transition-all duration-500 overflow-hidden hover:-translate-y-2">
            {/* Hover Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Icon */}
            <div className={`relative w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
              <service.icon size={32} />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[color:var(--neon-yellow)] transition-colors flex items-center justify-between">
                {service.title}
                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                {service.desc}
              </p>
            </div>
          </Link>
        </motion.div>)}
      </div>
    </div>
  </section>;
}