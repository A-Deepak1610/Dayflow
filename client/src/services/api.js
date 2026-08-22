const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include',
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error('API Call Error:', error);
    return { ok: false, status: 500, error: error.message };
  }
};

export const checkServerHealth = () => apiCall('/health');

// Auth API Endpoints connected to backend
export const registerCompanyApi = (payload) =>
  apiCall('/auth/register-company', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const loginApi = (payload) =>
  apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const logoutApi = () =>
  apiCall('/auth/logout', {
    method: 'POST',
  });
