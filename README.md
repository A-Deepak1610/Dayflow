# Dayflow

> Every workday, perfectly aligned.

Dayflow is a modern, web-based Human Resource Management System (HRMS) designed to digitize and streamline core HR operations. From employee lifecycle management to attendance tracking, leave request workflows, and payroll visibility, Dayflow provides a centralized platform for both HR administrators and employees.

---

## Features

### Currently Implemented (Foundation Layer)
* **Monorepo Architecture**: Decoupled React frontend (`client`) and Node.js/Express TypeScript backend (`server`).
* **Live System Health Diagnostics**: Dedicated `/api/health` backend service that verifies real-time connectivity to the TiDB Cloud MySQL database and returns user count metrics.
* **Frontend Monitoring Dashboard**: Interactive React + Tailwind CSS dashboard providing visual connection status indicators for both backend API and database services.
* **Database ORM Integration**: Type-safe database schema defined with Prisma ORM configured for MySQL / TiDB Cloud.
* **Error Handling & API Middleware**: Global Express error handler, CORS policy configuration, and environment config management.

### Planned Features (Target Roadmap)
* **Authentication & Security**: Secure user registration, JWT login, password hashing, and session management.
* **Role-Based Access Control (RBAC)**: Fine-grained permissions separating Admin/HR Officers from standard Employees.
* **Employee Management**: Profile creation, department assignment, job title tracking, and contact details management.
* **Attendance Tracking**: Clock-in / clock-out logging, work hour calculations, and daily attendance records.
* **Leave Management**: Leave application submission, balance tracking, and multi-stage HR approval/rejection workflows.
* **Payroll Visibility**: Salary structure viewing, allowances, deductions, and downloadable pay slips.

---

## User Roles

Dayflow supports two primary user roles across the organization:

| Role | Responsibilities & Capabilities |
| :--- | :--- |
| **Admin / HR Officer** | Full management access to employee profiles, department structures, leave request approvals, attendance monitoring, and salary configurations. |
| **Employee** | Self-service portal to update personal profiles, submit leave requests, view personal attendance logs, and access salary details. |

---

## Tech Stack

### Frontend
* **Library**: [React 19](https://react.dev/)
* **Build Tool**: [Vite 8](https://vite.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Language**: JavaScript (ES Modules)

### Backend
* **Runtime / Framework**: Node.js with [Express 5](https://expressjs.com/)
* **Execution**: [tsx](https://github.com/privatenumber/tsx) (TypeScript execute)
* **Language**: [TypeScript 7](https://www.typescriptlang.org/)
* **ORM**: [Prisma ORM v6](https://www.prisma.io/)

### Database
* **Database Engine**: [MySQL](https://www.mysql.com/) (Compatible with [TiDB Cloud](https://pingcap.com/tidb-cloud))
* **Database Driver**: `mysql2`

### Code Quality & Tooling
* **Linter**: ESLint 10 (`@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)
* **Type Checker**: TypeScript Compiler (`tsc`)

---

## System Architecture

Dayflow utilizes a decoupled client-server architecture. The React single-page application communicates with the Express backend via RESTful HTTP APIs, while the backend interacts with a MySQL/TiDB database using Prisma ORM.

```mermaid
flowchart TD
    subgraph Client ["Client (React + Vite + Tailwind)"]
        UI["Dashboard & Pages"]
        APIService["API Service Layer (fetch)"]
    end

    subgraph Server ["Server (Express + TypeScript)"]
        Routes["API Router (/api/health)"]
        Controller["Health Controller"]
        PrismaLib["Prisma Client Instance"]
        Middleware["Global Error Handler & CORS"]
    end

    subgraph Database ["Database"]
        TiDB[("MySQL / TiDB Cloud")]
    end

    UI --> APIService
    APIService -- "REST HTTP Requests" --> Routes
    Routes --> Controller
    Controller --> PrismaLib
    PrismaLib -- "Database Queries" --> TiDB
```

---

## Project Structure

```text
Dayflow/
├── client/                 # Frontend React Application
│   ├── public/             # Static public assets
│   ├── src/
│   │   ├── assets/         # Logos, icons, and static media
│   │   ├── components/     # UI components (common, layout)
│   │   │   ├── common/     # Reusable headers and standalone controls
│   │   │   └── layout/     # Page layout wrappers
│   │   ├── context/        # React context state managers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Application views (Home dashboard)
│   │   ├── services/       # API client methods (`apiCall`, `checkServerHealth`)
│   │   ├── types/          # Frontend data type definitions
│   │   └── utils/          # Helper functions
│   ├── index.html          # HTML entry point
│   ├── package.json        # Frontend scripts and dependencies
│   └── vite.config.js      # Vite build & plugin configuration
└── server/                 # Backend Express Application
    ├── prisma/
    │   └── schema.prisma   # Prisma ORM data models (User, SystemHealth)
    ├── src/
    │   ├── config/         # Environment variables & runtime settings
    │   ├── controllers/    # API request handlers (health.controller.ts)
    │   ├── lib/            # Shared singletons (prisma.ts)
    │   ├── middlewares/    # Custom Express middlewares (errorHandler.ts)
    │   ├── routes/         # Express API endpoints (health.routes.ts)
    │   ├── services/       # Business logic implementations
    │   ├── types/          # Backend TypeScript interfaces
    │   ├── utils/          # Utilities and helpers
    │   └── server.ts       # Express server initialization & listener
    ├── package.json        # Backend scripts and dependencies
    └── tsconfig.json       # TypeScript compiler options
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **MySQL / TiDB Database**: A running MySQL-compatible database instance or TiDB Cloud connection string.

---

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/A-Deepak1610/Dayflow.git
   cd Dayflow
   ```

2. **Configure Backend Environment**
   Navigate to the `server/` directory and create a `.env` file:
   ```bash
   cd server
   ```
   Add your environment configuration (see [Environment Variables](#environment-variables)):
   ```env
   PORT=5000
   VITE_API_URL=http://localhost:5000/api
   DATABASE_URL="mysql://<user>:<password>@<host>:<port>/<database>?sslaccept=strict"
   ```

3. **Install Backend Dependencies & Generate Prisma Client**
   ```bash
   npm install
   npm run prisma:generate
   ```

4. **Synchronize Database Schema**
   ```bash
   npm run prisma:push
   ```

5. **Configure Frontend Environment**
   Navigate to the `client/` directory and install dependencies:
   ```bash
   cd ../client
   npm install
   ```

---

### Running the Application

1. **Start the Backend Server** (from `server/` directory):
   ```bash
   npm run dev
   ```
   The backend API will run at `http://localhost:5000`.

2. **Start the Frontend Client** (from `client/` directory):
   ```bash
   npm run dev
   ```
   The frontend app will run at `http://localhost:5173` (or the port displayed in your terminal).

3. **Accessing the Application**
   Open your browser and navigate to `http://localhost:5173`. The dashboard will verify the live status of the backend API and TiDB database.

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description | Example Placeholder |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `VITE_API_URL` | API base URL reference | `http://localhost:5000/api` |
| `DATABASE_URL` | MySQL / TiDB connection string | `mysql://USER:PASSWORD@HOST:4000/DATABASE?sslaccept=strict` |

### Client (`client/.env` / inline fallback)

| Variable | Description | Example Placeholder |
| :--- | :--- | :--- |
| `VITE_API_URL` | URL of backend API server | `http://localhost:5000/api` |

> **Security Warning**: Never commit real credentials, database passwords, or secret keys to version control.

---

## Database

The database is managed using **Prisma ORM** with a **MySQL** target provider (compatible with TiDB Cloud).

### Schema Models

1. **User (`users`)**: Represents system users (Employees, HR Officers, Admins).
   * `id` (String, Primary Key, UUID)
   * `email` (String, Unique)
   * `name` (String, Optional)
   * `role` (String, Default: `"USER"`)
   * `createdAt` (DateTime)
   * `updatedAt` (DateTime)

2. **SystemHealth (`system_health`)**: Logs system health status.
   * `id` (String, Primary Key, UUID)
   * `status` (String, Default: `"OK"`)
   * `checkedAt` (DateTime)

### Entity Relationship Diagram

```mermaid
erDiagram
    users {
        String id PK
        String email UK
        String name
        String role
        DateTime createdAt
        DateTime updatedAt
    }

    system_health {
        String id PK
        String status
        DateTime checkedAt
    }
```

---

## Authentication & Authorization

* **Current Status**: Baseline `User` model with role attributes (`"USER"`, `"ADMIN"`, `"HR"`) is configured in the database schema.
* **Planned RBAC Architecture**: JWT (JSON Web Token) authentication with HTTP-only cookies, role validation middleware, and protected API routes for HR vs Employee actions.

---

## API Documentation

### Base Route
* `GET /` — Returns welcome message from the backend API.

### System Health
* `GET /api/health` — Executes a live database check (`SELECT 1`) against TiDB MySQL, counts total registered users, and returns system health metadata.

**Sample Response (`GET /api/health`):**
```json
{
  "status": "ok",
  "service": "odoo-X-nmit-backend",
  "timestamp": "2026-08-22T09:15:00.000Z",
  "database": {
    "provider": "mysql (TiDB)",
    "status": "connected",
    "error": null,
    "userCount": 0
  }
}
```

---

## Code Quality

The repository includes code quality verification tools for both client and server:

* **Frontend Linting**:
  ```bash
  cd client
  npm run lint
  ```
* **Backend Type Checking & Build Verification**:
  ```bash
  cd server
  npm run build
  ```

---

## Development Workflow

To contribute to Dayflow, follow this standardized workflow:

```text
Issue / Task Assignment
  ↓
Create Feature Branch (e.g., feature/leave-approval)
  ↓
Local Development & Implementation
  ↓
Type Checking & Linting (`npm run lint`, `npm run build`)
  ↓
Commit Changes with Clear Messages
  ↓
Push Branch & Open Pull Request
  ↓
Code Review & Approval
  ↓
Merge into main
```

---

## Contributing

1. **Fork or Clone the Repository**: Obtain the latest code from `main`.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Your Changes**: Adhere to existing code conventions and component structures.
4. **Verify Quality**:
   - Run `npm run lint` in `client/`
   - Run `npm run build` in `server/`
5. **Submit a Pull Request**: Provide a detailed explanation of changes made.

---

## Security

Dayflow implements several foundational security measures:
* **Environment Variable Isolation**: Sensitive database URIs and port settings are loaded via `.env` files and omitted from version control.
* **SQL Injection Prevention**: All database interactions use Prisma ORM's parameterized query engine.
* **CORS Protection**: Express server utilizes CORS middleware to control origin access.
* **Encrypted Database Communication**: Remote database connections support TLS/SSL parameters (`sslaccept=strict`).

---

## Roadmap / Future Enhancements

As Dayflow matures from its foundation, the following modules are planned for development:

- [ ] **JWT Authentication & Authorization**: Registration, login, password hashing, and token verification middleware.
- [ ] **Employee Profile Portal**: Full CRUD operations for employee records, emergency contacts, and job roles.
- [ ] **Attendance Tracking Engine**: Punch-in/out functionality with work hour analytics.
- [ ] **Leave Request Workflow**: Dynamic leave application forms and HR approval dashboards.
- [ ] **Payroll & Salary Slips**: Salary breakdown viewing and PDF slip generation.
- [ ] **Email & In-App Notifications**: Automated notification alerts for pending approvals.
- [ ] **Analytics & HR Reports**: Dashboard visualizer for organization headcount, attendance trends, and leave statistics.

---

## Screenshots / Demo

*Screenshots and UI visual demos will be added here as core HR feature modules are deployed.*

---

## License

ISC License (as specified in `server/package.json`).
