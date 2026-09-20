'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { BEST_SELLERS, NEW_COLLECTION, faPrice, CATEGORY_TITLE, type Product } from '@/lib/data';
import { useUI } from '@/lib/store';
import { Reveal, LineMask, ClipReveal, EASE } from '@/components/fx/reveal';
import { SectionHead } from '@/components/fx/section';
import { motion } from 'framer-motion';

/* ---------------- Product Card (shared) ---------------- */
export function ProductCard({ product, tall = false }: { product: Product; tall?: boolean }) {
  const goProduct = useUI((s) => s.goProduct);
  const addToCart = useUI((s) => s.addToCart);
  return (
    <article className="group" data-hover>
      <div className={`img-zoom relative ${tall ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
        <button onClick={() => goProduct(product.id)} className="absolute inset-0 z-10" aria-label={product.name} />
        { }
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {product.badge && (
          <span
            className={`absolute right-4 top-4 z-20 px-3 py-1.5 text-[0.62rem] font-light tracking-wide ${
              product.badge === 'new'
                ? 'bg-copper text-ink'
                : 'border border-cream/30 bg-ink/40 text-cream/90 backdrop-blur-sm'
            }`}
          >
            {product.badge === 'new' ? 'جدید' : 'پرفروش'}
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-full bg-gradient-to-t from-ink/95 to-ink/60 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="pointer-events-auto flex items-center justify-between">
            <span className="text-xs font-light text-sand/85">مشاهده جزئیات</span>
            <button
              onClick={() => addToCart()}
              className="flex items-center gap-1.5 border border-cream/25 px-3 py-1.5 text-[0.68rem] font-light text-cream/90 transition-colors hover:border-copper hover:text-copper"
              aria-label="افزودن سریع به سبد"
            >
              <Plus size={12} strokeWidth={1.5} />
              افزودن سریع
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <span className="latin-tag text-copper/80">{product.latin}</span>
          <h3 className="mt-1.5 text-base font-light text-ink">{product.name}</h3>
          <p className="mt-1 text-[0.7rem] font-light text-ink/50">{CATEGORY_TITLE[product.category]}</p>
        </div>
        <span className="whitespace-nowrap text-sm font-light text-ink/80">{faPrice(product.price)}</span>
      </div>
    </article>
  );
}

/* ---------------- New Collection — asymmetric editorial ---------------- */
export function NewCollection() {
  const goShop = useUI((s) => s.goShop);
  const [a, b, c, d] = NEW_COLLECTION;

  return (
    <section className="relative overflow-hidden bg-paper py-28 lg:py-40" aria-label="مجموعه جدید">
      <span
        className="text-outline-ink pointer-events-none absolute -top-6 left-0 select-none text-[19vw] font-extralight leading-none opacity-60"
        aria-hidden
      >
        جدید
      </span>

      <div className="mx-auto grid max-w-[1680px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-12">
        {/* sticky intro */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHead index="۰۲" title="مجموعه جدید" latin="New Arrivals" />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-sm text-sm font-light leading-9 text-ink/65">
                پاییز ۱۴۰۴؛ روایتِ چرمی که هنوز قصه‌اش گفته نشده. چهار قطعه‌ی تازه از کارگاه میش، با دباغی گیاهی و یراق برنجی سناییده — محدود، شماره‌دار و امضاشده توسط استادکار.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <button
                onClick={() => goShop('all')}
                className="lux-btn mt-12 border border-ink/25 px-9 py-4 text-sm font-light"
              >
                همه‌ی قطعات جدید
              </button>
            </Reveal>
          </div>
        </div>

        {/* layered composition */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 gap-x-6 lg:gap-x-10">
            <div className="flex flex-col gap-16 lg:gap-24">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{}}>
                <ClipReveal from="right">
                  <ProductCard product={a} tall />
                </ClipReveal>
              </motion.div>
              <motion.div className="ms-8 lg:ms-16">
                <ClipReveal from="right" delay={0.1}>
                  <ProductCard product={c} />
                </ClipReveal>
              </motion.div>
            </div>
            <div className="mt-24 flex flex-col gap-16 lg:mt-36 lg:gap-24">
              <motion.div>
                <ClipReveal from="left">
                  <ProductCard product={b} />
                </ClipReveal>
              </motion.div>
              <motion.div className="me-2 lg:me-10">
                <ClipReveal from="left" delay={0.1}>
                  <ProductCard product={d} tall />
                </ClipReveal>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Best Sellers — horizontal rail ---------------- */
export function BestSellers() {
  const [emblaRef, embla] = useEmblaCarousel({ direction: 'rtl', align: 'start', containScroll: 'trimSnaps' });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    const raf = requestAnimationFrame(onSelect);
    embla.on('select', onSelect);
    embla.on('reInit', onSelect);
    return () => cancelAnimationFrame(raf);
  }, [embla, onSelect]);

  return (
    <section className="hairline-t hairline-b bg-paper-deep py-28 lg:py-36" aria-label="پرفروش‌ترین‌ها">
      <div className="mx-auto max-w-[1680px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead index="۰۳" title="پرفروش‌ترین‌ها" latin="Best Sellers" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => embla?.scrollPrev()}
              disabled={!canPrev}
              aria-label="قبلی"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink/75 transition-all duration-300 hover:border-copper hover:text-copper disabled:opacity-25 disabled:hover:border-ink/20 disabled:hover:text-ink/75"
            >
              <ChevronRight size={18} strokeWidth={1.25} />
            </button>
            <button
              onClick={() => embla?.scrollNext()}
              disabled={!canNext}
              aria-label="بعدی"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink/75 transition-all duration-300 hover:border-copper hover:text-copper disabled:opacity-25 disabled:hover:border-ink/20 disabled:hover:text-ink/75"
            >
              <ChevronLeft size={18} strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-6 ps-6 lg:ps-12">
          {BEST_SELLERS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.06, ease: EASE }}
              className={`min-w-0 flex-none w-[74vw] sm:w-[42vw] lg:w-[29vw] xl:w-[24.5vw] ${
                i % 2 === 1 ? 'lg:translate-y-14' : ''
              }`}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
          <div className="w-6 flex-none lg:w-12" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Campaign — split screen editorial ---------------- */
export function Campaign() {
  const goShop = useUI((s) => s.goShop);
  return (
    <section className="relative bg-ink" aria-label="کمپین">
      <div className="grid lg:grid-cols-2">
        {/* image */}
        <div className="relative order-2 h-[60vh] overflow-hidden lg:order-1 lg:h-[92vh]">
          { }
          <img
            src="/images/campaign.jpg"
            alt="کمپین پاییز — مردی با پالتوی چرم در فضایی بتنی"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-ink/45 to-transparent" />
          <span
            className="text-outline-copper absolute -bottom-10 left-8 select-none text-[9rem] font-extralight leading-none lg:text-[13rem]"
            aria-hidden
          >
            ۱۴۰۴
          </span>
        </div>

        {/* text */}
        <div className="relative order-1 flex flex-col justify-center bg-paper px-6 py-24 lg:order-2 lg:px-20 lg:py-0 xl:px-28">
          <Reveal y={16}>
            <div className="flex items-center gap-4">
              <span className="latin-tag text-copper">Campaign — Autumn</span>
              <span className="h-px w-14 bg-ink/25" />
              <span className="text-sm font-light text-ink/50">۰۴</span>
            </div>
          </Reveal>
          <h2 className="text-display-lg mt-8">
            <LineMask>عصرِ چرم</LineMask>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-sm font-light leading-9 text-ink/70">
              کمپین پاییز ۱۴۰۴ در قاب بتنی ساختمانی دهه‌پنجاه تصویر شده؛ جایی که سادگی معماری و پیچیدگی چرم به توازن می‌رسند. مدل‌ها بدون لوگو، بدون شعار — فقط فرم، بافت و نور.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <blockquote className="mt-12 border-s-2 border-copper/60 ps-6">
              <p className="text-lg font-extralight leading-10 text-ink/90">
                «چرم، پوستی است که زمان به آن زیبایی می‌بخشد.»
              </p>
              <cite className="mt-3 block text-xs font-light not-italic text-ink/50">
                — استاد رحیم میش‌کار، بنیان‌گذار
              </cite>
            </blockquote>
          </Reveal>
          <Reveal delay={0.35}>
            <button onClick={() => goShop('all')} className="lux-btn mt-14 w-fit border border-ink/25 px-9 py-4 text-sm font-light">
              تماشای مجموعه کمپین
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
