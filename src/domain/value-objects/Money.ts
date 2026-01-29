export class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string = 'USD'
  ) {
    if (amount < 0) {
      throw new Error('Money amount cannot be negative')
    }
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Currency mismatch')
    }
    return new Money(this.amount + other.amount, this.currency)
  }

  multiply(quantity: number): Money {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive')
    }
    return new Money(this.amount * quantity, this.currency)
  }
}
