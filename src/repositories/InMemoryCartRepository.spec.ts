import { InMemoryCartRepository } from './InMemoryCartRepository'
import { Cart } from '../domain/entities/Cart'
import { describe, it, expect } from 'vitest'

describe('InMemoryCartRepository', () => {
  it('should save and retrieve a cart', async () => {
    const repo = new InMemoryCartRepository()
    const cart = new Cart('session1')

    await repo.save(cart)
    const found = await repo.findBySessionId('session1')

    expect(found).not.toBeNull()
    expect(found?.sessionId).toBe('session1')
  })

  it('should return null if cart does not exist', async () => {
    const repo = new InMemoryCartRepository()
    const found = await repo.findBySessionId('nonexistent')
    expect(found).toBeNull()
  })
})
