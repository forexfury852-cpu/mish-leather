'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, PRODUCTS, type CategoryKey } from '@/lib/data';
import { useUI } from '@/lib/store';
import { EASE } from '@/components/fx/reveal';
import { MobileProductCard } from './chrome';

type Sort = 'new' | 'expensive' | 'cheap';
const SORTS: { key: Sort; label: string }[] = [
  { key: 'new', label: 'جدیدترین' },
  { key: 'expensive', label: 'گران‌ترین' },
  { key: 'cheap', label: 'ارزان‌ترین' },
];

const PRICE_BANDS = [
  { key: 'all', label: 'همه' },
  { key: 'u4', label: 'تا ۴ میلیون' },
  { key: '4to12', label: '۴ تا ۱۲ میلیون' },
  { key: 'o12', label: 'بالای ۱۲ میلیون' },
];

/* ---------- Bottom sheet (custom, frame-safe) ---------- */
function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.45, ease: EASE }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose();
            }}
            className="fixed inset-x-0 bottom-0 z-[61] max-h-[78%] overflow-y-auto rounded-t-[1.75rem] border-t border-cream/15 bg-ink pb-10 no-scrollbar"
            role="dialog"
            aria-label={title}
          >
            <div className="sticky top-0 z-10 bg-ink px-6 pt-4">
              <div className="mx-auto h-1 w-12 rounded-full bg-cream/25" />
              <div className="mt-5 flex items-center justify-between pb-3">
                <h3 className="text-lg font-extralight">{title}</h3>
                <button onClick={onClose} aria-label="بستن" className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/80">
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
            <div className="px-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SheetSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-cream/10 py-6 first:border-t-0">
      <h4 className="mb-4 text-[0.72rem] font-light text-sand/55">{label}</h4>
      {children}
    </div>
  );
}

export function MobileShop() {
  const { shopCategory, goShop } = useUI();
  const [sort, setSort] = useState<Sort>('new');
  const [band, setBand] = useState('all');
  const [sheet, setSheet] = useState(false);
  const [pendingCats, setPendingCats] = useState<CategoryKey[]>([]);

  const items = useMemo(() => {
    let list = [...PRODUCTS];
    if (shopCategory !== 'all') list = list.filter((p) => p.category === shopCategory);
    if (band === 'u4') list = list.filter((p) => p.price < 4_000_000);
    if (band === '4to12') list = list.filter((p) => p.price >= 4_000_000 && p.price <= 12_000_000);
    if (band === 'o12') list = list.filter((p) => p.price > 12_000_000);
    if (sort === 'expensive') list.sort((a, b) => b.price - a.price);
    if (sort === 'cheap') list.sort((a, b) => a.price - b.price);
    if (sort === 'new') list.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
    return list;
  }, [shopCategory, sort, band]);

  const fa = (n: number | string) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

  return (
    <div className="relative min-h-full bg-ink pb-28">
      {/* compact hero */}
      <section className="relative flex h-[36cqh] min-h-[250px] items-end overflow-hidden">
        { }
        <img src="/images/cat-bag.jpg" alt="فروشگاه چرم میش" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />
        <div className="relative w-full px-6 pb-7">
          <span className="latin-tag text-copper">Shop — Catalogue</span>
          <h1 className="mt-2 text-[2rem] font-extralight">فروشگاه</h1>
          <p className="mt-1.5 text-[0.72rem] font-light text-sand/65">
            {fa(items.length)} قطعه — چرم طبیعی، دست‌دوز
          </p>
        </div>
      </section>

      {/* category chips */}
      <div className="no-scrollbar sticky top-0 z-40 flex gap-3 overflow-x-auto border-b border-cream/10 bg-ink/92 px-6 py-4 backdrop-blur">
        {[{ key: 'all' as const, title: 'همه' }, ...CATEGORIES.map((c) => ({ key: c.key, title: c.title }))].map((c) => (
          <button
            key={c.key}
            onClick={() => goShop(c.key as 'all' | CategoryKey)}
            className={`min-h-[38px] whitespace-nowrap border px-5 py-2 text-[0.75rem] font-light transition-all duration-300 ${
              shopCategory === c.key
                ? 'border-copper bg-copper text-ink'
                : 'border-cream/18 text-cream/75'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* product list — immersive single column */}
      <section className="flex flex-col gap-12 px-6 pt-10">
        {items.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: Math.min(i * 0.05, 0.3), ease: EASE }}
          >
            <MobileProductCard product={p} />
          </motion.div>
        ))}
      </section>

      {/* floating filter button */}
      <button
        onClick={() => {
          setPendingCats([]);
          setSheet(true);
        }}
        className="fixed bottom-[92px] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-cream/20 bg-espresso/95 px-7 py-3.5 text-[0.8rem] font-light text-cream shadow-2xl backdrop-blur active:scale-95"
        aria-label="فیلترها"
      >
        <SlidersHorizontal size={15} strokeWidth={1.5} className="text-copper" />
        فیلتر و ترتیب
      </button>

      {/* bottom sheet */}
      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="فیلتر و ترتیب">
        <SheetSection label="ترتیب">
          <div className="flex flex-wrap gap-3">
            {SORTS.map((s) => (
              <button
                key={s.key}
                onClick={() => setSort(s.key)}
                className={`min-h-[42px] border px-6 py-2 text-[0.78rem] font-light ${
                  sort === s.key ? 'border-copper bg-copper text-ink' : 'border-cream/18 text-cream/80'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </SheetSection>

        <SheetSection label="دسته‌بندی">
          <div className="flex flex-col gap-1">
            {CATEGORIES.map((c) => {
              const active = pendingCats.includes(c.key);
              return (
                <button
                  key={c.key}
                  onClick={() =>
                    setPendingCats((prev) => (active ? prev.filter((k) => k !== c.key) : [...prev, c.key]))
                  }
                  className="flex min-h-[52px] items-center justify-between text-start text-[0.85rem] font-light text-cream/85"
                >
                  {c.title}
                  <span
                    className={`flex h-6 w-6 items-center justify-center border ${
                      active ? 'border-copper bg-copper text-ink' : 'border-cream/25'
                    }`}
                  >
                    {active && <Check size={13} strokeWidth={2} />}
                  </span>
                </button>
              );
            })}
          </div>
        </SheetSection>

        <SheetSection label="محدوده قیمت">
          <div className="flex flex-wrap gap-3">
            {PRICE_BANDS.map((b) => (
              <button
                key={b.key}
                onClick={() => setBand(b.key)}
                className={`min-h-[42px] border px-6 py-2 text-[0.78rem] font-light ${
                  band === b.key ? 'border-copper bg-copper text-ink' : 'border-cream/18 text-cream/80'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </SheetSection>

        <div className="mt-4 flex gap-3 pb-4">
          <button
            onClick={() => {
              setSort('new');
              setBand('all');
              setPendingCats([]);
            }}
            className="min-h-[52px] flex-1 border border-cream/20 py-3 text-[0.82rem] font-light text-cream/80"
          >
            بازنشانی
          </button>
          <button
            onClick={() => {
              if (pendingCats.length > 0) goShop(pendingCats[0]);
              setSheet(false);
            }}
            className="min-h-[52px] flex-[2] bg-copper py-3 text-[0.85rem] font-medium text-ink active:brightness-110"
          >
            اعمال فیلتر
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
