import { Cart, Product } from '../domain/entities/Cart.js'
import { CartRepository } from '../repositories/CartRepository.js'

export class CartService {
  constructor(private readonly repo: CartRepository) {}

  async addItem(
    sessionId: string,
    product: Product,
    quantity: number
  ): Promise<Cart> {
    let cart = await this.repo.findBySessionId(sessionId)
    if (!cart) {
      cart = new Cart(sessionId)
    }


    
    cart.addItem(product, quantity)
    await this.repo.save(cart)
    return cart
  }

  async getCart(sessionId: string): Promise<Cart | null> {
    return this.repo.findBySessionId(sessionId)
  }

  async removeItem(sessionId: string, productId: string): Promise<Cart> {
    const cart = await this.repo.findBySessionId(sessionId)
    if (!cart) {
      throw new Error('Cart not found')
    }

    cart.removeItem(productId)
    await this.repo.save(cart)
    return cart
  }

  async checkout(sessionId: string) {
    const cart = await this.repo.findBySessionId(sessionId)
    if (!cart || cart.cartItems.length === 0) {
      throw new Error('Cannot checkout empty cart')
    }

    const total = cart.total()
    cart.clear()
    await this.repo.save(cart)

    return {
      orderId: `ORDER-${Date.now()}`,
      total,
      checkedOutAt: new Date()
    }
  }

  
}
