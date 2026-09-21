'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react';
import { getProduct, faPrice, PRODUCTS } from '@/lib/data';
import { useUI } from '@/lib/store';
import { EASE } from '@/components/fx/reveal';

export function WishlistDrawer() {
  const { wishlist, wishlistOpen, setWishlistOpen, toggleWishlist, addToCart, goProduct, goShop, showToast } = useUI();

  const close = () => setWishlistOpen(false);
  // keep order stable but tolerate ids removed from the catalog
  const items = wishlist.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as ReturnType<typeof getProduct>[];

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={close}
            className="fixed inset-0 z-[85] bg-ink/45 backdrop-blur-sm"
            aria-hidden
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            role="dialog"
            aria-label="علاقه‌مندی‌ها"
            className="fixed inset-y-0 left-0 z-[90] flex w-full max-w-[420px] flex-col bg-paper shadow-[0_0_80px_rgba(28,19,10,0.4)]"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <Heart size={18} strokeWidth={1.5} className={items.length > 0 ? 'fill-copper text-copper' : 'text-copper'} />
                <span className="text-[0.95rem] font-light text-ink">
                  علاقه‌مندی‌ها
                  {items.length > 0 && (
                    <span className="ms-2 text-[0.7rem] font-light text-ink/45">
                      {String(items.length).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])} قطعه
                    </span>
                  )}
                </span>
              </div>
              <button
                onClick={close}
                aria-label="بستن علاقه‌مندی‌ها"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-all hover:border-copper hover:text-copper active:scale-90"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* empty state */}
            {items.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-ink/10 bg-paper-deep"
                >
                  <Heart size={26} strokeWidth={1} className="text-ink/25" />
                </motion.div>
                <div>
                  <p className="text-[0.95rem] font-light text-ink/80">هنوز قطعه‌ای نشان نکرده‌اید</p>
                  <p className="mt-2 text-[0.75rem] font-light leading-6 text-ink/45">
                    با زدن آیکن قلب روی هر محصول، آن را برای بعد نگه دارید.
                  </p>
                </div>
                <button
                  onClick={() => {
                    close();
                    goShop('all');
                  }}
                  className="lux-btn lux-btn-ink border border-ink bg-ink px-8 py-3 text-[0.8rem] font-light text-cream transition-transform active:scale-[0.97]"
                >
                  مشاهده مجموعه
                </button>
              </div>
            )}

            {/* items */}
            {items.length > 0 && (
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <AnimatePresence initial={false}>
                  {items.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -60, height: 0, marginTop: 0, marginBottom: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="mb-5 flex gap-4 border-b border-ink/[0.07] pb-5"
                    >
                      <button
                        onClick={() => {
                          close();
                          goProduct(product.id);
                        }}
                        className="relative h-24 w-20 flex-none overflow-hidden rounded-xl bg-paper-deep ring-1 ring-ink/[0.06]"
                        aria-label={product.name}
                      >
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </button>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <button
                            onClick={() => {
                              close();
                              goProduct(product.id);
                            }}
                            className="truncate text-start text-[0.82rem] font-normal text-ink transition-colors hover:text-copper"
                          >
                            {product.name}
                          </button>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            aria-label="حذف از علاقه‌مندی‌ها"
                            className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-ink/35 transition-colors hover:bg-ink/5 hover:text-copper active:scale-90"
                          >
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>

                        <span className="mt-1 text-[0.65rem] font-light text-ink/45">{product.latin}</span>

                        <div className="mt-auto flex items-center justify-between pt-2">
                          <span className="text-[0.78rem] font-medium text-ink/85">{faPrice(product.price)}</span>
                          <button
                            onClick={() => {
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
                            }}
                            aria-label="افزودن به سبد"
                            className="flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-[0.68rem] font-light text-ink/85 transition-all hover:border-copper hover:text-copper active:scale-95"
                          >
                            <ShoppingBag size={12} strokeWidth={1.5} />
                            به سبد
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Toast — one message, anywhere ---------------- */
export function Toast() {
  const toast = useUI((s) => s.toast);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.35, ease: EASE }}
          role="status"
          aria-live="polite"
          className="fixed bottom-[86px] left-1/2 z-[99] -translate-x-1/2 rounded-full bg-ink px-6 py-3 text-[0.75rem] font-light text-cream shadow-[0_16px_40px_-14px_rgba(28,19,10,0.6)] md:bottom-8"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
