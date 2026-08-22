import React from 'react';
import Header from '../common/Header';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">{children}</main>
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        Odoo X NMIT Project &copy; {new Date().getFullYear()} — Built with Prisma, TypeScript & React
      </footer>
    </div>
  );
};

export default MainLayout;
