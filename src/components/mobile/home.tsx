'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ChevronLeft, Star } from 'lucide-react';
import { BEST_SELLERS, CATEGORIES, NEW_COLLECTION, TESTIMONIALS } from '@/lib/data';
import { useUI } from '@/lib/store';
import { LineMaskMount, Reveal, EASE } from '@/components/fx/reveal';
import { MobileProductCard } from './chrome';

const bootedDelay = 0.15;

export function MobileHome() {
  const { goShop, goProduct } = useUI();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const campaignRef = useRef<HTMLElement>(null);
  const { scrollYProgress: campP } = useScroll({ target: campaignRef, offset: ['start end', 'end start'] });
  const campY = useTransform(campP, [0, 1], ['-12%', '12%']);

  return (
    <div className="bg-paper pb-24">
      {/* ---------- HERO ---------- */}
      <section ref={heroRef} className="relative h-[94cqh] min-h-[560px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <motion.img
            src="/images/mobile-hero.jpg"
            alt="مردی با کیف چرم میش"
            className="h-full w-full object-cover object-[center_20%]"
            initial={{ scale: 1.16 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, delay: bootedDelay, ease: EASE }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/55" />

        {/* top brand row */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: bootedDelay + 0.4, duration: 0.9, ease: EASE }}
          className="absolute inset-x-0 top-12 flex items-center justify-between px-6"
        >
          <span className="latin-tag text-copper">Est. 2000</span>
          <span className="text-lg font-medium text-cream">
            چرم <span className="font-extralight text-copper">میش</span>
          </span>
          <span className="latin-tag text-copper">Tehran</span>
        </motion.div>

        {/* headline block */}
        <motion.div style={{ opacity: heroFade }} className="absolute inset-x-0 bottom-0 px-6 pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: bootedDelay + 0.5, duration: 1 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-copper/80" />
            <span className="latin-tag text-copper">Autumn Collection</span>
          </motion.div>
          <h1 className="text-[2.6rem] font-extralight leading-[1.28] text-cream">
            <LineMaskMount delay={bootedDelay + 0.55}>اصالت،</LineMaskMount>
            <LineMaskMount delay={bootedDelay + 0.72}>
              در <span className="font-medium text-copper">جزئیات</span> ساخته می‌شود
            </LineMaskMount>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: bootedDelay + 1.05, duration: 0.9, ease: EASE }}
            className="mt-4 text-[0.83rem] font-light leading-7 text-sand/80"
          >
            چرم طبیعی، دوخت زین‌دوزی، سلیقه‌ای که با شما پیر می‌شود.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: bootedDelay + 1.2, duration: 0.9, ease: EASE }}
            className="mt-8 flex flex-col gap-3"
          >
            <button
              onClick={() => goShop('all')}
              className="rounded-full bg-cream py-4 text-[0.85rem] font-medium text-ink shadow-[0_14px_35px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 active:scale-[0.96] active:bg-copper active:text-paper"
            >
              <span className="flex items-center justify-center gap-3">
                مشاهده مجموعه
                <ArrowLeft size={15} strokeWidth={1.75} />
              </span>
            </button>
            <button
              onClick={() => goProduct('arta-messenger')}
              className="py-3 text-[0.8rem] font-light text-sand/85 transition-colors active:text-copper"
            >
              قطعه امضا — کیف «آرتا»
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------- CATEGORIES — snap carousel ---------- */}
      <section className="pt-16">
        <header className="flex items-end justify-between px-6">
          <div>
            <span className="latin-tag text-copper">The World of Mish</span>
            <h2 className="mt-2 text-[1.55rem] font-extralight">دنیای میش</h2>
          </div>
          <button onClick={() => goShop('all')} className="flex items-center gap-1 text-[0.72rem] font-light text-copper">
            همه
            <ChevronLeft size={13} strokeWidth={1.5} />
          </button>
        </header>
        <div className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.key}
              onClick={() => goShop(cat.key)}
              className="relative aspect-[3/4] w-[56vw] flex-none snap-center overflow-hidden rounded-[1.5rem] shadow-[0_12px_35px_-16px_rgba(28,19,10,0.4)] transition-transform duration-300 active:scale-[0.97]"
              aria-label={cat.title}
            >
              { }
              <img src={cat.image} alt={cat.title} loading="lazy" className="h-full w-full object-cover" />
              <span className="text-outline absolute right-3 top-3 select-none text-5xl font-extralight">
                {String(i + 1).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="latin-tag text-copper/90">{cat.latin}</span>
                <h3 className="mt-1 text-xl font-extralight text-cream">{cat.title}</h3>
                <p className="mt-1 text-[0.62rem] font-light text-sand/65">
                  {String(cat.count).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])} قطعه — کاوش کنید
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ---------- NEW COLLECTION — clean 2-col grid ---------- */}
      <section className="pt-20">
        <header className="px-6">
          <span className="latin-tag text-copper">New Arrivals</span>
          <h2 className="mt-2 text-[1.55rem] font-extralight">
            مجموعه جدید <span className="text-ink/40 text-sm font-light">— پاییز ۱۴۰۴</span>
          </h2>
        </header>
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-9 px-6">
          {NEW_COLLECTION.slice(0, 4).map((p) => (
            <MobileProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ---------- BEST SELLERS — snap carousel ---------- */}
      <section className="pt-20">
        <header className="flex items-end justify-between px-6">
          <div>
            <span className="latin-tag text-copper">Best Sellers</span>
            <h2 className="mt-2 text-[1.55rem] font-extralight">پرفروش‌ترین‌ها</h2>
          </div>
          <button onClick={() => goShop('all')} className="flex items-center gap-1 text-[0.72rem] font-light text-copper">
            همه
            <ChevronLeft size={13} strokeWidth={1.5} />
          </button>
        </header>
        <div className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2">
          {BEST_SELLERS.map((p, i) => (
            <div key={p.id} className={`w-[44vw] flex-none snap-start ${i % 2 === 1 ? 'translate-y-4' : ''}`}>
              <MobileProductCard product={p} compact />
            </div>
          ))}
          <div className="w-2 flex-none" />
        </div>
      </section>

      {/* ---------- CAMPAIGN ---------- */}
      <section ref={campaignRef} className="relative mt-24 h-[52cqh] min-h-[380px] overflow-hidden">
        <motion.img
          src="/images/campaign.jpg"
          alt="کمپین پاییز"
          style={{ y: campY }}
          className="absolute -inset-y-[14%] inset-x-0 h-[128%] w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/60" />
        <div className="absolute inset-x-0 bottom-0 p-6 pb-14">
          <span className="latin-tag text-copper">Campaign — Autumn 1404</span>
          <h2 className="mt-3 text-[2rem] font-extralight leading-snug text-cream">
            عصرِ <span className="text-copper">چرم</span>
          </h2>
          <p className="mt-3 max-w-[26ch] text-[0.8rem] font-light leading-7 text-sand/80">
            بدون لوگو، بدون شعار — فقط فرم، بافت و نور.
          </p>
          <button
            onClick={() => goShop('all')}
            className="mt-7 rounded-full bg-cream px-8 py-3.5 text-[0.82rem] font-medium text-ink shadow-lg transition-all duration-300 active:scale-[0.96] active:bg-copper active:text-paper"
          >
            تماشای کمپین
          </button>
        </div>
      </section>

      {/* ---------- CRAFT teaser ---------- */}
      <section className="px-6 pt-20">
        <span className="latin-tag text-copper">The Craft</span>
        <h2 className="mt-2 text-[1.55rem] font-extralight leading-relaxed">
          چرم، در دستان ما
          <span className="text-copper"> جان می‌گیرد</span>
        </h2>
        <p className="mt-4 text-[0.83rem] font-light leading-8 text-ink/60">
          چهارده ساعت کار دست روی هر کیف؛ از انتخاب پوست در دباغی تا کوک آخرِ لبه. هر قطعه شماره‌ی سری و امضای استادکار خودش را دارد.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="img-zoom aspect-square overflow-hidden rounded-[1.25rem]">
            { }
            <img src="/images/craft-hands.jpg" alt="دست‌های استادکار" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="img-zoom aspect-square overflow-hidden rounded-[1.25rem]">
            { }
            <img src="/images/craft-tools.jpg" alt="ابزار کارگاه" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto">
          {[
            { v: '۲۵+', l: 'سال تجربه' },
            { v: '۱۴۰', l: 'مرحله ساخت' },
            { v: '۱۰۰٪', l: 'چرم طبیعی' },
            { v: '∞', l: 'ضمانت دوخت' },
          ].map((s) => (
            <div key={s.l} className="flex-none rounded-2xl border border-ink/12 px-6 py-4">
              <div className="text-2xl font-extralight text-copper">{s.v}</div>
              <div className="mt-1 text-[0.62rem] font-light text-ink/50">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- TESTIMONIAL ---------- */}
      <section className="px-6 pt-20">
        <span className="latin-tag text-copper">Testimonials</span>
        <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="w-[78vw] flex-none snap-center rounded-3xl border border-ink/12 bg-paper-deep p-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-copper text-copper" strokeWidth={1} />
                ))}
              </div>
              <blockquote className="mt-5 text-[0.9rem] font-extralight leading-8 text-ink/90">{t.quote}</blockquote>
              <figcaption className="mt-5">
                <div className="text-[0.78rem] font-medium text-copper">{t.name}</div>
                <div className="mt-0.5 text-[0.65rem] font-light text-ink/50">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- NEWSLETTER ---------- */}
      <section className="px-6 pt-20">
        <div className="rounded-[1.75rem] border border-ink/12 bg-paper-deep p-7">
          <span className="latin-tag text-copper">Newsletter</span>
          <h2 className="mt-3 text-xl font-extralight">به دنیای میش بپیوندید</h2>
          <p className="mt-3 text-[0.78rem] font-light leading-7 text-ink/60">
            مجموعه‌های محدود و دعوت‌نامه‌ی حراج خصوصی، ماهی یک نامه.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const el = form.querySelector('[data-done]');
              if (el) {
                el.classList.remove('hidden');
                form.querySelector('[data-fields]')?.classList.add('hidden');
              }
            }}
          >
            <div data-fields className="mt-6 flex flex-col gap-4">
              <input
                type="email"
                required
                placeholder="ایمیل شما"
                aria-label="ایمیل"
                className="lux-input text-[0.85rem]"
              />
              <button type="submit" className="rounded-full bg-ink py-4 text-[0.85rem] font-medium text-cream transition-all active:scale-[0.97] active:bg-copper">
                عضویت
              </button>
            </div>
            <p data-done className="mt-6 hidden border border-copper/40 bg-copper/[0.06] px-5 py-4 text-[0.8rem] font-light text-copper">
              خوش آمدید — کد تخفیف نخستین خرید: MISH10
            </p>
          </form>
        </div>
      </section>

      {/* ---------- FOOTER (compact) ---------- */}
      <footer className="mt-20 border-t border-ink/10 px-6 pb-10 pt-12">
        <div className="flex flex-col items-center text-center">
          <span className="latin-tag text-copper">Est. 2000 — Tehran</span>
          <span className="mt-2 text-2xl font-medium">
            چرم <span className="font-extralight text-copper">میش</span>
          </span>
          <p className="mt-4 max-w-[32ch] text-[0.72rem] font-light leading-6 text-ink/50">
            تهران، خیابان ولی‌عصر، نبش کوچه زرتشت — شنبه تا چهارشنبه ۱۰ تا ۲۰
          </p>
          <div className="mt-6 flex gap-8 text-[0.72rem] font-light text-ink/65">
            <button onClick={() => goShop('all')} className="lux-link">فروشگاه</button>
            <button onClick={() => goProduct('arta-messenger')} className="lux-link">قطعه امضا</button>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="lux-link">اینستاگرام</a>
          </div>
        </div>
        <div className="mt-10 select-none overflow-hidden text-center text-[4.4rem] font-black leading-[0.9] text-ink/[0.06]" aria-hidden>
          چرم میش
        </div>
        <p className="mt-4 text-center text-[0.62rem] font-light text-ink/40">© ۱۴۰۴ چرم میش — تمام حقوق محفوظ است.</p>
      </footer>
    </div>
  );
}

/* re-export to keep Reveal referenced for future edits */
void Reveal;
