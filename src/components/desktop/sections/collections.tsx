'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Plus } from 'lucide-react';
import { BEST_SELLERS, NEW_COLLECTION, faPrice, CATEGORY_TITLE, type Product } from '@/lib/data';
import { useUI } from '@/lib/store';
import { Reveal, LineMask, ClipReveal, EASE } from '@/components/fx/reveal';
import { SectionHead } from '@/components/fx/section';
import { motion } from 'framer-motion';

/* ---------------- Product Card (shared) ---------------- */
export function ProductCard({ product, tall = false }: { product: Product; tall?: boolean }) {
  const goProduct = useUI((s) => s.goProduct);
  const addToCart = useUI((s) => s.addToCart);
  const toggleWishlist = useUI((s) => s.toggleWishlist);
  const isWishlisted = useUI((s) => s.isWishlisted);
  const wished = isWishlisted(product.id);
  return (
    <article className="group" data-hover>
      <div
        className={`img-zoom relative bg-paper-deep shadow-[0_2px_12px_rgba(28,19,10,0.06)] ring-1 ring-ink/5 transition-[box-shadow,transform] duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_38px_70px_-26px_rgba(122,76,40,0.42)] ${
          tall ? 'aspect-[3/4] rounded-[1.5rem]' : 'aspect-[4/5] rounded-[1.5rem]'
        }`}
      >
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
            className={`absolute right-4 top-4 z-20 rounded-full px-3.5 py-1.5 text-[0.62rem] font-medium shadow-sm ${
              product.badge === 'new'
                ? 'bg-copper text-paper'
                : 'border border-cream/25 bg-ink/35 text-cream/95 backdrop-blur-md'
            }`}
          >
            {product.badge === 'new' ? 'جدید' : 'پرفروش'}
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="افزودن به علاقه‌مندی‌ها"
          className={`absolute left-4 top-4 z-20 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-paper/85 shadow-sm backdrop-blur-md transition-all duration-500 hover:bg-copper hover:text-paper active:scale-90 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 ${
            wished ? 'text-copper opacity-100' : 'text-ink/70'
          }`}
        >
          <Heart size={14} strokeWidth={1.75} className={wished ? 'fill-copper' : ''} />
        </button>
        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex translate-y-2 items-center justify-between rounded-2xl bg-paper/90 p-2 ps-4 opacity-0 shadow-[0_14px_35px_-12px_rgba(28,19,10,0.35)] backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[0.7rem] font-light text-ink/70">مشاهده جزئیات</span>
          <button
            onClick={() => addToCart()}
            className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.68rem] font-light text-cream transition-colors duration-300 hover:bg-copper active:scale-95"
            aria-label="افزودن سریع به سبد"
          >
            <Plus size={12} strokeWidth={1.75} />
            افزودن سریع
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div>
          <span className="latin-tag text-copper/80">{product.latin}</span>
          <h3 className="mt-1.5 text-[0.95rem] font-normal text-ink">{product.name}</h3>
          <p className="mt-0.5 text-[0.68rem] font-light text-ink/45">{CATEGORY_TITLE[product.category]}</p>
        </div>
        <span className="mt-1 whitespace-nowrap rounded-full bg-paper-deep px-3.5 py-1.5 text-[0.76rem] font-medium text-ink/85">
          {faPrice(product.price)}
        </span>
      </div>
    </article>
  );
}

/* ---------------- New Collection — asymmetric editorial ---------------- */
export function NewCollection() {
  const goShop = useUI((s) => s.goShop);
  const [a, b, c, d] = NEW_COLLECTION;

  return (
    <section className="relative overflow-hidden bg-paper py-24 lg:py-32" aria-label="مجموعه جدید">
      <span
        className="text-outline-ink pointer-events-none absolute -top-6 left-0 select-none text-[19vw] font-extralight leading-none opacity-60"
        aria-hidden
      >
        جدید
      </span>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-12">
        {/* sticky intro */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
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

        {/* layered composition — capped for standard card proportions */}
        <div className="lg:col-span-8">
          <div className="mx-auto grid w-full max-w-[760px] grid-cols-2 gap-x-5 lg:gap-x-8 lg:ms-auto">
            <div className="flex flex-col gap-10 lg:gap-14">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{}}>
                <ClipReveal from="right">
                  <ProductCard product={a} tall />
                </ClipReveal>
              </motion.div>
              <motion.div className="ms-6 lg:ms-12">
                <ClipReveal from="right" delay={0.1}>
                  <ProductCard product={c} />
                </ClipReveal>
              </motion.div>
            </div>
            <div className="mt-16 flex flex-col gap-10 lg:mt-24 lg:gap-14">
              <motion.div>
                <ClipReveal from="left">
                  <ProductCard product={b} />
                </ClipReveal>
              </motion.div>
              <motion.div className="me-1 lg:me-6">
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
    <section className="hairline-t hairline-b bg-paper-deep py-20 lg:py-28" aria-label="پرفروش‌ترین‌ها">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
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

      <div className="mt-12 overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-6 ps-6 lg:ps-12">
          {BEST_SELLERS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.06, ease: EASE }}
              className={`min-w-0 flex-none max-w-[340px] w-[70vw] sm:w-[40vw] lg:w-[26vw] xl:w-[21.5vw] ${
                i % 2 === 1 ? 'lg:translate-y-10' : ''
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
            <button onClick={() => goShop('all')} className="lux-btn mt-12 w-fit border border-ink/25 px-8 py-3.5 text-sm font-light active:scale-[0.97]">
              تماشای مجموعه کمپین
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
