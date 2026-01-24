import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { categories, projects } from "../constants/common";

export function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);
  return (
    <main className="bg-[#050505] min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing our finest work across industries. From startups to
            Fortune 500 enterprises.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full border transition-all ${filter === cat
                ? "bg-white text-black border-white"
                : "bg-transparent text-gray-400 border-white/20 hover:border-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects */}
        <div className="space-y-12 md:space-y-20">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="group"
            >
              <div className="bg-[#111111] p-4 sm:p-6 rounded-2xl border border-white/10 relative">
                {/* Image */}
                <div
                  className={`w-full aspect-video sm:aspect-[16/9] md:aspect-video rounded-2xl overflow-hidden relative mb-6 md:mb-0 ${index % 2 === 1 ? "md:order-2" : ""
                    }`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-[color:var(--neon-yellow)] text-black text-xs font-bold">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-[color:var(--bright-red)] transition-colors">
                    {project.title}
                  </h2>
                  <div className="text-lg sm:text-xl font-semibold text-gray-300">
                    Client:{" "}
                    <span className="text-[color:var(--neon-yellow)]">
                      {project.client}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs sm:text-sm text-gray-300 border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-6 sm:pt-8">
                    <div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                        {project.stats}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 uppercase">
                        Key Metric
                      </div>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white hover:border-[color:var(--bright-red)] hover:bg-[color:var(--bright-red)]/10 transition-all group/btn"
                    >
                      View Live Site
                      <ExternalLink
                        className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                        size={18}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
