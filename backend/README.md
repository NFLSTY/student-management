# Backend - Amikom Student Management

The backend API for the Amikom Student Management system. Built with [NestJS](https://nestjs.com/) and MongoDB (via Mongoose), it provides a robust RESTful API to manage student records.

---

## 📂 Structure Overview

The backend uses NestJS architecture:
- `src/main.ts`: Application entry point where CORS and global configurations are set.
- `src/app.module.ts`: Root module tying everything together.
- `src/students/`: Core feature module for student management, including controllers (routing) and services (business logic).
- `.env`: Environment variables (excluded from git).

---

## 🛠️ Setup & Preparation

### 1. Environment Variables
Before running the application, you need to configure the database connection.
1. Copy the provided `.env.example` file to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and replace the `your-mongodb-connection` placeholder with your actual MongoDB connection URI (e.g., a local MongoDB instance or a MongoDB Atlas cluster URI).
   ```env
   MONGODB_URI='mongodb+srv://<db_username>:<db_password>@<db_code>.mongodb.net/?appName=<db_name>'
   ```

### 2. Dependencies
Dependencies are managed via pnpm at the root level, but you can also install them directly in this folder if working in isolation:
```bash
pnpm install
```

---

## 💻 Running the Application

### Via Workspace Root (Recommended)
You can run both backend and frontend concurrently from the root of the monorepo:
```bash
cd ..
pnpm dev
```

### Locally (Backend Only)
To run just the backend server:

```bash
# development
$ pnpm run start

# watch mode (auto-reload on code changes)
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

The API will be available at `http://localhost:3000`.
