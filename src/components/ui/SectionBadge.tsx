import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionBadgeProps {
    children: React.ReactNode;
    icon?: LucideIcon;
    withPing?: boolean;
    className?: string;
    initial?: any;
    animate?: any;
    transition?: any;
}

export function SectionBadge({
    children,
    icon: Icon,
    withPing,
    className = '',
    initial,
    animate,
    transition
}: SectionBadgeProps) {
    // combine default animation calls if not provided
    const animationProps = {
        initial: initial || { opacity: 0, scale: 0.9 },
        animate: animate || { opacity: 1, scale: 1 },
        transition: transition
    };

    return (
        <motion.div
            {...animationProps}
            className={`inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-medium text-[color:var(--neon-yellow)] mb-6 ${className}`}
        >
            {withPing && (
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                </span>
            )}
            {Icon && <Icon className="w-4 h-4" />}
            {children}
        </motion.div>
    );
}
