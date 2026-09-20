'use client';

import { motion } from 'framer-motion';
import { BatteryMedium, Home, Search, ShoppingBag, Signal, Store, Heart, Wifi } from 'lucide-react';
import { CATEGORY_TITLE, faPrice, type Product } from '@/lib/data';
import { useUI, type View } from '@/lib/store';
import { EASE } from '@/components/fx/reveal';

/* Simulated iOS-style status bar inside the phone frame */
export function StatusBar({ dark = true }: { dark?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-50 flex items-center justify-between px-7 pt-3.5 text-[0.68rem] font-medium ${
        dark ? 'text-cream' : 'text-ink'
      }`}
      aria-hidden
    >
      <span dir="ltr">9:41</span>
      <span className="absolute left-1/2 top-2 h-[26px] w-[110px] -translate-x-1/2 rounded-full bg-black" />
      <span className="flex items-center gap-1.5">
        <Signal size={12} strokeWidth={2} />
        <Wifi size={12} strokeWidth={2} />
        <BatteryMedium size={14} strokeWidth={1.5} />
      </span>
    </div>
  );
}

const NAV_ITEMS: { view: View; label: string; icon: typeof Home }[] = [
  { view: 'home', label: 'خانه', icon: Home },
  { view: 'shop', label: 'فروشگاه', icon: Store },
  { view: 'product', label: 'جستجو', icon: Search },
];

export function BottomNav() {
  const { view, goHome, goShop, goProduct, cartCount } = useUI();
  const badge = String(cartCount).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

  const item = (v: View) => view === v;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg"
      aria-label="ناوبری موبایل"
    >
      <div className="grid grid-cols-5 items-stretch">
        {NAV_ITEMS.map(({ view: v, label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => (v === 'home' ? goHome() : v === 'shop' ? goShop('all') : goProduct('arta-messenger'))}
            className="relative flex min-h-[58px] flex-col items-center justify-center gap-1"
            aria-label={label}
          >
            <Icon
              size={20}
              strokeWidth={1.4}
              className={item(v) ? 'text-copper' : 'text-ink/55'}
            />
            <span className={`text-[0.58rem] font-light ${item(v) ? 'text-copper' : 'text-ink/45'}`}>{label}</span>
            {item(v) && (
              <motion.span layoutId="mnav-dot" className="absolute -top-px h-[2px] w-9 bg-copper" transition={{ duration: 0.4, ease: EASE }} />
            )}
          </button>
        ))}
        {/* favorites */}
        <button
          onClick={() => goProduct('mehr-bifold')}
          className={`flex min-h-[58px] flex-col items-center justify-center gap-1 ${false ? 'text-copper' : ''}`}
          aria-label="علاقه‌مندی‌ها"
        >
          <Heart size={20} strokeWidth={1.4} className="text-ink/55" />
          <span className="text-[0.58rem] font-light text-ink/45">علاقه‌مندی</span>
        </button>
        {/* cart */}
        <button
          onClick={() => goProduct('kian-briefcase')}
          className="relative flex min-h-[58px] flex-col items-center justify-center gap-1"
          aria-label="سبد خرید"
        >
          <span className="relative">
            <ShoppingBag size={20} strokeWidth={1.4} className="text-ink/55" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-copper text-[0.5rem] font-semibold text-paper">
                {badge}
              </span>
            )}
          </span>
          <span className="text-[0.58rem] font-light text-ink/45">سبد</span>
        </button>
      </div>
    </nav>
  );
}

/* Mobile product card — clean editorial grid card */
export function MobileProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { goProduct, addToCart } = useUI();
  return (
    <article className="group">
      <div
        onClick={() => goProduct(product.id)}
        className="img-zoom relative aspect-[4/5] overflow-hidden"
        data-hover
      >
        { }
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
        {product.badge && (
          <span
            className={`absolute right-3 top-3 px-2.5 py-1 text-[0.58rem] font-light ${
              product.badge === 'new' ? 'bg-copper text-paper' : 'border border-cream/30 bg-ink/40 text-cream/90 backdrop-blur-sm'
            }`}
          >
            {product.badge === 'new' ? 'جدید' : 'پرفروش'}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart();
          }}
          aria-label="افزودن سریع"
          className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 bg-ink/55 text-cream backdrop-blur transition-colors active:border-copper active:text-copper"
        >
          <span className="text-lg font-light leading-none">+</span>
        </button>
      </div>
      <div className={`flex items-start justify-between gap-3 px-0.5 ${compact ? 'mt-2.5' : 'mt-3.5'}`}>
        <div>
          <h3 className="text-[0.9rem] font-light text-ink">{product.name}</h3>
          <p className="mt-0.5 text-[0.65rem] font-light text-ink/45">{CATEGORY_TITLE[product.category]}</p>
        </div>
        <span className="whitespace-nowrap text-[0.8rem] font-light text-ink/75">{faPrice(product.price)}</span>
      </div>
    </article>
  );
}
