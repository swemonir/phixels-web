import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';

// Mock Data
const reviews = [{
  name: 'Sarah Mitchell',
  role: 'CEO, TechVenture Inc',
  image: "/sarah-mitchell.webp",
  rating: 5,
  review: 'Working with this team transformed our digital presence completely. They delivered a sophisticated e-commerce platform that increased our conversion rate by 145% within the first quarter. Their attention to detail and commitment to our success was exceptional.',
  project: 'E-commerce Platform Development',
  budget: '$35,000',
  duration: '3 months',
  summary: 'Custom React-based e-commerce solution with advanced inventory management, payment gateway integration, and real-time analytics dashboard.'
}, {
  name: 'Michael Chen',
  role: 'Founder, FinanceFlow',
  image: "/michael-chen.webp",
  rating: 5,
  review: 'The mobile app they built exceeded all our expectations. The user experience is seamless, and our customer engagement has tripled since launch. They understood our vision perfectly and delivered a product that truly stands out in the market.',
  project: 'Financial Management Mobile App',
  budget: '$42,000',
  duration: '4 months',
  summary: 'Cross-platform mobile application with secure authentication, real-time transaction tracking, budget planning tools, and comprehensive financial reporting.'
}, {
  name: 'Emily Rodriguez',
  role: 'Marketing Director, GrowthLabs',
  image: "/emily-rodriguez.webp",
  rating: 5,
  review: "Their strategic approach to our SaaS platform redesign was impressive. Not only did they modernize our interface, but they also improved our user retention by 67%. The team's expertise in both design and development is truly world-class.",
  project: 'SaaS Platform Redesign & Optimization',
  budget: '$28,500',
  duration: '2.5 months',
  summary: 'Complete UI/UX overhaul with modern design system, performance optimization, new onboarding flow, and integration of advanced analytics features.'
}, {
  name: 'David Park',
  role: 'CTO, HealthTech Solutions',
  image: "/david-park.webp",
  rating: 5,
  review: 'Building a HIPAA-compliant healthcare platform required expertise and precision. This team delivered both flawlessly. The system handles thousands of patient records securely, and our clients trust it completely. Outstanding work from start to finish.',
  project: 'Healthcare Management System',
  budget: '$48,000',
  duration: '5 months',
  summary: 'HIPAA-compliant patient management platform with secure data encryption, appointment scheduling, telemedicine integration, and comprehensive reporting tools.'
}, {
  name: 'Davis Lee',
  role: 'VP Operations, LogisticsPro',
  image: "/davis-lee.webp",
  rating: 5,
  review: 'The logistics tracking system they developed revolutionized our operations. Real-time tracking, automated reporting, and intuitive dashboards have saved us countless hours. Their technical expertise and project management were exceptional throughout.',
  project: 'Logistics & Supply Chain Platform',
  budget: '$38,500',
  duration: '4 months',
  summary: 'Real-time logistics tracking system with GPS integration, automated inventory management, route optimization, and comprehensive analytics dashboard.'
}, {
  name: 'Robert Anderson',
  role: 'Director, EduTech Academy',
  image: "/robert-anderson.webp",
  rating: 5,
  review: "Our online learning platform needed to scale to support 50,000+ students. They architected a solution that's not only robust but also incredibly user-friendly. Student engagement increased by 89%, and our instructors love the new tools.",
  project: 'Online Learning Management System',
  budget: '$45,000',
  duration: '4.5 months',
  summary: 'Scalable LMS with video streaming, interactive assessments, progress tracking, discussion forums, and comprehensive course management tools.'
}, {
  name: 'Amanda Foster',
  role: 'Founder, StyleHub',
  image: "/amanda-foster.webp",
  rating: 5,
  review: 'The fashion marketplace they created is stunning and functional. The AR try-on feature they implemented was a game-changer for our business. Sales increased by 210% in the first six months. Truly innovative work.',
  project: 'Fashion E-commerce with AR Features',
  budget: '$32,000',
  duration: '3.5 months',
  summary: 'Modern e-commerce platform with AR virtual try-on, personalized recommendations, social shopping features, and seamless checkout experience.'
}, {
  name: 'James Wilson',
  role: 'CEO, PropertyMatch',
  image: "/james-wilson.webp",
  rating: 5,
  review: 'Our real estate platform needed sophisticated search capabilities and virtual tour integration. They delivered beyond expectations. The 3D property tours and AI-powered matching system have set us apart from competitors. Exceptional quality.',
  project: 'Real Estate Platform with Virtual Tours',
  budget: '$41,500',
  duration: '4 months',
  summary: 'Comprehensive real estate platform with 3D virtual tours, advanced property search, AI-powered matching, mortgage calculator, and agent management system.'
}];

export function ProfessionalReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % reviews.length);
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
                dragElastic={0.02} // রাবার ইফেক্ট প্রায় শূন্য করে দিয়েছি
                onDragEnd={(e, { offset }) => {
                  const swipeThreshold = 10; // খুব সামান্য টানলেই কাজ করবে
                  if (offset.x < -swipeThreshold) {
                    setCurrentIndex((prev) => (prev + 1) % reviews.length);
                  } else if (offset.x > swipeThreshold) {
                    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
                  }
                }}
                
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }} 
                // --- PROFESSIONAL FAST TRANSITION ---
                transition={{ duration: 0.3, ease: 'easeOut' }} 
                
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-full items-center cursor-grab active:cursor-grabbing"
              >
                {/* Left Column: Review Content */}
                <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 select-none">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl font-bold text-white leading-none">
                      {reviews[currentIndex].rating}
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
                      "{reviews[currentIndex].review}"
                    </p>
                  </blockquote>

                  <div className="mt-auto border-t border-white/10 pt-6">
                    <h4 className="text-white font-bold text-lg">
                      {reviews[currentIndex].name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {reviews[currentIndex].role}
                    </p>
                  </div>
                </div>

                {/* Center Column: Image */}
                <div className="lg:col-span-3 flex justify-center items-center order-1 lg:order-2 select-none">
                  <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group ring-4 ring-white pointer-events-none">
                    <img src={reviews[currentIndex].image} alt={reviews[currentIndex].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                  </div>
                </div>

                {/* Right Column: Project Info */}
                <div className="lg:col-span-4 flex flex-col justify-center order-3 select-none">
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    {reviews[currentIndex].project}
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
                        {reviews[currentIndex].summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-[color:var(--bright-red)] text-xs font-bold uppercase tracking-wider mb-1">
                          Budget
                        </h5>
                        <p className="text-white font-medium text-sm">
                          {reviews[currentIndex].budget}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-[color:var(--bright-red)] text-xs font-bold uppercase tracking-wider mb-1">
                          Duration
                        </h5>
                        <p className="text-white font-medium text-sm">
                          {reviews[currentIndex].duration}
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
            {reviews.map((_, index) => (
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