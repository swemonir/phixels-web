import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight, Loader2, Code, Smartphone, Globe, Cpu, Palette, BarChart, Shield, Cloud } from 'lucide-react';
import { CountUpStats } from '../components/CountUpStats';
import { ProfessionalReviewCarousel } from '../components/ProfessionalReviewCarousel';
import { PageHeader } from '../components/ui/PageHeader';
import { CallToAction } from '../components/ui/CallToAction';
import { apiService } from '../services/api';
import { Service } from '../types/api';

const iconMap: Record<string, any> = {
  'code': Code,
  'smartphone': Smartphone,
  'globe': Globe,
  'cpu': Cpu,
  'palette': Palette,
  'bar-chart': BarChart,
  'shield': Shield,
  'cloud': Cloud,
};

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await apiService.getServices();
        if (response.success) {
          setServices(response.data);
        } else {
          setError(response.message || 'Failed to fetch services');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getServiceColor = (index: number) => {
    const colors = [
      'from-blue-600 to-indigo-600',
      'from-emerald-600 to-teal-600',
      'from-orange-600 to-red-600',
      'from-purple-600 to-pink-600'
    ];
    return colors[index % colors.length];
  };

  return <main className="bg-[#050505] min-h-screen pt-40 pb-20">
    {/* Hero Section */}
    <section className="container mx-auto px-4 mb-24">
      <PageHeader
        badgeText="Our Services"
        badgeIcon={Sparkles}
        title={<>Services That <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] animate-gradient bg-300%">Scale & Succeed</span></>}
        description="From mobile apps to AI solutions, we deliver cutting-edge technology services that transform businesses and drive growth."
      />
    </section>

    {/* Services Grid */}
    <section className="container mx-auto px-4 mb-24">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-[color:var(--bright-red)] animate-spin mb-4" />
          <p className="text-gray-400">Loading our services...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20">
          {error}
        </div>
      ) : (
        <div className="space-y-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon.toLowerCase()] || Code;
            const color = getServiceColor(index);

            return (
              <motion.div key={service._id} initial={{
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
                <div className="group relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer" onClick={() => setExpandedService(expandedService === service._id ? null : service._id)}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                    {/* Icon */}
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-[color:var(--bright-red)] transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-gray-400 text-lg mb-4">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span className="text-sm text-gray-500 font-medium">
                          {service.features.length} specialized services
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-4">
                      <Link to={`/services/${service._id}`} onClick={e => e.stopPropagation()} className="px-6 py-3 rounded-lg bg-[color:var(--bright-red)] text-white font-bold hover:bg-[color:var(--bright-red)]/90 transition-colors flex items-center gap-2">
                        View Details <ArrowRight size={18} />
                      </Link>
                      <motion.div animate={{
                        rotate: expandedService === service._id ? 90 : 0
                      }} transition={{
                        duration: 0.3
                      }}>
                        <ChevronRight size={32} className="text-gray-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>
                <motion.div initial={{
                  height: 0,
                  opacity: 0
                }} animate={{
                  height: expandedService === service._id ? 'auto' : 0,
                  opacity: expandedService === service._id ? 1 : 0
                }} transition={{
                  duration: 0.3
                }} className="overflow-hidden">
                  <div className="mt-4 p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Specialized Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {service.features.map((sub, idx) => {
                        const subSlug = sub.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');
                        return (
                          <Link
                            key={idx}
                            to={`/services/${service._id}/${subSlug}`}
                            className="group/sub flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[color:var(--neon-yellow)] transition-all"
                          >
                            <div className="w-2 h-2 rounded-full bg-[color:var(--bright-red)] group-hover/sub:bg-[color:var(--neon-yellow)] transition-colors" />
                            <span className="text-gray-300 group-hover/sub:text-white transition-colors flex-1">
                              {sub}
                            </span>
                            <ArrowRight size={16} className="text-gray-500 opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      )}
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
      <CallToAction
        title="Ready to Start Your Project?"
        description="Let's discuss your requirements and build something extraordinary together."
        buttonText="Get Free Consultation"
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
      />
    </section>
  </main>;
}
