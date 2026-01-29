// CartService.spec.ts
import { CartService } from './CartService';
import { InMemoryCartRepository } from '../repositories/InMemoryCartRepository';
import { Money } from '../domain/value-objects/Money';
import { Product } from '../domain/entities/Cart';
import { describe, it, expect, beforeEach } from 'vitest';


describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    service = new CartService(new InMemoryCartRepository());
  });

  const product: Product = { productId: 'p1', name: 'Test', price: new Money(10) };

  it('should add item to cart', async () => {
    const cart = await service.addItem('session1', product, 2);
    expect(cart.cartItems[0].quantity).toBe(2);
  });

  it('should remove item from cart', async () => {
    await service.addItem('session1', product, 2);
    const cart = await service.removeItem('session1', 'p1');
    expect(cart.cartItems.length).toBe(0);
  });

  it('should throw error when removing non-existing cart', async () => {
    await expect(service.removeItem('no-session', 'p1')).rejects.toThrow('Cart not found');
  });

  it('should checkout cart', async () => {
    await service.addItem('session1', product, 2);
    const result = await service.checkout('session1');
    expect(result.total.amount).toBe(20);
    expect(result.orderId).toMatch(/^ORDER-/);
  });

  it('should throw error when checking out empty cart', async () => {
    await expect(service.checkout('session1')).rejects.toThrow('Cannot checkout empty cart');
  });
});
