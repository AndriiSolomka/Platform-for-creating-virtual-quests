# 🧩 Platform for Creating Virtual Quests

Welcome to the **Platform for Creating Virtual Quests**!  
A modern, scalable backend built with [NestJS](https://nestjs.com/) and TypeScript for designing, managing, and running interactive virtual quests. 🚀

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
</p>

---

## ✨ Features

- ⚡ **Fast & Scalable:** Powered by NestJS and Node.js
- 🧑‍💻 **Developer Friendly:** TypeScript, ESLint, Prettier, and full test coverage
- 🧪 **Ready for CI/CD:** GitHub Actions for linting and testing
- 🧩 **Modular Architecture:** Easy to extend and maintain
- 🛡️ **Best Practices:** Strict linting, formatting, and code quality tools

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AndriiSolomka/Platform-for-creating-virtual-quests.git
cd Platform-for-creating-virtual-quests
```

### 2. Environment Variables

Copy `.env.example` to `.env` and `.env.test.example` to `.env.test`:

```bash
cp .env.example .env
cp .env.test.example .env.test
```

### 3. Local Development (with Docker)

**Build and start all services:**

```bash
docker compose -f docker-compose.dev.yml up --build
```

- Backend: [http://localhost:3000](http://localhost:3000)
- Swagger: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

### 4. Running Tests

All tests run in isolation via Docker Compose.

#### Unit tests

```bash
docker compose -f docker-compose.test.yml up --build test-unit
```

---

## 🏗️ CI/CD

- **Linting:** Runs ESLint on every push and PR
- **Testing:** Runs unit tests in CI
- **Postgres Service:** Ready for integration with PostgreSQL in CI

---

## 📄 License

This project is licensed under the **UNLICENSED** license.

---

## 👤 Authors

- [Illia Yuriev](https://github.com/IYuriev)
- [Andrii Solomka](https://github.com/AndriiSolomka)
- [Zenoviia Tkachenko](https://github.com/Zenoviia)

---

> Made with ❤️
