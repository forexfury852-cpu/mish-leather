'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Masked line reveal — text slides up from behind an overflow mask */
export function LineMask({
  children,
  className,
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <span className={`block overflow-hidden ${className ?? ''}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: '112%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once, margin: '-6% 0px' }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Same as LineMask but animates on mount (for hero / above-the-fold) */
export function LineMaskMount({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`block overflow-hidden ${className ?? ''}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: '112%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.2, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 1,
  scale = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  scale?: boolean;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, scale: scale ? 1.04 : 1 },
    show: { opacity: 1, scale: 1 },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered clip reveal for editorial images */
export function ClipReveal({
  children,
  className,
  delay = 0,
  from = 'right',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: 'right' | 'left' | 'bottom';
}) {
  const initial =
    from === 'right'
      ? { clipPath: 'inset(0 0 0 100%)' }
      : from === 'left'
        ? { clipPath: 'inset(0 100% 0 0)' }
        : { clipPath: 'inset(100% 0 0 0)' };
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.3, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export { EASE };
