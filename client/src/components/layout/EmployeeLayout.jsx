import React from 'react';
import EmployeeSidebar from './EmployeeSidebar';

export const EmployeeLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden font-inter selection:bg-[#FF5D7A] selection:text-white">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default EmployeeLayout;
