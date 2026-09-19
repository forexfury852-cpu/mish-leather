'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Full-bleed parallax image — inner layer is over-scanned and translated
 * by vertical scroll progress. speed 0..0.3
 */
export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.12,
  overlay,
  position = 'center',
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: string;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <motion.div style={{ y }} className="absolute -inset-y-[18%] inset-x-0 will-change-transform">
        { }
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ objectPosition: position }}
          loading="lazy"
        />
      </motion.div>
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}
    </div>
  );
}

/** Subtle parallax for any child — translate on scroll */
export function ParallaxBox({
  children,
  className,
  speed = 40,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
