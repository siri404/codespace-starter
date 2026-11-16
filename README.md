# codespace-starter

A full-stack dev container for GitHub Codespaces (and VS Code Dev Containers).

## What's included

| Tool | Version |
| --- | --- |
| Base image | Ubuntu 24.04 (`mcr.microsoft.com/devcontainers/base:ubuntu-24.04`) |
| Node.js | LTS, with pnpm |
| Python | 3.12, with Ruff |
| Docker | Docker-in-Docker (Moby) |
| GitHub CLI | `gh` |

Forwarded ports: **3000** (web), **5173** (Vite), **8000** (API).

## Post-create setup

`.devcontainer/post-create.sh` runs once when the container is created:

- `package.json` present → `pnpm install` (`--frozen-lockfile` when `pnpm-lock.yaml` exists)
- `requirements.txt` / `requirements-dev.txt` / `pyproject.toml` present → creates `.venv` and installs into it (`pip install -e ".[dev]"` when a `dev` extra is defined)

Steps whose files are missing are skipped, so the script is safe on an empty repo and safe to re-run:

```bash
bash .devcontainer/post-create.sh
```

## Getting started

Open the repo in a Codespace (**Code → Codespaces → Create codespace**), or locally with the VS Code *Dev Containers* extension via **Reopen in Container**.
