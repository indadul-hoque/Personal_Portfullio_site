<h1 align="center">⚡ Portfolio & Dashboard API Backend</h1>

<p align="center">
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-v5.x-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js" /></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
  <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" /></a>
</p>

---

## 📖 Overview

As a Full Stack Developer, I have built this APIs to provide a RESTful and dynamic interface for my personal portfolio website. This backend handles all the business logic and data storage related to my professional profile, including projects, skills, and contact form submissions. It is designed to be lightweight, modular, and easy to scale when adding new features and newly learned technologies to my skill set.

---

## 🛠️ Tech Stack & Production Tooling

### 🧱 Core Architecture

- **[Node.js](https://nodejs.org/) (ES Modules)** — Server-side JavaScript runtime configured with native ES Modules (`import`/`export`) for cleaner imports and modern syntax.
- **[Express.js](https://expressjs.com/) (v5.x)** — Core HTTP routing framework, leveraged for its battle-tested stability and streamlined asynchronous error handling.
- **[PostgreSQL](https://www.postgresql.org/)** — Enterprise-grade relational SQL database ensuring strict data integrity, structured relations, and ACID compliance for portfolio content.
- **[Prisma ORM](https://www.prisma.io/)** — Type-safe query engine and schema migration manager (`@prisma/client` & `prisma`), eliminating boilerplate SQL while preventing runtime schema mismatches.

### 📦 Key Backend Libraries

- **`cors`** — Configures granular Cross-Origin Resource Sharing policies to protect API access between the frontend domain and server.
- **`jsonwebtoken` (JWT)** — Issues and verifies stateless authentication tokens to secure private dashboard endpoints.
- **`bcryptjs`** — Industry-standard one-way salt hashing for administrative authentication security.
- **`dotenv`** — Isolates environment-specific configuration (`PORT`, `DATABASE_URL`, `JWT_SECRET`) safely outside version control.
- **`nodemon`** — Development utility that monitors file changes and restarts the server process automatically.

---
