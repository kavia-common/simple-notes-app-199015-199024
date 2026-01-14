# Simple Notes (React)

A frontend-only notes app (single-column layout) that lets you create, edit, and delete notes. Notes persist in your browser using `localStorage`.

## Features

- Create notes with a required title and optional content
- Edit notes (form is populated when you click **Edit**)
- Delete notes (requires a second click to confirm)
- Persistence via `localStorage` (notes survive page reloads)
- Empty states + basic validation

## Run locally

From this folder:

```bash
npm install
npm start
```

Open http://localhost:3000

## Notes

- Data is stored locally in your browser under a `localStorage` key (no backend).
- To reset everything, use the **Clear all** button in the header.
