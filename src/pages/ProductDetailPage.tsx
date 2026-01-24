import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ExternalLink, Star, Users, Download, ArrowLeft, CheckCircle } from 'lucide-react';
import { allProducts } from '../data/products';

export function ProductDetailPage() {
  const {
    id
  } = useParams();
  const product = allProducts.find(p => p.id === id);
  if (!product) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-[color:var(--bright-red)] hover:underline">
          Back to Products
        </Link>
      </div>
    </div>;
  }
  return <main className="bg-[#050505] min-h-screen pt-40 pb-20">
    <div className="container mx-auto px-4">
      {/* Back Button */}
      <Link to="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[color:var(--bright-red)] mb-4">
            <product.icon size={12} />
            {product.platform}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {product.name}
          </h1>
          <p className="text-xl text-gray-400 mb-6">{product.tagline}</p>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-gray-500" />
              <span className="text-white font-bold">
                {product.stats.users}
              </span>
              <span className="text-gray-500 text-sm">Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} className="text-yellow-500 fill-yellow-500" />
              <span className="text-white font-bold">
                {product.stats.rating}
              </span>
              <span className="text-gray-500 text-sm">Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Download size={20} className="text-gray-500" />
              <span className="text-white font-bold">
                {product.stats.downloads}
              </span>
              <span className="text-gray-500 text-sm">Downloads</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="primary" glow className="w-full py-4 text-lg">
                Launch Product <ExternalLink size={20} className="ml-2" />
              </Button>
            </a>
            <Button variant="outline" triggerPopup className="flex-1 py-4 text-lg">
              Contact Sales
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="relative">
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className={`absolute -inset-4 bg-gradient-to-br ${product.color} opacity-20 blur-3xl -z-10`} />
        </motion.div>
      </div>

      {/* Description */}
      <motion.section initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-6">
          About {product.name}
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed max-w-4xl">
          {product.longDescription}
        </p>
      </motion.section>

      {/* Features */}
      <motion.section initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.features.map((feature, i) => <motion.div key={i} initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.1
          }} className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[color:var(--bright-red)] transition-colors">
            <CheckCircle size={24} className="text-[color:var(--vibrant-green)] shrink-0 mt-1" />
            <span className="text-lg text-gray-300">{feature}</span>
          </motion.div>)}
        </div>
      </motion.section>

      {/* CTA Section - Enhanced */}
      <motion.section initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="relative rounded-3xl overflow-hidden border border-white/10">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--deep-navy)] via-[#0a0a0a] to-[color:var(--deep-red)] opacity-80" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

        {/* Animated Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[color:var(--bright-red)]/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[color:var(--vibrant-green)]/10 rounded-full blur-[100px] animate-pulse delay-1000" />

        <div className="relative z-10 p-16 md:p-24 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who are already using {product.name} to
            improve their workflow and achieve more.
          </p>
          <a href={product.link} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" glow className="text-lg px-10 py-5 rounded-full shadow-xl shadow-[color:var(--bright-red)]/20 hover:shadow-[color:var(--bright-red)]/40 transition-all">
              Launch {product.name}{' '}
              <ExternalLink size={20} className="ml-2" />
            </Button>
          </a>
        </div>
      </motion.section>
    </div>
  </main>;
}