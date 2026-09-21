'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Plus } from 'lucide-react';
import { BEST_SELLERS, CATEGORIES, NEW_COLLECTION, faPrice, CATEGORY_TITLE, type Product } from '@/lib/data';
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
  const showToast = useUI((s) => s.showToast);
  const wished = isWishlisted(product.id);
  const quickAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      colorName: product.colors[0].name,
      colorHex: product.colors[0].hex,
      size: product.sizes?.[0] ?? null,
    });
    showToast(`«${product.name}» به سبد اضافه شد`);
  };
  return (
    <article className="group" data-hover>
      {/* minimal editorial card — the image is the frame, no box around it */}
      <div
        className={`img-zoom relative overflow-hidden rounded-[1.25rem] bg-paper-deep ring-1 ring-ink/[0.05] shadow-[0_22px_50px_-30px_rgba(28,19,10,0.35)] transition-all duration-700 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_34px_70px_-32px_rgba(122,76,40,0.42)] ${
          tall ? 'aspect-[3/4]' : 'aspect-[4/5]'
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
        {/* inner hairline — premium framed look */}
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15" aria-hidden />
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
            onClick={quickAdd}
            className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.68rem] font-light text-cream transition-colors duration-300 hover:bg-copper active:scale-95"
            aria-label="افزودن سریع به سبد"
          >
            <Plus size={12} strokeWidth={1.75} />
            افزودن سریع
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <span className="latin-tag text-[0.58rem] text-copper/80">{product.latin}</span>
          <h3 className="mt-1.5 text-[0.95rem] font-normal text-ink">{product.name}</h3>
          <p className="mt-0.5 text-[0.68rem] font-light text-ink/45">{CATEGORY_TITLE[product.category]}</p>
        </div>
        <span className="mt-1 whitespace-nowrap text-[0.8rem] font-medium tracking-wide text-ink/85">
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
                className="group mt-12 flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-sm font-light text-cream shadow-[0_20px_45px_-18px_rgba(28,19,10,0.5)] transition-all duration-500 hover:bg-copper active:scale-[0.97]"
              >
                همه‌ی قطعات جدید
                <ArrowLeft size={15} strokeWidth={1.75} className="transition-transform duration-500 group-hover:-translate-x-1" />
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
  const goShop = useUI((s) => s.goShop);
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
        <div className="flex flex-wrap items-center gap-6">
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
    </div>

      <div className="mt-12 overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-6 ps-6 lg:ps-12">
          {BEST_SELLERS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.05, ease: EASE }}
              className={`min-w-0 flex-none max-w-[340px] w-[70vw] sm:w-[40vw] lg:w-[26vw] xl:w-[21.5vw] ${
                i % 2 === 1 ? 'lg:translate-y-10' : ''
              }`}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
          {/* پایان ریل — لینک همه‌ی محصول‌ها (وقتی به آخر کارت‌ها برسیم) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="flex min-w-0 flex-none items-center"
          >
            <button
              onClick={() => goShop('all')}
              data-hover
              className="group flex flex-col items-center gap-5 px-8"
              aria-label="مشاهده همه‌ی محصول‌ها"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ink/20 text-ink/70 transition-all duration-500 group-hover:border-copper group-hover:bg-copper group-hover:text-paper group-hover:shadow-[0_18px_40px_-16px_rgba(164,110,62,0.55)]">
                <ArrowLeft size={20} strokeWidth={1.5} className="transition-transform duration-500 group-hover:-translate-x-1" />
              </span>
              <span className="whitespace-nowrap text-[0.88rem] font-light text-ink/70 transition-colors duration-300 group-hover:text-copper">
                همه‌ی محصول‌ها
              </span>
            </button>
          </motion.div>
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
            <button onClick={() => goShop('all')} className="mt-12 rounded-full bg-ink px-9 py-4 text-sm font-light text-cream shadow-[0_20px_45px_-18px_rgba(28,19,10,0.5)] transition-all duration-500 hover:bg-copper active:scale-[0.97]">
              تماشای مجموعه کمپین
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Shop Doorway — the unmistakable path to the shop ---------------- */
export function ShopDoorway() {
  const goShop = useUI((s) => s.goShop);
  return (
    <section className="relative overflow-hidden bg-ink py-28 lg:py-36" aria-label="ورود به فروشگاه">
      {/* giant outlined watermark */}
      <span
        className="text-outline-copper pointer-events-none absolute -top-4 right-0 select-none text-[17vw] font-extralight leading-none opacity-25"
        aria-hidden
      >
        فروشگاه
      </span>
      <span
        className="text-outline pointer-events-none absolute -bottom-8 left-4 select-none text-[9vw] font-extralight leading-none opacity-40"
        aria-hidden
      >
        ۱۴۰۴
      </span>

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-6 text-center lg:px-12">
        <Reveal y={14}>
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-copper/70" />
            <span className="latin-tag text-copper">The Shop — Step Inside</span>
            <span className="h-px w-12 bg-copper/70" />
          </div>
        </Reveal>
        <h2 className="text-display-lg mt-8 max-w-[16ch] text-cream">
          <LineMask>حالا، نوبتِ انتخابِ شماست</LineMask>
        </h2>
        <Reveal delay={0.15}>
          <p className="mt-7 max-w-xl text-sm font-light leading-9 text-sand/75">
            مجموعه‌ی کامل میش در فروشگاه منتظر شماست؛ از کیف و کفش تا جزئیاتی که استایل را تمام می‌کنند. مسیر کوتاه است — یک کلیک فاصله است.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <button
            onClick={() => goShop('all')}
            className="group mt-12 flex items-center gap-4 rounded-full bg-copper px-12 py-5 text-[0.95rem] font-medium text-paper shadow-[0_28px_70px_-20px_rgba(164,110,62,0.65)] transition-all duration-500 hover:bg-cream hover:text-ink active:scale-[0.97]"
          >
            ورود به فروشگاه
            <ArrowLeft size={16} strokeWidth={1.75} className="transition-transform duration-500 group-hover:-translate-x-1.5" />
          </button>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <span className="text-[0.7rem] font-light text-cream/45">میان‌بر به دنیای میش:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => goShop(cat.key)}
                className="rounded-full border border-cream/20 px-5 py-2.5 text-[0.75rem] font-light text-cream/85 transition-all duration-300 hover:border-copper hover:text-copper active:scale-[0.96]"
              >
                {cat.title}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
