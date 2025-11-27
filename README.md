# MyanClinic Frontend (Next.js)

This is the frontend application for **MyanClinic**, built with **Next.js**, **TypeScript**, and **Redux Toolkit**. The project implements a modern, modular, and scalable UI for patient, doctor, and admin operations such as appointments, digital records, and user management.

It was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---
## System Test Credentials
#### 1. Admin Account
**Email:** admin@gmail.com<br/>
**Password:** admin123

---

#### 2. Doctor Accounts

##### 2.1 General Practitioner (GP)
**Email:** generalist@myanclinic.com <br/>
**Password:** doc123

##### 2.2 Specialist Doctor
**Email:** doctor01@gamil.com <br/> 
**Password:** doc123

---

#### 3. Patient Account
**Email:** patient01@gmail.com <br/>
**Password:** user123

---

## Features

* **Next.js App Router** with server/client components
* **Authentication workflow** (JWT-based)
* **Role-based UI rendering** (Patient, Doctor, Admin)
* **Redux Toolkit** for global state management
* **Protected Routes** with middleware
* **React Query or Fetch wrappers** (depending on your setup)
* **File uploads** (medical records, images)
* **Appointment booking UI**
* **Responsive UI with TailwindCSS**
* **Reusable components** for tables, forms, modals, layouts
* **Integration with Nest.js backend (MyanClinic API)**

---

## Getting Started

### 1. Install dependencies

```
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Start development server

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit:

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_AI_URL=http://localhost:8000
```

Add any additional tokens or encryption keys based on your authentication workflow.

---

## Project Architecture

```
src/
│── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (guest)/login/
│   ├── (protected)/dashboard/
│   ├── middleware.ts
│   └── api/ (optional route handlers)
│
├── components/
│   ├── ui/              # buttons, inputs, modals
│   ├── layout/          # navbar, sidebar
│   ├── forms/           
│   └── widgets/         # dashboard widgets
│
├── hooks/
│   ├── useHandleLogout.ts
│   ├── useAuth.ts
│   └── useFetch.ts
│
├── store/
│   ├── index.ts
│   ├── hooks.ts
│   └── features/
│       ├── auth/
│       ├── user/
│       └── appointments/
│
├── services/            # Axios/Fetch API wrappers
│   ├── auth.service.ts
│   ├── user.service.ts
│   └── appointment.service.ts
│
├── types/               # DTOs, shared interfaces
│
├── lib/                 # utilities (formatters, constants)
│
└── assets/              # images, icons
```

---

## Authentication Workflow (Frontend)

1. User logs in → receive JWT from backend.
2. Token stored in:

   * Redux state
   * localStorage
3. Middleware checks:

   * If token missing → redirect to `/login`
4. Protected routes under `(protected)/`
5. Logout:

   * Clear Redux state
   * Clear token storage
   * Redirect to login

---

## API Integration

Backend endpoints follow Nest.js structure:

```
/auth/login
/auth/register
/patient/*
/doctor/*
/appointment/*
/storage/upload
```

All API calls are wrapped inside:

```
src/services/*.ts
```

Example:

```ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const login = (data) => api.post("/auth/login", data);
```

---

## Scripts

```
npm run dev       # start dev server
npm run build     # production build
npm run start     # start production server
npm run lint      # lint project
```

---

## Deployment

The suggested deployment platforms:

* **Vercel** (recommended for Next.js)
* **Netlify**
* **Docker** (if deployed with backend)

Quick deploy on Vercel:

```
vercel
```

Ensure environment variables are configured on the Vercel dashboard.

---

