import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import EmployeeLayout from './components/layout/EmployeeLayout';
import Home from './pages/Home';

// HR Pages
import HrDashboard from './pages/hr/HrDashboard';
import EmployeeManagement from './pages/hr/EmployeeManagement';
import LeaveApprovals from './pages/hr/LeaveApprovals';

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
  return <EmployeeLayout>{children}</EmployeeLayout>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />

      {/* HR / Admin Pages */}
      <Route
        path="/hr/dashboard"
        element={
          <HrRoute>
            <HrDashboard />
          </HrRoute>
        }
      />
      <Route
        path="/hr/employees"
        element={
          <HrRoute>
            <EmployeeManagement />
          </HrRoute>
        }
      />
      <Route
        path="/hr/leaves"
        element={
          <HrRoute>
            <LeaveApprovals />
          </HrRoute>
        }
      />

      {/* Employee Pages */}
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
