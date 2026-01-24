import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { featuredPosts } from '../constants/common';
export function BlogSection() {
  return <section className="py-24 bg-[#050505]">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest Insights
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Stay updated with the latest trends, tutorials, and insights from
            our engineering team.
          </p>
        </div>
        <Link to="/blog" className="hidden md:flex items-center gap-2 text-[color:var(--bright-red)] font-bold hover:gap-4 transition-all group">
          View All Posts{' '}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredPosts.map((post, index) => <motion.article key={post.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} className="group h-full">
          <Link to={`/blog/${post.slug}`} className="block h-full p-4 rounded-2xl border border-white/5 bg-white/5 hover:border-[color:var(--neon-yellow)] transition-all duration-300 hover:-translate-y-1">
            <div className="relative overflow-hidden rounded-xl mb-4 aspect-video">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[color:var(--bright-red)] text-white text-xs font-bold">
                  {post.category}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[color:var(--neon-yellow)] transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto pt-4 border-t border-white/10">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{post.readTime} read</span>
              </div>
            </div>
          </Link>
        </motion.article>)}
      </div>

      <div className="mt-12 text-center md:hidden">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[color:var(--bright-red)] font-bold hover:gap-4 transition-all">
          View All Posts <ArrowRight />
        </Link>
      </div>
    </div>
  </section>;
}