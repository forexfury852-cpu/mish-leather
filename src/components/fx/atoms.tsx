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

/** Cinematic brand preloader.
 *  Exit choreography — desktop: brand fades, then three ink columns lift vertically in RTL stagger;
 *  mobile: brand drifts out horizontally, ink curtain sweeps left with a deep-copper band chasing it. */
export function Preloader({ onDone, variant = 'desktop' }: { onDone: () => void; variant?: 'desktop' | 'mobile' }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const onDoneRef = useRef(onDone); // keep the latest callback without re-triggering the animation
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);
  const mobile = variant === 'mobile';
  const sweep = [0.76, 0, 0.24, 1] as const;

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
          onDoneRef.current();
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
    // run exactly once — the callback is read through a ref so inline onDone props are safe
  }, []);

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden>
      {/* exit curtains */}
      {mobile ? (
        <>
          <motion.div
            className="absolute inset-0 bg-[#6e4218]"
            exit={{ x: '-102%' }}
            transition={{ duration: 0.85, ease: sweep, delay: 0.14 }}
          />
          <motion.div
            className="absolute inset-0 bg-ink"
            exit={{ x: '-102%' }}
            transition={{ duration: 0.85, ease: sweep }}
          />
        </>
      ) : (
        <div className="absolute inset-0 flex">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-full flex-1 bg-ink [&:not(:first-child)]:border-l [&:not(:first-child)]:border-copper/[0.06]"
              exit={{ y: '-102%' }}
              transition={{ duration: 0.85, ease: sweep, delay: 0.22 + i * 0.14 }}
            />
          ))}
        </div>
      )}

      {/* brand content — leaves before the curtains move (vertical on desktop, horizontal on mobile) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-cream"
        exit={
          mobile
            ? { opacity: 0, x: -44, transition: { duration: 0.4, ease: 'easeIn' } }
            : { opacity: 0, y: -28, transition: { duration: 0.4, ease: 'easeIn' } }
        }
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
      </motion.div>
      <motion.div
        exit={{ opacity: 0, transition: { duration: 0.28 } }}
        className="absolute inset-x-0 bottom-10 text-center text-xs tabular-nums text-sand/50"
      >
        {String(count).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])}٪
      </motion.div>
    </div>
  );
}
