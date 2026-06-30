# Frontend - Amikom Student Management

The frontend user interface for the Amikom Student Management system. Built with React, TypeScript, and Vite, it offers a blazing-fast development experience and a modern UI customized with Amikom's brand colors.

---

## 📂 Structure Overview

The frontend codebase is organized to keep components and API layers decoupled:
- `src/App.tsx`: The main React application component and layout.
- `src/index.css`: Global styles, CSS variables, and design tokens (Amikom theme).
- `src/App.css`: Component-specific styling like cards, grids, and form overlays.
- `src/components/`: Reusable UI components:
  - `StudentCard.tsx`: Visual display for an individual student.
  - `StudentForm.tsx`: Form for creating or editing student data.
- `src/services/api.ts`: API integration layer using Axios to communicate with the NestJS backend.

---

## 🛠️ Setup & Preparation

### 1. Prerequisites
There are no additional local files like `.env` required by default for the frontend. The API URL is configured in `src/services/api.ts` to point to `http://localhost:3000/students`. Make sure the backend server is running on that port.

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

### Locally (Frontend Only)
To run just the React development server:

```bash
# Start the Vite development server with Hot-Module-Reload
$ pnpm dev

# Build for production
$ pnpm build
```

The application will be accessible at `http://localhost:5173`.
