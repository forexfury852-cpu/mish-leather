'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, CATEGORY_TITLE, PRODUCTS, faPrice, type CategoryKey } from '@/lib/data';
import { useUI } from '@/lib/store';
import { Reveal, LineMask, EASE } from '@/components/fx/reveal';
import { ProductCard } from './sections/collections';
import { Footer } from './footer';

type Sort = 'new' | 'best' | 'expensive' | 'cheap';
const SORTS: { key: Sort; label: string }[] = [
  { key: 'new', label: 'جدیدترین' },
  { key: 'best', label: 'پرفروش‌ترین' },
  { key: 'expensive', label: 'گران‌ترین' },
  { key: 'cheap', label: 'ارزان‌ترین' },
];

export function Shop() {
  const { shopCategory, goShop, goHome } = useUI();
  const [sort, setSort] = useState<Sort>('new');
  const [sortOpen, setSortOpen] = useState(false);

  const items = useMemo(() => {
    let list = [...PRODUCTS];
    if (shopCategory !== 'all') list = list.filter((p) => p.category === shopCategory);
    switch (sort) {
      case 'expensive':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'cheap':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'best':
        list.sort((a, b) => (b.badge === 'bestseller' ? 1 : 0) - (a.badge === 'bestseller' ? 1 : 0));
        break;
      default:
        list.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
    }
    return list;
  }, [shopCategory, sort]);

  const count = to_fa(items.length);

  return (
    <>
      {/* editorial hero */}
      <section className="relative flex h-[56vh] min-h-[420px] items-end overflow-hidden" aria-label="فروشگاه">
        { }
        <img
          src="/images/cat-bag.jpg"
          alt="کیف چرم در فضای معماری"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/45" />
        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-16 lg:px-12">
          <nav className="mb-8 flex items-center gap-2 text-xs font-light text-sand/60" aria-label="مسیر">
            <button onClick={goHome} className="transition-colors hover:text-cream">
              خانه
            </button>
            <ChevronLeft size={12} strokeWidth={1.5} />
            <span className="text-cream/90">فروشگاه</span>
          </nav>
          <h1 className="text-display-xl text-cream">
            <LineMask>فروشگاه</LineMask>
          </h1>
          <Reveal delay={0.2} y={16}>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-light text-sand/70">
              <span>{count} قطعه</span>
              <span className="text-copper">✦</span>
              <span>چرم طبیعی — دست‌دوز در تهران</span>
              <span className="text-copper">✦</span>
              <span>ارسال بیمه‌شده سراسر کشور</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* filter bar */}
      <div className="sticky top-20 z-40 border-b border-ink/10 bg-paper/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 lg:px-12">
          <div className="no-scrollbar flex items-center gap-8 overflow-x-auto py-5">
            {[{ key: 'all' as const, title: 'همه' }, ...CATEGORIES.map((c) => ({ key: c.key, title: c.title }))].map(
              (cat) => (
                <button
                  key={cat.key}
                  onClick={() => goShop(cat.key as 'all' | CategoryKey)}
                  className={`relative whitespace-nowrap pb-1 text-[0.82rem] font-light transition-colors duration-300 ${
                    shopCategory === cat.key ? 'text-copper' : 'text-ink/65 hover:text-ink'
                  }`}
                >
                  {cat.title}
                  {shopCategory === cat.key && (
                    <motion.span
                      layoutId="shop-tab"
                      className="absolute inset-x-0 -bottom-[1px] h-px bg-copper"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                </button>
              )
            )}
          </div>

          {/* sort dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-3 py-5 text-[0.78rem] font-light text-ink/70 transition-colors hover:text-ink"
              aria-expanded={sortOpen}
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} className="text-copper" />
              {SORTS.find((s) => s.key === sort)?.label}
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute end-0 top-full z-50 w-48 rounded-2xl border border-ink/10 bg-paper py-2 shadow-[0_24px_50px_-16px_rgba(28,19,10,0.25)]"
                >
                  {SORTS.map((s) => (
                    <li key={s.key}>
                      <button
                        onClick={() => {
                          setSort(s.key);
                          setSortOpen(false);
                        }}
                        className={`w-full rounded-xl px-5 py-2.5 text-start text-[0.78rem] font-light transition-colors ${
                          sort === s.key ? 'bg-copper/[0.08] text-copper' : 'text-ink/70 hover:bg-ink/[0.04] hover:text-ink'
                        }`}
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* grid */}
      <section className="bg-paper py-16 lg:py-24" aria-label="محصولات">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={shopCategory + sort}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-7"
            >
              {items.map((p, i) => (
                <div key={p.id} className={i % 4 === 1 ? 'xl:translate-y-8' : i % 4 === 3 ? 'xl:translate-y-16' : ''}>
                  <ProductCard product={p} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* bespoke banner */}
      <section className="border-t border-cream/10 bg-espresso py-24" aria-label="سفارش اختصاصی">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-10 px-6 lg:px-12">
          <div>
            <span className="latin-tag text-copper">Bespoke</span>
            <h2 className="text-display-md mt-4">
              قطعه‌ای که فقط
              <span className="text-copper"> شما </span>
              دارید
            </h2>
            <p className="mt-4 max-w-md text-sm font-light leading-8 text-sand/70">
              سفارش اختصاصی میش: اندازه، رنگ و حروف‌نگاری اختصاصی شما روی چرم. از گفت‌وگو تا تحویل، چهل روز.
            </p>
          </div>
          <a
            href="#"
            className="lux-btn border border-cream/25 px-8 py-3.5 text-sm font-light active:scale-[0.97]"
            onClick={(e) => e.preventDefault()}
          >
            درخواست مشاوره
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

const to_fa = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
void faPrice;
void CATEGORY_TITLE;
