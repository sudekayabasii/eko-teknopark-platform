// API service — ready for FastAPI backend integration
// Replace BASE_URL with real backend address when available

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export const API_ENDPOINTS = {
  sensors:  `${BASE_URL}/api/sensors`,
  alarms:   `${BASE_URL}/api/alarms`,
  commands: `${BASE_URL}/api/commands`,
  reports:  `${BASE_URL}/api/reports`,
  ws:       `${BASE_URL.replace('http', 'ws')}/ws/realtime`,
} as const;

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API hatası: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const api = {
  getSensors:  () => apiFetch(API_ENDPOINTS.sensors),
  getAlarms:   () => apiFetch(API_ENDPOINTS.alarms),
  getCommands: () => apiFetch(API_ENDPOINTS.commands),
  getReports:  (period: string) => apiFetch(`${API_ENDPOINTS.reports}?period=${period}`),
  sendCommand: (payload: Record<string, unknown>) =>
    apiFetch(API_ENDPOINTS.commands, { method: 'POST', body: JSON.stringify(payload) }),
};
