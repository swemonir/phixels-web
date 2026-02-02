import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MapPin, Clock, DollarSign, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { apiService } from '../services/api';
import { Career } from '../types/api';

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [jobData, setJobData] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null);

  const GAS_DEPLOYMENT_URL = 'https://script.google.com/macros/s/AKfycbzYH-TfT_uR-2uxR8G2my7KElsR_x0f9GekGO35oSqq-qXkjI8k1zPSRvbIrATJDCg/exec';

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await apiService.getCareerById(id);
        if (response.success) {
          setJobData(response.data);
        } else {
          setError(response.message || 'Failed to fetch job details');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted || !jobData) return;

    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const portfolio = (form.elements.namedItem('portfolio') as HTMLInputElement).value;

    let resumeBase64 = '';
    if (resumeFile) {
      resumeBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(resumeFile);
      });
    }

    try {
      await fetch(GAS_DEPLOYMENT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          formType: 'job',
          name,
          email,
          portfolio,
          jobTitle: jobData.jobTitle,
          file: resumeBase64
        })
      });

      setSubmitted(true);
      setModalType('success');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
      form.reset();
      setResumeFile(null);

    } catch (err) {
      console.error('Submission error:', err);
      setSubmitted(true);
      setModalType('success');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#050505] min-h-screen pt-40 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[color:var(--bright-red)] animate-spin mb-4" />
        <p className="text-gray-400">Loading job details...</p>
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <div className="bg-[#050505] min-h-screen pt-40 px-4">
        <div className="max-w-md mx-auto text-center py-12 px-8 rounded-2xl border border-red-500/20 bg-red-500/10">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-400 mb-8">{error || 'Job not found'}</p>
          <Link to="/career">
            <Button variant="outline">Back to Careers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="bg-[#050505] min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/career" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Careers
          </Link>

          <div className="mb-12 border-b border-white/10 pb-12">
            <div className="text-[color:var(--bright-red)] font-bold mb-4 uppercase tracking-widest text-sm">
              {jobData.jobType} Team
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {jobData.jobTitle}
            </h1>
            <div className="flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <MapPin size={18} className="text-[color:var(--bright-red)]" /> {jobData.location}
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <Clock size={18} className="text-[color:var(--neon-yellow)]" /> Full Time
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <DollarSign size={18} className="text-[color:var(--vibrant-green)]" /> {jobData.salaryRange}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">About the Role</h2>
                <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">{jobData.description}</div>
              </section>

              {jobData.requirements && jobData.requirements.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
                  <ul className="space-y-4">
                    {jobData.requirements.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle size={20} className="text-[color:var(--bright-red)] shrink-0 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {jobData.responsibilities && jobData.responsibilities.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Responsibilities</h2>
                  <ul className="space-y-4">
                    {jobData.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle size={20} className="text-[color:var(--vibrant-green)] shrink-0 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 sticky top-32 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-2">Apply Now</h3>
                <p className="text-gray-400 mb-6 text-sm">Join our team and build the future.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Full Name</label>
                    <input type="text" required name="name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Email</label>
                    <input type="email" required name="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Portfolio / GitHub</label>
                    <input type="url" required name="portfolio" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors" placeholder="https://github.com/johndoe" />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Upload Resume (PDF)</label>
                    <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="resume-upload" />
                    <label htmlFor="resume-upload" className="block border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-[color:var(--bright-red)]/50 hover:bg-white/5 transition-all cursor-pointer group">
                      <div className="text-sm text-gray-400 group-hover:text-white truncate max-w-full">
                        {resumeFile ? (resumeFile.name.length > 25 ? resumeFile.name.substring(0, 22) + '...' : resumeFile.name) : 'Upload Resume (PDF)'}
                      </div>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full mt-4 ${(submitting || submitted) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    variant="primary"
                    glow
                    disabled={submitting || submitted}
                  >
                    {submitted ? 'Submitted' : submitting ? 'Sending...' : 'Submit Application'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {modalType === 'success' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setModalType(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center relative">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[color:var(--vibrant-green)]/20 flex items-center justify-center">
                <CheckCircle size={32} className="text-[color:var(--vibrant-green)]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Application Sent!</h3>
              <p className="text-gray-400">Thanks for applying. We'll review your application and get back to you shortly.</p>
              <button onClick={() => setModalType(null)} className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
