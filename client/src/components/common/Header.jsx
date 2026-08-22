import React from 'react';

export const Header = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">
          O
        </div>
        <h1 className="text-xl font-bold text-white tracking-wide">Odoo X NMIT</h1>
      </div>
      <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
        <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-indigo-400">
          React 19 + Vite
        </span>
        <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-purple-400">
          Express + Prisma
        </span>
      </div>
    </header>
  );
};

export default Header;
