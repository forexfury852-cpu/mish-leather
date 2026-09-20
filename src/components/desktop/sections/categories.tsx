'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';
import { useUI } from '@/lib/store';
import { Reveal, LineMask, EASE } from '@/components/fx/reveal';

const FA_INDEX = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵'];
const GROW = 3.4;

/**
 * «The World of Mish» — compact expanding-panel gallery.
 * No scroll-jack: a single normal-height row of five blades.
 * The active blade opens (flex-grow) to reveal its world; the rest
 * stay as slim vertical spines with a rotated title.
 */
export function Categories() {
  const goShop = useUI((s) => s.goShop);
  const [active, setActive] = useState(0);

  return (
    <section
      className="bg-paper py-20 lg:py-28"
      aria-label="دسته‌بندی‌ها"
      onMouseLeave={() => setActive(0)}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* header — title right, invitation left */}
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div>
            <Reveal y={18}>
              <div className="flex items-center gap-4">
                <span className="latin-tag text-copper">The World of Mish</span>
                <span className="h-px w-14 bg-ink/25" />
                <span className="text-sm font-light text-ink/50">۰۱</span>
              </div>
            </Reveal>
            <h2 className="text-display-md mt-4">
              <LineMask>دنیای میش — پنج دنیا، یک امضا</LineMask>
            </h2>
          </div>
          <Reveal y={18} delay={0.12} className="max-w-[300px]">
            <p className="text-[0.82rem] font-light leading-7 text-ink/60">
              هر دسته، فصلی از یک روایت است؛ چرمی که برای یک عمر ساخته شده است.
              روی هر دنیا بایستید تا باز شود.
            </p>
            <button
              onClick={() => goShop('all')}
              className="lux-btn mt-5 border border-ink/25 px-7 py-3 text-[0.8rem] font-light text-ink active:scale-[0.97]"
            >
              مشاهده همه‌ی مجموعه
            </button>
          </Reveal>
        </div>

        {/* expanding blades */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-12 flex h-[46vh] max-h-[520px] min-h-[360px] gap-2.5 lg:gap-3"
        >
          {CATEGORIES.map((cat, i) => {
            const open = active === i;
            return (
              <button
                key={cat.key}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => goShop(cat.key)}
                data-hover
                style={{
                  flexGrow: open ? GROW : 1,
                  flexBasis: 0,
                  transition:
                    'flex-grow 0.9s cubic-bezier(0.22,1,0.36,1), box-shadow 0.7s ease',
                }}
                className={`group relative min-w-0 overflow-hidden rounded-[1.4rem] text-start shadow-[0_10px_40px_-18px_rgba(28,19,10,0.35)] ${
                  open
                    ? 'shadow-[0_28px_70px_-26px_rgba(28,19,10,0.5)] ring-1 ring-copper/50'
                    : 'ring-1 ring-ink/10'
                }`}
                aria-label={`دسته‌ی ${cat.title}`}
                aria-expanded={open}
              >
                {/* image — dimmed while closed, alive when open */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-out ${
                    open ? 'scale-100 brightness-100' : 'scale-[1.14] brightness-[0.66]'
                  }`}
                />
                {/* legibility scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/[0.08]" />
                <div
                  className={`absolute inset-0 bg-copper/10 transition-opacity duration-700 ${
                    open ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden
                />

                {/* index — always visible */}
                <span
                  className={`absolute right-4 top-4 z-10 select-none font-light transition-colors duration-500 ${
                    open ? 'text-[0.8rem] text-copper-bright' : 'text-[0.8rem] text-cream/60'
                  }`}
                >
                  {FA_INDEX[i]}
                </span>

                {/* closed spine — rotated title */}
                <span
                  aria-hidden
                  className={`absolute bottom-6 right-1/2 z-10 translate-x-1/2 [writing-mode:vertical-rl] text-[0.95rem] font-extralight text-cream/90 transition-all duration-500 ${
                    open ? 'translate-y-3 opacity-0' : 'opacity-100'
                  }`}
                >
                  {cat.title}
                </span>

                {/* open content */}
                <div
                  className={`absolute inset-x-0 bottom-0 z-10 p-6 transition-all duration-500 lg:p-7 ${
                    open ? 'translate-y-0 opacity-100 delay-[350ms]' : 'translate-y-5 opacity-0'
                  }`}
                >
                  <span className="latin-tag text-copper/90">{cat.latin}</span>
                  <h3 className="mt-2 text-[1.45rem] font-extralight text-cream">{cat.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-xs font-light leading-6 text-sand/75">
                    {cat.line}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-cream/15 pt-3.5">
                    <span className="text-[0.7rem] font-light text-sand/70">
                      {String(cat.count).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])} قطعه
                    </span>
                    <span className="flex items-center gap-2 text-[0.7rem] font-light text-copper-bright">
                      کاوش دسته
                      <ArrowLeft
                        size={13}
                        strokeWidth={1.5}
                        className={`transition-transform duration-500 ${open ? '-translate-x-0.5' : ''}`}
                      />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
