'use client';

import { useEffect, useRef } from 'react';

/**
 * LivingBackdrop — ultra-subtle drifting warm glows (copper / copper-bright / cream)
 * that make the page feel alive and expensive. Pure GPU: only `transform` is
 * animated on three pre-blurred radial-gradient layers (no filter:blur, no
 * repaint, no JS per frame). Hidden over the hero — it fades in once the user
 * scrolls past ~72% of the first viewport, and stays on for the rest of the site.
 */
export function LivingBackdrop({ containerRef }: { containerRef?: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const top = containerRef?.current?.scrollTop ?? window.scrollY;
      el.style.opacity = top > window.innerHeight * 0.72 ? '1' : '0';
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    // capture phase → catches inner scroll containers (mobile) as well as window
    document.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    raf = requestAnimationFrame(update);
    return () => {
      document.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [containerRef]);

  return (
    <div ref={ref} aria-hidden className="aura-root pointer-events-none fixed inset-0 z-30 opacity-0">
      <span className="aura-blob aura-blob-a" />
      <span className="aura-blob aura-blob-b" />
      <span className="aura-blob aura-blob-c" />
    </div>
  );
}
