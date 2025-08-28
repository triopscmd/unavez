# Frontend Service

This directory contains the frontend application for the Personal Project & Task Manager. It's a single-page application (SPA) built with React, Vite, and styled using TailwindCSS.

## Features

-   **Responsive UI**: Designed with TailwindCSS for a modern and responsive user experience.
-   **Project Management**: CRUD operations for projects, including categorization.
-   **Task Management**: CRUD operations for tasks, with due dates, status, and timelines.
-   **Dashboard**: Overview of tasks and projects.
-   **API Integration**: Communicates with the backend API using Axios.

## Technology Stack

-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A fast build tool that provides an excellent development experience.
-   **TypeScript**: For type-safe JavaScript.
-   **TailwindCSS**: A utility-first CSS framework for rapid UI development.
-   **React Router DOM**: For declarative routing.
-   **Axios**: Promise-based HTTP client for the browser and Node.js.

## Setup and Running

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    The frontend expects the backend API URL. This is configured in `services.json` and passed via Vite's `VITE_` prefix for env variables. For standalone running without `services.json`, you might need a `.env.local`:
    ```
    # .env.local (if not using services.json runner)
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Build for Production

```bash
npm run build
```
This command will compile and optimize the frontend application into the `dist` directory, ready for deployment.

## Linting and Formatting

-   `npm run lint`: Run ESLint to check for code quality issues.
-   Automatic formatting with Prettier is configured via VSCode or an equivalent editor plugin upon saving.
