import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Share2, Calendar, Clock, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';

const posts = Array.from({
  length: 15
}, (_, i) => ({
  id: i + 1,
  title: ['The Future of AI in Mobile Development 2026', 'Building Scalable Microservices with Node.js', 'Web3: Beyond the Hype', 'React Server Components: A Deep Dive', 'Designing for Accessibility in 2026', 'The State of Flutter Development', 'Kubernetes for Startups: A Guide', 'Optimizing Next.js Performance', 'The Rise of Edge Computing', 'Secure Authentication Patterns'][i % 10],
  excerpt: 'How technology is transforming the way we build and interact with apps in the modern era. Deep dive into the latest trends and best practices.',
  category: ['Mobile', 'AI', 'Web3', 'Backend', 'Design', 'DevOps'][i % 6],
  date: 'Jan 15, 2026',
  readTime: '5 min',
  image: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80'][i],
  slug: 'future-of-ai-mobile-dev'
}));

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Newsletter States
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const categories = ['All', 'Mobile', 'AI', 'Web3', 'Backend', 'Design', 'DevOps'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterSubscribed) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }

    setNewsletterLoading(true);
    setNewsletterError('');

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzYH-TfT_uR-2uxR8G2my7KElsR_x0f9GekGO35oSqq-qXkjI8k1zPSRvbIrATJDCg/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          formType: 'newsletter',
          email: newsletterEmail
        })
      });
      const text = await response.text();
      if (text.includes('already_subscribed') || text.toLowerCase().includes('already')) {
        setNewsletterError('This email is already subscribed.');
        setNewsletterLoading(false);
        return;
      }

      setShowSuccessModal(true);
      setNewsletterSubscribed(true);
      setNewsletterEmail('');

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);

    } catch (error) {
      console.error(error);
      setShowSuccessModal(true);
      setNewsletterSubscribed(true);
      setNewsletterEmail('');

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <main className="bg-[#050505] min-h-screen pt-44 pb-20">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center relative"
            >
              <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>

              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[color:var(--vibrant-green)]/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[color:var(--vibrant-green)]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-400">
                You've successfully subscribed to our newsletter. Stay tuned for the latest updates!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[color:var(--bright-red)] font-mono"
          >
            Our Blog
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Insights & <span className="text-gradient">Thoughts</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Deep dives into engineering, design, and the future of technology.
          </p>
        </div>

        {/* Featured Post */}
        {selectedCategory === 'All' && !searchTerm && (
          <Link to="/blog/future-of-ai-mobile-dev">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-20 relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80" alt="Featured" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>
              <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end min-h-[500px]">
                <span className="inline-block px-4 py-1 rounded-full bg-[color:var(--bright-red)] text-white text-sm font-bold mb-4 w-fit">
                  Featured
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl group-hover:text-[color:var(--neon-yellow)] transition-colors">
                  The Architectural Shift: From Monoliths to Composable Web
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mb-8">
                  Why modern enterprises are moving towards composable architecture and how it enables faster innovation cycles.
                </p>
                <div className="flex items-center gap-6 text-gray-400">
                  <span className="flex items-center gap-2">
                    <Calendar size={18} /> Jan 20, 2026
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={18} /> 12 min read
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8 h-fit sticky top-32">
            {/* Search */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`cursor-pointer flex justify-between items-center p-2 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-[color:var(--bright-red)] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <span>{cat}</span>
                    {cat !== 'All' && (
                      <span className="text-xs bg-black/20 px-2 py-1 rounded">
                        {posts.filter(p => p.category === cat).length}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[color:var(--deep-navy)] to-black p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Subscribe</h3>
              <p className="text-sm text-gray-400 mb-4">
                Get the latest tech insights delivered to your inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => {
                    setNewsletterEmail(e.target.value);
                    setNewsletterError('');
                  }}
                  placeholder="Enter your email"
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white mb-2 focus:outline-none focus:border-[color:var(--bright-red)] disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={newsletterSubscribed}
                />

                {newsletterError && <p className="text-red-400 text-sm mb-2">{newsletterError}</p>}

                <Button
                  type="submit"
                  className="w-full"
                  variant="primary"
                  disabled={newsletterLoading || newsletterSubscribed}
                >
                  {newsletterSubscribed
                    ? 'Subscribed'
                    : newsletterLoading
                      ? 'Subscribing...'
                      : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map(post => (
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={post.id}
                    className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-[color:var(--bright-red)] transition-all duration-300 flex flex-col"
                  >
                    <Link to={`/blog/${post.slug}`} className="block flex-1 flex flex-col">
                      <div className="relative aspect-video overflow-hidden bg-gray-800">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[color:var(--neon-yellow)] transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{post.date}</span>
                            <span>{post.readTime} read</span>
                          </div>
                          <button
                            onClick={e => {
                              e.preventDefault();
                              // Share logic
                            }}
                            className="text-gray-500 hover:text-white transition-colors"
                          >
                            <Share2 size={16} />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </AnimatePresence>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No articles found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}