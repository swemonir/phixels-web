import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface CallToActionProps {
    title: string;
    description: string;
    buttonText?: string;
    backgroundImage?: string;
    variant?: 'default' | 'simple';
}

export function CallToAction({
    title,
    description,
    buttonText = "Start Your Project",
    backgroundImage,
}: CallToActionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center bg-[#0A0A0A] border border-white/10"
        >
            {/* Background */}
            {backgroundImage ? (
                <div className="absolute inset-0">
                    <img
                        src={backgroundImage}
                        alt="CTA Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--deep-navy)]/95 to-[color:var(--deep-red)]/95" />
                </div>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--deep-navy)]/20 to-transparent pointer-events-none" />
            )}

            <div className="relative z-10 flex flex-col items-center justify-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {title}
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    {description}
                </p>
                <Button variant="primary" glow triggerPopup className="text-lg px-8 py-4">
                    {buttonText} <ArrowRight className="ml-2" />
                </Button>
            </div>
        </motion.div>
    );
}
