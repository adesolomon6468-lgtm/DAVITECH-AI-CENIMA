# DAVITECH AI CINEMA v0.4.1 — DEPLOY NOW

This package is arranged with the Next.js application at the repository root.

GitHub repository should show these directly at the top level:
- package.json
- app/
- public/
- next.config.mjs
- tsconfig.json
- vercel.json

Vercel:
- Framework: Next.js
- Root Directory: `./` (default)
- Build Command: `next build` (default)
- Output Directory: `.next` (default)
- Environment Variables: none required for local/demo mode

Important: do not point Vercel at `DAVITECH_AI_CINEMA_v0_4`.

The app currently uses a local demo render provider. Real AI video generation requires a provider/GPU connection later.
