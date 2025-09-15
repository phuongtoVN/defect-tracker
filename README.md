# Defect Tracker (React + TypeScript, Vite)

A small, responsive app to browse, read, and add defects with a clean modern UI. Uses a local JSON dataset and in-memory additions.

# Features

List view with search, sort (Newest/Oldest, A→Z/Z→A, Priority), and a one-line description preview + date.

Split view (wide screens): list left, details right — each scrolls independently.

Mobile detail page with back-to-same-position behavior.

Add defect modal with blurred background; ESC or “×” to close.

No persistent header — maximizes workspace and mirrors native app patterns.

Quick start
# install
npm install

# run dev
npm run dev
# open the printed http://localhost:5173

# build & preview
npm run build
npm run preview

Structure (high-level)
src/
  components/
    DefectList.tsx
    DefectListItem.tsx
    DetailPanel.tsx
    FabAddButton.tsx
    Modal.tsx (+ Modal.module.css)
    Badge.tsx
  hooks/
    useQueryParams.ts
    useSortedFilteredDefects.ts
    useScrollRestoration.ts
    useIsMobile.ts
    useModalBackground.ts
  pages/
    DefectsListPage/
    DefectSplitPage/
    MobileDetailPage/
    NewDefectModal/
  state/
    DefectsContext.tsx
  styles/
    globals.css
  utils/
    sort.ts (includes priority sorts)
    dates.ts
public/
  data/defects.json

Notes

New defects are stored in memory and will reset on refresh (by design for this challenge).

The sort dropdown is keyboard accessible (↑/↓, Enter, ESC).

URL query params persist search and sort state.

Example git history conventions

feat: custom sort dropdown (accessible) + priority sorts

ui: equal-height list cards with one-line preview

feat: modal add-defect + blurred background

fix: restore list scroll after back nav

refactor: move filters to URL params
