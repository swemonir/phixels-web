import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, ArrowRight, CheckCircle, Sparkles, ChevronDown, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { COUNTRY_CODES } from '../constants/common';

// Google Apps Script URL
const GAS_DEPLOYMENT_URL = 'https://script.google.com/macros/s/AKfycbzYH-TfT_uR-2uxR8G2my7KElsR_x0f9GekGO35oSqq-qXkjI8k1zPSRvbIrATJDCg/exec';

const validatePhone = (phone: string, countryCode: string) => {
  const cleaned = phone.replace(/\D/g, '');
  const minLength = countryCode === '+1' ? 10 : 7;
  const maxLength = countryCode === '+1' ? 10 : 15;
  return cleaned.length >= minLength && cleaned.length <= maxLength && /^\d+$/.test(cleaned);
};

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES.find(c => c.country === 'US') || COUNTRY_CODES[0]); // US default
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = COUNTRY_CODES.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.includes(countrySearch)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [error, setError] = useState('');

  const GAS_DEPLOYMENT_URL = 'https://script.google.com/macros/s/AKfycbzYH-TfT_uR-2uxR8G2my7KElsR_x0f9GekGO35oSqq-qXkjI8k1zPSRvbIrATJDCg/exec';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim() || !validatePhone(formData.phone, selectedCountry.code)) newErrors.phone = 'Valid phone number required for selected country';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return; // Prevent multiple submissions
    if (!validateForm()) return;
    setSubmitting(true);
    setError('');
    const phone = selectedCountry.code + formData.phone;
    try {
      const response = await fetch(GAS_DEPLOYMENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          formType: 'contactMessages',
          name: formData.name,
          email: formData.email,
          phone: phone,
          country: selectedCountry.name,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setShowSuccessModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return <main className="bg-[#050505] min-h-screen pt-48 pb-20 overflow-hidden">
    {/* Background Effects */}
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[color:var(--bright-red)]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[color:var(--neon-yellow)]/5 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[color:var(--vibrant-green)]/5 rounded-full blur-[150px]" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)}>
          <motion.div initial={{
            scale: 0.9,
            y: 20
          }} animate={{
            scale: 1,
            y: 0
          }} exit={{
            scale: 0.9,
            y: 20
          }} onClick={e => e.stopPropagation()} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center relative">
            <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} className="text-gray-400" />
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[color:var(--vibrant-green)]/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-[color:var(--vibrant-green)]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-gray-400">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
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
        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <Sparkles className="w-4 h-4 text-[color:var(--neon-yellow)]" />
          <span className="text-sm text-gray-300">
            Let's Create Something Amazing
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
          Get in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] animate-gradient bg-300%">
            Touch
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Ready to transform your vision into reality? We're here to help you
          build something extraordinary. Let's start the conversation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        {/* Contact Form */}
        <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
          <div className="relative">
            {/* Gradient border effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] rounded-3xl opacity-20 blur-sm" />

            <div className="relative bg-[#0A0A0A] rounded-3xl p-8 md:p-10 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">
                Send us a message
              </h2>
              <p className="text-gray-400 mb-8">
                Fill out the form and we'll be in touch soon.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Full Name *
                    </label>
                    <input type="text" required value={formData.name} onChange={e => {
                      setFormData({
                        ...formData,
                        name: e.target.value
                      });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }} className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[color:var(--bright-red)]'}`} placeholder="John Doe" />
                    {errors.name && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <span>⚠️</span> {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Email Address *
                    </label>
                    <input type="email" required value={formData.email} onChange={e => {
                      setFormData({
                        ...formData,
                        email: e.target.value
                      });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }} className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[color:var(--bright-red)]'}`} placeholder="john@company.com" />
                    {errors.email && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <span>⚠️</span> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 relative" ref={countryDropdownRef}>
                  <label className="text-sm text-gray-400">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <button type="button" onClick={() => setShowCountryDropdown(!showCountryDropdown)} className="h-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none transition-colors flex items-center gap-2 hover:border-white/20">
                        <span className="text-lg">
                          {selectedCountry.flag}
                        </span>
                        <span className="text-sm">
                          {selectedCountry.code}
                        </span>
                        <ChevronDown size={14} className="text-gray-400" />
                      </button>

                      {showCountryDropdown && <div className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto bg-[#0A0A0A] border border-white/10 rounded-lg shadow-2xl z-50">
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={countrySearch}
                          onChange={e => setCountrySearch(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border-b border-white/10 text-white placeholder-gray-400 focus:outline-none"
                        />
                        {filteredCountries.map(country => <button key={country.code + country.country} type="button" onClick={() => {
                          setSelectedCountry(country);
                          setShowCountryDropdown(false);
                          setCountrySearch('');
                        }} className="w-full px-4 py-2 text-left hover:bg-white/10 transition-colors flex items-center gap-3 text-sm">
                          <span className="text-lg">
                            {country.flag}
                          </span>
                          <span className="text-white flex-1">
                            {country.name}
                          </span>
                          <span className="text-gray-400">
                            {country.code}
                          </span>
                        </button>)}
                      </div>}
                    </div>
                    <input type="tel" required value={formData.phone} onChange={e => {
                      setFormData({
                        ...formData,
                        phone: e.target.value
                      });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }} className={`flex-1 bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[color:var(--bright-red)]'}`} placeholder="123 456 7890" />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <span>⚠️</span> {errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Your Message *
                  </label>
                  <textarea required value={formData.message} onChange={e => {
                    setFormData({
                      ...formData,
                      message: e.target.value
                    });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }} rows={5} className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[color:var(--bright-red)]'}`} placeholder="Tell us about your project..." />
                  {errors.message && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <span>⚠️</span> {errors.message}
                    </p>
                  )}
                </div>

                <Button type="submit" variant="primary" glow className="w-full py-4 text-lg" disabled={submitting}>
                  {submitting ? 'Sending...' : <span className="flex items-center justify-center gap-2">
                    Send Message <Send className="w-5 h-5" />
                  </span>}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="space-y-8">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 gap-6">
            {[{
              icon: Mail,
              label: 'Email Us',
              value: 'phixels.io@gmail.com',
              href: 'mailto:phixels.io@gmail.com',
              color: 'text-[color:var(--bright-red)]',
              bgColor: 'bg-[color:var(--bright-red)]/10'
            }, {
              icon: Phone,
              label: 'Call Us',
              value: '+880 1723 289090',
              href: 'tel:+8801723289090',
              color: 'text-[color:var(--vibrant-green)]',
              bgColor: 'bg-[color:var(--vibrant-green)]/10'
            }, {
              icon: null,
              imageIcon: "/WhatsApp.svg",
              label: 'WhatsApp',
              value: '+880 1723 289090',
              href: 'https://wa.me/8801723289090',
              color: 'text-[#25D366]',
              bgColor: 'bg-[#25D366]/10'
            }, {
              icon: MapPin,
              label: 'Visit Us',
              value: '112/2 Mohakhali, Dhaka, Bangladesh',
              href: '#',
              color: 'text-[color:var(--neon-yellow)]',
              bgColor: 'bg-[color:var(--neon-yellow)]/10'
            }].map((item, i) => <motion.a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5 + i * 0.1
            }} className="group flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className={`w-14 h-14 rounded-xl ${item.bgColor} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon ? <item.icon className="w-6 h-6" /> : <img src={item.imageIcon} alt={item.label} className="w-8 h-8" />}
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">
                  {item.label}
                </div>
                <div className="text-lg font-semibold text-white group-hover:text-[color:var(--bright-red)] transition-colors">
                  {item.value}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </motion.a>)}
          </div>

          {/* Office Hours */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.9
          }} className="p-6 bg-gradient-to-br from-[color:var(--deep-navy)]/50 to-transparent rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-[color:var(--neon-yellow)]" />
              <h3 className="text-lg font-bold text-white">Office Hours</h3>
            </div>
            <div className="space-y-3 text-gray-400">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-white">24/7</span>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--vibrant-green)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[color:var(--vibrant-green)]"></span>
                  </span>
                  <span className="text-white font-medium">
                    Always Available
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                We operate around the clock to serve clients across all time
                zones
              </p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 1
          }}>
            <h3 className="text-lg font-bold text-white mb-4">
              Connect With Us
            </h3>
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
              }].map((social, i) => <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="group" initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 1 + i * 0.1
              }} whileHover={{
                scale: 1.1,
                y: -2
              }}>
                <img src={social.icon} alt={social.alt} className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" style={{
                  filter: social.filter || 'none'
                }} />
              </motion.a>)}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Find Us Here</h2>
          <p className="text-gray-400">
            Visit our office in Dhaka, Bangladesh
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none" />
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.4!3d23.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzQ4LjAiTiA5MMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1234567890" width="100%" height="400" style={{
            border: 0,
            filter: 'grayscale(100%) invert(92%) contrast(83%)',
            transition: 'filter 0.3s ease'
          }} className="group-hover:!filter-none" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Phixels Office Location" />
        </div>
      </motion.div>
    </div>
  </main>;
}