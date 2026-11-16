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

## Mars Rover

A TypeScript + Node.js take on the Mars Rover exercise. The program reads a mission file and prints each rover's final position.

### Input format

```text
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```

- Line 1: upper-right corner of the plateau (lower-left is `0 0`).
- Then two lines per rover: its landing position and heading (`N`, `E`, `S`, `W`), followed by its commands (`L` = spin left, `R` = spin right, `M` = move forward one grid point).
- Rovers move one after another. For the sample above the expected output is `1 3 N` and `5 1 E`.

### Layout

| Path | What it is |
| --- | --- |
| `src/types.ts` | Shared types (`Position`, `Plateau`, `Command`, …) |
| `src/parser.ts` | Reads and validates the input text (done) |
| `src/rover.ts` | Rover logic: **TODO, yours to write** |
| `src/index.ts` | CLI: reads the file, runs each rover, prints the results |
| `test/parser.test.ts` | Parser tests (passing) |
| `test/rover.test.ts` | Rover specs, skipped until you implement `src/rover.ts` |
| `examples/sample.txt` | The sample input above |

### Commands

```bash
pnpm install
```

```bash
pnpm start examples/sample.txt
```

```bash
pnpm test:watch
```

Also available: `pnpm test`, `pnpm typecheck` and `pnpm build` (compiles to `dist/`).
