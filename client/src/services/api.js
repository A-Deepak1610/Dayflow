const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = { ...options.headers };

  // If body is NOT FormData and Content-Type isn't set, default to application/json
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers,
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
export const registerCompanyApi = (payload, logoFile = null) => {
  if (logoFile) {
    const formData = new FormData();
    formData.append('companyName', payload.companyName);
    formData.append('firstName', payload.firstName);
    formData.append('lastName', payload.lastName);
    formData.append('email', payload.email);
    formData.append('phone', payload.phone);
    formData.append('password', payload.password);
    formData.append('logo', logoFile);

    return apiCall('/auth/register-company', {
      method: 'POST',
      body: formData,
    });
  }

  return apiCall('/auth/register-company', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const loginApi = (payload) =>
  apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const logoutApi = () =>
  apiCall('/auth/logout', {
    method: 'POST',
  });

export const createEmployeeApi = (payload) =>
  apiCall('/auth/create-employee', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
