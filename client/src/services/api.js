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

// --------------------------------------------------------------------------
// AUTH APIs
// --------------------------------------------------------------------------
export const sendOtpApi = (payload) =>
  apiCall('/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const verifyOtpApi = (payload) =>
  apiCall('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

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

// --------------------------------------------------------------------------
// DASHBOARD APIs
// --------------------------------------------------------------------------
export const fetchHrDashboardApi = () => apiCall('/dashboard/hr');
export const fetchEmployeeDashboardApi = () => apiCall('/dashboard/employee');

// --------------------------------------------------------------------------
// ATTENDANCE APIs
// --------------------------------------------------------------------------
export const clockInApi = () =>
  apiCall('/attendance/clock-in', {
    method: 'POST',
  });

export const clockOutApi = () =>
  apiCall('/attendance/clock-out', {
    method: 'POST',
  });

export const getMyAttendanceApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/attendance/me${query ? `?${query}` : ''}`);
};

export const fetchMyAttendanceApi = (params = {}) => getMyAttendanceApi(params);

export const fetchMyRegularizationsApi = () => apiCall('/attendance/me/regularizations');

export const submitRegularizationApi = (payload) =>
  apiCall('/attendance/regularize', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const fetchAllAttendanceApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/attendance/all${query ? `?${query}` : ''}`);
};

export const fetchAllRegularizationsApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/attendance/regularizations/all${query ? `?${query}` : ''}`);
};

export const reviewRegularizationApi = (id, payload) =>
  apiCall(`/attendance/regularize/${id}/review`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

// --------------------------------------------------------------------------
// LEAVE APIs
// --------------------------------------------------------------------------
export const fetchMyLeavesApi = () => apiCall('/leaves/me');
export const getMyLeavesApi = () => apiCall('/leaves/me');

export const fetchLeaveTypesApi = () => apiCall('/leaves/types');
export const fetchMyLeaveBalancesApi = () => apiCall('/leaves/balances');
export const fetchLeaveBalancesApi = () => apiCall('/leaves/balances');
export const fetchHolidaysApi = () => apiCall('/leaves/holidays');

export const applyLeaveApi = (payload) =>
  apiCall('/leaves/apply', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const cancelLeaveApi = (id) =>
  apiCall(`/leaves/${id}/cancel`, {
    method: 'POST',
  });

export const fetchAllLeavesApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/leaves/all${query ? `?${query}` : ''}`);
};

export const reviewLeaveApi = (id, payload) =>
  apiCall(`/leaves/${id}/review`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

// --------------------------------------------------------------------------
// PAYROLL & COMPENSATION APIs
// --------------------------------------------------------------------------
export const getMySalaryApi = () => apiCall('/salary/me');
export const fetchMyPayslipsApi = () => apiCall('/payroll/me/payslips');
export const fetchMyPayrollApi = () => apiCall('/payroll/me/payslips');
export const fetchPayslipDetailApi = (id) => apiCall(`/payroll/payslips/${id}`);

export const fetchPayrollSummaryApi = () => apiCall('/payroll/analytics/summary');
export const fetchCompensationRecordsApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/payroll/records${query ? `?${query}` : ''}`);
};
export const fetchAllPayrollRecordsApi = (params = {}) => fetchCompensationRecordsApi(params);
export const fetchAllSalaryStructuresApi = () => apiCall('/payroll/structures');

export const createSalaryRevisionApi = (payload) =>
  apiCall('/payroll/revisions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

// --------------------------------------------------------------------------
// EMPLOYEE DIRECTORY & PROFILES APIs
// --------------------------------------------------------------------------
export const fetchColleagueDirectoryApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/employees/directory${query ? `?${query}` : ''}`);
};

export const fetchMyProfileApi = () => apiCall('/employees/me');

export const updateMyProfileApi = (payload) =>
  apiCall('/employees/me', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

export const fetchAllEmployeesApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/employees${query ? `?${query}` : ''}`);
};

export const fetchEmployeeDetailApi = (id) => apiCall(`/employees/${id}`);

export const updateEmployeeProfileApi = (id, payload) =>
  apiCall(`/employees/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

// --------------------------------------------------------------------------
// PERFORMANCE & HELPDESK APIs
// --------------------------------------------------------------------------
export const fetchPerformanceReviewsApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/performance/reviews${query ? `?${query}` : ''}`);
};

export const fetchHelpdeskTicketsApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/helpdesk/tickets${query ? `?${query}` : ''}`);
};

export const createHelpdeskTicketApi = (payload) =>
  apiCall('/helpdesk/tickets', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateHelpdeskTicketApi = (id, payload) =>
  apiCall(`/helpdesk/tickets/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

// --- AI Chatbot API Endpoint ---
export const sendAiChatMessageApi = (message, history = []) =>
  apiCall('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message, history }),
  });

