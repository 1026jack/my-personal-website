# Jack Huang Personal Website

A personal website for Huang, Yan-Jia / Jack with a guest system, avatar upload,
message board, and an AI praise machine powered by OpenAI's Responses API.

## Features

- Personal homepage with profile, academic background, introduction, and owner avatar.
- Visitor registration and login.
- Visitor avatar upload limited to valid JPG and PNG files.
- SQLite database for users, hashed passwords, sessions, avatars, and messages.
- Message board where logged-in visitors can post messages.
- Message authors can delete only their own messages.
- AI praise machine using a server-side OpenAI Responses API call.

## Security Notes

- SQL Injection defense: all database access uses prepared statements.
- Password safety: visitor passwords are hashed with bcrypt before storage.
- XSS defense: messages are rendered through React text output instead of raw HTML.
- Upload defense: avatars are stored with random filenames, size limits, extension checks,
  MIME checks, and JPG/PNG magic-byte checks.
- Webshell defense: uploaded files are never executed, only served as static files from
  the `uploads` directory.
- Backend file defense: `.env`, database files, and upload data are ignored by Git and
  should not be exposed through static hosting.
- OpenAI API key defense: the API key is used only by the backend and is never sent to
  frontend JavaScript.

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev:full
```

Edit `.env` and set:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5-nano
PORT=3001
SESSION_SECRET=change-this-random-secret
CLIENT_ORIGIN=http://localhost:5173
```

## Production Build

```bash
npm run build
npm start
```

The Node server serves the built frontend from `dist` and exposes the API routes.

## Deployment Important Note

GitHub Pages can host only the static frontend. It cannot run the Express backend,
SQLite database, avatar upload storage, sessions, or OpenAI API calls.

To make all features work publicly, deploy the backend to a Node-capable platform such
as Render, Railway, Fly.io, or a VPS. Then set the frontend environment variable:

```bash
VITE_API_BASE_URL=https://your-backend.example.com
```

On the backend, set:

```bash
CLIENT_ORIGIN=https://1026jack.github.io
```
