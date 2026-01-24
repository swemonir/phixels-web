import { motion } from 'framer-motion';
import { SectionBadge } from './SectionBadge';

interface PageHeaderProps {
    badgeText?: string;
    badgeIcon?: any;
    badgeWithPing?: boolean;
    title: React.ReactNode;
    description: string;
    align?: 'center' | 'left';
    className?: string;
}

export function PageHeader({
    badgeText,
    badgeIcon,
    badgeWithPing,
    title,
    description,
    align = 'center',
    className = ''
}: PageHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`${align === 'center' ? 'text-center' : 'text-left'} mb-16 md:mb-20 ${className}`}
        >
            {badgeText && (
                <SectionBadge icon={badgeIcon} withPing={badgeWithPing}>
                    {badgeText}
                </SectionBadge>
            )}

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight">
                {title}
            </h1>

            <p className={`text-xl text-gray-400 max-w-2xl md:max-w-3xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
                {description}
            </p>
        </motion.div>
    );
}
