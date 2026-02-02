import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Zap, Layers, Cpu, ArrowRight, Loader2 } from 'lucide-react';
import { TechStack } from '../components/TechStack';
import { ProfessionalReviewCarousel } from '../components/ProfessionalReviewCarousel';
import { apiService } from '../services/api';
import { Service } from '../types/api';

export function ServiceDetailPage() {
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (!category) return;
      try {
        setLoading(true);
        const response = await apiService.getServiceById(category);
        if (response.success) {
          setService(response.data);
        } else {
          setError(response.message || 'Service not found');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-[color:var(--bright-red)] animate-spin" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-500">Service Not Found</h1>
          <Link to="/services" className="text-[color:var(--bright-red)] hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // Find the exact subcategory name from the features array using the slug
  const matchedSubcategory = service.features.find(
    f => f.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') === subcategory
  ) || subcategory?.replace(/-/g, ' ').replace(/and/g, '&');

  const title = matchedSubcategory || 'Service Details';
  const categoryTitle = service.title;

  return <main className="bg-[#050505] min-h-screen pt-40 pb-20">
    {/* Hero Section */}
    <section className="container mx-auto px-4 mb-20">
      <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="max-w-4xl">
        <div className="text-[color:var(--bright-red)] text-sm font-bold uppercase tracking-widest mb-4">
          <Link to={`/services/${service._id}`} className="hover:underline">{categoryTitle}</Link> / {title}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 capitalize leading-tight">
          {title}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-8">
          We deliver enterprise-grade {title} solutions tailored to your
          business needs. Scalable, secure, and built with cutting-edge
          technology under our {categoryTitle} expertise.
        </p>
        <Button variant="primary" triggerPopup className="px-8 py-4 text-lg">
          Start Your Project
        </Button>
      </motion.div>
    </section>

    {/* Key Features */}
    <section className="container mx-auto px-4 mb-20">
      <h2 className="text-3xl font-bold text-white mb-10">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[{
          icon: Zap,
          title: 'High Performance',
          desc: 'Optimized for speed and efficiency across all devices.'
        }, {
          icon: Layers,
          title: 'Scalable Architecture',
          desc: 'Built to grow with your business from day one.'
        }, {
          icon: Cpu,
          title: 'Advanced Tech Stack',
          desc: 'Leveraging the latest frameworks and tools.'
        }].map((feature, i) => <div key={i} className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-[color:var(--neon-yellow)] transition-colors group">
          <div className="w-12 h-12 rounded-lg bg-[color:var(--deep-navy)] flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
            <feature.icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            {feature.title}
          </h3>
          <p className="text-gray-400">{feature.desc}</p>
        </div>)}
      </div>
    </section>

    {/* Tech Stack - Using TechStack component */}
    <TechStack />

    {/* Process */}
    <section className="container mx-auto px-4 mb-20">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-white mb-6">
            Our Development Process
          </h2>
          <div className="space-y-6">
            {['Requirement Analysis & Planning', 'UI/UX Design & Prototyping', 'Agile Development & Testing', 'Deployment & Maintenance'].map((step, i) => <div key={i} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[color:var(--bright-red)]/20 text-[color:var(--bright-red)] flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <span className="text-lg text-white">{step}</span>
            </div>)}
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[400px] rounded-2xl border border-white/10 relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="Development Process" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--deep-navy)]/80 to-black/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-2">4</div>
              <div className="text-xl text-gray-300">Step Process</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* New Professional Review Section */}
    <ProfessionalReviewCarousel />

    {/* CTA */}
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" alt="CTA Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--deep-navy)]/95 to-[color:var(--deep-red)]/95" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your {title}?
          </h2>
          <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto">
            Let's turn your vision into reality with our expert team. Get a
            free consultation and project estimate today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" triggerPopup glow className="px-8 py-4 text-lg">
              Get Free Consultation <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  </main>;
}
