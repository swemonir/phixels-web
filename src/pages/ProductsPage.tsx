import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, Users, Download, TrendingUp, ArrowRight, Loader2, Globe, Laptop, Smartphone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CountUpStats } from '../components/CountUpStats';
import { apiService } from '../services/api';
import { Product } from '../types/api';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProducts();
        if (response.success) {
          setProducts(response.data);
        } else {
          setError(response.message || 'Failed to fetch products');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);

  const getPlatformIcon = (category: string) => {
    if (category.toLowerCase().includes('web')) return Globe;
    if (category.toLowerCase().includes('mobile')) return Smartphone;
    return Laptop;
  };

  const getProductColor = (index: number) => {
    const colors = ['from-blue-500/20 to-purple-500/20', 'from-orange-500/20 to-red-500/20', 'from-emerald-500/20 to-teal-500/20'];
    return colors[index % colors.length];
  };

  return <main className="bg-[#050505] min-h-screen pt-40 pb-20 overflow-hidden relative">
    {/* Hero-like Background Effects */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[color:var(--deep-navy)] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[color:var(--deep-red)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" style={{
        animationDelay: '1s'
      }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      {/* Hero Section */}
      <motion.div className="text-center mb-20" initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[color:var(--neon-yellow)] mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
          Our Product Portfolio
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight">
          Digital Products That <br />
          <span className="text-gradient">Scale & Succeed</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Innovative solutions built by our team, trusted by thousands of
          users worldwide. From concept to market leader.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[{
          icon: Users,
          label: 'Active Users',
          value: 1.2,
          suffix: 'M+'
        }, {
          icon: Download,
          label: 'Total Downloads',
          value: 2.5,
          suffix: 'M+'
        }, {
          icon: Star,
          label: 'Average Rating',
          value: 4.8,
          suffix: ''
        }, {
          icon: TrendingUp,
          label: 'Growth Rate',
          value: 150,
          suffix: '%'
        }].map((stat, i) => <motion.div key={i} initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.3 + i * 0.1
        }} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-white/20 transition-colors">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[color:var(--bright-red)]/20 flex items-center justify-center">
            <stat.icon className="w-6 h-6 text-[color:var(--bright-red)]" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            <CountUpStats end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </motion.div>)}
      </motion.div>
      {/* Category Filter */}
      {!loading && !error && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat ? 'bg-[color:var(--bright-red)] text-white font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}`}>
            {cat}
          </button>)}
        </motion.div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-[color:var(--bright-red)] animate-spin mb-4" />
          <p className="text-gray-400">Loading digital solutions...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProducts.map((product, index) => {
            const Icon = getPlatformIcon(product.category);
            return (
              <motion.div key={product._id} initial={{
                opacity: 0,
                y: 30
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.5 + index * 0.1
              }} className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-[color:var(--bright-red)] transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${getProductColor(index)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <Link to={`/products/${product._id}`} className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm flex items-center gap-2">
                      <Icon size={12} className="text-white" />
                      <span className="text-xs text-white font-bold">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[color:var(--bright-red)] text-white text-xs font-bold">
                      ${product.pricing}
                    </div>
                  </div>

                  <div className="relative z-10 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[color:var(--bright-red)] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                      <div className="flex items-center gap-1">
                        <Users size={14} className="text-gray-500" />
                        <span className="text-xs text-gray-400">
                          10k+ Users
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-400">
                          4.8
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.slice(0, 3).map((feature, i) => <span key={i} className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400">
                        {feature}
                      </span>)}
                    </div>
                  </div>
                </Link>

                <div className="relative z-10 px-6 pb-6">
                  <a href={product.demoLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[color:var(--bright-red)] text-white font-bold hover:bg-[color:var(--bright-red)]/90 transition-colors group/btn">
                    Launch Product
                    <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      {/* CTA Section - Classic Style */}
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center bg-[#0A0A0A] border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--deep-navy)]/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Have a Product Idea?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's build the next big thing together. Our team specializes in
            turning ideas into successful digital products.
          </p>
          <Button variant="primary" glow triggerPopup className="text-lg px-8 py-4">
            Start Your Project <ArrowRight className="ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  </main >
}
