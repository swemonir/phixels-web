import { motion } from 'framer-motion';
import { CountUpStats } from '../components/CountUpStats';
import { Linkedin, Twitter, Github } from 'lucide-react';
export function AboutPage() {
  return <main className="bg-[#050505] min-h-screen pt-44 pb-20 overflow-hidden">
    {/* Hero */}
    <section className="container mx-auto px-4 mb-32 text-center relative z-10">
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} className="inline-block mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[color:var(--neon-yellow)] font-mono">
          Who We Are
        </motion.div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
          Founded by Engineers, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-white to-[color:var(--neon-yellow)] animate-gradient bg-300%">
            Led by Visionaries.
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          We are a collective of obsessively detailed developers, designers,
          and strategists committed to building the digital infrastructure of
          tomorrow. We don't just write code; we engineer legacies.
        </p>
      </motion.div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[color:var(--bright-red)]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </section>

    {/* Stats */}
    <section className="border-y border-white/10 bg-white/5 py-20 mb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[{
            label: 'Projects Delivered',
            value: 500,
            suffix: '+'
          }, {
            label: 'App Downloads',
            value: 10,
            suffix: 'M+'
          }, {
            label: 'Team Members',
            value: 45,
            suffix: ''
          }, {
            label: 'Client Retention',
            value: 98,
            suffix: '%'
          }].map((stat, i) => <motion.div key={i} className="text-center" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: i * 0.1
          }} viewport={{
            once: true
          }}>
            <div className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tighter">
              <CountUpStats end={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-sm text-[color:var(--neon-yellow)] uppercase tracking-widest font-bold">
              {stat.label}
            </div>
          </motion.div>)}
        </div>
      </div>
    </section>

    {/* Mission / Story */}
    <section className="container mx-auto px-4 mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }}>
          <h2 className="text-4xl font-bold mb-6">Our Philosophy</h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              At Phixels, we believe that software is the modern architecture
              of the world. Every line of code is a brick, every function a
              beam. We build digital skyscrapers that stand the test of time.
            </p>
            <p>
              Our journey began in a small dorm room with a simple idea: make
              technology accessible, beautiful, and powerful. Today, we help
              Fortune 500 companies and ambitious startups alike to realize
              their digital potential.
            </p>
          </div>
        </motion.div>
        <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team working" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[color:var(--bright-red)] rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[color:var(--neon-yellow)] rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000" />
        </motion.div>
      </div>
    </section>

    {/* Team */}
    <section className="container mx-auto px-4 mb-32">
      <h2 className="text-4xl font-bold text-center mb-16">
        Meet the{' '}
        <span className="text-[color:var(--bright-red)]">Architects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[{
          name: 'Alex Chen',
          role: 'Founder & CEO'
        }, {
          name: 'Sarah Miller',
          role: 'CTO'
        }, {
          name: 'David Kim',
          role: 'Lead Designer'
        }, {
          name: 'Elena Rodriguez',
          role: 'Product Manager'
        }, {
          name: 'James Wilson',
          role: 'Senior Engineer'
        }, {
          name: 'Lisa Wang',
          role: 'Frontend Lead'
        }, {
          name: 'Marcus Johnson',
          role: 'Backend Lead'
        }, {
          name: 'Sophie Martin',
          role: 'UX Researcher'
        }].map((member, i) => <motion.div key={i} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: i * 0.05
        }} viewport={{
          once: true
        }} className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-[color:var(--bright-red)] transition-all duration-500">
          <div className="aspect-[3/4] overflow-hidden flex items-center justify-center bg-black grayscale group-hover:grayscale-0 transition-all duration-500">
            {/* Animated placeholder icon */}
            <motion.div className="w-24 h-24 relative" animate={{
              y: [0, -8, 0]
            }} transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut'
            }}>
              <motion.div className="w-full h-full relative" whileHover={{
                scale: 1.1
              }} transition={{
                type: 'spring',
                stiffness: 300
              }}>
                <motion.div className="absolute inset-0 flex items-center justify-center" animate={{
                  rotateY: [0, 10, 0, -10, 0]
                }} transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut'
                }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <motion.circle cx="50" cy="8" r="5" fill="var(--neon-yellow)" animate={{
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.2, 1]
                    }} transition={{
                      repeat: Infinity,
                      duration: 1.5
                    }} />
                    <line x1="50" y1="13" x2="50" y2="22" stroke="var(--neon-yellow)" strokeWidth="3" />
                    <rect x="20" y="22" width="60" height="50" rx="8" fill="#1a1a1a" stroke="var(--bright-red)" strokeWidth="2" />
                    <motion.circle cx="35" cy="42" r="8" fill="var(--bright-red)" animate={{
                      scale: [1, 1.1, 1]
                    }} transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: 0.2
                    }} />
                    <motion.circle cx="65" cy="42" r="8" fill="var(--bright-red)" animate={{
                      scale: [1, 1.1, 1]
                    }} transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: 0.4
                    }} />
                    <circle cx="35" cy="42" r="3" fill="white" />
                    <circle cx="65" cy="42" r="3" fill="white" />
                    <motion.rect x="35" y="55" width="30" height="4" rx="2" fill="var(--neon-yellow)" animate={{
                      width: [30, 25, 30]
                    }} transition={{
                      repeat: Infinity,
                      duration: 2
                    }} />
                    <rect x="25" y="75" width="50" height="20" rx="5" fill="#1a1a1a" stroke="var(--neon-yellow)" strokeWidth="2" />
                    <motion.circle cx="50" cy="85" r="6" fill="var(--vibrant-green)" animate={{
                      opacity: [1, 0.4, 1],
                      fill: ['var(--vibrant-green)', 'var(--neon-yellow)', 'var(--vibrant-green)']
                    }} transition={{
                      repeat: Infinity,
                      duration: 2
                    }} />
                  </svg>
                </motion.div>
                <div className="absolute inset-0 bg-[color:var(--bright-red)]/20 rounded-full blur-xl -z-10" />
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold text-white">{member.name}</h3>
            <p className="text-[color:var(--neon-yellow)] text-sm mb-4 font-medium">
              {member.role}
            </p>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
              <a href="#" className="text-white hover:text-[color:var(--bright-red)] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-white hover:text-[color:var(--bright-red)] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-[color:var(--bright-red)] transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
        </motion.div>)}
      </div>
    </section>
  </main>;
}