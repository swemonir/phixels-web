import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart } from 'lucide-react';
import { cases, industries } from '../constants/common';
export function CaseStudiesPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? cases : cases.filter(c => c.industry === filter);
  return <main className="bg-[#050505] min-h-screen pt-32 pb-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Case Studies</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Deep dives into how we solve complex problems and drive measurable
          business results.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {industries.map(industry => <button key={industry} onClick={() => setFilter(industry)} className={`px-4 py-2 rounded-full text-sm border transition-all ${filter === industry ? 'bg-[color:var(--vibrant-green)] text-black border-[color:var(--vibrant-green)]' : 'bg-transparent text-gray-400 border-white/20 hover:border-white'}`}>
          {industry}
        </button>)}
      </div>

      <div className="grid grid-cols-1 gap-12">
        {filtered.map((study: any) => <motion.div key={study.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[color:var(--vibrant-green)] transition-colors group">
          <Link to={`/case-studies/${study.id}`} className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden bg-gray-800">
              <img src={study.image} alt={study.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 rounded-full bg-[color:var(--vibrant-green)] text-black text-xs font-bold">
                  {study.industry}
                </span>
              </div>
            </div>

            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-[color:var(--vibrant-green)] transition-colors">
                {study.title}
              </h2>
              <p className="text-gray-400 text-sm mb-2">
                Client:{' '}
                <span className="text-white font-semibold">
                  {study.client}
                </span>
              </p>

              <div className="space-y-4 my-6">
                <div>
                  <h3 className="text-gray-400 text-xs uppercase font-bold mb-1">
                    Challenge
                  </h3>
                  <p className="text-gray-300 text-sm">{study.challenge}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-xs uppercase font-bold mb-1">
                    Solution
                  </h3>
                  <p className="text-gray-300 text-sm">{study.solution}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <BarChart className="text-[color:var(--vibrant-green)]" size={24} />
                  <div className="text-2xl font-bold text-white">
                    {study.result}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[color:var(--vibrant-green)] font-bold group-hover:gap-4 transition-all">
                  Read Full Story{' '}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>)}
      </div>
    </div>
  </main>;
}