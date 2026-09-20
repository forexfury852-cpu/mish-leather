'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUI } from '@/lib/store';
import { Preloader, Cursor } from '@/components/fx/atoms';
import { SiteHeader } from '@/components/desktop/header';
import { Home } from '@/components/desktop/home';
import { Shop } from '@/components/desktop/shop';
import { ProductPage } from '@/components/desktop/product';
import { MobileHome } from '@/components/mobile/home';
import { MobileShop } from '@/components/mobile/shop';
import { MobileProduct } from '@/components/mobile/product';
import { BottomNav, MobileMenu } from '@/components/mobile/chrome';
import { EASE } from '@/components/fx/reveal';

const viewVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

export default function Page() {
  const { view, productId, setBooted } = useUI();
  const [loading, setLoading] = useState(true);
  const [smallScreen, setSmallScreen] = useState(false);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setSmallScreen(mq.matches);
    const raf = requestAnimationFrame(update);
    mq.addEventListener('change', update);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener('change', update);
    };
  }, []);

  // reset page scroll when the view changes — desktop window + mobile scroll container
  useEffect(() => {
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const el = mobileScrollRef.current;
    if (el && el.scrollTop > 0) el.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [view, productId]);

  /* ---------- DESKTOP (viewport ≥ 768px) ---------- */
  if (!smallScreen) {
    return (
      <main className="grain min-h-svh bg-paper text-ink">
        <Cursor />
        <AnimatePresence>{loading && <Preloader onDone={() => { setLoading(false); setBooted(); }} />}</AnimatePresence>
        <SiteHeader />
        <AnimatePresence mode="wait">
          <motion.div
            key={`${view}-${productId}`}
            variants={viewVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.6, ease: EASE }}
          >
            {view === 'home' && <Home />}
            {view === 'shop' && <Shop />}
            {view === 'product' && <ProductPage />}
          </motion.div>
        </AnimatePresence>
      </main>
    );
  }

  /* ---------- MOBILE (viewport < 768px) ---------- */
  return (
    <main className="grain fixed inset-0 overflow-hidden bg-paper text-ink [container-type:size]">
      <AnimatePresence>{loading && <Preloader onDone={() => { setLoading(false); setBooted(); }} />}</AnimatePresence>
      <div ref={mobileScrollRef} className="h-full overflow-y-auto overscroll-contain no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${view}-${productId}`}
            variants={viewVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
          >
            {view === 'home' && <MobileHome />}
            {view === 'shop' && <MobileShop />}
            {view === 'product' && <MobileProduct />}
          </motion.div>
        </AnimatePresence>
      </div>
      <MobileMenu />
      <BottomNav />
    </main>
  );
}
