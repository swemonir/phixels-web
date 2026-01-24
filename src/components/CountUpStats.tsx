import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
interface CountUpStatsProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}
export function CountUpStats({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = ''
}: CountUpStatsProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });
  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      // Easing function (easeOutExpo)
      const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      setCount(Math.floor(end * ease));
      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);
  return <span ref={ref} className={className}>
    {prefix}
    {count.toLocaleString()}
    {suffix}
  </span>;
}