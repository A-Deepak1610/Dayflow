import React, { useState } from 'react';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeHeader from './EmployeeHeader';

export const EmployeeLayout = ({ children }) => {
  const [clockedIn, setClockedIn] = useState(true);
  const [clockInTime, setClockInTime] = useState('08:58 AM');

  const handleToggleClock = () => {
    if (clockedIn) {
      setClockedIn(false);
    } else {
      setClockedIn(true);
      setClockInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 font-inter flex">
      {/* Employee Navigation Sidebar */}
      <EmployeeSidebar />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar matching HR Header */}
        <EmployeeHeader
          clockedIn={clockedIn}
          clockInTime={clockInTime}
          onToggleClock={handleToggleClock}
        />

        {/* Dynamic Page Main Content */}
        <main className="flex-1 w-full bg-[#0a0a0a] p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
