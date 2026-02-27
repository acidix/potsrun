# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router entries, layouts, and metadata composition.
- `src/components`: Feature-focused UI blocks (mix of `.js` and `.tsx`); colocate assets and keep new work typed where possible.
- `src/sanity`: Client configuration, queries, and schema definitions; `src/sanity/env.ts` guards required `NEXT_PUBLIC_SANITY_*` values.
- `styles`: Global CSS/SCSS bundles and vendor styles; import only what a route needs to manage bundle size.
- `public`: Static assets shipped with the app (`fonts/`, `images/`).
- `sources`: Design references and large originals—never import these in runtime code.

## Build, Test & Development Commands
- `npm run dev`: Start the Next.js dev server with hot reload; ensure Sanity env vars are present.
- `npx sanity dev`: Launch the Sanity Studio defined in `sanity.config.ts` for content editing.
- `npm run build`: Produce an optimized production build; use to verify for regressions before PR review.
- `npm run start`: Serve the production bundle locally for final smoke tests.
- `npm run lint`: Run ESLint via `eslint-config-next`; fix issues or add targeted overrides with comments.
- `npm run deploy`: Deploy to Vercel production; run only after approvals.

## Coding Style & Naming Conventions
Follow the defaults enforced by ESLint/TypeScript: 2-space indentation, double quotes, and trailing commas. Name React components and files in PascalCase (`NextMatch.tsx`), helpers in camelCase, and Sanity schemas with descriptive nouns (e.g., `event`). Prefer functional components with hooks, and keep styled-components or SCSS modules colocated; only touch vendor CSS when unavoidable.

## Testing Guidelines
No automated harness ships today—add tests alongside new features. Co-locate component tests as `ComponentName.test.tsx` using Jest + Testing Library (install once needed) and cover Sanity data transforms separately. Before merging, run `npm run build` plus manual checks in `npm run dev`, especially for time-based components like `NextMatch`.

## Commit & Pull Request Guidelines
Recent history favors short, imperative commit subjects (e.g., `Add countdown fallback`). Keep commits focused and document cross-cutting changes in the body. For PRs, include a concise summary, linked issue, UI captures when relevant, and tests executed. Store heavy source files under `/sources` or shared storage instead of bundling them in diffs.

## Sanity & Environment Configuration
Populate `.env.local` with `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_API_VERSION` (defaults to `2024-09-04`). Never commit secrets; share via secure channels. When adding schemas, register them in `src/sanity/schemaTypes/index.ts` and validate the structure with `npx sanity dev` before deploying.
