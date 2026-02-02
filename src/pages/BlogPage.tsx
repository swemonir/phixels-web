import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Share2, Clock, CheckCircle, X, Loader2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { apiService } from '../services/api';
import { Blog } from '../types/api';

export function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showShareTooltip, setShowShareTooltip] = useState<string | null>(null);
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await apiService.getBlogs();
        if (response.success) {
          setBlogs(response.data);
        } else {
          setError(response.message || 'Failed to fetch blogs');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = ['All', ...new Set(blogs.flatMap(blog => blog.tags).filter(Boolean))];

  const filteredPosts = blogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  const handleShare = async (e: React.MouseEvent, title: string, id: string) => {
    e.preventDefault();
    const url = `${window.location.origin}/blog/${id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShowShareTooltip(id);
      setTimeout(() => setShowShareTooltip(null), 2000);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriptionEmail) return;
    setSubscriptionStatus('loading');
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyHjclWf7_B68FWhlU8K4h1H-G_p-eT-Yvj_p_Yj_p_Yj_p_Yj_p/exec', {
        method: 'POST',
        body: JSON.stringify({ email: subscriptionEmail, type: 'newsletter' })
      });
      if (response.ok) {
        setSubscriptionStatus('success');
        setSubscriptionEmail('');
      } else {
        setSubscriptionStatus('error');
      }
    } catch (err) {
      setSubscriptionStatus('error');
    }
  };

  return (
    <main className="bg-[#050505] min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Our <span className="text-gradient">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            Insights, tutorials, and updates from the Phixels team.
          </motion.p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
                  ? 'bg-[color:var(--bright-red)] text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-[color:var(--bright-red)] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[color:var(--bright-red)] animate-spin mb-4" />
            <p className="text-gray-400">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20">
            {error}
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured Post */}
            {featuredPost && selectedCategory === 'All' && !searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5"
              >
                <Link to={`/blog/${featuredPost._id}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="aspect-video lg:aspect-square overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 rounded-full bg-[color:var(--bright-red)] text-white text-xs font-bold uppercase tracking-wider">
                        Featured
                      </span>
                      {featuredPost.tags[0] && (
                        <span className="text-gray-500 text-sm">{featuredPost.tags[0]}</span>
                      )}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-[color:var(--bright-red)] transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 line-clamp-3">
                      {featuredPost.details.substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                          <User size={24} className="text-gray-400" />
                        </div>
                        <div>
                          <div className="text-white font-bold">{featuredPost.writer}</div>
                          <div className="text-gray-500 text-sm">
                            {new Date(featuredPost.createdAt).toLocaleDateString()} • {featuredPost.readingTime}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleShare(e, featuredPost.title, featuredPost._id)}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                      >
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
                  >
                    <Link to={`/blog/${post._id}`} className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[color:var(--bright-red)] text-xs font-bold uppercase tracking-wider">
                          {post.tags[0] || 'Articles'}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Clock size={14} />
                          {post.readingTime}
                        </div>
                      </div>
                      <Link to={`/blog/${post._id}`}>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[color:var(--bright-red)] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                        {post.details.substring(0, 100)}...
                      </p>
                      <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                            <User size={16} className="text-gray-400" />
                          </div>
                          <span className="text-gray-300 text-sm">{post.writer}</span>
                        </div>
                        <button
                          onClick={(e) => handleShare(e, post.title, post._id)}
                          className="text-gray-500 hover:text-white transition-colors relative"
                        >
                          <Share2 size={18} />
                          {showShareTooltip === post._id && (
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded">
                              Copied!
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No articles found matching your criteria.
              </div>
            )}
          </div>
        )}

        {/* Newsletter */}
        <section className="mt-32 max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-gradient-to-br from-[color:var(--bright-red)] to-[color:var(--deep-navy)]">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Stay in the loop
                </h2>
                <p className="text-white/80 text-lg">
                  Get the latest insights, tutorials, and team updates delivered straight to your inbox.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={subscriptionEmail}
                    onChange={(e) => setSubscriptionEmail(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all"
                    required
                  />
                  <Button
                    variant="primary"
                    className="bg-white text-black hover:bg-gray-100 px-8 py-4 font-bold"
                    disabled={subscriptionStatus === 'loading'}
                  >
                    {subscriptionStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
                {subscriptionStatus === 'success' && (
                  <div className="flex items-center gap-2 text-white font-medium">
                    <CheckCircle size={20} /> Thanks for subscribing!
                  </div>
                )}
                {subscriptionStatus === 'error' && (
                  <div className="text-white/90 text-sm font-medium">
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}