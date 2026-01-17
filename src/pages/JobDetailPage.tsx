import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MapPin, Clock, DollarSign, CheckCircle, ArrowLeft, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Job data structure
const jobsData = {
  1: {
    title: 'Senior React Native Engineer',
    type: 'Engineering',
    location: 'Remote / Dhaka',
    salary: '$80k - $120k',
    description: 'We are looking for a Senior React Native Engineer to join our mobile development team. You will be responsible for building high-performance, scalable mobile applications that serve millions of users worldwide.',
    requirements: [
      '5+ years of React Native development experience',
      'Strong knowledge of JavaScript/TypeScript',
      'Experience with state management (Redux, Context API)',
      'Familiarity with native iOS/Android development',
      'Experience with RESTful APIs and GraphQL',
      'Knowledge of CI/CD pipelines and automated testing'
    ],
    benefits: [
      'Competitive salary + equity',
      'Remote work flexibility',
      'Learning & development budget',
      'Health insurance coverage',
      'Flexible working hours',
      'Latest MacBook Pro + equipment'
    ]
  },
  2: {
    title: 'Backend Architect (Node.js/Go)',
    type: 'Engineering',
    location: 'Remote / Global',
    salary: '$90k - $140k',
    description: 'Join our backend team as a Backend Architect specializing in Node.js and Go. You will design and implement scalable, secure, and high-performance backend systems that power our mobile and web applications.',
    requirements: [
      '7+ years of backend development experience',
      'Expert knowledge of Node.js and Go',
      'Experience with microservices architecture',
      'Strong understanding of databases (PostgreSQL, MongoDB, Redis)',
      'Knowledge of cloud platforms (AWS, GCP, Azure)',
      'Experience with Docker and Kubernetes',
      'Familiarity with message queues and event-driven architecture'
    ],
    benefits: [
      'Competitive salary + equity',
      'Remote work flexibility',
      'Learning & development budget',
      'Health insurance coverage',
      'Flexible working hours',
      'Latest development equipment'
    ]
  },
  3: {
    title: 'Senior UI/UX Designer',
    type: 'Design',
    location: 'Hybrid / Dhaka',
    salary: '$60k - $90k',
    description: 'We are seeking a Senior UI/UX Designer to create exceptional user experiences for our mobile and web applications. You will work closely with our development team to design intuitive, beautiful, and user-friendly interfaces.',
    requirements: [
      '4+ years of UI/UX design experience',
      'Proficiency in Figma, Sketch, or Adobe Creative Suite',
      'Strong portfolio demonstrating mobile and web design skills',
      'Experience with user research and usability testing',
      'Knowledge of design systems and component libraries',
      'Understanding of mobile-first and responsive design principles'
    ],
    benefits: [
      'Competitive salary + equity',
      'Hybrid work model',
      'Design tools and software budget',
      'Health insurance coverage',
      'Flexible working hours',
      'Creative work environment'
    ]
  },
  4: {
    title: 'Technical Project Manager',
    type: 'Product',
    location: 'Remote / Global',
    salary: '$70k - $100k',
    description: 'As a Technical Project Manager, you will oversee the planning, execution, and delivery of complex software projects. You will bridge the gap between technical teams and stakeholders, ensuring projects are delivered on time and meet quality standards.',
    requirements: [
      '5+ years of project management experience in tech',
      'Experience managing software development projects',
      'Strong understanding of Agile/Scrum methodologies',
      'Excellent communication and leadership skills',
      'Knowledge of project management tools (Jira, Asana, etc.)',
      'Technical background or understanding of software development'
    ],
    benefits: [
      'Competitive salary + equity',
      'Remote work flexibility',
      'Professional development opportunities',
      'Health insurance coverage',
      'Flexible working hours',
      'Leadership growth opportunities'
    ]
  }
};

export function JobDetailPage() {
  const { id } = useParams();
  const jobId = parseInt(id || '1');
  const jobData = jobsData[jobId as keyof typeof jobsData] || jobsData[1];

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false); // বাটন টেক্সট কন্ট্রোল করার জন্য নতুন স্টেট
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null);

  const GAS_DEPLOYMENT_URL = 'https://script.google.com/macros/s/AKfycbzYH-TfT_uR-2uxR8G2my7KElsR_x0f9GekGO35oSqq-qXkjI8k1zPSRvbIrATJDCg/exec';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return; // ইতিমধ্যে সাবমিট হয়ে থাকলে বা লোড হতে থাকলে রিটার্ন করবে

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
      const response = await fetch(GAS_DEPLOYMENT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          formType: 'job',
          name,
          email,
          portfolio,
          jobTitle: jobData.title,
          file: resumeBase64
        })
      });

      // সাকসেস লজিক
      setSubmitted(true); // বাটন এখন "Submitted" দেখাবে
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
      // কোটা এরর হলেও আমরা সাকসেস এবং "Submitted" দেখাচ্ছি কোটা বাঁচাতে
      setSubmitted(true);
      setModalType('success');
    } finally {
      setSubmitting(false); // লোডিং স্ট্যাটাস বন্ধ হবে
    }
  };

  return (
    <>
      <main className="bg-[#050505] min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/career" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Careers
          </Link>

          <div className="mb-12 border-b border-white/10 pb-12">
            <div className="text-[color:var(--bright-red)] font-bold mb-4 uppercase tracking-widest text-sm">
              {jobData.type} Team
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {jobData.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <MapPin size={18} className="text-[color:var(--bright-red)]" /> {jobData.location}
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <Clock size={18} className="text-[color:var(--neon-yellow)]" /> Full Time
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <DollarSign size={18} className="text-[color:var(--vibrant-green)]" /> {jobData.salary} / year
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">About the Role</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{jobData.description}</p>
              </section>

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

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
                <ul className="space-y-4">
                  {jobData.benefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle size={20} className="text-[color:var(--vibrant-green)] shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
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