# Nexus Dashboard

An enterprise dashboard platform built with a **micro-frontend architecture**, combining independently developed and deployed Angular and React applications behind a single shell.

**Live demo:** https://nexus-shell-psi.vercel.app

## Why this project

Most portfolio projects show a single app end-to-end. This one is built to demonstrate something enterprise teams actually care about: **how independent teams, on independent stacks, ship into one product without stepping on each other.**

- The **shell** (Angular) owns navigation, layout, and shared application state.
- **Analytics** (Angular) is a separate application, built, tested, and deployed on its own.
- **Team** (React) proves the architecture is framework-agnostic, not just multi-repo Angular.
- All three are deployed as **independent Vercel projects** with independent CI — the shell loads them at runtime, not at build time.

Try switching the organization dropdown in the sidebar from any page — it updates live across every module, regardless of framework or deployment.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Shell (Angular)                      │
│         Sidebar · Routing · Shared org state            │
│                nexus-shell-psi.vercel.app               │
└───────────────┬─────────────────────────┬───────────────┘
                │                         │
      loads at runtime              loads at runtime
                │                         │
┌───────────────▼────────────-┐  ┌─────────▼───────────────────┐
│   Analytics (Angular)       │  │   Team (React)              │
│   Native Federation remote  │  │   Web Component remote      │
│   nexus-analytics-...       │  │   nexus-team-...            │
└─────────────────────────────┘  └─────────────────────────────┘
```

## Architecture decisions

A few of the calls made along the way, and why — the reasoning matters more than the tech list.

**Native Federation, not classic Module Federation.**
Nx's own generator (`@nx/angular:host`) still scaffolds webpack-based Module Federation — but it's already deprecated and being removed in Nx v24. Rebuilt on `@angular-architects/native-federation` instead, which is framework-agnostic, doesn't require webpack, and is the direction Nx itself is moving toward. Redone mid-build once this became clear, rather than shipping on a soon-to-be-removed foundation.

**Web Components, not federation, for the React remote.**
The obvious next step for a cross-framework remote is a Vite-based Module Federation plugin. The main community option (`@gioboa/vite-module-federation`) depends on a `native-federation` core version three major versions behind the one the Angular side needs — forcing it would mean running a mismatched, effectively unmaintained runtime. Chose Web Components instead: React compiles to a standard custom element (`<team-app>`), and the shell loads it as a plain ES module at runtime. Same independent-deploy guarantee, without depending on immature tooling.

**Shared state via `window` events, not a shared DI singleton.**
The natural Angular instinct is `providedIn: 'root'` and inject it everywhere. That works within one bundle — it doesn't work across federated remotes, because each remote bundles its own copy of a workspace library unless explicitly configured as a federation-shared dependency. Rather than fighting that configuration, state changes are broadcast as native `CustomEvent`s on `window`. It's framework-agnostic by construction, which also made the React side trivial — it listens to the exact same event the Angular remote does.

**Zone.js, not zoneless.**
Zoneless is the newer Angular default and was the initial setup. `ngx-charts`'s tooltip logic manipulates the DOM in a way that isn't zoneless-safe, throwing `NG0100` on hover. Rather than avoid a real charting library to chase the newest default, switched the shell back to Zone.js — a deliberate trade-off, not an oversight.

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

- Dashboard overview with live stats, an activity feed, and quick links into each module
- Analytics: KPI cards + revenue chart (ngx-charts)
- Team: member directory (React, rendered inside the Angular shell)
- Organization switcher in the sidebar — changes propagate live to every loaded module, regardless of framework
- Loading and error states for each federated module, with retry — no blank flash or dead end if a remote is slow or unreachable
- A small shared design system (`libs/ui`): `Card`, `StatCard`, `Badge`, `Button`, `Spinner`, `ErrorState`, reused across every Angular module

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