import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Loader2 } from "lucide-react";
import { apiService } from "../services/api";
import { Portfolio } from "../types/api";

export function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await apiService.getPortfolios();
        if (response.success) {
          setPortfolioItems(response.data);
        } else {
          setError(response.message || "Failed to fetch portfolio");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const categories = ["All", ...new Set(portfolioItems.map((item) => item.category))];
  const filtered = filter === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 text-[color:var(--bright-red)] animate-spin mb-4" />
        <p className="text-gray-400">Loading our works...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center pt-20 p-4">
        <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20 max-w-2xl w-full">
          {error}
        </div>
      </div>
    );
  }

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
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-[#111111] p-4 sm:p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Image Area */}
                    <div className={`relative rounded-2xl overflow-hidden aspect-video sm:aspect-[16/9] md:aspect-video ${index % 2 === 1 ? "md:order-2" : ""
                      }`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1 rounded-full bg-[color:var(--neon-yellow)] text-black text-xs font-bold">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-4 md:space-y-6">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-[color:var(--bright-red)] transition-colors">
                        {item.title}
                      </h2>
                      <div className="text-lg sm:text-xl font-semibold text-gray-300">
                        Client:{" "}
                        <span className="text-[color:var(--neon-yellow)]">
                          {item.client}
                        </span>
                      </div>
                      <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.technology?.map((tech) => (
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
                            {item.activeUsers || "N/A"}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 uppercase">
                            Key Metric
                          </div>
                        </div>
                        <a
                          href={item.liveLink}
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
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No projects found for this category.
          </div>
        )}
      </div>
    </main>
  );
}
