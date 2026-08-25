import type { RemittanceListItem } from '../types/ComponentsTypes';
import { formatCurrency } from '../utils/Formatters';

export const createItemList = ({ id, company, amount }: RemittanceListItem): HTMLLIElement => {
  const item = document.createElement('li');
  item.className = 'item-list';

  const idElement = document.createElement('span');
  idElement.className = 'item-list__id';
  idElement.textContent = `#${id}`;

  const companyElement = document.createElement('span');
  companyElement.className = 'item-list__company';
  companyElement.textContent = company;

  const amountElement = document.createElement('span');
  amountElement.className = 'item-list__amount';
  amountElement.textContent = formatCurrency(amount);

  item.append(idElement, companyElement, amountElement);
  return item;
};
