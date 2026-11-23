# TypeScript removal and ReScript migration

## Status (2026-11-23)

All TypeScript source files have now been removed from `src` and TypeScript was removed as a direct dev dependency. The React/Vite app uses JavaScript/JSX for its shell and data modules, while twelve UI components and prediction logic are implemented in ReScript. This removes TypeScript, but is not a complete ReScript rewrite: `src/App.jsx` and the data modules are still JavaScript. GitHub's language classification has not been checked after a push.

## Verification

- `npm test`: 16 tests passed in the latest full run.
- `npm run build`: passed after converting entry files to `.jsx`; Vite emitted `dist/index.html` as a single-file build.
- No `.ts` or `.tsx` files remain under `src`.
- Render's actual build command, publish directory, and Node runtime remain unknown. No production deploy was initiated or verified.

## Changes

- ReScript 12 and `@rescript/react` support the migrated UI and prediction modules.
- TypeScript source files were transpiled to `.js`/`.jsx` with type syntax erased; no application logic was intentionally rewritten during that conversion.
- The Vite config remains `.mjs`, and `index.html` now points at `src/main.jsx`.
- Historical standings remain JSON; CSS remains CSS.
- The unused football API service and helper were removed. The tracked `.env` file has been removed from the Git index and environment files are ignored. Its old credential may remain in Git history and should be rotated at the provider; do not paste it into chat or commit a replacement.

## Before production rollout

Confirm Render's configured build command, Node version, and publish directory; verify the GitHub merge target and the automatic deploy behavior; then inspect the successful Render deploy and compare the live app against baseline behavior. Do not infer production status from a successful local build. A complete ReScript-only application migration would still require porting the app shell and data modules beyond the current JavaScript/JSX conversion.
