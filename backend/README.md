# SurroClean Backend

Express/MongoDB API for the existing SurroClean React frontend.

## Setup

1. Install MongoDB locally, or create a MongoDB Atlas database.
2. Copy `.env.example` to `.env` and set `MONGODB_URI`, a strong `JWT_SECRET` (at least 32 characters), and all three role passwords: `ADMIN_PASSWORD`, `STAFF_PASSWORD`, and `STUDENT_PASSWORD`.
3. Install dependencies: `npm install`.
4. Load demo records: `npm run seed`.
5. Start the API: `npm run dev` or `npm start`.

The frontend reads `VITE_API_URL` from the root `.env` file. Copy the root `.env.example` to `.env` if the API is not running at `http://127.0.0.1:5000/api`.

The API defaults to `http://127.0.0.1:5000`.

Demo accounts after seeding:

- Admin: `admin@surroclean.local` / value of `ADMIN_PASSWORD`
- Cleaning staff: `staff@surroclean.local` / value of `STAFF_PASSWORD`
- Student: `student@surroclean.local` / value of `STUDENT_PASSWORD`

## Main API groups

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/dashboard/overview`, `GET /api/dashboard/analytics`
- `GET/POST /api/reports`, `PATCH /api/reports/:id`, `POST /api/reports/:id/upvote`
- `GET/POST/PATCH /api/tasks`
- `GET /api/users/leaderboard`, `GET /api/users/me/points`, `GET /api/admin/users`
- `GET /api/staff/tasks`, `PATCH /api/staff/tasks/:id`
- `GET /api/fleet`

Protected routes require `Authorization: Bearer <jwt>`.

## Frontend authentication

The existing visual components are kept in place. The login screen calls `POST /api/auth/login`, stores the JWT in browser storage, restores it through `GET /api/auth/me`, and sends it on API requests as `Authorization: Bearer <token>`. The dashboard overview is loaded from the protected `GET /api/dashboard/overview` endpoint.

Example login request:

```js
const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ email, password })
});
const { token, user } = await response.json();
```

Citizen reports use `POST /api/reports`; leaderboard data uses `GET /api/users/leaderboard`; and cleaning staff use `GET/PATCH /api/staff/tasks`. Set `FRONTEND_URL` to a comma-separated list of allowed Vite origins when they differ from the defaults.

## Deploy with Vercel and Render

1. Import this GitHub repository into Vercel and deploy the Vite frontend. Vercel uses `vercel.json`; use the repository root as the project root and note the deployed site URL.
2. In Render, choose **New + > Blueprint**, connect this repository on `main`, and apply `render.yaml` to deploy the API. Enter the Vercel site origin for `FRONTEND_URL`, an Atlas connection string for `MONGODB_URI`, and strong values for the three role passwords. Render generates `JWT_SECRET` automatically.
3. In MongoDB Atlas, allow the Render API service's outbound IP addresses under **Network Access**. Do not use the local `127.0.0.1` URI or allow all IP addresses as a shortcut.
4. In Vercel project settings, set `VITE_API_URL` to the Render API's public URL followed by `/api`, then redeploy the frontend.

Vercel deploys the frontend on GitHub pushes; Render auto-deploys the API from `main`. Render's free API plan may sleep when idle. Email-only Gmail login is demo access and does not verify Gmail ownership.