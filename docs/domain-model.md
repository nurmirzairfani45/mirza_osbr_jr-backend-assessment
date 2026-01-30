### Domain Model Design
Entities & Value Objects
1. Cart

Properties:
sessionId: string — unique identifier for the cart session
items: CartItem[] — array of cart items

Business Rules:
Can add items, remove items, calculate total, and clear cart
Adding an existing product increases its quantity
Cannot add items with zero or negative quantity

Design Decisions:
Cart encapsulates its items and enforces quantity rules
Reduces external manipulation, ensuring correct totals and business logic

2. CartItem

Properties:
product: Product — the associated product
quantity: number — number of units

Business Rules:
Quantity must be positive
Can increase quantity, subtotal calculated via price × quantity
Design Decisions:
Encapsulates quantity changes to prevent invalid states
Ensures subtotal calculation is always correct

3. Product (interface)

Properties:
productId: string
name: string
price: Money

Design Decisions:
Lightweight interface; price is handled by Money for precision and currency safety

4. Money (Value Object)

Properties:
amount: number — monetary value (non-negative)
currency: string — defaults to 'USD'

Business Rules:
Cannot be negative
Addition only allowed for same currency
Multiplication factor must be positive

Design Decisions:
Encapsulates money arithmetic to prevent errors in totals and conversions
Keeps domain logic type-safe and precise

# Relationship
Cart
 ├─ CartItem[]
 │   └─ Product
 │       └─ Money
 └─ total(): Money

Summary:
This domain model ensures business rules are enforced at the object level and calculations are consistent using value objects.