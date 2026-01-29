import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CartController } from './CartController';
import { CartService } from '../services/CartService';

describe('CartController', () => {
  let controller: CartController;
  let mockService: CartService;

  beforeEach(() => {
    // Create a fake CartService with mock functions
    mockService = {
      addItem: vi.fn(),
      getCart: vi.fn(),
      removeItem: vi.fn(),
      checkout: vi.fn()
    } as unknown as CartService;

    controller = new CartController(mockService);
  });

  it('addItem calls service.addItem and returns cart', async () => {
    const req: any = {
      params: { sessionId: 's1' },
      body: { productId: 'p1', name: 'Test', price: 10, quantity: 2 }
    };
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    (mockService.addItem as any).mockResolvedValue({ cartItems: [] });

    await controller.addItem(req, res);

    expect(mockService.addItem).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('getCart calls service.getCart and returns cart', async () => {
    const req: any = { params: { sessionId: 's1' } };
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    (mockService.getCart as any).mockResolvedValue({ cartItems: [] });

    await controller.getCart(req, res);

    expect(mockService.getCart).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('removeItem calls service.removeItem and returns cart', async () => {
    const req: any = { params: { sessionId: 's1', itemId: 'p1' } };
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    (mockService.removeItem as any).mockResolvedValue({ cartItems: [] });

    await controller.removeItem(req, res);

    expect(mockService.removeItem).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('checkout calls service.checkout and returns result', async () => {
    const req: any = { params: { sessionId: 's1' } };
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    (mockService.checkout as any).mockResolvedValue({ orderId: 'O1', total: 100 });

    await controller.checkout(req, res);

    expect(mockService.checkout).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
