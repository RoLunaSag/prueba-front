import type { SidebarMenuItem, SidebarMenuOptions } from '../types/ComponentsTypes';

export const sidebarMenuItems: SidebarMenuItem[] = [
  { id: 'home', label: 'Inicio', iconClass: 'fa-solid fa-house' },
  { id: 'remittance', label: 'Remesas', iconClass: 'fa-solid fa-money-bill-transfer' },
  { id: 'card', label: 'Tarjetas', iconClass: 'fa-solid fa-credit-card' },
  { id: 'policy', label: 'Políticas', iconClass: 'fa-solid fa-shield-halved' },
  { id: 'cashback', label: 'Cashback', iconClass: 'fa-solid fa-hand-holding-dollar' },
  { id: 'statsfolder', label: 'Estadísticas', iconClass: 'fa-solid fa-folder-open' },
];

export const createSidebarMenu = ({
  items = sidebarMenuItems,
  activeItemId = 'remittance',
  onSelect,
}: SidebarMenuOptions): HTMLElement => {
  const navigation = document.createElement('nav');
  navigation.className = 'sidebar-menu';
  navigation.setAttribute('aria-label', 'Navegación principal');

  const list = document.createElement('ul');
  list.className = 'sidebar-menu__items';

  items.forEach(({ id, label, iconClass }) => {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'sidebar-menu__button';
    button.setAttribute('aria-label', label);
    if (id === activeItemId) button.setAttribute('aria-current', 'page');

    const icon = document.createElement('i');
    icon.className = iconClass;
    icon.setAttribute('aria-hidden', 'true');

    button.append(icon);
    button.addEventListener('click', () => onSelect?.(id));
    listItem.append(button);
    list.append(listItem);
  });

  navigation.append(list);
  return navigation;
};
