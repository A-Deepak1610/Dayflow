import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';

// HR Pages & Layout
import HrLayout from './pages/hr/HrLayout';
import HrDashboard from './pages/hr/HrDashboard';
import EmployeeProfilesPage from './pages/hr/EmployeeProfilesPage';
import AttendanceMonitorPage from './pages/hr/AttendanceMonitorPage';
import LeaveManagementPage from './pages/hr/LeaveManagementPage';
import PayrollAnalyticsPage from './pages/hr/PayrollAnalyticsPage';
import EmployeeProfileDetail from './pages/hr/EmployeeProfileDetail';
import PerformanceAnalyticsPage from './pages/hr/PerformanceAnalyticsPage';

// Employee Pages
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import MyAttendance from './pages/employee/MyAttendance';
import { MyLeaves, MyPayslips } from './pages/employee/MyLeaves';

// Protected Route Component for HR / Admin
const HrRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== 'ADMIN' && user.role !== 'HR') {
    return <Navigate to="/employee/dashboard" replace />;
  }
  return children;
};

// Protected Route Component for Employee
const EmployeeRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* HR / Admin Portal Suite with Dedicated Sidebar */}
      <Route
        path="/hr"
        element={
          <HrRoute>
            <HrLayout />
          </HrRoute>
        }
      >
        <Route index element={<Navigate to="/hr/dashboard" replace />} />
        <Route path="dashboard" element={<HrDashboard />} />
        <Route path="employees" element={<EmployeeProfilesPage />} />
        <Route path="employees/:id" element={<EmployeeProfileDetail />} />
        <Route path="attendance" element={<AttendanceMonitorPage />} />
        <Route path="leaves" element={<LeaveManagementPage />} />
        <Route path="payroll" element={<PayrollAnalyticsPage />} />
        <Route path="performance" element={<PerformanceAnalyticsPage />} />
      </Route>

      {/* Employee Self-Service Pages */}
      <Route
        path="/employee/dashboard"
        element={
          <EmployeeRoute>
            <EmployeeDashboard />
          </EmployeeRoute>
        }
      />
      <Route
        path="/employee/attendance"
        element={
          <EmployeeRoute>
            <MyAttendance />
          </EmployeeRoute>
        }
      />
      <Route
        path="/employee/leaves"
        element={
          <EmployeeRoute>
            <MyLeaves />
          </EmployeeRoute>
        }
      />
      <Route
        path="/employee/payslips"
        element={
          <EmployeeRoute>
            <MyPayslips />
          </EmployeeRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
