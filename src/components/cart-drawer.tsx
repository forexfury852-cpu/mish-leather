'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { PRODUCTS, faPrice, toFa } from '@/lib/data';
import { cartTotal, useUI } from '@/lib/store';
import { EASE } from '@/components/fx/reveal';

const FA = (n: number | string) => toFa(n);

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeFromCart, goProduct, goShop, setCheckoutOpen } = useUI();
  const total = cartTotal(cart);

  const close = () => setCartOpen(false);

  const checkout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={close}
            className="fixed inset-0 z-[85] bg-ink/45 backdrop-blur-sm"
            aria-hidden
          />

          {/* panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            role="dialog"
            aria-label="سبد خرید"
            className="fixed inset-y-0 left-0 z-[90] flex w-full max-w-[420px] flex-col bg-paper shadow-[0_0_80px_rgba(28,19,10,0.4)]"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-copper" />
                <span className="text-[0.95rem] font-light text-ink">
                  سبد خرید
                  {cart.length > 0 && (
                    <span className="ms-2 text-[0.7rem] font-light text-ink/45">
                      {FA(cart.reduce((n, c) => n + c.qty, 0))} قطعه
                    </span>
                  )}
                </span>
              </div>
              <button
                onClick={close}
                aria-label="بستن سبد"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-all hover:border-copper hover:text-copper active:scale-90"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* empty state */}
            {cart.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-ink/10 bg-paper-deep"
                >
                  <ShoppingBag size={26} strokeWidth={1} className="text-ink/25" />
                </motion.div>
                <div>
                  <p className="text-[0.95rem] font-light text-ink/80">سبد شما خالی است</p>
                  <p className="mt-2 text-[0.75rem] font-light leading-6 text-ink/45">
                    هنوز چیزی انتخاب نکرده‌اید؛ از مجموعه‌ی دست‌دوز میش دیدن کنید.
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
            {cart.length > 0 && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={item.key}
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
                            goProduct(item.productId);
                          }}
                          className="relative h-24 w-20 flex-none overflow-hidden rounded-xl bg-paper-deep ring-1 ring-ink/[0.06]"
                          aria-label={item.name}
                        >
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </button>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <button
                              onClick={() => {
                                close();
                                goProduct(item.productId);
                              }}
                              className="truncate text-start text-[0.82rem] font-normal text-ink transition-colors hover:text-copper"
                            >
                              {item.name}
                            </button>
                            <button
                              onClick={() => removeFromCart(item.key)}
                              aria-label="حذف از سبد"
                              className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-ink/35 transition-colors hover:bg-ink/5 hover:text-copper active:scale-90"
                            >
                              <Trash2 size={13} strokeWidth={1.5} />
                            </button>
                          </div>

                          <div className="mt-1 flex items-center gap-2 text-[0.65rem] font-light text-ink/45">
                            <span className="flex items-center gap-1.5">
                              <span
                                className="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-ink/15"
                                style={{ backgroundColor: item.colorHex }}
                              />
                              {item.colorName}
                            </span>
                            {item.size && (
                              <>
                                <span className="h-3 w-px bg-ink/15" />
                                <span>سایز {item.size}</span>
                              </>
                            )}
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-full border border-ink/15">
                              <button
                                onClick={() => setQty(item.key, item.qty - 1)}
                                aria-label="کاهش"
                                className="flex h-7 w-7 items-center justify-center text-ink/60 transition-colors hover:text-copper active:scale-90"
                              >
                                <Minus size={12} strokeWidth={1.5} />
                              </button>
                              <span className="w-6 text-center text-[0.75rem] font-light">{FA(item.qty)}</span>
                              <button
                                onClick={() => setQty(item.key, item.qty + 1)}
                                aria-label="افزایش"
                                className="flex h-7 w-7 items-center justify-center text-ink/60 transition-colors hover:text-copper active:scale-90"
                              >
                                <Plus size={12} strokeWidth={1.5} />
                              </button>
                            </div>
                            <span className="text-[0.78rem] font-medium text-ink/85">{faPrice(item.price * item.qty)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* footer / checkout */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                  className="border-t border-ink/10 bg-paper px-6 pb-8 pt-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[0.8rem] font-light text-ink/60">مجموع</span>
                    <span className="text-[1.05rem] font-light text-ink">{faPrice(total)}</span>
                  </div>
                  <p className="mt-2 text-[0.62rem] font-light text-ink/40">
                    هزینه‌ی ارسال در مرحله‌ی بعد محاسبه می‌شود — ارسال بیمه‌شده به سراسر ایران
                  </p>
                  <button
                    onClick={checkout}
                    className="lux-btn lux-btn-ink mt-5 w-full border border-ink bg-ink py-4 text-[0.85rem] font-medium text-cream transition-transform active:scale-[0.98]"
                  >
                    ثبت سفارش
                  </button>
                </motion.div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Search overlay (desktop + mobile) ---------------- */
export function SearchOverlay() {
  const { searchOpen, setSearchOpen, goProduct } = useUI();
  const [query, setQuery] = useState('');

  const results =
    query.trim().length === 0
      ? []
      : PRODUCTS.filter(
          (p) =>
            p.name.includes(query.trim()) ||
            p.latin.toLowerCase().includes(query.trim().toLowerCase()) ||
            p.description.includes(query.trim())
        ).slice(0, 6);

  const close = () => {
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-[95] overflow-y-auto bg-paper/97 backdrop-blur-xl"
          role="dialog"
          aria-label="جستجو"
        >
          <div className="mx-auto max-w-2xl px-6 pt-24 pb-16">
            <button
              onClick={close}
              aria-label="بستن جستجو"
              className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-all hover:border-copper hover:text-copper active:scale-90"
            >
              <X size={17} strokeWidth={1.5} />
            </button>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span className="latin-tag text-copper">Search</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="نام قطعه، دسته یا ویژگی را بنویسید…"
                className="mt-4 w-full border-b border-ink/15 bg-transparent pb-4 text-[1.3rem] font-extralight text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-copper"
              />

              {query.trim().length > 0 && results.length === 0 && (
                <p className="mt-10 text-[0.85rem] font-light text-ink/45">چیزی با این عنوان پیدا نشد.</p>
              )}

              <div className="mt-8 space-y-2">
                <AnimatePresence initial={false}>
                  {results.map((p, i) => (
                    <motion.button
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.04, ease: EASE }}
                      onClick={() => {
                        close();
                        goProduct(p.id);
                      }}
                      className="flex w-full items-center gap-4 rounded-2xl p-3 text-start transition-colors hover:bg-ink/[0.04]"
                    >
                      <span className="h-16 w-14 flex-none overflow-hidden rounded-lg bg-paper-deep ring-1 ring-ink/[0.06]">
                        <img src={p.image} alt="" className="h-full w-full object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[0.88rem] font-normal text-ink">{p.name}</span>
                        <span className="mt-0.5 block text-[0.62rem] font-light text-ink/45">{p.latin}</span>
                      </span>
                      <span className="whitespace-nowrap text-[0.74rem] font-light text-ink/70">{faPrice(p.price)}</span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
