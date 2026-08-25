import type { FilterDropdownOptions } from '../types/ComponentsTypes';

const filterOptions = [
  { value: 'id', label: 'ID' },
  { value: 'company', label: 'Compañía' },
  { value: 'amount', label: 'Monto' },
] as const;

export const createFilterDropdown = ({
  isOpen,
  field,
  direction,
  onToggle,
  onFieldSelect,
  onDirectionToggle,
}: FilterDropdownOptions): HTMLElement => {
  const container = document.createElement('div');
  container.className = 'filter-dropdown';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'list-panel__action';
  trigger.setAttribute('aria-label', 'Ordenar listado');
  trigger.setAttribute('aria-expanded', String(isOpen));
  trigger.setAttribute('aria-haspopup', 'menu');
  trigger.addEventListener('click', onToggle);

  const triggerIcon = document.createElement('i');
  triggerIcon.className = 'fa-solid fa-filter';
  triggerIcon.setAttribute('aria-hidden', 'true');
  trigger.append(triggerIcon);
  container.append(trigger);

  if (!isOpen) return container;

  const menu = document.createElement('div');
  menu.className = 'filter-dropdown__menu';
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', 'Opciones de ordenamiento');

  const title = document.createElement('p');
  title.className = 'filter-dropdown__title';
  title.textContent = 'Ordenar por';
  menu.append(title);

  filterOptions.forEach((option) => {
    const optionButton = document.createElement('button');
    optionButton.type = 'button';
    optionButton.className = 'filter-dropdown__option';
    optionButton.textContent = option.label;
    optionButton.setAttribute('role', 'menuitemradio');
    optionButton.setAttribute('aria-checked', String(field === option.value));
    if (field === option.value) optionButton.classList.add('filter-dropdown__option--active');
    optionButton.addEventListener('click', () => onFieldSelect(option.value));
    menu.append(optionButton);
  });

  const directionButton = document.createElement('button');
  directionButton.type = 'button';
  directionButton.className = 'filter-dropdown__direction';
  directionButton.setAttribute('aria-label', `Cambiar a orden ${direction === 'desc' ? 'ascendente' : 'descendente'}`);
  directionButton.textContent = direction === 'desc' ? 'Mayor a menor' : 'Menor a mayor';
  directionButton.addEventListener('click', onDirectionToggle);
  menu.append(directionButton);

  container.append(menu);
  return container;
};
