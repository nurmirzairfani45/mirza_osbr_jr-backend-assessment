# Folder Structure
shopping-cart-api/src/
│
├─ controllers/        # HTTP layer, maps requests to service calls
│  ├─ CartController.ts
│  └─ CartController.spec.ts
│
├─ services/           # Business logic layer
│  ├─ CartService.ts
│  └─ CartService.spec.ts
│
├─ repositories/       # Data access layer (in-memory implementation)
│  ├─ CartRepository.ts
│  ├─ InMemoryCartRepository.ts
│  └─ InMemoryCartRepository.spec.ts
│
├─ domain/             # Core business entities and rules
│  ├─ entities/
│  │  ├─ Cart.ts
│  │  └─ Cart.spec.ts
│  ├─ value-objects/
│  │  ├─ Money.ts
│  │  └─ Money.spec.ts
│  └─ errors/
│     └─ DomainError.ts
│
└─ server.ts           # Entry point of the API

# Layer Interaction
HTTP Request → Controller → Service → Repository → Domain

Explanation:
Controller: Receives HTTP requests, validates input, calls service layer, sends response.
Service: Implements business logic (e.g., adding items, calculating totals, checkout rules).
Repository: Abstracts data storage (in-memory here). Handles persistence and retrieval.
Domain: Entities and value objects enforce business rules and data integrity.

# Design Principle
Separation of concerns: Each layer has a single responsibility.
Testable: Business logic is independent of controllers and repositories.
Domain-driven design: Entities (Cart, CartItem) enforce rules; Money is a value object for safe calculations.
Extensible: Easy to replace the in-memory repository with a database in production.