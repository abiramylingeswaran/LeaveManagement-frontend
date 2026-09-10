# LeafHR — Leave Management System (Frontend)

A React frontend for a Sri Lankan office leave management system, in a green
and white theme. This is UI only — it runs on mock data (no backend/API yet)
so you can preview every role's screens immediately.

## What's included

- Login screen with role picker (Employee / Manager / HR / Administrator)
- Employee: dashboard, apply for leave, leave history, team calendar
- Manager: pending approvals (approve / reject with a reason), team calendar
- HR: org dashboard, employee directory, holiday calendar (add/remove), reports
- Admin: overview, users & roles, audit log, system settings
- A "Preview as" switcher in the sidebar so you can jump between roles without
  logging out — handy for demos

## Tech stack

- React 19 + Vite
- React Router for navigation
- Plain CSS (no framework) — all styling in `src/index.css`
- lucide-react for icons

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Sidebar, Topbar, Layout, StatCard, StatusBadge, LeafMark
  context/      AppContext — holds current role + leave requests (in-memory)
  data/         mockData.js — employees, leave types, requests, holidays...
  pages/        one file per screen
  index.css     design tokens + all component styles
```

## Wiring up a real backend

Everything currently reads from `src/data/mockData.js` and `AppContext.jsx`.
To connect a real API:

1. Replace the mock arrays in `mockData.js` with fetch calls (or a small API
   client) inside `AppContext.jsx`.
2. Swap the in-memory `addRequest` / `updateRequestStatus` functions for real
   POST/PATCH calls to your backend.
3. Add real authentication in `Login.jsx` in place of the role picker.

## Design notes

- Colors, type, and spacing are defined as CSS variables at the top of
  `src/index.css` — change the palette there and it cascades everywhere.
- Headings use "Fraunces" (serif), body/UI text uses "IBM Plex Sans" —
  loaded from Google Fonts in `index.html`.
