import React, { useEffect, useState } from 'react';
import { checkServerHealth } from '../services/api';

export const Home = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    setLoading(true);
    const res = await checkServerHealth();
    if (res.ok) {
      setHealth(res.data);
    } else {
      setHealth({
        status: 'error',
        error: res.error || 'Server offline or un-reachable',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
          Project Setup Ready
        </h2>
        <p className="text-slate-400 max-w-2xl">
          Frontend and backend directory structures are configured. Prisma ORM with TypeScript & TiDB Cloud MySQL database setup initialized.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend Status Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Backend Status</h3>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                loading
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : health?.status === 'ok'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {loading ? 'Checking...' : health?.status === 'ok' ? 'Online (200 OK)' : 'Offline / Error'}
            </span>
          </div>

          <p className="text-xs text-slate-400 font-mono mb-4">
            Endpoint: <code className="bg-slate-800 text-indigo-300 px-2 py-0.5 rounded">http://localhost:5000/api/health</code>
          </p>

          <button
            onClick={fetchHealth}
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Re-checking Connection...' : 'Check Health Status'}
          </button>
        </div>

        {/* Database Status Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Database Status</h3>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                loading
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : health?.database?.status === 'connected'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}
            >
              {loading
                ? 'Checking...'
                : health?.database?.status === 'connected'
                ? 'Connected (TiDB MySQL)'
                : 'Pending / Credentials Check'}
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300 font-mono">
            <div>
              <span className="text-slate-500">Provider:</span> MySQL (TiDB Cloud)
            </div>
            <div>
              <span className="text-slate-500">ORM:</span> Prisma Client v6
            </div>
            {health?.database?.error && (
              <div className="p-3 bg-slate-950 border border-amber-900/40 text-amber-400 rounded-lg text-[11px] overflow-x-auto">
                {health.database.error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
