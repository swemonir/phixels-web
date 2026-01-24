import { motion } from 'framer-motion';
import { steps } from '../constants/common';
export function ProcessSection() {
  return <section className="py-24 bg-[#020202]">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How We Build
          </h2>
          <p className="text-gray-400 max-w-xl">
            100% Transparency, Weekly Sprints, Post-Launch Support.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => <motion.div key={index} initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.2
        }} viewport={{
          once: true
        }} className={`relative p-6 border-l-2 ${step.color} bg-white/5 rounded-r-xl`}>
          <div className={`text-5xl font-black opacity-20 mb-4 ${step.text}`}>
            {step.num}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {step.title}
          </h3>
          <p className="text-gray-400 text-sm">{step.desc}</p>
        </motion.div>)}
      </div>
    </div>
  </section>;
}