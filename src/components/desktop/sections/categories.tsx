'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES, type CategoryKey } from '@/lib/data';
import { useUI } from '@/lib/store';
import { Reveal, LineMask } from '@/components/fx/reveal';

const FA_INDEX = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵'];

export function Categories() {
  const goShop = useUI((s) => s.goShop);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 800);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, range]);
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const open = (key: CategoryKey) => goShop(key);

  return (
    <section ref={wrapRef} className="relative h-[420vh] bg-ink" aria-label="دسته‌بندی‌ها">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* header line */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-end justify-between px-6 pt-28 lg:px-12">
          <div>
            <Reveal y={20}>
              <div className="flex items-center gap-4">
                <span className="latin-tag text-copper">The World of Mish</span>
                <span className="h-px w-14 bg-cream/25" />
                <span className="text-sm font-light text-sand/70">۰۱</span>
              </div>
            </Reveal>
            <h2 className="text-display-lg mt-4">
              <LineMask>دنیای میش</LineMask>
            </h2>
          </div>
          <Reveal y={20} className="hidden pb-2 md:block">
            <span className="text-xs font-light text-sand/50">برای کاوش، اسکرول کنید ←</span>
          </Reveal>
        </div>

        {/* horizontal track — RTL: positive x reveals leftward overflow */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-[3.5vw] px-[6vw] will-change-transform"
        >
          {/* intro panel */}
          <div className="flex w-[30vw] min-w-[300px] flex-col justify-center">
            <p className="text-display-md leading-snug text-cream/95">
              پنج دنیا،
              <br />
              یک <span className="text-copper">امضا</span>
            </p>
            <p className="mt-6 max-w-xs text-sm font-light leading-8 text-sand/70">
              هر دسته، فصلی از یک روایت است؛ چرمی که از کارگاه میش بیرون می‌رود، برای یک عمر ساخته شده است.
            </p>
            <div className="mt-10 h-px w-full max-w-xs bg-cream/10">
              <motion.div style={{ width: progress }} className="h-px bg-copper" />
            </div>
          </div>

          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.key}
              onClick={() => open(cat.key)}
              data-hover
              className="group relative h-[62vh] w-[38vw] min-w-[330px] overflow-hidden text-start"
              aria-label={`دسته‌ی ${cat.title}`}
            >
              <span className="text-outline absolute -top-4 right-4 z-10 select-none text-[7rem] font-extralight leading-none opacity-80">
                {FA_INDEX[i]}
              </span>
              <div className="img-zoom absolute inset-0">
                { }
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-[1.08]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="latin-tag text-copper/90">{cat.latin}</span>
                <h3 className="mt-2 text-3xl font-extralight text-cream">{cat.title}</h3>
                <p className="mt-1 text-xs font-light text-sand/70">{cat.line}</p>
                <div className="mt-5 flex items-center justify-between border-t border-cream/15 pt-4">
                  <span className="text-xs font-light text-sand/70">
                    {String(cat.count).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])} قطعه
                  </span>
                  <span className="flex items-center gap-2 text-xs font-light text-copper opacity-0 transition-all duration-500 group-hover:opacity-100">
                    کاوش دسته
                    <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:-translate-x-1" />
                  </span>
                </div>
              </div>
            </button>
          ))}

          {/* CTA panel */}
          <button
            onClick={() => goShop('all')}
            data-hover
            className="group relative flex h-[62vh] w-[24vw] min-w-[260px] flex-col items-start justify-center overflow-hidden border border-cream/12 bg-espresso p-10 text-start"
            aria-label="همه‌ی محصولات"
          >
            <span className="latin-tag text-copper">Full Catalogue</span>
            <span className="text-display-md mt-6 leading-snug">
              همه‌ی
              <br />
              محصولات
            </span>
            <span className="mt-10 flex h-14 w-14 items-center justify-center rounded-full border border-cream/25 transition-all duration-500 group-hover:border-copper group-hover:bg-copper group-hover:text-ink">
              <ArrowLeft size={18} strokeWidth={1.25} className="transition-transform duration-500 group-hover:-translate-x-1" />
            </span>
            <span className="absolute -bottom-8 -left-6 select-none text-[10rem] font-extralight leading-none text-cream/[0.04]">
              میش
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
