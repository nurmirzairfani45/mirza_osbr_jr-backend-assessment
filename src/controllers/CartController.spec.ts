import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Request, Response } from 'express'
import { CartController } from './CartController'
import { CartService } from '../services/CartService'

type MockResponse = Response & {
  status: ReturnType<typeof vi.fn>
  json: ReturnType<typeof vi.fn>
}

describe('CartController', () => {
  let controller: CartController
  let mockService: CartService

  beforeEach(() => {
    mockService = {
      addItem: vi.fn(),
      getCart: vi.fn(),
      removeItem: vi.fn(),
      checkout: vi.fn(),
    } as unknown as CartService

    controller = new CartController(mockService)
  })

  function createRes(): MockResponse {
    return {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as MockResponse
  }

  it('addItem calls service.addItem and returns cart', async () => {
    const req = {
      params: { sessionId: 's1' },
      body: { productId: 'p1', name: 'Test', price: 10, quantity: 2 },
    } as Partial<Request> as Request

    const res = createRes()

    vi.spyOn(mockService, 'addItem').mockResolvedValue({
      sessionId: 's1',
      cartItems: [],
    })

    await controller.addItem(req, res)

    expect(mockService.addItem).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalled()
  })

  it('getCart calls service.getCart and returns cart', async () => {
    const req = {
      params: { sessionId: 's1' },
    } as Partial<Request> as Request

    const res = createRes()

    vi.spyOn(mockService, 'getCart').mockResolvedValue({
      sessionId: 's1',
      cartItems: [],
    })

    await controller.getCart(req, res)

    expect(mockService.getCart).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalled()
  })

  it('removeItem calls service.removeItem and returns cart', async () => {
    const req = {
      params: { sessionId: 's1', itemId: 'p1' },
    } as Partial<Request> as Request

    const res = createRes()

    vi.spyOn(mockService, 'removeItem').mockResolvedValue({
      sessionId: 's1',
      cartItems: [],
    })

    await controller.removeItem(req, res)

    expect(mockService.removeItem).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalled()
  })

  it('checkout calls service.checkout and returns result', async () => {
    const req = {
      params: { sessionId: 's1' },
    } as Partial<Request> as Request

    const res = createRes()

    vi.spyOn(mockService, 'checkout').mockResolvedValue({
      orderId: 'O1',
      total: { amount: 100, currency: 'USD' },
      checkedOutAt: new Date(),
    })

    await controller.checkout(req, res)

    expect(mockService.checkout).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalled()
  })
})
