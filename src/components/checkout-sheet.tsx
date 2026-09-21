'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronRight, LoaderCircle, ShoppingBag, X } from 'lucide-react';
import { faPrice } from '@/lib/data';
import { cartTotal, useUI } from '@/lib/store';
import { EASE } from '@/components/fx/reveal';

type Step = 'form' | 'sending' | 'done';

const FA = (n: number | string) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

/* Compact order summary shown at the top of the checkout sheet */
function OrderSummary() {
  const cart = useUI((s) => s.cart);
  const total = cartTotal(cart);

  return (
    <div className="rounded-2xl border border-ink/10 bg-paper-deep/60 p-4">
      <div className="max-h-40 space-y-2.5 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <span className="h-10 w-9 flex-none overflow-hidden rounded-lg ring-1 ring-ink/[0.06]">
              <img src={item.image} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="min-w-0 flex-1 truncate text-[0.72rem] font-light text-ink/80">
              {item.name}
              <span className="text-ink/40"> × {FA(item.qty)}</span>
            </span>
            <span className="whitespace-nowrap text-[0.68rem] font-light text-ink/65">{faPrice(item.price * item.qty)}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3">
        <span className="text-[0.75rem] font-light text-ink/60">مجموع سفارش</span>
        <span className="text-[0.9rem] font-light text-ink">{faPrice(total)}</span>
      </div>
    </div>
  );
}

export function CheckoutSheet() {
  const { checkoutOpen, setCheckoutOpen, cart, clearCart, setCartOpen, showToast, goHome } = useUI();
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState({ name: '', phone: '', city: '', address: '' });

  const close = () => {
    setCheckoutOpen(false);
    // if the order was placed, reset the sheet for next time
    if (step === 'done') setStep('form');
  };

  const valid =
    form.name.trim().length >= 3 &&
    /^09\d{9}$/.test(form.phone.trim()) &&
    form.city.trim().length >= 2 &&
    form.address.trim().length >= 10;

  const submit = () => {
    if (!valid || step !== 'form') return;
    setStep('sending');
    // Simulated order submission — replace with a real API call when a backend is wired up
    window.setTimeout(() => {
      setStep('done');
      clearCart();
    }, 1400);
  };

  const field =
    'w-full rounded-xl border border-ink/15 bg-transparent px-4 py-3 text-[0.82rem] font-light text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-copper';

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={step === 'sending' ? undefined : close}
            className="fixed inset-0 z-[96] bg-ink/50 backdrop-blur-sm"
            aria-hidden
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            role="dialog"
            aria-label="ثبت سفارش"
            className="fixed inset-x-0 bottom-0 z-[97] mx-auto flex max-h-[92svh] w-full max-w-[560px] flex-col rounded-t-[1.75rem] bg-paper shadow-[0_-20px_80px_rgba(28,19,10,0.45)]"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <span className="flex items-center gap-3 text-[0.95rem] font-light text-ink">
                <ShoppingBag size={17} strokeWidth={1.5} className="text-copper" />
                {step === 'done' ? 'سفارش شما ثبت شد' : 'ثبت سفارش'}
              </span>
              <button
                onClick={close}
                aria-label="بستن"
                disabled={step === 'sending'}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-all hover:border-copper hover:text-copper active:scale-90 disabled:opacity-40"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 pb-10 pt-6">
              {step === 'done' ? (
                /* ---------- success ---------- */
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex flex-col items-center gap-6 py-10 text-center"
                >
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-copper/10 ring-1 ring-copper/40"
                  >
                    <Check size={30} strokeWidth={1.5} className="text-copper" />
                  </motion.span>
                  <div>
                    <p className="text-[1.05rem] font-light text-ink">سپاس از اعتماد شما</p>
                    <p className="mt-3 text-[0.78rem] font-light leading-7 text-ink/55">
                      سفارش شما ثبت شد و کارگاه میش آن را دست‌دوز آماده می‌کند.
                      <br />
                      همکاران ما برای هماهنگی ارسال با شما تماس می‌گیرند.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      close();
                      goHome();
                    }}
                    className="lux-btn lux-btn-ink border border-ink bg-ink px-10 py-3.5 text-[0.82rem] font-light text-cream transition-transform active:scale-[0.97]"
                  >
                    بازگشت به خانه
                  </button>
                </motion.div>
              ) : (
                /* ---------- form ---------- */
                <>
                  <OrderSummary />

                  <div className="mt-6 space-y-4">
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="نام و نام خانوادگی"
                      className={field}
                      autoComplete="name"
                    />
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="شماره موبایل — ۰۹xxxxxxxxx"
                      className={field}
                      inputMode="numeric"
                      dir="ltr"
                      autoComplete="tel"
                    />
                    <input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="شهر"
                      className={field}
                      autoComplete="address-level2"
                    />
                    <textarea
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="نشانی کامل پستی — خیابان، کوچه، پلاک، واحد"
                      rows={3}
                      className={`${field} resize-none leading-7`}
                      autoComplete="street-address"
                    />
                  </div>

                  <p className="mt-4 text-[0.65rem] font-light leading-6 text-ink/40">
                    پرداخت در محل (کارت‌خوان سیار یا نقدی) — پس از ثبت سفارش، برای تأیید نهایی با شما تماس گرفته می‌شود.
                  </p>

                  <button
                    onClick={submit}
                    disabled={!valid || step === 'sending'}
                    className="lux-btn lux-btn-ink mt-6 flex w-full items-center justify-center gap-3 border border-ink bg-ink py-4 text-[0.85rem] font-medium text-cream transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {step === 'sending' ? (
                      <LoaderCircle size={17} className="animate-spin" strokeWidth={1.75} />
                    ) : (
                      <>
                        ثبت سفارش
                        <ChevronRight size={15} strokeWidth={1.5} />
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
