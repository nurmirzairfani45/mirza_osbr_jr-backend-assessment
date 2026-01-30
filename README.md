# TASK1; Backend Service (Typescript) - Shopping Cart

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

### Architecture Overview

Controller → Service → Repository → Domain

**Layer interaction**
- **Controller:** Handles HTTP requests, validates inputs, returns responses
- **Service:** Contains business logic, calls repository
- **Repository:** Data access (in-memory)
- **Domain:** Entities and value objects encapsulate business rules

**Diagram (simplified)**

Client → CartController → CartService → InMemoryCartRepository → Cart/CartItem/Money

### Design Patterns Used

1. **Repository Pattern**
- CartRepository interface + `InMemoryCartRepository`
- Purpose: Abstracts data access, allows swapping DB later
2. **Service Layer**
- CartService contains business logic
- Purpose: Separates business rules from HTTP layer
3. **Value Object**
- Money object
- Purpose: Ensures currency consistency and immutability


### Running Tests
npm test

Unit tests cover Cart, CartService, Money, CartController, and InMemoryCartRepository.
All tests currently pass.

### Notes
Prices must be positive numbers.
Quantity must be positive.
Checkout clears the cart and returns an order with total and orderId.
In-memory storage resets when the server restarts.


# TASK2; GitHub Actions CI Pipeline

A basic CI pipeline was implemented using GitHub Actions to automate code
quality checks and testing. The goal is to catch errors early and maintain
code quality before merging into the main branch.

### Workflow
- Triggered on pull requests to the `main` branch
- Runs linting and tests in parallel jobs
- Provides fast feedback to developers

### Jobs
- **Lint**
  - Checks code quality using ESLint
  - Runs via `npm run lint` (used `npx eslint` locally for testing)
- **Test**
  - Runs automated unit tests
  - Runs `npm run test:coverage` to check test coverage


### Design Choices & Trade-offs
- **Local development vs CI:** Locally we use `npm install` instead of `npm ci` due to Windows/OneDrive permission issues. In CI, `npm ci` ensures a clean, reproducible environment.
- **npx vs global ESLint:** Used `npx eslint` to avoid global installs.
- **Separate lint/test jobs:** Running jobs in parallel improves feedback speed, but slightly increases pipeline complexity.

### Quality Assurance
- Ensures ESLint rules pass before merging
- Automatically runs tests on every pull request
- Provides test coverage visibility
- Jobs can run in parallel for faster feedback

# TASK3; Terraform Infrastructure 
## Infrastructure Components
- **VPC**: Virtual Private Cloud to isolate our app network.
- **Public Subnet**: For the Load Balancer (internet-facing).
- **Private Subnet**: For ECS containers (app) to keep them private.
- **Security Group**: Only allows port 3000 inside VPC, blocks all unnecessary access.
- **ECS Cluster**: Hosts our containerized shopping cart API.

## Security Decisions
- Public subnet: only LB can be public.
- Private subnet: app containers stay private for safety.
- Open port 3000 only internally, not public internet.
- Outbound traffic allowed for API to call other services if needed.

## Architecture Diagram
Internet
  ↓
Load Balancer (Public Subnet)
  ↓
Shopping Cart API (ECS Fargate in Private Subnet)
  ↓
In-Memory Storage

# Task4; Testing
1. Unit tests are written using Vitest
2. Tests are placed next to the source files they test
3. Focused on business logic, services, and repositories

### Coverage Summary
-Overall coverage: ~79%
-Domain logic coverage: >85%
-Repository coverage: 100%

This exceeds the required 70% coverage for business logic.

### Running Tests
npm run test
npm run test:coverage

### DomainError
A custom error class for domain/business rule violations.
Used throughout entities and services instead of generic Error.

Examples:
Adding an item with zero or negative quantity → throws DomainError('Quantity must be positive')
Removing a non-existent item → throws DomainError('Item not found in cart')
Checkout an empty cart → throws DomainError('Cannot checkout empty cart')
Negative money or currency mismatch → throws DomainError

This ensures all domain errors are consistent and easily distinguishable from system/runtime errors.

### Trade-offs & Improvements
- Used in-memory storage for simplicity, no database persistence
- No authentication or authorization implemented
- Checkout operation clears cart immediately (could improve with order persistence)
- Could add: database storage, logging, caching, and full error handling in production

