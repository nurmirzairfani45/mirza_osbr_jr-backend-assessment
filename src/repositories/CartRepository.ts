import { Cart } from '../domain/entities/Cart.js'

export interface CartRepository {
  findBySessionId(sessionId: string): Promise<Cart | null>
  save(cart: Cart): Promise<void>
}
