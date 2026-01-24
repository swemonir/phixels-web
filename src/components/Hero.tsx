import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { ArrowRight, Play } from "lucide-react";
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });
  const springValue = useSpring(0, {
    duration: 2000,
  });
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);
  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);
  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}
export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[color:var(--deep-navy)] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[color:var(--deep-red)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[color:var(--neon-yellow)] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            Accepting New Enterprise Projects for Q4
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight">
            Transforming Visionary Concepts <br />
            <span className="text-gradient">into Digital Dominance</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            We build scalable, secure, and future-proof mobile apps for startups
            and Fortune 500s. From AI integration to blockchain architecture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              glow
              triggerPopup
              className="w-full sm:w-auto text-lg px-8 py-4"
            >
              Start a Project <ArrowRight size={20} />
            </Button>
            <Link to="/case-studies" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full text-lg px-8 py-4">
                <Play size={18} className="mr-2 fill-current" /> View Case
                Studies
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Revenue Growth Card - Bottom Left */}
        <motion.div
          style={{
            y: y1,
          }}
          className="absolute bottom-32 left-[5%] hidden lg:block"
          whileHover={{
            scale: 1.1,
          }}
        >
          <div className="glass-panel p-5 rounded-xl border-l-4 border-[color:var(--bright-red)] shadow-[0_0_20px_rgba(237,31,36,0.2)] hover:shadow-[0_0_30px_rgba(237,31,36,0.4)] transition-shadow duration-300">
            <div className="text-xs text-gray-400 mb-1">Revenue Growth</div>
            <div className="text-3xl font-bold text-white flex items-center gap-1">
              +<Counter value={420} suffix="%" />
            </div>
          </div>
        </motion.div>

        {/* Active Users Card - Top Right */}
        <motion.div
          style={{
            y: y2,
          }}
          className="absolute top-32 right-[5%] hidden lg:block"
          whileHover={{
            scale: 1.1,
          }}
        >
          <div className="glass-panel p-5 rounded-xl border-l-4 border-[color:var(--vibrant-green)] shadow-[0_0_20px_rgba(0,205,73,0.2)] hover:shadow-[0_0_30px_rgba(0,205,73,0.4)] transition-shadow duration-300">
            <div className="text-xs text-gray-400 mb-1">Active Users</div>
            <div className="text-3xl font-bold text-white">
              <Counter value={1.2} suffix="M+" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 hidden md:block lg:block"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
