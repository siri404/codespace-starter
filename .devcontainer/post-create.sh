#!/usr/bin/env bash
# Runs once after the dev container is created. Safe to re-run.
set -euo pipefail

cd "${CONTAINER_WORKSPACE_FOLDER:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"

log() { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }

log "Toolchain versions"
node --version
pnpm --version
python --version
ruff --version
docker --version || echo "docker: daemon may still be starting"
gh --version | head -n1

# ---- Node / pnpm --------------------------------------------------------
if [[ -f package.json ]]; then
  log "Installing Node dependencies with pnpm"
  pnpm config set store-dir "${HOME}/.local/share/pnpm/store" >/dev/null
  if [[ -f pnpm-lock.yaml ]]; then
    pnpm install --frozen-lockfile
  else
    pnpm install
  fi
else
  log "No package.json found; skipping Node dependencies"
fi

# ---- Python -------------------------------------------------------------
if [[ -f pyproject.toml || -n "$(compgen -G 'requirements*.txt' || true)" ]]; then
  log "Setting up Python virtualenv in .venv"
  [[ -d .venv ]] || python -m venv .venv
  # shellcheck disable=SC1091
  source .venv/bin/activate
  python -m pip install --upgrade pip

  for req in requirements.txt requirements-dev.txt; do
    if [[ -f "$req" ]]; then
      log "pip install -r $req"
      pip install -r "$req"
    fi
  done

  if [[ -f pyproject.toml ]]; then
    log "pip install -e . (pyproject.toml)"
    if grep -qE '^\[project\.optional-dependencies\]' pyproject.toml \
       && grep -qE '^dev *=' pyproject.toml; then
      pip install -e ".[dev]"
    else
      pip install -e .
    fi
  fi
else
  log "No pyproject.toml or requirements*.txt found; skipping Python dependencies"
fi

log "Post-create complete"
