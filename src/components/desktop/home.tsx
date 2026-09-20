'use client';

import { Hero } from './sections/hero';
import { Categories } from './sections/categories';
import { NewCollection, BestSellers, Campaign, ShopDoorway } from './sections/collections';
import { Craft, Showcase, Guarantees } from './sections/craft';
import { Testimonials, InstagramGallery, Newsletter } from './sections/social';
import { Footer } from './footer';
import { Marquee } from '@/components/fx/section';

const MARQUEE_ITEMS = [
  'دوخت دست',
  'MISH LEATHER',
  'چرم طبیعی گاوی',
  'Est. 2000',
  'ضمانت مادام‌العمر دوخت',
  'Handcrafted',
  'ساخته‌شده در تهران',
  'Dhaki Vegetable Tanned',
];

export function Home() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} dark={false} />
      <Categories />
      <NewCollection />
      <BestSellers />
      <Campaign />
      <Craft />
      <Showcase />
      <Guarantees />
      <Testimonials />
      <InstagramGallery />
      <ShopDoorway />
      <Newsletter />
      <Footer />
    </>
  );
}
