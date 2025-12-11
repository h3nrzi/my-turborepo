import type { CartState } from '../domain/cart';

const CART_STORAGE_KEY = 'cart';

export const loadCart = (): CartState | null => {
  const persistedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!persistedCart) {
    return null;
  }

  try {
    return JSON.parse(persistedCart);
  } catch (error) {
    console.warn('Failed to parse persisted cart', error);
    return null;
  }
};

export const saveCart = (cart: CartState) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};
