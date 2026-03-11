# CodeLeap Engineering Test

This project is a simple social feed application built as part of the CodeLeap engineering test.

The goal was to demonstrate practical frontend development using **React, Next.js and TypeScript**, focusing on clean structure, predictable state management and readable code.

The implementation intentionally avoids unnecessary complexity and focuses on solving the core requirements clearly.

---

# Stack

- Next.js (App Router)
- React
- TypeScript
- TanStack Query (React Query)
- Tailwind CSS
- shadcn/ui
- Native Fetch API

---

# Architecture Decisions

The project follows Next.js App Router conventions while keeping a clear separation between routing, UI components and data logic.

```
app/                        # routing only — page.tsx files are thin re-exports
  layout.tsx
  page.tsx                  # redirects to /signup
  signup/page.tsx           # export { default } from "@/components/signup/SignupPage"
  feed/page.tsx             # export { default } from "@/components/feed/FeedPage"

components/
  signup/
    SignupPage.tsx          # full page component

  feed/
    FeedPage.tsx            # main feed page
    PostCard.tsx            # post UI
    CreatePostForm.tsx
    EditPostModal.tsx
    DeleteConfirmModal.tsx

  Providers.tsx             # React Query provider wrapper
  ui/                       # shadcn/ui primitives

hooks/
  usePosts.ts               # React Query hooks

services/
  postsService.ts           # API abstraction layer

lib/
  formatDate.ts             # small utility
  utils.ts                  # shadcn helper

types/
  post.ts                   # API types
```

---

# Routing Strategy

The `app/` directory is used only for routing configuration.

Page files simply re-export the corresponding page component:

```ts
export { default } from "@/components/signup/SignupPage";
```

This keeps routing files minimal while the actual page logic lives inside the `components` folder.

This approach helps keep feature code organized and easier to move or refactor later.

---

# Feature Organization

Components that belong to the same feature live together.

For example, everything related to the feed is inside:

```
components/feed
```

This makes it easier to navigate the codebase and avoids scattering related files across multiple folders.

---

# File Naming Conventions

| Type                  | Convention | Example                    |
| --------------------- | ---------- | -------------------------- |
| React components      | PascalCase | PostCard.tsx, FeedPage.tsx |
| Next.js special files | lowercase  | page.tsx, layout.tsx       |
| Hooks                 | camelCase  | usePosts.ts                |
| Services              | camelCase  | postsService.ts            |
| Utilities             | camelCase  | formatDate.ts              |

---

# Data Fetching

Server state is managed using **TanStack Query (React Query)**.

It simplifies handling asynchronous data by providing:

- loading and error states
- automatic caching
- background refetching
- cache invalidation after mutations

The feed uses a single query key:

```
["posts"]
```

After creating, editing or deleting a post, the query is invalidated:

```
queryClient.invalidateQueries({ queryKey: ["posts"] })
```

This triggers a refetch and keeps the UI synchronized with the API.

---

# API Layer

The API logic is centralized inside:

```
services/postsService.ts
```

This file contains small wrapper functions around `fetch`:

- getAll
- create
- update
- delete

Separating API logic from components helps keep UI code cleaner and makes the service reusable.

---

# State Management

The application uses two types of state.

### Server State

Handled by **React Query**.

Posts are fetched and cached using query hooks.

---

### Local UI State

Handled with standard React state.

Examples include:

- form inputs
- modal visibility
- current username

The username is stored in **sessionStorage** so the user remains logged during the session.

---

# Running the Project

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

# Possible Improvements

If this project evolved further, some improvements could include:

- optimistic UI updates
- pagination or infinite scroll
- better error feedback (toasts)
- skeleton loading states
- stronger form validation

These were intentionally left out to keep the implementation focused on the core requirements.
