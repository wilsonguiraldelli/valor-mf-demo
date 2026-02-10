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
- **vite-plugin-zephyr** — Zephyr Cloud plugin for Vite. Wraps `@module-federation/vite` and handles runtime module sharing, remote dependency resolution, and automatic deployment to Zephyr Cloud on every build.
- **React 19** — UI library. Shared as a singleton across all apps to avoid duplicate instances.
- **Tailwind CSS 3** — Utility-first CSS framework.
- **Radix UI** — Unstyled, accessible primitives (avatar, button) used under the hood.
- **TypeScript** — Static typing across the entire project.

## Zephyr Cloud

This project is integrated with [Zephyr Cloud](https://zephyr-cloud.io/) for automatic deployment and remote dependency resolution.

**Every `pnpm build` automatically deploys the app to Zephyr Cloud** — no extra commands needed. After the build completes, you'll see a deployed URL in the terminal output.

Remote dependencies are declared in `main/package.json` under `zephyr:dependencies`:

```json
"zephyr:dependencies": {
  "header": "header@*",
  "follow-button": "follow-button@*"
}
```

This allows Zephyr to resolve the remote URLs at build time, replacing the hardcoded `localhost` fallbacks with the actual deployed URLs. This means:

- Remotes don't need to be running locally for the host to work in preview/production.
- Each build creates a versioned deployment with its own permanent URL.
- You can manage versions, rollbacks, and environments through the [Zephyr Cloud dashboard](https://app.zephyr-cloud.io).

**Build order matters** — remotes must be built (and deployed) before the host so Zephyr can resolve them:

```bash
cd header && pnpm build
cd follow-button && pnpm build
cd main && pnpm build
```

> Requires the [Zephyr Cloud Chrome extension](https://chromewebstore.google.com/detail/zephyr-mission-control/liflhldchhinbaeplljlplhnbkdidedn) and being logged in (first build will prompt login automatically).

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
