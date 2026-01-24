import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects2 } from '../constants/common';
const categories = ['All', 'FinTech', 'Health', 'On-Demand', 'Web3'];
export function WorkPage() {
  const [filter, setFilter] = useState('All');
  const filteredProjects = filter === 'All' ? projects2 : projects2.filter(p => p.cat === filter);
  return <main className="pt-32 pb-20 bg-[#050505] min-h-screen">
    <div className="container mx-auto px-4">
      <h1 className="text-5xl md:text-6xl font-bold mb-12">Our Work</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-16">
        {categories.map(cat => <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full border transition-all ${filter === cat ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/20 hover:border-white'}`}>
          {cat}
        </button>)}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, i) => <div key={i} className="group relative aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[color:var(--bright-red)] transition-colors">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-[color:var(--neon-yellow)] text-sm font-bold mb-2">
                  {project.cat}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400">{project.result}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowUpRight />
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  </main>;
}