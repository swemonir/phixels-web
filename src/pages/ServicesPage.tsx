import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Code, Brain, Blocks, Building2, Zap, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CountUpStats } from '../components/CountUpStats';
import { ProfessionalReviewCarousel } from '../components/ProfessionalReviewCarousel';
const servicesData = [{
  id: 'mobile',
  name: 'Mobile App Development',
  icon: Smartphone,
  description: 'Native & Cross-platform solutions for iOS and Android.',
  color: 'from-blue-500 to-cyan-500',
  subcategories: ['Mobile App Development', 'Android App Development', 'iOS App Development', 'React Native App Development', 'Flutter App Development', 'Mobile App Maintenance', 'Wearable App Development', 'PWA Development', 'AR/VR App Development', 'Startup App Development']
}, {
  id: 'web',
  name: 'Website Development',
  icon: Globe,
  description: 'Scalable web applications using modern frameworks.',
  color: 'from-green-500 to-emerald-500',
  subcategories: ['Website Development', 'Laravel Development', 'eCommerce Development', 'Magento Development', 'Full Stack Development', 'NodeJS Development', 'ReactJS Development', 'Web Designing', 'Shopify Development', 'CMS Development', 'WordPress Development']
}, {
  id: 'software',
  name: 'Software Development',
  icon: Code,
  description: 'Custom software tailored to your business needs.',
  color: 'from-purple-500 to-pink-500',
  subcategories: ['Software Development', 'SaaS Development', 'POS Development', 'Desktop App Development', 'Software Maintenance', 'ERP Development', 'LMS Development', 'Enterprise Software Development']
}, {
  id: 'ai',
  name: 'AI Development',
  icon: Brain,
  description: 'Intelligent solutions powering the future.',
  color: 'from-yellow-500 to-orange-500',
  subcategories: ['AI Development', 'AI Chatbot Development', 'Generative AI Development', 'AI Agent Development', 'LLM Development', 'Computer Vision Development', 'NLP Development Services', 'ML Development']
}, {
  id: 'blockchain',
  name: 'Blockchain Development',
  icon: Blocks,
  description: 'Decentralized apps and smart contract solutions.',
  color: 'from-indigo-500 to-purple-500',
  subcategories: ['Blockchain Development', 'Ethereum Development', 'Metaverse Development', 'NFT Marketplace Development', 'Smart Contract Development', 'DeFi Development']
}, {
  id: 'enterprise',
  name: 'Enterprise Solution',
  icon: Building2,
  description: 'Robust solutions for large-scale organizations.',
  color: 'from-red-500 to-pink-500',
  subcategories: ['Microsoft Power BI Consulting', 'Microsoft Azure Consulting', 'SAP Consulting Services', 'Amazon Web Services', 'Salesforce Consulting', 'IT Staff Augmentation']
}, {
  id: 'ondemand',
  name: 'On-Demand Solutions',
  icon: Zap,
  description: 'Uber-like apps for various service industries.',
  color: 'from-teal-500 to-cyan-500',
  subcategories: ['Food Delivery', 'Taxi Booking', 'Grocery Delivery', 'eWallet', 'Doctor Booking', 'Handyman Services', 'Logistics & Delivery']
}];
export function ServicesPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  return <main className="bg-[#050505] min-h-screen pt-40 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-24">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-[color:var(--neon-yellow)]" />
            <span className="text-sm text-gray-300">Our Services</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            Services That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] animate-gradient bg-300%">
              Scale & Succeed
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From mobile apps to AI solutions, we deliver cutting-edge technology
            services that transform businesses and drive growth.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 mb-24">
        <div className="space-y-8">
          {servicesData.map((service, index) => <motion.div key={service.id} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} className="relative">
              {/* Main Service Card */}
              <div className="group relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer" onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                  {/* Icon */}
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-12 h-12 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-[color:var(--bright-red)] transition-colors">
                      {service.name}
                    </h2>
                    <p className="text-gray-400 text-lg mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="text-sm text-gray-500">
                        {service.subcategories.length} specialized services
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-4">
                    <Link to={`/services/${service.id}`} onClick={e => e.stopPropagation()} className="px-6 py-3 rounded-lg bg-[color:var(--bright-red)] text-white font-bold hover:bg-[color:var(--bright-red)]/90 transition-colors flex items-center gap-2">
                      View Details <ArrowRight size={18} />
                    </Link>
                    <motion.div animate={{
                  rotate: expandedService === service.id ? 90 : 0
                }} transition={{
                  duration: 0.3
                }}>
                      <ChevronRight size={32} className="text-gray-400" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Expanded Subcategories */}
              <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: expandedService === service.id ? 'auto' : 0,
            opacity: expandedService === service.id ? 1 : 0
          }} transition={{
            duration: 0.3
          }} className="overflow-hidden">
                <div className="mt-4 p-8 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Specialized Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.subcategories.map((sub, idx) => <Link key={idx} to={`/services/${service.id}/${sub.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`} className="group/sub flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[color:var(--neon-yellow)] transition-all">
                        <div className="w-2 h-2 rounded-full bg-[color:var(--bright-red)] group-hover/sub:bg-[color:var(--neon-yellow)] transition-colors" />
                        <span className="text-gray-300 group-hover/sub:text-white transition-colors flex-1">
                          {sub}
                        </span>
                        <ArrowRight size={16} className="text-gray-500 opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                      </Link>)}
                  </div>
                </div>
              </motion.div>
            </motion.div>)}
        </div>
      </section>

          {/* New Professional Review Section */}
            <ProfessionalReviewCarousel />

      {/* Stats Section */}
      <section className="container mx-auto px-4 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{
          label: 'Projects Delivered',
          value: 500,
          suffix: '+'
        }, {
          label: 'Happy Clients',
          value: 300,
          suffix: '+'
        }, {
          label: 'Expert Developers',
          value: 50,
          suffix: '+'
        }, {
          label: 'Countries Served',
          value: 25,
          suffix: '+'
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
              <div className="text-4xl font-bold text-white mb-2">
                <CountUpStats end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>)}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" alt="CTA Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--deep-navy)]/95 to-[color:var(--deep-red)]/95" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-12 md:p-16 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and build something extraordinary
              together.
            </p>
            <Button variant="primary" glow triggerPopup className="text-lg px-8 py-4">
              Get Free Consultation <ArrowRight className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </section>
    </main>;
}