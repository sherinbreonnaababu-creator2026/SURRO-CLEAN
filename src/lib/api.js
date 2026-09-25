const API_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api').replace(/\/$/, '');

export function getToken() {
  return localStorage.getItem('surroclean_token');
}

export function clearSession() {
  localStorage.removeItem('surroclean_token');
  localStorage.removeItem('surroclean_user');
}

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.message || 'The request could not be completed');
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