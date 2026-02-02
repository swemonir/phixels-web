import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';
import { Portfolio } from '../types/api';

export function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await apiService.getPortfolios();
        if (response.success) {
          setPortfolioItems(response.data);
        } else {
          setError(response.message || 'Failed to fetch portfolio');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];
  const filtered = filter === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === filter);

  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Work</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Scale your impact with digital experiences that combine stunning
            design with cutting-edge technology.
          </p>
        </div>

        {/* Filter */}
        {!loading && !error && (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                    ? 'bg-[color:var(--bright-red)] text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[color:var(--bright-red)] animate-spin mb-4" />
            <p className="text-gray-400">Loading our works...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-white/10"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="px-3 py-1 rounded-full bg-[color:var(--bright-red)] text-white text-xs font-bold mb-2 inline-block">
                          {item.category}
                        </span>
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                      </div>
                      <a
                        href={item.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-[color:var(--bright-red)] transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.technology?.map((tech) => (
                        <span key={tech} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-400">
                        Client: <span className="text-white">{item.client}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[color:var(--neon-yellow)] font-bold text-sm">
                        {item.activeUsers} <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No projects found for this category.
          </div>
        )}
      </div>
    </main>
  );
}
