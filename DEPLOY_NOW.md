# DEPLOY NOW — DAVITECH AI CINEMA

Fastest path: GitHub → Vercel → Supabase.

1. Upload this entire folder to a new GitHub repository named `davitech-ai-cinema`.
2. In Vercel choose Add New Project → Import the GitHub repository → Deploy. Vercel supports zero-config Next.js deployment.
3. In Supabase create a new project.
4. Open Supabase SQL Editor and run `supabase/schema.sql`.
5. In Vercel Project Settings → Environment Variables add:
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
   DAVITECH_VIDEO_PROVIDER=demo
6. Redeploy.

The app itself works without Supabase through local browser persistence. Supabase becomes the cloud persistence layer once the client integration is wired with the supplied schema and credentials.

REAL AI GENERATION:
The final missing external component is a video-generation provider or self-hosted GPU worker. The app already exposes `/api/jobs` and a provider setting so this component remains replaceable.
