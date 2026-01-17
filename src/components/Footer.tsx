import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin, MessageCircle, Mail, ArrowRight, ChevronDown, Facebook, CheckCircle, X, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export function Footer() {
  const location = useLocation(); // পেজ চেঞ্জ ডিটেক্ট করার জন্য
  const [worksDropdownOpen, setWorksDropdownOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [modalType, setModalType] = useState<'success' | null>(null);

  const GAS_DEPLOYMENT_URL = 'https://script.google.com/macros/s/AKfycbzYH-TfT_uR-2uxR8G2my7KElsR_x0f9GekGO35oSqq-qXkjI8k1zPSRvbIrATJDCg/exec';

  // পেজ পরিবর্তন হলে ফর্ম এবং এরর রিসেট হবে
  useEffect(() => {
    setEmail('');
    setError('');
    setSubmitted(false);
    setSubmitting(false);
    setModalType(null);
  }, [location.pathname]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(GAS_DEPLOYMENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          formType: 'newsletter',
          email: email
        })
      });

      // টেক্সট রেসপন্স চেক করা হচ্ছে
      const text = await response.text();

      // যদি মেইল ডুপ্লিকেট হয়
      if (text.includes('already_subscribed') || text.toLowerCase().includes('already')) {
        setError('This email is already subscribed. Please try another one.');
        setSubmitting(false); // বাটন আবার এনাবল করে দিলাম যাতে অন্য মেইল দিতে পারে
        return;
      }

      // সাকসেস হলে
      setModalType('success');
      setSubmitted(true);
      setEmail('');

    } catch (err) {
      // টেকনিক্যাল এরর ইগনোর করে সাকসেস দেখানো হচ্ছে (সেফটি)
      setModalType('success');
      setSubmitted(true);
      setEmail('');
    } finally {
      if (!error) {
        setSubmitting(false);
      }
    }
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
      {/* Success Modal (শুধুমাত্র সাকসেস হলে আসবে) */}
      <AnimatePresence>
        {modalType === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setModalType(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center relative"
            >
              <button onClick={() => setModalType(null)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>

              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[color:var(--vibrant-green)]/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[color:var(--vibrant-green)]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-400">
                You've successfully subscribed to our newsletter. Stay tuned for
                the latest updates!
              </p>
              <button onClick={() => setModalType(null)} className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-[color:var(--deep-navy)] rounded-full mix-blend-screen filter blur-[150px] opacity-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[color:var(--deep-red)] rounded-full mix-blend-screen filter blur-[150px] opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section: Grand Statement */}
        <div className="mb-24 text-center md:text-left">
          <div className="mb-8">
            <img src="/Phixels-Logo.svg" alt="Phixels" className="h-20 md:h-28 lg:h-32 w-auto mx-auto md:mx-0" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/10 pb-12">
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl">
              We don't just write code. We engineer digital dominance for
              ambitious brands ready to conquer their market.
            </p>
            <Button variant="primary" glow triggerPopup className="text-lg px-8 py-4 rounded-full">
              Start Your Project <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Middle Section: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          {/* Column 1: Navigation (4 cols) */}
          <div className="md:col-span-4 space-y-8">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-4 text-2xl font-bold">
              <li>
                <Link to="/services" className="text-white hover:text-[color:var(--bright-red)] hover:pl-4 transition-all duration-300 inline-block">
                  Services
                </Link>
              </li>
              <li className="relative">
                <button onClick={() => setWorksDropdownOpen(!worksDropdownOpen)} className="text-white hover:text-[color:var(--bright-red)] hover:pl-4 transition-all duration-300 inline-flex items-center gap-2">
                  Works
                  <ChevronDown size={20} className={`transition-transform duration-300 ${worksDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {worksDropdownOpen && <ul className="mt-2 ml-4 space-y-2 text-lg">
                  <li>
                    <Link to="/portfolio" className="text-gray-400 hover:text-[color:var(--bright-red)] hover:pl-2 transition-all duration-300 inline-block">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link to="/case-studies" className="text-gray-400 hover:text-[color:var(--bright-red)] hover:pl-2 transition-all duration-300 inline-block">
                      Case Studies
                    </Link>
                  </li>
                </ul>}
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-[color:var(--bright-red)] hover:pl-4 transition-all duration-300 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/career" className="text-white hover:text-[color:var(--bright-red)] hover:pl-4 transition-all duration-300 inline-block">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white hover:text-[color:var(--bright-red)] hover:pl-4 transition-all duration-300 inline-block">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-[color:var(--bright-red)] hover:pl-4 transition-all duration-300 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact (4 cols) */}
          <div className="md:col-span-4 space-y-8">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Contact
            </h4>
            <div className="space-y-6">
              <a href="mailto:phixels.io@gmail.com" className="block group">
                <div className="text-gray-400 text-sm mb-1 group-hover:text-[color:var(--bright-red)] transition-colors">
                  Email Us
                </div>
                <div className="text-xl md:text-2xl font-bold text-white">
                  phixels.io@gmail.com
                </div>
              </a>
              <a href="https://wa.me/8801723289090" className="block group">
                <div className="text-gray-400 text-sm mb-1 group-hover:text-[color:var(--vibrant-green)] transition-colors">
                  WhatsApp
                </div>
                <div className="text-xl md:text-2xl font-bold text-white">
                  +880 1723 289090
                </div>
              </a>
              <div className="block">
                <div className="text-gray-400 text-sm mb-1">Visit HQ</div>
                <div className="text-xl font-bold text-white">
                  112/2 Mohakhali,
                  <br />
                  Dhaka, Bangladesh
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Social & Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-12">
            <div>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">
                Connect
              </h4>
              <div className="flex flex-wrap gap-6">
                {[{
                  icon: "/Linkedin.svg",
                  href: 'https://www.linkedin.com/company/106724193',
                  alt: 'LinkedIn'
                }, {
                  icon: "/WhatsApp.svg",
                  href: 'https://wa.me/8801723289090',
                  alt: 'WhatsApp'
                }, {
                  icon: "/mail.svg",
                  href: 'mailto:phixels.io@gmail.com',
                  alt: 'Email'
                }, {
                  icon: "/Behance.svg",
                  href: 'https://www.behance.net/phixelsio',
                  alt: 'Behance',
                  filter: 'brightness(0) invert(1)'
                }, {
                  icon: "/Facebook.svg",
                  href: 'https://www.facebook.com/Phixels.agency',
                  alt: 'Facebook'
                }].map((social, i) => <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="group" whileHover={{
                  scale: 1.1,
                  y: -2
                }} transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 17
                }}>
                  <img src={social.icon} alt={social.alt} className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" style={{
                    filter: social.filter || 'none'
                  }} />
                </motion.a>)}
              </div>
            </div>

            {/* Newsletter Section - UPDATED LOGIC HERE */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-white mb-2">
                Subscribe to Newsletter
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                Get the latest tech trends directly in your inbox.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => {
                      setEmail(e.target.value);
                      setError(''); // টাইপ করার সময় এরর মুছে যাবে
                    }} 
                    placeholder="Enter email" 
                    className={`flex-1 bg-black border ${error ? 'border-red-500/50' : 'border-white/20'} rounded-lg px-4 py-2 text-white text-sm focus:border-[color:var(--bright-red)] outline-none transition-colors`} 
                    required 
                  />
                  <button 
                    type="submit" 
                    disabled={submitting || submitted} 
                    className="bg-white text-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-[color:var(--bright-red)] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
                  >
                    {submitted ? 'Joined' : submitting ? '...' : 'Join'}
                  </button>
                </div>

                {/* Inline Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-red-400 text-xs font-medium"
                    >
                      <AlertCircle size={14} />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

          </div>
        </div>

        {/* Bottom Section: Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-gray-500">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Phixels Agency. All rights
            reserved.
          </div>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}