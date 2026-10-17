# PotsRun

The website for **PotsRun**, a running community in Potsdam, Germany. The site
publishes upcoming runs and club events, a blog, gallery content, and general
club information.

- **Live:** https://www.potsrun.de
- **Content studio:** https://www.potsrun.de/admin

[![Vercel](https://deploy-badge.vercel.app/?url=https%3A%2F%2Fwww.potsrun.de%2F&name=potsrun.de)](https://vercel.com/)
[![CI](https://github.com/acidix/potsrun/actions/workflows/ci.yml/badge.svg)](https://github.com/acidix/potsrun/actions/workflows/ci.yml)
[![CodeQL](https://github.com/acidix/potsrun/actions/workflows/codeql.yml/badge.svg)](https://github.com/acidix/potsrun/actions/workflows/codeql.yml)
[![Dependency Review](https://github.com/acidix/potsrun/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/acidix/potsrun/actions/workflows/dependency-review.yml)
![Node](https://img.shields.io/badge/node-%3E%3D24-brightgreen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Tech stack

| Area          | Technology                                      |
| ------------- | ----------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org/) (App Router)  |
| UI            | React 19, styled-components, SCSS               |
| Content       | [Sanity](https://www.sanity.io/) v5             |
| Runtime       | Node.js 24 (see `.nvmrc`)                       |
| Hosting       | [Vercel](https://vercel.com/)                   |
| Quality       | ESLint, TypeScript, CodeQL, Dependabot          |

## Project structure

```text
src/
  app/                     Next.js App Router routes, layouts & metadata
    api/revalidate/        On-demand revalidation endpoint (Sanity webhook)
    blog/, events/, admin/ Public routes + embedded Sanity Studio
  components/
    potsrun/               Feature UI (NextMatch, Gallery, BlogPost, …)
    Layouts/               Navbar, Footer, AOS animations
  sanity/
    schemaTypes/           Document & object schemas
    lib/                   Sanity client, queries, image helpers
styles/                    Global CSS/SCSS bundles
public/                    Static assets shipped with the app
test/mocks/                Jest stubs for ESM Sanity packages
scripts/                   Maintainer tooling
sources/                   Large design originals (git-ignored)
```

## Getting started

### Prerequisites

- **Node.js 24+** and **npm 10+**. With nvm: `nvm use` (reads `.nvmrc`).

### Setup

```bash
git clone git@github.com:acidix/potsrun.git
cd potsrun
nvm use
npm ci
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
```

The Sanity Studio is mounted at `/admin`. To run it standalone:

```bash
npx sanity dev
```

### Environment variables

| Variable                          | Required | Description                              |
| --------------------------------- | -------- | ---------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`   | yes      | Sanity project id                        |
| `NEXT_PUBLIC_SANITY_DATASET`      | yes      | Sanity dataset name (e.g. `production`)  |
| `NEXT_PUBLIC_SANITY_API_VERSION`  | no       | API version; defaults to `2024-09-04`    |

These are `NEXT_PUBLIC_*` values and are safe to expose (they ship in the
client bundle). No `.env` file is committed — copy the template and fill it in
locally:

```bash
cp .env.example .env.local
```

For CI, set them as **GitHub Actions repository secrets**; for the live site,
set them in the **Vercel project settings** (see [Deployment](#deployment)).

## Available scripts

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start dev server with Turbopack                    |
| `npm run build`     | Production build                                   |
| `npm run start`     | Serve the production build locally                 |
| `npm run lint`      | Run ESLint (`eslint-config-next`)                  |
| `npm run typecheck` | Type-check with `tsc --noEmit`                     |
| `npm test`          | Run the Jest + Testing Library suite               |
| `npm run test:watch`| Run tests in watch mode                            |
| `npm run deploy`    | Deploy to Vercel production (maintainers only)     |
| `npx sanity dev`    | Run Sanity Studio for content editing              |

## Deployment

The site deploys to **Vercel**. Pushes to `main` produce a production
deployment; pull requests get preview deployments. Production releases can also
be triggered manually with `npm run deploy` (requires Vercel auth).

Environment variables must be configured in the Vercel project (Production,
Preview and Development) with the same values as the GitHub Actions secrets —
see [Environment variables](#environment-variables).

Status is reported by the badges above: **Vercel** reflects the production
deployment health, **CI** verifies lint, typecheck, tests and build, and
**CodeQL** runs security analysis on every change to `main`.

## Contributing

We welcome contributions. Please read **[CONTRIBUTING.md](./CONTRIBUTING.md)**
for setup, the GitHub flow we follow, coding standards, and how PRs are
reviewed. By participating you agree to the
[Code of Conduct](./CODE_OF_CONDUCT.md).

- `main` is protected: changes land via PR with a **CODEOWNER** review and
  passing status checks (required contexts: **CI**, **CodeQL**).
- Use the issue templates for [bugs](https://github.com/acidix/potsrun/issues/new?template=bug_report.yml)
  and [features](https://github.com/acidix/potsrun/issues/new?template=feature_request.yml).
- AI/automation agents should follow [AGENTS.md](./AGENTS.md).

## Security

Please report vulnerabilities privately — see [SECURITY.md](./SECURITY.md).
The repository runs CodeQL, Dependabot, and dependency review automatically.

## License

Released under the [MIT License](./LICENSE). © 2026 PotsRun.
