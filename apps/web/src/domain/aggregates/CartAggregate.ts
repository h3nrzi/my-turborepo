import type ProductEntity from '../entities/ProductEntity';
import { PricingService } from '../services/PricingService';
import { MoneyVO } from '../value-objects/MoneyVO';

export interface ShippingAddress {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface CartState {
  itemsPrice: number;
  orderItems: ProductEntity[];
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
    (acc, item) => acc.add(MoneyVO.from(item.price).multiply(item.qty)),
    MoneyVO.zero(),
  );

  const pricing = PricingService.calculate({ itemsPrice });

  return {
    ...cart,
    ...pricing,
  };
};
