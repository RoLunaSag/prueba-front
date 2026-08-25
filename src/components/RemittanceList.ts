import { createItemList } from './ItemList';
import type { RemittanceListOptions } from '../types/ComponentsTypes';

export const createRemittanceList = ({
  items,
  emptyMessage = 'No hay remesas para mostrar.',
}: RemittanceListOptions): HTMLElement => {
  const container = document.createElement('section');
  container.className = 'remittance-list';
  container.setAttribute('aria-label', 'Lista de remesas cobradas');

  if (items.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.className = 'remittance-list__empty';
    emptyState.textContent = emptyMessage;
    container.append(emptyState);
    return container;
  }

  const list = document.createElement('ul');
  list.className = 'remittance-list__items';
  items.forEach((item) => list.append(createItemList(item)));

  container.append(list);
  return container;
};
