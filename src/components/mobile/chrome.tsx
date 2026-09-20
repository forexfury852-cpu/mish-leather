'use client';

import { motion } from 'framer-motion';
import { Home, Plus, Search, ShoppingBag, Store, Heart } from 'lucide-react';
import { CATEGORY_TITLE, faPrice, type Product } from '@/lib/data';
import { useUI, type View } from '@/lib/store';
import { EASE } from '@/components/fx/reveal';

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
    <motion.nav
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 1, ease: EASE }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-paper/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-18px_40px_-24px_rgba(28,19,10,0.25)] backdrop-blur-lg"
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
    </motion.nav>
  );
}

/* Mobile product card — modern rounded card, framed shadow, staggered reveal */
export function MobileProductCard({ product, compact = false, index = 0 }: { product: Product; compact?: boolean; index?: number }) {
  const { goProduct, addToCart, toggleWishlist, isWishlisted } = useUI();
  const wished = isWishlisted(product.id);
  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4% 0px' }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.3), ease: EASE }}
    >
      {/* minimal editorial card — the image is the frame, no box around it */}
      <div
        onClick={() => goProduct(product.id)}
        className="relative transition-transform duration-300 active:scale-[0.97]"
        data-hover
      >
      <div
        className="img-zoom relative aspect-[4/5] overflow-hidden rounded-[1.15rem] bg-paper-deep ring-1 ring-ink/[0.05] shadow-[0_18px_40px_-26px_rgba(28,19,10,0.35)]"
      >
        { }
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
        {/* inner hairline — premium framed look */}
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15" aria-hidden />
        {product.badge && (
          <span
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[0.58rem] font-medium shadow-sm ${
              product.badge === 'new' ? 'bg-copper text-paper' : 'border border-cream/25 bg-ink/35 text-cream/95 backdrop-blur-md'
            }`}
          >
            {product.badge === 'new' ? 'جدید' : 'پرفروش'}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="افزودن به علاقه‌مندی‌ها"
          className={`absolute left-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-paper/85 shadow-sm backdrop-blur-md transition-all active:scale-90 ${
            wished ? 'text-copper' : 'text-ink/60'
          }`}
        >
          <Heart size={13} strokeWidth={1.75} className={wished ? 'fill-copper' : ''} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart();
          }}
          aria-label="افزودن سریع"
          className="absolute bottom-2.5 left-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink shadow-md backdrop-blur-md transition-all active:scale-90 active:bg-copper active:text-paper"
        >
          <Plus size={16} strokeWidth={1.75} />
        </button>
      </div>
      <div className={`flex items-start justify-between gap-3 ${compact ? 'mt-3' : 'mt-3.5'}`}>
        <div>
          <h3 className="text-[0.88rem] font-normal text-ink">{product.name}</h3>
          <p className="mt-0.5 text-[0.62rem] font-light text-ink/45">{CATEGORY_TITLE[product.category]}</p>
        </div>
        <span className="mt-0.5 whitespace-nowrap text-[0.74rem] font-medium tracking-wide text-ink/85">{faPrice(product.price)}</span>
      </div>
      </div>
    </motion.article>
  );
}
