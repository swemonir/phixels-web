import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { CountUpStats } from '../components/CountUpStats';
import { Smartphone, Globe, Code, Brain, Blocks, Building2, Zap, ArrowRight, CheckCircle, Layers } from 'lucide-react';
import { ProfessionalReviewCarousel } from '../components/ProfessionalReviewCarousel';
// Duplicated data to avoid modifying other files excessively
const servicesData = [{
  id: 'mobile',
  name: 'Mobile App Development',
  icon: Smartphone,
  description: 'Native & Cross-platform solutions for iOS and Android.',
  longDesc: 'We build world-class mobile applications that deliver seamless user experiences across all devices. From native iOS and Android apps to efficient cross-platform solutions.',
  subcategories: ['Mobile App Development', 'Android App Development', 'iOS App Development', 'React Native App Development', 'Flutter App Development', 'Mobile App Maintenance', 'Wearable App Development', 'PWA Development', 'AR/VR App Development', 'Startup App Development']
}, {
  id: 'web',
  name: 'Website Development',
  icon: Globe,
  description: 'Scalable web applications using modern frameworks.',
  longDesc: 'Create a powerful online presence with our custom web development services. We build fast, secure, and scalable web applications using the latest technologies.',
  subcategories: ['Website Development', 'Laravel Development', 'eCommerce Development', 'Magento Development', 'Full Stack Development', 'NodeJS Development', 'ReactJS Development', 'Web Designing', 'Shopify Development', 'CMS Development', 'WordPress Development']
}, {
  id: 'software',
  name: 'Software Development',
  icon: Code,
  description: 'Custom software tailored to your business needs.',
  longDesc: 'Transform your business operations with custom software solutions. We design and develop robust software tailored to your specific enterprise requirements.',
  subcategories: ['Software Development', 'SaaS Development', 'POS Development', 'Desktop App Development', 'Software Maintenance', 'ERP Development', 'LMS Development', 'Enterprise Software Development']
}, {
  id: 'ai',
  name: 'AI Development',
  icon: Brain,
  description: 'Intelligent solutions powering the future.',
  longDesc: 'Leverage the power of Artificial Intelligence to automate processes, gain insights, and create intelligent user experiences.',
  subcategories: ['AI Development', 'AI Chatbot Development', 'Generative AI Development', 'AI Agent Development', 'LLM Development', 'Computer Vision Development', 'NLP Development Services', 'ML Development']
}, {
  id: 'blockchain',
  name: 'Blockchain Development',
  icon: Blocks,
  description: 'Decentralized apps and smart contract solutions.',
  longDesc: 'Build the future of decentralized technology with our blockchain expertise. From smart contracts to full-scale dApps and NFT marketplaces.',
  subcategories: ['Blockchain Development', 'Ethereum Development', 'Metaverse Development', 'NFT Marketplace Development', 'Smart Contract Development', 'DeFi Development']
}, {
  id: 'enterprise',
  name: 'Enterprise Solution',
  icon: Building2,
  description: 'Robust solutions for large-scale organizations.',
  longDesc: 'Scale your enterprise with our comprehensive digital solutions. We provide consulting and development for major enterprise platforms.',
  subcategories: ['Microsoft Power BI Consulting', 'Microsoft Azure Consulting', 'SAP Consulting Services', 'Amazon Web Services', 'Salesforce Consulting', 'IT Staff Augmentation']
}, {
  id: 'ondemand',
  name: 'On-Demand Solutions',
  icon: Zap,
  description: 'Uber-like apps for various service industries.',
  longDesc: 'Launch your on-demand business quickly with our proven solution frameworks for delivery, booking, and service marketplaces.',
  subcategories: ['Food Delivery', 'Taxi Booking', 'Grocery Delivery', 'eWallet', 'Doctor Booking', 'Handyman Services', 'Logistics & Delivery']
}];
export function ServiceCategoryPage() {
  const {
    category
  } = useParams();
  const service = servicesData.find(s => s.id === category);
  if (!service) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services" className="text-[color:var(--bright-red)] hover:underline">
            Back to Services
          </Link>
        </div>
      </div>;
  }
  return <main className="bg-[#050505] min-h-screen pt-40 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-[color:var(--bright-red)] font-bold mb-6">
              <service.icon size={16} />
              {service.name}
            </motion.div>

            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {service.name} <br />
              <span className="text-gradient">Solutions</span>
            </motion.h1>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
              {service.longDesc}
            </motion.p>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }}>
              <Button variant="primary" triggerPopup className="px-8 py-4 text-lg">
                Consult Our Experts
              </Button>
            </motion.div>
          </div>

          <div className="w-full md:w-1/3">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.2
          }} className="aspect-square rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[color:var(--bright-red)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <service.icon size={120} className="text-white/20 group-hover:text-[color:var(--bright-red)] group-hover:scale-110 transition-all duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="container mx-auto px-4 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Specialized Services
          </h2>
          <p className="text-gray-400">
            Explore our specific capabilities within {service.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.subcategories.map((sub, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.05
        }}>
              <Link to={`/services/${service.id}/${sub.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`} className="group block p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[color:var(--neon-yellow)] transition-all duration-300 h-full hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[color:var(--deep-navy)] flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                  <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[color:var(--neon-yellow)] transition-colors flex items-center justify-between">
                  {sub}
                  <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-sm text-gray-400">
                  Professional {sub} services tailored to your specific business
                  requirements and goals.
                </p>
              </Link>
            </motion.div>)}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#0A0A0A] py-24 mb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Choose Phixels for <br /> {service.name}?
              </h2>
              <div className="space-y-6">
                {['Industry-leading expertise and proven track record', 'Agile methodology ensuring timely delivery', 'Scalable and secure architecture design', 'Post-launch support and maintenance', 'Transparent communication and reporting'].map((item, i) => <div key={i} className="flex items-start gap-4">
                    <CheckCircle className="text-[color:var(--vibrant-green)] shrink-0 mt-1" size={20} />
                    <span className="text-lg text-gray-300">{item}</span>
                  </div>)}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {[{
                label: 'Projects Delivered',
                value: 500,
                suffix: '+'
              }, {
                label: 'Client Retention',
                value: 98,
                suffix: '%'
              }, {
                label: 'Expert Developers',
                value: 50,
                suffix: '+'
              }, {
                label: 'Support Available',
                value: 24,
                suffix: '/7'
              }].map((stat, i) => <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      <CountUpStats end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      
{/* New Professional Review Section */}
      <ProfessionalReviewCarousel />

      {/* CTA */}
      <section className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-white/10 to-black rounded-3xl p-12 border border-white/10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to start your {service.name} project?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss your requirements and build something extraordinary
            together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" triggerPopup className="px-8 py-4 text-lg">
              Get Free Consultation
            </Button>
            <Link to="/portfolio">
              <Button variant="outline" className="px-8 py-4 text-lg w-full sm:w-auto">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>;
}