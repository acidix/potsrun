# Contributing to PotsRun

Thanks for your interest in improving the PotsRun website — the web home of the
**PotsRun** running community. This document explains how to set up the project,
the standards we follow, and how contributions are reviewed and merged.

By participating you agree to our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Table of contents

- [Ways to contribute](#ways-to-contribute)
- [Prerequisites](#prerequisites)
- [Local setup](#local-setup)
- [Development workflow (GitHub flow)](#development-workflow-github-flow)
- [Coding standards](#coding-standards)
- [Commit messages](#commit-messages)
- [Pull requests](#pull-requests)
- [Where contributions go](#where-contributions-go)

## Ways to contribute

- **Report a bug** using the [bug report template](https://github.com/acidix/potsrun/issues/new?template=bug_report.yml).
- **Request a feature** using the [feature request template](https://github.com/acidix/potsrun/issues/new?template=feature_request.yml).
- **Ask a question** in [Discussions](https://github.com/acidix/potsrun/discussions).
- **Report a vulnerability** privately — see [SECURITY.md](./SECURITY.md).
- **Submit code or docs** via a pull request (see below).

Please search existing issues and PRs before opening a new one.

## Prerequisites

- **Node.js 24+** (see `.nvmrc`; run `nvm use` if you use nvm).
- **npm 10+** (ships with Node 24).
- Sanity access. The required values are `NEXT_PUBLIC_*` (public) and are not
  committed; copy `.env.example` to `.env.local` and ask a maintainer for the
  project id, or use your own Sanity project. Never commit real secrets.

## Local setup

```bash
git clone git@github.com:acidix/potsrun.git
cd potsrun
nvm use            # picks up Node 24 from .nvmrc
npm ci             # reproducible install from package-lock.json
npm run dev        # http://localhost:3000
```

Editing content is done in Sanity Studio:

```bash
npx sanity dev
```

## Development workflow (GitHub flow)

We follow [GitHub flow](https://docs.github.com/get-started/using-github/github-flow):

1. **Create a branch** off `main` with a descriptive name:
   - `feat/…` new feature — e.g. `feat/event-ics-export`
   - `fix/…` bug fix — e.g. `fix/countdown-timezone`
   - `docs/…`, `chore/…`, `refactor/…` for others.
2. **Make focused commits.** Keep each commit self-contained and buildable.
3. **Keep your branch up to date** by rebasing on `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
4. **Run checks locally** before pushing:
   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```
5. **Push** and **open a Pull Request** against `main`.
6. **Address review feedback.** All conversations must be resolved.
7. **Squash-merge** once approved and green (maintainers do this).

### Branch protection on `main`

`main` is protected. Direct pushes are disabled and every change must arrive
via a Pull Request that satisfies:

- At least **1 approving review**, from a **CODEOWNER** for the touched files.
- **Stale approvals dismissed** when new commits are pushed.
- Required status checks pass: **CI / quality** and **CodeQL / Analyze**.
- Conversations resolved and branch up to date with `main`.

See [`scripts/setup-github.sh`](./scripts/setup-github.sh) for the exact
configuration (maintainers only).

## Coding standards

- **Language:** TypeScript preferred for new files. Existing `.js` files may
  stay as-is unless you are already editing them.
- **Formatting:** 2-space indentation, double quotes, trailing commas.
- **Components:** PascalCase filenames (`NextMatch.tsx`), function components
  with hooks, co-located styles.
- **Helpers:** camelCase.
- **Sanity schemas:** descriptive nouns (`event`, `post`); register new schemas
  in `src/sanity/schemaTypes/index.ts`.
- **Imports:** use the `@/*` path alias for `src`.
- **Tests:** co-locate as `*.test.ts(x)` (Jest + Testing Library) and run
  `npm test`; mock `src/sanity/lib/client` for components that fetch Sanity data.
- Run `npm run lint` and fix warnings rather than disabling rules.

See [AGENTS.md](./AGENTS.md) for a deeper map of the codebase and conventions.

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) for the
subject line; keep it imperative and under ~72 characters:

```
feat: add ICS export for upcoming matches
fix: correct countdown when the event is today
docs: document Sanity environment variables
chore(deps): bump next to 16.2.3
```

Reference issues in the body (e.g. `Closes #42`).

## Pull requests

- Fill in the PR template — summary, linked issue, test steps, screenshots for
  UI changes.
- Keep PRs small and focused; split unrelated changes.
- Do not commit secrets, `.env` or `.env*.local`, or large binary assets. Put large
  original media under `/sources` (git-ignored) or shared storage.
- A maintainer will review, may request changes, and will squash-merge when the
  PR is green and approved.

## Where contributions go

Changes are reviewed against the repository's documented standards and, when
one exists, the originating issue. If you are unsure whether something is in
scope, open an issue or discussion first — we're happy to help.

Thanks for contributing!
