'use client';

import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Heart, Search, ShoppingBag } from 'lucide-react';
import { useUI } from '@/lib/store';
import { EASE } from '@/components/fx/reveal';

export function SiteHeader() {
  const { view, goHome, goShop, cartCount } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  const scrollToCraft = () => {
    goHome();
    setTimeout(() => {
      document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' });
    }, 700);
  };

  const links: { label: string; onClick: () => void; active: boolean }[] = [
    { label: 'خانه', onClick: goHome, active: view === 'home' },
    { label: 'فروشگاه', onClick: () => goShop('all'), active: view === 'shop' },
    { label: 'صنعتگری', onClick: scrollToCraft, active: false },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.6, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-700 ${
        scrolled ? 'border-b border-cream/10 bg-ink/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1680px] items-center justify-between px-6 lg:px-12">
        {/* nav */}
        <nav className="hidden items-center gap-9 md:flex" aria-label="اصلی">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={l.onClick}
              className={`lux-link text-[0.82rem] font-light tracking-wide transition-colors duration-300 ${
                l.active ? 'text-copper' : 'text-cream/85 hover:text-cream'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* wordmark */}
        <button onClick={goHome} className="group flex flex-col items-center" aria-label="چرم میش — خانه">
          <span className="latin-tag text-[0.5rem] text-copper/80 transition-colors group-hover:text-copper">
            Est. 2000 — Tehran
          </span>
          <span className="mt-1 text-xl font-medium leading-none">
            چرم <span className="font-extralight text-copper">میش</span>
          </span>
        </button>

        {/* actions */}
        <div className="flex items-center gap-6">
          <button aria-label="جستجو" className="hidden text-cream/80 transition-colors hover:text-copper md:block">
            <Search size={17} strokeWidth={1.5} />
          </button>
          <button aria-label="علاقه‌مندی‌ها" className="hidden text-cream/80 transition-colors hover:text-copper md:block">
            <Heart size={17} strokeWidth={1.5} />
          </button>
          <button aria-label="سبد خرید" className="relative text-cream/85 transition-colors hover:text-copper">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-copper text-[0.55rem] font-semibold text-ink">
                {String(cartCount).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])}
              </span>
            )}
          </button>
          <button
            onClick={() => goShop('all')}
            className="lux-btn hidden border border-cream/25 px-6 py-2.5 text-[0.78rem] font-light text-cream/90 transition-colors lg:block"
          >
            مشاهده مجموعه
          </button>
        </div>
      </div>
    </motion.header>
  );
}
