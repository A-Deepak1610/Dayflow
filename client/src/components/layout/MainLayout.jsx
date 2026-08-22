import React from 'react';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-inter selection:bg-[#FF5D7A] selection:text-white">
      {children}
    </div>
  );
};

export default MainLayout;
