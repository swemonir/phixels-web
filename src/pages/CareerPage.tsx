import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Globe, BookOpen, Laptop, ArrowRight, Briefcase, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { apiService } from '../services/api';
import { Career } from '../types/api';

export function CareerPage() {
  const [roles, setRoles] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const response = await apiService.getCareers();
        console.log(response);
        if (response.success) {
          setRoles(response.data);
        } else {
          setError(response.message || 'Failed to fetch career opportunities');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching careers');
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  return <main className="pt-44 pb-20 bg-[#050505] min-h-screen">
    <div className="container mx-auto px-4">
      <div className="text-center mb-20">
        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5
        }} className="inline-block mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[color:var(--vibrant-green)] font-mono">
          We are hiring!
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Join the Top 1% <br />
          <span className="text-gradient">Engineering Team</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          We don't just hire employees. We hire future CTOs, founders, and
          visionaries. Build the future with us.
        </p>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {[{
          icon: Globe,
          title: 'Remote First',
          desc: 'Work from anywhere in the world. We focus on output, not hours.',
          color: 'text-blue-400'
        }, {
          icon: BookOpen,
          title: 'Learning Fund',
          desc: '$2,000/yr stipend for courses, books, and conferences.',
          color: 'text-yellow-400'
        }, {
          icon: Laptop,
          title: 'Premium Gear',
          desc: 'Latest MacBook Pro, 4K monitor, and noise-canceling headphones.',
          color: 'text-purple-400'
        }].map((perk, i) => <motion.div key={i} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: i * 0.1
        }} viewport={{
          once: true
        }} className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-[color:var(--bright-red)] transition-all duration-300 group hover:-translate-y-2">
          <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 ${perk.color} group-hover:scale-110 transition-transform`}>
            <perk.icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {perk.title}
          </h3>
          <p className="text-gray-400 leading-relaxed">{perk.desc}</p>
        </motion.div>)}
      </div>

      {/* Open Roles */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Open Positions</h2>
          {!loading && !error && (
            <div className="text-sm text-gray-400">{roles.length} roles available</div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[color:var(--bright-red)] animate-spin mb-4" />
            <p className="text-gray-400">Loading open positions...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20">
            {error}
          </div>
        ) : roles.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white/5 rounded-2xl border border-white/10">
            No open positions at the moment. Check back later!
          </div>
        ) : (
          <div className="space-y-4">
            {roles.map((role, i) => <motion.div key={role._id} initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: i * 0.1
            }} viewport={{
              once: true
            }}>
              <Link to={`/career/${role._id}`} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[color:var(--bright-red)] hover:bg-white/[0.07] transition-all group">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-[color:var(--bright-red)] transition-colors flex items-center gap-2">
                    {role.jobTitle}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} /> {role.jobType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe size={14} /> {role.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Check size={14} /> Full Time
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="group-hover:bg-[color:var(--bright-red)] group-hover:text-white group-hover:border-[color:var(--bright-red)] transition-all">
                  Apply Now{' '}
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>)}
          </div>
        )}
      </div>
    </div>
  </main>;
}
