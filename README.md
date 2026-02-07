# Valor Microfrontend Demo

A micro-frontend architecture demo using Module Federation with Vite and React. Three independent apps compose a single UI at runtime.

## Architecture

```
main (host) :5000
├── header (remote) :5001
└── follow-button (remote) :5002
```

- **main** — Host application. Consumes remote components and renders the full page.
- **header** — Exposes a `Header` component with avatar and navigation bar.
- **follow-button** — Exposes a `FollowButton` component linking to LinkedIn.

Each remote is a standalone React app that also works independently.

## Tech Stack

- **Vite** — Build tool and dev server for all three apps.
- **@module-federation/vite** — Official Module Federation plugin for Vite. Handles runtime module sharing between host and remotes.
- **React 19** — UI library. Shared as a singleton across all apps to avoid duplicate instances.
- **Tailwind CSS 3** — Utility-first CSS framework.
- **Radix UI** — Unstyled, accessible primitives (avatar, button) used under the hood.
- **TypeScript** — Static typing across the entire project.

## Prerequisites

- Node.js >= 18
- pnpm

## Install

```bash
cd header && pnpm install && cd ..
cd follow-button && pnpm install && cd ..
cd main && pnpm install && cd ..
```

## Running

### Standalone (any single app)

Each app runs independently with full hot reload:

```bash
cd header && pnpm dev          # http://localhost:5001
cd follow-button && pnpm dev   # http://localhost:5002
cd main && pnpm dev            # http://localhost:5000 (remotes won't load)
```

### All together (federation)

Module Federation requires built remotes. You need 3 terminals.

**Terminal 1 — header:**

```bash
cd header && pnpm build && pnpm preview
```

**Terminal 2 — follow-button:**

```bash
cd follow-button && pnpm build && pnpm preview
```

**Terminal 3 — main (start last):**

```bash
cd main && pnpm build && pnpm preview
```

Open http://localhost:5000. The host loads `remoteEntry.js` from each remote at runtime.

Order matters — remotes must be running before the host builds.

### Quick start script

```bash
#!/bin/bash
(cd header && pnpm build && pnpm preview) &
(cd follow-button && pnpm build && pnpm preview) &
sleep 5
cd main && pnpm build && pnpm preview
```
