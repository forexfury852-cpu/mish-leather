'use client';

import { useRef } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { useUI } from '@/lib/store';
import { StatusBar } from '@/components/mobile/chrome';
import { motion } from 'framer-motion';
import { EASE } from '@/components/fx/reveal';

/* ---------- Phone frame with the mobile experience inside ---------- */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
      className="relative"
    >
      {/* glow */}
      <div className="absolute -inset-10 -z-10 rounded-[5rem] bg-copper/[0.07] blur-3xl" aria-hidden />
      <div className="relative h-[min(860px,88svh)] w-[396px] max-w-[92vw] rounded-[3.4rem] border-[11px] border-[#221d18] bg-ink shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9),inset_0_0_0_2px_rgba(239,232,219,0.06)]">
        {/* side buttons */}
        <span className="absolute -left-[15px] top-28 h-14 w-[3px] rounded-full bg-[#221d18]" aria-hidden />
        <span className="absolute -left-[15px] top-48 h-9 w-[3px] rounded-full bg-[#221d18]" aria-hidden />
        <span className="absolute -right-[15px] top-36 h-16 w-[3px] rounded-full bg-[#221d18]" aria-hidden />
        {/* screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.6rem] [container-type:size] [contain:paint]">
          <StatusBar />
          {children}
        </div>
      </div>
      {/* caption under frame */}
      <p className="mt-7 text-center text-[0.68rem] font-light leading-6 text-sand/45">
        تجربه‌ی اختصاصی موبایل — درون قاب اسکرول کنید
      </p>
    </motion.div>
  );
}

/* ---------- Presentation dock — device & view switcher ---------- */
export function PresentationDock() {
  const { device, view, setDevice, goHome, goShop, goProduct } = useUI();
  const isMobileDevice = device === 'mobile';

  const views: { key: 'home' | 'shop' | 'product'; label: string; onClick: () => void }[] = [
    { key: 'home', label: 'خانه', onClick: goHome },
    { key: 'shop', label: 'فروشگاه', onClick: () => goShop('all') },
    { key: 'product', label: 'محصول', onClick: () => goProduct('arta-messenger') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 3.1, ease: EASE }}
      className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2"
      dir="rtl"
      role="toolbar"
      aria-label="کنترل نمایش"
    >
      <div className="flex items-center gap-1 rounded-full border border-cream/12 bg-ink/85 p-1.5 shadow-2xl backdrop-blur-lg">
        {/* device toggle */}
        <div className="flex items-center rounded-full border border-cream/10 bg-coal/80 p-1">
          <button
            onClick={() => setDevice('desktop')}
            aria-pressed={!isMobileDevice}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-light transition-all duration-300 ${
              !isMobileDevice ? 'bg-copper text-ink' : 'text-cream/65 hover:text-cream'
            }`}
          >
            <Monitor size={12} strokeWidth={1.5} />
            دسکتاپ
          </button>
          <button
            onClick={() => setDevice('mobile')}
            aria-pressed={isMobileDevice}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-light transition-all duration-300 ${
              isMobileDevice ? 'bg-copper text-ink' : 'text-cream/65 hover:text-cream'
            }`}
          >
            <Smartphone size={12} strokeWidth={1.5} />
            موبایل
          </button>
        </div>

        <span className="mx-1 h-5 w-px bg-cream/12" aria-hidden />

        {/* views */}
        {views.map((v) => (
          <button
            key={v.key}
            onClick={v.onClick}
            aria-pressed={view === v.key}
            className={`rounded-full px-4 py-2.5 text-[0.72rem] font-light transition-all duration-300 ${
              view === v.key ? 'bg-cream/10 text-copper' : 'text-cream/65 hover:text-cream'
            }`}
          >
            {v.label}
          </button>
        ))}

        <span className="mx-2 hidden select-none text-[0.6rem] font-light text-sand/35 sm:block">MISH™</span>
      </div>
    </motion.div>
  );
}

/* ---------- Desktop presentation stage for mobile screens ---------- */
export function MobileStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink py-16">
      {/* ambient background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(60% 50% at 70% 30%, rgba(110,69,38,0.22), transparent 70%), radial-gradient(50% 40% at 20% 80%, rgba(192,138,92,0.1), transparent 70%)',
        }}
        aria-hidden
      />
      <span
        className="text-outline pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[11vw] font-extralight leading-none opacity-40"
        aria-hidden
      >
        MISH LEATHER
      </span>

      <div className="relative flex flex-col items-center gap-14 lg:flex-row lg:gap-24 lg:px-12">
        {/* side captions */}
        <div className="hidden max-w-xs lg:block">
          <span className="latin-tag text-copper">Mobile Experience</span>
          <h2 className="text-display-md mt-5 leading-snug">
            طراحی‌شده
            <br />
            برای لمس
          </h2>
          <p className="mt-6 text-sm font-light leading-8 text-sand/70">
            تجربه‌ی موبایل میش، بازطراحی کامل است؛ نه نسخه‌ی کوچک‌شده‌ی دسکتاپ. ناوبری پایینی، فیلتر کشویی و خرید چسبان — همه در دسترس شست.
          </p>
          <ul className="mt-8 space-y-3 text-[0.78rem] font-light text-sand/60">
            {['ناوبری پایینی اختصاصی', 'فیلتر Bottom-Sheet کشویی', 'دکمه‌ی خرید چسبان', 'گالری سوایپی تمام‌صفحه'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="text-[0.5rem] text-copper">✦</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        {children}
      </div>
    </div>
  );
}

/* scroll container helper */
export function useMobileScroll() {
  return useRef<HTMLDivElement>(null);
}
