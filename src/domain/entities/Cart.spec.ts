import { Cart, Product } from './Cart'
import { Money } from '../value-objects/Money'
import { describe, it, expect } from 'vitest'

describe('Cart', () => {
  const product: Product = { productId: 'p1', name: 'Test', price: new Money(10) }

  it('should add a new item to the cart', () => {
    const cart = new Cart('session1')
    cart.addItem(product, 2)
    expect(cart.cartItems.length).toBe(1)
    expect(cart.cartItems[0].quantity).toBe(2)
  })

  it('should increase quantity if item already exists', () => {
    const cart = new Cart('session1')
    cart.addItem(product, 2)
    cart.addItem(product, 3)
    expect(cart.cartItems.length).toBe(1)
    expect(cart.cartItems[0].quantity).toBe(5)
  })

  it('should remove item from cart', () => {
    const cart = new Cart('session1')
    cart.addItem(product, 2)
    cart.removeItem('p1')
    expect(cart.cartItems.length).toBe(0)
  })

  it('should calculate total correctly', () => {
    const cart = new Cart('session1')
    cart.addItem(product, 2) // 10*2=20
    cart.addItem({ productId: 'p2', name: 'B', price: new Money(5) }, 3) // 5*3=15
    const total = cart.total()
    expect(total.amount).toBe(35)
  })

  it('should clear the cart', () => {
    const cart = new Cart('session1')
    cart.addItem(product, 2)
    cart.clear()
    expect(cart.cartItems.length).toBe(0)
  })
})
