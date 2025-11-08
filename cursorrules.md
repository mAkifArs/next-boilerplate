# Cursor Rules for This Repo

You are an expert in **TypeScript, Node.js, Next.js App Router, React, Chakra UI, and Tailwind CSS**. Follow everything below when generating, editing, reviewing, or refactoring code in this project.

---

## 0) Project Intent

- Build a clean, production‑ready **Next.js App Router** boilerplate with **TypeScript** and **Zustand** for state, using **Chakra UI** for components and **Tailwind CSS** for styling.
- Priorities: **Correctness → Accessibility → Performance (Web Vitals) → DX → Polish**.
- Optimize for **React Server Components**. Minimize client boundaries.

---

## 1) Directory Layout (App Router)

```
src/
  app/                      # App Router entry
    (marketing)/            # Example route group
    (app)/                  # Auth-protected app routes (example)
    api/                    # Route handlers
    layout.tsx
    page.tsx
    globals.css
  components/
    ui/                     # Chakra UI components and custom wrappers
    primitives/             # Lowest-level building blocks
    shared/                 # Reusable feature-agnostic components
    layout/                 # Shell/headers/footers/nav
  features/
    forum/                  # Example feature (pages, components, hooks, services)
      components/
      hooks/
      lib/
      types/
      page.tsx
  lib/
    store/                  # Zustand stores
    services/               # API clients, server actions
    utils/                  # Pure utilities (no React)
    constants/
    validations/            # zod schemas
  styles/
  tests/
    unit/
    integration/
    e2e/
  types/
  __mocks__/
```

**Naming:** directories and files use **kebab-case**. Components use **PascalCase** file name if default export, otherwise named exports in kebab-case files.

---

## 2) Code Style & Structure

- Write **concise, technical TypeScript** with accurate examples.
- Always prefer **functional + declarative** patterns; **no classes**.
- Prefer **small, composable modules**; avoid duplication.
- Order in modules: **exported component → local subcomponents → helpers → static content → types**.
- Variable names: descriptive with auxiliaries (e.g. `isLoading`, `hasError`).
- Favor **named exports** for components and utilities; default export only for `page.tsx`/root components when idiomatic.

---

## 3) TypeScript Rules

- Use **TypeScript everywhere**; **`strict`** mode required.
- Prefer **`interface`** over `type` for object shapes.
- Avoid `enum`; use **const objects + union literals** or **maps**.
- No `any` unless **explicitly justified** with a `// TODO: narrow type`.
- Use **typed React FCs** without the `React.FC` type (avoid implicit children).
- Public function signatures must be typed; rely on inference only for locals.
- **Always use path aliases** (`@/`) for imports from `src/`; never use relative paths like `../../../`.

```ts
export interface User {
  id: string;
  name: string;
  role: "admin" | "user";
}

export function getRoleLabel(role: User["role"]) {
  const MAP = { admin: "Administrator", user: "User" } as const;
  return MAP[role];
}
```

---

## 4) React & Next.js Patterns

- **Limit `"use client"`** to leaf components that truly need browser APIs or interactive state.
- **Data fetching**: Prefer **RSC** with `fetch()` or server actions; **do not** fetch inside client components.
- Wrap client components with **`<Suspense fallback={...}>`** when they do async work.
- Use **`dynamic(() => import(...), { ssr: false } )`** sparingly for non‑critical UI.
- **Routing**: App Router conventions only. Co-locate route components under `src/app`.
- **Forms**: `react-hook-form` + `zod` resolver, return typed errors.
- **Server Actions vs Route Handlers**: Use **server actions** (`"use server"`) for mutations and form submissions. Use **route handlers** (`app/api/*/route.ts`) only for external API integrations, webhooks, or when you need HTTP-specific features (headers, status codes for non-200 responses).
- **Error Boundaries**: Create `error.tsx` files in route segments for error handling. Use `notFound()` for 404s.
- **Loading States**: Create `loading.tsx` files for route-level loading UI. Use `<Suspense>` boundaries for component-level loading.

```tsx
// app/(app)/settings/page.tsx (Server Component)
export default async function SettingsPage() {
  const user = await getUser(); // server action or db call
  return <SettingsClient user={user} />;
}
```

---

## 5) State & URL Conventions

- Global/app state: **Zustand** in `src/lib/store`. Keep stores **small** and **domain‑scoped**.
- Derived/async state: prefer **selectors**; don’t store values you can derive.
- URL state: use **`nuqs`** for query parameters. Server reads via `searchParams`; client sync via nuqs hooks.

```ts
// lib/store/session.ts
import { create } from "zustand";

interface SessionState {
  token?: string;
  setToken: (t?: string) => void;
}
export const useSession = create<SessionState>((set) => ({
  token: undefined,
  setToken: (t) => set({ token: t }),
}));
```

---

## 6) UI, Styling & Accessibility

- Use **Chakra UI** components as the primary UI library. Extend and customize in `components/ui`.
- Styling: **Tailwind CSS** for utility classes and custom styling. Chakra UI's built-in styling system for component props.
- Chakra UI provides built-in **a11y** (ARIA, focus management, keyboard navigation). Leverage these features.
- Follow color-contrast AA standards; Chakra UI theme handles this by default.
- Wrap the app with `<ChakraProvider>` in `src/app/layout.tsx`.
- **Note**: Chakra UI components require `"use client"` since they use React hooks. Use them in client components; pass data from Server Components as props.

```tsx
import { Button } from "@chakra-ui/react";

<Button width={{ base: "full", sm: "auto" }}>Continue</Button>;
```

---

## 7) Performance & Web Vitals

- Targets: **LCP < 2.5s**, **CLS < 0.1**, **INP/FID < 200ms**.
- Optimize images with `next/image` (prefer **WebP/AVIF**), include `width/height`, use lazy loading.
- Memoize expensive computations; avoid unnecessary `useEffect`.
- Split code with dynamic imports for rarely used widgets.

---

## 8) Data, Errors & Logging

- Server errors: throw `AppError` with a public message; handle via **error routes** (`error.tsx`) and **`notFound()`**.
- Client errors: show **toast** notification + inline message.
- Logging: `console.*` allowed in server code; strip from client in prod (ESLint rule).
- Never leak secrets to the client. Read process env only on server modules.
- **Environment Variables**: Use `NEXT_PUBLIC_*` prefix only for client-accessible vars. All other env vars are server-only. Validate with zod in `src/lib/env.ts`.

---

## 9) Security

- Enforce **strict Content Security Policy** and security headers in `next.config` or middleware.
- Validate **all** inputs with **zod** on server boundaries.
- Use **`httpOnly`, `secure`, `sameSite=strict`** cookies for auth.
- Sanitize any HTML with a trusted library before rendering.

---

## 10) Testing Policy

- **Unit**: **Vitest** for pure logic and hooks.
- **Component/Integration**: **React Testing Library** with Vitest + JSDOM.
- **E2E**: **Playwright** against the built app.
- Minimum coverage: **statements 80%**, **branches 70%** (enforced in CI via `vitest --coverage`).
- Place tests next to code or under `src/tests/*` mirroring paths.
- **Server Components**: Test via integration tests that render the full route. Mock server actions/fetches at the boundary.

```ts
// Example: tests/unit/getRoleLabel.test.ts
import { describe, it, expect } from "vitest";
import { getRoleLabel } from "@/lib/utils/getRoleLabel";

describe("getRoleLabel", () => {
  it("maps role to label", () => {
    expect(getRoleLabel("admin")).toBe("Administrator");
  });
});
```

---

## 11) Linting, Formatting & Commit Style

- **ESLint** + **@typescript-eslint** + **eslint-config-next** + **eslint-plugin-react-hooks**.
- **Prettier** for formatting; avoid line-wrapping config churn.
- **Conventional Commits** for messages. PRs must pass **CI** (lint, typecheck, tests, build).

---

## 12) Example Forum Feature Slice (Reference)

```
src/features/forum/
  components/
    PostCard.tsx
    NewPostForm.tsx
  hooks/
    useCreatePost.ts
  lib/
    api.ts              # server actions / fetchers
  types/
    post.ts
  page.tsx              # list page (RSC)
```

**Note**: Features can be self-contained modules. If a feature needs a route, it can have a `page.tsx` that gets imported into `src/app/*/page.tsx`, or the route can live directly in `src/app/` and import feature components/hooks from `src/features/*`.

---

## 13) Boilerplate Snippets (Drop-in Config)

### `tsconfig.json` (strict + path aliases)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "src"],
  "exclude": ["node_modules"]
}
```

### `.eslintrc.cjs`

```js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
```

### `.prettierrc`

```json
{ "semi": true, "singleQuote": false, "printWidth": 100 }
```

### `vitest.config.ts`

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    coverage: { reporter: ["text", "lcov"], lines: 80, branches: 70 },
    setupFiles: ["./src/tests/setup.ts"],
  },
});
```

### `playwright.config.ts`

```ts
import { defineConfig } from "@playwright/test";
export default defineConfig({
  webServer: {
    command: "bun build && bun start",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  use: { baseURL: "http://localhost:3000" },
});
```

### `.github/workflows/ci.yml`

```yml
name: ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      - run: bun install --frozen-lockfile
      - run: bun lint && bun typecheck && bun test:ci && bun build
```

### `package.json` scripts (example)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "vitest",
    "test:ci": "vitest run --coverage",
    "e2e": "playwright test"
  }
}
```

---

## 14) How Cursor Should Use This File (Important)

- Always **read this file** and follow constraints before generating code.
- Prefer **RSC** and **server actions**. Avoid `useEffect` for data fetching.
- Use **Zustand** only for **client-only UI state**.
- Use **nuqs** for URL params; do **not** hand-roll querystring helpers.
- For UI, use **Chakra UI** components; extend them in `components/ui` when needed. Chakra UI provides built-in accessibility.
- Every new route/component must ship with: types, minimal tests, and a11y‑friendly markup.

---

## 15) Forum Page Example (Reference)

```tsx
// src/features/forum/page.tsx (Server Component)
import { listPosts } from "@/features/forum/lib/api";
import { PostList } from "@/features/forum/components/PostList";

export default async function ForumPage() {
  const posts = await listPosts();
  return <PostList posts={posts} />;
}
```

```tsx
// src/features/forum/components/PostList.tsx
import type { Post } from "@/features/forum/types/post";
import { SimpleGrid, Box, Heading, Text } from "@chakra-ui/react";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
      {posts.map((p) => (
        <Box key={p.id} p={4} borderWidth="1px" borderRadius="lg" shadow="sm">
          <Heading as="h3" size="md" mb={2}>
            {p.title}
          </Heading>
          <Text fontSize="sm" color="gray.600" noOfLines={3}>
            {p.summary}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}
```

---

## 16) Optional: `.cursor/config.json`

```json
{
  "rules": "./cursorrules.md",
  "description": "Next.js + TypeScript + Zustand + Chakra UI boilerplate",
  "defaultModel": "gpt-5",
  "autoComplete": true
}
```

---

## 17) Non‑Goals & Anti‑Patterns

- Don’t fetch data in client components.
- Don’t introduce Redux, MobX, or global event buses.
- Don’t use untyped `fetch` responses; always parse/validate.
- Don’t inline CSS for layout.
- Don’t add `use client` at top-level route files.

---

## 18) Review Checklist (for every PR)

- [ ] Types are strict; no stray `any`.
- [ ] RSC used where possible; client boundaries minimal and justified.
- [ ] a11y: labels, roles, focus states, keyboard navigation.
- [ ] Tests added/updated; CI passes (lint, typecheck, test, build).
- [ ] Images optimized; no layout shifts (CLS ≤ 0.1).
- [ ] No secrets in client code; env usage server‑only.

---

**End of rules.**
