import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProfessionalReviewCarousel } from '../components/ProfessionalReviewCarousel';
import { apiService } from '../services/api';
import { CaseStudy } from '../types/api';

function Counter({
  value,
  suffix = ''
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  return <span ref={ref}>
    {count}
    {suffix}
  </span>;
}

export function CaseStudyDetailPage() {
  const { id } = useParams();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudy = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await apiService.getCaseStudyById(id);
        if (response.success) {
          setStudy(response.data);
        } else {
          setError(response.message || 'Case study not found');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching the case study');
      } finally {
        setLoading(false);
      }
    };

    fetchStudy();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[color:var(--vibrant-green)] animate-spin" />
      </div>
    );
  }

  if (error || !study) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">{error || 'Case study not found'}</h2>
        <Link to="/case-studies" className="flex items-center gap-2 text-[color:var(--vibrant-green)] hover:underline">
          <ArrowLeft size={20} /> Back to Case Studies
        </Link>
      </div>
    );
  }

  // Map API data to UI structure
  const caseStudy = {
    client: study.client,
    industry: study.category,
    title: study.title,
    heroImage: study.image,
    duration: '6 months', // Default fallback
    date: `Completed ${new Date(study.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}`,
    challenge: {
      title: 'The Challenge',
      description: study.challenge,
      points: [study.challenge.substring(0, 100) + '...'] // Mock points from description
    },
    solution: {
      title: 'Our Solution',
      description: study.solution,
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS'], // Defaults
      features: [study.solution.substring(0, 80) + '...'] // Mock features
    },
    results: [{
      metric: parseInt(study.result) || 40,
      suffix: '%',
      label: study.result.match(/conversion|speed|satisfaction|cost/i)?.[0] || 'Efficiency Improvement',
      icon: TrendingUp,
      color: 'text-green-400'
    }],
    images: [study.image]
  };

  return <main className="bg-[#050505] min-h-screen pt-40 pb-20">
    {/* Back Button */}
    <div className="container mx-auto px-4 mb-8">
      <Link to="/case-studies" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={20} />
        <span>Back to Case Studies</span>
      </Link>
    </div>

    {/* Hero Section */}
    <section className="container mx-auto px-4 mb-20">
      <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="pt-4">
          <div className="inline-block px-4 py-1 rounded-full bg-[color:var(--vibrant-green)]/10 text-[color:var(--vibrant-green)] text-sm font-bold mb-6">
            {caseStudy.industry}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {caseStudy.title}
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Client:{' '}
            <span className="text-white font-semibold">
              {caseStudy.client}
            </span>
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[color:var(--bright-red)]" />
              <span>{caseStudy.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[color:var(--bright-red)]" />
              <span>{caseStudy.duration}</span>
            </div>
          </div>

          <Button variant="primary" triggerPopup className="px-8 py-4">
            Start Your Project
          </Button>
        </div>

        <div className="relative">
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
            <img src={caseStudy.heroImage} alt={caseStudy.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[color:var(--bright-red)] rounded-full blur-[100px] opacity-30" />
        </div>
      </motion.div>
    </section>

    {/* Challenge */}
    <section className="bg-white/5 py-20 mb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-[color:var(--bright-red)]">
            {caseStudy.challenge.title}
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed whitespace-pre-line">
            {caseStudy.challenge.description}
          </p>
        </div>
      </div>
    </section>

    {/* Solution */}
    <section className="container mx-auto px-4 mb-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-[color:var(--vibrant-green)]">
          {caseStudy.solution.title}
        </h2>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed whitespace-pre-line">
          {caseStudy.solution.description}
        </p>

        <div>
          <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-3">
            {caseStudy.solution.technologies.map(tech => <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20">
              {tech}
            </span>)}
          </div>
        </div>
      </div>
    </section>

    {/* Results - Improved Background */}
    <section className="relative py-20 mb-20 overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[color:var(--deep-navy)] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[color:var(--bright-red)] rounded-full blur-[120px]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">
          Measurable Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {caseStudy.results.map((result, index) => <motion.div key={index} initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mx-auto w-full max-w-sm">
            <div className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 ${result.color}`}>
              <result.icon size={32} />
            </div>
            <div className="text-4xl font-bold mb-2 text-white">
              <Counter value={result.metric} suffix={result.suffix} />
            </div>
            <div className="text-gray-300 capitalize">{result.label}</div>
          </motion.div>)}
        </div>
      </div>
    </section>

    {/* New Professional Review Carousel Section */}
    <ProfessionalReviewCarousel />

    {/* CTA - Classic Style */}
    <section className="container mx-auto px-4 mb-20">
      <div className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--deep-navy)]/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results with our
            expert solutions.
          </p>
          <Button variant="primary" triggerPopup className="px-10 py-5 text-lg">
            Start Your Project Today <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  </main>;
}
