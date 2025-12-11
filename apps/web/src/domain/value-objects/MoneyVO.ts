export class MoneyVO {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static zero(): MoneyVO {
    return new MoneyVO(0);
  }

  static from(value: number): MoneyVO {
    return new MoneyVO(Number(value) || 0);
  }

  add(other: MoneyVO): MoneyVO {
    return new MoneyVO(this.round(this.value + other.value));
  }

  multiply(quantity: number): MoneyVO {
    return new MoneyVO(this.round(this.value * quantity));
  }

  toNumber(): number {
    return this.round(this.value);
  }

  private round(amount: number): number {
    return Number(amount.toFixed(2));
  }
}
