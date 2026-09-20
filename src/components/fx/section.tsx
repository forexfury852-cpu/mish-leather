'use client';

import { Reveal } from './reveal';

export function Marquee({
  items,
  dark = true,
  className,
}: {
  items: string[];
  dark?: boolean;
  className?: string;
}) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div
      className={`relative overflow-hidden border-y py-5 ${
        dark ? 'border-cream/10 bg-coal' : 'border-ink/10 bg-cream'
      } ${className ?? ''}`}
      aria-hidden
    >
      <div dir="ltr" className="flex w-max animate-marquee items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span
                  className={`whitespace-nowrap px-8 text-sm font-light ${
                    dark ? 'text-sand/80' : 'text-ink/70'
                  } ${/^[A-Za-z0-9 .—-]+$/.test(item) ? 'latin-word text-xs' : ''}`}
                >
                  {item}
                </span>
                <span className="text-[0.55rem] text-copper">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SectionHead({
  index,
  title,
  latin,
  light = false,
  className,
  desc,
}: {
  index: string;
  title: string;
  latin: string;
  light?: boolean;
  className?: string;
  desc?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="latin-tag text-copper">{latin}</span>
          <span className={`h-px w-14 ${light ? 'bg-ink/25' : 'bg-cream/25'}`} />
          <span className={`text-sm font-light ${light ? 'text-ink/50' : 'text-sand/70'}`}>
            {index}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-display-lg mt-5">{title}</h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p className={`mt-5 max-w-md text-sm font-light leading-8 ${light ? 'text-ink/60' : 'text-sand/70'}`}>
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}
