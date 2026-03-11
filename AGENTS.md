# AGENTS.md

## Cursor Cloud specific instructions

**ToolHarbor** is a single Next.js 16 application (App Router) with 59 client-side developer tools. No backend, database, or external services are required.

### Running the app

- Dev server: `bun dev` (port 3000 by default)
- All tools are client-side only; the dev server is the only service needed.

### Checks (see `package.json` scripts and `.husky/pre-commit`)

- Lint: `bun run lint` (ESLint — 3 pre-existing warnings, 0 errors)
- Format: `bun run format:check` (Prettier)
- Type check: `bun run tsc --noEmit`
- Build: `bun run build`
- Pre-commit hook runs: `tsc --noEmit`, `format:check`, and `lint-staged`

### Notes

- There are no automated test suites (no test files or test runner configured).
- No `.env` file is needed; the three `NEXT_PUBLIC_*` env vars are optional (analytics/ads only).
- Bun is the package manager (lockfile: `bun.lock`). Node.js 20+ is required.
