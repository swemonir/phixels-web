import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { workCategories } from '../constants/common';
export function WorkMegaMenu() {
  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: 10
  }} transition={{
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  }} className="fixed top-[78px] left-1/2 z-50 w-auto" style={{
    transform: 'translateX(-50%)'
  }}>
    {/* Gradient border wrapper - reduced opacity, same gradient */}
    <div className="relative p-[1px] rounded-b-3xl" style={{
      background: 'linear-gradient(to right, rgba(237,31,36,0.3), rgba(237,31,36,0.5), rgba(255,255,0,0.4), rgba(0,205,73,0.4), rgba(0,32,63,0.5))'
    }}>
      <div className="bg-[#0A0A0A]/95 backdrop-blur-xl shadow-2xl rounded-b-3xl">
        <div className="px-6 py-6">
          <div className="flex gap-4">
            {workCategories.map((category, index) => <Link key={category.title} to={category.link} className="group">
              <motion.div initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }} whileHover={{
                y: -5
              }} className={`relative w-64 p-6 rounded-2xl bg-white/5 border border-white/10 ${category.hoverColor} transition-all duration-300 overflow-hidden`}>
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${category.iconBg} transition-colors`}>
                    <category.icon size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className={`text-xl font-bold text-white mb-2 ${category.textColor} transition-colors`}>
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {category.description}
                  </p>

                  <div className={`flex items-center gap-2 text-sm font-bold ${category.textColor === 'group-hover:text-[color:var(--vibrant-green)]' ? 'text-[color:var(--vibrant-green)]' : 'text-[color:var(--bright-red)]'}`}>
                    Explore{' '}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>)}
          </div>
        </div>
      </div>
    </div>
  </motion.div>;
}