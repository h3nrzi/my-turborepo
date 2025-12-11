import type Product from '../../../types/Product';

export interface ShippingAddress {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface CartState {
  itemsPrice: number;
  orderItems: Product[];
  paymentMethod?: string;
  shippingAddress?: ShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export const createEmptyCart = (): CartState => ({
  orderItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  shippingAddress: undefined,
  paymentMethod: undefined,
});

export const recalculateCartTotals = (cart: CartState): CartState => {
  const itemsPrice = cart.orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    ...cart,
    itemsPrice: Number(itemsPrice.toFixed(2)),
    shippingPrice: Number(shippingPrice.toFixed(2)),
    taxPrice: Number(taxPrice.toFixed(2)),
    totalPrice: Number(totalPrice.toFixed(2)),
  };
};
