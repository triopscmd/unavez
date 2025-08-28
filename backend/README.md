# Backend Service

This directory contains the backend service for the Personal Project & Task Manager application. It's built with Node.js, Express.js, and uses Prisma ORM with SQLite for data persistence.

## Features

-   **RESTful API**: Provides endpoints for managing projects and tasks.
-   **Data Persistence**: Uses SQLite for a lightweight, single-user database, managed by Prisma.
-   **Authentication (Future)**: Currently, no authentication is implemented, as it's designed for a single user. This can be extended in the future if multi-user support is desired.

## Technology Stack

-   **Node.js**: JavaScript runtime.
-   **Express.js**: Web application framework.
-   **Prisma ORM**: Next-generation ORM for Node.js and TypeScript.
-   **SQLite**: Lightweight, file-based database.
-   **CORS**: Middleware for handling Cross-Origin Resource Sharing.
-   **dotenv**: For environment variable management.

## Setup and Running

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in this directory based on `.env.example`.
    ```
    # .env
    PORT=3000
    DATABASE_URL="file:./dev.db"
    ```

4.  **Database Migration:**
    Apply the Prisma migrations to set up your database schema.
    ```bash
    npx prisma migrate dev --name init
    ```
    This will create `prisma/dev.db` and generate the Prisma client.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The API will be available at `http://localhost:3000/api`.

## API Endpoints (Planned)

### Projects
-   `GET /api/projects`: Get all projects
-   `GET /api/projects/:id`: Get a project by ID
-   `POST /api/projects`: Create a new project
-   `PUT /api/projects/:id`: Update a project
-   `DELETE /api/projects/:id`: Delete a project

### Tasks
-   `GET /api/projects/:projectId/tasks`: Get all tasks for a specific project
-   `GET /api/tasks/:id`: Get a task by ID
-   `POST /api/projects/:projectId/tasks`: Create a new task within a project
-   `PUT /api/tasks/:id`: Update a task
-   `DELETE /api/tasks/:id`: Delete a task

## Code Structure

-   `src/app.js`: Main application entry point.
-   `src/config/db.js`: Prisma client initialization.
-   `src/controllers/`: Contains request handlers (business logic).
-   `src/models/prisma.schema`: Prisma schema definition.
-   `src/routes/`: Defines API routes.
-   `src/services/`: Contains data access logic and interacts with Prisma.

## Linting and Formatting

-   `npm run lint`: Run ESLint.
-   `npm run format`: Run Prettier to format code.
