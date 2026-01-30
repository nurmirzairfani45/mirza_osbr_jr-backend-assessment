import { DomainError } from '../errors/DomainError.js'

export class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string = 'USD'
  ) {
    if (amount < 0) {
      throw new DomainError('Money amount cannot be negative')
    }
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new DomainError('Currency mismatch')
    }
    return new Money(this.amount + other.amount, this.currency)
  }

  multiply(quantity: number): Money {
    if (quantity <= 0) {
      throw new DomainError('Quantity must be positive')
    }
    return new Money(this.amount * quantity, this.currency)
  }
}
