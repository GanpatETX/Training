// BASE API CLIENT
// All API calls go through this file.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Central fetch wrapper with error handling
 * @param {string} endpoint - e.g. "/candidates"
 * @param {RequestInit} options - fetch options
 * @returns {Promise<any>}
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    // If 204 No Content, return null
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
}

// Convenience methods
export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint, body) => apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint, body) => apiRequest(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
};