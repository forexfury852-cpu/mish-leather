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
  const row = [...items, ...items, ...items];
  return (
    <div
      dir="ltr"
      className={`relative overflow-hidden border-y py-[1.15rem] ${
        dark ? 'border-cream/10 bg-coal' : 'border-ink/10 bg-paper'
      } ${className ?? ''}`}
      aria-hidden
    >
      {/* soft edge fades — the ribbon dissolves instead of being cut */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r ${
          dark ? 'from-coal' : 'from-paper'
        } to-transparent`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l ${
          dark ? 'from-coal' : 'from-paper'
        } to-transparent`}
      />
      {/* continuous, very slow drift — pauses gently on hover */}
      <div
        dir="ltr"
        className="flex w-max animate-[marquee_80s_linear_infinite] will-change-transform hover:[animation-play-state:paused]"
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => {
              const isLatin = /^[A-Za-z0-9 .—-]+$/.test(item);
              return (
                <span key={`${half}-${i}`} className="flex items-center">
                  <span
                    className={`whitespace-nowrap px-9 ${
                      isLatin
                        ? `latin-tag ${dark ? 'text-copper/85' : 'text-copper'}`
                        : `text-[0.84rem] font-light ${dark ? 'text-sand/70' : 'text-ink/55'}`
                    }`}
                  >
                    {item}
                  </span>
                  <span className="h-[3px] w-[3px] rotate-45 bg-copper/60" />
                </span>
              );
            })}
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
          <span className="h-px w-14 bg-ink/25" />
          <span className="text-sm font-light text-ink/50">{index}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-display-lg mt-5">{title}</h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-md text-sm font-light leading-8 text-ink/60">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}
