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

## Deploy frontend and API to Vercel

The repository uses two Vercel projects connected to the same GitHub repository:

1. The frontend project uses the repository root; Vercel detects Vite from the root `package.json`.
2. Create a second Vercel project named `surro-clean-api`, set its root directory to `backend`, and select the Express framework. The backend-specific [vercel.json](vercel.json) uses no static output directory, so Vercel deploys the exported Express app as a Function.
3. Set these variables in the API project's Production and Preview environments: `MONGODB_URI`, `JWT_SECRET` (at least 32 characters), `ADMIN_PASSWORD`, `STAFF_PASSWORD`, `STUDENT_PASSWORD`, and `FRONTEND_URL` (the frontend's exact production origin, such as `https://surro-clean-flax.vercel.app`).
4. In the frontend project's environment settings, set `VITE_API_URL` to the API project's deployment URL followed by `/api`, then redeploy the frontend.
5. Configure MongoDB Atlas Network Access for the API's outbound connections. Do not use the local `127.0.0.1` URI or allow all IP addresses as a shortcut.

Both Vercel projects can auto-deploy from `main`. Email-only Gmail login is demo access and does not verify Gmail ownership.