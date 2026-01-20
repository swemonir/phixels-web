import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
const projects = [
  {
    id: 1,
    title: "FinTech Super App",
    category: "Mobile Apps",
    client: "NeoBank",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    stats: "1M+ Active Users",
    stack: ["Flutter", "Node.js", "AWS", "MongoDB"],
    description:
      "A comprehensive digital banking solution with AI-powered financial insights, instant transfers, and investment tracking.",
    link: "https://neobank.example.com",
  },
  {
    id: 2,
    title: "AI Diagnostic Platform",
    category: "AI/ML",
    client: "MediTech Solutions",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    stats: "99.2% Accuracy Rate",
    stack: ["Python", "TensorFlow", "React", "PostgreSQL"],
    description:
      "Medical imaging analysis platform using deep learning to assist radiologists in early disease detection.",
    link: "https://meditech.example.com",
  },
  {
    id: 3,
    title: "NFT Marketplace",
    category: "Blockchain",
    client: "CryptoArt",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    stats: "$50M Trading Volume",
    stack: ["Solidity", "React", "Web3.js", "IPFS"],
    description:
      "Decentralized marketplace for digital art with smart contract-based royalties and gas-optimized transactions.",
    link: "https://cryptoart.example.com",
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    category: "Web Apps",
    client: "ShopFlow",
    image:
      "https://images.unsplash.com/photo-1472851294608-415522f96318?auto=format&fit=crop&w=800&q=80",
    stats: "+250% Revenue Growth",
    stack: ["Next.js", "Shopify", "Stripe", "Vercel"],
    description:
      "High-performance e-commerce platform with personalized recommendations and seamless checkout experience.",
    link: "https://shopflow.example.com",
  },
  {
    id: 5,
    title: "Food Delivery App",
    category: "On-Demand",
    client: "QuickBite",
    image:
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80",
    stats: "20min Avg Delivery",
    stack: ["React Native", "Firebase", "Google Maps", "Stripe"],
    description:
      "Real-time food delivery platform with live tracking, smart routing, and integrated payment processing.",
    link: "https://quickbite.example.com",
  },
  {
    id: 6,
    title: "Enterprise ERP System",
    category: "Enterprise",
    client: "GlobalCorp",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    stats: "10K+ Employees",
    stack: ["Java", "Spring Boot", "Angular", "Oracle"],
    description:
      "Comprehensive ERP solution managing inventory, HR, finance, and supply chain operations.",
    link: "https://globalcorp.example.com",
  },
  {
    id: 7,
    title: "Telemedicine Platform",
    category: "Mobile Apps",
    client: "HealthConnect",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    stats: "50K+ Consultations",
    stack: ["React Native", "WebRTC", "Node.js", "AWS"],
    description:
      "HIPAA-compliant video consultation platform with EMR integration and prescription management.",
    link: "https://healthconnect.example.com",
  },
  {
    id: 8,
    title: "Smart Home IoT App",
    category: "Mobile Apps",
    client: "HomeAI",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    stats: "500K+ Devices",
    stack: ["Swift", "Kotlin", "MQTT", "AWS IoT"],
    description:
      "Unified control system for smart home devices with AI-powered automation and energy optimization.",
    link: "https://homeai.example.com",
  },
  {
    id: 9,
    title: "Crypto Trading Bot",
    category: "Blockchain",
    client: "TradeAI",
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80",
    stats: "85% Win Rate",
    stack: ["Python", "Binance API", "ML", "Docker"],
    description:
      "Algorithmic trading bot with machine learning-based market prediction and risk management.",
    link: "https://tradeai.example.com",
  },
  {
    id: 10,
    title: "Learning Management System",
    category: "Enterprise",
    client: "EduTech Pro",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    stats: "100K+ Students",
    stack: ["Laravel", "Vue.js", "MySQL", "AWS"],
    description:
      "Comprehensive LMS with live classes, assessments, progress tracking, and certification management.",
    link: "https://edutech.example.com",
  },
  {
    id: 11,
    title: "Ride Sharing Platform",
    category: "On-Demand",
    client: "RideNow",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    stats: "2M+ Rides",
    stack: ["React Native", "Node.js", "MongoDB", "Socket.io"],
    description:
      "Real-time ride-hailing platform with dynamic pricing, driver matching, and in-app navigation.",
    link: "https://ridenow.example.com",
  },
  {
    id: 12,
    title: "Social Media Analytics",
    category: "AI/ML",
    client: "SocialInsights",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    stats: "1B+ Posts Analyzed",
    stack: ["Python", "NLP", "React", "BigQuery"],
    description:
      "AI-powered social media monitoring and sentiment analysis tool for brand management.",
    link: "https://socialinsights.example.com",
  },
  {
    id: 13,
    title: "Real Estate Portal",
    category: "Web Apps",
    client: "PropertyHub",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    stats: "50K+ Listings",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Mapbox"],
    description:
      "Modern real estate platform with 3D virtual tours, mortgage calculator, and AI-based property recommendations.",
    link: "https://propertyhub.example.com",
  },
  {
    id: 14,
    title: "Fitness Tracking App",
    category: "Mobile Apps",
    client: "FitLife",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    stats: "300K+ Users",
    stack: ["Flutter", "Firebase", "HealthKit", "Google Fit"],
    description:
      "Comprehensive fitness app with workout plans, nutrition tracking, and AI personal trainer.",
    link: "https://fitlife.example.com",
  },
  {
    id: 15,
    title: "Supply Chain Management",
    category: "Enterprise",
    client: "LogiFlow",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    stats: "30% Cost Reduction",
    stack: ["Java", "Microservices", "Kafka", "Kubernetes"],
    description:
      "End-to-end supply chain visibility platform with predictive analytics and automated procurement.",
    link: "https://logiflow.example.com",
  },
];
const categories = [
  "All",
  "Mobile Apps",
  "Web Apps",
  "Enterprise",
  "Blockchain",
  "AI/ML",
  "On-Demand",
];
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
              className={`px-6 py-2 rounded-full border transition-all ${
                filter === cat
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
                  className={`w-full aspect-video sm:aspect-[16/9] md:aspect-video rounded-2xl overflow-hidden relative mb-6 md:mb-0 ${
                    index % 2 === 1 ? "md:order-2" : ""
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
