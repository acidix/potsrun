# AGENTS.md — Repository Guidelines

Guidance for AI coding agents and automated tooling working in this repository.
For human contributors, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Project Overview

PotsRun is the marketing and content website for the PotsRun running community
based in Potsdam, Germany. It is a **Next.js 16 App Router** application
(React 19) that renders content from **Sanity v5** and deploys to **Vercel**.
Live site: https://www.potsrun.de.

- **Runtime:** Node.js `>=24` (authoritative version in `.nvmrc`).
- **Package manager:** npm (lockfile committed; always use `npm ci`).
- **Language:** TypeScript preferred; some legacy files are `.js`.

## Project Structure & Module Organization

- `src/app`: Next.js App Router entries, layouts, and metadata composition.
  - `src/app/admin/[[...tool]]`: embedded Sanity Studio route.
  - `src/app/api/revalidate`: Sanity webhook handler for on-demand revalidation.
- `src/components`: Feature-focused UI blocks (mix of `.js` and `.tsx`);
  colocate assets and keep new work typed where possible.
- `src/sanity`: Client configuration, queries, and schema definitions;
  `src/sanity/env.ts` guards required `NEXT_PUBLIC_SANITY_*` values.
  - Register every new schema in `src/sanity/schemaTypes/index.ts`.
- `styles`: Global CSS/SCSS bundles and vendor styles; import only what a route
  needs to manage bundle size.
- `public`: Static assets shipped with the app (`fonts/`, `images/`).
- `scripts`: Maintainer tooling (e.g. branch protection setup).
- `sources`: Design references and large originals — git-ignored, **never**
  import these in runtime code.

## Build, Test & Development Commands

- `npm ci`: Reproducible dependency install (use instead of `npm install`).
- `npm run dev`: Next.js dev server with Turbopack; needs Sanity env vars.
- `npx sanity dev`: Launch the Sanity Studio defined in `sanity.config.ts`.
- `npm run lint`: Run ESLint via `eslint-config-next`.
- `npm run typecheck`: Run `tsc --noEmit`.
- `npm test`: Run the Jest + Testing Library suite once.
- `npm run test:watch`: Run Jest in watch mode during development.
- `npm run build`: Optimized production build; verify before requesting review.
- `npm run start`: Serve the production bundle locally for final smoke tests.
- `npm run deploy`: Deploy to Vercel production; maintainers only.

**Before proposing any change, run `npm run lint`, `npm run typecheck`,
`npm test`, and `npm run build`.** All four must pass.

## Coding Style & Naming Conventions

Follow the defaults enforced by ESLint/TypeScript: 2-space indentation, double
quotes, and trailing commas.

- React components/files: PascalCase (`NextMatch.tsx`), functional components
  with hooks.
- Helpers: camelCase.
- Sanity schemas: descriptive nouns (e.g. `event`, `post`).
- Styles: keep styled-components or SCSS modules colocated; only touch vendor
  CSS when unavoidable.
- Imports: use the `@/*` alias for `src/*`.
- Do not add comments unless they clarify non-obvious intent.

## Testing Guidelines

Jest + Testing Library with `next/jest` (`jest.config.js`, jsdom environment,
`jest.setup.js`). Co-locate tests next to the code as `*.test.ts(x)` and run
`npm test`.

- Pure logic is easy to test: rotation/date helpers live in
  `src/components/potsrun/nextMatchRotation.ts` and are covered by
  `nextMatchRotation.test.ts`.
- Components that pull Sanity data should mock `src/sanity/lib/client`
  (`sanityFetch`, `urlFor`); see `src/components/potsrun/NextMatch.test.tsx`.
- `next-sanity` and `@sanity/image-url` ship ESM and are stubbed for Jest via
  `test/mocks/` and `moduleNameMapper`.
- Pay special attention to time-based components like `NextMatch`; assert
  behaviour rather than brittle timers.

## Git, PRs & Branch Protection

- `main` is protected; **never** push directly to it. Work on a branch and open
  a Pull Request.
  - Branch names: `feat/…`, `fix/…`, `docs/…`, `chore/…`, `refactor/…`.
- Commits: short, imperative subjects following
  [Conventional Commits](https://www.conventionalcommits.org/) (e.g.
  `fix: correct countdown timezone`). Document cross-cutting changes in the body.
- Required to merge:
  - 1 approving review, including a **CODEOWNER** (`.github/CODEOWNERS`).
  - Passing status checks: **CI** (lint, typecheck, test, build) and **CodeQL**.
  - Resolved conversations and an up-to-date branch.
  - Stale approvals dismissed on new pushes; linear history enforced.
- PRs: fill in the template with summary, linked issue, test steps, and UI
  captures when relevant. Store heavy source files under `/sources` or shared
  storage instead of bundling them in diffs.

The exact protection settings are applied by `scripts/setup-github.sh`.

## CI/CD & Security

- `.github/workflows/ci.yml`: lint + typecheck + test + build on PRs and `main`.
- `.github/workflows/codeql.yml`: CodeQL `security-and-quality` analysis on PRs,
  `main`, and a weekly schedule.
- `.github/workflows/dependency-review.yml`: blocks PRs introducing
  high-severity vulnerable dependencies.
- `.github/workflows/dependabot-auto-merge.yml`: approves and enables
  auto-merge (squash) for Dependabot PRs whose `update-type` is `semver-minor`
  or `semver-patch`; major updates are left for manual review.
- `.github/dependabot.yml`: weekly grouped npm + GitHub Actions updates.
- Never commit env files. No `.env` is tracked; `.env.local` is git-ignored.
  The required values are public `NEXT_PUBLIC_*` and are supplied via GitHub
  Actions secrets (CI) and Vercel project settings (runtime).

## Sanity & Environment Configuration

Populate `.env.local` (copy from `.env.example`) with:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` (required)
- `NEXT_PUBLIC_SANITY_DATASET` (required)
- `NEXT_PUBLIC_SANITY_API_VERSION` (optional, defaults to `2024-09-04`)

CI reads the first two from repository secrets (`NEXT_PUBLIC_SANITY_PROJECT_ID`,
`NEXT_PUBLIC_SANITY_DATASET`) and defaults the API version. The same values must
also be stored as **Dependabot secrets** (identical names), because Dependabot
workflows cannot read Actions secrets. The Vercel project must define the same
variables for Production, Preview and Development.

Never commit secrets; share via secure channels. When adding schemas, register
them in `src/sanity/schemaTypes/index.ts` and validate the structure with
`npx sanity dev` before deploying.

## Agent Operating Notes

- Scope changes narrowly; avoid unrelated refactors in the same PR.
- Do not modify generated files, the lockfile without running `npm install`, or
  anything under `sources/`.
- Do not create commits, push, or open PRs unless explicitly asked.
- When unsure of project conventions, mirror the nearest existing file.
