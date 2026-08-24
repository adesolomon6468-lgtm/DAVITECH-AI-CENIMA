# DAVITECH AI CINEMA v0.4 Architecture

Browser/PWA → Next.js application/API → Supabase database/storage/auth → Render Queue → Provider Adapter → Video Model/GPU → Scene validation → Voice/Music/SFX → FFmpeg assembly → MP4.

The UI never assumes a single AI vendor. A provider adapter receives a scene job and returns provider_job_id, progress, preview/final media URLs, status and errors.

10-minute maximum keeps first-release jobs bounded at 60 scenes.
