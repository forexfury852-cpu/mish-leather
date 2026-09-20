'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ChevronLeft, Star } from 'lucide-react';
import { BEST_SELLERS, CATEGORIES, NEW_COLLECTION, TESTIMONIALS } from '@/lib/data';
import { useUI } from '@/lib/store';
import { LineMaskMount, Reveal, EASE } from '@/components/fx/reveal';
import { MobileProductCard } from './chrome';

const bootedDelay = 0.15;

/* ---------- Drift slider: continuous auto-glide + user horizontal swipe ---------- */
function DriftSlider({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const st = useRef({ offset: 0, dragging: false, lastX: 0, moved: 0, paused: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    let last = performance.now();
    const apply = () => {
      const h = track.scrollWidth / 2; // duplicated halves → seamless wrap
      const o = ((st.current.offset % h) + h) % h;
      track.style.transform = `translate3d(${-o}px,0,0)`;
    };
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (!st.current.dragging && !st.current.paused) {
        st.current.offset += dt * 0.021; // ≈21px/s — very slow cinematic drift
        apply();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const applyNow = () => {
    const track = trackRef.current;
    if (!track) return;
    const h = track.scrollWidth / 2;
    const o = ((st.current.offset % h) + h) % h;
    track.style.transform = `translate3d(${-o}px,0,0)`;
  };

  return (
    <div
      dir="ltr"
      className="relative mt-7 cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
      onPointerDown={(e) => {
        st.current.dragging = true;
        st.current.lastX = e.clientX;
        st.current.moved = 0;
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!st.current.dragging) return;
        const dx = e.clientX - st.current.lastX;
        st.current.lastX = e.clientX;
        st.current.moved += Math.abs(dx);
        st.current.offset -= dx;
        applyNow();
      }}
      onPointerUp={(e) => {
        st.current.dragging = false;
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {}
      }}
      onPointerCancel={() => {
        st.current.dragging = false;
      }}
      onMouseEnter={() => {
        st.current.paused = true;
      }}
      onMouseLeave={() => {
        st.current.paused = false;
      }}
      onClickCapture={(e) => {
        // swallow the click that ends a drag so cards don't navigate accidentally
        if (st.current.moved > 8) {
          e.preventDefault();
          e.stopPropagation();
          st.current.moved = 0;
        }
      }}
    >
      <div ref={trackRef} dir="ltr" className="flex w-max will-change-transform">
        {children}
      </div>
      {/* frosted edges — blur fades in from both sides (no white fade) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 backdrop-blur-[7px]"
        style={{ WebkitMaskImage: 'linear-gradient(to right, black, transparent)', maskImage: 'linear-gradient(to right, black, transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 backdrop-blur-[7px]"
        style={{ WebkitMaskImage: 'linear-gradient(to left, black, transparent)', maskImage: 'linear-gradient(to left, black, transparent)' }}
      />
    </div>
  );
}

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

        {/* top brand row — hamburger trigger occupies the left corner (global chrome) */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: bootedDelay + 0.4, duration: 0.9, ease: EASE }}
          className="absolute inset-x-0 top-12 flex items-center justify-between px-6"
        >
          <span className="latin-tag text-copper">Est. 2000 — Tehran</span>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium text-cream">
            چرم <span className="font-extralight text-copper">میش</span>
          </span>
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

      {/* ---------- CATEGORIES — continuous auto slider (very smooth, no entrance jump) ---------- */}
      <section className="pt-16">
        <Reveal y={22} className="px-6">
          <header className="flex items-end justify-between">
            <div>
              <span className="latin-tag text-copper">The World of Mish</span>
              <h2 className="mt-2 text-[1.55rem] font-extralight">دنیای میش</h2>
            </div>
            <button onClick={() => goShop('all')} className="flex items-center gap-1 text-[0.72rem] font-light text-copper">
              همه
              <ChevronLeft size={13} strokeWidth={1.5} />
            </button>
          </header>
        </Reveal>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* seamless slow auto-drift — and the user can swipe it horizontally too */}
          <DriftSlider>
            {[0, 1].map((half) => (
              <div key={half} className="flex gap-4 pr-4">
                {CATEGORIES.map((cat, i) => (
                  <button
                    key={`${half}-${cat.key}`}
                    dir="rtl"
                    onClick={() => goShop(cat.key)}
                    className="relative aspect-[3/4] w-[46vw] flex-none overflow-hidden rounded-[1.5rem] shadow-[0_12px_35px_-16px_rgba(28,19,10,0.4)] ring-1 ring-ink/10"
                    aria-label={cat.title}
                  >
                    <img src={cat.image} alt={cat.title} loading="lazy" draggable={false} className="h-full w-full object-cover" />
                    <span className="text-outline absolute right-3 top-3 select-none text-5xl font-extralight">
                      {String(i + 1).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])}
                    </span>
                    {/* legibility scrim — blurred base fading up + dark gradient */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[62%] backdrop-blur-[6px] [-webkit-mask-image:linear-gradient(to_top,black_35%,transparent)] [mask-image:linear-gradient(to_top,black_35%,transparent)]"
                      aria-hidden
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-transparent" />
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
            ))}
          </DriftSlider>
        </motion.div>
      </section>

      {/* ---------- NEW COLLECTION — clean 2-col grid ---------- */}
      <section className="pt-20">
        <Reveal y={22} className="px-6">
          <header>
            <span className="latin-tag text-copper">New Arrivals</span>
            <h2 className="mt-2 text-[1.55rem] font-extralight">
              مجموعه جدید <span className="text-ink/40 text-sm font-light">— پاییز ۱۴۰۴</span>
            </h2>
          </header>
        </Reveal>
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-9 px-6">
          {NEW_COLLECTION.slice(0, 4).map((p, i) => (
            <MobileProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ---------- BEST SELLERS — one clean horizontal line ---------- */}
      <section className="pt-20">
        <Reveal y={22} className="px-6">
          <header className="flex items-end justify-between">
            <div>
              <span className="latin-tag text-copper">Best Sellers</span>
              <h2 className="mt-2 text-[1.55rem] font-extralight">پرفروش‌ترین‌ها</h2>
            </div>
            <button onClick={() => goShop('all')} className="flex items-center gap-1 text-[0.72rem] font-light text-copper">
              همه
              <ChevronLeft size={13} strokeWidth={1.5} />
            </button>
          </header>
        </Reveal>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2"
        >
          {BEST_SELLERS.map((p, i) => (
            <div key={p.id} className="w-[42vw] flex-none snap-start">
              <MobileProductCard product={p} compact index={i} fade />
            </div>
          ))}
          {/* end of rail — link to the full shop */}
          <div className="flex w-[38vw] flex-none snap-start items-center">
            <button
              onClick={() => goShop('all')}
              data-hover
              className="group flex flex-col items-center gap-3.5 rounded-2xl py-8"
              aria-label="مشاهده همه‌ی محصول‌ها"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink/70 transition-all duration-300 group-active:scale-90 group-active:border-copper group-active:bg-copper group-active:text-paper">
                <ArrowLeft size={17} strokeWidth={1.5} />
              </span>
              <span className="text-[0.72rem] font-light text-ink/60">همه‌ی محصول‌ها</span>
            </button>
          </div>
          <div className="w-2 flex-none" />
        </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="absolute inset-x-0 bottom-0 p-6 pb-14"
        >
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
        </motion.div>
      </section>

      {/* ---------- CRAFT teaser ---------- */}
      <section className="px-6 pt-20">
        <Reveal y={22}>
          <span className="latin-tag text-copper">The Craft</span>
          <h2 className="mt-2 text-[1.55rem] font-extralight leading-relaxed">
            چرم، در دستان ما
            <span className="text-copper"> جان می‌گیرد</span>
          </h2>
          <p className="mt-4 text-[0.83rem] font-light leading-8 text-ink/60">
            چهارده ساعت کار دست روی هر کیف؛ از انتخاب پوست در دباغی تا کوک آخرِ لبه. هر قطعه شماره‌ی سری و امضای استادکار خودش را دارد.
          </p>
        </Reveal>
        <div className="mt-7 grid grid-cols-2 gap-3">
          {[
            { src: '/images/craft-hands.jpg', alt: 'دست‌های استادکار' },
            { src: '/images/craft-tools.jpg', alt: 'ابزار کارگاه' },
          ].map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 34, scale: 1.05 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
              className="img-zoom aspect-square overflow-hidden rounded-[1.25rem]"
            >
              <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
        <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto">
          {[
            { v: '۲۵+', l: 'سال تجربه' },
            { v: '۱۴۰', l: 'مرحله ساخت' },
            { v: '۱۰۰٪', l: 'چرم طبیعی' },
            { v: '∞', l: 'ضمانت دوخت' },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="flex-none rounded-2xl border border-ink/12 bg-paper-deep/60 px-6 py-4"
            >
              <div className="text-2xl font-extralight text-copper">{s.v}</div>
              <div className="mt-1 text-[0.62rem] font-light text-ink/50">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- TESTIMONIAL ---------- */}
      <section className="px-6 pt-20">
        <Reveal y={20}>
          <span className="latin-tag text-copper">Testimonials</span>
        </Reveal>
        <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
              className="w-[78vw] flex-none snap-center rounded-3xl border border-ink/12 bg-paper-deep p-6 shadow-[0_18px_44px_-26px_rgba(28,19,10,0.22)]"
            >
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
            </motion.figure>
          ))}
        </div>
      </section>

      {/* ---------- NEWSLETTER ---------- */}
      <section className="px-6 pt-20">
        <Reveal y={30}>
        <div className="rounded-[1.75rem] border border-ink/12 bg-paper-deep p-7 shadow-[0_24px_60px_-32px_rgba(28,19,10,0.25)]">
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
        </Reveal>
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mt-10 select-none overflow-hidden text-center text-[4.4rem] font-black leading-[0.9] text-ink/[0.06]"
          aria-hidden
        >
          چرم میش
        </motion.div>
        <p className="mt-4 text-center text-[0.62rem] font-light text-ink/40">© ۱۴۰۴ چرم میش — تمام حقوق محفوظ است.</p>
      </footer>
    </div>
  );
}
