'use client';

import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, Heart, Plus, Minus, ShoppingBag, Star } from 'lucide-react';
import { getProduct, relatedProducts, faPrice } from '@/lib/data';
import { useUI } from '@/lib/store';
import { EASE } from '@/components/fx/reveal';
import { MobileProductCard } from './chrome';

export function MobileProduct() {
  const productId = useUI((s) => s.productId);
  const { goHome, goShop, addToCart, toggleWishlist, isWishlisted } = useUI();
  const product = getProduct(productId);
  const related = relatedProducts(product.id, product.category, 4);
  const [emblaRef, embla] = useEmblaCarousel({ direction: 'rtl', loop: true });
  const [slide, setSlide] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState<string | null>(product.sizes?.[1] ?? null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAcc, setOpenAcc] = useState<string | null>('details');

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSlide(embla.selectedScrollSnap());
    embla.on('select', onSelect);
    return () => {
      embla.off('select', onSelect);
    };
  }, [embla]);

  const fa = (n: number | string) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
  const wished = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const acc = (key: string, title: string, body: React.ReactNode) => (
    <div className="border-t border-ink/10">
      <button
        onClick={() => setOpenAcc(openAcc === key ? null : key)}
        className="flex min-h-[56px] w-full items-center justify-between py-1 text-start text-[0.9rem] font-light text-ink/90"
        aria-expanded={openAcc === key}
      >
        {title}
        <ChevronDown size={16} strokeWidth={1.5} className={`text-copper transition-transform duration-500 ${openAcc === key ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {openAcc === key && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[0.78rem] font-light leading-7 text-ink/60">{body}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="relative min-h-full bg-paper">
      {/* ---------- gallery carousel ---------- */}
      <section className="relative h-[56cqh] min-h-[380px]">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {product.gallery.map((src, i) => (
              <div key={src + i} className="relative h-[56cqh] min-h-[380px] flex-none basis-full">
                { }
                <img src={src} alt={`${product.name} — تصویر ${fa(i + 1)}`} className="h-full w-full object-cover" draggable={false} />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/45" />

        {/* top bar */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="absolute inset-x-0 top-12 z-20 flex items-center justify-between px-5"
        >
          <button
            onClick={goHome}
            aria-label="بازگشت"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 bg-ink/40 text-cream backdrop-blur active:scale-95"
          >
            <ChevronLeft size={19} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="علاقه‌مندی"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 bg-ink/40 text-cream backdrop-blur active:scale-95"
          >
            <Heart size={18} strokeWidth={1.5} className={wished ? 'fill-copper text-copper' : ''} />
          </button>
        </motion.div>

        {/* slide counter */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-4 right-5 z-20 rounded-full bg-ink/55 px-3.5 py-1.5 text-[0.65rem] font-light text-cream/90 backdrop-blur"
        >
          {fa(slide + 1)} / {fa(product.gallery.length)}
        </motion.span>
      </section>

      {/* ---------- content sheet ---------- */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 -mt-7 rounded-t-[1.75rem] border-t border-ink/10 bg-paper px-6 pb-40 pt-8"
      >
        <div className="mx-auto mb-7 h-1 w-12 rounded-full bg-ink/15" aria-hidden />

        <header className="flex items-start justify-between gap-4">
          <div>
            <span className="latin-tag text-copper">{product.latin}</span>
            <h1 className="mt-2 text-[1.7rem] font-extralight leading-snug">{product.name}</h1>
            <div className="mt-2.5 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} className="fill-copper text-copper" strokeWidth={1} />
              ))}
              <span className="ms-1 text-[0.65rem] font-light text-ink/50">
                {product.rating} — {fa(product.reviews)} دیدگاه
              </span>
            </div>
          </div>
          <div className="text-end">
            <div className="text-[1.05rem] font-light text-ink">{faPrice(product.price)}</div>
            {product.oldPrice && (
              <div className="mt-1 text-[0.7rem] font-light text-ink/40 line-through">{faPrice(product.oldPrice)}</div>
            )}
          </div>
        </header>

        <p className="mt-6 text-[0.82rem] font-light leading-8 text-ink/65">{product.description}</p>

        {/* colors */}
        <div className="mt-8">
          <span className="text-[0.72rem] font-light text-ink/50">رنگ: {product.colors[color].name}</span>
          <div className="mt-3.5 flex gap-4">
            {product.colors.map((c, i) => (
              <button
                key={c.hex + i}
                onClick={() => setColor(i)}
                aria-label={c.name}
                className={`h-11 w-11 rounded-full transition-all duration-300 ${
                  color === i ? 'ring-1 ring-copper ring-offset-4 ring-offset-paper' : 'scale-95 opacity-80'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* sizes */}
        {product.sizes && (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-[0.72rem] font-light text-ink/50">
                {product.category === 'shoes' ? 'سایز' : product.category === 'belts' ? 'طول (سانتی‌متر)' : 'اندازه'}
              </span>
              <button className="lux-link text-[0.68rem] font-light text-ink/50">راهنمای سایز</button>
            </div>
            <div className="mt-3.5 flex flex-wrap gap-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-h-[48px] min-w-[52px] rounded-full border px-5 text-[0.85rem] font-light transition-all duration-300 active:scale-95 ${
                    size === s ? 'border-copper bg-copper text-paper' : 'border-ink/15 text-ink/75'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* dimensions */}
        {product.dimensions && (
          <div className="mt-8">
            <span className="text-[0.72rem] font-light text-ink/50">ابعاد</span>
            <div className="mt-3 inline-block rounded-full border border-ink/15 px-5 py-3 text-[0.82rem] font-light text-ink/80">
              {product.dimensions}
            </div>
          </div>
        )}

        {/* quantity */}
        <div className="mt-8 flex items-center justify-between border-y border-ink/10 py-4">
          <span className="text-[0.82rem] font-light text-ink/80">تعداد</span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              aria-label="کاهش"
              className="flex h-11 w-11 items-center justify-center text-ink/70 active:text-copper"
            >
              <Minus size={16} strokeWidth={1.5} />
            </button>
            <span className="w-6 text-center text-[0.95rem] font-light">{fa(qty)}</span>
            <button
              onClick={() => setQty(qty + 1)}
              aria-label="افزایش"
              className="flex h-11 w-11 items-center justify-center text-ink/70 active:text-copper"
            >
              <Plus size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* accordions */}
        <div className="mt-2">
          {acc(
            'details',
            'جزئیات و جنس',
            <ul className="space-y-2">
              {product.material.map((m) => (
                <li key={m} className="flex items-center gap-2.5">
                  <span className="text-[0.5rem] text-copper">✦</span>
                  {m}
                </li>
              ))}
            </ul>
          )}
          {acc('craft', 'صنعتگری', <p>{product.story}</p>)}
          {acc(
            'shipping',
            'ارسال و مرجوعی',
            <p>تهران همان روز، سایر شهرها ۲ تا ۴ روز کاری با پیک بیمه‌شده. بسته‌بندی چوبی اختصاصی. هفت روز مهلت بازگشت.</p>
          )}
        </div>

        {/* related */}
        <div className="mt-14">
          <div className="flex items-end justify-between">
            <span className="latin-tag text-copper">Related</span>
            <button onClick={() => goShop(product.category)} className="flex items-center gap-1 text-[0.72rem] font-light text-copper">
              همه
              <ChevronLeft size={13} strokeWidth={1.5} />
            </button>
          </div>
          <h2 className="mt-2 text-[1.35rem] font-extralight">قطعات هم‌خانواده</h2>
          <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {related.map((p, i) => (
              <div key={p.id} className="w-[44vw] flex-none snap-start">
                <MobileProductCard product={p} compact index={i} />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ---------- sticky purchase CTA ---------- */}
      <motion.div
        initial={{ y: 90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        className="fixed inset-x-0 bottom-[64px] z-40 border-t border-ink/10 bg-paper/95 px-5 py-4 backdrop-blur-lg"
      >
        <div className="flex items-center gap-4">
          <div className="min-w-[92px]">
            <div className="text-[0.58rem] font-light text-ink/50">قیمت</div>
            <div className="text-[0.92rem] font-light text-ink">{faPrice(product.price)}</div>
          </div>
          <button
            onClick={handleAdd}
            className="flex flex-1 items-center justify-center gap-3 rounded-full bg-copper py-4 text-[0.88rem] font-medium text-paper shadow-[0_12px_30px_-10px_rgba(181,114,47,0.65)] transition-all active:scale-[0.98] active:brightness-110"
          >
            <ShoppingBag size={16} strokeWidth={1.75} />
            {added ? 'به سبد اضافه شد ✓' : 'افزودن به سبد خرید'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
