import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type Product from 'domain/entities/ProductEntity';
import {
  createEmptyCart,
  recalculateCartTotals,
  type CartState,
  type ShippingAddress,
} from 'domain/aggregates/CartAggregate';
import { loadCart, saveCart } from 'infrastructure/data/cartStorage';

const initialState: CartState = loadCart() ?? createEmptyCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (cart, action: PayloadAction<Product>) => {
      const newItem = action.payload;
      const existingItem = cart.orderItems.find(
        (item) => item._id === newItem._id,
      );

      if (existingItem) {
        cart.orderItems = cart.orderItems.map((item) =>
          item._id === newItem._id ? newItem : item,
        );
      } else {
        cart.orderItems.push(newItem);
      }

      const updatedCart = recalculateCartTotals(cart);
      Object.assign(cart, updatedCart);
      saveCart(cart);
    },

    removeFromCart: (cart, action: PayloadAction<{ _id: string }>) => {
      cart.orderItems = cart.orderItems.filter(
        (item) => item._id !== action.payload._id,
      );

      const updatedCart = recalculateCartTotals(cart);
      Object.assign(cart, updatedCart);
      saveCart(cart);
    },

    resetCart: (cart) => {
      const resetCartState = recalculateCartTotals(createEmptyCart());
      Object.assign(cart, resetCartState);
      saveCart(cart);
    },

    saveShippingAddress: (cart, action: PayloadAction<ShippingAddress>) => {
      cart.shippingAddress = action.payload;

      const updatedCart = recalculateCartTotals(cart);
      Object.assign(cart, updatedCart);
      saveCart(cart);
    },

    savePaymentMethod: (cart, action: PayloadAction<string>) => {
      cart.paymentMethod = action.payload;

      const updatedCart = recalculateCartTotals(cart);
      Object.assign(cart, updatedCart);
      saveCart(cart);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  resetCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice;
