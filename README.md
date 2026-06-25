# reactive-management

A full-stack inventory and stock management application built for learning purposes.

Already in development.
Working APIs: 
- api/auth/**
- api/companies/**
- api/categories/**
- api/products/**
- api/products/{publicId}/recipe
  
---

## Overview

**reactive-management** allows businesses to manage their products, materials, clients, suppliers, and stock movements in one place. Orders are used to record inbound and outbound movements, and a built-in production system lets users manufacture products from raw materials using a Bill of Materials (BOM).

---

## Features

- **Products & Materials** — Create and categorise inventory items with pricing and measurement units
- **Clients & Suppliers** — Register and manage business contacts
- **Orders & Movements** — Record inbound (from suppliers) and outbound (to clients) stock movements, with flexible discount support via a `DiscountParser` (e.g. `2%+3%`)
- **Bill of Materials (BOM)** — Define which materials are required to produce a product
- **Production Orders** — Trigger production runs that consume materials and increment product stock, with a real-time status flow (`Pending → In Progress → Completed / Failed`)
- **Categories** — Shared or type-specific categories for products and materials
- **Dashboard** — Generate reports over a chosen period and visualise stock and order data through charts
- **Audit Log** — Track significant business events across the application for traceability

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Backend | Spring Boot + Kotlin |
| Database | PostgreSQL |
| ORM | Spring Data JPA |
| Migrations | Flyway |
| Build Tool | Gradle |
| API Docs | Swagger (OpenAPI) |

---

## Project Structure

```
reactive-management/
├── frontend/   # React + TypeScript application
└── backend/    # Spring Boot + Kotlin application
```

---

## Getting Started

> Setup instructions will be added once development begins.

### Prerequisites

- Node.js
- JDK 17+
- PostgreSQL
- Gradle

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
./gradlew bootRun
```

---

## Domain Model

The core entities of the application:

- `products` — Items produced or sold
- `materials` — Raw materials used in production
- `categories` — Shared classification for products and materials
- `clients` — Outbound order recipients
- `suppliers` — Inbound order sources
- `orders` — Containers for movements (inbound or outbound)
- `movements` — Individual stock transactions within an order
- `production_orders` — Production runs that consume materials and produce products
- `audit_log` — Record of significant business events

---

## Planned Features

- User authentication (sign up / sign in) via Spring Security
- Internationalisation (i18n) with at least one translation
- Linked client/supplier accounts with automatic cross-movement recording
