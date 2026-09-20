'use client';

import { BadgeCheck, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { CRAFT_STEPS, GUARANTEES, faPrice } from '@/lib/data';
import { useUI } from '@/lib/store';
import { Reveal, LineMask, ClipReveal } from '@/components/fx/reveal';
import { SectionHead } from '@/components/fx/section';
import { ParallaxBox } from '@/components/fx/parallax';
import { Heart, Star } from 'lucide-react';
import { useState } from 'react';

/* ---------------- Craftsmanship — ivory editorial ---------------- */
const STATS = [
  { value: '۲۵+', label: 'سال تجربه' },
  { value: '۱۴۰', label: 'مرحله‌ی ساخت' },
  { value: '۱۰۰٪', label: 'چرم طبیعی' },
  { value: '∞', label: 'ضمانت دوخت' },
];

export function Craft() {
  return (
    <section id="craft" className="relative overflow-hidden bg-cream py-28 text-ink lg:py-40" aria-label="صنعتگری">
      <span
        className="text-outline-ink pointer-events-none absolute -top-8 right-4 select-none text-[18vw] font-extralight leading-none opacity-50"
        aria-hidden
      >
        کارگاه
      </span>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-20 px-6 lg:grid-cols-12 lg:px-12">
        {/* sticky text */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHead light index="۰۵" title="قصه‌ی دست‌ها" latin="The Craft" />
            <Reveal delay={0.15}>
              <h3 className="text-display-md mt-10 leading-snug">
                چرم، در دستان ما
                <br />
                <span className="text-leather">جان می‌گیرد</span>
              </h3>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-8 max-w-md text-sm font-light leading-9 text-ink/70">
                در کارگاه میش، هیچ ماشینی جای دست را نگرفته است. از انتخاب پوست در دباغی تا کوکِ آخرِ لبه، چهارده ساعت کار دست روی هر کیف جاری است؛ کاری که صدا و بوی خودش را دارد — بوی موم زنبور، چوب بلوط و چرم خام.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-5 max-w-md text-sm font-light leading-9 text-ink/70">
                ما تولید انبوه را انتخاب نکرده‌ایم. هر فصل فقط تعداد محدودی قطعه از هر طرح می‌سازیم و هر قطعه شماره‌ی سری و امضای استادکار خود را دارد.
              </p>
            </Reveal>

            <div className="mt-14 grid max-w-md grid-cols-2">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.08} className="hairline-t border-ink/15 p-6 first:border-s-0">
                  <div className={`hairline-s border-ink/15 ps-6 ${i % 2 === 0 ? 'border-s-0 ps-0' : ''}`}>
                    <div className="text-4xl font-extralight text-leather">{s.value}</div>
                    <div className="mt-2 text-xs font-light text-ink/55">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* image stack */}
        <div className="lg:col-span-7">
          <ClipReveal from="left">
            <div className="img-zoom aspect-[16/10] overflow-hidden rounded-[1.5rem]">
              { }
              <img src="/images/craft-hides.jpg" alt="چرم‌های دباغی‌شده در کارگاه" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </ClipReveal>

          <ParallaxBox speed={36} className="relative z-10 -mt-10 ms-auto w-3/4 lg:-mt-24 lg:w-[62%]">
            <ClipReveal from="bottom">
              <div className="img-zoom aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-30px_rgba(10,8,6,0.45)]">
                { }
                <img src="/images/craft-hands.jpg" alt="دست‌های استادکار در حال دوخت چرم" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </ClipReveal>
          </ParallaxBox>

          <ParallaxBox speed={26} className="relative z-20 -mt-16 w-1/2 lg:-mt-32 lg:w-[38%]">
            <ClipReveal from="right" delay={0.1}>
              <div className="img-zoom aspect-square overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-25px_rgba(10,8,6,0.4)]">
                { }
                <img src="/images/craft-tools.jpg" alt="ابزار دست‌ساز چرم‌دوزی" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </ClipReveal>
          </ParallaxBox>
        </div>
      </div>

      {/* process steps */}
      <div className="mx-auto mt-28 max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="latin-tag text-leather">Process</span>
            <span className="h-px w-14 bg-ink/20" />
            <span className="text-sm font-light text-ink/50">چهار مرحله‌ی یک عمر</span>
          </div>
        </Reveal>
        <div className="mt-10">
          {CRAFT_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <div className="group grid cursor-default grid-cols-[auto_1fr] items-baseline gap-x-8 border-t border-ink/15 py-9 transition-colors duration-500 last:border-b hover:bg-ink/[0.035] lg:grid-cols-[110px_280px_1fr_60px] lg:items-center">
                <span className="latin-word text-2xl text-leather/80">0{i + 1}</span>
                <span className="text-2xl font-extralight transition-transform duration-500 group-hover:-translate-x-1">
                  {step.title}
                </span>
                <p className="col-span-2 mt-3 max-w-2xl text-sm font-light leading-8 text-ink/60 lg:col-span-1 lg:mt-0">
                  {step.desc}
                </p>
                <span className="hidden justify-self-end text-leather opacity-0 transition-all duration-500 group-hover:opacity-100 lg:block">
                  ←
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Signature product showcase ---------------- */
export function Showcase() {
  const { goProduct, toggleWishlist, isWishlisted } = useUI();
  const p = { id: 'arta-messenger', name: 'کیف پیکانی «آرتا»', latin: 'Arta Messenger', price: 12800000, image: '/images/prod-bag-1.jpg' };
  const [wish, setWish] = useState(false);

  return (
    <section className="relative overflow-hidden bg-paper py-28 lg:py-40" aria-label="قطعه امضا">
      <span
        className="text-outline-ink pointer-events-none absolute top-10 left-0 select-none text-[16vw] font-extralight leading-none opacity-80"
        aria-hidden
      >
        امضا
      </span>

      <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 lg:grid-cols-12 lg:px-12">
        {/* image */}
        <div className="relative lg:col-span-7">
          <ClipReveal from="right">
            <div className="img-zoom group relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              { }
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </ClipReveal>
          <div className="absolute -bottom-8 start-6 z-10 flex items-center gap-6 rounded-3xl border border-cream/12 bg-espresso/95 px-8 py-6 shadow-[0_24px_60px_-20px_rgba(28,19,10,0.55)] backdrop-blur lg:start-16">
            <div>
              <span className="latin-tag text-copper">{p.latin}</span>
              <div className="mt-1 text-lg font-light text-cream">{p.name}</div>
            </div>
            <span className="h-10 w-px bg-cream/15" />
            <div className="text-left">
              <div className="text-sm font-light text-sand/90">{faPrice(p.price)}</div>
              <button onClick={() => goProduct(p.id)} className="lux-link mt-1 text-[0.7rem] font-light text-copper">
                مشاهده قطعه
              </button>
            </div>
          </div>
        </div>

        {/* info */}
        <div className="lg:col-span-5">
          <SectionHead index="۰۶" title="قطعه‌ی امضا" latin="The Signature" />
          <Reveal delay={0.15}>
            <h3 className="text-display-md mt-10">{p.name}</h3>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-4 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-copper text-copper" strokeWidth={1} />
              ))}
              <span className="ms-2 text-xs font-light text-ink/50">بر اساس ۱۳۲ دیدگاه</span>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-md text-sm font-light leading-9 text-ink/70">
              «آرتا» پرچم‌دار کارگاه ماست؛ چرم تمام‌دانه‌ی گاوی با یراق برنجی سناییده و آستر پشم. طراحی‌اش برای مردانی است که بیشترِ حرف‌هایشان را نمی‌زنند.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-8 space-y-3">
              {['چرم گاوی تمام‌دانه، دباغی گیاهی', 'دوخت زین‌دوزی دست با نخ موم‌زده', 'یراق برنجی سناییده — ضدزنگ', 'جیب داخلی مخصوص لپ‌تاپ ۱۴ اینچ'].map((m) => (
                <li key={m} className="flex items-center gap-3 text-sm font-light text-ink/75">
                  <span className="text-[0.55rem] text-copper">✦</span>
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-12 flex items-stretch gap-4">
              <button
                onClick={() => goProduct(p.id)}
                className="lux-btn lux-btn-ink flex-1 border border-ink bg-ink px-8 py-4 text-sm font-medium text-cream"
              >
                خرید قطعه — {faPrice(p.price)}
              </button>
              <button
                onClick={() => {
                  setWish(!wish);
                  toggleWishlist(p.id);
                }}
                aria-label="افزودن به علاقه‌مندی"
                className="flex w-14 items-center justify-center border border-ink/25 text-ink/80 transition-colors hover:border-copper hover:text-copper"
              >
                <Heart size={17} strokeWidth={1.5} className={wish || isWishlisted(p.id) ? 'fill-copper text-copper' : ''} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Guarantees ---------------- */
const ICONS = { badge: BadgeCheck, shield: ShieldCheck, truck: Truck, return: RotateCcw } as const;

export function Guarantees() {
  return (
    <section className="hairline-t bg-paper-deep py-24 lg:py-32" aria-label="تعهد ما">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHead index="۰۷" title="تعهد میش" latin="Our Promise" />
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((g, i) => {
            const Icon = ICONS[g.icon as keyof typeof ICONS];
            return (
              <Reveal key={g.title} delay={i * 0.08}>
                <div
                  className={`group h-full px-2 py-10 sm:px-8 lg:py-2 ${
                    i > 0 ? 'lg:hairline-s lg:border-ink/10' : ''
                  }`}
                  data-hover
                >
                  <div className="flex items-center justify-between">
                    <Icon size={26} strokeWidth={1} className="text-copper transition-transform duration-500 group-hover:-translate-y-1" />
                    <span className="latin-word text-xs text-ink/30">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-light">{g.title}</h3>
                  <p className="mt-4 text-[0.82rem] font-light leading-7 text-ink/60">{g.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
