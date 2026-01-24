import { motion } from 'framer-motion';
import { FileText, Scale, DollarSign, XCircle, AlertTriangle, ArrowRight, Shield } from 'lucide-react';
export function TermsPage() {
  return <main className="bg-[#050505] min-h-screen pt-40 pb-20">
    {/* Background Effects */}
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[color:var(--deep-navy)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[color:var(--neon-yellow)] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse" style={{
        animationDelay: '1s'
      }} />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      {/* Hero Section */}
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <Scale className="w-4 h-4 text-[color:var(--neon-yellow)]" />
          <span className="text-sm text-gray-300">Legal Agreement</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Terms &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--neon-yellow)]">
            Conditions
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Welcome to Phixels! These terms outline the rules and regulations
          for using our services.
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="space-y-12">
          {/* Introduction */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-300 leading-relaxed">
              Welcome to Phixels! These terms and conditions outline the rules
              and regulations for the use of Phixels's Website and services.
              By accessing this website, we assume you accept these terms and
              conditions. Do not continue to use Phixels if you do not agree
              to all of the terms and conditions stated on this page.
            </p>
          </div>

          {/* Intellectual Property */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[color:var(--bright-red)]/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[color:var(--bright-red)]" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                Intellectual Property Rights
              </h2>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-300 mb-4">
                Unless otherwise stated, Phixels and/or its licensors own the
                intellectual property rights for all material on Phixels. All
                intellectual property rights are reserved.
              </p>
              <p className="text-gray-400 text-sm">
                You may access this from Phixels for your own personal use
                subjected to restrictions set in these terms and conditions.
              </p>
            </div>
          </motion.div>

          {/* User Obligations */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[color:var(--neon-yellow)]/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[color:var(--neon-yellow)]" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                User Obligations
              </h2>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-300 mb-6">You must not:</p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-3">
                  <XCircle size={18} className="text-red-500 shrink-0 mt-1" />
                  <span>
                    Republish material from Phixels without permission
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle size={18} className="text-red-500 shrink-0 mt-1" />
                  <span>
                    Sell, rent, or sub-license material from this site
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle size={18} className="text-red-500 shrink-0 mt-1" />
                  <span>
                    Reproduce, duplicate, or copy material from Phixels
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle size={18} className="text-red-500 shrink-0 mt-1" />
                  <span>Redistribute content from Phixels</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Project Payments */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[color:var(--vibrant-green)]/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[color:var(--vibrant-green)]" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                Project Payments
              </h2>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-300">
                For development services, payments must be made according to
                the agreed milestones as outlined in the project proposal.
                Payment terms include:
              </p>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>• Initial deposit upon project commencement</li>
                <li>• Milestone-based payments as per agreement</li>
                <li>• Final payment upon project completion and approval</li>
                <li>• Late payments may incur additional fees</li>
              </ul>
            </div>
          </motion.div>

          {/* Limitation of Liability */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[color:var(--deep-navy)]/40 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                Limitation of Liability
              </h2>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-300">
                In no event shall Phixels be held liable for anything arising
                out of or in any way connected with your use of this website
                or our services, whether such liability is under contract,
                tort, or otherwise. Phixels shall not be held liable for any
                indirect, consequential, or special liability arising out of
                or in any way related to your use of this website.
              </p>
            </div>
          </motion.div>

          {/* Termination */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
            <h2 className="text-3xl font-bold text-white mb-6">
              Termination
            </h2>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-300">
                We may terminate or suspend access to our service immediately,
                without prior notice or liability, for any reason whatsoever,
                including without limitation if you breach the Terms. All
                provisions of the Terms which by their nature should survive
                termination shall survive termination.
              </p>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="p-8 rounded-2xl bg-gradient-to-br from-[color:var(--bright-red)]/10 to-transparent border border-white/10 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-gray-400 mb-6">
              If you have any questions about these Terms & Conditions, please
              contact us.
            </p>
            <a href="mailto:phixels.io@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[color:var(--bright-red)] text-white font-bold hover:bg-[color:var(--bright-red)]/90 transition-colors">
              Contact Us <ArrowRight size={18} />
            </a>
          </motion.div>

          {/* Last Updated */}
          <div className="text-center text-sm text-gray-500 pt-8 border-t border-white/10">
            Last Updated: January 2025
          </div>
        </motion.div>
      </div>
    </div>
  </main>;
}