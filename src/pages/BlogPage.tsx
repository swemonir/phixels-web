import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Share2, Calendar, Clock, CheckCircle, X, Loader2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { apiService } from '../services/api';
import { Blog } from '../types/api';

export function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Newsletter States
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;

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
      // Falling back to success modal as per the user's logic (similar to Footer)
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
      // Note: User's UI didn't have a specific "Copied!" tooltip in this version, 
      // but I'll keep the logic simple or just rely on the native share.
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 text-[color:var(--bright-red)] animate-spin mb-4" />
        <p className="text-gray-400">Loading insights...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center pt-20 p-4">
        <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20 max-w-2xl w-full">
          {error}
        </div>
      </div>
    );
  }

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
        {selectedCategory === 'All' && !searchTerm && featuredPost && (
          <Link to={`/blog/${featuredPost._id}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-20 relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>
              <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end min-h-[500px]">
                <span className="inline-block px-4 py-1 rounded-full bg-[color:var(--bright-red)] text-white text-sm font-bold mb-4 w-fit">
                  Featured
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl group-hover:text-[color:var(--neon-yellow)] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mb-8 line-clamp-2">
                  {featuredPost.details}
                </p>
                <div className="flex items-center gap-6 text-gray-400">
                  <span className="flex items-center gap-2">
                    <Calendar size={18} /> {new Date(featuredPost.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={18} /> {featuredPost.readingTime} read
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8 h-fit lg:sticky lg:top-32">
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
                        {blogs.filter(p => p.tags.includes(cat)).length}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Subscription Box */}
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
                    key={post._id}
                    className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-[color:var(--bright-red)] transition-all duration-300 flex flex-col"
                  >
                    <Link to={`/blog/${post._id}`} className="flex-1 flex flex-col">
                      <div className="relative aspect-video overflow-hidden bg-gray-800">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                            {post.tags[0] || 'Article'}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                            <User size={16} className="text-gray-400" />
                          </div>
                          <span className="text-gray-300 text-sm">{post.writer}</span>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[color:var(--neon-yellow)] transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                          {post.details}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            <span>{post.readingTime} read</span>
                          </div>
                          <button
                            onClick={e => handleShare(e, post.title, post._id)}
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
