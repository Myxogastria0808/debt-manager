# debt-manager

[![Test](https://github.com/Myxogastria0808/debt-manager/actions/workflows/test.yaml/badge.svg)](https://github.com/Myxogastria0808/debt-manager/actions/workflows/test.yaml)
[![Docs](https://github.com/Myxogastria0808/debt-manager/actions/workflows/docs.yaml/badge.svg)](https://github.com/Myxogastria0808/debt-manager/actions/workflows/docs.yaml)
![GitHub Release](https://img.shields.io/github/v/release/Myxogastria0808/debt-manager)
![GitHub License](https://img.shields.io/github/license/Myxogastria0808/debt-manager)
![Vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)
[![RenovateBot](https://img.shields.io/badge/RenovateBot-1A1F6C?logo=renovate&logoColor=fff)](#)

## Documentation

https://myxogastria0808.github.io/debt-manager/

## Technology Stack Used

Dockerize each component as `frontend`, `backend`, and `database`, and coordinate them using Docker Compose.
Additionally, debt-manager utilizes pnpm's workspace feature and consists of two products, `frontend` and `backend`, along with `docs`.

### Frontend

- TypeScript
- CSS Modules
- Vite + React

#### [Product](https://github.com/Myxogastria0808/debt-manager/products/frontend/)
- https://github.com/Myxogastria0808/debt-manager/products/frontend/

#### [Details](https://github.com/Myxogastria0808/debt-manager/products/frontend/README.md)
- https://github.com/Myxogastria0808/debt-manager/products/frontend/README.md

#### [Vitest UI Report](https://myxogastria0808.github.io/debt-manager/vitest/frontend/)
- https://myxogastria0808.github.io/debt-manager/vitest/frontend/

#### [Coverage Report](https://myxogastria0808.github.io/debt-manager/coverage/frontend/)
- https://myxogastria0808.github.io/debt-manager/coverage/frontend/

### Backend

- TypeScript
- Hono (Web Framework)
- fetch API (for calling Webhook)
- Prisma (ORM)

#### [Product](https://github.com/Myxogastria0808/debt-manager/products/backend/)
- https://github.com/Myxogastria0808/debt-manager/products/backend/

#### [Details](https://github.com/Myxogastria0808/debt-manager/products/backend/README.md)
- https://github.com/Myxogastria0808/debt-manager/products/backend/README.md

#### [Vitest UI Report](https://myxogastria0808.github.io/debt-manager/vitest/backend/)
- https://myxogastria0808.github.io/debt-manager/vitest/backend/

#### [Coverage Report](https://myxogastria0808.github.io/debt-manager/coverage/backend/)
- https://myxogastria0808.github.io/debt-manager/coverage/backend/

### Database

- development
  - PostgreSQL (Docker)
- production
  - Cloudflare D1

### Docs

- Astro

#### [Docs](https://github.com/Myxogastria0808/debt-manager/docs/)
- https://github.com/Myxogastria0808/debt-manager/docs/

#### [Details](https://github.com/Myxogastria0808/debt-manager/docs/README.md)
- https://github.com/Myxogastria0808/debt-manager/docs/README.md

## CI/CD

- GitHub Actions with Nix

#### [CI/CD](https://github.com/Myxogastria0808/debt-manager/.github/workflows/)
- https://github.com/Myxogastria0808/debt-manager/.github/workflows/

## Testing Tool

- Vitest

## Management Tool

> [!WARNING]
> This project only use pnpm (not yarn, npm or bun).

- pnpm (with workspace feature)
- turbo (monorepo management tool)
- Nix (optional tool)

## System Diagram ~Development~

```mermaid
graph LR;
    subgraph "Database (Docker)"
        db[("PostgreSQL")]
    end
    db[("PostgreSQL")] <--> prisma["Prisma (ORM)"]
    subgraph "Backend (Localhost)"
        prisma["Prisma (ORM)"] <--> hono["Hono (Web API)"]
        prisma["Prisma (ORM)"] <--> discord["Discord Webhook"]
        prisma["Prisma (ORM)"] <--> slack["Slack Webhook"]
    end
    hono["Hono (Web API)"] <--> frontend["Vite + React"]
    subgraph "Frontend (Localhost)"
        frontend["Vite + React"]
    end
    idp{{"Identity Provider (Google, GitHub, etc.)"}} <-.authentication.-> user["User"]
    idp{{"Identity Provider (Google, GitHub, etc.)"}} <--check token--> hono["Hono (Web API)"]
    frontend["Vite + React"] -.redirect.-> idp{{"Identity Provider (Google, GitHub, etc.)"}}
    user["User"] <--with token--> frontend["Vite + React"]
    user["User"] -.without token.-> frontend["Vite + React"]
    discord["Discord Webhook"] --notification--> server(["Server (Discord)"])
    slack["Slack Webhook"] --notification--> workspace(["Workspace (Slack)"])
    server(["Server (Discord)"]) --notification--> user["User"]
    workspace(["Workspace (Slack)"]) --notification--> user["User"]
```

## System Diagram ~Production~

```mermaid
graph LR;
    db[("Database (Cloudflare D1)")] <--> prisma["Prisma (ORM)"]
    subgraph "Backend (Cloudflare Workers)"
        prisma["Prisma (ORM)"] <--> hono["Hono (Web API)"]
        prisma["Prisma (ORM)"] <--> discord["Discord Webhook"]
        prisma["Prisma (ORM)"] <--> slack["Slack Webhook"]
    end
    hono["Hono (Web API)"] <--> frontend["Vite + React"]
    subgraph "Frontend (Cloudflare Workers)"
        frontend["Vite + React"]
    end
    idp{{"Identity Provider (Google, GitHub, etc.)"}} <-.authentication.-> user["User"]
    idp{{"Identity Provider (Google, GitHub, etc.)"}} <--check token--> hono["Hono (Web API)"]
    frontend["Vite + React"] -.redirect.-> idp{{"Identity Provider (Google, GitHub, etc.)"}}
    user["User"] <--with token--> frontend["Vite + React"]
    user["User"] -.without token.-> frontend["Vite + React"]
    discord["Discord Webhook"] --notification--> server(["Server (Discord)"])
    slack["Slack Webhook"] --notification--> workspace(["Workspace (Slack)"])
    server(["Server (Discord)"]) --notification--> user["User"]
    workspace(["Workspace (Slack)"]) --notification--> user["User"]
```

## Entity Relationship Diagram (ER Diagram)

```mermaid
```

## Branch Strategy

### main

main branch is the release branch.

### dev

dev branch is the development root branch.


### feature

- feat/#[issue-number]-[issue-summary]

  example) feat/#12-add-card-button-component

### chore

- chore/#[issue-number]-[issue-summary]

  example) chore/#12-add-prettier-config

### fix

- fix/#[issue-number]-[issue-summary]

  example) fix/#12-change-title

### update

- update/#[issue-number]-[issue-summary]

  example) update/#12-update-dependencies

### test

- test/#[issue-number]-[issue-summary]

  example) test/#12-add-unit-test

```mermaid
flowchart LR
    feature["feat/*"] --with loose checks--> dev["dev"]
    chore["chore/*"] --with loose checks--> dev["dev"]
    fix["fix/*"] --with loose checks--> dev["dev"]
    update["update/*"] --with loose checks--> dev["dev"]
    dev["dev"] --with strict checks--> main["main"]
    main["main"] --with strict checks (cron)--> main["main"]
```

#### with `loose checks` (`dev branch`)

- test (`push` and `pull requests`)
- docs (`push`)

#### with `strict checks` (`main branch`)

- test (`pull requests`)
- CodeQL Scanning (`pull requests`)

#### with `strict checks (cron)` (`main branch`)

- test (`cron`)
