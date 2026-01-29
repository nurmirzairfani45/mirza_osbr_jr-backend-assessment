# Backend Service (Typescript) - Shopping Cart

A **TypeScript-based shopping cart REST API** demonstrating clean code practices, domain modeling, and basic backend design patterns. This project was developed as part of a Junior Backend Developer technical assessment.

---

## Overview

This project implements a simple **shopping cart API** with the following functionality:

- Add products to a cart  
- Retrieve cart contents  
- Remove products from a cart  
- Checkout a cart and calculate the total  

The focus is on **clean code, separation of concerns, unit testing**, and **domain-driven design principles**.

---

## Features

- RESTful API for cart management  
- In-memory repository (no database required)  
- Value object for handling money (`Money`)  
- Domain entities: `Cart`, `CartItem`, `Product`  
- Unit tests for entities, services, and controllers  

---

## Tech Stack

- Node.js  
- TypeScript  
- Express.js (HTTP server)  
- Vitest (unit testing)  

---

## Project Structure
src/
│
├─ controllers/
│ ├─ CartController.spec.ts
│ └─ CartController.ts
│
├─ domain/
│ ├─ entities/
│ │ ├─ Cart.spec.ts
│ │ └─ Cart.ts
│ ├─ value-objects/
│ │ ├─ Money.ts
│ │ └─ Money.spec.ts
│ └─ errors/
│
├─ services/
│ ├─ CartService.spec.ts
│ └─ CartService.ts
│
├─ repositories/
│ ├─ CartRepository.ts
│ ├─ InMemoryCartRepository.spec.ts
│ └─ InMemoryCartRepository.ts
│
└─ server.ts

- **Controllers**: Handle HTTP requests and responses  
- **Services**: Contain business logic (e.g., cart operations)  
- **Repositories**: Data access layer (in-memory implementation)  
- **Domain**: Entities, value objects, and business rules  

---

## API Endpoints

| Method | Endpoint                          | Description                   | Request Body                                   |
|--------|----------------------------------|-------------------------------|-----------------------------------------------|
| POST   | `/api/cart/:sessionId/items`      | Add a product to the cart     | `{ productId, name, price, quantity }`       |
| GET    | `/api/cart/:sessionId`            | Get cart contents             | N/A                                           |
| DELETE | `/api/cart/:sessionId/items/:itemId` | Remove product from cart      | N/A                                           |
| POST   | `/api/cart/:sessionId/checkout`   | Checkout cart                 | N/A                                           |

### Installation

```bash
git clone <https://github.com/nurmirzairfani45/mirza_osbr_jr-backend-assessment.git>
cd <osbr_task1>
npm install
```
### Running the Server
npm run dev

The API will run on http://localhost:3000.

### API Endpoints
1. Add Item to Cart

POST http://localhost:3000/api/cart/test-session/items

Request Body

{
  "productId": "p1",
  "name": "Coffee",
  "price": 5,
  "quantity": 2
}


Response

{
  "sessionId": "test-session",
  "items": [
    {
      "product": {
        "productId": "p1",
        "name": "Coffee",
        "price": { "amount": 5, "currency": "USD" }
      },
      "quantity": 2
    }
  ]
}

2. Get Cart Contents

GET http://localhost:3000/api/cart/test-session

Response

{
  "sessionId": "test-session",
  "items": [
    {
      "product": {
        "productId": "p1",
        "name": "Coffee",
        "price": { "amount": 5, "currency": "USD" }
      },
      "quantity": 2
    }
  ]
}

3. Remove Item from Cart

DELETE http://localhost:3000/api/cart/test-session/items/p1

Response

{
  "sessionId": "test-session",
  "items": []
}

4. Checkout Cart

POST http://localhost:3000/api/cart/test-session/checkout

Response

{
  "orderId": "ORDER-1769671886357",
  "total": { "amount": 10, "currency": "USD" },
  "checkedOutAt": "2026-01-29T07:31:26.357Z"
}

### Domain & Design

Entities

Cart — Tracks cart items and session

CartItem — Holds product and quantity

Product — Represents a purchasable product

Value Objects

Money — Represents price/amount with currency

Service Layer

CartService — Encapsulates all cart business logic

Repository Pattern

CartRepository interface

InMemoryCartRepository — Stores cart data in memory

Controller

CartController — Maps HTTP requests to service methods

### Running Tests
npm test

Unit tests cover Cart, CartService, Money, CartController, and InMemoryCartRepository.
All tests currently pass.

### Notes
Prices must be positive numbers.
Quantity must be positive.
Checkout clears the cart and returns an order with total and orderId.
In-memory storage resets when the server restarts.

### Author
Nur Mirza Irfani Binti Ahmad Hafizal
GitHub: https://github.com/nurmirzairfani45/mirza_osbr_jr-backend-assessment