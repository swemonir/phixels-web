import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, CheckCircle, ArrowRight } from 'lucide-react';
export function PrivacyPage() {
  return <main className="bg-[#050505] min-h-screen pt-40 pb-20">
    {/* Background Effects */}
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[color:var(--deep-navy)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[color:var(--bright-red)] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse" style={{
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
          <Shield className="w-4 h-4 text-[color:var(--vibrant-green)]" />
          <span className="text-sm text-gray-300">Your Privacy Matters</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Privacy{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--vibrant-green)]">
            Policy
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          At Phixels, your privacy is our priority. Learn how we collect, use,
          and protect your information.
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
        }} className="prose prose-invert prose-lg max-w-none">
          {/* Introduction */}
          <div className="mb-12 p-8 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-300 leading-relaxed">
              At Phixels, accessible from our website, one of our main
              priorities is the privacy of our visitors. This Privacy Policy
              document contains types of information that is collected and
              recorded by Phixels and how we use it.
            </p>
          </div>

          {/* Information We Collect */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[color:var(--bright-red)]/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[color:var(--bright-red)]" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                Information We Collect
              </h2>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-300 mb-6">
                We may collect personal information such as your name, email
                address, phone number, and project details when you fill out
                our contact forms.
              </p>
              <div className="space-y-3">
                {['Name and contact information', 'Email address and phone number', 'Project requirements and specifications', 'Communication preferences', 'Technical information about your device and browser'].map((item, i) => <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[color:var(--vibrant-green)] shrink-0" />
                  <span className="text-gray-400">{item}</span>
                </div>)}
              </div>
            </div>
          </motion.div>

          {/* How We Use Your Information */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[color:var(--neon-yellow)]/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-[color:var(--neon-yellow)]" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                How We Use Your Information
              </h2>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-gray-300">
                We use the information we collect to provide, operate, and
                maintain our services, improve our website, and communicate
                with you regarding project updates.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-[color:var(--bright-red)] mt-1">
                    •
                  </span>
                  <span>Provide and maintain our services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[color:var(--bright-red)] mt-1">
                    •
                  </span>
                  <span>Improve and personalize user experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[color:var(--bright-red)] mt-1">
                    •
                  </span>
                  <span>Communicate project updates and information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[color:var(--bright-red)] mt-1">
                    •
                  </span>
                  <span>
                    Send newsletters and marketing communications (with
                    consent)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[color:var(--bright-red)] mt-1">
                    •
                  </span>
                  <span>Detect and prevent fraud or security issues</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Log Files & Cookies */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[color:var(--vibrant-green)]/20 flex items-center justify-center">
                <Lock className="w-6 h-6 text-[color:var(--vibrant-green)]" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                Log Files & Cookies
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">
                  Log Files
                </h3>
                <p className="text-gray-300">
                  Phixels follows a standard procedure of using log files.
                  These files log visitors when they visit websites. The
                  information collected includes IP addresses, browser type,
                  Internet Service Provider (ISP), date and time stamp,
                  referring/exit pages, and possibly the number of clicks.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Cookies</h3>
                <p className="text-gray-300">
                  Like any other website, Phixels uses 'cookies' to store
                  information including visitors' preferences and the pages on
                  the website that the visitor accessed or visited. This
                  information is used to optimize users' experience by
                  customizing our web page content based on visitors' browser
                  type and other information.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Third-Party Privacy */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Third-Party Privacy Policies
            </h2>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-300">
                Our Privacy Policy does not apply to other advertisers or
                websites. We advise you to consult the respective Privacy
                Policies of these third-party services for more detailed
                information.
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
              Questions About Privacy?
            </h3>
            <p className="text-gray-400 mb-6">
              If you have any questions or concerns about our privacy
              practices, please don't hesitate to contact us.
            </p>
            <a href="mailto:phixels.io@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[color:var(--bright-red)] text-white font-bold hover:bg-[color:var(--bright-red)]/90 transition-colors">
              Contact Us <ArrowRight size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </main>;
}