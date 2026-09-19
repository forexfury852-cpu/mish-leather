# Worklog

---
Task ID: 1
Agent: Super Z (main agent)
Task: Build «چرم میش | MISH LEATHER» — cinematic luxury Persian e-commerce website (desktop home/shop/product + dedicated mobile experience) as a Next.js app.

Work Log:
- Loaded fullstack-dev + image-generation skills; initialized Next.js 16 project environment via init script.
- Generated 30 cinematic brand images via z-ai SDK batch script (scripts/gen-images.ts): hero, mobile hero, campaign, craftsmanship set, 5 category covers, 12 product shots, 3 product-detail/gallery shots, 4 Instagram lifestyle squares. Fixed API size constraints (32px multiples) and 429 rate limits (concurrency 2→3, exponential backoff).
- Self-hosted fonts in public/fonts: Vazirmatn (9 weights) + Marcellus; declared @font-face in globals.css.
- Design system in src/app/globals.css: ink/coal/espresso/leather/copper/cream tokens, display type scale, .lux-btn copper sweep, .lux-link underline, film-grain overlay, marquee/scroll-dot keyframes, outline text utilities, custom scrollbars. RTL (dir=rtl, lang=fa); no letter-spacing on Persian text.
- Data layer src/lib/data.ts: 12 products (Persian names, Toman prices, colors/sizes/materials/stories), 5 categories, testimonials, guarantees, craft steps, Persian-numeral helpers (toFa, faPrice).
- Store src/lib/store.ts (zustand): device/view/productId/shopCategory/cart/wishlist/booted.
- Motion primitives (src/components/fx): Reveal/LineMask/ClipReveal, ParallaxImage/ParallaxBox, marquee + SectionHead, custom cursor (pointer:fine), Preloader (counter + curtain wipe).
- Desktop (src/components/desktop): header (scroll-aware, cart badge), home (full-screen cinematic hero with staggered masked headline «اصالت، در جزئیات ساخته می‌شود», marquee, scroll-jacked horizontal categories, asymmetric New Collection, embla Best Sellers rail, split-screen campaign, ivory craftsmanship section with stats + process rows, signature showcase, guarantees, testimonials carousel, Instagram grid, newsletter, giant-watermark footer); shop (editorial hero, sticky filter tabs with layoutId underline, sort dropdown, offset 3-col grid, bespoke banner); product (vertical thumbs + main gallery, sticky info panel, colors/sizes/dimensions, qty, wishlist, accordions, craft parallax strip, related rail).
- Mobile (src/components/mobile): separate design — MobileHome (portrait hero, snap category carousel, full-bleed stacked collection, best-seller rail, campaign parallax, craft teaser, swipeable testimonials, compact footer), MobileShop (chip filters, immersive list, floating filter button + draggable bottom-sheet with sort/categories/price bands), MobileProduct (embla swipe gallery, rounded content sheet, sticky purchase CTA), BottomNav (5 items) + simulated status bar.
- Presentation shell: PresentationDock (desktop/mobile + home/shop/product), PhoneFrame (titanium frame, dynamic island, contain:paint so fixed UI anchors to the screen, container-type:size so cqh units match the frame), MobileStage captions; view transitions via AnimatePresence.
- Fixed bugs: wrong import path (./reveal), setState-in-effect lint errors (rAF-wrapped / removed redundant resets via key-based remount), svh→cqh for in-frame sizing, absolute→fixed for mobile floating UI.
- Verified end-to-end with agent-browser: desktop hero/categories/craft/collections/footer screenshots, shop filter+sort, product page, mobile frame home/shop/bottom-sheet — all functional; zero console errors; lint clean; dev.log clean after fixes.

Stage Summary:
- Deliverable: single-route Next.js app at src/app/page.tsx presenting desktop (home/shop/product) + dedicated mobile experience in a phone frame; switchable via bottom dock.
- 30 images in public/images, fonts in public/fonts; all assets self-hosted.
- Verification: lint 0 problems, no runtime errors in dev.log, browser-verified interactions (filters, sheet, carousels, wishlist/cart counters, view transitions).
