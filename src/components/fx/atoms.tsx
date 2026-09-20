'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

/** Minimal dot cursor accent — fine pointers only, native cursor kept */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const raf = requestAnimationFrame(() => setEnabled(true));
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest('a, button, [data-hover]'));
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[95] rounded-full bg-copper"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: active ? 20 : 7,
        height: active ? 20 : 7,
        opacity: active ? 0.35 : 0.8,
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    />
  );
}

/** Animated film-grain / preloader */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    document.body.style.overflow = 'hidden';
    const start = performance.now();
    const dur = 1700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          document.body.style.overflow = '';
          onDone();
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-cream"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden
    >
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="text-display-lg text-center"
        >
          چرم <span className="text-copper">میش</span>
        </motion.div>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="mt-6 h-px w-40 origin-center bg-copper/70"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="latin-tag mt-6 text-sand/70"
      >
        Mish Leather — Est. 2000
      </motion.p>
      <div className="absolute bottom-10 text-xs tabular-nums text-sand/50">
        {String(count).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])}٪
      </div>
    </motion.div>
  );
}
