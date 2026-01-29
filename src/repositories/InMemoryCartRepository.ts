import { CartRepository } from './CartRepository.js';
import { Cart } from '../domain/entities/Cart.js';

export class InMemoryCartRepository implements CartRepository {
  private carts = new Map<string, Cart>();

  async findBySessionId(sessionId: string): Promise<Cart | null> {
    return this.carts.get(sessionId) || null;
  }

  async save(cart: Cart): Promise<void> {
    this.carts.set(cart.sessionId, cart);
  }
}
