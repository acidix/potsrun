#!/usr/bin/env bash
#
# Configure GitHub repository settings and `main` branch protection for
# acidix/potsrun.
#
# Prerequisites:
#   - GitHub CLI installed (https://cli.github.com/)
#   - Authenticated with admin rights:  gh auth login
#     (classic token scope `repo` + admin, or a fine-grained token with
#      "Administration" read/write)
#
# Usage:
#   ./scripts/setup-github.sh            # apply everything
#   ./scripts/setup-github.sh --dry-run  # print payloads only
#
set -euo pipefail

REPO="${REPO:-acidix/potsrun}"
BRANCH="${BRANCH:-main}"
DRY_RUN="${1:-}"

# Status check names must match the job names shown in the Actions UI.
CI_CHECK="Lint, typecheck & build"
CODEQL_CHECK="Analyze (javascript-typescript)"

read -r -d '' REPO_SETTINGS <<JSON || true
{
  "has_discussions": true,
  "allow_squash_merge": true,
  "allow_merge_commit": false,
  "allow_rebase_merge": false,
  "allow_auto_merge": true,
  "delete_branch_on_merge": true,
  "allow_update_branch": true,
  "security_and_analysis": {
    "secret_scanning": { "status": "enabled" },
    "secret_scanning_push_protection": { "status": "enabled" }
  }
}
JSON

read -r -d '' BRANCH_PROTECTION <<JSON || true
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["${CI_CHECK}", "${CODEQL_CHECK}"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 1,
    "require_last_push_approval": true
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": false
}
JSON

if [[ "${DRY_RUN}" == "--dry-run" ]]; then
  echo "## PATCH /repos/${REPO}"
  echo "${REPO_SETTINGS}"
  echo
  echo "## PUT /repos/${REPO}/branches/${BRANCH}/protection"
  echo "${BRANCH_PROTECTION}"
  exit 0
fi

echo "==> Applying repository settings (merge strategy, discussions, security)"
echo "${REPO_SETTINGS}" | gh api \
  --method PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "repos/${REPO}" \
  --input -

echo "==> Enabling Dependabot alerts and security updates"
gh api --method PUT "repos/${REPO}/vulnerability-alerts"
gh api --method PUT "repos/${REPO}/automated-security-fixes"

echo "==> Applying branch protection to ${REPO}@${BRANCH}"
echo "${BRANCH_PROTECTION}" | gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "repos/${REPO}/branches/${BRANCH}/protection" \
  --input -

echo
echo "Done."
echo " - Branch protection: https://github.com/${REPO}/settings/branches"
echo " - Security settings: https://github.com/${REPO}/settings/security_analysis"
