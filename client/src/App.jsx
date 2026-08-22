import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import OfflineBanner from './components/common/OfflineBanner';
import MainLayout from './components/layout/MainLayout';
import EmployeeLayout from './components/layout/EmployeeLayout';

// Eagerly loaded landing page
import Home from './pages/Home';

// HR Pages (Lazy loaded for optimal initial bundle performance)
const HrLayout = lazy(() => import('./pages/hr/HrLayout'));
const HrDashboard = lazy(() => import('./pages/hr/HrDashboard'));
const EmployeeProfilesPage = lazy(() => import('./pages/hr/EmployeeProfilesPage'));
const AttendanceMonitorPage = lazy(() => import('./pages/hr/AttendanceMonitorPage'));
const LeaveManagementPage = lazy(() => import('./pages/hr/LeaveManagementPage'));
const PayrollAnalyticsPage = lazy(() => import('./pages/hr/PayrollAnalyticsPage'));
const EmployeeProfileDetail = lazy(() => import('./pages/hr/EmployeeProfileDetail'));
const PerformanceAnalyticsPage = lazy(() => import('./pages/hr/PerformanceAnalyticsPage'));
const HelpdeskPage = lazy(() => import('./pages/hr/HelpdeskPage'));

// Employee Pages (Lazy loaded)
const EmployeeDashboard = lazy(() => import('./pages/employee/EmployeeDashboard'));
const EmployeeDirectory = lazy(() => import('./pages/employee/EmployeeDirectory'));
const MyAttendance = lazy(() => import('./pages/employee/MyAttendance'));
const MyLeaves = lazy(() => import('./pages/employee/MyLeaves'));
const MyPayslips = lazy(() => import('./pages/employee/MyPayslips'));

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
  return <EmployeeLayout>{children}</EmployeeLayout>;
};

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading Dayflow workspace..." />}>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />

        {/* HR / Admin Portal Suite */}
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
          <Route path="helpdesk" element={<HelpdeskPage />} />
        </Route>

        {/* Employee Self-Service Suite */}
        <Route
          path="/employee/dashboard"
          element={
            <EmployeeRoute>
              <EmployeeDashboard />
            </EmployeeRoute>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <EmployeeRoute>
              <EmployeeDirectory initialTab="my-profile" />
            </EmployeeRoute>
          }
        />
        <Route
          path="/employee/directory"
          element={
            <EmployeeRoute>
              <EmployeeDirectory initialTab="directory" />
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
    </Suspense>
  );
}
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <OfflineBanner />
          <AuthProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
