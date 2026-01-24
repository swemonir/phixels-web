import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Home } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceMegaMenu } from './ServiceMegaMenu';
import { WorkMegaMenu } from './WorkMegaMenu';
import { ProductsMegaMenu } from './ProductsMegaMenu';
import { navLinks } from '../constants/common';
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);
  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/services');
  };
  return <nav className={`fixed top-12 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
    <div className="container mx-auto px-4">
      <div className={`glass-panel rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-black/90' : 'bg-white/5'}`}>
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/Phixels-Logo.svg" alt="Phixels" className="h-8 w-auto group-hover:scale-105 transition-transform" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {/* Home Icon - Special styling */}
          <Link to="/" className="relative group mr-4">
            <motion.div whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }} className={`p-2 rounded-lg transition-all ${location.pathname === '/' ? 'bg-[color:var(--bright-red)] text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}`}>
              <Home size={20} />
            </motion.div>

            {/* Animated underline */}
            <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--neon-yellow)]" initial={{
              scaleX: 0
            }} whileHover={{
              scaleX: 1
            }} transition={{
              duration: 0.3
            }} />
          </Link>

          {navLinks.map(link => <div key={link.name} className="relative group py-4" onMouseEnter={() => link.hasMegaMenu && setActiveDropdown(link.name)} onMouseLeave={() => setActiveDropdown(null)}>
            {link.name === 'Services' ? <button onClick={handleServicesClick} className={`text-sm font-medium hover:text-[color:var(--bright-red)] transition-all flex items-center gap-1 relative ${location.pathname === link.path ? 'text-[color:var(--bright-red)]' : 'text-gray-300'}`}>
              {link.name}
              {link.hasMegaMenu && <motion.div animate={{
                rotate: activeDropdown === link.name ? 180 : 0
              }} transition={{
                duration: 0.2
              }}>
                <ChevronDown size={12} className="text-gray-400 group-hover:text-[color:var(--bright-red)] transition-colors" />
              </motion.div>}

              {/* Custom Underline Animation */}
              <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--neon-yellow)]" initial={{
                scaleX: 0
              }} whileHover={{
                scaleX: 1
              }} transition={{
                duration: 0.3
              }} />
            </button> : <Link to={link.path} className={`text-sm font-medium hover:text-[color:var(--bright-red)] transition-all flex items-center gap-1 relative ${location.pathname === link.path ? 'text-[color:var(--bright-red)]' : 'text-gray-300'}`}>
              {link.name}
              {link.hasMegaMenu && <motion.div animate={{
                rotate: activeDropdown === link.name ? 180 : 0
              }} transition={{
                duration: 0.2
              }}>
                <ChevronDown size={12} className="text-gray-400 group-hover:text-[color:var(--bright-red)] transition-colors" />
              </motion.div>}

              {/* Custom Underline Animation */}
              <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--neon-yellow)]" initial={{
                scaleX: 0
              }} whileHover={{
                scaleX: 1
              }} transition={{
                duration: 0.3
              }} />
            </Link>}

            <AnimatePresence>
              {activeDropdown === 'Services' && link.name === 'Services' && <ServiceMegaMenu />}
              {activeDropdown === 'Products' && link.name === 'Products' && <ProductsMegaMenu />}
              {activeDropdown === 'Works' && link.name === 'Works' && <WorkMegaMenu />}
            </AnimatePresence>
          </div>)}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button variant="primary" triggerPopup glow className="text-sm py-2 px-4 relative overflow-hidden group">
              <span className="relative z-10">Start a Project</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-[color:var(--neon-yellow)] to-[color:var(--bright-red)] opacity-0 group-hover:opacity-20" animate={{
                x: ['-100%', '100%']
              }} transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'linear'
              }} />
            </Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </div>

    <AnimatePresence>
      {mobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden">
        <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
          <Link to="/" className="text-xl font-bold text-gray-300 hover:text-white block py-2">
            Home
          </Link>
          {navLinks.map(link => <Link key={link.name} to={link.path} className="text-xl font-bold text-gray-300 hover:text-white block py-2">
            {link.name}
          </Link>)}
          <Button variant="primary" triggerPopup className="w-full mt-8">
            Start a Project
          </Button>
        </div>
      </motion.div>}
    </AnimatePresence>
  </nav>;
}