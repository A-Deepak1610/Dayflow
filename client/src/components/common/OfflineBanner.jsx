import React from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { useNetworkStatus } from '../../hooks';

/**
 * Fixed top/bottom offline status banner component with reconnect animation
 */
export const OfflineBanner = () => {
  const { isOnline, wasOffline } = useNetworkStatus();

  // If online and wasn't recently offline, render nothing
  if (isOnline && !wasOffline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none transition-all duration-300">
      {/* Offline Alert Banner */}
      {!isOnline && (
        <div className="bg-amber-600 dark:bg-amber-700 text-white px-4 py-2 shadow-lg flex items-center justify-center gap-2 text-xs font-semibold animate-fade-in pointer-events-auto border-b border-amber-500">
          <WifiOff className="w-4 h-4 shrink-0 animate-pulse text-amber-200" />
          <span>You are currently offline. Changes will automatically sync when connectivity is restored.</span>
          <button
            onClick={() => window.location.reload()}
            className="ml-3 px-2 py-0.5 bg-amber-700 hover:bg-amber-800 rounded text-[11px] font-bold text-white transition flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Reconnected Success Banner */}
      {isOnline && wasOffline && (
        <div className="bg-emerald-600 dark:bg-emerald-700 text-white px-4 py-2 shadow-lg flex items-center justify-center gap-2 text-xs font-semibold animate-fade-in pointer-events-auto border-b border-emerald-500">
          <Wifi className="w-4 h-4 shrink-0 text-emerald-200" />
          <span>Internet connection restored. Back online!</span>
        </div>
      )}
    </div>
  );
};

export default OfflineBanner;
