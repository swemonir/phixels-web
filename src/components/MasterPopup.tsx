import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Calendar, Clock, Edit2, Zap, ChevronDown, AlertCircle } from 'lucide-react';
import { usePopup } from '../context/PopupContext';
import { Button } from './ui/Button';
import { ReviewCarousel } from './ReviewCarousel';
import { FileUpload } from './FileUpload';
import confetti from 'canvas-confetti';
import { BOOKED_SLOTS, COUNTRY_CODES } from '../constants/common';

// Google Apps Script URL
const GAS_DEPLOYMENT_URL = 'https://script.google.com/macros/s/AKfycbzYH-TfT_uR-2uxR8G2my7KElsR_x0f9GekGO35oSqq-qXkjI8k1zPSRvbIrATJDCg/exec';
const validatePhone = (phone: string, countryCode: string) => {
  const cleaned = phone.replace(/\D/g, '');
  const minLength = countryCode === '+1' ? 10 : 7;
  const maxLength = countryCode === '+1' ? 10 : 15;
  return cleaned.length >= minLength && cleaned.length <= maxLength && /^\d+$/.test(cleaned);
};

async function submitData(formDataPayload: Record<string, string>) {
  try {
    const params = new URLSearchParams();
    Object.keys(formDataPayload).forEach(key => {
      params.append(key, formDataPayload[key] || '');
    });

    const response = await fetch(GAS_DEPLOYMENT_URL, {
      method: 'POST',
      mode: 'cors',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error };
  }
}

// Helper to convert file to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export function MasterPopup() {
  const { isOpen, closePopup } = usePopup();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIntermediateSuccess, setShowIntermediateSuccess] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const budgetDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const [requestId, setRequestId] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    date: '',
    time: '',
    overview: ''
  });

  // Filtered countries based on search
  const filteredCountries = COUNTRY_CODES.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.name.toLowerCase().startsWith(countrySearch.toLowerCase())
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (budgetDropdownRef.current && !budgetDropdownRef.current.contains(event.target as Node)) {
        setShowBudgetDropdown(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
        setCountrySearch(''); // Reset search on close
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setFiles([]);
        setErrors({});
        setShowIntermediateSuccess(false);
        setSelectedCountry(COUNTRY_CODES[0]);
        setShowBudgetDropdown(false);
        setShowCountryDropdown(false);
        setCountrySearch('');
        setRequestId('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          budget: '',
          date: '',
          time: '',
          overview: ''
        });
      }, 500);
    }
  }, [isOpen]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.phone.trim() || !validatePhone(formData.phone, selectedCountry.code)) newErrors.phone = 'Valid phone number required for selected country';
    if (!formData.email.trim()) newErrors.email = 'Work Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFirstStepSubmit = async () => {
    if (!validateStep1()) return;
    setIsSubmitting(true);

    // Generate unique requestId
    const newRequestId = crypto.randomUUID();
    setRequestId(newRequestId);

    // Convert ALL files to Base64 (Updated Logic for Multiple Files)
    const allFilesData = await Promise.all(files.map(async (file) => {
      const base64 = await fileToBase64(file);
      return {
        name: file.name,
        type: file.type,
        data: base64
      };
    }));

    // Prepare data for Google Apps Script (Step 1 - Lead)
    const formDataPayload = {
      formType: 'master',
      fullName: formData.name,
      email: formData.email,
      phone: `${selectedCountry.code.replace('+', '')} ${formData.phone}`,
      country: selectedCountry.name,
      budget: formData.budget,
      description: formData.overview,
      filesData: JSON.stringify(allFilesData), // Changed from 'file' to 'filesData' JSON string
      requestId: newRequestId,
      isFinal: 'false'
    };

    // Submit to Google Sheets
    await submitData(formDataPayload);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowIntermediateSuccess(true);

    // Show success message for 2 seconds then move to next step
    setTimeout(() => {
      setShowIntermediateSuccess(false);
      setStep(2);
    }, 2000);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    // Convert ALL files to Base64 (Updated Logic for Multiple Files)
    const allFilesData = await Promise.all(files.map(async (file) => {
      const base64 = await fileToBase64(file);
      return {
        name: file.name,
        type: file.type,
        data: base64
      };
    }));

    // Prepare data for Google Apps Script (Step 4 - Booking Confirmed)
    const formDataPayload = {
      formType: 'master',
      fullName: formData.name,
      email: formData.email,
      phone: `${selectedCountry.code.replace('+', '')} ${formData.phone}`,
      country: selectedCountry.name,
      budget: formData.budget,
      description: formData.overview,
      filesData: JSON.stringify(allFilesData), // Changed from 'file' to 'filesData' JSON string
      meetingDate: formData.date,
      meetingTime: formData.time,
      requestId: requestId,
      isFinal: 'true'
    };

    // Submit to Google Sheets
    await submitData(formDataPayload);

    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setStep(5); // Success step

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ED1F24', '#FFFF00', '#00CD49']
    });

    // Auto close
    setTimeout(() => {
      closePopup();
    }, 4000);
  };

  const isSlotBooked = (dateStr: string, timeStr: string) => {
    return BOOKED_SLOTS.some(slot => slot.date.includes(dateStr) && slot.time === timeStr);
  };

  if (!isOpen) return null;

  // Mock dates for calendar
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      full: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    };
  });

  const timeSlots = ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
  const budgetOptions = ['Less than $1k', '$1k - $3k', '$3k - $10k', '$10k - $20k', '$20k - $50k', 'More than $50k'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePopup}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh]"
        >
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 z-20 p-2 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* LEFT COLUMN */}
          <div className="hidden md:flex w-[35%] bg-[#0F0F0F] p-8 flex-col border-r border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--deep-navy),_transparent_70%)] opacity-20" />

            <div className="relative z-10 flex flex-col h-full">
              {/* Animated Mascot Character */}
              <motion.div className="self-center mb-6 relative" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
                <div className="w-28 h-28 relative">
                  <motion.div className="w-full h-full relative" whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotateY: [0, 10, 0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <motion.circle cx="50" cy="8" r="5" fill="var(--neon-yellow)" animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                        <line x1="50" y1="13" x2="50" y2="22" stroke="var(--neon-yellow)" strokeWidth="3" />
                        <rect x="20" y="22" width="60" height="50" rx="8" fill="#1a1a1a" stroke="var(--bright-red)" strokeWidth="2" />
                        <motion.circle cx="35" cy="42" r="8" fill="var(--bright-red)" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} />
                        <motion.circle cx="65" cy="42" r="8" fill="var(--bright-red)" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.4 }} />
                        <circle cx="35" cy="42" r="3" fill="white" />
                        <circle cx="65" cy="42" r="3" fill="white" />
                        <motion.rect x="35" y="55" width="30" height="4" rx="2" fill="var(--neon-yellow)" animate={{ width: [30, 25, 30] }} transition={{ repeat: Infinity, duration: 2 }} />
                        <rect x="25" y="75" width="50" height="20" rx="5" fill="#1a1a1a" stroke="var(--neon-yellow)" strokeWidth="2" />
                        <motion.circle cx="50" cy="85" r="6" fill="var(--vibrant-green)" animate={{ opacity: [1, 0.4, 1], fill: ['var(--vibrant-green)', 'var(--neon-yellow)', 'var(--vibrant-green)'] }} transition={{ repeat: Infinity, duration: 2 }} />
                      </svg>
                    </motion.div>
                    <div className="absolute inset-0 bg-[color:var(--bright-red)]/20 rounded-full blur-xl -z-10" />
                  </motion.div>
                </div>
              </motion.div>

              <div className="text-center mb-8">
                <motion.h3 className="text-2xl font-bold mb-3 text-white cursor-default" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[color:var(--neon-yellow)] to-white bg-300% animate-gradient">
                    Transforming Ideas Into
                    <br />
                    Digital Empires
                  </span>
                </motion.h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Join hundreds of visionary founders who scaled their dreams with Phixels.
                </p>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-8">
                <ReviewCarousel />
              </div>

              <div className="pt-6 border-t border-white/10 mt-auto">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 text-center">
                  Trusted By Industry Leaders
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'TechCorp', color: '--ice-grey' },
                    { name: 'DataFlow', color: '--ice-grey' },
                    { name: 'CloudSync', color: '--ice-grey' },
                    { name: 'NexGen', color: '--ice-grey' },
                    { name: 'ByteWave', color: '--ice-grey' },
                    { name: 'CodeLabs', color: '--ice-grey' }
                  ].map((brand, i) => (
                    <div key={i} className="h-10 bg-white/5 rounded flex items-center justify-center hover:bg-white/10 transition-colors group cursor-default">
                      <span className="text-[12px] font-bold text-white/70" style={{ color: brand.color }}>
                        {brand.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full md:w-[65%] p-8 overflow-y-auto bg-[#0A0A0A] custom-scrollbar relative">
            {/* Intermediate Success Modal */}
            <AnimatePresence>
              {showIntermediateSuccess && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                  <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-16 h-16 rounded-full bg-[color:var(--vibrant-green)]/20 flex items-center justify-center mb-4">
                    <Check className="text-[color:var(--vibrant-green)]" size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Great Start!</h3>
                  <p className="text-gray-400">We've received your initial details.<br />Let's schedule your call.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="max-w-2xl mx-auto h-full flex flex-col">
              {step < 5 && (
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Let's Engineer Your <br />
                    <span className="text-gradient">Billion-Dollar Idea</span>
                  </h2>
                  <div className="flex gap-2 mt-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${step >= i ? 'bg-[color:var(--bright-red)]' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 1: Info & Files */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="space-y-1 w-full">
                      <label className="text-xs text-gray-400">Full Name *</label>
                      <input
                        name="fullName"
                        type="text"
                        className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[color:var(--bright-red)]'}`}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[10px] flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 relative w-full" ref={countryDropdownRef}>
                      <label className="text-xs text-gray-400">Phone *</label>
                      <div className="flex w-full gap-2 sm:flex-nowrap"> {/* Responsive flex */}
                        <div className="relative shrink-0">
                          <button
                            type="button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className={`h-full bg-white/5 border rounded-lg px-3 py-3 text-white focus:outline-none transition-colors flex items-center gap-2 ${errors.phone ? 'border-red-500' : 'border-white/10 hover:border-white/20'}`}
                          >
                            <span className="text-lg">{selectedCountry.flag}</span>
                            <span className="text-sm">{selectedCountry.code}</span>
                            <ChevronDown size={14} className="text-gray-400" />
                          </button>

                          {showCountryDropdown && (
                            <div className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto bg-[#0A0A0A] border border-white/10 rounded-lg shadow-2xl z-50 custom-scrollbar">
                              <input
                                type="text"
                                placeholder="Search countries..."
                                value={countrySearch}
                                onChange={e => setCountrySearch(e.target.value)}
                                className="w-full px-4 py-2 bg-white/5 border-b border-white/10 text-white placeholder-gray-400 focus:outline-none"
                              />
                              {filteredCountries.map(country => (
                                <button
                                  key={country.code + country.country}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setShowCountryDropdown(false);
                                    setCountrySearch('');
                                  }}
                                  className="w-full px-4 py-2 text-left hover:bg-white/10 transition-colors flex items-center gap-3 text-sm"
                                >
                                  <span className="text-lg">{country.flag}</span>
                                  <span className="text-white flex-1">{country.name}</span>
                                  <span className="text-gray-400">{country.code}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <input
                          name="phone"
                          type="tel"
                          className={`w-full flex-1 min-w-0 bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[color:var(--bright-red)]'}`}
                          placeholder="123 456 7890"
                          value={formData.phone}
                          onChange={e => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: '' });
                          }}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-[10px] flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Work Email *</label>
                      <input
                        name="email"
                        type="email"
                        className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[color:var(--bright-red)]'}`}
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={e => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[10px] flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 relative" ref={budgetDropdownRef}>
                      <label className="text-xs text-gray-400">Budget Range</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors text-left flex items-center justify-between"
                        >
                          <span className={formData.budget ? 'text-white' : 'text-gray-500'}>{formData.budget || 'Select Range'}</span>
                          <ChevronDown className="text-gray-400" size={16} />
                        </button>

                        {showBudgetDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-[#0A0A0A] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
                            {budgetOptions.map(option => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, budget: option });
                                  setShowBudgetDropdown(false);
                                }}
                                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors text-sm"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Project Description</label>
                    <textarea
                      name="description"
                      className="w-full h-24 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors resize-none"
                      placeholder="Briefly describe your project vision..."
                      value={formData.overview}
                      onChange={e => setFormData({ ...formData, overview: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">Attachments (Optional)</label>
                    <FileUpload files={files} onFilesChange={setFiles} />
                  </div>

                  <Button onClick={handleFirstStepSubmit} disabled={isSubmitting} className="w-full group relative overflow-hidden" variant="primary" glow>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? 'Processing...' : "Let's Connect"}
                      {!isSubmitting && (
                        <motion.span animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                          <Zap size={18} className="fill-current" />
                        </motion.span>
                      )}
                    </span>
                  </Button>
                </motion.div>
              )}

              {/* STEP 2: Date */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white">Select a Date</h3>
                    <p className="text-sm text-gray-400">When should we discuss your project?</p>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                    {dates.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setFormData({ ...formData, date: d.full })}
                        className={`p-3 rounded-xl border transition-all ${formData.date === d.full ? 'bg-[color:var(--bright-red)] border-[color:var(--bright-red)] text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:border-[color:var(--neon-yellow)] hover:bg-white/10'}`}
                      >
                        <div className="text-xs opacity-70">{d.day}</div>
                        <div className="text-lg font-bold">{d.date}</div>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">

                    <Button onClick={() => setStep(3)} disabled={!formData.date} className="flex-1">
                      Continue
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Time */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white">Select a Time</h3>
                    <p className="text-sm text-gray-400">{formData.date}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map(time => {
                      const isBooked = isSlotBooked(formData.date, time);
                      return (
                        <button
                          key={time}
                          disabled={isBooked}
                          onClick={() => setFormData({ ...formData, time })}
                          className={`p-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${isBooked ? 'opacity-40 cursor-not-allowed bg-white/5 border-white/5' : formData.time === time ? 'bg-[color:var(--bright-red)] border-[color:var(--bright-red)] text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:border-[color:var(--neon-yellow)] hover:bg-white/10'}`}
                        >
                          <Clock size={16} />
                          <span className="font-medium">{time}</span>
                          {isBooked && <span className="text-[10px] bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded ml-1">Booked</span>}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button onClick={() => setStep(2)} className="px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors">
                      Back
                    </button>
                    <Button onClick={() => setStep(4)} disabled={!formData.time} className="flex-1">
                      Review & Confirm
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Review */}
              {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Review Details</h3>

                  <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex justify-between items-start">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Contact Info</div>
                        <div className="font-medium text-white">{formData.name}</div>
                        <div className="text-sm text-gray-400">{formData.email}</div>
                        <div className="text-sm text-gray-400">{`${selectedCountry.code} ${formData.phone}`}</div>
                      </div>

                    </div>

                    <div className="p-4 border-b border-white/10 flex justify-between items-start">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Appointment</div>
                        <div className="flex items-center gap-2 text-[color:var(--neon-yellow)] font-medium">
                          <Calendar size={14} /> {formData.date}
                        </div>
                        <div className="flex items-center gap-2 text-white mt-1">
                          <Clock size={14} /> {formData.time}
                        </div>
                      </div>
                      <button onClick={() => setStep(2)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 transition-colors">
                        <Edit2 size={14} />
                      </button>
                    </div>

                    <div className="p-4 border-b border-white/10 flex justify-between items-start">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Attachments</div>
                        {files.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {files.map((f, i) => (
                              <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-white flex items-center gap-1">
                                {f.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 italic">No attachments</span>
                        )}
                      </div>

                    </div>

                    <div className="p-4 flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Project Note</div>
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">
                          {formData.overview || <span className="italic text-gray-600">No description provided</span>}
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button onClick={() => setStep(3)} className="px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors">
                      Back
                    </button>
                    <Button onClick={handleFinalSubmit} disabled={isSubmitting} className="flex-1" glow>
                      {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Success */}
              {step === 5 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 flex flex-col items-center justify-center h-full">
                  <div className="w-24 h-24 bg-[color:var(--vibrant-green)]/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <Check size={48} className="text-[color:var(--vibrant-green)]" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">Booking Confirmed!</h2>
                  <p className="text-gray-400 mb-8 max-w-md">
                    We've sent a confirmation email to <span className="text-white">{formData.email}</span>. Our team is analyzing your requirements and will be ready for our call.
                  </p>
                  <div className="text-xs text-gray-500">Closing in a few seconds...</div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}