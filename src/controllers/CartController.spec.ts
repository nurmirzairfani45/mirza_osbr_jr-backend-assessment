import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Request, Response } from 'express'
import { CartController } from './CartController'
import { CartService } from '../services/CartService'
import { Money } from '../domain/value-objects/Money'

interface CartItemMock {
  product: { productId: string; name: string; price: Money }
  quantity: number
}

interface CartMock {
  sessionId: string
  cartItems: CartItemMock[]
}

interface CheckoutMock {
  orderId: string
  total: Money
  checkedOutAt: Date
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

  function createRes(): Response {
    return {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response
  }

  it('addItem calls service.addItem and returns cart', async () => {
    const req = {
      params: { sessionId: 's1' },
      body: { productId: 'p1', name: 'Test', price: 10, quantity: 2 },
    } as Partial<Request> as Request

    const res = createRes()
    const cartMock: CartMock = { sessionId: 's1', cartItems: [] }

    // no type errors here
    ;(mockService.addItem as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(cartMock)

    await controller.addItem(req, res)

    expect(mockService.addItem).toHaveBeenCalledWith(
      's1',
      { productId: 'p1', name: 'Test', price: new Money(10) },
      2
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ sessionId: 's1', items: [] })
  })

  it('getCart calls service.getCart and returns cart', async () => {
    const req = { params: { sessionId: 's1' } } as Partial<Request> as Request
    const res = createRes()
    const cartMock: CartMock = { sessionId: 's1', cartItems: [] }

    ;(mockService.getCart as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(cartMock)

    await controller.getCart(req, res)

    expect(mockService.getCart).toHaveBeenCalledWith('s1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ sessionId: 's1', items: [] })
  })

  it('removeItem calls service.removeItem and returns cart', async () => {
    const req = { params: { sessionId: 's1', itemId: 'p1' } } as Partial<Request> as Request
    const res = createRes()
    const cartMock: CartMock = { sessionId: 's1', cartItems: [] }

    ;(mockService.removeItem as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(cartMock)

    await controller.removeItem(req, res)

    expect(mockService.removeItem).toHaveBeenCalledWith('s1', 'p1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ sessionId: 's1', items: [] })
  })

  it('checkout calls service.checkout and returns result', async () => {
    const req = { params: { sessionId: 's1' } } as Partial<Request> as Request
    const res = createRes()
    const checkoutMock: CheckoutMock = {
      orderId: 'O1',
      total: new Money(100, 'USD'),
      checkedOutAt: new Date(),
    }

    ;(mockService.checkout as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(checkoutMock)

    await controller.checkout(req, res)

    expect(mockService.checkout).toHaveBeenCalledWith('s1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      orderId: 'O1',
      total: { amount: 100, currency: 'USD' },
      checkedOutAt: checkoutMock.checkedOutAt.toISOString(),
    })
  })
})
