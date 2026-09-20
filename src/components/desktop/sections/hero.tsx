'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useUI } from '@/lib/store';
import { LineMaskMount, EASE } from '@/components/fx/reveal';

const FA = (s: string) => s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

export function Hero() {
  const booted = useUI((s) => s.booted);
  const goShop = useUI((s) => s.goShop);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const d = booted ? 0.1 : 2.75;

  const scrollToCraft = () =>
    document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden" aria-label="معرفی">
      {/* backdrop */}
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <motion.img
          src="/images/hero.jpg"
          alt="کیف چرم دست‌دوز میش بر سنگ تیره، در نور سینمایی"
          className="h-full w-full object-cover object-[center_42%]"
          initial={{ scale: 1.18, filter: 'brightness(0.5)' }}
          animate={{ scale: 1, filter: 'brightness(1)' }}
          transition={{ duration: 2.6, delay: booted ? 0 : 2.45, ease: EASE }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-l from-ink/72 via-transparent to-transparent" />

      {/* content */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="absolute inset-0 mx-auto flex max-w-[1440px] flex-col justify-end px-6 pb-24 lg:px-12 lg:pb-28"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: d + 0.15 }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="h-px w-16 bg-copper/80" />
          <span className="latin-tag text-copper">Mish Leather — Autumn Collection</span>
        </motion.div>

        <h1 className="text-display-xl max-w-[13ch] text-cream">
          <LineMaskMount delay={d + 0.25}>اصالت،</LineMaskMount>
          <LineMaskMount delay={d + 0.45}>
            در <span className="font-medium text-copper">جزئیات</span> ساخته می‌شود
          </LineMaskMount>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: d + 0.85, ease: EASE }}
          className="mt-8 max-w-lg text-[0.95rem] font-light leading-8 text-sand/85"
        >
          از سال ۲۰۰۰، در کارگاه تهران؛ چرم طبیعی، دوخت زین‌دوزی و سلیقه‌ای که با شما پیر می‌شود.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: d + 1.05, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-8"
        >
          <button
            onClick={() => goShop('all')}
            className="group rounded-full bg-cream px-9 py-4 text-[0.85rem] font-medium text-ink shadow-[0_18px_45px_-12px_rgba(0,0,0,0.55)] transition-all duration-500 hover:bg-copper hover:text-paper active:scale-[0.96]"
          >
            <span className="flex items-center justify-center gap-3">
              مشاهده مجموعه
              <ArrowLeft size={15} strokeWidth={1.75} className="transition-transform duration-500 group-hover:-translate-x-1.5" />
            </span>
          </button>
          <button onClick={scrollToCraft} className="lux-link rounded-full text-sm font-light text-cream/85 transition-colors hover:text-cream active:text-copper">
            داستان صنعتگری
          </button>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.5, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        aria-hidden
      >
        <span className="text-[0.65rem] font-light text-sand/60">اسکرول</span>
        <span className="relative block h-12 w-px overflow-hidden bg-cream/15">
          <span className="absolute right-0 top-0 h-3 w-px animate-scroll-dot bg-copper" />
        </span>
      </motion.div>

      {/* vertical latin edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.6, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-28 left-10 hidden lg:block"
        aria-hidden
      >
        <span className="latin-tag block -rotate-90 text-cream/35" style={{ transformOrigin: 'left bottom' }}>
          {FA('Handcrafted in Tehran — Since 2000')}
        </span>
      </motion.div>

      {/* huge outlined numeral */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.3, duration: 1.4 }}
        style={{ opacity: fade }}
        className="text-outline pointer-events-none absolute left-6 top-24 hidden select-none text-[10rem] font-extralight leading-none xl:block"
        aria-hidden
      >
        ۲۰۰۰
      </motion.span>
    </section>
  );
}
