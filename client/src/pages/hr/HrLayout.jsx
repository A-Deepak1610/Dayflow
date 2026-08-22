import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HrSidebar from '../../components/hr/HrSidebar';
import HrHeader from '../../components/hr/HrHeader';
import EmployeeModal from '../../components/hr/EmployeeModal';

export const HrLayout = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter flex">
      {/* Dedicated Collapsible HR Navigation Sidebar */}
      <HrSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <HrHeader onOpenAddModal={() => setIsAddModalOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full bg-[#F4F5F7]">
          <Outlet context={{ onOpenAddModal: () => setIsAddModalOpen(true) }} />
        </main>
      </div>

      {/* Global Employee Onboarding Modal */}
      <EmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default HrLayout;
