import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { products } from '../constants/common';
export function ProductsMegaMenu() {
  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: 10
  }} transition={{
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  }} className="fixed top-[78px] left-0 right-0 w-full z-50 pb-8">
    {/* Gradient border wrapper - reduced opacity */}
    <div className="relative p-[1px] rounded-b-3xl mx-4" style={{
      background: 'linear-gradient(to right, rgba(237,31,36,0.3), rgba(237,31,36,0.5), rgba(255,255,0,0.4), rgba(0,205,73,0.4), rgba(0,32,63,0.5))'
    }}>
      <div className="bg-[#0A0A0A]/95 backdrop-blur-xl shadow-2xl rounded-b-3xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Our Digital Products
              </h3>
              <p className="text-gray-400 text-sm">
                Innovative solutions built by our team, used by thousands.
              </p>
            </div>
            <Link to="/products" className="flex items-center gap-2 text-[color:var(--bright-red)] font-bold hover:gap-3 transition-all text-sm">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {products.map((product, index) => <Link key={product.id} to={`/products/${product.id}`} className="block">
              <motion.div initial={{
                opacity: 0,
                scale: 0.9
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: index * 0.1
              }} whileHover={{
                y: -5
              }} className="group relative flex flex-col p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[color:var(--bright-red)] transition-all duration-300 overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Image */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm flex items-center gap-1">
                    <product.icon size={10} className="text-white" />
                    <span className="text-[10px] text-white font-bold">
                      {product.platform}
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
                    <ArrowRight size={14} className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            </Link>)}
          </div>
        </div>
      </div>
    </div>
  </motion.div>;
}