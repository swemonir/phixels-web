import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Smartphone, Laptop, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Product } from '../types/api';
import { apiService } from '../services/api';

export function ProductsMegaMenu() {
  // THIS IS FOR PRODUCT HOVER MENU REAL TIME DATA IN HERE
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const getPlatformIcon = (category: string = '') => {
    if (category.toLowerCase().includes('web')) return Globe;
    if (category.toLowerCase().includes('mobile')) return Smartphone;
    return Laptop;
  };

  const getProductColor = (index: number) => {
    const colors = [
      'from-blue-500/20 to-purple-500/20',
      'from-orange-500/20 to-red-500/20',
      'from-emerald-500/20 to-teal-500/20',
    ];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-[78px] left-0 right-0 w-full z-50 pb-8"
    >
      {/* Gradient border wrapper - reduced opacity */}
      <div
        className="relative p-[1px] rounded-b-3xl mx-4"
        style={{
          background:
            'linear-gradient(to right, rgba(237,31,36,0.3), rgba(237,31,36,0.5), rgba(255,255,0,0.4), rgba(0,205,73,0.4), rgba(0,32,63,0.5))',
        }}
      >
        <div className="bg-[#0A0A0A]/95 backdrop-blur-xl shadow-2xl rounded-b-3xl">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Our Digital Products</h3>
                <p className="text-gray-400 text-sm">
                  Innovative solutions built by our team, used by thousands.
                </p>
              </div>
              <Link
                to="/products"
                className="flex items-center gap-2 text-[color:var(--bright-red)] font-bold hover:gap-3 transition-all text-sm"
              >
                View All Products <ArrowRight size={16} />
              </Link>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[color:var(--bright-red)] animate-spin mb-2" />
                <p className="text-gray-400 text-sm">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500/80 text-sm capitalize">{error}</div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {products.slice(0, 6).map((product, index) => {
                  const Icon = getPlatformIcon(product.category);
                  return (
                    <Link key={product._id} to={`/products/${product._id}`} className="block">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group relative flex flex-col p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[color:var(--bright-red)] transition-all duration-300 overflow-hidden"
                      >
                        {/* Gradient Background on Hover */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${getProductColor(
                            index
                          )} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                        />

                        {/* Image */}
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                          <img
                            src={
                              product.images?.[0] ||
                              'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
                            }
                            alt={product.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm flex items-center gap-1">
                            <Icon size={10} className="text-white" />
                            <span className="text-[10px] text-white font-bold">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex-1 flex flex-col">
                          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[color:var(--bright-red)] transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
                            {product.description}
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                              View Details
                            </span>
                            <ArrowRight
                              size={14}
                              className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                            />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
