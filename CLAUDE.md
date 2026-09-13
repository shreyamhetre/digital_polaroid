# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

Digital Polaroid — a static, "classy" web app where a visitor captures a photo (webcam or upload), decorates it with stickers/text/frame, applies a filter, and downloads the flattened result as a PNG. The header has a Feedback tab where visitors leave a review that appears in a shared, animated feed for all visitors.

## Stack

- React + Vite, **plain JavaScript** (no TypeScript — `.jsx`, not `.tsx`).
- No client-side router. The core flow (`home → capture → editor`) is a simple `useState` step machine in `src/App.jsx`. Do not introduce `react-router` unless the flow genuinely outgrows this.
- Plain CSS Modules + CSS custom properties (`src/styles/variables.css`) for styling. No Tailwind, no component library — the polaroid aesthetic is hand-built and a utility framework would fight it.
- Framer Motion for animation (shutter flash/eject, screen transitions, review card entrance) — kept to a few deliberate moments, not applied everywhere.
- Canvas-based compositing for the decorate/filter editor and final PNG export (`src/utils/canvasExport.js`, once built) — no fabric.js/react-konva. The photo + filter + decorations must flatten into one downloadable image.
- Supabase (free tier) for the `reviews` table only, called directly from the browser with the public anon key. Row Level Security is the actual security boundary (anon can insert + select, not update/delete) — the anon key is expected to be public and baked into the static build.

## Folder structure

```
src/
  App.jsx                    # step state machine: 'home' | 'capture' | 'editor'
  lib/supabaseClient.js      # Supabase client, null if env vars are unset
  hooks/                     # useCamera, useReviews
  components/
    layout/                  # Header, FeedbackPanel
    home/                    # Hero (landing view)
    capture/                 # CaptureScreen, CameraView, UploadDropzone
    editor/                  # EditorScreen, PolaroidFrame, FilterPicker, StickerTray, DecorationLayer
    reviews/                 # ReviewForm, ReviewCard, ReviewFeed
  utils/                     # canvasExport.js, filters.js
  styles/                    # variables.css, global.css
  assets/                    # stickers/, illustrations/
```

Each component's CSS lives alongside it as a `.module.css` file (CSS Modules, scoped by default with Vite).

## Conventions

- JavaScript only — do not add TypeScript, `.tsx` files, or type-checking tooling.
- Decoration coordinates (stickers/text in the editor) are stored as **fractions (0–1)** of the frame's width/height, not raw pixels, so the same values map correctly between the live DOM preview and the export canvas regardless of on-screen size.
- The canvas export's filter step must reuse the exact same CSS filter string used for the live preview (via `ctx.filter`) rather than a separate pixel-manipulation implementation, to guarantee the downloaded PNG matches what the user saw.
- `useCamera` only requests `getUserMedia` on explicit user action (e.g. clicking "Use Camera"), never on mount, so the permission prompt doesn't fire unprompted.
- Camera access requires a secure context (HTTPS or `localhost`). It will silently fail when testing over a raw LAN IP in dev — use `localhost`.
- Reviews are shared/persisted for all visitors via Supabase, not `localStorage`.

## Commands

- `npm run dev` — start the local dev server
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint
- `npm run preview` — preview the production build locally

## Deployment

Static site hosted on GitHub Pages via a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and publishes `dist/` on push to `main`. `vite.config.js` sets `base: '/digital_polaroid/'` to match the repo name — update this if the repo is ever renamed.

A separate scheduled workflow (`.github/workflows/supabase-keepalive.yml`) pings the Supabase REST endpoint weekly so the free-tier project never auto-pauses from inactivity.
