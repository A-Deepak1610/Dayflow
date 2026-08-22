import React from 'react';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col font-sans">
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
};

export default MainLayout;
