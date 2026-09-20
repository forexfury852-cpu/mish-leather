'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';
import { useUI } from '@/lib/store';
import { EASE } from '@/components/fx/reveal';

const FA = (s: string) => s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

type Item = {
  label: string;
  latin: string;
  image: string;
  caption: string;
  act: 'home' | 'shop' | 'signature' | 'craft';
};

const ITEMS: Item[] = [
  { label: 'خانه', latin: 'Home', image: '/images/hero.jpg', caption: 'Mish Leather — Tehran', act: 'home' },
  { label: 'فروشگاه', latin: 'The Shop', image: '/images/campaign.jpg', caption: 'Autumn 1404 Collection', act: 'shop' },
  { label: 'قطعه امضا', latin: 'Signature — Arta', image: '/images/prod-bag-1.jpg', caption: 'Arta Messenger', act: 'signature' },
  { label: 'داستان صنعتگری', latin: 'The Craft', image: '/images/craft-hands.jpg', caption: 'Handcrafted Since 2000', act: 'craft' },
];

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { goHome, goShop, goProduct } = useUI();
  const [active, setActive] = useState(0);

  // scroll lock + Escape while the overlay is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const run = (act: Item['act']) => {
    onClose();
    if (act === 'home') goHome();
    else if (act === 'shop') goShop('all');
    else if (act === 'signature') goProduct('arta-messenger');
    else {
      goHome();
      setTimeout(() => {
        document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' });
      }, 700);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: EASE }}
          className="fixed inset-0 z-[90] flex flex-col bg-ink"
          role="dialog"
          aria-modal="true"
          aria-label="منوی اصلی"
        >
          {/* faint texture + top hairline */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink/80" aria-hidden />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cream/10" aria-hidden />

          {/* close */}
          <motion.button
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
            onClick={onClose}
            aria-label="بستن منو"
            className="absolute left-6 top-7 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-cream/90 transition-all duration-500 hover:rotate-90 hover:border-copper hover:text-copper lg:left-12"
          >
            <X size={19} strokeWidth={1.4} />
          </motion.button>

          <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-10 px-6 pb-10 pt-24 lg:grid-cols-[1.25fr_1fr] lg:px-12 lg:pb-14">
            {/* menu list */}
            <div className="flex flex-col justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="latin-tag text-copper"
              >
                Menu — چرم میش
              </motion.span>

              <nav className="mt-7 flex flex-col" aria-label="منوی اصلی">
                {ITEMS.map((it, i) => (
                  <motion.button
                    key={it.label}
                    initial={{ opacity: 0, y: 46 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.08, duration: 0.75, ease: EASE }}
                    onClick={() => run(it.act)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-baseline gap-5 border-b border-cream/10 py-4 text-start transition-colors duration-300 first:border-t hover:border-copper/40 lg:gap-8 lg:py-5"
                  >
                    <span className="latin-tag w-7 shrink-0 text-[0.6rem] text-cream/35 transition-colors duration-300 group-hover:text-copper">
                      {FA(String(i + 1).padStart(2, '0'))}
                    </span>
                    <span className="flex-1 text-[1.7rem] font-extralight leading-none text-cream transition-all duration-500 group-hover:translate-x-[-6px] group-hover:text-copper lg:text-[2.5rem]">
                      {it.label}
                    </span>
                    <span className="latin-tag hidden text-[0.62rem] text-cream/40 transition-colors duration-300 group-hover:text-copper/90 md:block">
                      {it.latin}
                    </span>
                    <ArrowLeft
                      size={17}
                      strokeWidth={1.4}
                      className="shrink-0 -translate-x-2 text-copper opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </motion.button>
                ))}
              </nav>

              {/* category shortcuts */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-2.5"
              >
                <span className="text-[0.68rem] font-light text-cream/40">دنیای میش:</span>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => {
                      onClose();
                      goShop(cat.key);
                    }}
                    className="rounded-full border border-cream/15 px-4 py-2 text-[0.7rem] font-light text-cream/75 transition-all duration-300 hover:border-copper hover:text-copper active:scale-[0.96]"
                  >
                    {cat.title}
                  </button>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-[0.68rem] font-light text-cream/45"
              >
                <span>تهران، خیابان ولی‌عصر، نبش کوچه زرتشت</span>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="lux-link text-cream/70 hover:text-copper">
                  Instagram — @mish.leather
                </a>
              </motion.div>
            </div>

            {/* live image panel — follows the hovered item */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
              className="relative hidden aspect-[4/5] max-h-[62vh] w-full self-center overflow-hidden rounded-[1.5rem] ring-1 ring-cream/15 lg:block"
              aria-hidden
            >
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={ITEMS[active].image}
                  src={ITEMS[active].image}
                  alt=""
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <span className="latin-tag text-copper">{ITEMS[active].latin}</span>
                  <p className="mt-1.5 text-sm font-light text-cream/90">{ITEMS[active].caption}</p>
                </div>
                <span className="latin-tag text-cream/40">{FA(String(active + 1).padStart(2, '0'))} / {FA('04')}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
