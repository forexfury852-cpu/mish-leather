'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Home, Plus, Search, ShoppingBag, Store, Heart, X } from 'lucide-react';
import { CATEGORIES, CATEGORY_TITLE, faPrice, type Product } from '@/lib/data';
import { useUI, type View } from '@/lib/store';
import { EASE } from '@/components/fx/reveal';

/* ---------------- Mobile hamburger menu — minimal fullscreen ink sheet ---------------- */
const MENU_ITEMS: { label: string; latin: string; go: (ui: ReturnType<typeof useUI.getState>) => void }[] = [
  { label: 'خانه', latin: 'Home', go: (ui) => ui.goHome() },
  { label: 'فروشگاه', latin: 'Shop', go: (ui) => ui.goShop('all') },
  { label: 'قطعه امضا', latin: 'Signature', go: (ui) => ui.goProduct('arta-messenger') },
];

export function MobileMenu() {
  const view = useUI((s) => s.view);
  const [open, setOpen] = useState(false);

  const ui = useUI.getState;
  // close the sheet, then navigate
  const nav = (go: () => void) => {
    setOpen(false);
    go();
  };

  return (
    <>
      {/* trigger — frosted circle on the right (mirrors desktop), hidden on product (its top bar has back/wishlist) */}
      {view !== 'product' && (
        <motion.button
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          onClick={() => setOpen(true)}
          aria-label="باز کردن منو"
          className="fixed right-4 top-10 z-[70] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full bg-paper/80 shadow-[0_14px_34px_-14px_rgba(28,19,10,0.5)] ring-1 ring-ink/10 backdrop-blur-md transition-transform active:scale-90"
        >
          <span className="h-px w-4 bg-ink/85" />
          <span className="h-px w-2.5 bg-ink/55" />
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            role="dialog"
            aria-label="منوی اصلی"
            className="fixed inset-0 z-[80] overflow-hidden bg-ink"
          >
            <span
              className="text-outline pointer-events-none absolute -bottom-8 -left-2 select-none text-[9rem] font-extralight leading-none opacity-25"
              aria-hidden
            >
              میش
            </span>

            {/* top row — close (right, same corner as the trigger) + brand (left) */}
            <div className="relative flex items-center justify-between px-6 pt-7">
              <button
                onClick={() => setOpen(false)}
                aria-label="بستن منو"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/90 transition-all active:scale-90 active:border-copper active:text-copper"
              >
                <X size={17} strokeWidth={1.5} />
              </button>
              <span className="text-lg font-medium text-cream">
                چرم <span className="font-extralight text-copper">میش</span>
              </span>
            </div>

            {/* primary items — big editorial lines */}
            <nav className="relative mt-12 px-8" aria-label="ناوبری">
              {MENU_ITEMS.map((it, i) => (
                <motion.button
                  key={it.label}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.12 + i * 0.08, ease: EASE }}
                  onClick={() => nav(() => it.go(ui()))}
                  className="flex w-full items-center justify-between border-b border-cream/10 py-5 text-start"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="latin-tag text-[0.55rem] text-copper/80">{it.latin}</span>
                    <span className="text-[1.7rem] font-extralight leading-snug text-cream">{it.label}</span>
                  </span>
                  <ArrowLeft size={18} strokeWidth={1.5} className="text-cream/30" />
                </motion.button>
              ))}
            </nav>

            {/* category shortcuts */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="relative mt-9 px-8"
            >
              <span className="text-[0.68rem] font-light text-cream/40">دسته‌بندی‌ها</span>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => nav(() => ui().goShop(cat.key))}
                    className="rounded-full border border-cream/15 px-4 py-2 text-[0.72rem] font-light text-cream/80 transition-colors active:border-copper active:text-copper"
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* bottom row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="absolute inset-x-0 bottom-0 flex items-center justify-between px-8 pb-9"
            >
              <span className="latin-tag text-copper/80">Est. 2000 — Tehran</span>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[0.75rem] font-light text-cream/70">
                اینستاگرام
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const NAV_ITEMS: { view: View; label: string; icon: typeof Home }[] = [
  { view: 'home', label: 'خانه', icon: Home },
  { view: 'shop', label: 'فروشگاه', icon: Store },
  { view: 'product', label: 'جستجو', icon: Search },
];

export function BottomNav() {
  const { view, goHome, goShop, setCartOpen, setSearchOpen, setWishlistOpen, wishlist, cartCount } = useUI();
  const badge = String(cartCount).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
  const wishCount = wishlist.length;

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
        {NAV_ITEMS.slice(0, 2).map(({ view: v, label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => (v === 'home' ? goHome() : goShop('all'))}
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
        {/* search — opens the search overlay */}
        <button
          onClick={() => setSearchOpen(true)}
          className="relative flex min-h-[58px] flex-col items-center justify-center gap-1"
          aria-label="جستجو"
        >
          <Search size={20} strokeWidth={1.4} className="text-ink/55" />
          <span className="text-[0.58rem] font-light text-ink/45">جستجو</span>
        </button>
        {/* favorites — opens the wishlist drawer */}
        <button
          onClick={() => setWishlistOpen(true)}
          className="relative flex min-h-[58px] flex-col items-center justify-center gap-1"
          aria-label="علاقه‌مندی‌ها"
        >
          <span className="relative">
            <Heart size={20} strokeWidth={1.4} className={wishCount > 0 ? 'text-copper' : 'text-ink/55'} />
            {wishCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-copper text-[0.5rem] font-semibold text-paper">
                {String(wishCount).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])}
              </span>
            )}
          </span>
          <span className="text-[0.58rem] font-light text-ink/45">علاقه‌مندی</span>
        </button>
        {/* cart — opens the cart drawer */}
        <button
          onClick={() => setCartOpen(true)}
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

/* Mobile product card — modern rounded card, framed shadow, staggered reveal (fade-only optional) */
export function MobileProductCard({ product, compact = false, index = 0, fade = false }: { product: Product; compact?: boolean; index?: number; fade?: boolean }) {
  const { goProduct, addToCart, toggleWishlist, isWishlisted, showToast } = useUI();
  const wished = isWishlisted(product.id);
  const addThis = () =>
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      colorName: product.colors[0].name,
      colorHex: product.colors[0].hex,
      size: product.sizes?.[0] ?? null,
    });
  return (
    <motion.article
      className="group"
      initial={fade ? { opacity: 0 } : { opacity: 0, y: 14 }}
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
            addThis();
            showToast(`«${product.name}» به سبد اضافه شد`);
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
