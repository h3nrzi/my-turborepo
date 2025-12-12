import { MoneyVO } from '../value-objects/MoneyVO';

interface PricingInput {
  itemsPrice: MoneyVO;
  shippingThreshold?: number;
  shippingFlat?: number;
  taxRate?: number;
}

export class PricingService {
  static calculate({
    itemsPrice,
    shippingFlat = 10,
    shippingThreshold = 100,
    taxRate = 0.15,
  }: PricingInput) {
    const shippingPrice = itemsPrice.toNumber() > shippingThreshold ? 0 : shippingFlat;
    const taxPrice = MoneyVO.from(itemsPrice.toNumber() * taxRate);
    const totalPrice = itemsPrice.add(MoneyVO.from(shippingPrice)).add(taxPrice);

    return {
      itemsPrice: itemsPrice.toNumber(),
      shippingPrice: MoneyVO.from(shippingPrice).toNumber(),
      taxPrice: taxPrice.toNumber(),
      totalPrice: totalPrice.toNumber(),
    };
  }
}
