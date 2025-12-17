# NutReBirth (Vite + React + TypeScript)

1. npm install
2. npm run dev


This scaffold seeds a few foods into IndexedDB and shows a minimal Dashboard. Expand pages and features as needed.

## Hosting / Deployment

This repo is a **frontend (Vite/React)** + **backend (Spring Boot)** app.

### Required environment variables

#### Frontend (Vite)
- **`VITE_GOOGLE_CLIENT_ID`**: Google OAuth client id (ends with `.apps.googleusercontent.com`)
- **`VITE_API_BASE_URL`**: backend base URL (example: `https://your-api.onrender.com`)

You can copy the template from `env.example`.

#### Backend (Spring Boot)
- **`PORT`**: (set by most hosts automatically; defaults to `8080`)
- **`GOOGLE_CLIENT_ID`**: must match the frontend client id
- **`JWT_SECRET`**: secret for signing JWTs (**must be long/random**, e.g. 32+ chars)
- **`APP_CORS_ALLOWED_ORIGINS`**: comma-separated list of allowed frontend origins
  - Example: `https://your-frontend.vercel.app,https://your-frontend.netlify.app`

### Google OAuth settings (important)
In Google Cloud Console → OAuth Client:
- Add your deployed frontend URL(s) to **Authorized JavaScript origins**
- Ensure your frontend domain is correct (https + exact host)

### Option A: Deploy separately (recommended)

#### Backend on Render (or Railway/Fly.io)
- Root directory: `service/`
- Use Dockerfile: `service/Dockerfile`
- Set env vars: `GOOGLE_CLIENT_ID`, `JWT_SECRET`, `APP_CORS_ALLOWED_ORIGINS`

#### Frontend on Vercel / Netlify
- Build command: `npm run build`
- Output directory: `dist`
- Set env vars: `VITE_GOOGLE_CLIENT_ID`, `VITE_API_BASE_URL`
- SPA routing:
  - Vercel: `vercel.json` included
  - Netlify: `netlify.toml` included

### Option B: Run via Docker locally
From repo root:
1. Set env vars in your shell:
   - `VITE_GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_ID`
   - `JWT_SECRET`
2. Run:
   - `docker compose up --build`
3. Open:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8080`