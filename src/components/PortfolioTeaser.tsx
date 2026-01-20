import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Link } from "react-router-dom";
export function PortfolioTeaser() {
  const targetRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-50%"]);
  // Handle header visibility on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const currentScrollY = latest;
    if (currentScrollY > lastScrollY && currentScrollY > 0.1) {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }
    setLastScrollY(currentScrollY);
  });
  const apps = [
    {
      type: "FinTech",
      color: "bg-blue-600",
      client: "FinTech Corp",
      description:
        "A comprehensive financial management application designed to help users track expenses, manage investments, and achieve their financial goals through intuitive interfaces and real-time data synchronization.",
      technologies: ["React Native", "Node.js", "MongoDB", "Stripe API"],
      users: "500K+",
      image:
        "https://images.unsplash.com/photo-1563986768494-4dee0e3a8d2b?w=1200&h=675&fit=crop&auto=format",
    },
    {
      type: "Health",
      color: "bg-emerald-600",
      client: "HealthPlus",
      description:
        "A comprehensive health tracking application designed to help users monitor their daily activities, set fitness goals, and maintain a healthy lifestyle through intuitive interfaces and real-time data synchronization.",
      technologies: ["Flutter", "Firebase", "HealthKit", "Google Fit"],
      users: "300K+",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=675&fit=crop&auto=format",
    },
    {
      type: "E-commerce",
      color: "bg-purple-600",
      client: "ShopLux",
      description:
        "A modern e-commerce platform with advanced filtering, personalized recommendations, and seamless checkout experience for fashion and lifestyle products.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
      users: "1M+",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=675&fit=crop&auto=format",
    },
    {
      type: "Social",
      color: "bg-pink-600",
      client: "ConnectHub",
      description:
        "A social networking application that brings people together through shared interests, real-time messaging, and engaging content discovery features.",
      technologies: ["React Native", "GraphQL", "AWS", "Socket.io"],
      users: "2M+",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=675&fit=crop&auto=format",
    },
    {
      type: "Food",
      color: "bg-orange-500",
      client: "FoodieDelight",
      description:
        "A food delivery and restaurant discovery platform that connects users with their favorite local restaurants and delivers meals right to their doorstep.",
      technologies: ["Flutter", "Django", "PostgreSQL", "Google Maps API"],
      users: "750K+",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=675&fit=crop&auto=format",
    },
  ];
  return (
    <section ref={targetRef} className="h-[300vh] bg-[#050505] relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Header with scroll hide/show */}
        <motion.div
          className="absolute top-10 left-4 md:left-10 z-10 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl"
          initial={{
            opacity: 1,
            y: 0,
          }}
          animate={{
            opacity: headerVisible ? 1 : 0,
            y: headerVisible ? 0 : -50,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4">
            Featured<span className="text-gradient">Work</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-xs sm:max-w-sm md:max-w-md">
            We build award-winning apps that scale. Swipe to explore our recent
            masterpieces.
          </p>
        </motion.div>

        <motion.div
          style={{
            x,
          }}
          className="flex gap-4 sm:gap-8 md:gap-16 lg:gap-24 px-2 sm:px-4 md:px-6 lg:px-10 pt-32 sm:pt-40 md:pt-48 lg:pt-56 pl-[2vw] sm:pl-[4vw] md:pl-[8vw] lg:pl-[40vw] items-center"
        >
          {apps.map((app, i) => (
            <Link
              to="/case-studies"
              key={i}
              className="relative group cursor-pointer"
            >
              {/* Portfolio Card - Image Top, Content Bottom for mobile */}
              <div className="relative w-full max-w-4xl mx-auto bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                <div className="flex flex-col">
                  {/* Image Section - Top for mobile, Left for desktop */}
                  <div className="w-full aspect-[16/9] relative">
                    <img
                      src={app.image}
                      alt={`${app.type} App Preview`}
                      className="w-full h-full object-cover"
                    />

                    {/* Category Badge */}
                    <div
                      className={`absolute top-4 left-4 px-3 py-1.5 ${app.color} text-white text-xs font-bold rounded-full shadow-lg`}
                    >
                      Mobile Apps
                    </div>
                  </div>

                  {/* Content Section - Bottom for mobile, Right for desktop */}
                  <div className="flex-1 p-6 md:p-8 lg:p-10">
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {app.type} App
                    </h3>

                    {/* Client */}
                    <div className="text-sm text-gray-400 mb-4">
                      Client:{" "}
                      <span className="text-white font-medium">
                        {app.client}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
                      {app.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {app.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-300 font-medium border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="text-2xl font-bold text-white">
                        {app.users}
                      </div>
                      <div className="text-sm text-gray-400">Active Users</div>
                    </div>

                    {/* CTA Button */}
                    <button className="bg-[color:var(--bright-red)] hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.05]">
                      View Live Site
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
