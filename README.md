# Defect Tracker (React + Vite + TypeScript)

A lightweight single-page **Defect Tracking** app with list + detail views and an in-memory “Add Defect” form. Built with **React**, **Vite**, and **TypeScript**, deployed to **GitHub Pages**.

Live: https://phuongtoVN.github.io/defect-tracker/

---

## Features
- Defects list with search, filters, sort, and pagination  
- Detail panel/page for full defect info  
- Add new defect (client-side/in-memory)  
- Responsive UI (desktop → mobile)  
- Static hosting via GitHub Pages

Data source: `public/defect.json`.

---

## Tech Stack
- React 19, TypeScript  
- Vite (build/dev server)  
- React Router v7  
- Context + reducer state management  
- CSS (globals + theme)

---

## Getting Started

### Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm

### Install & Run
```bash
npm ci
npm run dev
```
App runs at: http://localhost:5173

### Build
```bash
npm run build
```
Build output: `dist/`

---

## Project Structure
```
defect-tracker/
├─ public/
│  └─ defect.json
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ router/
│  ├─ state/
│  │  ├─ DefectsContext.tsx
│  │  └─ defectsReducer.ts
│  ├─ styles/
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
├─ vite.config.ts
└─ package.json
```

---

## Data Loading (works locally and on GitHub Pages)
```ts
// DefectsContext.tsx (excerpt)
const asset = (p: string) => new URL(p, import.meta.env.BASE_URL).toString();

const res = await fetch(asset('defect.json'));
const data = await res.json();
```
Keep `defect.json` in `public/`. After build it will be available at:
`/defect-tracker/defect.json`.

---

## Routing
```tsx
// src/main.tsx (excerpt)
<BrowserRouter basename="/defect-tracker">
  <App />
</BrowserRouter>
```
SPA refresh support: the build script copies `index.html` → `404.html`.

---

## Deploying to GitHub Pages (manual via gh-pages)

### 1) Configure Vite base
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/defect-tracker/',   // trailing slash required
})
```

### 2) Scripts
```json
{
  "scripts": {
    "build": "tsc -b && vite build && copy dist\\index.html dist\\404.html",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```
(mac/Linux: replace `copy` with `cp`)

### 3) Publish
```bash
npm run deploy
```

### 4) Pages Settings
GitHub → **Settings → Pages**  
Source: **Deploy from a branch**  
Branch: **gh-pages** • Folder: **/** (root)

---

## Common Issues

- **White screen**  
  Pages is serving the source (`/src/main.tsx`). Point Pages to **gh-pages (root)**.

- **Assets 404 (CSS/JS not found)**  
  Ensure `base: '/defect-tracker/'` in `vite.config.ts`.

- **Data 404 (`defect.json`)**  
  Use `new URL('defect.json', import.meta.env.BASE_URL)` when fetching.  
  Check that `https://<user>.github.io/defect-tracker/defect.json` loads.

- **Refresh 404 on routes**  
  Ensure `dist/404.html` exists (copied in the build script).

---

## Scripts
```bash
npm run dev       # start local dev server
npm run build     # production build (creates dist + 404.html)
npm run preview   # preview production build locally
npm run deploy    # publish dist/ to gh-pages branch
```

---

## License
MIT
