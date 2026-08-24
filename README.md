# DAVITECH AI CINEMA v0.4

Mobile-first, Vercel-ready filmmaking workstation. Maximum project duration is 10 minutes. Production is scene-based in 10-second units.

## Duration engine
10s=1 scene, 20s=2, 30s=3, 40s=4, 1m=6, 2m=12, 5m=30, 10m=60.

## Included
- Premium dark cinematic workstation
- Studio, New Film, My Films, Character Vault, Scene Studio, Render Queue and production modules
- Local persistence for immediate browser operation
- Character reference upload and preview
- Scene metadata and scene-level rendering simulation
- Queue states: queued, rendering, processing, ready, failed
- Retry/reset and per-scene isolation
- PWA-compatible responsive design
- Next.js/Vercel deployment structure
- Supabase SQL schema for films, characters, scenes and render jobs
- Provider-neutral video-generation boundary
- No subscriptions, purchases, payment code or feature paywalls

## Deploy
1. Create a GitHub repository and upload this folder.
2. Import the repository into Vercel. Vercel auto-detects Next.js.
3. For persistent cloud data, create a Supabase project and run `supabase/schema.sql` in the SQL Editor.
4. Add the variables from `.env.example` in Vercel.
5. Deploy.

Supabase integration follows the current Next.js approach documented at https://supabase.com/docs/guides/getting-started/quickstarts/nextjs.

## Important dependency
The included `demo` provider simulates rendering locally. A real AI video provider/GPU worker must be connected through `DAVITECH_VIDEO_PROVIDER` and its adapter before the app performs genuine AI video generation. This build does not falsely claim that a video model is included.
