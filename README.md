# Nexus Dashboard

An enterprise dashboard platform built with a **micro-frontend architecture**, combining independently developed and deployed Angular and React applications behind a single shell.

**Live demo:** https://nexus-shell-psi.vercel.app

## Why this project

Most portfolio projects show a single app end-to-end. This one is built to demonstrate something enterprise teams actually care about: **how independent teams, on independent stacks, ship into one product without stepping on each other.**

- The **shell** (Angular) owns navigation, layout, and shared application state.
- **Analytics** (Angular) is a separate application, built, tested, and deployed on its own.
- **Team** (React) proves the architecture is framework-agnostic, not just multi-repo Angular.
- All three are deployed as **independent Vercel projects** with independent CI — the shell loads them at runtime, not at build time.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Shell (Angular)                        │
│         Sidebar · Routing · Shared org state               │
│                nexus-shell-psi.vercel.app                  │
└───────────────┬─────────────────────────┬─────────────────┘
                │                         │
      loads at runtime              loads at runtime
                │                         │
┌───────────────▼────────────┐  ┌─────────▼───────────────────┐
│   Analytics (Angular)       │  │   Team (React)                │
│   Native Federation remote  │  │   Web Component remote        │
│   nexus-analytics-...       │  │   nexus-team-...               │
└─────────────────────────────┘  └───────────────────────────────┘
```

- **Shell ↔ Analytics:** [@angular-architects/native-federation](https://www.npmjs.com/package/@angular-architects/native-federation) — modern, webpack-free Module Federation for Angular.
- **Shell ↔ Team:** React is compiled into a native **Web Component** (`<team-app>`) and loaded dynamically as an ES module. This sidesteps the current lack of mature Vite-based Module Federation tooling for cross-framework federation, while keeping the same "independently built and deployed" guarantee.
- **Shared state** (e.g. active organization) is synced across all three runtimes — including across separate JS bundles — via native `window` CustomEvents, since a shared Angular DI singleton isn't actually shared across federated bundles.

## Tech stack

| Layer | Stack |
|---|---|
| Monorepo | Nx |
| Shell | Angular 22 (standalone components, Zone.js) |
| Analytics remote | Angular 22, ngx-charts, Native Federation |
| Team remote | React 19, Vite, Web Components |
| Shared UI | Angular library (`libs/ui`) |
| Styling | Tailwind CSS 4 |
| Deployment | Vercel (3 independent projects, 1 monorepo) |

## Features

- Sidebar navigation across Dashboard, Analytics, Team, and Settings
- Analytics: KPI cards + revenue chart (ngx-charts)
- Team: member directory (React, rendered inside the Angular shell)
- Organization switcher in the sidebar — changes propagate live to every loaded module, regardless of framework
- Shared design system component (`ui-card`) reused across Angular modules

## Running locally

Each app runs on its own port and must be started separately (this mirrors how they're deployed):

```bash
npm install

npx nx serve nexus-dashboard   # shell     → localhost:4200
npx nx serve analytics         # remote    → localhost:4201
npx nx serve team              # remote    → localhost:4202
```

Then open `http://localhost:4200`.

## Deployment

Each app is its own Vercel project pointing at the same repo, with independent build settings:

| Project | Build command | Output directory |
|---|---|---|
| Shell | `npx nx build nexus-dashboard` | `dist/nexus-dashboard/browser` |
| Analytics | `npx nx build analytics` | `dist/analytics/browser` |
| Team | `npx nx build team` | `dist/team` |

The shell resolves remote URLs at runtime based on `location.hostname`, so the same codebase runs correctly against `localhost` in development and against the deployed Vercel URLs in production — no build-time environment files needed.

## What this project demonstrates

- Setting up Module Federation from scratch with a modern (non-webpack) toolchain
- Solving cross-framework integration where existing tooling doesn't yet support it well
- Diagnosing subtle, non-obvious production-only bugs (CSS cascade leaks between federated bundles, esbuild tree-shaking stubbing out unused providers, Node.js polyfills leaking into browser bundles)
- Designing shared state that works correctly across separate JS runtimes, not just separate components
- Independent CI/CD for a micro-frontend architecture

## License

MIT