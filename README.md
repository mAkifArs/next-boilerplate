# Next.js Boilerplate

A production-ready Next.js boilerplate with TypeScript, Zustand, Chakra UI, and Tailwind CSS.

## Features

- ⚡ **Next.js 14** with App Router
- 🔷 **TypeScript** with strict mode
- 🎨 **Chakra UI** for accessible components
- 🎨 **Tailwind CSS** for utility styling
- 🐻 **Zustand** for state management
- 🧪 **Vitest** for unit and integration testing
- 🎭 **Playwright** for E2E testing
- 📦 **bun** for package management
- 🔒 **Security headers** configured
- ✅ **ESLint** + **Prettier** for code quality
- 🚀 **GitHub Actions** CI/CD

## Getting Started

### Prerequisites

- Node.js 20+ (or Bun runtime)
- Bun 1.0+

### Installation

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun build

# Start production server
bun start
```

## Project Structure

```
src/
  app/              # Next.js App Router routes
  components/       # React components
    ui/            # Chakra UI components and custom wrappers
    primitives/    # Lowest-level building blocks
    shared/        # Reusable feature-agnostic components
    layout/        # Shell/headers/footers/nav
  features/        # Feature-based modules
  lib/             # Utilities, stores, services
    store/         # Zustand stores
    services/      # API clients, server actions
    utils/         # Pure utilities
    constants/     # App constants
    validations/   # Zod schemas
  tests/           # Test files
    unit/          # Unit tests
    integration/   # Integration tests
    e2e/           # E2E tests
  types/           # Global TypeScript types
```

## Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun typecheck` - Run TypeScript type check
- `bun test` - Run tests in watch mode
- `bun test:ci` - Run tests with coverage
- `bun e2e` - Run E2E tests
- `bun format` - Format code with Prettier
- `bun format:check` - Check code formatting

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NODE_ENV=development
# Add your environment variables here
```

Environment variables are validated using Zod in `src/lib/env.ts`.

## Testing

### Unit Tests

Unit tests are written with Vitest and placed in `src/tests/unit/`.

```bash
bun test
```

### Integration Tests

Integration tests are written with Vitest and React Testing Library, placed in `src/tests/integration/`.

### E2E Tests

E2E tests are written with Playwright and placed in `src/tests/e2e/`.

```bash
bun e2e
```

## Code Style

This project uses:

- **ESLint** for linting
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

Run `bun format` before committing to ensure consistent formatting.

## State Management

Global state is managed with Zustand. Stores are located in `src/lib/store/`.

Example:

```ts
import { useSession } from "@/lib/store/session";

function MyComponent() {
  const { token, setToken } = useSession();
  // ...
}
```

## UI Components

This project uses Chakra UI for accessible components. Custom components can be created in `src/components/ui/`.

## License

MIT

