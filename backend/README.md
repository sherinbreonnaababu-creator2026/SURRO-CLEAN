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