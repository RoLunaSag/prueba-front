import type { StatusBadgeOptions } from '../types/ComponentsTypes';

export const createStatusBadge = ({ status }: StatusBadgeOptions): HTMLElement => {
  const badge = document.createElement('span');
  const statusClass = status === 'COBRADO' ? 'paid' : 'pending';
  badge.className = `status-badge status-badge--${statusClass}`;
  badge.textContent = status === 'COBRADO' ? 'Cobrado' : 'No cobrado';
  return badge;
};
