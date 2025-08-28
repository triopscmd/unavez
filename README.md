# Personal Project & Task Manager

Welcome to the Personal Project & Task Manager, a comprehensive tool designed for Raúl Navas Montero to organize, track, and manage all personal and professional projects and tasks efficiently.

## Overview

This application is built as a monorepo, separating the frontend and backend concerns, and leveraging modern web technologies for a robust and scalable solution.

## Architecture

The project follows a client-server architecture:
- **Frontend**: A React application powered by Vite, styled with TailwindCSS, providing an intuitive user interface.
- **Backend**: A Node.js/Express.js API server responsible for business logic, data persistence (SQLite via Prisma ORM), and serving data to the frontend.

## Getting Started

To run this project locally, ensure you have Node.js and npm (or yarn/pnpm) installed.

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd personal-project-manager
    ```

2.  **Install dependencies for both services:**
    ```bash
    # From the project root
    npm install --prefix frontend
    npm install --prefix backend
    ```

3.  **Database Setup (Backend):**
    Create a `.env` file in the `backend` directory based on `backend/.env.example`.
    ```
    # backend/.env
    DATABASE_URL="file:./dev.db"
    ```
    Then, generate the Prisma client and run migrations:
    ```bash
    cd backend
    npx prisma migrate dev --name init
    cd ..
    ```

4.  **Run Services:**
    You can run them in separate terminals:
    ```bash
    # In one terminal for backend
    cd backend
    npm run dev

    # In another terminal for frontend
    cd frontend
    npm run dev
    ```

## Scripts

Each service has its own `package.json` with specific scripts.

### Frontend Scripts

-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Builds the frontend for production.
-   `npm run lint`: Runs ESLint on the frontend codebase.
-   `npm run preview`: Previews the production build locally.

### Backend Scripts

-   `npm run dev`: Starts the Node.js/Express server in development mode (e.g., with `nodemon`).
-   `npm run start`: Starts the Node.js/Express server in production mode.
-   `npm run lint`: Runs ESLint on the backend codebase.
-   `npx prisma migrate dev`: Apply migrations.
-   `npx prisma studio`: Open Prisma Studio.

## CI/CD

The project includes GitHub Actions workflows (`.github/workflows/ci.yml`) for automated testing and quality checks on every push and pull request.

---
Refer to `frontend/README.md` and `backend/README.md` for more specific details on each service.
