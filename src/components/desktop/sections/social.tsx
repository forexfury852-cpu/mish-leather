'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, Star } from 'lucide-react';
import { INSTAGRAM_GRID, TESTIMONIALS, toFa } from '@/lib/data';
import { Reveal, LineMask, EASE } from '@/components/fx/reveal';
import { SectionHead } from '@/components/fx/section';

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setIndex(((next % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(index + 1, 1), 7000);
    return () => clearInterval(t);
  }, [index, go]);

  const item = TESTIMONIALS[index];

  return (
    <section className="relative overflow-hidden bg-espresso py-28 lg:py-36" aria-label="نظر مشتریان">
      <span
        className="pointer-events-none absolute -top-10 right-8 select-none text-[16rem] font-extralight leading-none text-cream/[0.05]"
        aria-hidden
      >
        ”
      </span>
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <Reveal y={16}>
          <div className="flex items-center justify-center gap-4">
            <span className="latin-tag text-copper">Testimonials</span>
            <span className="h-px w-14 bg-cream/25" />
            <span className="text-sm font-light text-sand/70">۰۸</span>
          </div>
        </Reveal>

        <div className="relative mt-14 min-h-[300px] sm:min-h-[260px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * -46 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * 46 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div className="flex justify-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-copper text-copper" strokeWidth={1} />
                ))}
              </div>
              <blockquote className="mt-8 text-xl font-extralight leading-[2.4] text-cream/95 lg:text-2xl lg:leading-[2.5]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-8">
                <div className="text-sm font-medium text-copper">{item.name}</div>
                <div className="mt-1 text-xs font-light text-sand/60">{item.role}</div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8">
          <button
            onClick={() => go(index - 1, -1)}
            aria-label="نظر قبلی"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/75 transition-colors hover:border-copper hover:text-copper"
          >
            <ChevronRight size={17} strokeWidth={1.25} />
          </button>
          <span className="text-xs font-light tabular-nums text-sand/60">
            {toFa(index + 1)} / {toFa(TESTIMONIALS.length)}
          </span>
          <button
            onClick={() => go(index + 1, 1)}
            aria-label="نظر بعدی"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/75 transition-colors hover:border-copper hover:text-copper"
          >
            <ChevronLeft size={17} strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Instagram gallery ---------------- */
export function InstagramGallery() {
  return (
    <section className="bg-ink py-24 lg:py-32" aria-label="اینستاگرام">
      <div className="mx-auto mb-14 flex max-w-[1680px] flex-wrap items-end justify-between gap-8 px-6 lg:px-12">
        <div>
          <Reveal y={16}>
            <div className="flex items-center gap-4">
              <span className="latin-tag text-copper">@mishleather</span>
              <span className="h-px w-14 bg-cream/25" />
              <span className="text-sm font-light text-sand/70">۰۹</span>
            </div>
          </Reveal>
          <h2 className="text-display-lg mt-5">
            <LineMask>در اینستاگرام میش</LineMask>
          </h2>
        </div>
        <Reveal delay={0.15}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="lux-btn flex items-center gap-3 border border-cream/25 px-7 py-3.5 text-sm font-light"
          >
            <Instagram size={16} strokeWidth={1.5} />
            دنبال کنید
          </a>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-1.5 px-1.5 sm:grid-cols-4">
        {INSTAGRAM_GRID.map((item, i) => (
          <Reveal key={item.image + i} delay={(i % 4) * 0.06} y={24}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden"
              aria-label="پست اینستاگرام"
            >
              { }
              <img
                src={item.image}
                alt="تصویر اینستاگرام چرم میش"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
                <Instagram size={22} strokeWidth={1.25} className="text-copper" />
                <span className="text-xs font-light text-cream/85">♥ {toFa(item.likes.toLocaleString('en-US'))}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Newsletter ---------------- */
export function Newsletter() {
  const [joined, setJoined] = useState(false);

  return (
    <section className="hairline-t bg-coal py-28 lg:py-36" aria-label="خبرنامه">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Reveal y={16}>
          <span className="latin-tag text-copper">Newsletter — عضویت</span>
        </Reveal>
        <h2 className="text-display-lg mt-6">
          <LineMask>به دنیای میش بپیوندید</LineMask>
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-8 text-sand/70">
            نخستین نفراتی باشید که از مجموعه‌های محدود، دعوت‌نامه‌ی حراج‌های خصوصی و قصه‌های کارگاه باخبر می‌شوند.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          {joined ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 border border-copper/40 bg-copper/[0.06] px-8 py-6"
            >
              <p className="text-sm font-light text-copper">خوش آمدید — کد تخفیف ۱۰٪ خرید نخست شما:</p>
              <p className="latin-word mt-2 text-lg tracking-[0.4em] text-cream">MISH10</p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setJoined(true);
              }}
              className="mx-auto mt-12 flex max-w-xl items-stretch gap-6"
            >
              <input
                type="email"
                required
                placeholder="ایمیل شما"
                aria-label="ایمیل"
                className="lux-input flex-1 text-sm"
              />
              <button type="submit" className="lux-btn border border-cream/30 px-9 py-3 text-sm font-light">
                عضویت
              </button>
            </form>
          )}
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-6 text-[0.68rem] font-light text-sand/40">
            ماهی یک نامه، نه بیشتر — بدون تبلیغات مزاحم.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
