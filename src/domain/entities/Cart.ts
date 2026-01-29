import { Money } from '../value-objects/Money.js'

export interface Product {
  productId: string
  name: string
  price: Money
}

export class CartItem {
  constructor(
    public readonly product: Product,
    private _quantity: number
  ) {
    if (_quantity <= 0) {
      throw new Error('Quantity must be positive')
    }
  }

  get quantity(): number {
    return this._quantity
  }

  increaseQuantity(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be positive')
    }
    this._quantity += amount
  }

  subtotal(): Money {
    return this.product.price.multiply(this._quantity)
  }
}

export class Cart {
  private items: CartItem[] = []

  constructor(public readonly sessionId: string) {}

  get cartItems(): ReadonlyArray<CartItem> {
    return this.items
  }

  addItem(product: Product, quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive')
    }

    const existing = this.items.find(
      item => item.product.productId === product.productId
    )

    if (existing) {
      existing.increaseQuantity(quantity)
    } else {
      this.items.push(new CartItem(product, quantity))
    }
  }

  removeItem(productId: string): void {
    const index = this.items.findIndex(
      item => item.product.productId === productId
    )
    if (index === -1) {
      throw new Error('Item not found')
    }
    this.items.splice(index, 1)
  }

  total(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.subtotal()),
      new Money(0)
    )
  }

  clear(): void {
    this.items = []
  }
}
