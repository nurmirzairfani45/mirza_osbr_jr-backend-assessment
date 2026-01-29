import { Request, Response } from 'express'
import { CartService } from '../services/CartService.js'
import { Money } from '../domain/value-objects/Money.js'

interface CartResponseItem {
  product: {
    productId: string
    name: string
    price: {
      amount: number
      currency: string
    }
  }
  quantity: number
}

interface CartResponse {
  sessionId: string
  items: CartResponseItem[]
}

interface ServiceCartItem {
  product: { productId: string; name: string; price: Money }
  quantity: number
}

interface ServiceCart {
  sessionId: string
  cartItems: readonly ServiceCartItem[]
}

interface CheckoutResponse {
  orderId: string
  total: {
    amount: number
    currency: string
  }
  checkedOutAt: string
}

export class CartController {
  constructor(private readonly service: CartService) {}

  private getSessionId(req: Request): string {
    const { sessionId } = req.params
    if (typeof sessionId !== 'string') {
      throw new Error('Invalid or missing sessionId')
    }
    return sessionId
  }

  private formatCart(cart: ServiceCart): CartResponse {
    return {
      sessionId: cart.sessionId,
      items: cart.cartItems.map(item => ({
        product: {
          productId: item.product.productId,
          name: item.product.name,
          price: {
            amount: item.product.price.amount,
            currency: item.product.price.currency,
          },
        },
        quantity: item.quantity,
      })),
    }
  }

  addItem = async (
    req: Request,
    res: Response<CartResponse | { error: string }>
  ): Promise<void> => {
    try {
      const sessionId = this.getSessionId(req)
      const { productId, name, price, quantity } = req.body

      if (!productId || !name || price == null || quantity == null) {
        res.status(400).json({ error: 'Invalid request body' })
        return
      }

      const cart = await this.service.addItem(
        sessionId,
        { productId, name, price: new Money(Number(price)) },
        Number(quantity)
      )

      res.status(200).json(this.formatCart(cart))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      res.status(400).json({ error: message })
    }
  }

  getCart = async (
    req: Request,
    res: Response<CartResponse | { error: string }>
  ): Promise<void> => {
    try {
      const sessionId = this.getSessionId(req)
      const cart = await this.service.getCart(sessionId)

      if (!cart) {
        res.status(404).json({ error: 'Cart not found' })
        return
      }

      res.status(200).json(this.formatCart(cart))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      res.status(400).json({ error: message })
    }
  }

  removeItem = async (
    req: Request,
    res: Response<CartResponse | { error: string }>
  ): Promise<void> => {
    try {
      const sessionId = this.getSessionId(req)
      const { itemId } = req.params

      if (typeof itemId !== 'string') {
        res.status(400).json({ error: 'Invalid itemId' })
        return
      }

      const cart = await this.service.removeItem(sessionId, itemId)
      res.status(200).json(this.formatCart(cart))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      res.status(400).json({ error: message })
    }
  }

  checkout = async (
    req: Request,
    res: Response<CheckoutResponse | { error: string }>
  ): Promise<void> => {
    try {
      const sessionId = this.getSessionId(req)
      const result = await this.service.checkout(sessionId)

      res.status(200).json({
        orderId: result.orderId,
        total: {
          amount: result.total.amount,
          currency: result.total.currency,
        },
        checkedOutAt: result.checkedOutAt.toISOString(),
      })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      res.status(400).json({ error: message })
    }
  }
}
