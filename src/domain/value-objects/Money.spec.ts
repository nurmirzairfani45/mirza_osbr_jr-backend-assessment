// Money.spec.ts
import { Money } from './Money';
import { describe, it, expect, beforeEach } from 'vitest';


describe('Money', () => {
  it('should add two Money objects with same currency', () => {
    const a = new Money(10);
    const b = new Money(5);
    const result = a.add(b);
    expect(result.amount).toBe(15);
    expect(result.currency).toBe('USD');
  });

  it('should throw error for currency mismatch', () => {
    const a = new Money(10, 'USD');
    const b = new Money(5, 'EUR');
    expect(() => a.add(b)).toThrow('Currency mismatch');
  });

  it('should multiply amount correctly', () => {
    const a = new Money(10);
    const result = a.multiply(3);
    expect(result.amount).toBe(30);
  });

  it('should throw error if multiply with non-positive quantity', () => {
    const a = new Money(10);
    expect(() => a.multiply(0)).toThrow('Quantity must be positive');
  });
});
