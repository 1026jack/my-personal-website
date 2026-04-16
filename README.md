# Jack Huang Personal Website

A personal website for Huang, Yan-Jia / Jack with a guest system, avatar upload,
message board, and an AI praise machine powered by OpenAI's Responses API.

## Features

- Personal homepage with profile, academic background, introduction, and owner avatar.
- Visitor registration and login.
- Registration requires an "I am not a robot" confirmation.
- Visitor avatar upload limited to valid JPG and PNG files.
- PostgreSQL database for users, hashed passwords, sessions, avatars, and messages.
- Message board where logged-in visitors can post messages.
- Message authors can delete only their own messages.
- AI praise machine using a server-side OpenAI Responses API call.
- Each account can use the AI praise machine up to 5 times.

## Security Notes

- SQL Injection defense: all database access uses prepared statements.
- Password safety: visitor passwords are hashed with bcrypt before storage.
- XSS defense: messages are rendered through React text output instead of raw HTML.
- Upload defense: avatars are stored with random filenames, size limits, extension checks,
  MIME checks, and JPG/PNG magic-byte checks.
- Webshell defense: uploaded files are never executed, only served as static files from
  the `uploads` directory.
- Backend file defense: `.env` and upload data are ignored by Git and
  should not be exposed through static hosting.
- OpenAI API key defense: the API key is used only by the backend and is never sent to
  frontend JavaScript.
- DDoS / abuse mitigation: global request rate limiting, stricter auth rate limiting,
  message posting rate limiting, and AI endpoint rate limiting are enabled.

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev:full
```

You need a local PostgreSQL database before running the backend locally.

Edit `.env` and set:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5-nano
PORT=3001
SESSION_SECRET=change-this-random-secret
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/jack_personal_website
DATABASE_SSL=false
```

## Production Build

```bash
npm run build
npm start
```

The Node server serves the built frontend from `dist` and exposes the API routes.

## Deployment Important Note

GitHub Pages can host only the static frontend. It cannot run the Express backend,
PostgreSQL database, avatar upload storage, sessions, or OpenAI API calls.

To make all features work publicly, deploy the backend to a Node-capable platform such
as Render, Railway, Fly.io, or a VPS. Then set the frontend environment variable:

```bash
VITE_API_BASE_URL=https://your-backend.example.com
```

On the backend, set:

```bash
CLIENT_ORIGIN=https://1026jack.github.io
DATABASE_URL=your-render-postgres-internal-database-url
```

## Render Backend Deployment

1. Go to Render.
2. Prefer `New +` > `Blueprint`, not only `Web Service`.
3. Connect the GitHub repository `1026jack/my-personal-website`.
4. If using the included `render.yaml`, create a Blueprint on Render. It will create
   both the Web Service and PostgreSQL database.
5. If creating the Web Service manually, you must also create a Render PostgreSQL
   database and copy its internal database URL into `DATABASE_URL`.
6. For manual Web Service setup, use these commands:

```bash
Build Command: npm install && npm run build
Start Command: npm start
```

7. Add these environment variables in Render:

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5-nano
CLIENT_ORIGIN=https://1026jack.github.io
SESSION_SECRET=use-a-long-random-secret
DATABASE_URL=your-render-postgres-internal-database-url
DATABASE_SSL=false
```

If using the Blueprint, `DATABASE_URL` is connected automatically from the Render
PostgreSQL database.

Render's free PostgreSQL plan is suitable for class demos, but free databases expire
after 30 days. Use a paid database plan for long-term storage.

8. After Render deploys, copy the backend URL, for example:

```bash
https://jack-personal-website-api.onrender.com
```

9. Add this URL to the GitHub Pages build as:

```bash
VITE_API_BASE_URL=https://jack-personal-website-api.onrender.com
```
