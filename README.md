# Amikom Student Management

An enterprise-grade, lightweight full-stack monorepo web application designed to manage student data for Universitas Amikom Yogyakarta. This project features a React (Vite) frontend and a NestJS backend, utilizing **pnpm** workspaces for fast, efficient dependency management.

---

## 🚀 Features

- **Full-Stack Monorepo:** Tightly integrated React client and NestJS API in a single repository.
- **pnpm Workspaces:** Shared global dependency store to drastically reduce disk usage and installation time.
- **Concurrent Execution:** Run both the frontend and backend servers together with a single `pnpm dev` command.
- **CORS Configured:** Pre-configured Cross-Origin Resource Sharing on the backend for local development workflows.
- **Modern UI:** Customized frontend UI system focusing on a clean, modern aesthetic with Amikom's brand colors.

---

## 📂 Project Architecture

This monorepo layout bypasses traditional deep subfolders for direct, flat visibility of core workspace packages at the root level:

```text
├── backend/             # NestJS Server Application (Port 3000)
├── frontend/            # React + Vite + TypeScript Client (Port 5173)
├── package.json         # Workspace Root Configuration
├── pnpm-workspace.yaml  # pnpm Workspace Boundary Definitions
└── README.md            # Project Documentation
```

---

## 🛠️ Prerequisites

Before cloning and spinning up the development servers, ensure you have the following installed on your local environment:

- **Node.js** (v18.x or higher recommended)
- **pnpm** (Managed natively via Node's Corepack)
- **MongoDB** (A running instance locally or via MongoDB Atlas)

To enable Corepack and prepare pnpm globally, run:
```bash
corepack enable
```

---

## 💾 Getting Started & Installation

### 1. Clone the Repository
```bash
git clone <your-repository-github-url>
cd student-management
```

### 2. Install Workspace Dependencies
Run the installation command at the **root** folder. pnpm will automatically scan the workspace definitions, orchestrate required sub-packages for both `frontend/` and `backend/`, and link dependencies efficiently:
```bash
pnpm install
```

### 3. Environment Configuration
You need to set up the environment variables for the backend server to connect to MongoDB:
- Navigate to the `backend/` folder.
- Copy the `.env.example` file to `.env`.
- Provide your actual MongoDB URI in the `.env` file.
```bash
cd backend
cp .env.example .env
# Edit .env and update MONGODB_URI
```

---

## 💻 Development Commands

The workspace root contains orchestration scripts powered by `concurrently`. 
By using `concurrently`, running `pnpm dev` will spawn both the React development server and the NestJS compiler within a **single terminal pane**. The output will be prefix-colored (e.g., cyan for React, red for NestJS) so you can easily track both logs at the same time.

| Command | Action |
| :--- | :--- |
| `pnpm dev` | **Runs both Frontend and Backend concurrently** (Recommended) |
| `pnpm start:fe` | Focuses execution strictly on the React development server |
| `pnpm start:be` | Focuses execution strictly on the NestJS dev compiler (with hot-reload) |

### Start the Applications
From the **root** directory, run:
```bash
pnpm dev
```
Once initialized, your local terminal logs will stream both frontend and backend outputs. You can access the live environments at:
- **Frontend App:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3000](http://localhost:3000)
