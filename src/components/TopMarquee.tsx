import { useState } from 'react';
import { usePopup } from '../context/PopupContext';
import { motion } from 'framer-motion';
import { services } from '../constants/common';
export function TopMarquee() {
  const {
    openPopup
  } = usePopup();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return <div className="fixed top-0 left-0 right-0 z-50 h-12 bg-[color:var(--pure-black)] border-b border-white/10 flex items-center justify-between text-sm tracking-wide text-gray-400">
    {/* Left Side: Marquee */}
    <div className="flex-1 h-full overflow-hidden relative flex items-center pause-on-hover border-r border-white/10 group/marquee">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...services, ...services, ...services].map((service, i) => <motion.div key={i} onClick={openPopup} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} className="mx-4 flex items-center gap-2 cursor-pointer group/item relative" animate={{
          scale: hoveredIndex === i ? 1.15 : 1,
          x: hoveredIndex === i ? 8 : 0
        }} transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}>
          <service.icon size={16} className="text-[color:var(--bright-red)] group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300" />
          <span className="font-medium group-hover/item:text-white group-hover/item:font-bold transition-all duration-300">
            {service.name}
          </span>
          {hoveredIndex === i && <motion.div layoutId="serviceHover" className="absolute inset-0 -z-10 bg-[color:var(--bright-red)]/10 rounded-lg blur-sm" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} />}
        </motion.div>)}
      </div>
    </div>

    <div className="flex items-center gap-6 px-4 bg-[color:var(--pure-black)] z-10 h-full">
      <a href="https://www.fiverr.com/zmonir24" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:bg-white/5 px-4 py-2 rounded-lg transition-colors group/fiverr">
        <img src="/Fiverr_logo.svg" alt="Fiverr" className="h-5 w-auto" />
        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-md bg-white/5 border border-white/10 group-hover/fiverr:border-white/20 group-hover/fiverr:bg-white/10 transition-all">
          <span className="text-sm font-medium text-gray-300 group-hover/fiverr:text-white transition-colors">
            Message Me
          </span>
        </div>
      </a>
      <div className="flex items-center gap-4 border-l border-white/10 pl-6">
        <a href="https://wa.me/8801723289090" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200" title="WhatsApp">
          <img src="/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
        </a>
        <a href="https://www.linkedin.com/company/106724193" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200" title="LinkedIn">
          <img src="/Linkedin.svg" alt="LinkedIn" className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
        </a>
        <a href="mailto:phixels.io@gmail.com" className="hover:scale-110 transition-transform duration-200" title="Email">
          <img src="/mail.svg" alt="Email" className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  </div>;
}