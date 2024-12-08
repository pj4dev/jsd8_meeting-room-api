# Meeting Room - Backend API Example

This repository contains a Node.js project using TypeScript, MongoDB, managed with Yarn. It also includes a Docker and Docker Compose configuration to easily build and run the application in a containerized environment.

## Project Structure
This project is organized to follow a modular architecture, which helps in maintaining scalability and readability. Below is an overview of the project structure, focusing on the `src` directory and its sub-folders:
```
/meeting-room
    ├── /src
        ├── /configs
        ├── /controllers
        ├── /middlewares
        ├── /errors
        ├── /models
        ├── /routes
        ├── /types
        └── /utils
```

### 1. **`/configs`**

This folder contains all the configuration files for the application. It typically includes:

- Environment-specific configurations (development, production, etc.)
- Application settings such as database connections, third-party service keys, API URLs, etc.
- Configuration for logging, security, or any other customizable application parameters.

**Example files**:
- `database.config.ts` – database connection configuration.
- `app.config.ts` – general application settings (e.g., port number, CORS settings).
- `env.config.ts` – managing environment variables.

### 2. **`/controllers`**

Controllers handle the business logic of the application. Each controller corresponds to a specific resource or functionality and defines methods to handle HTTP requests (GET, POST, PUT, DELETE). 

Controllers typically:
- Parse and validate input data.
- Interact with models (databases, APIs).
- Send responses to the client.

**Example files**:
- `user.controller.ts` – controller handling user-related logic (e.g., creating, fetching users).
- `auth.controller.ts` – controller for user authentication (login, signup).

### 3. **`/middlewares`**

Middleware functions are executed during the lifecycle of a request, before it reaches the controller, or after the controller has processed the request. They can modify the request, perform validation, or add extra functionality (such as logging, authentication, etc.).

Common middleware tasks include:
- Authorization checks
- Input validation
- Request logging
- Error handling

**Example files**:
- `auth.middleware.ts` – middleware for user authentication (e.g., JWT token validation).
- `logger.middleware.ts` – middleware for logging incoming requests.

### 4. **`/errors`**

This folder defines custom error classes and utilities for centralized error handling. It typically includes:

- Custom error types (e.g., `NotFoundError`, `ValidationError`).
- Error handling utilities to standardize error responses.

**Example files**:
- `AppError.ts` – a base class for custom errors.
- `NotFoundError.ts` – custom error for 404 not found responses.
- `ValidationError.ts` – error class for input validation failures.

The goal of this folder is to keep error handling consistent throughout the application.

### 5. **`/models`**

Models are responsible for representing and interacting with data. In a typical web application, models correspond to entities such as `User`, `Post`, `Product`, etc., and contain logic for accessing, manipulating, and persisting that data.

Models often define:
- Schema and structure for data.
- Database queries or API calls to fetch or update data.
- Validation rules.

**Example files**:
- `user.model.ts` – model for the `User` entity, including methods for querying the database.
- `product.model.ts` – model for the `Product` entity.

In case you're using an ORM (e.g., Sequelize, TypeORM), this folder would typically contain your ORM entity definitions.

### 6. **`/routes`**

This folder contains the route definitions of the application. Routes are responsible for defining HTTP endpoints and associating them with controller methods.

For each resource, there is typically a corresponding route file that sets up all the routes needed for that resource.

**Example files**:
- `user.routes.ts` – defines routes like `GET /users`, `POST /users`, `PUT /users/:id`, etc.
- `auth.routes.ts` – defines routes related to authentication, like `POST /login`, `POST /signup`.

Routes are often organized in a modular way (e.g., separate routes for user, authentication, and product management).

### 7. **`/types`**

The `types` folder contains TypeScript types and interfaces used throughout the application. These types are especially useful for strongly typing the request/response bodies, query parameters, and other data structures used across controllers, models, and services.

**Example files**:
- `user.types.ts` – types for the `User` resource (e.g., `UserModel`, `CreateUserRequest`).
- `auth.types.ts` – types related to authentication (e.g., `LoginRequest`, `TokenPayload`).

By using TypeScript types, we ensure that the data passed throughout the application is validated and consistent.

### 8. **`/utils`**

The `utils` folder contains utility functions that provide reusable functionality across the application. These are often small, stateless functions that don’t belong to a specific model, controller, or middleware.

**Example files**:
- `date.util.ts` – utility functions for working with dates (e.g., formatting, parsing).
- `string.util.ts` – utility functions for string manipulation (e.g., sanitizing user input).
- `token.util.ts` – utility functions for generating, verifying JWT tokens.

Utilities help keep your code DRY (Don't Repeat Yourself) and abstract common logic into reusable functions.

---

## Prerequisites

Before you start, ensure you have the following tools installed:

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Node.js](https://nodejs.org/en/)

You can check if Docker, Docker Compose, and Yarn are installed by running:

```bash
docker --version
docker-compose --version
yarn --version
```

## Install Dependencies
```bash
yarn install
```

## Build the TypeScript Project
```bash
yarn build
```

## Run MongoDB (Using Docker Compose)
```bash
docker-compose up -d
```

## Run API Service with Nodemon
```bash
yarn dev
```

## Start API Service
```bash
yarn start
```