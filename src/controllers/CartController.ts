import { Request, Response } from 'express'
import { CartService } from '../services/CartService.js'
import { Money } from '../domain/value-objects/Money.js'

export class CartController {
  constructor(private readonly service: CartService) {}

  // extract and validate sessionId from request params

  private getSessionId(req: Request): string {
    const { sessionId } = req.params
    if (typeof sessionId !== 'string') {
      throw new Error('Invalid or missing sessionId')
    }
    return sessionId
  }

  //formartCart for API response
  private formatCart(cart: any) {
    return {
      sessionId: cart.sessionId,
      items: cart.cartItems.map((item: any) => ({
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

  //POST; adding item to cart 
  addItem = async (
    req: Request,
    res: Response<any, Record<string, any>>
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
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  //GET; retrieving cart contents
  getCart = async (
    req: Request,
    res: Response<any, Record<string, any>>
  ): Promise<void> => {
    try {
      const sessionId = this.getSessionId(req)
      const cart = await this.service.getCart(sessionId)
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' })
        return
      }
      res.status(200).json(this.formatCart(cart))
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  
  //DELETE; removing item(s) from cart
  removeItem = async (
    req: Request,
    res: Response<any, Record<string, any>>
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
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  //POST; checkout the cart
  checkout = async (
    req: Request,
    res: Response<any, Record<string, any>>
  ): Promise<void> => {
    try {
      const sessionId = this.getSessionId(req)
      const result = await this.service.checkout(sessionId)
      res.status(200).json(result)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
