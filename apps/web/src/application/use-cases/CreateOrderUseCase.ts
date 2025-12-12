import type OrderAggregate from 'domain/aggregates/OrderAggregate';
import type { CartState } from 'domain/aggregates/CartAggregate';
import type { PaymentResult, ShippingAddress } from 'domain/aggregates/OrderAggregate';
import { PricingService } from 'domain/services/PricingService';
import { MoneyVO } from 'domain/value-objects/MoneyVO';

interface OrderRepository {
  create(order: Partial<OrderAggregate>): Promise<OrderAggregate>;
}

export class CreateOrderUseCase {
  private readonly repository: OrderRepository;

  constructor(repository: OrderRepository) {
    this.repository = repository;
  }

  async execute(params: {
    cart: CartState;
    paymentMethod: string;
    shippingAddress: ShippingAddress;
    paymentResult?: PaymentResult;
  }): Promise<OrderAggregate> {
    const itemsPrice = params.cart.orderItems.reduce(
      (acc, item) => acc.add(MoneyVO.from(item.price).multiply(item.qty)),
      MoneyVO.zero(),
    );

    const pricing = PricingService.calculate({ itemsPrice });

    return this.repository.create({
      orderItems: params.cart.orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      paymentMethod: params.paymentMethod,
      shippingAddress: params.shippingAddress,
      paymentResult: params.paymentResult,
      ...pricing,
    });
  }
}
