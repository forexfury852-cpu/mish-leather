'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { getProduct, relatedProducts, faPrice } from '@/lib/data';
import { useUI } from '@/lib/store';
import { Reveal, LineMask, ClipReveal, EASE } from '@/components/fx/reveal';
import { ProductCard } from './sections/collections';
import { Footer } from './footer';
import { ParallaxImage } from '@/components/fx/parallax';

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-ink/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-start text-sm font-light text-ink/90 transition-colors hover:text-copper"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`text-copper transition-transform duration-500 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-7 text-[0.82rem] font-light leading-8 text-ink/65">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductPage() {
  const productId = useUI((s) => s.productId);
  const { goShop, goHome, addToCart, setCartOpen, toggleWishlist, isWishlisted, showToast } = useUI();
  const product = getProduct(productId);
  const related = relatedProducts(product.id, product.category);
  const [imgIndex, setImgIndex] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState<string | null>(product.sizes?.[1] ?? null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      colorName: product.colors[color].name,
      colorHex: product.colors[color].hex,
      size,
    }, qty);
    showToast(`«${product.name}» به سبد اضافه شد`);
    setAdded(true);
    setTimeout(() => setCartOpen(true), 700);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pt-32 lg:px-12" aria-label="محصول">
        {/* breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-light text-ink/50" aria-label="مسیر">
          <button onClick={goHome} className="transition-colors hover:text-copper">
            خانه
          </button>
          <ChevronLeft size={12} strokeWidth={1.5} />
          <button onClick={() => goShop(product.category)} className="transition-colors hover:text-copper">
            فروشگاه
          </button>
          <ChevronLeft size={12} strokeWidth={1.5} />
          <span className="text-ink/85">{product.name}</span>
        </nav>

        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          {/* gallery */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse gap-5 md:flex-row">
              {/* vertical thumbs */}
              <div className="flex flex-row gap-4 md:flex-col">
                {product.gallery.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setImgIndex(i)}
                    aria-label={`تصویر ${i + 1}`}
                    className={`relative aspect-[3/4] w-20 flex-none overflow-hidden rounded-xl border transition-all duration-500 md:w-24 ${
                      imgIndex === i ? 'border-copper opacity-100' : 'border-transparent opacity-50 hover:opacity-90'
                    }`}
                  >
                    { }
                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>

              {/* main image */}
              <div className="relative flex-1 overflow-hidden rounded-[1.5rem] bg-espresso shadow-[0_30px_70px_-30px_rgba(28,19,10,0.45)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imgIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="img-zoom aspect-[4/5] md:aspect-auto md:h-[78vh]"
                  >
                    { }
                    <img
                      src={product.gallery[imgIndex]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <span className="absolute bottom-5 right-5 rounded-full bg-ink/60 px-3.5 py-1.5 text-[0.65rem] font-light text-cream/85 backdrop-blur">
                  {String(imgIndex + 1).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])} /{' '}
                  {String(product.gallery.length).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])}
                </span>
              </div>
            </div>
          </div>

          {/* info panel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal y={16}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="latin-tag text-copper">{product.latin}</span>
                    <span className="h-px w-10 bg-ink/25" />
                  </div>
                  {product.badge === 'new' && (
                    <span className="rounded-full bg-copper px-3.5 py-1.5 text-[0.62rem] font-medium text-paper">جدید</span>
                  )}
                  {product.badge === 'bestseller' && (
                    <span className="rounded-full border border-ink/25 px-3.5 py-1.5 text-[0.62rem] text-ink/80">پرفروش</span>
                  )}
                </div>
              </Reveal>

              <h1 className="text-display-md mt-5">
                <LineMask>{product.name}</LineMask>
              </h1>

              <Reveal delay={0.1} y={12}>
                <div className="mt-4 flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="fill-copper text-copper" strokeWidth={1} />
                  ))}
                  <span className="ms-2 text-xs font-light text-ink/55">
                    {product.rating} — {String(product.reviews).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])} دیدگاه
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.14} y={12}>
                <div className="mt-7 flex items-baseline gap-4">
                  <span className="text-2xl font-light text-ink">{faPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-sm font-light text-ink/40 line-through">{faPrice(product.oldPrice)}</span>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.18} y={12}>
                <p className="mt-7 border-t border-ink/10 pt-7 text-sm font-light leading-9 text-ink/70">
                  {product.description}
                </p>
              </Reveal>

              {/* colors */}
              <Reveal delay={0.2} y={12}>
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-light text-ink/55">رنگ: {product.colors[color].name}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    {product.colors.map((c, i) => (
                      <button
                        key={c.hex + i}
                        onClick={() => setColor(i)}
                        aria-label={c.name}
                        className={`relative h-9 w-9 rounded-full transition-all duration-300 ${
                          color === i ? 'ring-1 ring-copper ring-offset-4 ring-offset-paper' : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* sizes */}
              {product.sizes && (
                <Reveal delay={0.22} y={12}>
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-light text-ink/55">
                        {product.category === 'shoes' ? 'سایز' : product.category === 'belts' ? 'طول (سانتی‌متر)' : 'اندازه'}
                      </span>
                      <button className="lux-link text-[0.7rem] font-light text-ink/50">راهنمای سایز</button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={`min-w-[3.2rem] rounded-full border px-4 py-2.5 text-sm font-light transition-all duration-300 ${
                            size === s
                              ? 'border-copper bg-copper text-paper'
                              : 'border-ink/20 text-ink/80 hover:border-ink/50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {product.dimensions && (
                <Reveal delay={0.22} y={12}>
                  <div className="mt-8">
                    <span className="text-xs font-light text-ink/55">ابعاد</span>
                    <div className="mt-3 inline-block rounded-full border border-ink/20 px-5 py-2.5 text-sm font-light text-ink/85">
                      {product.dimensions}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* qty + cta */}
              <Reveal delay={0.26} y={12}>
                <div className="mt-10 flex items-stretch gap-4">
                  <div className="flex items-center rounded-full border border-ink/20">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="rounded-full px-4 py-2 text-ink/70 transition-colors hover:text-copper"
                      aria-label="کاهش"
                    >
                      <Minus size={14} strokeWidth={1.5} />
                    </button>
                    <span className="w-8 text-center text-sm font-light">
                      {String(qty).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="rounded-full px-4 py-2 text-ink/70 transition-colors hover:text-copper"
                      aria-label="افزایش"
                    >
                      <Plus size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                  <button
                    onClick={handleAdd}
                    className="lux-btn lux-btn-ink flex-1 border border-ink bg-ink px-6 py-4 text-sm font-medium text-cream active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <ShoppingBag size={16} strokeWidth={1.5} />
                      {added ? 'به سبد اضافه شد ✓' : 'افزودن به سبد خرید'}
                    </span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="افزودن به علاقه‌مندی"
                    className="flex w-14 items-center justify-center rounded-full border border-ink/25 text-ink/85 transition-all hover:border-copper hover:text-copper active:scale-90"
                  >
                    <Heart
                      size={17}
                      strokeWidth={1.5}
                      className={isWishlisted(product.id) ? 'fill-copper text-copper' : ''}
                    />
                  </button>
                </div>
              </Reveal>

              {/* micro trust row */}
              <Reveal delay={0.3} y={12}>
                <div className="mt-8 grid grid-cols-3 gap-4 border-y border-ink/10 py-6">
                  {[
                    { icon: Truck, label: 'ارسال بیمه‌شده' },
                    { icon: ShieldCheck, label: 'ضمانت دوخت' },
                    { icon: RotateCcw, label: 'بازگشت ۷ روزه' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-2 text-center">
                      <Icon size={17} strokeWidth={1.25} className="text-copper" />
                      <span className="text-[0.68rem] font-light text-ink/60">{label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* accordions */}
              <Reveal delay={0.34} y={12}>
                <div className="mt-6">
                  <Accordion title="جزئیات و جنس" defaultOpen>
                    <ul className="space-y-2.5">
                      {product.material.map((m) => (
                        <li key={m} className="flex items-center gap-3">
                          <span className="text-[0.55rem] text-copper">✦</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </Accordion>
                  <Accordion title="صنعتگری">
                    <p>{product.story}</p>
                  </Accordion>
                  <Accordion title="ارسال و مرجوعی">
                    <p>
                      سفارش‌های تهران همان روز و سایر شهرها ظرف ۲ تا ۴ روز کاری با پیک بیمه‌شده ارسال می‌شوند. بسته‌بندی
                      چوبی اختصاصی میش بدون هزینه‌ی اضافه. تا هفت روز، اگر قطعه در دستان شما همان احساس را نداد،
                      بازمی‌گردانیم.
                    </p>
                  </Accordion>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* craft strip */}
      <section className="mt-28" aria-label="از کارگاه">
        <div className="grid lg:grid-cols-2">
          <ParallaxImage
            src="/images/gallery-1.jpg"
            alt="جزئیات دوخت دست"
            className="h-[52vh] lg:h-[70vh]"
            speed={0.1}
          />
          <div className="flex flex-col justify-center bg-espresso px-6 py-20 lg:px-20">
            <Reveal y={16}>
              <span className="latin-tag text-copper">From the Atelier</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-display-md mt-6 leading-snug text-cream">
                چهارده ساعت،
                <br />
                دو سوزن، یک امضا
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-md text-sm font-light leading-9 text-sand/75">
                این قطعه‌ای که می‌بینید در دستان استاد حسن، از برش تا پرداخت نهایی، چهارده ساعت کار دست دارد. دوخت
                زین‌دوزی با نخ موم‌زده، لبه‌های سنباده‌خورده و یراق برنجی سناییده — هر جزء، انتخابی است که سال‌ها با شما
                خواهد ماند.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-12 flex items-center gap-14">
                <div>
                  <div className="text-4xl font-extralight text-copper">۱۴۰</div>
                  <div className="mt-2 text-xs font-light text-sand/60">مرحله‌ی ساخت</div>
                </div>
                <span className="h-14 w-px bg-cream/12" />
                <div>
                  <div className="text-4xl font-extralight text-copper">۱۰۰٪</div>
                  <div className="mt-2 text-xs font-light text-sand/60">چرم طبیعی</div>
                </div>
                <span className="h-14 w-px bg-cream/12" />
                <div>
                  <div className="text-4xl font-extralight text-copper">∞</div>
                  <div className="mt-2 text-xs font-light text-sand/60">ضمانت دوخت</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="bg-paper py-20 lg:py-28" aria-label="قطعات مرتبط">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <Reveal y={16}>
            <div className="flex items-center gap-4">
              <span className="latin-tag text-copper">Related Pieces</span>
              <span className="h-px w-14 bg-ink/25" />
              <span className="text-sm font-light text-ink/55">از همان خانواده</span>
            </div>
          </Reveal>
          <h2 className="text-display-lg mt-5">
            <LineMask>قطعات هم‌خانواده</LineMask>
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
            {related.map((p, i) => (
              <ClipReveal key={p.id} from="bottom" delay={i * 0.06}>
                <ProductCard product={p} />
              </ClipReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
