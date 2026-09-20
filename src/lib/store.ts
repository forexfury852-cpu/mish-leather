import { create } from 'zustand';
import type { CategoryKey } from './data';

export type View = 'home' | 'shop' | 'product';

interface UIState {
  view: View;
  productId: string;
  shopCategory: 'all' | CategoryKey;
  cartCount: number;
  wishlist: string[];
  booted: boolean;
  setBooted: () => void;
  goHome: () => void;
  goShop: (category?: 'all' | CategoryKey) => void;
  goProduct: (id: string) => void;
  addToCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

export const useUI = create<UIState>((set, get) => ({
  view: 'home',
  productId: 'arta-messenger',
  shopCategory: 'all',
  cartCount: 0,
  wishlist: [],
  booted: false,
  setBooted: () => set({ booted: true }),
  goHome: () => set({ view: 'home' }),
  goShop: (category) =>
    set((s) => ({ view: 'shop', shopCategory: category ?? s.shopCategory })),
  goProduct: (id) => set({ productId: id, view: 'product' }),
  addToCart: () => set((s) => ({ cartCount: s.cartCount + 1 })),
  toggleWishlist: (id) =>
    set((s) => ({
      wishlist: s.wishlist.includes(id)
        ? s.wishlist.filter((w) => w !== id)
        : [...s.wishlist, id],
    })),
  isWishlisted: (id) => get().wishlist.includes(id),
}));
