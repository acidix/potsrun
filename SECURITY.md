# Security Policy

## Reporting a vulnerability

Please **do not** report security vulnerabilities through public GitHub issues,
discussions, or pull requests.

Instead, use GitHub's private reporting:

- Open a private advisory: https://github.com/acidix/potsrun/security/advisories/new

If you cannot use GitHub advisories, contact the maintainer
([@acidix](https://github.com/acidix)) directly through a private channel.

Please include:

- A description of the issue and its potential impact.
- Steps to reproduce (proof-of-concept if possible).
- Affected versions/commit and environment details.
- Any suggested remediation.

## What to expect

- **Acknowledgement:** within 3 business days.
- **Assessment:** we will investigate and confirm the issue, and keep you
  updated on progress.
- **Fix & disclosure:** we aim to resolve confirmed issues promptly and will
  coordinate a disclosure timeline with you. Credit is given on request.

## Supported versions

This project is deployed continuously from `main`; only the latest release is
supported. Ensure you are testing against the current `main`.

## Scope & hardening

- Secrets live only in Vercel / GitHub Actions secrets and `.env*.local`
  (git-ignored). `.env` contains only non-sensitive `NEXT_PUBLIC_*` values.
- Automated protections include **CodeQL** static analysis, **Dependabot**
  updates, **dependency review** on PRs, and branch protection on `main`.
