const apiUrl = new URL(
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api'
);
if (apiUrl.pathname === '/') apiUrl.pathname = '/api';
const API_URL = apiUrl.toString().replace(/\/$/, '');

export function getToken() {
  return localStorage.getItem('surroclean_token');
}

export function clearSession() {
  localStorage.removeItem('surroclean_token');
  localStorage.removeItem('surroclean_user');
}

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers);
  const token = getToken();

  if (options.body != null && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers
    });
  } catch {
    throw new Error('Unable to connect to the server');
  }

  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : await response.text();

  if (!response.ok) {
    const message =
      typeof body === 'object' && body?.message
        ? body.message
        : 'The request could not be completed';

    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return body;
}

export async function login(email, password) {
  const result = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  localStorage.setItem('surroclean_token', result.token);
  localStorage.setItem('surroclean_user', JSON.stringify(result.user));

  return result.user;
}

export async function getCurrentUser() {
  if (!getToken()) return null;

  try {
    const result = await apiFetch('/auth/me');
    localStorage.setItem('surroclean_user', JSON.stringify(result.user));
    return result.user;
  } catch {
    clearSession();
    return null;
  }
}

export function getReports() {
  return apiFetch('/reports');
}

export function createReport(report) {
  return apiFetch('/reports', {
    method: 'POST',
    body: JSON.stringify(report)
  });
}

export function upvoteReport(reportId) {
  return apiFetch(`/reports/${reportId}/upvote`, { method: 'POST' });
}

export function getMyPoints() {
  return apiFetch('/users/me/points');
}

export function getLeaderboard() {
  return apiFetch('/users/leaderboard');
}

export function getAnalytics() {
  return apiFetch('/dashboard/analytics');
}

export function getTasks(role) {
  return apiFetch(role === 'CLEANING_STAFF' ? '/staff/tasks' : '/tasks');
}

export function getUsers() {
  return apiFetch('/admin/users');
}

export function createTask(task) {
  return apiFetch('/admin/tasks', {
    method: 'POST',
    body: JSON.stringify(task)
  });
}

export function updateTask(taskId, changes) {
  return apiFetch(`/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify(changes)
  });
}