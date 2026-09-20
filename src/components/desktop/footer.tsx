'use client';

import { Instagram, Send, Phone } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';
import { useUI } from '@/lib/store';
import { Reveal } from '@/components/fx/reveal';

export function Footer() {
  const { goShop, goHome } = useUI();

  const shopLinks = [{ key: 'all' as const, title: 'همه‌ی محصولات' }, ...CATEGORIES.map((c) => ({ key: c.key, title: c.title }))];
  const companyLinks = [
    { label: 'قصه‌ی میش', onClick: () => { goHome(); setTimeout(() => document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' }), 700); } },
    { label: 'تماس با ما', onClick: () => {} },
    { label: 'پرسش‌های متداول', onClick: () => {} },
    { label: 'فروش سازمانی', onClick: () => {} },
    { label: 'تعمیر و نگهداری چرم', onClick: () => {} },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink" aria-label="پاورقی">
      <div className="mx-auto max-w-[1680px] px-6 pt-24 lg:px-12">
        <div className="grid grid-cols-1 gap-14 pb-20 md:grid-cols-2 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-5">
            <button onClick={goHome} className="flex flex-col items-start">
              <span className="latin-tag text-copper">Est. 2000 — Tehran</span>
              <span className="mt-2 text-3xl font-medium leading-tight text-cream">
                چرم <span className="font-extralight text-copper">میش</span>
              </span>
            </button>
            <p className="mt-7 max-w-sm text-sm font-light leading-8 text-sand/65">
              خانه‌ی چرم دست‌دوز ایرانی؛ از برش اول تا کوک آخر، با دست و با حوصله. ما چرم را نه به‌عنوان کالا، بلکه به‌عنوان همراهی می‌سازیم که با شما پیر می‌شود.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {[
                { icon: Instagram, label: 'اینستاگرام' },
                { icon: Send, label: 'تلگرام' },
                { icon: Phone, label: 'تماس' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:border-copper hover:text-copper"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* shop */}
          <nav className="lg:col-span-2" aria-label="فروشگاه">
            <h3 className="latin-tag text-cream/40">فروشگاه</h3>
            <ul className="mt-7 space-y-4">
              {shopLinks.map((l) => (
                <li key={l.key}>
                  <button onClick={() => goShop(l.key)} className="lux-link text-sm font-light text-sand/80 hover:text-cream">
                    {l.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* company */}
          <nav className="lg:col-span-2" aria-label="کمپانی">
            <h3 className="latin-tag text-cream/40">کمپانی</h3>
            <ul className="mt-7 space-y-4">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <button onClick={l.onClick} className="lux-link text-sm font-light text-sand/80 hover:text-cream">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div className="lg:col-span-3">
            <h3 className="latin-tag text-cream/40">تماس</h3>
            <address className="mt-7 space-y-4 text-sm font-light not-italic leading-8 text-sand/80">
              <p>تهران، خیابان ولی‌عصر، نبش کوچه‌ی زرتشت، گالری میش</p>
              <p>
                <span className="text-sand/45">تلفن: </span>
                {String('021-88452210').replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])}
              </p>
              <p>
                <span className="text-sand/45">ایمیل: </span>
                <span className="latin-word text-xs">hello@mishleather.ir</span>
              </p>
              <p>
                <span className="text-sand/45">شنبه تا چهارشنبه، ۱۰ تا ۲۰</span>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* giant watermark */}
      <div className="relative select-none overflow-hidden" aria-hidden>
        <Reveal y={60}>
          <div className="translate-y-[16%] text-center text-[clamp(5rem,17vw,19rem)] font-black leading-[0.85] text-cream/[0.05]">
            چرم میش
          </div>
        </Reveal>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-4 px-6 py-6 text-[0.68rem] font-light text-sand/45 lg:px-12">
          <span>© ۱۴۰۴ چرم میش — تمام حقوق محفوظ است.</span>
          <span className="latin-tag">Mish Leather Co. — Handcrafted</span>
          <span>طراحی و ساخت: استودیو میش</span>
        </div>
      </div>
    </footer>
  );
}
