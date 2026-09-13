# Digital Polaroid

A classy digital polaroid camera, right in your browser. Capture a photo with your webcam or upload one, decorate it with stickers and captions, apply a filter, and download your own polaroid. Leave a review in the Feedback tab and see it join the shared feed.

## Features

- Webcam capture or photo upload, converging into one editor flow
- Decorate with stickers/text captions, or keep it plain
- Filter presets (vintage, B&W, sepia, warm, cool, grain)
- Canvas-based export — decorations and filters are flattened into one downloadable PNG
- Feedback tab with a shared, animated review feed (Supabase-backed)

## Tech stack

- React + Vite (JavaScript)
- Plain CSS Modules + CSS custom properties
- Framer Motion for animation
- Supabase (free tier) for shared reviews

## Getting started

```bash
git clone https://github.com/shreyamhetre/digital_polaroid.git
cd digital_polaroid
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`) in your browser.

### Environment variables

Copy `.env.example` to `.env.local` and fill in your own Supabase project's values:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

The app runs fine without these — the Feedback tab will just note that reviews aren't configured yet.

## Available scripts

- `npm run dev` — start the local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Deployment

Pushing to `main` builds the app and publishes it to GitHub Pages via `.github/workflows/deploy.yml`. A second scheduled workflow (`.github/workflows/supabase-keepalive.yml`) pings Supabase weekly so the free-tier project doesn't pause from inactivity.

## Camera access note

Browsers only allow webcam access (`getUserMedia`) over HTTPS or on `localhost`. The deployed GitHub Pages site is HTTPS, so this works in production; when testing locally, use `localhost` rather than a LAN IP address, or camera access will silently fail.
