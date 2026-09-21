import { create } from 'zustand';
import type { CategoryKey } from './data';

export type View = 'home' | 'shop' | 'product';

export interface CartItem {
  key: string; // productId + color + size — unique per variant
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  colorName: string;
  colorHex: string;
  size: string | null;
}

interface UIState {
  view: View;
  productId: string;
  shopCategory: 'all' | CategoryKey;
  /* cart */
  cartCount: number;
  cart: CartItem[];
  cartOpen: boolean;
  /* search */
  searchOpen: boolean;
  /* wishlist */
  wishlist: string[];
  wishlistOpen: boolean;
  /* checkout */
  checkoutOpen: boolean;
  /* toast */
  toast: string | null;
  /* hydration from localStorage */
  hydrated: boolean;
  hydrate: () => void;
  booted: boolean;
  setBooted: () => void;
  goHome: () => void;
  goShop: (category?: 'all' | CategoryKey) => void;
  goProduct: (id: string) => void;
  /* cart actions */
  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'key' | 'qty'>, qty?: number) => void;
  removeFromCart: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  /* search actions */
  setSearchOpen: (open: boolean) => void;
  /* wishlist drawer */
  setWishlistOpen: (open: boolean) => void;
  /* checkout sheet */
  setCheckoutOpen: (open: boolean) => void;
  /* toast */
  showToast: (message: string) => void;
  /* wishlist */
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

/* ---------- localStorage persistence (cart + wishlist survive refresh) ---------- */
const CART_KEY = 'mish-cart-v1';
const WISH_KEY = 'mish-wishlist-v1';

const saveCart = (cart: CartItem[]) => {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    /* storage unavailable (private mode) — cart just stays in memory */
  }
};

const saveWishlist = (wishlist: string[]) => {
  try {
    window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  } catch {
    /* same as above */
  }
};

export const useUI = create<UIState>((set, get) => ({
  view: 'home',
  productId: 'arta-messenger',
  shopCategory: 'all',
  cartCount: 0,
  cart: [],
  cartOpen: false,
  searchOpen: false,
  wishlist: [],
  wishlistOpen: false,
  checkoutOpen: false,
  toast: null,
  hydrated: false,

  hydrate: () =>
    set(() => {
      if (typeof window === 'undefined') return { hydrated: true };
      let cart: CartItem[] = [];
      let wishlist: string[] = [];
      try {
        const rawCart = window.localStorage.getItem(CART_KEY);
        if (rawCart) {
          const parsed = JSON.parse(rawCart) as CartItem[];
          if (Array.isArray(parsed)) cart = parsed.filter((c) => c && c.key && c.qty > 0);
        }
        const rawWish = window.localStorage.getItem(WISH_KEY);
        if (rawWish) {
          const parsedW = JSON.parse(rawWish) as string[];
          if (Array.isArray(parsedW)) wishlist = parsedW;
        }
      } catch {
        /* corrupted storage — start fresh */
      }
      return {
        hydrated: true,
        cart,
        cartCount: cart.reduce((n, c) => n + c.qty, 0),
        wishlist,
      };
    }),

  booted: false,
  setBooted: () => set({ booted: true }),
  goHome: () => set({ view: 'home' }),
  goShop: (category) =>
    set((s) => ({ view: 'shop', shopCategory: category ?? s.shopCategory })),
  goProduct: (id) => set({ productId: id, view: 'product' }),

  setCartOpen: (open) => set({ cartOpen: open }),

  addToCart: (item, qty = 1) =>
    set((s) => {
      const key = `${item.productId}|${item.colorHex}|${item.size ?? '-'}`;
      const existing = s.cart.find((c) => c.key === key);
      const cart = existing
        ? s.cart.map((c) => (c.key === key ? { ...c, qty: c.qty + qty } : c))
        : [...s.cart, { ...item, key, qty }];
      const cartCount = cart.reduce((n, c) => n + c.qty, 0);
      if (get().hydrated) saveCart(cart);
      return { cart, cartCount };
    }),

  removeFromCart: (key) =>
    set((s) => {
      const cart = s.cart.filter((c) => c.key !== key);
      if (get().hydrated) saveCart(cart);
      return { cart, cartCount: cart.reduce((n, c) => n + c.qty, 0) };
    }),

  setQty: (key, qty) =>
    set((s) => {
      if (qty <= 0) {
        const cart = s.cart.filter((c) => c.key !== key);
        if (get().hydrated) saveCart(cart);
        return { cart, cartCount: cart.reduce((n, c) => n + c.qty, 0) };
      }
      const cart = s.cart.map((c) => (c.key === key ? { ...c, qty } : c));
      if (get().hydrated) saveCart(cart);
      return { cart, cartCount: cart.reduce((n, c) => n + c.qty, 0) };
    }),

  clearCart: () =>
    set((s) => {
      if (get().hydrated) saveCart([]);
      return { cart: [], cartCount: 0 };
    }),

  setSearchOpen: (open) => set({ searchOpen: open }),

  setWishlistOpen: (open) => set({ wishlistOpen: open }),

  setCheckoutOpen: (open) => set({ checkoutOpen: open }),

  showToast: (message) => {
    set({ toast: message });
    window.setTimeout(() => {
      // only clear if no newer toast replaced this one
      if (get().toast === message) set({ toast: null });
    }, 2600);
  },

  toggleWishlist: (id) =>
    set((s) => {
      const wishlist = s.wishlist.includes(id)
        ? s.wishlist.filter((w) => w !== id)
        : [...s.wishlist, id];
      if (get().hydrated) saveWishlist(wishlist);
      return { wishlist };
    }),
  isWishlisted: (id) => get().wishlist.includes(id),
}));

export const cartTotal = (cart: CartItem[]) => cart.reduce((sum, c) => sum + c.price * c.qty, 0);
