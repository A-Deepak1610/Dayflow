import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const toastConfig = {
  success: {
    icon: CheckCircle2,
    bg: 'bg-slate-900/95 dark:bg-slate-900/95 border-emerald-500/40 text-emerald-400',
    iconColor: 'text-emerald-400',
    progress: 'bg-emerald-500',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-slate-900/95 dark:bg-slate-900/95 border-rose-500/40 text-rose-400',
    iconColor: 'text-rose-400',
    progress: 'bg-rose-500',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-slate-900/95 dark:bg-slate-900/95 border-amber-500/40 text-amber-400',
    iconColor: 'text-amber-400',
    progress: 'bg-amber-500',
  },
  info: {
    icon: Info,
    bg: 'bg-slate-900/95 dark:bg-slate-900/95 border-sky-500/40 text-sky-400',
    iconColor: 'text-sky-400',
    progress: 'bg-sky-500',
  },
};

export const ToastContainer = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const config = toastConfig[toast.type] || toastConfig.info;
        const IconComponent = config.icon;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto relative overflow-hidden rounded-xl border p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 transform translate-y-0 opacity-100 ${config.bg}`}
          >
            <div className="flex items-start gap-3">
              <IconComponent className={`w-5 h-5 mt-0.5 shrink-0 ${config.iconColor}`} />
              <div className="flex-1 min-w-0 pr-2">
                {toast.title && (
                  <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                    {toast.title}
                  </h4>
                )}
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed break-words">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-800/50"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Subtle Progress Bar Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/50 overflow-hidden">
              <div
                className={`h-full ${config.progress} transition-all ease-linear`}
                style={{
                  animation: `toast-progress ${toast.duration || 4000}ms linear forwards`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
