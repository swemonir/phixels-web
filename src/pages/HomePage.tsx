import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { ServicesGrid } from '../components/ServicesGrid';
import { ProcessSection } from '../components/ProcessSection';
import { PortfolioTeaser } from '../components/PortfolioTeaser';
import { TechStack } from '../components/TechStack';
import { BlogSection } from '../components/BlogSection';
import { Button } from '../components/ui/Button';
import { ProfessionalReviewCarousel } from '../components/ProfessionalReviewCarousel';
import { ArrowRight } from 'lucide-react';
export function HomePage() {
  return <main className="bg-[#050505] min-h-screen">
    <Hero />
    <ServicesGrid />
    <ProcessSection />
    <PortfolioTeaser />
    <TechStack />
    <BlogSection />
    <ProfessionalReviewCarousel />
    <section className="py-40 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[color:var(--bright-red)]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-none">
            STOP{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-500 to-gray-800">
              THINKING.
            </span>{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
              START BUILDING.
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Your billion-dollar idea deserves billion-dollar execution. Let's
            ship it before your competition does.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="primary" triggerPopup glow className="text-xl px-12 py-6 rounded-full group">
              <span className="flex items-center gap-3">
                Book Free Consultation
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-[color:var(--vibrant-green)] animate-pulse" />
              2 slots remaining for this week
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </main>;
}