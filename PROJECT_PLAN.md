# Project Plan: Personal Project & Task Manager

## 1. Project Overview

### Description
This project aims to develop a personal project and task management application, similar in concept to Asana, Trello, or Jira, but tailored for a single user (Raúl Navas Montero). The application will enable granular control over projects, which will be composed of task lists. Each task will have due dates and a necessary timeline (cronograma). The system will also support usable lists and provide a dedicated dashboard to visualize tasks in progress, completed, or pending. Projects can be categorized as personal, work, family, or other.

### Goal
To provide Raúl Navas Montero with a comprehensive, intuitive, and efficient tool to organize, track, and manage all personal and professional projects and tasks, ensuring no detail is overlooked and deadlines are met.

### Target User
Raúl Navas Montero (single user).

## 2. Core Features

### 2.1. Project Management
*   **CRUD Operations**: Create, Read, Update, Delete projects.
*   **Categorization**: Assign projects to categories (Personal, Work, Family, Other).
*   **Project Details**: View and edit project-specific information.

### 2.2. Task Management
*   **CRUD Operations**: Create, Read, Update, Delete tasks within a project.
*   **Task Attributes**: Due dates, estimated duration, status (To Do, In Progress, Completed).
*   **Timeline (Cronograma)**: Associate tasks with a timeline or schedule.
*   **Usable Lists**: Organize tasks into custom lists within projects.

### 2.3. Dashboard
*   **Overview**: A personalized dashboard displaying aggregated information across all projects.
*   **Task Status Visualization**: Sections for tasks in progress, completed, and pending.
*   **Project-specific Dashboards**: Each project will have its own dashboard to track its tasks.

## 3. Technology Stack

*   **Frontend**: React (with Vite for fast development), TailwindCSS (for rapid styling), Axios (for API communication).
*   **Backend**: Node.js (Express.js framework), Prisma ORM (for database interaction), SQLite (for a lightweight, single-user database).
*   **Code Quality**: ESLint, Prettier.
*   **CI/CD**: GitHub Actions.

## 4. Architecture

The application will follow a client-server architecture, structured as a monorepo with distinct `frontend` and `backend` services. Communication between the frontend and backend will occur via a RESTful API.

*   **`frontend`**: A React application responsible for the user interface and interacting with the backend API.
*   **`backend`**: A Node.js/Express.js API server responsible for handling business logic, data persistence, and serving data to the frontend.
*   **`services.json`**: A root configuration file to define and manage the different services within the monorepo.

## 5. File Structure

```
/
├── .github/
│   └── workflows/
│       └── ci.yml
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── project.controller.js
│   │   │   └── task.controller.js
│   │   ├── models/
│   │   │   └── prisma.schema
│   │   ├── routes/
│   │   │   ├── project.routes.js
│   │   │   └── task.routes.js
│   │   ├── services/
│   │   │   ├── project.service.js
│   │   │   └── task.service.js
│   │   └── app.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── DashboardWidget.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── contexts/
│   │   │   └── ProjectContext.jsx
│   │   ├── hooks/
│   │   │   └── useProjects.js
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── ProjectDetailPage.jsx
│   │   │   └── ProjectsPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .eslintrc.cjs
│   ├── .prettierrc.json
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── services.json
├── .eslintrc.json
├── .prettierrc
├── PROJECT_PLAN.md
└── README.md
```

## 6. CI/CD Workflow (`.github/workflows/ci.yml`)

A GitHub Actions workflow will be implemented to automate the build and quality checks for both frontend and backend services. This workflow will include steps for:

*   Checking out the code.
*   Setting up Node.js environment.
*   Installing dependencies for both `frontend` and `backend`.
*   Running linting checks for both services.
*   Running tests (if implemented in the future).
*   Building the `frontend` application.
*   Building (or verifying) the `backend` application.

## 7. Quality Control

To maintain high code quality and consistency across the project, the following tools will be configured:

*   **ESLint (`.eslintrc.json`, `frontend/.eslintrc.cjs`)**: For static code analysis and identifying problematic patterns.
*   **Prettier (`.prettierrc`, `frontend/.prettierrc.json`)**: For automatic code formatting to ensure a consistent style.

## 8. Future Enhancements

Based on the 
