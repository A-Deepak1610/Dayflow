/**
 * Format currency amounts to formatted string
 */
export const formatCurrency = (amount, currency = 'INR') => {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date string to standard readable format
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
};

/**
 * Extract initials from full name
 */
export const getInitials = (name) => {
  if (!name) return 'DF';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

/**
 * Return CSS color classes for status strings
 */
export const getStatusBadgeClass = (status) => {
  const normalized = (status || '').toUpperCase();
  switch (normalized) {
    case 'APPROVED':
    case 'PRESENT':
    case 'ACTIVE':
    case 'COMPLETED':
    case 'PAID':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

    case 'PENDING':
    case 'ON_LEAVE':
    case 'HALF_DAY':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';

    case 'REJECTED':
    case 'ABSENT':
    case 'INACTIVE':
    case 'CANCELLED':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';

    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
};
