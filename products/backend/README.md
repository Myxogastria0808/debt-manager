# debt-manager Backend

## Structure

This structure is inspired by layered architecture.

### handler

Define path routing

- dependencies
  - Hono

### handler/middleware

Define middleware

- dependencies
  - Hono

### application

Define business logic

- dependencies

### domain

Define models (not database schemas) and types

### infrastructure

Define database CRUD operations

> [TIPS!]
> All operations have to be minimal and atomic.

- dependencies
  - Drizzle

### db

Define database schema

- dependencies
  - Drizzle

## Dependencies

```mermaid
flowchart TD
    subgraph handler
        route["route"]
        middleware["handler/middleware"]
    end
    application["application"]
    infrastructure["infrastructure"]
    db["db"]
    domain["domain"]

    route --> middleware
    route --> application
    application --> infrastructure
    infrastructure --> db

    middleware --> domain
    application --> domain
    infrastructure --> domain
```

## Process Flow

```mermaid
flowchart TD
    io[Network IO]
    handler["handler"]
    middleware["middleware"]
    application["application"]
    infrastructure["infrastructure"]
    db["db"]

    io --> handler
    handler --> middleware
    handler --> application
    middleware --> application
    application --> infrastructure
    infrastructure --> db
    db --> infrastructure
    infrastructure --> application
    application --> middleware
    application --> handler
    middleware --> handler
    handler --> io
```