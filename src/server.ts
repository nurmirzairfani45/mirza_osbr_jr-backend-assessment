import express from 'express'
import { CartController } from './controllers/CartController.js'
import { CartService } from './services/CartService.js'
import { InMemoryCartRepository } from './repositories/InMemoryCartRepository.js'

const app = express()
app.use(express.json())

const repo = new InMemoryCartRepository()
const service = new CartService(repo)
const controller = new CartController(service)

app.post('/api/cart/:sessionId/items', controller.addItem)
app.get('/api/cart/:sessionId', controller.getCart)
app.post('/api/cart/:sessionId/checkout', controller.checkout)
app.delete('/api/cart/:sessionId/items/:itemId', controller.removeItem);

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
